"use client";

import Image from "next/image";
import Link from "next/link";
import { TechIcon } from "@/components/profile/tech-icon";
import {
  GraduationCap,
  Github,
  Mail,
  MapPin,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import { DATA } from "@/data/resume";
import { FEATURED_TECH, SKILL_TO_ICON } from "@/lib/skill-icons";
import { openChat } from "@/lib/chat";
import { pretty } from "@/lib/utils";

const btnBase =
  "inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-4 text-[15px] font-semibold transition-colors";

/** Cover photo — drop your image at public/cover.jpg to update it. */
function Cover() {
  return (
    <div className="relative h-44 w-full overflow-hidden sm:h-60 lg:h-[20.5rem]">
      <Image
        src="/cover.jpg"
        alt="Cover photo"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      {/* bottom shade so the white avatar ring reads against the photo */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
    </div>
  );
}

/** Tech stack shown as overlapping "friend" avatar bubbles. */
function TechBubbles() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex -space-x-2">
        {FEATURED_TECH.map((tech) => (
          <span
            key={tech}
            title={tech}
            className="inline-flex size-8 items-center justify-center rounded-full bg-white shadow-sm ring-2 ring-white dark:bg-fb-hover dark:ring-fb-card"
          >
            <TechIcon slug={SKILL_TO_ICON[tech]} alt={tech} className="size-5" />
          </span>
        ))}
      </div>
      <span className="whitespace-nowrap text-sm text-fb-text-secondary">
        {DATA.skills.length} technologies
      </span>
    </div>
  );
}

function Detail({
  icon: Icon,
  children,
}: {
  icon: typeof MapPin;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <Icon className="size-4 flex-none text-fb-text-secondary" />
      {children}
    </span>
  );
}

export function ProfileHeader() {
  const school = DATA.education[0];
  const github = DATA.contact.social.GitHub;

  return (
    <div>
      <Cover />
      <div className="px-5 pb-5 sm:px-8 sm:pb-9">
        <div className="flex flex-col items-center gap-3 lg:flex-row lg:items-end lg:gap-7">
          {/* avatar overlapping the cover */}
          <Image
            src={DATA.avatarUrl}
            alt={DATA.name}
            width={168}
            height={168}
            priority
            className="relative z-10 -mt-[4.5rem] size-[136px] flex-none rounded-full bg-white object-cover shadow-md ring-4 ring-white dark:ring-fb-card sm:-mt-[5rem] sm:size-[168px]"
          />

          {/* identity */}
          <div className="min-w-0 flex-1 text-center lg:translate-y-7 lg:pb-1 lg:text-left">
            <h1 className="flex items-center justify-center gap-1.5 text-[28px] font-bold leading-tight tracking-tight sm:text-[32px] lg:justify-start">
              {DATA.name}
              <Image
                src="/twitter-verified-badge.svg"
                alt="Verified"
                title="Verified"
                width={24}
                height={24}
                className="inline-block size-6 flex-none translate-y-px"
              />
            </h1>
            <p className="mt-0.5 text-[15px] font-semibold text-fb-text-secondary">
              {DATA.role}
            </p>

            {/* detail row */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-sm text-fb-text-secondary lg:justify-start">
              <Detail icon={MapPin}> {DATA.location}</Detail>
              {school && <Detail icon={GraduationCap}>{school.school}</Detail>}
              <Link
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-fb-blue hover:underline"
              >
                <Github className="size-4 flex-none" />
                {pretty(github.url)}
              </Link>
            </div>

            {/* tech stack as friend bubbles */}
            <div className="mt-3 flex justify-center lg:justify-start">
              <TechBubbles />
            </div>
          </div>

          {/* actions */}
          <div className="flex w-full flex-wrap items-center justify-center gap-2 lg:w-auto lg:pb-1">
            <button
              type="button"
              onClick={openChat}
              className={`${btnBase} bg-fb-blue text-white hover:bg-fb-blue-hover`}
            >
              <MessageCircle className="size-4" /> Message
            </button>
            <Link
              href={github.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${btnBase} bg-fb-blue-light text-fb-blue hover:bg-fb-blue-light-hover`}
            >
              <UserPlus className="size-4" /> Follow
            </Link>
            <Link
              href={`mailto:${DATA.contact.email}`}
              className={`${btnBase} bg-fb-gray text-fb-text hover:bg-fb-gray-hover`}
            >
              <Mail className="size-4" /> Email
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
