"use client";

import { ArrowRight, ArrowUp, Info, RotateCcw, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChatMessageView } from "@/components/chat/chat-message";
import { HowItWorks } from "@/components/chat/how-it-works";
import {
  CHAT_MODEL_LABEL,
  ChatError,
  OPEN_CHAT_EVENT,
  STARTER_QUESTIONS,
  loadMessages,
  saveMessages,
  setChatBusy,
  streamChat,
  type ChatMessage,
} from "@/lib/chat-client";
import { cn } from "@/lib/utils";

const iconButton =
  "inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring";

/**
 * The chat panel: slides up above the dock when a hero prompt, the dock icon
 * or Clawd opens it. Answers stream in with source chips.
 */
export function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState<"chat" | "how">("chat");
  // The panel renders nothing until opened, so reading storage here can't
  // cause a hydration mismatch.
  const [messages, setMessages] = useState<ChatMessage[]>(loadMessages);
  const [input, setInput] = useState("");
  const busy = messages.some((m) => m.pending);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController>(null);

  useEffect(() => saveMessages(messages), [messages]);
  useEffect(() => () => abortRef.current?.abort(), []);

  // The chat follows the newest message; "How this works" reads from the top.
  useEffect(() => {
    listRef.current?.scrollTo({ top: view === "chat" ? listRef.current.scrollHeight : 0 });
  }, [messages, open, view]);

  const send = useCallback(
    async (question: string, history: ChatMessage[]) => {
      const text = question.trim();
      if (!text) return;
      // Patches the assistant message being streamed (always the last one).
      const update = (patch: (m: ChatMessage) => ChatMessage) =>
        setMessages((all) => all.map((m, i) => (i === all.length - 1 ? patch(m) : m)));
      const userMessage: ChatMessage = { role: "user", content: text };
      setMessages([...history, userMessage, { role: "assistant", content: "", pending: true }]);
      setInput("");
      setView("chat");
      setChatBusy(true);

      const controller = new AbortController();
      abortRef.current = controller;
      try {
        await streamChat(
          [...history, userMessage],
          {
            onSources: (sources) => update((m) => ({ ...m, sources })),
            onDelta: (delta) => update((m) => ({ ...m, content: m.content + delta })),
            onDone: (cited) => update((m) => ({ ...m, cited })),
          },
          controller.signal
        );
        update((m) => ({ ...m, pending: false }));
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        const message = err instanceof ChatError ? err.message : "Something went wrong. Please try again.";
        update((m) => ({ ...m, content: message, pending: false, error: true, sources: [], cited: [] }));
      } finally {
        setChatBusy(false);
      }
    },
    []
  );

  // Opened from elsewhere, maybe with a question to ask right away.
  const messagesRef = useRef(messages);
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  useEffect(() => {
    const onOpen = (e: Event) => {
      const question = (e as CustomEvent<{ question?: string }>).detail?.question;
      setOpen(true);
      if (question && !messagesRef.current.some((m) => m.pending)) send(question, messagesRef.current);
      else requestAnimationFrame(() => inputRef.current?.focus());
    };
    window.addEventListener(OPEN_CHAT_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_CHAT_EVENT, onOpen);
  }, [send]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = () => {
    if (!busy) send(input, messages);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.section
          role="dialog"
          aria-label="Jairo's AI"
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.98 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed inset-x-4 bottom-24 z-40 flex h-[min(34rem,calc(100dvh-8rem))] flex-col overflow-hidden rounded-3xl border bg-card text-card-foreground shadow-[0_16px_50px_-12px_rgba(0,0,0,0.35)] sm:inset-x-auto sm:right-6 sm:w-96"
        >
          <header className="flex items-center gap-2.5 border-b px-4 py-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Sparkles className="size-4" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-semibold leading-tight">Jairo&apos;s AI</h2>
              <p className="truncate text-xs text-muted-foreground">Answers from this site</p>
            </div>
            <button
              type="button"
              className={cn(iconButton, view === "how" && "bg-muted text-foreground")}
              aria-label="How this works"
              aria-pressed={view === "how"}
              onClick={() => setView(view === "how" ? "chat" : "how")}
            >
              <Info className="size-4" aria-hidden />
            </button>
            {messages.length > 0 && (
              <button
                type="button"
                className={iconButton}
                aria-label="Start over"
                disabled={busy}
                onClick={() => {
                  setMessages([]);
                  setView("chat");
                }}
              >
                <RotateCcw className="size-4" aria-hidden />
              </button>
            )}
            <button type="button" className={iconButton} aria-label="Close" onClick={() => setOpen(false)}>
              <X className="size-4" aria-hidden />
            </button>
          </header>

          <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 [scrollbar-width:thin]">
            {view === "how" ? (
              <HowItWorks />
            ) : messages.length === 0 ? (
              // Sits at the bottom, by the composer, where the chat will grow from.
              <div className="flex min-h-full flex-col justify-end gap-5">
                <div className="flex flex-col gap-1.5">
                  <p className="text-lg font-semibold tracking-tight">Hi, I&apos;m Jairo&apos;s AI.</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Ask about his work, projects, automations or skills. Every answer links to where it
                    came from on this page.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-xs font-medium text-muted-foreground">Try asking</p>
                  {STARTER_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q, messages)}
                      className="group flex w-full items-center justify-between gap-3 rounded-xl border bg-background px-3.5 py-2.5 text-left text-sm transition-colors hover:border-foreground/20 hover:bg-muted"
                    >
                      {q}
                      <ArrowRight
                        className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-foreground motion-reduce:transition-none"
                        aria-hidden
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-5">
                {messages.map((m, i) => (
                  <ChatMessageView key={i} message={m} onNavigate={() => setOpen(false)} />
                ))}
              </div>
            )}
          </div>

          {/* The composer: the hero ask bar's pill, grown to fit longer questions. */}
          <footer className="px-3 pb-2.5 pt-1">
            <form
              className="flex items-end gap-2 rounded-[1.25rem] border bg-background p-1.5 transition-[border-color,box-shadow] duration-200 focus-within:border-foreground/30 focus-within:shadow-sm"
              onSubmit={(e) => {
                e.preventDefault();
                submit();
              }}
            >
              <textarea
                ref={inputRef}
                rows={1}
                value={input}
                maxLength={1000}
                placeholder="Ask about Jairo's work…"
                aria-label="Your question"
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    submit();
                  }
                }}
                className="field-sizing-content max-h-28 min-h-8 flex-1 resize-none bg-transparent px-2.5 py-1.5 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={busy || !input.trim()}
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-[opacity,transform] duration-150 hover:scale-105 active:scale-95 disabled:scale-100 disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring motion-reduce:transition-none"
              >
                <ArrowUp className="size-4" aria-hidden />
              </button>
            </form>
            <p className="mt-2 text-center text-[0.68rem] leading-snug text-muted-foreground">
              Powered by {CHAT_MODEL_LABEL} · Questions are logged anonymously to improve answers
            </p>
          </footer>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
