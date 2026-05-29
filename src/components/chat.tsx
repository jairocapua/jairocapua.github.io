"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DATA } from "@/data/resume";
import { getAnswer, SUGGESTED_QUESTIONS, type ChatMessage } from "@/lib/chat";
import { cn } from "@/lib/utils";

export function Chat() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const firstName = DATA.name.split(" ")[0];

  React.useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, open]);

  // Allow other components (hero / contact CTAs) to open the chat.
  React.useEffect(() => {
    const openChat = () => setOpen(true);
    window.addEventListener("open-chat", openChat);
    return () => window.removeEventListener("open-chat", openChat);
  }, []);

  const send = (text: string) => {
    const q = text.trim();
    if (!q) return;
    const answer = getAnswer(q);
    setMessages((m) => [
      ...m,
      { role: "user", content: q },
      { role: "assistant", content: answer },
    ]);
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : `Chat with ${firstName}`}
        className="fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full bg-fb-blue text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed bottom-20 right-5 z-50 flex h-[30rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <Avatar className="size-9 border">
                <AvatarImage src={DATA.avatarUrl} alt={DATA.name} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold leading-tight">
                  Chat with {firstName}
                </p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Sparkles className="size-3" /> AI demo · answers from my résumé
                </p>
              </div>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 ? (
                <div className="space-y-3">
                  <Bubble role="assistant">
                    Hi! 👋 I&apos;m {firstName}&apos;s assistant. Ask me anything about my
                    work, skills, or how to get in touch.
                  </Bubble>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {SUGGESTED_QUESTIONS.map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                messages.map((m, i) => (
                  <Bubble key={i} role={m.role}>
                    {m.content}
                  </Bubble>
                ))
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask ${firstName} something…`}
                className="min-w-0 flex-1 rounded-full border border-border bg-background px-4 py-2 text-sm outline-none transition-colors focus:border-foreground/40"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!input.trim()}
                className="flex size-9 flex-none items-center justify-center rounded-full bg-fb-blue text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Bubble({
  role,
  children,
}: {
  role: "user" | "assistant";
  children: React.ReactNode;
}) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
          isUser ? "bg-fb-blue text-white" : "bg-muted text-foreground"
        )}
      >
        {children}
      </div>
    </div>
  );
}
