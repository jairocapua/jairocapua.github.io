import { ArrowUpRight } from "lucide-react";
import { ADR_URL, CHAT_MODEL_LABEL, WORKER_SOURCE_URL } from "@/lib/chat-client";

const STEPS = [
  { title: "Your question", detail: "Sent to a Cloudflare Worker; the API key never reaches the browser" },
  { title: "Embed", detail: "Workers AI turns it into a 768-dim vector (bge-base-en-v1.5)" },
  { title: "Vector search", detail: "Cosine similarity against ~30 chunks of this site, inside the Worker" },
  { title: "Top 5 sources", detail: "The closest chunks are numbered and handed to the model" },
  { title: CHAT_MODEL_LABEL, detail: "Answers only from those sources and cites them as [1], [2]…" },
  { title: "Streamed answer", detail: "Word by word, with chips that jump to each source" },
];

/** The "How this works" view of the chat panel: the RAG pipeline at a glance. */
export function HowItWorks() {
  return (
    <div className="flex flex-col gap-4 text-sm">
      <p className="leading-relaxed text-muted-foreground">
        This assistant uses retrieval-augmented generation (RAG): it looks up the parts of this site
        that match your question, then answers from those alone.
      </p>
      {/* A timeline: numbered dots joined by a line, each step beside its dot. */}
      <ol className="flex flex-col">
        {STEPS.map((step, i) => (
          <li key={step.title} className="relative flex gap-3 pb-4 last:pb-0">
            {i < STEPS.length - 1 && (
              <span aria-hidden className="absolute bottom-0 left-3 top-6 w-px -translate-x-1/2 bg-border" />
            )}
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-[0.65rem] font-semibold">
              {i + 1}
            </span>
            <div className="min-w-0 pt-0.5">
              <p className="font-medium leading-tight">{step.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="text-xs leading-relaxed text-muted-foreground">
        On every push, a GitHub Action rebuilds the index from the site&apos;s content, runs a 20-question
        test set (facts, unknowns, jailbreaks) and only deploys if it passes. Rate limits and an
        anonymous question log live in Cloudflare D1.
      </p>
      <div className="flex flex-wrap gap-3 text-xs">
        <a
          href={WORKER_SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
        >
          View the source <ArrowUpRight className="size-3" aria-hidden />
        </a>
        <a
          href={ADR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
        >
          Why no vector database? <ArrowUpRight className="size-3" aria-hidden />
        </a>
      </div>
    </div>
  );
}
