# Exporting Your LinkedIn Data for the Chatbot

This guide shows you how to pull your own LinkedIn information so it can be turned
into the chatbot's **knowledge base** — the text the AI uses to answer questions
about you.

> **Why this matters:** Your résumé (`src/data/resume.ts`) is a great start, but
> LinkedIn usually has richer detail — full role descriptions, dates,
> accomplishments, recommendations, and projects. The more accurate the knowledge
> base, the better and more truthful the bot's answers. The bot only knows what's
> in the knowledge base — it does **not** browse LinkedIn live.

> **This is 100% legitimate and ToS-safe** because you're exporting *your own*
> profile through LinkedIn's official tools. (We deliberately avoid automated
> scraping, which violates LinkedIn's terms and gets IP-blocked.)

---

## Two ways to get your data

You can do **either or both**. For the best result, do both: the PDF is instant
and human-readable; the data archive is complete and structured.

| Method | Speed | Best for |
|--------|-------|----------|
| **A. Save profile to PDF** | Instant | A quick, readable snapshot of your whole profile |
| **B. Request data archive** | Up to ~24h | Complete, structured CSVs (positions, skills, recommendations, etc.) |

---

## Method A — Save your profile as a PDF (instant)

1. Go to your own LinkedIn profile: **https://www.linkedin.com/in/jairocapua**
2. Click the **More** button (just under your profile headline/photo, next to
   "Open to" / "Add profile section").
3. Choose **Save to PDF**.
4. LinkedIn generates and downloads a PDF of your full profile — experience,
   education, skills, certifications, etc.

That's it. Keep this PDF; you'll hand it over in the last step.

---

## Method B — Request your full data archive (complete + structured)

This gives you LinkedIn's official export as a set of CSV files.

1. Click your **Me** photo (top-right) → **Settings & Privacy**.
2. In the left menu, go to **Data Privacy**.
3. Click **Get a copy of your data**.
4. Choose **"Want something in particular? Select the data files you're most
   interested in."** and tick the relevant boxes (see the list below), **or** just
   select **"The works"** to get everything (simplest).
5. Click **Request archive** and confirm your password if asked.
6. LinkedIn emails you when it's ready. The first, smaller batch often arrives in
   ~10 minutes; the complete archive can take **up to 24 hours**.
7. When the email arrives, click the link and **Download** the `.zip` file.
8. Unzip it — inside you'll find a folder of `.csv` files.

---

## Which files from the archive actually matter

The archive has many files. For the chatbot, only these are useful — the rest
(connections, messages, ad data, etc.) you can **ignore**:

| File | What's in it |
|------|--------------|
| `Profile.csv` | Your headline, summary/about, location, industry |
| `Positions.csv` | **Most important** — every job: title, company, dates, and the full description |
| `Education.csv` | Schools, degrees, fields of study, dates |
| `Skills.csv` | Your listed skills |
| `Certifications.csv` | Certifications, issuers, dates |
| `Projects.csv` | Projects with descriptions (helps replace the placeholder projects) |
| `Recommendations_Received.csv` | Testimonials people wrote for you |
| `Honors_and_Awards.csv` | Awards, hackathon placements, recognitions |
| `Languages.csv` *(optional)* | Languages you speak |
| `Volunteering.csv` *(optional)* | Volunteer work, if relevant |

> ⚠️ **Privacy note:** The knowledge base gets bundled into the public Worker, so
> treat it as public. **Only include professional info.** Do **not** include
> `Connections.csv`, `messages.csv`, contacts, phone numbers, or anything private —
> those should never go into the chatbot.

---

## How to hand it over

Once you have the files, give them to me (Claude) in whichever way is easiest:

- **Easiest:** drag the **PDF** and the relevant **CSV files** into a folder in
  this project (e.g. create `linkedin-export/` at the repo root) and tell me
  it's there. *(That folder is just a drop-box — we won't commit it; see note
  below.)*
- **Or:** open the PDF / CSVs and **paste the key text** (your About section, each
  job's description, recommendations, awards) directly into the chat.
- **Or:** just point me at the files and I'll read them.

I'll then curate everything by hand into `worker/src/knowledge-base.ts`, merging
it with what's already in `src/data/resume.ts` and removing anything private.

> **Keep the raw export out of git:** the raw PDF/CSV dump shouldn't be committed.
> If you drop it in `linkedin-export/`, I'll add that folder to `.gitignore` —
> only the curated, reviewed `knowledge-base.ts` gets committed.

---

## Quick checklist

- [ ] Saved profile to **PDF** (Method A), **and/or** requested the **data archive** (Method B)
- [ ] Downloaded + unzipped the archive (if you did Method B)
- [ ] Pulled out the **useful files** (Positions, Education, Skills, Certifications, Projects, Recommendations, Honors)
- [ ] **Excluded** anything private (connections, messages, contacts)
- [ ] Handed the files/text over to Claude

---

## What happens next

1. I read your export and draft `worker/src/knowledge-base.ts`.
2. I'll also fill in the **real project details** (your `resume.ts` currently has
   placeholder projects) so the bot can talk about your actual work.
3. You review the draft for accuracy and privacy.
4. We deploy/redeploy the Worker (see
   [CLOUDFLARE_WORKER_SETUP.md](CLOUDFLARE_WORKER_SETUP.md)) and the bot starts
   answering from your real background.

That's all you need from LinkedIn. 🎯
