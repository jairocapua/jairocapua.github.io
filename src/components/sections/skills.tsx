"use client";

import Image from "next/image";
import { TechIcon } from "@/components/profile/tech-icon";
import { BlurFade } from "@/components/magicui/blur-fade";
import { SectionHeading } from "@/components/section-heading";
import { DATA } from "@/data/resume";
import { SKILL_TO_ICON, SKILL_TO_IMAGE } from "@/lib/skill-icons";

const BLUR_FADE_DELAY = 0.04;

export function Skills() {
  return (
    <section id="skills" className="flex flex-col gap-3">
      <BlurFade delay={BLUR_FADE_DELAY * 9}>
        <SectionHeading title="Tech Stack" />
      </BlurFade>
      <div className="flex flex-col gap-3">
        {DATA.skillGroups.map((group, gi) => (
          <BlurFade key={group.category} delay={BLUR_FADE_DELAY * 10 + gi * 0.04}>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-sm font-semibold">{group.category}</h3>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => {
                  const icon = SKILL_TO_ICON[skill];
                  const image = SKILL_TO_IMAGE[skill];
                  return (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 rounded-md bg-foreground/5 px-2 py-1 text-xs text-foreground/80 shadow-[0_1px_1px_rgba(0,0,0,0.03)]"
                    >
                      {icon && <TechIcon slug={icon} alt={skill} className="size-3.5" />}
                      {image && (
                        <Image
                          src={image}
                          alt={skill}
                          width={14}
                          height={14}
                          className="size-3.5 object-contain"
                        />
                      )}
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
