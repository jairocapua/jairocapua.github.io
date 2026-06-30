# Projects

Reference list of all projects on the portfolio site. This document is derived
from the `projects` array in [`src/data/resume.ts`](src/data/resume.ts) — that
file remains the single source of truth the website renders from. Keep this doc
in sync when you add or edit projects there.

---

## Echo AI — May 2026

🏆 Hackathon · 2nd Runner Up · Archived

Real-time voice rehearsal app: an AI buyer persona (mood + difficulty) talks back
over a live Agora call, objections are retrieved by vector search, and an AI coach
scores and annotates the transcript afterward.

**Tech:** Next.js, TypeScript, Agora

Echo is a self-contained Next.js app that turns sales practice into a live,
voice-first simulation. You pick an industry, a buyer persona, their mood, and a
difficulty, paste in what you're selling, and take the call — speaking out loud to
an AI buyer that pushes back in real time. When you hang up, an AI coach grades the
call, annotates the transcript turn-by-turn, and hands you a focused practice plan.
You can even replay the last objection to drill the moment the deal slipped.

Under the hood, Next.js API routes talk directly to the Agora Conversational AI
REST API, OpenAI (buyer LLM, embeddings, coach, TTS), and Couchbase vector search —
no separate backend. The most relevant objections are retrieved per product via
embeddings, the buyer's system prompt is composed on the fly, and the whole call
runs over Agora RTC audio with a live RTM transcript.

**Stack:** Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS v4 · Agora Conversational AI (RTC/RTM) · OpenAI (GPT, embeddings, TTS) · Couchbase (vector search) · Zustand · SWR

**Links:** [Source](https://github.com/jairocapua/Echo)

**Image:** `/project_images/EchoAI_Project_Image.png`

---

## JobPilot AI — Jun 2026 — Present

🚀 Active

AI copilot that finds jobs from Adzuna, scores each one against your resume with
GPT-4o, and auto-researches the company into an interview-ready dossier — so you
skip the prep and just apply.

**Tech:** Next.js 16, TypeScript, GPT-4o, Tailwind CSS

An AI-powered job-hunting assistant for developers. Set up your profile once and
the agent discovers relevant roles from Adzuna, scores each against your resume with
GPT-4o, and auto-researches every company — building a structured dossier of tech
stack, culture, and interview prep before you apply. Everything is tracked on a
dashboard with live analytics. It kills the repetitive prep work so you just decide
where to apply and click.

What makes it interesting: agentic company research uses a single Browserbase +
Stagehand session to browse each company's real public pages (homepage, about,
blog, engineering), then GPT-4o synthesizes a candidate-specific dossier — your
edge, gaps to address, and smart interview questions. GPT-4o scores every job 0–100
against your actual profile, returning matched skills, missing skills, and reasoning
— not keyword matching. InsForge handles auth (Google/GitHub OAuth), Postgres,
storage, and realtime; PostHog powers the dashboard analytics.

**Stack:** Next.js 16 (App Router) · TypeScript (strict) · InsForge (auth, DB, storage, realtime) · OpenAI GPT-4o · Browserbase + Stagehand · Adzuna API · PostHog · @react-pdf/renderer · Tailwind CSS + shadcn/ui

**Links:** [Source](https://github.com/jairocapua/JobPilot-AI)

**Image:** `/project_images/JobPilot_Project_Image.png`

---

> **Note:** The four entries below are placeholder/template projects that ship with
> the site. Replace them with real work in `src/data/resume.ts`.

## Project One — Jan 2025 — Present

🚀 Active

Short pitch for the project. What problem does it solve, who is it for, and what
makes it interesting.

**Tech:** Next.js, TypeScript, Tailwind CSS

**URL:** https://example.com

**Links:** [Website](https://example.com) · [Source](https://github.com/jairocapua)

---

## Project Two — Sep 2024

🛠️ Archived

Another mock project. Replace with something real — keep descriptions under three
lines for visual rhythm.

**Tech:** React, Node.js, Postgres

**URL:** https://example.com

**Links:** [Source](https://github.com/jairocapua)

---

## Project Three — Mar 2024

🛠️ Archived

A landing-page experiment. Good place to show off design work even if the codebase
is small.

**Tech:** HTML, CSS, JavaScript

**URL:** https://example.com

**Links:** [Website](https://example.com)

---

## Project Four — Nov 2023

🛠️ Archived

API integration demo. Mention the API, the wrapper you built, and any unusual
constraints.

**Tech:** TypeScript, Vite

**URL:** https://example.com

**Links:** [Source](https://github.com/jairocapua)
