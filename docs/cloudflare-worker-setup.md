# Cloudflare Worker Setup Guide

A beginner-friendly walkthrough of the **one-time** setup for the chatbot's backend.
Once it's done, the GitHub Action redeploys the Worker on every content change, and
you never run these steps again.

> **Heads up:** this guide assumes the `worker/` folder already exists. If it
> doesn't, the chatbot hasn't been built yet. Ask Claude to "build the chatbot
> from docs/rag-chatbot-plan.md" first.

---

## 1. What you're setting up

```
Your site (GitHub Pages) → Cloudflare Worker → Claude Haiku 5.5 (Anthropic)
                             ├ Workers AI: embeds the question
                             ├ bundled index: finds the 5 closest chunks
                             └ D1: rate limits + anonymous question log
```

A static site can't hold a secret, so the Anthropic API key lives only in the Worker.

**Cost:**
- Cloudflare Workers Free plan: $0. Stay on Free; the Paid plan has a $5/month minimum.
- Anthropic: about $0.00035 per answer, capped by the $5 spend limit set in step 3.

## 2. Prerequisites

- [ ] Node.js 20+ (`node -v`)
- [ ] A free Cloudflare account: https://dash.cloudflare.com/sign-up (no card needed)
- [ ] An Anthropic Console account: https://platform.claude.com

## 3. Anthropic API key and spend limit

1. Console → **API keys** → **Create key**. Copy it (it starts with `sk-ant-`); you only see it once.
2. Console → **Billing → Spend limits → Set limit** → **$5**. Once the limit is
   reached, requests fail until next month. That's your hard backstop.
   **Don't skip this.**

## 4. Log in to Cloudflare

From the `worker/` folder:

```bash
npm install
```

```bash
npx wrangler login
```

```bash
npx wrangler whoami
```

`whoami` prints your account email and **Account ID**. Copy the ID; you need it in step 8.

## 5. Create the D1 database

D1 stores the rate-limit counters and the anonymous question log.

```bash
npx wrangler d1 create portfolio-chat
```

The command prints a `database_id`. Paste it into `worker/wrangler.jsonc` under
`d1_databases` (leave the binding name as `CHAT_DB`). Then create the tables:

```bash
npx wrangler d1 migrations apply CHAT_DB --remote
```

## 6. Add the Worker's secrets

```bash
npx wrangler secret put ANTHROPIC_API_KEY
```

```bash
npx wrangler secret put IP_HASH_SALT
```

- For `ANTHROPIC_API_KEY`, paste the key from step 3.
- For `IP_HASH_SALT`, paste any long random string, such as a password-manager
  generated one. It lets the Worker count visitors without ever storing their IP.

For local testing, also create `worker/.dev.vars` (gitignored):

```
ANTHROPIC_API_KEY="sk-ant-..."
IP_HASH_SALT="any-long-random-string"
```

## 7. Create a Cloudflare API token

The GitHub Action and the local index build both need this token.

1. Cloudflare dashboard → **My Profile → API Tokens → Create Token → Create Custom Token**.
2. Add these permissions (account level): **Workers Scripts: Edit**,
   **Workers AI: Read**, **D1: Edit**. The exact names can differ slightly in the UI.
3. Under **Account Resources**, pick your account only. Create it and copy the token.

## 8. Build the index and run locally

From the **repo root**, set the variables for this terminal and build the index.

In PowerShell:

```powershell
$env:CLOUDFLARE_ACCOUNT_ID = "<account id>"; $env:CLOUDFLARE_API_TOKEN = "<token>"; npm run chat:index
```

In bash:

```bash
CLOUDFLARE_ACCOUNT_ID=<account id> CLOUDFLARE_API_TOKEN=<token> npm run chat:index
```

This writes `worker/src/generated/index.json`. Then, from `worker/`:

```bash
npx wrangler dev
```

The Worker runs at http://127.0.0.1:8787. Workers AI calls still go to Cloudflare
even in dev, which is why you logged in. In a second terminal:

