// Builds the chatbot's vector index: chunks the site content, embeds every
// chunk with Workers AI, and writes worker/src/generated/index.json, which the
// Worker bundles (no vector database; see docs/adr/0001-in-worker-vector-search.md).
//
//   CLOUDFLARE_ACCOUNT_ID=… CLOUDFLARE_API_TOKEN=… npm run chat:index
//   npm run chat:index -- --dry     # print the chunks, no embedding, no write

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { buildChatChunks, buildCoreProfile } from "@/lib/chat-chunks";
import { EMBEDDING_DIMS, EMBEDDING_MODEL, MAX_EMBED_CHARS, embedViaRest } from "../worker/src/embeddings";
import type { ChatIndex } from "../worker/src/knowledge";

const OUT = resolve("worker/src/generated/index.json");

async function main() {
  const chunks = buildChatChunks();

  if (process.argv.includes("--dry")) {
    for (const c of chunks) {
      const clipped = c.text.length > MAX_EMBED_CHARS ? " (clipped for embedding)" : "";
      console.log(`${c.id.padEnd(60)} ${String(c.text.length).padStart(5)} chars${clipped}`);
    }
    console.log(`\n${chunks.length} chunks\n\nCore profile:\n${buildCoreProfile()}`);
    return;
  }

  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) {
    throw new Error("Set CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN (see docs/cloudflare-worker-setup.md).");
  }

  // The title leads so a chunk about "Echo AI" matches a question naming it.
  const vectors = await embedViaRest(
    chunks.map((c) => `${c.title}\n${c.text}`),
    accountId,
    apiToken
  );
  if (vectors.some((v) => v.length !== EMBEDDING_DIMS)) {
    throw new Error(`Expected ${EMBEDDING_DIMS}-dim vectors from ${EMBEDDING_MODEL}.`);
  }

  const index: ChatIndex = {
    model: EMBEDDING_MODEL,
    dims: EMBEDDING_DIMS,
    builtAt: new Date().toISOString(),
    profile: buildCoreProfile(),
    // Rounded to 6 places: plenty for cosine, and it halves the bundle.
    chunks: chunks.map((c, i) => ({ ...c, vector: vectors[i].map((x) => Math.round(x * 1e6) / 1e6) })),
  };

  mkdirSync(dirname(OUT), { recursive: true });
  writeFileSync(OUT, JSON.stringify(index));
  console.log(`Wrote ${chunks.length} chunks to ${OUT}`);
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
