"use client";

import { Sparkles } from "lucide-react";
import Markdown from "react-markdown";
import type { ChatMessage, ChatSource } from "@/lib/chat-client";
import { cn } from "@/lib/utils";

/** "[2]" in the answer becomes a link the custom `a` renderer turns into a citation. */
function linkCitations(text: string): string {
  return text.replace(/\[(\d+)\](?!\()/g, "[$1](#source-$1)");
}

/** What the assistant is doing before its first word: searching, then reading what it found. */
function Thinking({ sources }: { sources: number }) {
  return (
    <span className="shimmer text-sm">
      {sources > 0 ? `Reading ${sources} sources…` : "Searching this site…"}
    </span>
  );
}

function SourceChips({ sources, onNavigate }: { sources: ChatSource[]; onNavigate: () => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {sources.map((s) => (
        <a
          key={s.id}
          href={s.href}
          onClick={onNavigate}
          title={`Go to ${s.title} on this page`}
          className="inline-flex max-w-full items-center gap-1.5 rounded-lg border bg-background py-1 pl-1 pr-2 text-xs text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
        >
          <span className="flex size-4 shrink-0 items-center justify-center rounded bg-muted font-mono text-[0.6rem] font-semibold text-foreground">
            {s.n}
          </span>
          <span className="truncate">{s.title}</span>
        </a>
      ))}
    </div>
  );
}

export function ChatMessageView({ message, onNavigate }: { message: ChatMessage; onNavigate: () => void }) {
  if (message.role === "user") {
    return (
      <div className="ml-10 self-end whitespace-pre-wrap break-words rounded-2xl rounded-br-md bg-primary px-3.5 py-2 text-sm leading-relaxed text-primary-foreground">
        {message.content}
      </div>
    );
  }

  const sources = message.sources ?? [];
  const cited = sources.filter((s) => message.cited?.includes(s.n));

  // No bubble: answers run long, and read better as plain text beside the mark.
  return (
    <div className="flex gap-2.5">
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border bg-background">
        <Sparkles className="size-3.5" aria-hidden />
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5">
        {message.pending && !message.content ? (
          <div className="flex h-7 items-center">
            <Thinking sources={sources.length} />
          </div>
        ) : (
          <div
            className={cn(
              "prose prose-sm max-w-none leading-relaxed dark:prose-invert prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5 [&>:first-child]:mt-0.5",
              message.error && "rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2 [&>:first-child]:mt-0"
            )}
          >
            <Markdown
              components={{
                a: ({ href, children }) => {
                  const n = href?.startsWith("#source-") ? Number(href.slice(8)) : NaN;
                  const source = sources.find((s) => s.n === n);
                  if (source) {
                    return (
                      <a
                        href={source.href}
                        onClick={onNavigate}
                        title={source.title}
                        className="mx-0.5 inline-flex size-4 -translate-y-0.5 items-center justify-center rounded bg-muted align-middle font-mono text-[0.6rem] font-semibold text-foreground no-underline transition-colors hover:bg-primary hover:text-primary-foreground"
                      >
                        {n}
                      </a>
                    );
                  }
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  );
                },
              }}
            >
              {linkCitations(message.content)}
            </Markdown>
          </div>
        )}
        {!message.pending && cited.length > 0 && <SourceChips sources={cited} onNavigate={onNavigate} />}
      </div>
    </div>
  );
}
