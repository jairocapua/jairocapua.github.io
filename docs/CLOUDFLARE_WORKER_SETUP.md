# Cloudflare Worker Setup Guide

A complete, beginner-friendly walkthrough for deploying the chatbot's backend on
**Cloudflare Workers**. No prior Cloudflare experience needed — every command is
spelled out.

> **Heads up:** This guide assumes the `worker/` folder (the Worker source code)
> already exists in this repo. If it doesn't yet, the chatbot hasn't been built —
> ask Claude to "build the Worker from RAG_CHATBOT_PLAN.md" first, then come back
> here to deploy it.

---

## 1. What you're building (and why)

Your portfolio is a **static site** on GitHub Pages. A static site can't keep a
secret (like an OpenAI API key) or run server code. If you called OpenAI directly
from the browser, **anyone could open DevTools, copy your key, and run up your
bill.**

So we add one tiny server — a **Cloudflare Worker** — that sits between your site
and OpenAI:

```
Your site (GitHub Pages)  →  Cloudflare Worker  →  OpenAI (gpt-5-nano)
   public, static            holds the secret key,      the LLM
                             rate-limits, guardrails
```

The Worker holds the key, limits how many messages each visitor can send, and
enforces the chatbot's rules. Your visitors only ever talk to the Worker.

**Cost:** Cloudflare Workers has a generous free tier (~100,000 requests/day).
For a portfolio you will almost certainly **pay $0 to Cloudflare**. You only pay
OpenAI, and `gpt-5-nano` costs fractions of a cent per chat.

---

## 2. Prerequisites

Before you start, make sure you have:

- [ ] **Node.js 20+** installed (check with `node -v`). You already have this — the site uses it.
- [ ] A **Cloudflare account** (free — we create it in Step 3).
- [ ] An **OpenAI API key** with a spend limit set (we cover this in Step 4).
- [ ] This repo cloned locally (you're already here).

You'll run all commands from inside the **`worker/`** folder unless noted.

---

## 3. Create a free Cloudflare account

1. Go to **https://dash.cloudflare.com/sign-up**.
2. Sign up with your email and a password. **No credit card is required** for the
   Workers free tier.
3. Verify your email (check your inbox for a confirmation link).
4. That's it — you don't need to add a domain or website. Workers run on a free
   `*.workers.dev` subdomain we'll get later.

---

## 4. Get your OpenAI API key + set a spend limit

> Skip the key creation if you already have one. **Do not skip the spend limit.**

1. Go to **https://platform.openai.com/api-keys** and click **Create new secret key**.
2. Copy the key (starts with `sk-...`). **You won't be able to see it again** —
   paste it somewhere safe for the next few steps.
3. **Set a hard monthly spend limit** (your safety net): go to
   **https://platform.openai.com/settings/organization/limits** and set a low
   monthly budget (e.g. **$5**). Even if something goes wrong, OpenAI stops
   charging past this cap.

---

## 5. Install Wrangler and log in

**Wrangler** is Cloudflare's command-line tool for Workers.

From the `worker/` folder:

```powershell
cd worker
npm install          # installs wrangler + the worker's dependencies
```

Then log in — this opens your browser to authorize Wrangler with your Cloudflare
account:

```powershell
npx wrangler login
```

A browser window opens; click **Allow**. When it says "Successfully logged in,"
return to the terminal. Verify it worked:

```powershell
npx wrangler whoami
```

You should see your Cloudflare account email and account ID.

---

## 6. Quick tour of the `worker/` folder

So you know what each file does:

| File | What it does |
|------|--------------|
| `worker/src/index.ts` | The entry point — receives chat requests, runs all the checks, calls OpenAI, returns the reply. |
| `worker/src/knowledge-base.ts` | Your résumé + LinkedIn info as text. **This is what the bot "knows."** |
| `worker/src/system-prompt.ts` | The bot's rules: stay on-topic about Jairo, refuse jailbreaks, etc. |
| `worker/src/rate-limit.ts` | Limits each visitor to 5 messages/minute and 40/day. |
| `worker/src/cors.ts` | Only lets *your* website call the Worker. |
| `worker/src/openai.ts` | Makes the actual call to OpenAI's `gpt-5-nano`. |
| `worker/wrangler.toml` | Worker configuration (name, KV binding, allowed origins). |
| `worker/.dev.vars` | Your OpenAI key for **local testing only** (never committed to git). |

You'll edit `knowledge-base.ts` whenever you want to update what the bot knows.

---

## 7. Create the rate-limit storage (KV namespace)

The Worker counts each visitor's messages using **Workers KV** (a simple
key-value store). Create one:

