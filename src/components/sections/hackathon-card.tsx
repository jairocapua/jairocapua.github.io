"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HackathonLink {
  title: string;
  href: string;
  icon: string;
}

interface HackathonCardProps {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  links?: readonly HackathonLink[];
}

export function HackathonCard({
  title,
  description,
  dates,
  location,
  image,
  links,
}: HackathonCardProps) {
  return (
    <li className="relative ml-10 py-4">
      <div className="absolute -left-16 top-2 flex items-center justify-center rounded-full bg-background">
        <Avatar className="size-12 border">
          <AvatarImage src={image} alt={title} className="object-contain" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-1 flex-col justify-start gap-1">
        <time className="font-mono text-xs text-muted-foreground">{dates}</time>
        <h3 className="font-semibold leading-snug">{title}</h3>
        {location && <p className="text-sm text-muted-foreground">{location}</p>}
        {description && (
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      {links && links.length > 0 && (
        <div className="mt-2 flex flex-row flex-wrap items-start gap-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md border border-border bg-muted px-2 py-1 text-xs"
            >
              {l.title}
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
