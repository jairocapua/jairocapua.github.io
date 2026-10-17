import type { ComponentType } from "react";
import { HomeIcon } from "lucide-react";
import { Icons } from "@/components/icons";

type IconComponent = ComponentType<{ className?: string }>;

export type SocialKey = "GitHub" | "LinkedIn" | "X" | "YouTube" | "Email";

export interface SocialLink {
  name: string;
  url: string;
  icon: IconComponent;
  /** Show this link in the bottom dock. */
  navbar: boolean;
}

export interface ProjectLink {
  type: string;
  href: string;
  /** Key into `Icons` (src/components/icons.tsx), e.g. "github". */
  icon: "github" | "globe" | "play";
}

export type ProjectCategory = "ai-web-apps" | "ai-agents" | "ai-projects";

export interface Project {
  title: string;
  /** Live site. The card falls back to the first link (the source) without one. */
  href?: string;
  dates: string;
  active: boolean;
  /** Grouping used in llms-full.txt. */
  category: ProjectCategory;
  /** Short status line (llms-full.txt only; the card doesn't show it). */
  status?: string;
  /** Short pitch shown on the card. */
  description: string;
  /** Tags shown on the card. */
  technologies: readonly string[];
  /** Longer write-up for llms-full.txt. Paragraphs separated by a blank line. */
  detailedDescription?: string;
  /** Full technology list for llms-full.txt. */
  stack?: readonly string[];
  links?: ProjectLink[];
  /** Card image; also the poster frame while a video loads. */
  image: string;
  /** Short muted loop that autoplays on the card (keep it small). */
  video: string;
}

// The skills shown on the site, by group (DATA.skills is derived from this).
// Logos come from src/lib/skill-icons.ts; a skill without one shows as text.
const SKILL_GROUPS = [
  {
    category: "AI / ML & Agents",
    skills: ["OpenAI", "Claude", "Anthropic", "Gemini", "LangChain", "LlamaIndex", "Hugging Face", "Ollama", "Retell AI", "Vapi", "Agora", "Browserbase", "Stagehand"],
  },
  {
    category: "Automation",
    skills: ["GoHighLevel", "n8n", "Zapier", "Make.com", "Airtable", "Slack", "Google Workspace"],
  },
  {
    category: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Zustand", "React Hook Form", "Zod", "TanStack Table", "Vite", "HTML5", "CSS3", "Figma"],
  },
  {
    category: "Languages",
    skills: ["TypeScript", "JavaScript", "Python", "Bash"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "PHP", "Better Auth"],
  },
  {
    category: "Databases",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Neon", "Drizzle", "Supabase", "Firebase", "SQLite", "InsForge", "Couchbase"],
  },
  {
    category: "Cloud & Infra",
    skills: ["Vercel", "Railway", "Docker", "AWS", "Google Cloud Platform", "CloudFlare", "Netlify", "Nginx", "Digital Ocean"],
  },
  {
    category: "Dev Tools",
    skills: ["Git", "GitHub", "Cursor", "VS Code", "Vitest", "Jest", "Playwright", "Postman", "ESLint", "pnpm", "PostHog", "Replit", "Base44"],
  },
] as const;

