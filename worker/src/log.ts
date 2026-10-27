import type { Env } from "./env";

export type Outcome = "ok" | "refusal" | "error";

/** Anonymous: the question and what was cited, nothing about the visitor. */
export async function logQuestion(
  env: Env,
  entry: { question: string; citedIds: string[]; outcome: Outcome; latencyMs: number }
): Promise<void> {
  await env.CHAT_DB.prepare(
    "INSERT INTO questions (ts, question, cited, outcome, latency_ms) VALUES (?1, ?2, ?3, ?4, ?5)"
  )
    .bind(Date.now(), entry.question, JSON.stringify(entry.citedIds), entry.outcome, entry.latencyMs)
    .run();
}

/** The daily cron: drop questions older than 30 days and expired counters. */
export async function cleanUp(env: Env): Promise<void> {
  const cutoff = Date.now() - 30 * 86400 * 1000;
  await env.CHAT_DB.batch([
    env.CHAT_DB.prepare("DELETE FROM questions WHERE ts < ?1").bind(cutoff),
    env.CHAT_DB.prepare("DELETE FROM counters WHERE expires_at < ?1").bind(Math.floor(Date.now() / 1000)),
  ]);
}
