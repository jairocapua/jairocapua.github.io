"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  isClickSoundOn,
  playClick,
  setClickSoundOn,
  subscribeClickSound,
} from "@/lib/click-sound";
import { cn } from "@/lib/utils";

export function SoundToggle({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  // The server renders "on"; a stored "off" takes over after hydration.
  const on = useSyncExternalStore(subscribeClickSound, isClickSoundOn, () => true);
  const Icon = on ? Volume2 : VolumeX;

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      aria-label="Sounds"
      aria-pressed={on}
      className={cn(className)}
      {...props}
      onClick={(e) => {
        // A wrapping TooltipTrigger passes its own onClick; keep it.
        onClick?.(e);
        setClickSoundOn(!on);
        // The press that flipped it on was silent; answer it now.
        if (!on) playClick("press");
      }}
    >
      <Icon className="h-full w-full" aria-hidden />
    </Button>
  );
}
