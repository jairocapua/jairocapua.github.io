"use client";

import * as React from "react";
import { ChevronRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
}

export function ResumeCard({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
}: ResumeCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (description) {
      e.preventDefault();
      setExpanded((v) => !v);
    }
  };

  return (
    <a
      href={href ?? "#"}
      className="group block cursor-pointer rounded-lg px-2 py-3 transition-colors hover:bg-muted/40"
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        <Avatar className="size-10 flex-none border bg-muted-background dark:bg-foreground">
          <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
          <AvatarFallback>{altText[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-grow items-center justify-between gap-x-3">
          <div className="min-w-0 flex-grow">
            <div className="flex items-center gap-x-2">
              <h3 className="truncate text-sm font-semibold leading-tight sm:text-base">
                {title}
              </h3>
              {badges && badges.length > 0 && (
                <span className="inline-flex gap-x-1">
                  {badges.map((b) => (
                    <Badge variant="secondary" className="align-middle text-xs" key={b}>
                      {b}
                    </Badge>
                  ))}
                </span>
              )}
              {description && (
                <ChevronRightIcon
                  className={cn(
                    "size-4 translate-x-0 transform opacity-0 transition-all duration-300 ease-out group-hover:translate-x-1 group-hover:opacity-100",
                    expanded ? "rotate-90" : "rotate-0"
                  )}
                />
              )}
            </div>
            {subtitle && (
              <div className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                {subtitle}
              </div>
            )}
          </div>
          <div className="flex-none text-right text-xs tabular-nums text-muted-foreground sm:text-sm">
            {period}
          </div>
        </div>
      </div>
      {description && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: expanded ? 1 : 0, height: expanded ? "auto" : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="ml-14 text-xs sm:text-sm"
        >
          {description}
        </motion.div>
      )}
    </a>
  );
}