```bash
curl http://127.0.0.1:8787/health
```

```bash
curl -N -X POST http://127.0.0.1:8787/chat -H "Origin: http://localhost:3000" -H "Content-Type: application/json" -d "{\"messages\":[{\"role\":\"user\",\"content\":\"What does Jairo do?\"}]}"
```

You should see `event: sources`, then a stream of `event: delta` lines, then `event: done`.
The `Origin` header matters: the Worker refuses `/chat` calls from origins outside `ALLOWED_ORIGINS`.
Also run the test set:

```bash
npm run eval
```

## 9. First deploy

From `worker/`:

```bash
npx wrangler deploy
```

It prints a URL like `https://portfolio-chat.<your-subdomain>.workers.dev`. Copy it.

## 10. Wire up GitHub

On GitHub, go to the repo → **Settings → Secrets and variables → Actions**.

- **Secrets** tab, three new repository secrets:
  - `CLOUDFLARE_API_TOKEN`: the token from step 7
  - `CLOUDFLARE_ACCOUNT_ID`: from step 4
  - `ANTHROPIC_API_KEY`: used only by the eval in CI
- **Variables** tab, one new repository variable:
  - `CHAT_API_URL`: the `workers.dev` URL from step 9

Then push to `main`, or run both workflows by hand from the **Actions** tab:

- **Deploy Next.js site to Pages** rebuilds the site with the chat turned on.
- **Chatbot** rebuilds the index, runs the eval and redeploys the Worker. From now
  on it runs by itself whenever `src/data/**` or `worker/**` changes.

For local site development, put this in a root `.env.local`:

```
NEXT_PUBLIC_CHAT_API_URL=http://127.0.0.1:8787
```

> **If `CHAT_API_URL` is unset**, the site builds normally and the chat entry
> points (hero prompt, dock icon, Clawd) simply don't appear.

## 11. End-to-end check

1. Open https://jairocapua.github.io and click **Ask my AI about me →**.
2. The answer should stream in, with source chips that scroll to the right section.
3. DevTools → Network: the request goes to `workers.dev`, and no `sk-ant-` string
   appears anywhere in the page or the request.
4. Check that logging works:

   ```bash
   npx wrangler d1 execute CHAT_DB --remote --command "SELECT ts, question FROM questions ORDER BY ts DESC LIMIT 5"
   ```

## 12. Where the knobs live

| Knob | File |
|---|---|
| Per-visitor and global limits (5/min, 40/day, 300/day) | `worker/src/limits.ts` |
| Allowed sites (CORS) | `worker/wrangler.jsonc` → `vars.ALLOWED_ORIGINS` |
| Bot rules and tone | `worker/src/prompt.ts` |
| Answer length / model | `worker/src/claude.ts` |
| FAQ answers | `src/data/chat-faq.ts` |
| Test cases | `worker/eval/cases.json` |

## 13. Troubleshooting

| Symptom | Fix |
|---|---|
| CORS error in the browser | The site's origin is missing from `ALLOWED_ORIGINS`. Add it and redeploy |
| 429 while testing | You hit 5/min. Wait a minute, or raise it temporarily in `limits.ts` |
| "Resting for today" message | The global 300/day cap was reached. Check D1 for a spam burst |
| `error` event and a 401 in `npx wrangler tail` | Bad Anthropic key. Run `wrangler secret put ANTHROPIC_API_KEY` again |
| 400 "usage limits" from Anthropic | The $5 spend limit was reached. Raise it in the Console or wait for the month to reset |
| `chat:index` fails with 403 | The API token lacks Workers AI permission or has the wrong account ID |
| Eval fails in CI | Read the failing case in the Action log. Usually the content changed (update `cases.json`) or the prompt drifted |
| No chat button on the live site | `CHAT_API_URL` isn't set, or the site hasn't been rebuilt since you set it |

## 14. Command cheat sheet (from `worker/`)

```bash
npx wrangler dev
```

```bash
npx wrangler deploy
```

```bash
npx wrangler tail
```

```bash
npm run eval
```
