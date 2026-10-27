# ADR 0001: Brute-force vector search inside the Worker, no vector database

- **Status:** accepted
- **Date:** 2026-10-27
- **Context doc:** [rag-chatbot-plan.md](../rag-chatbot-plan.md)

## Context

The portfolio chatbot should do real retrieval: embed the question, find the closest
chunks and answer from them with visible sources. That's what makes it RAG rather
than a chatbot with the résumé pasted into its prompt.

The corpus is small. All site content (`resume.ts`, `automation-projects.ts`) plus a short
FAQ is about 7k tokens, or roughly **30 chunks** (29 when this was built). At 768 dimensions (bge-base-en-v1.5),
the whole index is about 31k floats, around 120 KB of JSON.

The backend is a Cloudflare Worker on the **Free plan**. Workers Paid has a $5/month
minimum, which uses up the chatbot's whole budget.

Options considered:

1. **Context-stuffing.** Put all ~7k tokens in every prompt. Answer quality is fine at
   this size, but nothing is retrieved, so there are no honest sources to show.
   This was the June 2026 plan.
2. **Cloudflare Vectorize.** A hosted vector database.
   - Its free tier allows ~30M queried dimensions per month. Billing counts the stored
     vectors on every query, so at this index size that's only **~950 queries/month**.
   - Cloudflare's docs contradict each other on whether Vectorize works on the Free plan.
   - Writes are asynchronous, and the index sync needs a separate API token with
     Vectorize write permission.
3. **Brute-force in the Worker.** Embed the chunks at build time and bundle the vectors
   into the Worker. At request time, embed only the question (Workers AI, under 1 of the
   10,000 free daily neurons) and compute cosine similarity against all ~30 vectors in
   memory.

## Decision

Option 3. `scripts/build-chat-index.ts` writes `worker/src/generated/index.json` in CI.
`worker/src/retrieve.ts` does the cosine top-k.

## Consequences

- **Good:**
  - Real embedding retrieval with no quota and no Free-plan uncertainty.
  - Exact results rather than approximate nearest neighbour.
  - Under a millisecond of CPU per query.
  - Index and code ship together in a single `wrangler deploy`, so they can't get out of sync.
  - The CI token only needs Workers and Workers AI rights.
- **Bad:**
  - Every content change means redeploying the Worker. The Action does this automatically.
  - Bundle size grows with the corpus. It's fine up to a few thousand chunks; the
    Worker size limit is the ceiling.
- **Revisit when** the corpus passes ~2,000 chunks (for example, if blog posts get
  indexed) or per-query CPU becomes noticeable. At that point, move to Vectorize
  (only on the Paid plan) or another hosted index. The `retrieve()` interface stays
  the same.
