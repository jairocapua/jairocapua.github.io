"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TABS, hrefForKey, tabFromPathname } from "@/lib/tabs";
import { cn } from "@/lib/utils";

export function ProfileTabs() {
  const active = tabFromPathname(usePathname());

  return (
    <nav className="no-scrollbar flex gap-1 overflow-x-auto border-t border-border px-5 pt-1 sm:px-8 sm:pt-1.5">
      {TABS.map((t) => {
        const isActive = active === t.key;
        return (
          <Link
            key={t.key}
            href={hrefForKey(t.key)}
            aria-current={isActive ? "page" : undefined}
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
          </Link>
        );
      })}
    </nav>
  );
}
