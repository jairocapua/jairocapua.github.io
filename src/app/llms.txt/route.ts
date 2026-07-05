import { buildLlmsIndex } from "@/lib/llms";

// Emitted as a static /llms.txt file by `output: "export"` (same idea as
// robots.ts / sitemap.ts): a markdown index of the site for AI assistants.
export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsIndex(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
