// Embedding model settings shared by build time (the index script, the eval)
// and the Worker. Chunks and questions must be embedded the same way, or the
// cosine scores mean nothing.

export const EMBEDDING_MODEL = "@cf/baai/bge-base-en-v1.5";
export const EMBEDDING_DIMS = 768;
/** bge recommends cls pooling; it isn't compatible with the default (mean). */
export const POOLING = "cls";
/** The model reads at most 512 tokens; clip longer chunks before embedding. */
export const MAX_EMBED_CHARS = 1800;
/**
 * bge v1.5 wants this before short queries (not before passages) when
 * matching a question to passages; without it every chunk scores about the same.
 */
export const QUERY_INSTRUCTION = "Represent this sentence for searching relevant passages: ";

interface RestResponse {
  success: boolean;
  errors?: { message: string }[];
  result?: { shape: number[]; data: number[][] };
}

/**
 * Embed texts through the Workers AI REST API. Used outside the Worker (the
 * index build and the eval), where there's no `env.AI` binding.
 */
export async function embedViaRest(
  texts: string[],
  accountId: string,
  apiToken: string
): Promise<number[][]> {
  const vectors: number[][] = [];
  for (let i = 0; i < texts.length; i += 50) {
    const batch = texts.slice(i, i + 50).map((t) => t.slice(0, MAX_EMBED_CHARS));
    const res = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${EMBEDDING_MODEL}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" },
        body: JSON.stringify({ text: batch, pooling: POOLING }),
      }
    );
    const body = (await res.json()) as RestResponse;
    if (!res.ok || !body.success || !body.result) {
      const reason = body.errors?.map((e) => e.message).join("; ") || res.statusText;
      throw new Error(`Workers AI embedding failed (${res.status}): ${reason}`);
    }
    vectors.push(...body.result.data);
  }
  return vectors;
}
