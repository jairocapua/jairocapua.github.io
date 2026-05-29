import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, Globe, Pin, Trophy } from "lucide-react";
import { DATA } from "@/data/resume";
import type { FeedPost, PostCategory } from "@/lib/posts";

const CATEGORY_LABEL: Record<PostCategory, string> = {
  education: "Education",
  experience: "Experience",
  hackathon: "Hackathon",
  project: "Project",
  certification: "Certification",
};

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="mr-1 mt-1 inline-flex items-center gap-1 rounded-md bg-fb-blue-light px-1.5 py-0.5 text-xs font-semibold text-fb-blue">
      <Trophy className="size-3" /> {children}
    </span>
  );
}

/** Inner "card within a post" used for jobs and degrees. */
function DetailBox({ post }: { post: FeedPost }) {
  return (
    <div className="mt-2.5 flex items-start gap-3 rounded-lg border border-border bg-fb-hover p-3">
      {post.logoUrl && (
        <Image
          src={post.logoUrl}
          alt={post.title}
          width={48}
          height={48}
          className="size-12 flex-none rounded-md border border-border bg-white object-contain p-1"
        />
      )}
      <div className="min-w-0 flex-1">
        <p className="font-semibold leading-snug">{post.title}</p>
        {post.subtitle && (
          <p className="text-sm text-fb-text-secondary">{post.subtitle}</p>
        )}
        {(post.meta || post.location) && (
          <p className="text-xs text-fb-text-secondary">
            {[post.meta, post.location].filter(Boolean).join(" · ")}
          </p>
        )}
        {post.badges?.map((b) => <Badge key={b}>{b}</Badge>)}
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
              rel="noreferrer"
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
