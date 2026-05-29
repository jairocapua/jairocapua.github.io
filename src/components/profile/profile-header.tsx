"use client";

import Image from "next/image";
import Link from "next/link";
import { TechIcon } from "@/components/profile/tech-icon";
import {
  Briefcase,
  GraduationCap,
  Github,
  Mail,
  MapPin,
  MessageCircle,
  UserPlus,
} from "lucide-react";
import { DATA } from "@/data/resume";
import { FEATURED_TECH, SKILL_TO_ICON } from "@/lib/skill-icons";

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
            className="inline-flex size-8 items-center justify-center rounded-full bg-white shadow-sm ring-2 ring-white"
          >
            <TechIcon slug={SKILL_TO_ICON[tech]} alt={tech} className="size-5" />
          </span>
        ))}
      </div>
      <span className="text-sm text-fb-text-secondary">
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
  const currentJob = DATA.work[0];
  const school = DATA.education[0];
  const github = DATA.contact.social.GitHub;

  return (
    <div>
      <Cover />
      <div className="px-5 pb-5 sm:px-8 sm:pb-9">
        <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-end sm:gap-7">
          {/* avatar overlapping the cover */}
          <Image
            src={DATA.avatarUrl}
            alt={DATA.name}
            width={168}
            height={168}
            priority
            className="-mt-[4.5rem] size-[136px] flex-none rounded-full bg-white object-cover shadow-md ring-4 ring-white sm:-mt-[5rem] sm:size-[168px]"
          />

          {/* identity */}
          <div className="min-w-0 flex-1 text-center sm:translate-y-7 sm:pb-1 sm:text-left">
            <h1 className="text-[28px] font-bold leading-tight tracking-tight sm:text-[32px]">
              {DATA.name}
            </h1>
            <p className="mt-0.5 text-[15px] font-semibold text-fb-text-secondary">
              {DATA.role}
            </p>

            {/* detail row */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-sm text-fb-text-secondary sm:justify-start">
              <Detail icon={MapPin}>Lives in {DATA.location}</Detail>
              {school && <Detail icon={GraduationCap}>{school.school}</Detail>}
              <Link
                href={github.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-fb-blue hover:underline"
              >
                <Github className="size-4 flex-none" />
                github.com/{DATA.username}
              </Link>
            </div>

            {/* tech stack as friend bubbles */}
            <div className="mt-3 flex justify-center sm:justify-start">
              <TechBubbles />
            </div>
          </div>

          {/* actions */}
          <div className="flex w-full flex-wrap items-center justify-center gap-2 sm:w-auto sm:pb-1">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event("open-chat"))}
              className={`${btnBase} bg-fb-blue text-white hover:bg-fb-blue-hover`}
            >
              <MessageCircle className="size-4" /> Message
            </button>
            <Link
              href={github.url}
              target="_blank"
              rel="noreferrer"
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
