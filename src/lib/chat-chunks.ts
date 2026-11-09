// The chatbot's knowledge base: the site's content split into small,
// self-contained chunks that the Worker embeds and retrieves (see
// docs/rag-chatbot-plan.md). Built from the same data that drives the UI, so
// the bot can't drift from the site. Only scripts/build-chat-index.ts calls
// this; nothing here ships to the browser.

import { DATA } from "@/data/resume";
import { AI_WORKFLOW } from "@/data/ai-workflow";
import { automationProjects } from "@/data/automation-projects";
import { CHAT_FAQ } from "@/data/chat-faq";
import { CV_HIGHLIGHTS, CV_PROJECTS, CV_ROLES } from "@/data/cv";

export interface ChatChunk {
  /** Stable id, e.g. "work-sequoya-ai". The eval cases refer to these. */
  id: string;
  /** Label on the source chip. */
  title: string;
  /** Where the source chip scrolls to. */
  href: string;
  text: string;
}

function slug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Strip the light markdown (bold markers) used in UI copy like DATA.summary. */
function plain(text: string): string {
  return text.replace(/\*\*/g, "");
}

function bullets(lines: readonly string[]): string {
  return lines.map((l) => `- ${l}`).join("\n");
}

/**
 * Who Jairo is and how to reach him. The Worker puts this in every system
 * prompt, so the basics work even when retrieval misses.
 */
export function buildCoreProfile(): string {
  const current = DATA.work.filter((w) => w.end === "Present");
  const links = Object.values(DATA.contact.social)
    .filter((s) => s.navbar && !s.url.startsWith("mailto:"))
    .map((s) => `${s.name}: ${s.url}`);
  return [
    `Name: ${DATA.name}`,
    `Role: ${DATA.role}`,
    `Location: ${DATA.location}`,
    ...current.map((w) => `Current position: ${w.title} at ${w.company} (${w.workSetup}, since ${w.start})`),
    `Highlight: ${DATA.badge}`,
    `Email: ${DATA.contact.email}`,
    ...links,
    `Portfolio: ${DATA.url}`,
    `CV (PDF): ${DATA.url}${DATA.resumeUrl}`,
  ].join("\n");
}

