// Hand-written answers for the portfolio chatbot: things recruiters ask that the
// rest of the site doesn't say. Each entry becomes one retrievable chunk (see
// src/lib/chat-chunks.ts). An entry with an empty answer is skipped, so the bot
// says "I don't know, email Jairo" instead of guessing.

export interface ChatFaq {
  /** Stable slug; becomes the chunk id `faq-<id>`. */
  id: string;
  question: string;
  answer: string;
}

export const CHAT_FAQ: ChatFaq[] = [
  {
    id: "availability",
    question: "Is Jairo available for work? Full-time, freelance, or contract?",
    answer: "", // TODO(Jairo): e.g. "Open to full-time roles and freelance projects."
  },
  {
    id: "work-setup",
    question: "What timezone is Jairo in, and does he work remote, hybrid, or onsite? Would he relocate?",
    answer: "", // TODO(Jairo): timezone is PHT (UTC+8); remote/hybrid/onsite; relocation.
  },
  {
    id: "start-date",
    question: "What is Jairo's notice period? When can he start?",
    answer: "", // TODO(Jairo)
  },
  {
    id: "rates",
    question: "What are Jairo's rates or salary expectations?",
    answer:
      "Jairo is open to discussing rates and compensation for the right role or project. The best way to start that conversation is by email at jairocapua.dev@gmail.com.",
  },
];
