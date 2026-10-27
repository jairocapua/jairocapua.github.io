import Anthropic from "@anthropic-ai/sdk";

export const CHAT_MODEL = "claude-haiku-5-5";
/** About 120 words is ~170 tokens; this leaves room without letting a reply run on. */
export const MAX_OUTPUT_TOKENS = 500;

/** The request the Worker streams and the eval sends, so both test the same thing. */
export function chatParams(system: string, messages: Anthropic.MessageParam[]) {
  return {
    model: CHAT_MODEL,
    max_tokens: MAX_OUTPUT_TOKENS,
    // Short grounded answers don't need reasoning; Haiku 5.5 allows "disabled"
    // at its default (medium) effort.
    thinking: { type: "disabled" as const },
    // The system prompt is the same on every request, so cache it.
    system: [{ type: "text" as const, text: system, cache_control: { type: "ephemeral" as const } }],
    messages,
  } satisfies Anthropic.MessageCreateParamsNonStreaming;
}
