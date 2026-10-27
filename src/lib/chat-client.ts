// Browser side of the portfolio chatbot: talks to the Cloudflare Worker
// (worker/src/index.ts) and parses its SSE stream. Entry points (hero prompt,
// dock icon, Clawd) open the panel through a window event.

/** Inlined at build time. Unset → the chat and every entry point stay hidden. */
export const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL ?? "";
export const chatEnabled = CHAT_API_URL !== "";

export const CHAT_MODEL_LABEL = "Claude Haiku 5.5";
export const WORKER_SOURCE_URL = "https://github.com/jairocapua/jairocapua.github.io/tree/main/worker";
export const ADR_URL =
  "https://github.com/jairocapua/jairocapua.github.io/blob/main/docs/adr/0001-in-worker-vector-search.md";

export const STARTER_QUESTIONS = [
  "What does Jairo build?",
  "Show me his best automation",
  "Is he open to work?",
];

export interface ChatSource {
  n: number;
  id: string;
  title: string;
  href: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  /** Assistant only: what the Worker retrieved, and which of those it cited. */
  sources?: ChatSource[];
  cited?: number[];
  pending?: boolean;
  error?: boolean;
}

/** Same limits as the Worker's validator (worker/src/validate.ts). */
const HISTORY_TURNS = 6;
const MAX_CHARS = 1000;

export const OPEN_CHAT_EVENT = "chat:open";
/** detail: boolean. True while an answer streams (Clawd "thinks"). */
export const CHAT_BUSY_EVENT = "chat:busy";

export function openChat(question?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: { question } }));
}

export function setChatBusy(busy: boolean) {
  window.dispatchEvent(new CustomEvent(CHAT_BUSY_EVENT, { detail: busy }));
}

interface StreamHandlers {
  onSources(sources: ChatSource[]): void;
  onDelta(text: string): void;
  onDone(cited: number[]): void;
}

/** Thrown with a message that's fine to show the visitor. */
export class ChatError extends Error {}

const FALLBACK_ERROR =
  "I can't reach my brain right now. Try again in a moment, or email Jairo at jairocapua.dev@gmail.com.";

/** Sends the conversation (ending in the new question) and streams the answer. */
export async function streamChat(messages: ChatMessage[], handlers: StreamHandlers, signal?: AbortSignal) {
  // Failed exchanges (the error and the question it answered) aren't history.
  const turns = messages
    .filter((m, i) => !m.error && !m.pending && m.content.trim() && !messages[i + 1]?.error)
    .slice(-HISTORY_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));

  let res: Response;
  try {
    res = await fetch(`${CHAT_API_URL}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: turns }),
      signal,
    });
  } catch (err) {
    if ((err as Error).name === "AbortError") throw err;
    throw new ChatError(FALLBACK_ERROR);
  }

  if (!res.ok || !res.body) {
    // 429s carry a friendly message; anything else gets the generic one.
    const body = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new ChatError(res.status === 429 && body?.error ? body.error : FALLBACK_ERROR);
  }

  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;
    let end: number;
    while ((end = buffer.indexOf("\n\n")) !== -1) {
      const raw = buffer.slice(0, end);
      buffer = buffer.slice(end + 2);
      const event = /^event: (.+)$/m.exec(raw)?.[1];
      const data = /^data: (.+)$/m.exec(raw)?.[1];
      if (!event || !data) continue;
      const payload = JSON.parse(data);
      if (event === "sources") handlers.onSources(payload);
      else if (event === "delta") handlers.onDelta(payload.text);
      else if (event === "done") handlers.onDone(payload.cited);
      else if (event === "error") throw new ChatError(payload.message);
    }
  }
}

// The conversation survives reloads in this tab, not across visits.
const STORAGE_KEY = "chat:messages";

export function loadMessages(): ChatMessage[] {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "[]") as ChatMessage[];
    return saved.filter((m) => !m.pending);
  } catch {
    return [];
  }
}

export function saveMessages(messages: ChatMessage[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.filter((m) => !m.pending)));
  } catch {
    // Private mode or full storage: the chat just won't survive a reload.
  }
}
