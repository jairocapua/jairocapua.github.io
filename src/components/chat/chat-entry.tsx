"use client";

import { ArrowUp, MessageCircle, Sparkles } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { STARTER_QUESTIONS, openChat } from "@/lib/chat-client";
import { cn } from "@/lib/utils";

/**
 * Types each starter question out, holds it, deletes it, then moves to the next.
 * Starts holding the first one whole, so the server render isn't empty. Paused
 * (where it is) while the input has focus; still for reduced motion.
 */
function useTypedQuestion(paused: boolean) {
  const [text, setText] = useState(STARTER_QUESTIONS[0]);
  const pos = useRef({ line: 0, len: STARTER_QUESTIONS[0].length, deleting: true });

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: number;
    const tick = () => {
      const p = pos.current;
      const full = STARTER_QUESTIONS[p.line];
      p.len += p.deleting ? -1 : 1;
      setText(full.slice(0, p.len));
      let delay = p.deleting ? 22 : 48;
      if (!p.deleting && p.len === full.length) {
        p.deleting = true;
        delay = 2400;
      } else if (p.deleting && p.len === 0) {
        p.deleting = false;
        p.line = (p.line + 1) % STARTER_QUESTIONS.length;
        delay = 350;
      }
      timer = window.setTimeout(tick, delay);
    };
    timer = window.setTimeout(tick, 2400);
    return () => window.clearTimeout(timer);
  }, [paused]);

  return text;
}

/** The hero's ask bar: type a question here and it's sent in the chat panel. */
export function AskAiPrompt({ className }: { className?: string }) {
  const id = useId();
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const typed = useTypedQuestion(focused);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // Empty still opens the panel, which offers the starter questions.
        openChat(value.trim() || undefined);
        setValue("");
      }}
      className={cn(
        "group flex w-full items-center gap-2 rounded-full border bg-card p-1.5 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-foreground/20 focus-within:border-foreground/30 focus-within:shadow-md",
        className
      )}
    >
      <label
        htmlFor={id}
        className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-muted py-1 pl-2.5 pr-3 text-xs font-medium text-foreground"
      >
        <Sparkles
          aria-hidden
          className="size-3.5 shrink-0 transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110 motion-reduce:transition-none"
        />
        {/* Phones get the short label, so the questions fit beside it. */}
        <span>
          <span className="hidden sm:inline">Ask my </span>AI
        </span>
      </label>
      <div className="relative min-w-0 flex-1">
        <input
          id={id}
          value={value}
          maxLength={1000}
          enterKeyHint="send"
          autoComplete="off"
          aria-label="Ask my AI about me"
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent py-1 text-sm text-foreground outline-none"
        />
        {!value && (
          // RTL with left-aligned text: a question that fits sits at the left,
          // and one too long for a phone overflows off the left, like an input.
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center text-sm text-muted-foreground"
          >
            <span className="w-full overflow-hidden whitespace-nowrap text-left [direction:rtl]">
              <span dir="ltr">
                {typed}
                <span className="typing-caret ml-px align-[-0.15em] group-focus-within:invisible" />
              </span>
            </span>
          </span>
        )}
      </div>
      <button
        type="submit"
        aria-label="Ask"
        className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-150 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
      >
        <ArrowUp className="size-4" aria-hidden />
      </button>
    </form>
  );
}

/** The dock's chat button. */
export function ChatDockButton({ className, onClick, ...props }: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      aria-label="Ask my AI"
      className={cn(className)}
      {...props}
      onClick={(e) => {
        // A wrapping TooltipTrigger passes its own onClick; keep it.
        onClick?.(e);
        openChat();
      }}
    >
      <MessageCircle className="h-full w-full" aria-hidden />
    </Button>
  );
}
