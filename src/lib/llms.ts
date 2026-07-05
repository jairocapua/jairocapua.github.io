// Markdown builders for /llms.txt and /llms-full.txt (llmstxt.org convention).
//
// Server-only: generated at build time from the same data that drives the UI
// (resume.ts, automation-projects.ts, tabs.ts, project-categories.ts), so the
// text stays in sync with the site automatically. llms.txt is a short index
// for AI assistants; llms-full.txt serializes every piece of site content so
// a single fetch — no crawling, no JavaScript — yields the whole portfolio.

import { DATA } from "@/data/resume";
import { automationProjects } from "@/data/automation-projects";
import { TABS } from "@/lib/tabs";
import { PROJECT_CATEGORIES } from "@/lib/project-categories";

/** Strip the light markdown (bold markers) used in UI copy like DATA.summary. */
function plain(text: string): string {
  return text.replace(/\*\*/g, "");
}

function pageList(): string {
  const lines: string[] = [];
  for (const tab of TABS) {
    const path = tab.slug === "post" ? "/" : `/${tab.slug}/`;
    const label = tab.slug === "post" ? "Home" : tab.label;
    lines.push(`- [${label}](${DATA.url}${path}): ${tab.description}`);
  }
  for (const cat of PROJECT_CATEGORIES) {
    lines.push(
      `- [Projects · ${cat.label}](${DATA.url}/projects/${cat.slug}/): ${cat.description}`
    );
  }
  return lines.join("\n");
}

/** Short llms.txt index: who this is, plus every page with a description. */
export function buildLlmsIndex(): string {
  return `# ${DATA.name}

> ${DATA.description}. Based in ${DATA.location}. This is the personal portfolio site of ${DATA.name} (${DATA.role}).

## Pages

${pageList()}

## Full content

- [llms-full.txt](${DATA.url}/llms-full.txt): the entire site's content (about, experience, education, skills, all projects, all automation case studies, hackathons, certifications, contact) as a single markdown file.
`;
}

/** Everything on the site, serialized to one markdown document. */
export function buildLlmsFull(): string {
  const out: string[] = [];

  out.push(`# ${DATA.name} — ${DATA.role}`);
  out.push(`> ${DATA.description}`);
  out.push(
    `- Website: ${DATA.url}\n- Location: ${DATA.location}\n- Highlight: ${DATA.badge}`
  );

  out.push(`## About\n\n${plain(DATA.summary)}`);

  out.push(
    `## Contact & Social\n\n- Email: ${DATA.contact.email}\n` +
      Object.values(DATA.contact.social)
        .filter((s) => !s.url.startsWith("mailto:"))
        .map((s) => `- ${s.name}: ${s.url}`)
        .join("\n")
  );

  const work = DATA.work
    .map(
      (w) =>
        `### ${w.title} — ${w.company}\n\n` +
        `- Period: ${w.start} – ${w.end}\n- Location: ${w.location} (${w.workSetup})\n\n${w.description}`
    )
    .join("\n\n");
  out.push(`## Work Experience\n\n${work}`);

  const education = DATA.education
    .map((e) => {
      const badges = e.badges.length ? ` (${e.badges.join(", ")})` : "";
      return `- ${e.degree}${badges} — ${e.school}`;
    })
    .join("\n");
  out.push(`## Education\n\n${education}`);

  const skills = DATA.skillGroups
    .map((g) => `- **${g.category}:** ${g.skills.join(", ")}`)
    .join("\n");
  out.push(`## Skills\n\n${skills}`);

  const projects = DATA.projects
    .map((p) => {
      const lines = [
        `### ${p.title}`,
        "",
        `- Category: ${p.category}`,
        `- Dates: ${p.dates}`,
      ];
      if (p.status) lines.push(`- Status: ${p.status}`);
      for (const link of p.links ?? []) {
        lines.push(`- ${link.type}: ${link.href}`);
      }
      lines.push("", p.description);
      if (p.detailedDescription) lines.push("", p.detailedDescription);
      const stack = p.stack ?? p.technologies;
      if (stack.length) lines.push("", `**Tech stack:** ${stack.join(", ")}`);
      return lines.join("\n");
    })
    .join("\n\n");
  out.push(`## Projects\n\n${projects}`);

  const automations = automationProjects
    .map((a) => {
      const lines = [
        `### ${a.title}`,
        "",
        `- Type: ${a.subcategory}${a.featured ? " (Featured)" : ""}`,
        `- Tools: ${a.tags.join(", ")}`,
        "",
        `**Situation:** ${a.situation}`,
        "",
        `**Task:** ${a.task}`,
        "",
        "**Action:**",
        ...a.action.map((s) => `- ${s}`),
        "",
        "**Result:**",
        ...a.result.map((s) => `- ${s}`),
      ];
      return lines.join("\n");
    })
    .join("\n\n");
  out.push(
    `## Automation Case Studies (SCAR format)\n\nBusiness-workflow automation projects, documented as Situation → Task → Action → Result.\n\n${automations}`
  );

  const hackathons = DATA.hackathons
    .map(
      (h) =>
        `### ${h.title}\n\n- ${h.dates} · ${h.location}\n\n${h.description}`
    )
    .join("\n\n");
  out.push(`## Hackathons\n\n${hackathons}`);

  const certifications = DATA.certifications
    .map((c) => `- ${c.title} — ${c.issuer} (${c.date})`)
    .join("\n");
  out.push(`## Certifications\n\n${certifications}`);

  if (DATA.testimonials.length > 0) {
    const testimonials = DATA.testimonials
      .map((t) => `> "${t.quote}"\n> — ${t.name}, ${t.title}`)
      .join("\n\n");
    out.push(`## Recommendations\n\n${testimonials}`);
  }

  return out.join("\n\n") + "\n";
}
