"use client";

import StackIcon from "tech-stack-icons";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

const SKILL_TO_ICON: Record<string, string> = {
  React: "react",
  "Next.js": "nextjs",
  TypeScript: "typescript",
  JavaScript: "js",
  "Node.js": "nodejs",
  Python: "python",
  "Tailwind CSS": "tailwindcss",
  Express: "expressjs",
  CloudFlare: "cloudflare",
  Firebase: "firebase",
  "Google Cloud Platform": "gcloud",
  PostgreSQL: "postgresql",
  MongoDB: "mongodb",
  Docker: "docker",
  Git: "git",
  Figma: "figma",
  Supabase: "supabase",
  Postman: "postman",
  AWS: "aws",
  OpenAI: "openai",
  Claude: "claude",
  Vercel: "vercel",
  n8n: "n8n",
  Zapier: "zapier",
  "Make.com": "make",
};

export function Skills() {
  return (
    <section id="skills">
      <div className="flex min-h-0 flex-col gap-y-3">
        <BlurFade delay={BLUR_FADE_DELAY * 9}>
          <h2 className="text-xl font-bold">Skills</h2>
        </BlurFade>
        <div className="flex flex-wrap gap-2">
          {DATA.skills.map((skill, i) => {
            const iconName = SKILL_TO_ICON[skill];
            return (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 10 + i * 0.02}>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-2 rounded-full border border-border/60 bg-secondary/40 px-3 py-1.5 text-sm font-medium hover:bg-secondary/70"
                >
                  {iconName && (
                    <StackIcon name={iconName as never} className="size-4" />
                  )}
                  <span>{skill}</span>
                </Badge>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
