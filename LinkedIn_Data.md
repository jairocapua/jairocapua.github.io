# LinkedIn Data

<!--
Source:      https://www.linkedin.com/in/jairocapua/
Attempted:   2026-06-03
Tool:        Firecrawl scrape API (tried v2 and v1)
Result:      BLOCKED — no data captured
HTTP status: 403 Forbidden
-->

> ⚠️ **The Firecrawl scrape did not return any profile data.**

## What happened

I attempted to scrape `https://www.linkedin.com/in/jairocapua/` with the Firecrawl
scrape API (both the `v2` and `v1` endpoints, with `proxy: auto` and a render wait).
Both calls returned **HTTP 403 Forbidden** with this exact message from Firecrawl:

```json
{
  "success": false,
  "error": "We apologize for the inconvenience but we do not support this site. If you are part of an enterprise and want to have a further conversation about this, please fill out our intake form here: https://fk4bvu0n5qp.typeform.com/to/Ej6oydlg"
}
```

This is **not** a temporary rate-limit or an authwall we can wait out — **Firecrawl
policy-blocks LinkedIn entirely.** LinkedIn is on their list of unsupported sites
(LinkedIn aggressively blocks automated scraping and pursues it legally, so Firecrawl
refuses these URLs outright). Changing proxy mode, wait time, or retrying will not help.

## Recommended way to get this data (official, complete, ToS-safe)

Use LinkedIn's own export tools — this is exactly what
[LINKEDIN_EXPORT.md](LINKEDIN_EXPORT.md) already documents:

- **Method A — Save to PDF (instant):** open your profile → **More** → **Save to PDF**.
- **Method B — Data archive (complete, structured):** Settings & Privacy → Data Privacy →
  *Get a copy of your data* → "The works". Arrives by email (first batch ~10 min, full
  archive up to ~24h) as CSVs (`Positions.csv`, `Education.csv`, `Skills.csv`, etc.).

Drop the PDF / relevant CSVs into the repo (or paste the text), and the data can replace
this file or be curated into the chatbot knowledge base / `src/data/resume.ts`.

_No profile content was captured by the scrape, so there is nothing below this line yet._
