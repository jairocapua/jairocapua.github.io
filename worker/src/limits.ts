import type { Env } from "./env";

// Per visitor (hashed IP) and site-wide. Counted in D1 rather than the Rate
// Limiting binding, which is per-location and approximate.
export const PER_MINUTE = 5;
export const PER_DAY = 40;
export const GLOBAL_PER_DAY = 300;

export type LimitResult =
  | { ok: true }
  | { ok: false; scope: "minute" | "day" | "global"; retryAfter: number };

/** sha256(ip + salt), so counters never hold a raw IP. */
export async function hashIp(ip: string, salt: string): Promise<string> {
  const bytes = new TextEncoder().encode(ip + salt);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest).slice(0, 16)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Counts this request against all three limits; rejected requests count too. */
export async function checkLimits(env: Env, ipHash: string, now = Date.now()): Promise<LimitResult> {
  const nowS = Math.floor(now / 1000);
  const minute = Math.floor(nowS / 60);
  const date = new Date(now).toISOString().slice(0, 10);
  const endOfMinute = (minute + 1) * 60;
  const endOfDay = Math.floor(Date.parse(`${date}T00:00:00Z`) / 1000) + 86400;

  const bump = env.CHAT_DB.prepare(
    `INSERT INTO counters (key, count, expires_at) VALUES (?1, 1, ?2)
     ON CONFLICT(key) DO UPDATE SET count = count + 1
     RETURNING count`
  );
  const [perMinute, perDay, global] = await env.CHAT_DB.batch<{ count: number }>([
    bump.bind(`min:${ipHash}:${minute}`, endOfMinute),
    bump.bind(`day:${ipHash}:${date}`, endOfDay),
    bump.bind(`global:${date}`, endOfDay),
  ]);

  const count = (r: D1Result<{ count: number }>) => r.results[0]?.count ?? 0;
  if (count(global) > GLOBAL_PER_DAY) return { ok: false, scope: "global", retryAfter: endOfDay - nowS };
  if (count(perDay) > PER_DAY) return { ok: false, scope: "day", retryAfter: endOfDay - nowS };
  if (count(perMinute) > PER_MINUTE) return { ok: false, scope: "minute", retryAfter: endOfMinute - nowS };
  return { ok: true };
}

export const LIMIT_MESSAGES: Record<"minute" | "day" | "global", string> = {
  minute: "That's a lot of questions at once. Give me a minute, then ask again.",
  day: "You've reached today's question limit. For anything else, email Jairo at jairocapua.dev@gmail.com.",
  global: "I'm resting for today. Please email Jairo at jairocapua.dev@gmail.com, he'll get back to you.",
};
