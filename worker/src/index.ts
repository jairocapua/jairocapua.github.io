// The portfolio chatbot's backend. POST /chat streams an answer as SSE:
// validate → rate-limit → embed the question → retrieve the closest chunks →
// Claude Haiku 5.5 → log anonymously. Plan: docs/rag-chatbot-plan.md.

import Anthropic from "@anthropic-ai/sdk";
import { chatParams } from "./claude";
import { allowedOrigin, corsHeaders } from "./cors";
import { EMBEDDING_MODEL, POOLING } from "./embeddings";
import type { Env } from "./env";
import type { ChatIndex } from "./knowledge";
import { LIMIT_MESSAGES, checkLimits, hashIp } from "./limits";
import { cleanUp, logQuestion, type Outcome } from "./log";
import { buildMessages, buildSystem, citedNumbers } from "./prompt";
import { queryText, retrieve } from "./retrieve";
import { encodeEvent, type ChatEvent } from "./sse";
import { parseChatBody, type ChatTurn } from "./validate";
import indexJson from "./generated/index.json";

const index = indexJson as ChatIndex;
const system = buildSystem(index.profile);

const ERROR_MESSAGE =
  "Sorry, I couldn't answer that just now. Try again in a moment, or email Jairo at jairocapua.dev@gmail.com.";

function json(body: unknown, status: number, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);
    const origin = allowedOrigin(request, env);
    const cors = corsHeaders(origin);

    if (url.pathname === "/health") {
      return json({ ok: true, model: index.model, chunks: index.chunks.length, builtAt: index.builtAt }, 200, cors);
    }
    if (url.pathname !== "/chat") return json({ error: "Not found" }, 404);
    if (request.method === "OPTIONS") return new Response(null, { status: origin ? 204 : 403, headers: cors });
    if (request.method !== "POST") return json({ error: "Use POST" }, 405, cors);
    // CORS only binds browsers, but there's no reason to serve anyone else.
    if (!origin) return json({ error: "Origin not allowed" }, 403);

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return json({ error: "Body must be JSON" }, 400, cors);
    }
    const parsed = parseChatBody(body);
    if ("error" in parsed) return json({ error: parsed.error }, 400, cors);

    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const limit = await checkLimits(env, await hashIp(ip, env.IP_HASH_SALT));
    if (!limit.ok) {
      return json({ error: LIMIT_MESSAGES[limit.scope], scope: limit.scope }, 429, {
        ...cors,
        "Retry-After": String(limit.retryAfter),
      });
    }

    const { readable, writable } = new TransformStream<Uint8Array, Uint8Array>();
    ctx.waitUntil(answer(parsed.turns, env, writable.getWriter()));
    return new Response(readable, {
      headers: { ...cors, "Content-Type": "text/event-stream", "Cache-Control": "no-store" },
    });
  },

  async scheduled(_controller, env): Promise<void> {
    await cleanUp(env);
  },
} satisfies ExportedHandler<Env>;

/** Streams one answer into `writer`, then logs it. Never throws. */
async function answer(turns: ChatTurn[], env: Env, writer: WritableStreamDefaultWriter<Uint8Array>) {
  const started = Date.now();
  const question = turns[turns.length - 1].content;
  let outcome: Outcome = "error";
  let citedIds: string[] = [];
  let open = true;

  const send = async (event: ChatEvent) => {
    if (!open) return;
    try {
      await writer.write(encodeEvent(event));
    } catch {
      open = false; // the visitor closed the panel
    }
  };

  try {
    const embedded = (await env.AI.run(EMBEDDING_MODEL, { text: [queryText(turns)], pooling: POOLING })) as {
      data: number[][];
    };
    const sources = retrieve(index, embedded.data[0]);
    await send({
      event: "sources",
      data: sources.map((s) => ({ n: s.n, id: s.chunk.id, title: s.chunk.title, href: s.chunk.href })),
    });

    const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY, maxRetries: 1 });
    const stream = client.messages.stream(chatParams(system, buildMessages(turns, sources)));
    let text = "";
    for await (const event of stream) {
      if (!open) {
        stream.abort();
        break;
      }
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        text += event.delta.text;
        await send({ event: "delta", data: { text: event.delta.text } });
      }
    }

    if (open) {
      const final = await stream.finalMessage();
      if (final.stop_reason === "refusal") {
        outcome = "refusal";
        await send({ event: "error", data: { message: ERROR_MESSAGE } });
      } else {
        outcome = "ok";
        const cited = citedNumbers(text, sources);
        citedIds = sources.filter((s) => cited.includes(s.n)).map((s) => s.chunk.id);
        await send({ event: "done", data: { cited } });
      }
    }
  } catch (err) {
    // Log the status only; never the key or the upstream message.
    console.error("chat failed", err instanceof Anthropic.APIError ? err.status : (err as Error)?.name);
    await send({ event: "error", data: { message: ERROR_MESSAGE } });
  } finally {
    if (open) await writer.close().catch(() => {});
    await logQuestion(env, { question, citedIds, outcome, latencyMs: Date.now() - started }).catch((e) =>
      console.error("log failed", (e as Error)?.message)
    );
  }
}
