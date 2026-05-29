import { Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

/** Small blue "trophy" pill for honors/awards (e.g. "Magna Cum Laude"). */
export function AwardBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "mt-1 inline-flex items-center gap-1 rounded-md bg-fb-blue-light px-1.5 py-0.5 text-xs font-semibold text-fb-blue",
        className
      )}
    >
      <Trophy className="size-3" /> {children}
    </span>
  );
}
