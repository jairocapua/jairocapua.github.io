"use client";

import { FileText } from "lucide-react";
import Markdown from "react-markdown";
import type { ChatMessage, ChatSource } from "@/lib/chat-client";
import { cn } from "@/lib/utils";

/** "[2]" in the answer becomes a link the custom `a` renderer turns into a citation. */
function linkCitations(text: string): string {
  return text.replace(/\[(\d+)\](?!\()/g, "[$1](#source-$1)");
}

function TypingDots() {
  return (
    <span className="flex h-5 items-center gap-1" aria-label="Thinking">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="size-1.5 animate-bounce rounded-full bg-muted-foreground/60 motion-reduce:animate-none"
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
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
          className="inline-flex max-w-full items-center gap-1 rounded-full border bg-background px-2 py-0.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <span className="font-mono text-[0.65rem] text-[#D77757]">{s.n}</span>
          <FileText className="size-3 shrink-0" aria-hidden />
          <span className="truncate">{s.title}</span>
        </a>
      ))}
    </div>
  );
}

export function ChatMessageView({ message, onNavigate }: { message: ChatMessage; onNavigate: () => void }) {
  if (message.role === "user") {
    return (
      <div className="ml-8 self-end rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground">
        {message.content}
      </div>
    );
  }

  const sources = message.sources ?? [];
  const cited = sources.filter((s) => message.cited?.includes(s.n));

  return (
    <div className="mr-8 flex flex-col gap-2">
      <div
        className={cn(
          "rounded-2xl rounded-bl-sm bg-muted px-3 py-2 text-sm",
          message.error && "border border-destructive/30 bg-destructive/5"
        )}
      >
        {message.pending && !message.content ? (
          <TypingDots />
        ) : (
          <div className="prose prose-sm max-w-none leading-relaxed dark:prose-invert prose-p:my-1.5 prose-ul:my-1.5 prose-li:my-0.5">
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
                        className="mx-0.5 inline-flex size-4 -translate-y-0.5 items-center justify-center rounded-full bg-[#D77757]/15 align-middle font-mono text-[0.6rem] font-semibold text-[#D77757] no-underline hover:bg-[#D77757]/25"
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
      </div>
      {!message.pending && cited.length > 0 && <SourceChips sources={cited} onNavigate={onNavigate} />}
    </div>
  );
}