```powershell
npx wrangler kv namespace create RATE_LIMIT_KV
```

The command prints something like:

```
[[kv_namespaces]]
binding = "RATE_LIMIT_KV"
id = "abc123def456...."
```

**Copy that `id` value** and paste it into `worker/wrangler.toml`, replacing the
placeholder id in the `[[kv_namespaces]]` section. (The binding name
`RATE_LIMIT_KV` must stay exactly as-is — the code references it.)

---

## 8. Add your OpenAI key as a secret

This stores your key **encrypted on Cloudflare** — it never appears in your code
or in git:

```powershell
npx wrangler secret put OPENAI_API_KEY
```

It prompts `Enter a secret value:` — paste your `sk-...` key and press Enter.
You'll see "Success! Uploaded secret OPENAI_API_KEY."

> This is for the **deployed** Worker. For local testing (next step) you also put
> the key in `worker/.dev.vars`.

---

## 9. Run and test the Worker locally

For local testing, create the file `worker/.dev.vars` (it's gitignored) with:

```
OPENAI_API_KEY="sk-your-key-here"
```

Then start the Worker on your machine:

```powershell
npx wrangler dev
```

It starts a local server, usually at **http://127.0.0.1:8787**. Leave it running
and open a **second terminal** to test it.

**Health check** (should return `{"ok":true}`):

```powershell
curl http://127.0.0.1:8787/health
```

**Ask the bot a question:**

```powershell
curl -X POST http://127.0.0.1:8787/chat -H "Content-Type: application/json" -d '{\"messages\":[{\"role\":\"user\",\"content\":\"What does Jairo do?\"}]}'
```

You should get back a JSON `reply` grounded in your knowledge base. 🎉

> **PowerShell tip:** if the `curl` quoting above gives you trouble, use
> `Invoke-RestMethod` instead:
> ```powershell
> Invoke-RestMethod -Uri http://127.0.0.1:8787/chat -Method Post -ContentType "application/json" -Body '{"messages":[{"role":"user","content":"What does Jairo do?"}]}'
> ```

Stop the local server anytime with **Ctrl+C**.

---

## 10. Where to change the limits and allowed sites

You don't need to touch these to get started, but here's where they live:

- **Rate limits (5/min, 40/day):** `worker/src/rate-limit.ts` — change the number
  constants near the top.
- **Which websites may call the Worker (CORS):** `worker/wrangler.toml` under
  `[vars] ALLOWED_ORIGINS`, or `worker/src/cors.ts`. It's set to
  `https://jairocapua.github.io` (your live site) and `http://localhost:3000`
  (local dev). Add more origins here if you ever move the site.
- **Answer length / style:** `worker/src/openai.ts` — `max_output_tokens` and the
  `verbosity` setting.

After changing any of these, redeploy (Step 11).

---

## 11. Deploy the Worker to the internet

When local testing looks good, deploy:

```powershell
npx wrangler deploy
```

When it finishes, it prints your Worker's public URL, something like:

```
https://jairocapua-chatbot.<your-subdomain>.workers.dev
```

**Copy this URL** — your website needs it in the next step.

Quick check that it's live:

```powershell
curl https://jairocapua-chatbot.<your-subdomain>.workers.dev/health
```

> To update the Worker later (e.g. after editing the knowledge base), just run
> `npx wrangler deploy` again.

---

## 12. Connect your website to the Worker

Your site reads the Worker URL from an environment variable called
`NEXT_PUBLIC_CHAT_API_URL`. (This URL is **not** secret — it's fine to expose.)

### For local development (`npm run dev`)

In the **project root** (not the `worker/` folder), create/edit `.env.local`:

```
NEXT_PUBLIC_CHAT_API_URL=https://jairocapua-chatbot.<your-subdomain>.workers.dev
```

(Or `http://127.0.0.1:8787` if you want the site to talk to your *local* Worker.)

### For the live site (GitHub Pages)

The deployed site is built by GitHub Actions, so set the URL there:

1. On GitHub, go to your repo → **Settings** → **Secrets and variables** →
   **Actions** → the **Variables** tab.
2. Click **New repository variable**.
3. Name: `CHAT_API_URL` — Value: your `https://...workers.dev` URL. Save.
4. The deploy workflow (`.github/workflows/deploy.yml`) passes this into the build
   as `NEXT_PUBLIC_CHAT_API_URL`.
5. Trigger a rebuild: push any commit to `main`, or go to **Actions** → the deploy
   workflow → **Run workflow**.

> **If you skip this:** the site still works — the chat widget quietly falls back
> to the old built-in keyword responder instead of the AI. Nothing breaks.

---

## 13. Final end-to-end test

1. Open your live site: **https://jairocapua.github.io**
2. Open the chat widget (bottom-right) and send a message.
3. You should get an AI answer about Jairo.
4. Open browser **DevTools → Network**, send another message, and confirm:
   - the request goes to your `*.workers.dev` URL, and
   - your OpenAI key is **nowhere** in the request or the page source. ✅

---

## 14. Cost & safety checklist

- [ ] **OpenAI monthly spend limit** set (Step 4) — your hard backstop.
- [ ] **Rate limits** active (5/min, 40/day per visitor) — caps abuse.
- [ ] **Key is a Cloudflare secret** (Step 8), never in git or the browser.
- [ ] **CORS** locked to your site only (Step 10).
- [ ] `gpt-5-nano` is the cheapest GPT-5 model, and answers are capped short —
      realistically a few cents/month even with steady traffic.

---

## 15. Troubleshooting

| Symptom | Likely cause & fix |
|--------|--------------------|
| **CORS error** in the browser console | Your site's origin isn't in the allowlist. Add it in `worker/src/cors.ts` / `wrangler.toml` `ALLOWED_ORIGINS`, then `npx wrangler deploy`. |
| **429 "message limit"** | You hit the rate limit while testing. Wait a minute, or temporarily raise the numbers in `rate-limit.ts` and redeploy. |
| **401 from OpenAI** (in Worker logs) | Bad/expired key. Re-run `npx wrangler secret put OPENAI_API_KEY` (and fix `.dev.vars` for local). |
| **400 from OpenAI** about an unsupported param | `gpt-5-nano` rejects `temperature`/`max_tokens`/etc. The Worker code is built to avoid these — make sure `worker/src/openai.ts` wasn't edited to add them. |
| **`KV namespace not found`** | The `id` in `wrangler.toml` doesn't match. Re-run `npx wrangler kv namespace create RATE_LIMIT_KV` and paste the new id. |
| **`wrangler: command not found`** | Run from inside `worker/` after `npm install`, and use `npx wrangler ...`. |
| **Chat widget gives canned answers, not AI** | `CHAT_API_URL` isn't set (GitHub variable for prod, `.env.local` for dev), or the build hasn't re-run since you set it. |
| **`wrangler login` won't open a browser** | Run `npx wrangler login` again, or copy the printed URL into your browser manually. |

---

## 16. Command cheat sheet

```powershell
# all run from the worker/ folder
npm install                                   # one-time: install deps
npx wrangler login                            # one-time: connect Cloudflare
npx wrangler kv namespace create RATE_LIMIT_KV # one-time: make rate-limit store
npx wrangler secret put OPENAI_API_KEY        # set/update the OpenAI key
npx wrangler dev                              # run + test locally
npx wrangler deploy                           # publish to the internet
npx wrangler tail                             # watch live logs (great for debugging)
npx wrangler whoami                           # check who you're logged in as
```

---

You're done. The Worker is the only piece that ever sees your OpenAI key, and your
static site stays exactly as simple as it was — just smarter. 🚀
