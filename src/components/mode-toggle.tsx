"use client";

import { Button } from "@/components/ui/button";
import { SunMoon } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export function ModeToggle({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  // resolvedTheme, not theme: with the "system" default, theme is "system"
  // until the first click, which would make that click a no-op in dark mode.
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      aria-label="Toggle theme"
      className={cn(className)}
      {...props}
      onClick={(e) => {
        // A wrapping TooltipTrigger passes its own onClick; keep it.
        onClick?.(e);
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
    >
      <SunMoon className="h-full w-full" aria-hidden />
    </Button>
  );
}
