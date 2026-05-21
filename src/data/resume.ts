import { Github, Linkedin, Mail, Twitter, Youtube, type LucideIcon } from "lucide-react";

export type SocialKey = "GitHub" | "LinkedIn" | "X" | "YouTube" | "Email";

export interface SocialLink {
  name: string;
  url: string;
  icon: LucideIcon;
  navbar: boolean;
}

export const DATA = {
  name: "Jairo Capua",
  initials: "JC",
  url: "https://jairocapua.github.io",
  location: "City, Country",
  locationLink: "https://www.google.com/maps",
  description:
    "AI Automation & Software Engineer. I build smart systems, web apps, and AI-powered workflows that help businesses automate operations, save time, and scale faster",
  summary:
    "I work at the intersection of software engineering, automation, and AI. My experience includes building **web applications**, integrating **APIs**, designing **CRM workflows**, and creating **automation systems** using tools like **GoHighLevel**, **Zapier**, **Make**, **n8n**, **OpenAI**, and **Claude**. I enjoy turning repetitive business processes into reliable, scalable systems that are simple to use and built to solve real problems",
  avatarUrl: "/jairo-pfp-dark-nowatermark-1x1.png",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Python",
    "Tailwind CSS",
    "Express",
    "CloudFlare",
    "Firebase",
    "Google Cloud Platform",
    "PostgreSQL",
    "MongoDB",
    "Docker",
    "Git",
    "Figma",
    "Supabase",
    "Postman",
    "AWS",
    "OpenAI",
    "Claude",
    "Vercel",
    "n8n",
    "Zapier",
    "Make.com",

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
      company: "The Family Roofing Company",
      href: "https://thefamilyroofingcompany.co.uk",
      badges: [],
      location: "Remote",
      title: "Web Developer & AI Automation Specialist",
      logoUrl: "/work/tfrc-logo.png",
      start: "March 2025",
      end: "Present",
      description:
        "Built a fully automated appointment booking system for a roofing company. Integrated GoHighLevel CRM with AI-powered chat, automated follow-ups, and intelligent routing. Added a real-time Google Calendar sync, a smart dashboard, and custom workflows to capture and qualify leads with zero manual work. Also developed a custom admin panel for internal team use. The system reduced manual admin time by over 80% and improved lead response time from days to seconds",
    },
    {
      company: "Xurpas Inc.",
      href: "https://xurpas.com/",
      badges: [],
      location: "Makati City, Philippines",
      title: "Software Developer/QA Intern",
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
      degree: "BSIT — Bachelor of Science in Information Technology",
      badges: ["Magna Cum Laude"],
      logoUrl: "/education/pup-logo.png",
      start: " ",
      end: " ",
    },
  ],
  projects: [
    {
      title: "Project One",
      href: "https://example.com",
      dates: "Jan 2025 — Present",
      active: true,
      description:
        "Short pitch for the project. What problem does it solve, who is it for, and what makes it interesting.",
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
      links: [
        { type: "Website", href: "https://example.com", icon: "globe" },
        { type: "Source", href: "https://github.com/jairocapua", icon: "github" },
      ],
      image: "",
      video: "",
    },
    {
      title: "Project Two",
      href: "https://example.com",
      dates: "Sep 2024",
      active: false,
      description:
        "Another mock project. Replace with something real — keep descriptions under three lines for visual rhythm.",
      technologies: ["React", "Node.js", "Postgres"],
      links: [{ type: "Source", href: "https://github.com/jairocapua", icon: "github" }],
      image: "",
      video: "",
    },
    {
      title: "Project Three",
      href: "https://example.com",
      dates: "Mar 2024",
      active: false,
      description:
        "A landing-page experiment. Good place to show off design work even if the codebase is small.",
      technologies: ["HTML", "CSS", "JavaScript"],
      links: [{ type: "Website", href: "https://example.com", icon: "globe" }],
      image: "",
      video: "",
    },
    {
      title: "Project Four",
      href: "https://example.com",
      dates: "Nov 2023",
      active: false,
      description:
        "API integration demo. Mention the API, the wrapper you built, and any unusual constraints.",
      technologies: ["TypeScript", "Vite"],
      links: [{ type: "Source", href: "https://github.com/jairocapua", icon: "github" }],
      image: "",
      video: "",
    },
  ],
  hackathons: [
    {
      title: "Agora Voice AI Hackathon — 2nd Runner Up",
      dates: "March 2026",
      location: "BGC Taguig, Philippines",
      description:
        "Built an AI-powered mock interviewer that simulates real job interviews using voice. The app rates the candidate's chances of passing and gives targeted recommendations to ace the actual interview. Placed 2nd Runner Up.",
      image: "/hackathons/agora-voice-ai.jpg",
      links: [],
    },
    {
      title: "PUP Hackathon 2025: UtHACK ang Puhunan — Top 10",
      dates: "November 2025",
      location: "Polytechnic University of the Philippines",
      description:
        "Built an app that uses image recognition to identify solid dry waste and suggests practical ways to repurpose or upcycle it — turning discarded materials into actionable ideas. Reached the Top 10 in PUP's flagship hackathon.",
      image: "/hackathons/pup-uthack-2025.png",
      links: [],
    },
  ],
} as const;

export type ResumeData = typeof DATA;
