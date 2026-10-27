// The chatbot's test set: runs every case in cases.json through the real
// pipeline (embed → retrieve → prompt → Claude) without deploying, and checks
// the answers with plain regexes. CI runs it before every Worker deploy; a
// failure blocks the deploy. Costs about a cent per run.
//
//   CLOUDFLARE_ACCOUNT_ID=… CLOUDFLARE_API_TOKEN=… ANTHROPIC_API_KEY=… npm run eval

import { readFileSync } from "node:fs";
import Anthropic from "@anthropic-ai/sdk";
import { chatParams } from "../src/claude";
import { embedViaRest } from "../src/embeddings";
import type { ChatIndex } from "../src/knowledge";
import { PROMPT_SENTINEL, buildMessages, buildSystem, citedNumbers } from "../src/prompt";
import { queryText, retrieve } from "../src/retrieve";
import type { ChatTurn } from "../src/validate";

interface Case {
  name: string;
  kind: "fact" | "unknown" | "refuse";
  question?: string;
  turns?: ChatTurn[];
  mustMatch?: string[];
  mustNotMatch?: string[];
  /** Chunk ids the answer has to cite. */
  expectSources?: string[];
  maxChars?: number;
}

const index = JSON.parse(readFileSync(new URL("../src/generated/index.json", import.meta.url), "utf8")) as ChatIndex;
const cases = JSON.parse(readFileSync(new URL("./cases.json", import.meta.url), "utf8")) as Case[];
const system = buildSystem(index.profile);

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
if (!accountId || !apiToken || !process.env.ANTHROPIC_API_KEY) {
  console.error("Set CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN and ANTHROPIC_API_KEY.");
  process.exit(1);
}
if (index.chunks.length === 0) {
  console.error("worker/src/generated/index.json is empty; run `npm run chat:index` in the repo root first.");
  process.exit(1);
}

const client = new Anthropic();

async function runCase(c: Case): Promise<string[]> {
  const turns = c.turns ?? [{ role: "user", content: c.question! }];
  const [query] = await embedViaRest([queryText(turns)], accountId!, apiToken!);
  const sources = retrieve(index, query);

  const message = await client.messages.create(chatParams(system, buildMessages(turns, sources)));
  const answer = message.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
  const cited = citedNumbers(answer, sources);
  const citedIds = sources.filter((s) => cited.includes(s.n)).map((s) => s.chunk.id);

  const failures: string[] = [];
  if (message.stop_reason === "refusal") failures.push("model refused (stop_reason: refusal)");
  if (answer.includes(PROMPT_SENTINEL)) failures.push("leaked the system prompt");
  for (const p of c.mustMatch ?? []) {
    if (!new RegExp(p, "i").test(answer)) failures.push(`missing /${p}/`);
  }
  for (const p of c.mustNotMatch ?? []) {
    if (new RegExp(p, "i").test(answer)) failures.push(`contains /${p}/`);
  }
  for (const id of c.expectSources ?? []) {
    if (!citedIds.includes(id)) {
      const rank = sources.find((s) => s.chunk.id === id);
      failures.push(rank ? `didn't cite ${id} (retrieved as [${rank.n}])` : `didn't retrieve ${id}`);
    }
  }
  if (c.maxChars && answer.length > c.maxChars) failures.push(`${answer.length} chars > ${c.maxChars}`);

  if (failures.length || process.argv.includes("--verbose")) {
    const scores = sources.map((s) => `${s.chunk.id} ${s.score.toFixed(3)}`).join(", ");
    console.log(`\n--- ${c.name}\nretrieved: ${scores}\nanswer: ${answer}`);
  }
  return failures;
}

async function main() {
  const results: { c: Case; failures: string[] }[] = [];
  // A few at a time keeps well inside the API rate limits.
  for (let i = 0; i < cases.length; i += 4) {
    const batch = cases.slice(i, i + 4);
    results.push(
      ...(await Promise.all(
        batch.map(async (c) => ({ c, failures: await runCase(c).catch((e) => [`threw: ${(e as Error).message}`]) }))
      ))
    );
  }

  console.log("");
  for (const { c, failures } of results) {
    console.log(`${failures.length ? "FAIL" : "pass"}  [${c.kind}] ${c.name}${failures.length ? `: ${failures.join("; ")}` : ""}`);
  }
  const failed = results.filter((r) => r.failures.length).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
}

main();
