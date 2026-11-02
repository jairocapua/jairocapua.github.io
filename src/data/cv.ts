// What the CV (public/jairo-capua-cv.pdf) says that the site doesn't: the
// per-role bullet points, the freelance role, three more projects, and extra
// skills. Chatbot-only: src/lib/chat-chunks.ts merges it into the knowledge
// base, and nothing here renders on the site. When the CV changes, update this
// file and the dates and titles in resume.ts together.

/** CV bullet points, by the id of the chunk they belong to. */
export const CV_HIGHLIGHTS: Record<string, string[]> = {
  about: [
    "AI Automation Engineer and Full-Stack Developer with 2+ years of experience building AI-enabled web applications, CRM automations, API integrations, and internal operations tools for international clients.",
    "Strong hands-on background in TypeScript, Next.js, React, Node.js, Python, Supabase/PostgreSQL, and LLM integrations across OpenAI, Claude, and Gemini.",
    "Automates multi-system workflows across GoHighLevel, SimPro, Zapier, n8n, Slack, and Google Workspace, including systems that save 25+ hours per week of administrative work.",
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
    "Engineered an AI-assisted diagnostics workflow connecting Claude to GoHighLevel through the API and MCP, so AI can navigate sub-accounts, read workflows and logs, and pinpoint broken triggers, field mappings and automations for faster root-cause analysis.",
    "Trained newly hired junior tech specialists on AI-assisted workflows using Claude, the GHL API and MCP, so they troubleshot less by hand and ramped up faster.",
  ],
  "work-sterk-systems": [
    "Designed and shipped 10+ high-converting, responsive websites for local service companies across the Netherlands using Next.js and Tailwind CSS, averaging 1 week of delivery per site.",
    "Optimized page performance and Core Web Vitals with image compression, lazy loading and code splitting, reaching 90+ Lighthouse scores and cutting page load times by about 40% on mobile and desktop.",
    "Applied UI/UX design principles (visual hierarchy, clear calls to action, mobile-first layouts, consistent spacing and typography) to redesign hero sections and service pages, lifting quote-request conversions by about 20% across client sites.",
    "Implemented local SEO foundations (Google Maps embeds, structured data, location-based service pages), helping clients reach first-page local search rankings for priority service keywords.",
    "Built CRM-connected booking and quote forms that route leads straight into client pipelines, saving about 5 hours a week of manual intake and increasing form submissions by about 25%.",
    "Gathered and acted on client and end-user feedback through iterative review cycles, turning revision requests into faster, better-aligned releases.",
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
    "Campus: Batangas, Philippines.",
    "Member of Google Developer Student Clubs.",
    "Full Stack Developer volunteer in school organizations.",
  ],
  skills: [
    "Languages: TypeScript, JavaScript, Python, PHP, SQL, HTML/CSS.",
    "Frontend: React, Next.js App Router, Vite, Tailwind CSS v4, shadcn/ui, responsive web design.",
    "Backend and APIs: Node.js, Express, REST APIs, webhooks, bearer-token authentication, rate limiting, retry/backoff logic, health endpoints, structured errors.",
    "AI and LLM: OpenAI API, Anthropic Claude API, Google Gemini, AI agents, prompt engineering, structured outputs, Zod validation, vision/text workflows, AI parsing.",
    "Automation and CRM: GoHighLevel, Conversation AI, n8n, Make, Zapier, SimPro, Slack, Google Workspace, automated email/SMS/WhatsApp workflows.",
    "Data, cloud and QA: PostgreSQL, Supabase, MySQL, SQLite, Vercel, Railway, Docker, Git/GitHub, Vitest, Playwright, CI/CD, debugging, technical support.",
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
    "Built and pitched a real-time AI Conversation Arena prototype using Agora ConvoAI, TRAE IDE and AWS infrastructure, competing against 27 professional and student teams in Manila.",
  ],
  "hackathon-pup-hackathon-2025-uthack-ang-puhunan-top-10": [
    "Top 10 finalist (2024). Contributed to feature architecture research and rapid product development under strict time constraints.",
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
  {
    title: "Marketing Asset Generator",
    tagline: "Content Repurposer",
    stack: ["Next.js", "OpenAI API", "Zod", "Tailwind CSS v4"],
    highlights: [
      "Converts long-form text into platform-ready posts for LinkedIn, X, TikTok, Instagram and Facebook, using shared Zod schemas for typed API responses.",
    ],
  },
];
