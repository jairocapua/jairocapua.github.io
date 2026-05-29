"use client";

import Image from "next/image";
import Markdown from "react-markdown";
import { TechIcon } from "@/components/profile/tech-icon";
import { Composer } from "@/components/profile/composer";
import { PostCard } from "@/components/profile/post-card";
import type { TabKey } from "@/components/profile/profile-tabs";
import { DATA } from "@/data/resume";
import { SKILL_TO_ICON, SKILL_TO_IMAGE } from "@/lib/skill-icons";
import { buildPosts, sortForAll } from "@/lib/posts";

const ALL_POSTS = buildPosts();

function AboutView() {
  return (
    <div className="space-y-4">
      <section className="fb-card p-4 sm:p-5">
        <h2 className="mb-2 text-xl font-bold tracking-tight">About</h2>
        <Markdown className="prose prose-sm max-w-full text-pretty font-sans text-[15px] leading-relaxed text-fb-text prose-strong:font-semibold prose-strong:text-fb-text">
          {DATA.summary}
        </Markdown>
      </section>
      <section className="fb-card p-4 sm:p-5">
        <h2 className="mb-3 text-xl font-bold tracking-tight">Recommendations</h2>
        <div className="space-y-3">
          {DATA.testimonials.map((t, i) => (
            <figure
              key={t.name + i}
              className="rounded-lg border border-border bg-fb-hover p-3"
            >
              <blockquote className="text-[15px] leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-2 text-sm">
                <span className="font-semibold">{t.name}</span>
                <span className="text-fb-text-secondary"> · {t.title}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}

function SkillsView() {
  return (
    <section className="fb-card p-4 sm:p-5">
      <h2 className="mb-1 text-xl font-bold tracking-tight">Tech Stack</h2>
      <p className="mb-4 text-sm text-fb-text-secondary">
        {DATA.skills.length} technologies across the stack
      </p>
      <div className="space-y-4">
        {DATA.skillGroups.map((group) => (
          <div key={group.category}>
            <h3 className="mb-1.5 text-sm font-semibold">{group.category}</h3>
            <div className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => {
                const icon = SKILL_TO_ICON[skill];
                const image = SKILL_TO_IMAGE[skill];
                return (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-fb-hover px-2 py-1 text-xs text-fb-text"
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
        ))}
      </div>
    </section>
  );
}

function postsForTab(tab: TabKey) {
  switch (tab) {
    case "experience":
      return ALL_POSTS.filter(
        (p) => p.category === "experience" || p.category === "education"
      );
    case "projects":
      return ALL_POSTS.filter((p) => p.category === "project");
    case "hackathons":
      return ALL_POSTS.filter((p) => p.category === "hackathon");
    default:
      return sortForAll(ALL_POSTS);
  }
}

export function Feed({ active }: { active: TabKey }) {
  if (active === "about") return <AboutView />;
  if (active === "skills") return <SkillsView />;

  const posts = postsForTab(active);

  return (
    <div key={active} className="space-y-4">
      {active === "all" && <Composer />}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
