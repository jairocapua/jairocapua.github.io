"use client";

import * as React from "react";
import { ChevronRightIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

/** Compact résumé row sized for the narrow right rail. */
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

  const expandable = Boolean(description);
  const linkable = Boolean(href) && !expandable;
  const interactive = expandable || linkable;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (expandable) {
      e.preventDefault();
      setExpanded((v) => !v);
    }
  };

  const content = (
    <div className="flex items-start gap-3">
      <Avatar className="size-9 flex-none border bg-background">
        <AvatarImage src={logoUrl} alt={altText} className="object-contain" />
        <AvatarFallback>{altText[0]}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex items-start gap-1">
          <h3 className="flex-1 text-sm font-semibold leading-snug">
            {title}
            {badges &&
              badges.length > 0 &&
              badges.map((b) => (
                <span
                  key={b}
                  className="ml-1.5 inline-flex items-center whitespace-nowrap rounded-md border border-border bg-foreground/5 px-1.5 py-0.5 align-middle text-xs font-medium text-foreground/80"
                >
                  {b}
                </span>
              ))}
          </h3>
          {description && (
            <ChevronRightIcon
              className={cn(
                "mt-0.5 size-3.5 flex-none text-muted-foreground transition-transform duration-300",
                expanded ? "rotate-90" : "rotate-0"
              )}
            />
          )}
        </div>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        {period.trim() && (
          <p className="font-mono text-[11px] text-muted-foreground">{period}</p>
        )}
        {description && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: expanded ? 1 : 0, height: expanded ? "auto" : 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden text-xs leading-relaxed text-muted-foreground"
          >
            <p className="pt-1.5">{description}</p>
          </motion.div>
        )}
      </div>
    </div>
  );

  if (!interactive) {
    return content;
  }

  return (
    <a
      href={linkable ? href : "#"}
      className="group block cursor-pointer"
      onClick={handleClick}
    >
      {content}
    </a>
  );
}
