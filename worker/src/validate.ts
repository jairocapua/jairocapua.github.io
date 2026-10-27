export interface ChatTurn {
  role: "user" | "assistant";
  content: string;
}

const MAX_MESSAGES = 12;
const MAX_CHARS = 1000;
const MAX_TOTAL_CHARS = 4000;

/** The request body as a conversation ending in a user turn, or an error message. */
export function parseChatBody(body: unknown): { turns: ChatTurn[] } | { error: string } {
  const messages = (body as { messages?: unknown } | null)?.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > MAX_MESSAGES) {
    return { error: `"messages" must be an array of 1-${MAX_MESSAGES} turns.` };
  }

  const turns: ChatTurn[] = [];
  let total = 0;
  for (const m of messages) {
    const { role, content } = (m ?? {}) as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") {
      return { error: 'Each turn needs a "role" (user | assistant) and a string "content".' };
    }
    const text = content.trim();
    if (!text || text.length > MAX_CHARS) {
      return { error: `Each message must be 1-${MAX_CHARS} characters.` };
    }
    total += text.length;
    turns.push({ role, content: text });
  }

  if (total > MAX_TOTAL_CHARS) return { error: "The conversation is too long." };
  if (turns[turns.length - 1].role !== "user") return { error: "The last turn must be the user's." };
  return { turns };
}
