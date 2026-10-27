// The shape of worker/src/generated/index.json, written by
// scripts/build-chat-index.ts and bundled into the Worker.

export interface IndexedChunk {
  id: string;
  title: string;
  href: string;
  text: string;
  vector: number[];
}

export interface ChatIndex {
  model: string;
  dims: number;
  /** When the index was built (ISO); handy in /health. */
  builtAt: string;
  /** Core facts that go in every system prompt. */
  profile: string;
  chunks: IndexedChunk[];
}
