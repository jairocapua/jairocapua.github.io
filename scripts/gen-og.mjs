// Generates the static social-share card at src/app/opengraph-image.png
// (and twitter-image.png). Next.js auto-detects the opengraph-image file
// convention and emits the correct <meta og:image> / <meta twitter:image>
// tags with dimensions. The layout follows the Magic UI portfolio template's
// card: a soft gray panel with the avatar top-left and the name + tagline
// bottom-left. Rendered with resvg using Geist from the `geist` package, so
// the output doesn't depend on the host's installed fonts.
// Run with: node scripts/gen-og.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const root = process.cwd();
const fontDir = join(root, "node_modules/geist/dist/fonts/geist-sans");
// The Node build of resvg-js takes font *paths* (fontBuffers is WASM-only and
// is silently ignored here).
const fontFiles = ["Geist-Regular.ttf", "Geist-SemiBold.ttf"].map((f) =>
  join(fontDir, f)
);

// Keep in sync with DATA.name / DATA.description / DATA.avatarUrl in
// src/data/resume.ts.
const NAME = "Jairo Capua";
const DESCRIPTION =
  "AI Software Engineer. I build smart systems, web apps, and AI-powered workflows that help businesses automate operations, save time, and scale faster";
const AVATAR = join(root, "public/jairo-pfp.jpg");

const W = 1200;
const H = 630;
const PAD = 40; // white frame around the panel, and the panel's own padding

/** Greedy word wrap by character budget (Geist at 28px ≈ 14.5px per char). */
function wrap(text, maxChars) {
  const lines = [];
  let line = "";
  for (const word of text.split(" ")) {
    if (line && (line + " " + word).length > maxChars) {
      lines.push(line);
      line = word;
    } else {
      line = line ? `${line} ${word}` : word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const avatar = `data:image/jpeg;base64,${readFileSync(AVATAR).toString("base64")}`;
const descLines = wrap(DESCRIPTION, 62);

// Text is laid out bottom-up from the panel's inner bottom edge.
const panel = { x: PAD, y: PAD, w: W - PAD * 2, h: H - PAD * 2 };
const left = panel.x + PAD;
const descLineHeight = 42;
const descBottom = panel.y + panel.h - PAD - 8;
const descTop = descBottom - (descLines.length - 1) * descLineHeight;
const titleBaseline = descTop - 58;

const avatarSize = 140;
const avatarX = panel.x + PAD;
const avatarY = panel.y + PAD;

const svg = `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="avatar-clip">
      <rect x="${avatarX}" y="${avatarY}" width="${avatarSize}" height="${avatarSize}" rx="24" ry="24"/>
    </clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="#ffffff"/>
  <rect x="${panel.x + 0.5}" y="${panel.y + 0.5}" width="${panel.w - 1}" height="${panel.h - 1}" rx="12" ry="12"
        fill="#fafafa" stroke="#e5e5e5" stroke-width="1"/>

  <image href="${avatar}" x="${avatarX}" y="${avatarY}" width="${avatarSize}" height="${avatarSize}"
         preserveAspectRatio="xMidYMid slice" clip-path="url(#avatar-clip)"/>
  <rect x="${avatarX}" y="${avatarY}" width="${avatarSize}" height="${avatarSize}" rx="24" ry="24"
        fill="none" stroke="#e5e5e5" stroke-width="4"/>

  <text x="${left}" y="${titleBaseline}" font-family="Geist" font-size="64" font-weight="600"
        letter-spacing="-1.3" fill="#000000">${escape(NAME)}</text>
  ${descLines
    .map(
      (line, i) =>
        `<text x="${left}" y="${descTop + i * descLineHeight}" font-family="Geist" font-size="28" font-weight="400" fill="#404040">${escape(line)}</text>`
    )
    .join("\n  ")}
</svg>`;

const resvg = new Resvg(svg, {
  font: { fontFiles, defaultFontFamily: "Geist", loadSystemFonts: false },
  background: "#ffffff",
});
const png = resvg.render().asPng();

writeFileSync(join(root, "src/app/opengraph-image.png"), png);
writeFileSync(join(root, "src/app/twitter-image.png"), png);
console.log("Generated opengraph-image.png + twitter-image.png");
