import { Github, Linkedin, Mail, Twitter, Youtube, type LucideIcon } from "lucide-react";
import type { CodeProjectCategory } from "@/lib/project-categories";

export type SocialKey = "GitHub" | "LinkedIn" | "X" | "YouTube" | "Email";

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
  navbar: boolean;
}

export interface ProjectLink {
  type: string;
  href: string;
  icon: string;
}

export interface Project {
  title: string;
  href?: string;
  dates: string;
  active: boolean;
  /** Which /projects sub-page this project appears under. */
  category: CodeProjectCategory;
  /** Optional custom status line shown at the top of the card (overrides the default lead). */
  status?: string;
  /** Short pitch shown on the card. */
  description: string;
  /** Up to ~3 tags shown on the card. */
  technologies: readonly string[];
  /** Longer write-up revealed under "Show more". Paragraphs separated by a blank line. */
  detailedDescription?: string;
  /** Full technology list revealed under "Show more". */
  stack?: readonly string[];
  links?: ProjectLink[];
  image: string;
  video: string;
}

export const DATA = {
  name: "Jairo Capua",
  initials: "JC",
  username: "jairocapua",
  role: "AI Developer",
  badge: "Agora Voice AI Hackathon · 2nd Runner Up",
  url: "https://jairocapua.github.io",
  location: "Batangas, Philippines",
  locationLink: "https://www.google.com/maps",
  description:
    "AI Developer. I build smart systems, web apps, and AI-powered workflows that help businesses automate operations, save time, and scale faster",
  summary:
    "I work at the intersection of software engineering, automation, and AI. My experience includes building **web applications**, integrating **APIs**, designing **CRM workflows**, and creating **automation systems** using tools like **GoHighLevel**, **Zapier**, **Make**, **n8n**, **OpenAI**, and **Claude**. I enjoy turning repetitive business processes into reliable, scalable systems that are simple to use and built to solve real problems",
  avatarUrl: "/jairo-pfp.jpg",
  skills: [
    "React", "Next.js", "TypeScript", "JavaScript", "Node.js", "Python",
    "Tailwind CSS", "Express", "CloudFlare", "Firebase", "Google Cloud Platform",
    "PostgreSQL", "MongoDB", "Docker", "Git", "Figma", "Supabase", "Postman",
    "AWS", "OpenAI", "Claude", "Vercel", "GoHighLevel", "n8n", "Zapier", "Make.com",
    "HTML5", "CSS3", "shadcn/ui", "Framer Motion", "Bash",
    "PHP", "SQLite", "Netlify", "Railway", "Nginx",
    "Digital Ocean", "Anthropic", "LangChain", "Hugging Face", "Ollama",
    "Gemini", "LlamaIndex", "Airtable", "GitHub", "Jest",
    "Playwright", "ESLint", "pnpm", "Cursor", "VS Code", "Replit", "Base44",
  ],
  skillGroups: [
    {
      category: "Frontend",
      skills: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Framer Motion", "HTML5", "CSS3", "Figma"],
    },
    {
      category: "Languages",
      skills: ["TypeScript", "JavaScript", "Python", "Bash"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "PHP"],
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MongoDB", "Supabase", "Firebase", "SQLite"],
    },
    {
      category: "Cloud & Infra",
      skills: ["AWS", "Google Cloud Platform", "CloudFlare", "Vercel", "Docker", "Netlify", "Railway", "Nginx", "Digital Ocean"],
    },
    {
      category: "AI / ML",
      skills: ["OpenAI", "Claude", "Anthropic", "LangChain", "Hugging Face", "Ollama", "Gemini", "LlamaIndex"],
    },
    {
      category: "Automation",
      skills: ["GoHighLevel", "n8n", "Zapier", "Make.com", "Airtable"],
    },
    {
      category: "Dev Tools",
      skills: ["Git", "GitHub", "Postman", "Jest", "Playwright", "ESLint", "pnpm", "Cursor", "VS Code", "Replit", "Base44"],
    },
  ],
  navbar: [{ href: "/", icon: "home", label: "Home" }],
  contact: {
    email: "jairocapua.dev@gmail.com",
    tel: "",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/jairocapua",
        icon: Github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/jairocapua",
        icon: Linkedin,
        navbar: true,
      },
      X: {
        name: "X",
        url: "https://x.com",
        icon: Twitter,
        navbar: false,
      },
      YouTube: {
        name: "YouTube",
        url: "https://youtube.com/@your-handle",
        icon: Youtube,
        navbar: false,
      },
      Email: {
        name: "Email",
        url: "mailto:jairocapua.dev@gmail.com",
        icon: Mail,
        navbar: false,
      },
    } satisfies Record<SocialKey, SocialLink>,
  },
  work: [
    {
      company: "Aveba LLC",
      href: "",
      badges: [],
      location: "Philippines (Remote)",
      workSetup: "Remote · Full-time",
      title: "GoHighLevel & AI Automation Tech Specialist",
      logoUrl: "/work/aveba.webp",
      start: "June 2026",
      end: "Present",
      description:
        "Manage technical support tickets across 10+ GoHighLevel sub-accounts for different businesses serving US and Canadian clients — triaging incoming issues, then mapping out workflows, triggers, and pipeline logic to diagnose and harden the automations that break in production. Also build and maintain new systems spanning CRM architecture, multi-channel nurture and follow-up sequences, and AI-assisted workflows that connect GHL to external services through webhooks and APIs, replacing manual back-office steps with reliable, monitored automations.",
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
      image: "/project_images/EchoAI_Project_Image.png",
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
      ],
      image: "/project_images/JobPilot_Project_Image.png",
      video: "",
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
  certifications: [
    // TODO: replace these placeholders with your real certifications
    {
      title: "Generative AI Leader",
      issuer: "Google Cloud",
      date: "2025",
      href: "",
    },
    {
      title: "Claude Developer",
      issuer: "Anthropic",
      date: "2025",
      href: "",
    },
    {
      title: "Meta Front-End Developer",
      issuer: "Coursera",
      date: "2024",
      href: "",
    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      date: "2024",
      href: "",
    },
  ],
  // Add real, named LinkedIn recommendations here (quote + recommender's real
  // name + title). The "Recommendations" section is hidden while this is empty.
  testimonials: [] as { quote: string; name: string; title: string }[],
} as const;

export type ResumeData = typeof DATA;
