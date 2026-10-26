export interface Env {
  AI: Ai;
  CHAT_DB: D1Database;
  /** Comma-separated origins allowed to call /chat (wrangler.jsonc vars). */
  ALLOWED_ORIGINS: string;
  /** Secrets (`wrangler secret put`, or .dev.vars locally). */
  ANTHROPIC_API_KEY: string;
  IP_HASH_SALT: string;
}
