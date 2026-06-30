"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * "Show more" disclosure for an automation case study. Modeled on
 * project-details.tsx, but renders the SCAR story as labeled sections:
 * Task (paragraph) → Action (bullets) → Result (bullets). The Situation is
 * shown as the card's description above, so it isn't repeated here.
 */
export function ScarDetails({
  task,
  action,
  result,
  tags,
}: {
  task: string;
  action: string[];
  result: string[];
  tags?: readonly string[];
}) {
  const [open, setOpen] = useState(false);

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
        {open ? "Show less" : "Read the case study"}
      </button>

      {open && (
        <div className="mt-2 space-y-3 rounded-xl border border-border bg-fb-hover/60 p-3">
          <Section label="Task">
            <p className="text-[15px] leading-relaxed text-fb-text">{task}</p>
          </Section>

          <Section label="Action">
            <ul className="space-y-1.5">
              {action.map((a, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-[15px] leading-relaxed text-fb-text"
                >
                  <span className="mt-2 size-1.5 flex-none rounded-full bg-fb-blue" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Result">
            <ul className="space-y-1.5">
              {result.map((r, i) => (
                <li
                  key={i}
                  className="flex gap-2 text-[15px] leading-relaxed text-fb-text"
                >
                  <span className="mt-2 size-1.5 flex-none rounded-full bg-fb-green" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Section>

          {tags && tags.length > 0 && (
            <div>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-fb-text-secondary">
                Tools
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t) => (
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

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-fb-text-secondary">
        {label}
      </p>
      {children}
    </div>
  );
}
