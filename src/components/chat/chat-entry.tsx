"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { openChat } from "@/lib/chat-client";
import { cn } from "@/lib/utils";

/** The hero's "Ask my AI about me" prompt. */
export function AskAiPrompt({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => openChat()}
      className={cn(
        "rainbow-ring group inline-flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-medium shadow-sm",
        className
      )}
    >
      <span aria-hidden className="rainbow-icon size-5 shrink-0" />
      Ask my AI about me
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
        →
      </span>
    </button>
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
