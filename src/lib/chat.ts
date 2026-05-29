import { DATA } from "@/data/resume";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

/** Window event other components dispatch to open the chat panel. */
export const OPEN_CHAT_EVENT = "open-chat";

/** Open the chat panel from anywhere on the page (see chat.tsx listener). */
export const openChat = () => window.dispatchEvent(new Event(OPEN_CHAT_EVENT));

export const SUGGESTED_QUESTIONS = [
  "What do you do?",
  "What's your tech stack?",
  "Tell me about your experience",
  "How can I reach you?",
] as const;

/** strip markdown bold markers used in the résumé data */
const clean = (s: string) => s.replace(/\*\*/g, "");

const has = (input: string, words: string[]) => words.some((w) => input.includes(w));

function skillsAnswer() {
  const lines = DATA.skillGroups
    .map((g) => `• ${g.category}: ${g.skills.join(", ")}`)
    .join("\n");
  return `Here's my tech stack:\n${lines}`;
}

function workAnswer() {
  const roles = DATA.work
    .map((w) => `• ${w.title} — ${w.company} (${w.start}–${w.end})`)
    .join("\n");
  return `A quick look at my experience:\n${roles}\n\nClick any role in the Work section to read the details.`;
}

function projectsAnswer() {
  const list = DATA.projects
    .map((p) => `• ${p.title} — ${clean(p.description)}`)
    .join("\n");
  return `Some things I've built:\n${list}\n\nThere's more in the Projects section above.`;
}

function educationAnswer() {
  return DATA.education
    .map(
      (e) =>
        `I studied ${e.degree} at ${e.school}${
          e.badges && e.badges.length ? ` (${e.badges.join(", ")})` : ""
        }.`
    )
    .join(" ");
}

function hackathonAnswer() {
  const list = DATA.hackathons.map((h) => `• ${h.title} (${h.dates})`).join("\n");
  return `Hackathons & awards:\n${list}`;
}

function certsAnswer() {
  const list = DATA.certifications
    .map((c) => `• ${c.title} — ${c.issuer} (${c.date})`)
    .join("\n");
  return `Certifications:\n${list}`;
}

function contactAnswer() {
  return `The best way to reach me is email: ${DATA.contact.email}. You'll also find my GitHub and LinkedIn in the header and footer — I'm always open to interesting work and collaborations.`;
}

/**
 * Local, fully client-side responder. Matches the question against intents
 * derived from the résumé data and returns a written answer — no backend,
 * no API key (this site is a static export).
 *
 * UPGRADE PATH: to make this a real LLM chat, replace the body of this
 * function (or call it from the UI) with a `fetch` to a serverless proxy
 * — e.g. a Cloudflare Worker / Vercel function that holds the Anthropic
 * key server-side and calls the Messages API. The UI in `chat.tsx` already
 * supports async; just await the network call there instead of getAnswer().
 */
export function getAnswer(raw: string): string {
  const input = raw.toLowerCase().trim();
  const firstName = DATA.name.split(" ")[0];

  if (!input) return "Ask me anything about my work, skills, or how to get in touch!";

  if (input.length < 14 && has(input, ["hi", "hello", "hey", "howdy", "yo"]))
    return `Hey! 👋 I'm ${firstName}. Ask me about what I do, my tech stack, experience, projects, or how to reach me.`;

  if (has(input, ["contact", "reach", "email", "hire", "available", "touch", "work with", "collab", "message"]))
    return contactAnswer();
  if (has(input, ["stack", "skill", "tech", "language", "framework", "tool", "know how"]))
    return skillsAnswer();
  if (has(input, ["experience", "work", "job", "career", "company", "employ", "role"]))
    return workAnswer();
  if (has(input, ["project", "built", "build", "made", "portfolio", "ship"]))
    return projectsAnswer();
  if (has(input, ["education", "school", "degree", "study", "studied", "university", "college", "pup"]))
    return educationAnswer();
  if (has(input, ["hackathon", "award", "win", "won", "competition", "prize"]))
    return hackathonAnswer();
  if (has(input, ["cert", "certificate", "certification"]))
    return certsAnswer();
  if (has(input, ["where", "located", "location", "based", "live", "from"]))
    return `I'm based in ${DATA.location}, and I work remotely with teams worldwide.`;
  if (has(input, ["who", "about", "yourself", "you do", "background", "story"]))
    return clean(DATA.summary);

  return `I'm not totally sure I caught that — here's the short version:\n\n${clean(
    DATA.description
  )}.\n\nTry asking about my tech stack, experience, projects, or how to reach me — or just email ${
    DATA.contact.email
  }.`;
}
