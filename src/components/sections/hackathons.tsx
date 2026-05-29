"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { HackathonCard } from "@/components/sections/hackathon-card";
import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export function Hackathons() {
  return (
    <section id="hackathons" className="flex flex-col gap-6">
      <BlurFade delay={BLUR_FADE_DELAY * 11}>
        <SectionHeading
          eyebrow="Hackathons"
          title="I build under pressure"
          description="Where I've shipped real products in 48 hours — from AI voice interviewers to sustainability tools."
        />
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 12}>
        <ul className="ml-4 divide-y divide-dashed border-l border-border">
          {DATA.hackathons.map((h, i) => (
            <BlurFade key={h.title + i} delay={BLUR_FADE_DELAY * 13 + i * 0.05}>
              <HackathonCard
                title={h.title}
                description={h.description}
                location={h.location}
                dates={h.dates}
                image={h.image}
                links={h.links}
              />
            </BlurFade>
          ))}
        </ul>
      </BlurFade>
    </section>
  );
}
