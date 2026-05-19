"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BlurFade } from "@/components/magicui/blur-fade";
import { BlurFadeText } from "@/components/magicui/blur-fade-text";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function Hero() {
  return (
    <section id="hero" className="space-y-8">
      <div className="mx-auto w-full max-w-2xl space-y-8">
        <div className="flex justify-between gap-2">
          <div className="flex flex-1 flex-col space-y-1.5">
            <BlurFadeText
              delay={BLUR_FADE_DELAY}
              className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
              yOffset={8}
              text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
            />
            <BlurFadeText
              className="max-w-[600px] md:text-xl"
              delay={BLUR_FADE_DELAY}
              text={DATA.description}
            />
          </div>
          <BlurFade delay={BLUR_FADE_DELAY}>
            <Avatar className="size-28 border">
              <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
              <AvatarFallback>{DATA.initials}</AvatarFallback>
            </Avatar>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
