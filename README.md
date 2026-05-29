# jairocapua.github.io

Personal portfolio for **Jairo Capua**, built as a Next.js 14 (App Router)
**static export** and styled like a Facebook profile. Deployed to GitHub Pages.

## Tech stack

- **Next.js 14** (App Router, `output: "export"`)
- **TypeScript** + **Tailwind CSS** (Facebook-inspired theme with light/dark)
- **Radix UI** (avatar), **lucide-react** (icons), **framer-motion** (chat panel)
- **react-markdown** for the About summary

## Local development

```bash
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # static export to ./out
npm run lint     # ESLint (next/core-web-vitals)
```

## Project structure

```
src/
  app/                 # App Router entry (layout, page, globals.css, fonts)
  components/
    layout/            # app chrome: footer, mode-toggle, theme-provider
    profile/           # the Facebook-profile feature (header, feed, sidebar, …)
    ui/                # shared primitives (avatar)
    chat.tsx           # floating AI-style chat widget
  data/resume.ts       # SINGLE SOURCE OF TRUTH for all content
  lib/                 # posts model, chat responder, skill→icon maps, utils
public/                # static assets (cover, avatar, tech/*.svg, logos)
scripts/               # one-off tooling (tech-icon generator)
legacy/                # archived pre-Next.js school projects — NOT part of the
                       # build (excluded in tsconfig, outside the Tailwind glob)
```

## Editing content

All profile content — bio, skills, work, education, projects, hackathons,
certifications, testimonials, and social links — lives in
[`src/data/resume.ts`](src/data/resume.ts). Edit that file; the header, sidebar,
feed, and chat responder all read from it.

## Tech icons

The logos under `public/tech/*.svg` are generated from the `tech-stack-icons`
package by a one-off script:

```bash
node scripts/extract-tech-icons.mjs
```

Re-run it only when adding or removing skills, and keep its `SLUGS` list in sync
with `SKILL_TO_ICON` in [`src/lib/skill-icons.ts`](src/lib/skill-icons.ts).

## Deployment

Pushing to `main` (or a manual `workflow_dispatch`) triggers
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which runs
`npm ci && npm run build`, writes the static site to `out/`, adds `.nojekyll`,
and publishes to GitHub Pages.
