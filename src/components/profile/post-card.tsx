import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  CalendarDays,
  Globe,
  MapPin,
  Pin,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DATA } from "@/data/resume";
import { AwardBadge } from "@/components/profile/award-badge";
import { ProjectDetails } from "@/components/profile/project-details";
import type { FeedPost, PostCategory } from "@/lib/posts";

const CATEGORY_LABEL: Record<PostCategory, string> = {
  education: "Education",
  experience: "Experience",
  hackathon: "Hackathon",
  project: "Project",
  certification: "Certification",
};

/** A small icon + label pill used for job/degree metadata. */
function MetaChip({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-fb-card px-2 py-0.5 text-xs text-fb-text-secondary ring-1 ring-border">
      <Icon className="size-3 flex-none" />
      {children}
    </span>
  );
}

/** Inner "card within a post" used for jobs and degrees. */
function DetailBox({ post }: { post: FeedPost }) {
  const isCurrent = /present/i.test(post.meta ?? "");

  return (
    <div className="mt-2.5 flex items-start gap-3 rounded-xl border border-border bg-fb-hover/60 p-3 transition-colors hover:bg-fb-hover">
      {post.logoUrl && (
        <Image
          src={post.logoUrl}
          alt={post.title}
          width={56}
          height={56}
          className="size-14 flex-none rounded-lg border border-border bg-white object-contain p-1.5 shadow-sm"
        />
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold leading-snug">{post.title}</p>
          {isCurrent && (
            <span className="inline-flex flex-none items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Present
            </span>
          )}
        </div>
        {post.subtitle && (
          <p className="text-sm font-medium text-fb-text-secondary">{post.subtitle}</p>
        )}
        {(post.meta || post.location || post.workSetup) && (
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {post.location && <MetaChip icon={MapPin}>{post.location}</MetaChip>}
            {post.workSetup && <MetaChip icon={Briefcase}>{post.workSetup}</MetaChip>}
            {post.meta && <MetaChip icon={CalendarDays}>{post.meta}</MetaChip>}
          </div>
        )}
        {post.badges && post.badges.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {post.badges.map((b) => (
              <AwardBadge key={b}>{b}</AwardBadge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Tags({ tags }: { tags: readonly string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-md bg-fb-hover px-2 py-0.5 text-xs text-fb-text-secondary"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function PostImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mt-2.5 aspect-[16/10] w-full bg-fb-hover">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 640px"
        className="object-cover"
      />
    </div>
  );
}

export function PostCard({ post }: { post: FeedPost }) {
  const withBox = post.category === "experience" || post.category === "education";
  const isCert = post.category === "certification";

  return (
    <article className="fb-card overflow-hidden">
      {post.pinned && (
        <div className="flex items-center gap-1.5 px-4 pt-2.5 text-xs font-medium text-fb-text-secondary">
          <Pin className="size-3.5" /> Pinned
        </div>
      )}

      {/* author header */}
      <header className="flex items-center gap-2.5 px-4 pt-3">
        <Image
          src={DATA.avatarUrl}
          alt={DATA.name}
          width={40}
          height={40}
          className="size-10 flex-none rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="text-[15px] font-semibold leading-tight">{DATA.name}</p>
          <p className="flex items-center gap-1 text-xs text-fb-text-secondary">
            {post.meta && !withBox && !isCert ? <span>{post.meta} · </span> : null}
            <Globe className="size-3" />
          </p>
        </div>
        <span className="ml-auto rounded-full bg-fb-hover px-2.5 py-1 text-xs font-medium text-fb-text-secondary">
          {CATEGORY_LABEL[post.category]}
        </span>
      </header>

      {/* body */}
      <div className="px-4 pb-3 pt-2.5">
        <p className="text-[15px] leading-relaxed">{post.lead}</p>

        {withBox && <DetailBox post={post} />}

        {!withBox && !isCert && (
          <>
            <h3 className="mt-1 text-lg font-bold leading-snug">{post.title}</h3>
            {(post.meta || post.location) && (
              <p className="text-sm text-fb-text-secondary">
                {[post.location, post.meta].filter(Boolean).join(" · ")}
              </p>
            )}
          </>
        )}

        {isCert && (
          <div className="mt-2.5 flex items-center gap-3 rounded-lg border border-border bg-fb-hover p-3">
            <span className="grid size-11 flex-none place-items-center rounded-full bg-fb-blue-light">
              <Award className="size-5 text-fb-blue" />
            </span>
            <div className="min-w-0">
              <p className="font-semibold leading-snug">{post.title}</p>
              <p className="text-sm text-fb-text-secondary">
                {[post.subtitle, post.meta].filter(Boolean).join(" · ")}
              </p>
            </div>
          </div>
        )}

        {post.description && (
          <p className="mt-2.5 text-[15px] leading-relaxed">{post.description}</p>
        )}

        {post.tags && post.tags.length > 0 && <Tags tags={post.tags} />}

        {post.details && <ProjectDetails details={post.details} stack={post.stack} />}
      </div>

      {post.image && <PostImage src={post.image} alt={post.title} />}

      {/* footer links instead of like/comment/share */}
      {post.links && post.links.length > 0 && (
        <div className="flex flex-wrap border-t border-border px-2 py-1">
          {post.links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-semibold text-fb-text-secondary transition-colors hover:bg-fb-hover"
            >
              <ArrowUpRight className="size-4" /> {l.label}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
