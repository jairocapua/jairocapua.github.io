"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Inline "Show more" disclosure used on project cards to reveal a longer
 * write-up and the full technology list without leaving the feed.
 */
export function ProjectDetails({
  details,
  stack,
}: {
  details: string;
  stack?: readonly string[];
}) {
  const [open, setOpen] = useState(false);
  const paragraphs = details.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <div className="mt-2.5">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-1 text-sm font-semibold text-fb-blue transition-colors hover:underline"
      >
        <ChevronDown
          className={`size-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
        {open ? "Show less" : "Show more"}
      </button>

      {open && (
        <div className="mt-2 space-y-3 rounded-xl border border-border bg-fb-hover/60 p-3">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-relaxed text-fb-text">
              {p}
            </p>
          ))}

          {stack && stack.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-fb-text-secondary">
                Tech stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {stack.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border bg-fb-card px-2 py-0.5 text-xs text-fb-text-secondary"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
