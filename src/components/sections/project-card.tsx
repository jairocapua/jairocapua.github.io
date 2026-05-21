"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

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
  link?: string;
  image?: string;
  video?: string;
  links?: readonly ProjectLink[];
  className?: string;
}

export function ProjectCard({ tags, links, className }: ProjectCardProps) {
  const tagCount = tags?.length ?? 4;
  const linkCount = links?.length ?? 2;

  return (
    <Card
      className={cn("flex flex-col overflow-hidden border", className)}
      aria-busy="true"
      aria-live="polite"
    >
      <Skeleton className="h-40 w-full rounded-none" />
      <CardHeader className="px-2">
        <div className="space-y-2">
          <Skeleton className="mt-1 h-4 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
          <div className="space-y-1.5 pt-1">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-11/12" />
            <Skeleton className="h-3 w-4/5" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex flex-col px-2">
        <div className="mt-2 flex flex-wrap gap-1">
          {Array.from({ length: tagCount }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-10 rounded-full" />
          ))}
        </div>
      </CardContent>
      <CardFooter className="px-2 pb-2">
        <div className="flex flex-row flex-wrap items-start gap-1">
          {Array.from({ length: linkCount }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-14 rounded-md" />
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
