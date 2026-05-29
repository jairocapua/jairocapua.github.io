import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProjectLink {
  type: string;
  href: string;
  icon: string;
}

interface ProjectCardProps {
  title?: string;
  href?: string;
  description?: string;
  dates?: string;
  tags?: readonly string[];
  links?: readonly ProjectLink[];
}

/** Compact, text-only project entry in the bryllim style (no thumbnail). */
export function ProjectCard({ title, href, description, dates, tags, links }: ProjectCardProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start justify-between gap-2">
        <Link
          href={href ?? "#"}
          target={href ? "_blank" : undefined}
          rel="noreferrer"
          className="group inline-flex items-center gap-1 text-sm font-semibold leading-snug hover:underline"
        >
          {title}
          <ArrowUpRight className="size-3.5 flex-none text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
        {dates && (
          <time className="flex-none whitespace-nowrap font-mono text-[11px] text-muted-foreground">
            {dates}
          </time>
        )}
      </div>
      {description && (
        <p className="text-xs leading-relaxed text-muted-foreground">{description}</p>
      )}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map((t) => (
            <span
              key={t}
              className="rounded bg-foreground/5 px-1.5 py-0.5 text-[10px] text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
      )}
      {links && links.length > 0 && (
        <div className="flex flex-wrap gap-3 pt-0.5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
            >
              {l.type} ↗
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
