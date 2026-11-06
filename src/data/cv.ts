// What the CV (public/jairo-capua-cv.pdf) says that the site doesn't: the
// per-role bullet points, the freelance role, more projects, and extra
// skills. Chatbot-only: src/lib/chat-chunks.ts merges it into the knowledge
// base, and nothing here renders on the site. When the CV changes, update this
// file and the dates and titles in resume.ts together.

/** CV bullet points, by the id of the chunk they belong to. */
export const CV_HIGHLIGHTS: Record<string, string[]> = {
  about: [
    "AI Engineer and Full-Stack Software Engineer with 2 years of experience designing, building and deploying AI-powered applications, LLM integrations and AI agents for international clients.",
    "Proficient in Python, TypeScript, JavaScript, React, Next.js, Node.js, REST APIs and PostgreSQL, with hands-on experience using the OpenAI, Anthropic Claude and Google Gemini APIs.",
    "Skilled in prompt engineering, structured outputs, retrieval-augmented generation (RAG) with embeddings and vector search (pgvector), voice AI, and workflow automation (n8n, Zapier, GoHighLevel).",
    "Delivers production-ready software with Docker, CI/CD, automated testing (Vitest, Playwright) and cloud deployment (Vercel, Railway), including automations that save clients 25+ hours per week.",
  ],
  "work-sequoya-ai": [
    "Manages AI orchestration for the company's AI Operating System, designing multi-agent workflows where specialized agents communicate, share context and hand off tasks, built on Claude, n8n and AWS.",
    "Leads UI/UX improvements across the AI OS product, redesigning 5+ core flows and screens so non-technical business owners can use advanced AI features without feeling overwhelmed.",
    "Builds and customizes AI agents for each client's business needs, such as lead handling, follow-ups and customer support, for 10+ business owners and entrepreneurs.",
    "Develops internal tools for the AI OS and custom tools for clients using Next.js, Supabase, AWS, Claude and n8n, shipping 5+ tools and features since joining.",
    "Cut load times across the AI OS app and internal tools by about 35% through code splitting, query optimization, caching and asset compression.",
  ],
  "work-aveba-digital": [
    "Owned GoHighLevel AI automations and backend operations for 10+ client sub-accounts and 200+ active workflows, resolving 130+ support tickets a month across pipelines, calendars, lead routing, opportunity tracking and automations, most of them the same day.",
    "Built, repaired and QA'd production automations for call dispositions, appointment status changes, reminders and post-consult follow-ups, reducing missed appointments and no-shows by 30–40% across client accounts.",
    "Rebuilt CRM field mappings and webhook integrations between Retell AI, forms and GoHighLevel, cutting duplicate and mismatched contact records by about 40% and closing lead leakage between call and CRM.",
    "Automated task assignment, lead handoffs and status updates that were done by hand, saving clients and the internal team 15+ hours a week.",
    "Engineered an AI-assisted diagnostics workflow connecting Claude to GoHighLevel through the API and MCP, so AI can navigate sub-accounts, read workflow and contact data, and pinpoint broken triggers, field mappings and automations for faster root-cause analysis.",
    "Trained newly hired junior tech specialists on AI-assisted workflows using Claude, the GHL API and MCP, so they troubleshot less by hand and ramped up faster.",
  ],
  "work-sterk-systems": [
    "Designs and ships high-converting, responsive websites for local service companies across the Netherlands using Next.js and Tailwind CSS, delivering 10+ sites at an average of 1 week per site.",
    "Optimizes page performance and Core Web Vitals with image compression, lazy loading and code splitting, reaching 90+ Lighthouse scores and cutting page load times by about 40% on mobile and desktop.",
    "Applies UI/UX design principles (visual hierarchy, clear calls to action, mobile-first layouts, consistent spacing and typography) to redesign hero sections and service pages, lifting quote-request conversions by about 20% across client sites.",
    "Implements local SEO foundations (Google Maps embeds, structured data, location-based service pages), helping clients reach first-page local search rankings for priority service keywords.",
    "Builds CRM-connected booking and quote forms that route leads straight into client pipelines, saving about 5 hours a week of manual intake and increasing form submissions by about 25%.",
    "Gathers and acts on client and end-user feedback through iterative review cycles, turning revision requests into faster, better-aligned releases.",
  ],
  "work-the-family-roofing-company": [
    "Led business process mapping and audited manual workflows across sales, scheduling, invoicing and customer service, finding automation opportunities that went on to save 25+ hours a week of admin work.",
    "Audited the company's AI and software stack and cancelled 3 redundant, overlapping AI tool subscriptions, cutting about £800 a year in operating costs with no loss of functionality.",
    "Built and maintained 5+ production GoHighLevel workflows and API integrations linking GoHighLevel, SimPro, Zapier, WhatsApp, SurveyMonkey, SMS and email, cutting lead response time from hours to minutes; tested webhooks, monitored live runs, and documented 5 core system processes for handoff.",
    "Automated document processing, invoice processing and invoice reminders, replacing manual data entry, saving about 10 hours a month, and making sure every reminder went out on schedule.",
    "Managed and tailored AI conversation flows across 5 channels (web chat, WhatsApp, SMS, Facebook and Instagram), scripting tone, FAQs, and qualification and handoff logic so the AI answered first-line inquiries 24/7 and passed qualified leads to staff.",
    "Developed internal social media marketing tools that generate captions and schedule posts across 4+ platforms (LinkedIn, Instagram, Facebook, Google Business Profile), automating 10–15 posts a week and saving about 2 hours a week, alongside 10+ landing pages, funnels and forms with QR tracking links.",
  ],
  "work-xurpas-inc": [
    "Supported internal HRIS/ERP development using the Frappe Framework, Python, JavaScript and Jinja templates.",
    "Built dynamic form logic, frontend scripts, server-side validation and custom print formats to improve HR data capture accuracy and usability.",
    "Partnered with senior engineers and QA teams to translate requirements into features, troubleshoot bugs, and prepare modules for production release.",
  ],
  education: [
    "Campus: Batangas, Philippines. Graduated in 2025.",
    "Full-Stack Developer for the Google Developer Student Club and the PUP Computer Society.",
  ],
  skills: [
    "Languages: TypeScript, JavaScript, Python, PHP, SQL, HTML/CSS.",
    "AI and LLM: OpenAI API, Anthropic Claude API, Google Gemini, AI agents, multi-agent orchestration, Model Context Protocol (MCP), retrieval-augmented generation (RAG), embeddings, vector search, Voyage AI, prompt engineering, structured outputs, Zod validation, LLM observability (Langfuse), voice AI (Vapi, Retell AI).",
    "Frontend: React, Next.js App Router, Vite, Tailwind CSS v4, shadcn/ui, responsive web design, Core Web Vitals optimization.",
    "Backend and APIs: Node.js, Express, tRPC, REST APIs, webhooks, background jobs, bearer-token authentication, rate limiting, retry/backoff logic, health endpoints.",
    "Data and cloud: PostgreSQL, pgvector, Supabase, MySQL, SQLite, AWS, Docker, Docker Compose, Vercel, Railway.",
    "DevOps and testing: Git/GitHub, GitHub Actions, CI/CD, Vitest, Playwright, end-to-end testing, debugging.",
    "Automation and CRM: n8n, Make, Zapier, GoHighLevel, Conversation AI, SimPro, Slack, Google Workspace, automated email/SMS/WhatsApp workflows.",
  ],
  "project-echo-ai": [
    "A real-time voice AI sales coach that runs mock sales calls so representatives can practice pitch delivery, objection handling and closing.",
    "Adaptive coaching personas and performance prompts for role-play scenarios modeled on high-conversion sales conversations.",
  ],
  "project-jobpilot-ai": [
    "Integrates the Adzuna API to discover live listings and GPT-4o to score each job 0–100 against the user's profile with explainable match reasoning.",
    "A company-research agent uses Browserbase + Stagehand to browse a company's public pages and synthesize a structured interview-prep dossier with GPT-4o, with deterministic fallbacks so it never fails or hallucinates facts.",
    "AI resume parsing and PDF generation (GPT-4o + @react-pdf/renderer), and a PostHog-powered analytics dashboard with real-time stats and charts.",
    "Layered architecture on InsForge (Postgres) with OAuth and Row-Level Security, keeping agent logic, server actions and UI strictly separate.",
  ],
  "hackathon-agora-voice-ai-hackathon-2nd-runner-up": [
    "Competed against 27 professional and student teams, building a real-time AI Conversation Arena prototype with Agora ConvoAI, TRAE IDE and AWS infrastructure.",
    "Built Parrot AI, a voice AI agent that conducts realistic mock job interviews tailored to a candidate's resume and a target job posting.",
    "Designed automated interview scoring that pinpoints weak areas and gives actionable feedback to help candidates advance to the next round.",
  ],
  "hackathon-pup-hackathon-2025-uthack-ang-puhunan-top-10": [
    "Top 10 finalist (2024). Co-developed WasteLess AI, an AI/ML-powered mobile app that helps users reduce food waste by finding practical ways to repurpose leftovers.",
    "Integrated computer vision and an AI API to identify food scraps from photos and generate tailored repurposing recommendations.",
    "Contributed to feature architecture research and rapid prototyping under strict hackathon time constraints.",
  ],
};

