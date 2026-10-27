import { ArrowDown, ArrowUpRight } from "lucide-react";
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
      <ol className="flex flex-col items-stretch">
        {STEPS.map((step, i) => (
          <li key={step.title} className="flex flex-col items-center">
            <div className="w-full rounded-xl border bg-background px-3 py-2">
              <div className="flex items-center gap-2 font-medium">
                <span className="font-mono text-xs text-[#D77757]">{i + 1}</span>
                {step.title}
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{step.detail}</p>
            </div>
            {i < STEPS.length - 1 && <ArrowDown className="my-1 size-3.5 text-muted-foreground" aria-hidden />}
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
