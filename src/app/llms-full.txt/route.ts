import { buildLlmsFull } from "@/lib/llms";

// Emitted as a static /llms-full.txt file by `output: "export"`: the entire
// site's content as one markdown document, so an AI assistant gets everything
// in a single fetch without crawling or executing JavaScript.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsFull(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