/** Roles on the CV that the site's Work section doesn't list. */
export const CV_ROLES = [
  {
    id: "freelance",
    company: "Freelance",
    title: "Full-Stack Software Developer",
    location: "Remote",
    start: "2024",
    end: "Present",
    // Prose up front: bullets full of tech names don't embed like an answer to
    // "has he done freelance work?".
    summary:
      "Freelance work: since 2024, Jairo has also worked freelance as a remote Full-Stack Software Developer for international clients.",
    highlights: [
      "Delivers production AI-enabled web apps and internal tools for international clients using TypeScript, Next.js, React, Node.js, Supabase and PostgreSQL.",
      "Integrates OpenAI, Claude and Gemini for image analysis, structured data extraction, content generation and operations decision support, and automates cross-platform flows through webhooks, n8n, Make and Zapier.",
      "Owns delivery end to end, from discovery and architecture through reliability controls, Vitest/Playwright testing, and deployment to Vercel or Railway.",
    ],
  },
];

/** Projects on the CV that the site's Projects section doesn't show. */
export const CV_PROJECTS = [
  {
    title: "AIPM",
    tagline: "AI-Native Project Management Platform (in progress)",
    stack: ["Next.js 16", "TypeScript", "tRPC", "PostgreSQL/pgvector", "Claude API", "Voyage AI", "Docker"],
    highlights: [
      "A ClickUp-style project management platform in a TypeScript monorepo, with spaces, projects, list and board views, task drawers, comments with @mentions, and role-based sharing for admins, members and guests.",
      "A multi-tenant permission layer enforced by a single policy and verified by a 500+ case permission matrix, backed by a Postgres outbox, idempotent background jobs (pg-boss) and least-privilege database roles.",
      "An AI gateway for Claude with tiered model routing, streaming, Langfuse tracing, and a budget governor that degrades AI features at 70/85/95/100% of a $20/month cap, plus an inspector showing the cost and sources of every answer.",
      "A hybrid search index (pgvector HNSW + Postgres full-text, Voyage AI embeddings) with chunking, incremental reindexing, and an embedding cache that rebuilds the index with zero re-embedding calls.",
      "Ships as a one-command Docker Compose stack with GitHub Actions CI (Vitest, Playwright E2E, secret scanning), built phase by phase with a multi-agent Claude Code workflow (plan, implement, verify, review).",
    ],
  },
  {
    title: "Quote Flow AI",
    tagline: "Logistics Operations Console",
    stack: ["Next.js", "TypeScript", "Supabase", "OpenAI", "Vitest"],
    highlights: [
      "A logistics operations console for customer intake, AI-assisted shipment parsing, rule-based quote generation, and Slack-based approval workflows.",
      "A finite-state order workflow and a deterministic mock-database fallback keep demos fully runnable; 32 passing Vitest tests and Playwright visual captures cover the critical UI states.",
    ],
  },
  {
    title: "RoofPost AI",
    tagline: "Mobile Social Planner App",
    stack: ["React", "Vite", "Tailwind CSS v4", "Express", "Claude Vision", "Railway"],
    highlights: [
      "A mobile-first app that analyzes uploaded roofing photos with Claude Vision and generates localized British English social captions.",
      "Schedules posts through the GoHighLevel Social Planner API, cutting a 15-minute content workflow to under 60 seconds; has bearer-token validation, per-IP rate limiting and /api/health monitoring.",
    ],
  },
];