export const DATA = {
  name: "Jairo Capua",
  initials: "JC",
  username: "jairocapua",
  role: "AI Software Engineer",
  badge: "Agora Voice AI Hackathon · 2nd Runner Up",
  url: "https://jairocapua.github.io",
  location: "Batangas, Philippines",
  locationLink: "https://www.google.com/maps",
  description:
    "AI Software Engineer. I build smart systems, web apps, and AI-powered workflows that help businesses automate operations, save time, and scale faster",
  summary:
    "I work at the intersection of software engineering, automation, and AI. My experience includes building **web applications**, integrating **APIs**, designing **CRM workflows**, and creating **automation systems** using tools like **GoHighLevel**, **Zapier**, **Make.com**, **n8n**, **OpenAI Codex**, and **Claude Code**. I enjoy turning repetitive business processes into reliable, scalable systems that are simple to use and built to solve real problems",
  avatarUrl: "/jairo-pfp.jpg",
  /** CV PDF, linked from the icon next to the name. Replace the file to update it. */
  resumeUrl: "/jairo-capua-cv.pdf",
  // Flat list for JSON-LD (knowsAbout); derived so it can't drift from the groups.
  skills: SKILL_GROUPS.flatMap((group) => group.skills),
  skillGroups: SKILL_GROUPS,
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "jairocapua.dev@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/jairocapua",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/jairocapua",
        icon: Icons.linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com",
        icon: Icons.x,
        navbar: false,
      },
      YouTube: {
        name: "YouTube",
        url: "https://youtube.com/@your-handle",
        icon: Icons.youtube,
        navbar: false,
      },
      Email: {
        name: "Email",
        url: "mailto:jairocapua.dev@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    } satisfies Record<SocialKey, SocialLink>,
  },
  work: [
    {
      company: "Sequoya AI",
      href: "",
      badges: [],
      location: "Australia (Remote)",
      workSetup: "Remote · Full-time",
      title: "AI Developer",
      logoUrl: "/work/sequoya-logo.png",
      start: "September 2026",
      end: "Present",
      description:
        "Build and contribute to AI operating systems and AI-agent solutions designed for business leads and customers — developing, testing, and refining customer-facing AI agents, automation workflows, and AI-powered business systems. Help integrate AI capabilities into business processes to automate tasks, improve lead handling, and support customer operations, working on production AI solutions involving LLMs, APIs, automation, agent workflows, and modern AI development tools.",
    },
    {
      company: "Aveba Digital",
      href: "",
      badges: [],
      location: "Philippines (Remote)",
      workSetup: "Remote · Full-time",
      title: "GHL AI Tech Specialist",
      logoUrl: "/work/aveba.webp",
      start: "July 2026",
      end: "October 2026",
      description:
        "Supported and optimized GoHighLevel CRM systems across multiple client accounts — covering workflows, pipelines, calendars, custom fields, lead routing, notifications, and opportunity lifecycle management. Built, repaired, tested, and QA'd production automations for call dispositions, appointments, lead handoffs, follow-ups, task assignments, and CRM processes, working with AI and external integrations including Retell AI, webhooks, forms, and APIs. Investigated technical issues through root-cause analysis, implemented fixes, tested solutions, and provided technical handoff updates.",
    },
    {
      company: "STERK SYSTEMS",
      href: "",
      badges: [],
      location: "Netherlands (Remote)",
      workSetup: "Remote · Part-time",
      title: "Web Developer (Part-time)",
      logoUrl: "/work/sterk-logo.png",
      start: "June 2026",
      end: "Present",
      description:
        "Design and develop high-converting, responsive websites for local service companies across the Netherlands using Next.js, React, and Tailwind CSS. Own the visual layer end to end — from hero and section layouts to the imagery itself, generating photorealistic AI visuals (job-site, crew, and product shots) that match each client's trade and region, so sites launch with on-brand photography instead of generic stock. Embed interactive elements such as Google Maps for local SEO and CRM-connected booking forms to streamline client intake and project scheduling, and tune layout, copy placement, and page speed to lift enquiry conversion.",
    },
    {
      company: "The Family Roofing Company",
      href: "https://thefamilyroofingcompany.co.uk",
      badges: [],
      location: "Leeds, United Kingdom",
      workSetup: "Remote · Contract",
      title: "Web Developer & AI Automation Specialist",
      logoUrl: "/work/tfrc-logo.png",
      start: "March 2026",
      end: "June 2026",
      description:
        "Built a fully automated appointment booking system for a roofing company. Integrated GoHighLevel CRM with AI-powered chat, automated follow-ups, and intelligent routing. Added a real-time Google Calendar sync, a smart dashboard, and custom workflows to capture and qualify leads with zero manual work. Also developed a custom admin panel for internal team use. The system reduced manual admin time by over 80% and improved lead response time from days to seconds",
    },
    {
      company: "Xurpas Inc.",
      href: "https://xurpas.com/",
      badges: [],
      location: "Makati City, Philippines",
      workSetup: "Hybrid",
      title: "Software Developer & QA Intern",
      logoUrl: "/work/xurpas-logo.png",
      start: "March 2025",
      end: "June 2025",
      description:
        "Contributed to the development of a Human Resource Information System (HRIS) for a government agency using ERPNext. Implemented custom modules and workflows to streamline HR processes, including employee data management, leave applications, and performance tracking. Collaborated with the QA team to ensure system reliability through thorough testing and bug resolution."
    },
  ],
  education: [
    {
      school: "Polytechnic University of the Philippines",
      href: "",
      degree: "Bachelor of Science in Information Technology",
      badges: ["Magna Cum Laude"],
      logoUrl: "/education/pup-logo.png",
      start: " ",
      end: " ",
    },
  ],
  projects: [
    {
      title: "Echo AI",
      category: "ai-agents",
      dates: "May 2026",
      active: false,
      status: "🏆 Hackathon · 2nd Runner Up",
      description:
        "Real-time voice rehearsal app: an AI buyer persona (mood + difficulty) talks back over a live Agora call, objections are retrieved by vector search, and an AI coach scores and annotates the transcript afterward.",
      technologies: ["Next.js", "TypeScript", "Agora"],
      detailedDescription:
        "Echo is a self-contained Next.js app that turns sales practice into a live, voice-first simulation. You pick an industry, a buyer persona, their mood, and a difficulty, paste in what you're selling, and take the call — speaking out loud to an AI buyer that pushes back in real time. When you hang up, an AI coach grades the call, annotates the transcript turn-by-turn, and hands you a focused practice plan. You can even replay the last objection to drill the moment the deal slipped.\n\nUnder the hood, Next.js API routes talk directly to the Agora Conversational AI REST API, OpenAI (buyer LLM, embeddings, coach, TTS), and Couchbase vector search — no separate backend. The most relevant objections are retrieved per product via embeddings, the buyer's system prompt is composed on the fly, and the whole call runs over Agora RTC audio with a live RTM transcript.",
      stack: [
        "Next.js 16",
        "React 19",
        "TypeScript 5",
        "Tailwind CSS v4",
        "Agora Conversational AI (RTC/RTM)",
        "OpenAI (GPT, embeddings, TTS)",
        "Couchbase (vector search)",
        "Zustand",
        "SWR",
      ],
      links: [
        { type: "Source", href: "https://github.com/jairocapua/Echo", icon: "github" },
      ],
      image: "/projects/echo-ai.png",
      video: "",
    },
    {
      title: "JobPilot AI",
      category: "ai-web-apps",
      dates: "Jun 2026 — Present",
      active: true,
      description:
        "AI copilot that finds jobs from Adzuna, scores each one against your resume with GPT-4o, and auto-researches the company into an interview-ready dossier — so you skip the prep and just apply.",
      technologies: ["Next.js 16", "TypeScript", "GPT-4o", "Tailwind CSS"],
      detailedDescription:
        "An AI-powered job-hunting assistant for developers. Set up your profile once and the agent discovers relevant roles from Adzuna, scores each against your resume with GPT-4o, and auto-researches every company — building a structured dossier of tech stack, culture, and interview prep before you apply. Everything is tracked on a dashboard with live analytics. It kills the repetitive prep work so you just decide where to apply and click.\n\nWhat makes it interesting: agentic company research uses a single Browserbase + Stagehand session to browse each company's real public pages (homepage, about, blog, engineering), then GPT-4o synthesizes a candidate-specific dossier — your edge, gaps to address, and smart interview questions. GPT-4o scores every job 0–100 against your actual profile, returning matched skills, missing skills, and reasoning — not keyword matching. InsForge handles auth (Google/GitHub OAuth), Postgres, storage, and realtime; PostHog powers the dashboard analytics.",
      stack: [
        "Next.js 16 (App Router)",
        "TypeScript (strict)",
        "InsForge (auth, DB, storage, realtime)",
        "OpenAI GPT-4o",
        "Browserbase + Stagehand",
        "Adzuna API",
        "PostHog",
        "@react-pdf/renderer",
        "Tailwind CSS + shadcn/ui",
      ],
      links: [
        { type: "Source", href: "https://github.com/jairocapua/JobPilot-AI", icon: "github" },
        { type: "Demo", href: "/projects/jobpilot-demo.mp4", icon: "play" },
      ],
      image: "/projects/jobpilot.png",
      // 16 s silent cut of jobpilot-demo.mp4 (0:26–0:42), made with ffmpeg.
      video: "/projects/jobpilot-preview.mp4",
    },
    {
      title: "Support Ticketing Pipeline",
      category: "ai-web-apps",
      dates: "Oct 2026",
      active: true,
      status: "✅ Shipped · In daily use",
      description:
        "A Kanban ticket pipeline for GoHighLevel tech support. Tickets move New → In Progress → Waiting → Resolved, replies come from templates, and a dashboard shows the workload. Every change appears instantly and syncs to Postgres, even through an offline stretch.",
      technologies: ["Next.js 16", "TypeScript", "PostgreSQL", "Drizzle"],
      detailedDescription:
        "A full-stack support desk I use every day to handle GoHighLevel issues for an agency's clients. Each agency gets its own board: a drag-and-drop Kanban whose cards show the client sub-account, priority, GHL area, due date and age, plus a sortable table view of the same tickets. A ticket page holds editable properties, a one-click jump into the client's GHL sub-account, and a timeline of internal notes and replies. Reply templates fill in placeholders like {{business_name}} from the ticket. The dashboard tracks open, waiting and overdue counts, time to resolve, opened vs. resolved per week, and breakdowns by priority, area and client. N creates a ticket and Ctrl/⌘ K jumps anywhere.\n\nIt began as a browser-only app (Zustand + IndexedDB) and was rebuilt in nine planned phases into a hosted app on Neon Postgres, Drizzle, Better Auth and Vercel, without losing its instant feel. Every business rule is written once as a pure command. The browser runs it for the optimistic view, and the server runs the same code inside a locked Postgres transaction for the truth; a parity test proves the two produce identical data. A sync engine queues changes with retry and backoff, keeps working offline, and warns before a tab with unsaved work is closed. The tickets hold sensitive client details, so the app has a single owner account, logs that record what happened but never the content, and nightly encrypted backups with export, import and restore. Vitest (PGlite in-process plus real-Postgres concurrency tests) and Playwright E2E gate every push, and each branch deploys to a preview with its own copy of the database.",
      stack: [
        "Next.js 16 (App Router)",
        "React 19",
        "TypeScript",
        "Neon Postgres + Drizzle ORM",
        "Better Auth",
        "Zustand (optimistic sync engine)",
        "dnd-kit",
        "TanStack Table",
        "Recharts",
        "Tailwind CSS v4 + shadcn/ui",
        "Zod + React Hook Form",
        "Vitest + PGlite",
        "Playwright",
        "Vercel",
      ],
      links: [
        { type: "Source", href: "https://github.com/jairocapua/Support-Ticketing-Pipeline", icon: "github" },
        { type: "Demo", href: "/projects/support-ticketing-demo.mp4", icon: "play" },
      ],
      // Local build on the fictional sample board, never production data.
      image: "/projects/support-ticketing.png",
      // 16 s silent cut of support-ticketing-demo.mp4 (0:19–0:35), made with ffmpeg.
      video: "/projects/support-ticketing-preview.mp4",
    },
  ] as Project[],
  hackathons: [
    {
      title: "Agora Voice AI Hackathon — 2nd Runner Up",
      dates: "March 2026",
      location: "BGC Taguig, Philippines",
      description:
        "Built an AI-powered mock interviewer that simulates real job interviews using voice. The app rates the candidate's chances of passing and gives targeted recommendations to ace the actual interview. Placed 2nd Runner Up.",
      image: "/hackathons/agora-voice-ai.jpg",
      links: [] as { title: string; href: string; icon: string }[],
    },
    {
      title: "PUP Hackathon 2025: UtHACK ang Puhunan — Top 10",
      dates: "November 2024",
      location: "Polytechnic University of the Philippines",
      description:
        "Built an app that uses image recognition to identify solid dry waste and suggests practical ways to repurpose or upcycle it — turning discarded materials into actionable ideas. Reached the Top 10 in PUP's flagship hackathon.",
      image: "/hackathons/pup-uthack-2025.png",
      links: [] as { title: string; href: string; icon: string }[],
    },
  ],
  // `date` and `href` are optional: a blank date is hidden, and an href (the
  // credential URL) turns the row into a link.
  certifications: [
    {
      title: "Full Stack Software Engineer",
      issuer: "Meta via Coursera",
      date: "",
      href: "",
      logoUrl: "/tech/coursera.svg",
    },
    {
      title: "AI Engineer",
      issuer: "Scrimba",
      date: "",
      href: "",
      logoUrl: "/tech/scrimba.png",
    },
  ],
  // Add real, named LinkedIn recommendations here (quote + recommender's real
  // name + title). Not shown on the site yet; llms-full.txt includes them.
  testimonials: [] as { quote: string; name: string; title: string }[],
} as const;

export type ResumeData = typeof DATA;
