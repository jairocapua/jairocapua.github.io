// Brute-force cosine search over the bundled index. ~30 vectors don't need an
// ANN index; see docs/adr/0001-in-worker-vector-search.md.

import type { ChatIndex, IndexedChunk } from "./knowledge";
import type { ChatTurn } from "./validate";

export const TOP_K = 5;
/** Chunks below this cosine score are dropped (tuned against the eval)... */
export const MIN_SCORE = 0.5;
/** ...but the best few are always kept, so the model has something to read. */
export const MIN_KEEP = 2;

export interface Retrieved {
  /** 1-based; the number the model cites, e.g. [2]. */
  n: number;
  chunk: IndexedChunk;
  score: number;
}

const norms = new WeakMap<number[], number>();

function norm(v: number[]): number {
  let n = norms.get(v);
  if (n === undefined) {
    n = Math.sqrt(v.reduce((sum, x) => sum + x * x, 0));
    norms.set(v, n);
  }
  return n;
}

function cosine(a: number[], b: number[]): number {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot / (norm(a) * norm(b) || 1);
}

export function retrieve(index: ChatIndex, query: number[]): Retrieved[] {
  return index.chunks
    .map((chunk) => ({ chunk, score: cosine(query, chunk.vector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, TOP_K)
    .filter((r, i) => i < MIN_KEEP || r.score >= MIN_SCORE)
    .map((r, i) => ({ ...r, n: i + 1 }));
}

/**
 * What to embed for this turn: the latest question, plus the one before it
 * when the latest is a short follow-up ("tell me more about that one").
 */
export function queryText(turns: ChatTurn[]): string {
  const users = turns.filter((t) => t.role === "user").map((t) => t.content);
  const latest = users[users.length - 1];
  const previous = users[users.length - 2];
  return latest.length < 60 && previous ? `${previous}\n${latest}` : latest;
}
