"use client";

import { cn } from "@/lib/utils";

export type TabKey =
  | "all"
  | "about"
  | "experience"
  | "projects"
  | "hackathons"
  | "skills";

const TABS: { key: TabKey; label: string }[] = [
  { key: "all", label: "Posts" },
  { key: "about", label: "About" },
  { key: "experience", label: "Experience" },
  { key: "projects", label: "Projects" },
  { key: "hackathons", label: "Hackathons" },
  { key: "skills", label: "Skills" },
];

export function ProfileTabs({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (key: TabKey) => void;
}) {
  return (
    <nav className="no-scrollbar flex gap-1 overflow-x-auto border-t border-border px-5 pt-1 sm:px-8 sm:pt-1.5">
      {TABS.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={cn(
              "relative whitespace-nowrap rounded-md px-3 py-3.5 text-[15px] font-semibold transition-colors",
              isActive
                ? "text-fb-blue"
                : "text-fb-text-secondary hover:bg-fb-hover"
            )}
          >
            {t.label}
            {isActive && (
              <span className="absolute inset-x-2 bottom-0 h-[3px] rounded-full bg-fb-blue" />
            )}
          </button>
        );
      })}
    </nav>
  );
}
