# Graph Report - .  (2026-06-19)

## Corpus Check
- 122 files · ~128,946 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 235 nodes · 360 edges · 18 communities (14 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.89)
- Token cost: 47,700 input · 3,000 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Profile Pages & Feed|Profile Pages & Feed]]
- [[_COMMUNITY_Root Layout & Resume Data|Root Layout & Resume Data]]
- [[_COMMUNITY_RAG Chatbot Backend (docs)|RAG Chatbot Backend (docs)]]
- [[_COMMUNITY_Offline Chat Assistant|Offline Chat Assistant]]
- [[_COMMUNITY_Runtime Dependencies|Runtime Dependencies]]
- [[_COMMUNITY_Profile Header & Tech Icons|Profile Header & Tech Icons]]
- [[_COMMUNITY_TypeScript Config|TypeScript Config]]
- [[_COMMUNITY_Tab Routing & Sitemap|Tab Routing & Sitemap]]
- [[_COMMUNITY_Posts Model & Cards|Posts Model & Cards]]
- [[_COMMUNITY_Dev Dependencies|Dev Dependencies]]
- [[_COMMUNITY_OG Image Generator|OG Image Generator]]
- [[_COMMUNITY_Tech Icon Extractor Script|Tech Icon Extractor Script]]
- [[_COMMUNITY_ESLint Config|ESLint Config]]
- [[_COMMUNITY_Next.js Config|Next.js Config]]
- [[_COMMUNITY_Icon Mapping (docs)|Icon Mapping (docs)]]
- [[_COMMUNITY_Tailwind Config|Tailwind Config]]

## God Nodes (most connected - your core abstractions)
1. `DATA` - 17 edges
2. `compilerOptions` - 16 edges
3. `getAnswer()` - 11 edges
4. `Feed()` - 9 edges
5. `cn()` - 9 edges
6. `Cloudflare Worker Backend` - 9 edges
7. `tabMetadata()` - 7 edges
8. `scripts` - 5 edges
9. `pretty()` - 5 edges
10. `Chatbot Knowledge Base (knowledge-base.ts)` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Deploy Next.js to Pages Workflow` --references--> `Next.js 14 Static Export`  [INFERRED]
  .github/workflows/deploy.yml → README.md
- `getAnswer() Offline Fallback Responder` --shares_data_with--> `Chat Widget (chat.tsx)`  [INFERRED]
  docs/RAG_CHATBOT_PLAN.md → README.md
- `Chat Widget (chat.tsx)` --references--> `askBot() Frontend Client`  [INFERRED]
  README.md → docs/RAG_CHATBOT_PLAN.md
- `CHAT_API_URL Build Variable` --shares_data_with--> `askBot() Frontend Client`  [INFERRED]
  .github/workflows/deploy.yml → docs/RAG_CHATBOT_PLAN.md
- `RootLayout()` --calls--> `cn()`  [EXTRACTED]
  src/app/layout.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Cloudflare Worker Request Pipeline** — rag_chatbot_plan_cors_allowlist, rag_chatbot_plan_rate_limit, rag_chatbot_plan_system_prompt, rag_chatbot_plan_openai_responses_api [EXTRACTED 1.00]
- **Knowledge Base Data Sources** — rag_chatbot_plan_knowledge_base, readme_resume_ts, linkedin_export_data_archive [EXTRACTED 1.00]
- **Chatbot Setup and Deployment Chain** — cloudflare_worker_setup_setup_guide, rag_chatbot_plan_cloudflare_worker, deploy_chat_api_url_var, rag_chatbot_plan_askbot [EXTRACTED 1.00]

## Communities (18 total, 4 thin omitted)

### Community 0 - "Profile Pages & Feed"
Cohesion: 0.11
Nodes (12): metadata, metadata, metadata, sortForAll(), tabMetadata(), metadata, ALL_POSTS, Feed() (+4 more)

### Community 1 - "Root Layout & Resume Data"
Cohesion: 0.11
Nodes (15): fontSans, metadata, RootLayout(), viewport, DATA, ResumeData, SocialKey, SocialLink (+7 more)

### Community 2 - "RAG Chatbot Backend (docs)"
Cohesion: 0.11
Nodes (26): Workers KV Namespace (RATE_LIMIT_KV), OPENAI_API_KEY Cloudflare Secret, Cloudflare Worker Setup Guide, Wrangler CLI, CHAT_API_URL Build Variable, Deploy Next.js to Pages Workflow, Firecrawl LinkedIn Scrape (403 Blocked), LinkedIn Official Data Archive (CSV export) (+18 more)

### Community 3 - "Offline Chat Assistant"
Cohesion: 0.16
Nodes (18): Bubble(), certsAnswer(), ChatMessage, clean(), contactAnswer(), educationAnswer(), getAnswer(), hackathonAnswer() (+10 more)

### Community 4 - "Runtime Dependencies"
Cohesion: 0.09
Nodes (21): dependencies, clsx, framer-motion, geist, lucide-react, next, next-themes, @radix-ui/react-avatar (+13 more)

### Community 5 - "Profile Header & Tech Icons"
Cohesion: 0.17
Nodes (9): openChat(), FEATURED_TECH, SKILL_TO_ICON, SKILL_TO_IMAGE, pretty(), ProfileHeader(), Sidebar(), TechIcon() (+1 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowJs, baseUrl, esModuleInterop, incremental, isolatedModules, jsx, lib (+11 more)

### Community 7 - "Tab Routing & Sitemap"
Cohesion: 0.20
Nodes (11): BY_KEY, BY_SLUG, hrefForKey(), keyFromSlug(), slugFromKey(), TabDef, tabFromPathname(), TabKey (+3 more)

### Community 8 - "Posts Model & Cards"
Cohesion: 0.18
Nodes (8): buildPosts(), FeedPost, HackathonLink, ORDER, PostCategory, PostLink, CATEGORY_LABEL, PostCard()

### Community 9 - "Dev Dependencies"
Cohesion: 0.17
Nodes (12): devDependencies, autoprefixer, eslint, eslint-config-next, postcss, @resvg/resvg-js, tailwindcss, tech-stack-icons (+4 more)

### Community 10 - "OG Image Generator"
Cohesion: 0.25
Nodes (7): interBuffer, pills, png, resvg, root, TAGLINE, TAGS

### Community 11 - "Tech Icon Extractor Script"
Cohesion: 0.40
Nodes (4): missing, OUT_DIR, SLUGS, written

## Knowledge Gaps
- **86 isolated node(s):** `extends`, `nextConfig`, `name`, `version`, `private` (+81 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `DATA` connect `Root Layout & Resume Data` to `Profile Pages & Feed`, `Offline Chat Assistant`, `Profile Header & Tech Icons`, `Tab Routing & Sitemap`, `Posts Model & Cards`?**
  _High betweenness centrality (0.070) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev Dependencies` to `Runtime Dependencies`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **What connects `extends`, `nextConfig`, `name` to the rest of the system?**
  _88 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Profile Pages & Feed` be split into smaller, more focused modules?**
  _Cohesion score 0.11264367816091954 - nodes in this community are weakly interconnected._
- **Should `Root Layout & Resume Data` be split into smaller, more focused modules?**
  _Cohesion score 0.10837438423645321 - nodes in this community are weakly interconnected._
- **Should `RAG Chatbot Backend (docs)` be split into smaller, more focused modules?**
  _Cohesion score 0.11384615384615385 - nodes in this community are weakly interconnected._
- **Should `Runtime Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.09090909090909091 - nodes in this community are weakly interconnected._