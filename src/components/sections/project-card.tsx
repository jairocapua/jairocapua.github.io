"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ProjectLink {
  type: string;
  href: string;
  icon: string;
}

interface ProjectCardProps {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly ProjectLink[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  video,
  links,
  className,
}: ProjectCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border transition-all duration-300 ease-out hover:shadow-lg",
        className
      )}
    >
      <Link href={href ?? "#"} className="block cursor-pointer" target="_blank" rel="noreferrer">
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="pointer-events-none mx-auto h-40 w-full object-cover object-top"
          />
        ) : image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={image}
            alt={title}
            className="pointer-events-none mx-auto h-40 w-full overflow-hidden object-cover object-top"
          />
        ) : (
          <div className="h-40 w-full bg-muted" />
        )}
      </Link>
      <CardHeader className="px-2">
        <div className="space-y-1">
          <CardTitle className="mt-1 text-base">{title}</CardTitle>
          <time className="font-sans text-xs text-muted-foreground">{dates}</time>
          <div className="hidden font-sans text-xs underline print:visible">
            {href?.replace(/^https?:\/\//, "")}
          </div>
          <p className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert">
            {description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        {tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {tags.map((t) => (
              <Badge key={t} className="px-1 py-0 text-[10px]" variant="secondary">
                {t}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="px-2 pb-2">
        {links && links.length > 0 && (
          <div className="flex flex-row flex-wrap items-start gap-1">
            {links.map((l) => (
              <Link key={l.href} href={l.href} target="_blank" rel="noreferrer">
                <Badge className="flex gap-2 px-2 py-1 text-[10px]">{l.type}</Badge>
              </Link>
            ))}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