export function buildChatChunks(): ChatChunk[] {
  const chunks: ChatChunk[] = [];

  chunks.push({
    id: "about",
    title: "About",
    href: "/#about",
    text: `About ${DATA.name}, ${DATA.role} based in ${DATA.location}.\n\n${DATA.description}.\n\n${plain(DATA.summary)}`,
  });

  for (const w of DATA.work) {
    chunks.push({
      id: `work-${slug(w.company)}`,
      title: `${w.title} · ${w.company}`,
      href: "/#work",
      text:
        `Work experience: ${w.title} at ${w.company}, ${w.start} – ${w.end}. ` +
        `${w.location}, ${w.workSetup}.\n\n${w.description}`,
    });
  }

  chunks.push({
    id: "education",
    title: "Education",
    href: "/#education",
    text:
      `Education: where ${DATA.name} studied, his university degree and academic honors.\n` +
      DATA.education
        .map(
          (e) =>
            `- ${DATA.name} studied at ${e.school} and earned a ${e.degree}` +
            (e.badges.length ? `, graduating ${e.badges.join(", ")}.` : ".")
        )
        .join("\n"),
  });

  chunks.push({
    id: "certifications",
    title: "Certifications",
    href: "/#certifications",
    text:
      "Certifications:\n" +
      DATA.certifications.map((c) => `- ${c.title}, ${c.issuer}${c.date ? ` (${c.date})` : ""}`).join("\n"),
  });

  chunks.push({
    id: "skills",
    title: "Skills",
    href: "/#skills",
    text:
      "Skills and tech stack, by group:\n" +
      DATA.skillGroups.map((g) => `- ${g.category}: ${g.skills.join(", ")}`).join("\n"),
  });

  chunks.push({
    id: "ai-workflow",
    title: "How I Build with AI",
    href: "/#ai-workflow",
    text: [
      `How Jairo builds software with AI agents: a spec-driven (SDD) and test-driven (TDD) agentic workflow.`,
      AI_WORKFLOW.intro,
      ...AI_WORKFLOW.principles.map((p) => `${p.title}: ${p.body}`),
      "Steps:",
      bullets(AI_WORKFLOW.steps.map((s) => `${s.phase} · ${s.title}: ${s.description}`)),
      `${AI_WORKFLOW.example.title}. ${AI_WORKFLOW.example.body}`,
      "Tools in the workflow:",
      bullets(AI_WORKFLOW.tools.map((t) => `${t.name} (${t.role}): ${t.detail}`)),
    ].join("\n"),
  });

  for (const p of DATA.projects) {
    const lines = [`Project: ${p.title} (${p.dates}).`];
    if (p.status) lines.push(`Status: ${p.status}.`);
    lines.push("", p.description);
    if (p.detailedDescription) lines.push("", p.detailedDescription);
    lines.push("", `Tech stack: ${(p.stack ?? p.technologies).join(", ")}.`);
    for (const link of p.links ?? []) lines.push(`${link.type}: ${link.href}`);
    chunks.push({ id: `project-${slug(p.title)}`, title: p.title, href: "/#projects", text: lines.join("\n") });
  }

  chunks.push({
    id: "client-websites",
    title: "Client Websites",
    href: "/#client-websites",
    text:
      "Client websites Jairo built at Sterk Systems: lead-generation sites for businesses in the Netherlands.\n" +
      DATA.clientWebsites.map((c) => `- ${c.name} (${c.sector}): ${c.href}. ${c.description}`).join("\n"),
  });

  for (const a of automationProjects) {
    chunks.push({
      id: `automation-${slug(a.title)}`,
      title: a.title,
      href: "/#automations",
      text: [
        `Automation case study: ${a.title} (${a.subcategory}). Tools: ${a.tags.join(", ")}.`,
        `Situation: ${a.situation}`,
        `Task: ${a.task}`,
        `Action: ${a.action.join(" ")}`,
        `Result: ${a.result.join(" ")}`,
      ].join("\n"),
    });
  }

  for (const h of DATA.hackathons) {
    chunks.push({
      id: `hackathon-${slug(h.title)}`,
      title: h.title,
      href: "/#hackathons",
      text: `Hackathon: ${h.title}, ${h.dates}, ${h.location}.\n\n${h.description}`,
    });
  }

  for (const f of CHAT_FAQ) {
    if (!f.answer.trim()) continue;
    chunks.push({ id: `faq-${f.id}`, title: "FAQ", href: "/#contact", text: `${f.question}\n${f.answer}` });
  }

  // The CV's extra detail. Items the site doesn't show link to the CV itself.
  for (const r of CV_ROLES) {
    chunks.push({
      id: `work-${r.id}`,
      title: `${r.title} · ${r.company}`,
      href: DATA.resumeUrl,
      text:
        `${r.summary}\n\nWork experience: ${r.title} (${r.company}), ${r.start} – ${r.end}. ${r.location}.\n\n` +
        bullets(r.highlights),
    });
  }

  for (const p of CV_PROJECTS) {
    chunks.push({
      id: `project-${slug(p.title)}`,
      title: p.title,
      href: DATA.resumeUrl,
      text: `Project: ${p.title}, ${p.tagline}.\n\n${bullets(p.highlights)}\n\nTech stack: ${p.stack.join(", ")}.`,
    });
  }

  for (const [id, lines] of Object.entries(CV_HIGHLIGHTS)) {
    const chunk = chunks.find((c) => c.id === id);
    // A renamed company or project changes its chunk id; fail rather than drop the CV's detail.
    if (!chunk) throw new Error(`src/data/cv.ts has highlights for "${id}", but no chunk has that id.`);
    chunk.text += `\n\nFrom his CV:\n${bullets(lines)}`;
  }

  return chunks;
}
