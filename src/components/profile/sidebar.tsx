"use client";

import Image from "next/image";
import Link from "next/link";
import { TechIcon } from "@/components/profile/tech-icon";
import {
  Briefcase,
  Globe,
  Github,
  Linkedin,
  MapPin,
  Mail,
  Trophy,
} from "lucide-react";
import { DATA } from "@/data/resume";
import { FEATURED_TECH, SKILL_TO_ICON } from "@/lib/skill-icons";
import { pretty } from "@/lib/utils";
import { AwardBadge } from "@/components/profile/award-badge";
import type { TabKey } from "@/components/profile/profile-tabs";

function CardTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-3 text-xl font-bold tracking-tight">{children}</h2>;
}

function Row({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-2.5 text-[15px] leading-snug">
      <Icon className="mt-0.5 size-5 flex-none text-fb-text-secondary" />
      <span className="min-w-0">{children}</span>
    </li>
  );
}

export function Sidebar({ onNavigate }: { onNavigate: (tab: TabKey) => void }) {
  const currentJob = DATA.work[0];
  const school = DATA.education[0];
  const grid = FEATURED_TECH.slice(0, 9);

  return (
    <div className="space-y-4 md:sticky md:top-4">
      {/* Personal details */}
      <section className="fb-card p-4">
        <CardTitle>Personal details</CardTitle>
        <ul className="space-y-2.5">
          <Row icon={MapPin}>
            <span className="font-semibold">{DATA.location}</span>
          </Row>
          {currentJob && (
            <Row icon={Briefcase}>
              {currentJob.title} at{" "}
              <span className="font-semibold">{currentJob.company}</span>
            </Row>
          )}
          <Row icon={Trophy}>
            <span className="font-semibold">{DATA.badge}</span>
          </Row>
          <Row icon={Globe}>
            <Link
              href={DATA.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-fb-blue hover:underline"
            >
              {pretty(DATA.url)}
            </Link>
          </Row>
        </ul>
      </section>

      {/* Education */}
      {school && (
        <section className="fb-card p-4">
          <CardTitle>Education</CardTitle>
          <div className="flex items-start gap-3">
            <Image
              src={school.logoUrl}
              alt={school.school}
              width={48}
              height={48}
              className="size-11 flex-none rounded-full border border-border bg-white object-contain p-0.5"
            />
            <div className="min-w-0">
              <p className="text-[15px] font-semibold leading-snug">
                {school.school}
              </p>
              <p className="text-sm text-fb-text-secondary">{school.degree}</p>
              {school.badges?.map((b) => (
                <AwardBadge key={b}>{b}</AwardBadge>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact info */}
      <section className="fb-card p-4">
        <CardTitle>Contact info</CardTitle>
        <ul className="space-y-2.5">
          <Row icon={Github}>
            <Link
              href={DATA.contact.social.GitHub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-fb-blue hover:underline"
            >
              {pretty(DATA.contact.social.GitHub.url)}
            </Link>
          </Row>
          <Row icon={Linkedin}>
            <Link
              href={DATA.contact.social.LinkedIn.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-fb-blue hover:underline"
            >
              {pretty(DATA.contact.social.LinkedIn.url)}
            </Link>
          </Row>
          <Row icon={Mail}>
            <Link
              href={`mailto:${DATA.contact.email}`}
              className="font-medium text-fb-blue hover:underline"
            >
              {DATA.contact.email}
            </Link>
          </Row>
        </ul>
      </section>

      {/* Tech Stack (the "Friends" grid) */}
      <section className="fb-card p-4">
        <div className="mb-1 flex items-baseline justify-between">
          <h2 className="text-xl font-bold tracking-tight">Tech Stack</h2>
          <button
            type="button"
            onClick={() => onNavigate("skills")}
            className="text-[15px] text-fb-blue hover:underline"
          >
            See all
          </button>
        </div>
        <p className="mb-3 text-sm text-fb-text-secondary">
          {DATA.skills.length} technologies
        </p>
        <div className="grid grid-cols-3 gap-2">
          {grid.map((tech) => (
            <button
              key={tech}
              type="button"
              onClick={() => onNavigate("skills")}
              className="group"
              title={tech}
            >
              <div className="flex aspect-square items-center justify-center rounded-lg border border-border bg-fb-hover transition-colors group-hover:bg-fb-gray">
                <TechIcon slug={SKILL_TO_ICON[tech]} alt={tech} className="size-9" />
              </div>
              <span className="mt-1 block truncate text-center text-xs text-fb-text-secondary">
                {tech}
              </span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
