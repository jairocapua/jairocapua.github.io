"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface Day {
  date: string; // YYYY-MM-DD
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

/** ~6 months: 25 full weeks plus the current one. */
const WEEKS = 26;
const PERIOD = "6 months";

const LEVEL_CLASS = [
  "bg-muted",
  "bg-[#9be9a8] dark:bg-[#0e4429]",
  "bg-[#40c463] dark:bg-[#006d32]",
  "bg-[#30a14e] dark:bg-[#26a641]",
  "bg-[#216e39] dark:bg-[#39d353]",
];

/** Keep the last WEEKS weeks, starting on a Sunday so rows line up by weekday. */
function lastWeeks(days: Day[]): Day[] {
  const today = new Date().toISOString().slice(0, 10);
  const past = days.filter((d) => d.date <= today);
  if (past.length === 0) return [];
  const start = new Date(`${past[past.length - 1].date}T00:00:00Z`);
  start.setUTCDate(start.getUTCDate() - start.getUTCDay() - 7 * (WEEKS - 1));
  const startKey = start.toISOString().slice(0, 10);
  return past.filter((d) => d.date >= startKey);
}

// The site is a static export, so the graph is fetched in the browser, once,
// the first time someone opens it. github-contributions-api.jogruber.de is a
// free, keyless mirror of the public contribution graph (it allows CORS).
let request: Promise<Day[]> | null = null;
function loadContributions(user: string): Promise<Day[]> {
  request ??= fetch(`https://github-contributions-api.jogruber.de/v4/${user}?y=last`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<{ contributions: Day[] }>;
    })
    .then((json) => lastWeeks(json.contributions))
    .catch((error) => {
      request = null; // let the next open retry
      throw error;
    });
  return request;
}

const formatDay = (date: string) =>
  new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

/**
 * A dotted-underlined phrase that opens the last ~6 months of the user's
 * GitHub contribution graph on hover, keyboard focus, or tap.
 */
export function GitHubContributions({
  user,
  children,
}: {
  user: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState<Day[] | null>(null);
  const [failed, setFailed] = useState(false);

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (next && !days) {
      setFailed(false);
      loadContributions(user).then(setDays, () => setFailed(true));
    }
  };

  const total = days?.reduce((sum, d) => sum + d.count, 0) ?? 0;

  return (
    <Tooltip open={open} onOpenChange={onOpenChange}>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={(e) => {
            // Radix closes tooltips on click; toggle instead so a tap opens it.
            e.preventDefault();
            onOpenChange(!open);
          }}
          className="cursor-pointer border-b border-dotted border-current text-foreground focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent
        side="bottom"
        sideOffset={8}
        collisionPadding={16}
        className="w-max max-w-[calc(100vw-2rem)] rounded-2xl border bg-background p-3 text-left text-xs text-muted-foreground shadow-sm"
      >
        {failed ? (
          <span className="block">
            Couldn&apos;t load the contribution graph.{" "}
            <a
              href={`https://github.com/${user}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              See it on GitHub
            </a>
          </span>
        ) : (
          <>
            <span className="mb-2 block">
              {days
                ? `${total} contributions in the last ${PERIOD}`
                : "Loading contributions…"}
            </span>
            <span
              role="img"
              aria-label={
                days ? `${total} GitHub contributions in the last ${PERIOD}` : "Loading"
              }
              className="grid grid-flow-col grid-rows-7 justify-start gap-0.5 sm:gap-1"
            >
              {days
                ? days.map((d) => (
                    <span
                      key={d.date}
                      title={`${formatDay(d.date)}: ${d.count} contribution${d.count === 1 ? "" : "s"}`}
                      className={cn("size-2.5 rounded-[2px] sm:size-3", LEVEL_CLASS[d.level])}
                    />
                  ))
                : Array.from({ length: WEEKS * 7 }, (_, i) => (
                    <span
                      key={i}
                      className="size-2.5 animate-pulse rounded-[2px] bg-muted sm:size-3"
                    />
                  ))}
            </span>
          </>
        )}
      </TooltipContent>
    </Tooltip>
  );
}
