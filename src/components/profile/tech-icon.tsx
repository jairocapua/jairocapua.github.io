interface TechIconProps {
  /** icon file slug under /public/tech, e.g. "react" (see SKILL_TO_ICON) */
  slug: string;
  alt?: string;
  className?: string;
}

/**
 * Renders a self-hosted tech logo from /public/tech/<slug>.svg.
 * Replaces the `tech-stack-icons` package, which bundled all 690+ icons
 * (~8.7 MB) into a single non-tree-shakeable module — we ship only the
 * ~50 SVGs this site actually uses instead.
 */
export function TechIcon({ slug, alt = "", className }: TechIconProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny static SVG; next/image adds no value (images are unoptimized)
    <img
      src={`/tech/${slug}.svg`}
      alt={alt}
      className={className}
      decoding="async"
    />
  );
}
