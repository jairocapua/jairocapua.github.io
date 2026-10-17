import type { TechIconSource } from "@/lib/skill-icons";
import { cn } from "@/lib/utils";

/**
 * A self-hosted tech logo from /public/tech (see src/lib/skill-icons.ts).
 * Dark-only logos are inverted on the dark theme so they stay visible; the
 * hue-rotate undoes the inversion's hue shift (dark green stays green).
 */
export function TechIcon({
  icon,
  alt = "",
  className,
}: {
  icon: TechIconSource;
  alt?: string;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny static logo; images are unoptimized in the static export
    <img
      src={icon.src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn(icon.invertOnDark && "dark:invert dark:hue-rotate-180", className)}
    />
  );
}
