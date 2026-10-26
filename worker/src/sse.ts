// The Worker's own SSE protocol, which the site's chat-client.ts parses:
//   event: sources  data: [{ n, id, title, href }]   (before generation)
//   event: delta    data: { text }                   (repeated)
//   event: done     data: { cited: [n...] }
//   event: error    data: { message }                (friendly text only)

export type ChatEvent =
  | { event: "sources"; data: { n: number; id: string; title: string; href: string }[] }
  | { event: "delta"; data: { text: string } }
  | { event: "done"; data: { cited: number[] } }
  | { event: "error"; data: { message: string } };

const encoder = new TextEncoder();

export function encodeEvent({ event, data }: ChatEvent): Uint8Array {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}
