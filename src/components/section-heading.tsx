import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  /** optional supporting line under the title */
  description?: string;
  /** deprecated — kept for backwards compat, no longer rendered */
  eyebrow?: string;
  className?: string;
}

/** Understated bryllim-style section header: an 18px bold title. */
export function SectionHeading({ title, description, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <h2 className="text-lg font-bold tracking-tight">{title}</h2>
      {description && (
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
