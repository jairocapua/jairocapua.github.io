// One-off generator: renders the subset of tech-stack-icons we actually use
// to standalone SVG files in public/tech/. This lets us drop the 8.7 MB
// `tech-stack-icons` dependency (it bundles all 690+ icons into one module)
// and ship only the ~50 logos this site references.
//
// Run with:  node scripts/extract-tech-icons.mjs
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import StackIcon from "tech-stack-icons";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Keep in sync with SKILL_TO_ICON in src/lib/skill-icons.ts
const SLUGS = [
  "react", "nextjs", "tailwindcss", "shadcnui", "framer", "html5", "css3", "figma",
  "typescript", "js", "python", "bash",
  "nodejs", "expressjs", "nestjs", "django", "prisma", "drizzle",
  "postgresql", "mongodb", "supabase", "firebase", "redis", "sqlite",
  "aws", "gcloud", "cloudflare", "vercel", "docker", "netlify", "railway", "nginx", "digitalocean",
  "openai", "claude", "anthropic", "langchain", "huggingface", "ollama", "gemini", "llamaindex",
  "n8n", "zapier", "make", "airtable", "nodered",
  "git", "github", "postman", "jest", "playwright", "eslint", "pnpm",
];

const OUT_DIR = join(process.cwd(), "public", "tech");
mkdirSync(OUT_DIR, { recursive: true });

const written = [];
const missing = [];

for (const name of SLUGS) {
  let html;
  try {
    html = renderToStaticMarkup(React.createElement(StackIcon, { name }));
  } catch (err) {
    missing.push(`${name} (render error: ${err.message})`);
    continue;
  }

  const match = html.match(/<svg[\s\S]*<\/svg>/);
  if (!match) {
    missing.push(`${name} (no svg in output)`);
    continue;
  }

  let svg = match[0];

  // The library uses React's useId() for clip-path/mask ids, e.g. ":R5iiptj6:-a".
  // Colons are invalid in standalone-SVG ids, so strip them consistently across
  // both the id definitions and their url(#...) references.
  const ids = new Set(svg.match(/:R[A-Za-z0-9]+:/g) || []);
  for (const id of ids) {
    svg = svg.split(id).join(id.replace(/:/g, ""));
  }

  // Detect the library's "icon not found" placeholder so we know what to replace.
  if (svg.includes("svg-link-text")) {
    missing.push(`${name} (placeholder — not a real icon)`);
    continue;
  }

  writeFileSync(join(OUT_DIR, `${name}.svg`), svg, "utf8");
  written.push(name);
}

console.log(`✓ wrote ${written.length} icons to public/tech/`);
if (missing.length) {
  console.log(`\n⚠ ${missing.length} could not be generated:`);
  for (const m of missing) console.log(`  - ${m}`);
}
