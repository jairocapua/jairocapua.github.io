import { DATA } from "@/data/resume";

// A unified "post" model. Every résumé item (job, project, hackathon,
// certification, degree) is projected into one of these so the feed can
// render and filter them like a social timeline.
export type PostCategory =
  | "education"
  | "experience"
  | "hackathon"
  | "project"
  | "certification";

export interface PostLink {
  label: string;
  href: string;
}

/** Link shape on hackathon entries (projects use `{ type, href }` instead). */
type HackathonLink = { title: string; href: string };

export interface FeedPost {
  id: string;
  category: PostCategory;
  pinned?: boolean;
  /** framing sentence shown at the top of the post body */
  lead: string;
  /** bold headline (company / school / project / cert) */
  title: string;
  /** role / degree / issuer */
  subtitle?: string;
  /** date or period, e.g. "March 2025 – Present" */
  meta?: string;
  location?: string;
  description?: string;
  badges?: readonly string[];
  tags?: readonly string[];
  logoUrl?: string;
  image?: string;
  links?: readonly PostLink[];
}

/** Build the full timeline from résumé data. */
export function buildPosts(): FeedPost[] {
  const posts: FeedPost[] = [];

  DATA.education.forEach((e, i) => {
    posts.push({
      id: `edu-${i}`,
      category: "education",
      pinned: i === 0,
      lead: `🎓 Graduated with a ${e.degree}`,
      title: e.school,
      subtitle: e.degree,
      badges: e.badges,
      logoUrl: e.logoUrl,
      links: e.href ? [{ label: "Visit school", href: e.href }] : undefined,
    });
  });

  DATA.work.forEach((w, i) => {
    const current = /present/i.test(w.end);
    posts.push({
      id: `work-${i}`,
      category: "experience",
      lead: current
        ? `💼 Started a new role as ${w.title}`
        : `💼 Worked as ${w.title}`,
      title: w.company,
      subtitle: w.title,
      meta: [w.start, w.end].map((s) => s.trim()).filter(Boolean).join(" – "),
      location: w.location,
      description: w.description,
      badges: w.badges,
      logoUrl: w.logoUrl,
      links: w.href ? [{ label: "Visit company", href: w.href }] : undefined,
    });
  });

  DATA.hackathons.forEach((h, i) => {
    posts.push({
      id: `hack-${i}`,
      category: "hackathon",
      lead: "🏆 Hackathon",
      title: h.title,
      meta: h.dates,
      location: h.location,
      description: h.description,
      image: h.image,
      links: (h.links as readonly HackathonLink[]).map((l) => ({
        label: l.title,
        href: l.href,
      })),
    });
  });

  DATA.projects.forEach((p, i) => {
    posts.push({
      id: `proj-${i}`,
      category: "project",
      lead: p.active ? "🚀 Currently building" : "🛠️ Project",
      title: p.title,
      meta: p.dates,
      description: p.description,
      tags: p.technologies,
      image: p.image || undefined,
      links: p.links?.map((l) => ({ label: l.type, href: l.href })),
    });
  });

  DATA.certifications.forEach((c, i) => {
    posts.push({
      id: `cert-${i}`,
      category: "certification",
      lead: "📜 Earned a certification",
      title: c.title,
      subtitle: c.issuer,
      meta: c.date,
      links: c.href ? [{ label: "View credential", href: c.href }] : undefined,
    });
  });

  return posts;
}

// Display order when showing the combined "All" feed (pinned floats first).
const ORDER: Record<PostCategory, number> = {
  education: 0,
  experience: 1,
  hackathon: 2,
  project: 3,
  certification: 4,
};

export function sortForAll(posts: FeedPost[]): FeedPost[] {
  return [...posts].sort((a, b) => {
    if (Boolean(a.pinned) !== Boolean(b.pinned)) return a.pinned ? -1 : 1;
    return ORDER[a.category] - ORDER[b.category];
  });
}
