// Generates the static social-share card at src/app/opengraph-image.png
// (and twitter-image.png). Next.js auto-detects the opengraph-image file
// convention and emits the correct <meta og:image> / <meta twitter:image>
// tags with dimensions. Rendered with resvg so the embedded Inter font is
// honored regardless of the host's installed fonts.
// Run with: node scripts/gen-og.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { Resvg } from "@resvg/resvg-js";

const root = process.cwd();
const interBuffer = readFileSync(join(root, "src/app/og/Inter.ttf"));

const NAME = "Jairo Capua";
const ROLE = "AI Engineer";
const URL = "jairocapua.github.io";
const TAGLINE = [
  "Building smart systems, web apps, and AI-powered",
  "automation that help businesses scale.",
];
const TAGS = ["Next.js", "React", "TypeScript", "Node.js", "Python", "OpenAI", "Claude", "Automation"];

// Lay out pill chips left-to-right, wrapping as needed.
const pills = [];
let x = 80;
let y = 500;
const charW = 14.5; // approx advance per char at 26px Inter
for (const t of TAGS) {
  const w = Math.round(t.length * charW + 44);
  if (x + w > 1120) {
    x = 80;
    y += 62;
  }
  pills.push(`
    <rect x="${x}" y="${y}" rx="24" ry="24" width="${w}" height="48"
          fill="#26282b" stroke="#3a3b3d" stroke-width="1"/>
    <text x="${x + w / 2}" y="${y + 31}" font-family="Inter" font-size="26" font-weight="500"
          fill="#e4e6eb" text-anchor="middle">${t}</text>`);
  x += w + 14;
}

const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="g1" cx="18%" cy="20%" r="55%">
      <stop offset="0%" stop-color="#0866ff" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#0866ff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="88%" cy="92%" r="55%">
      <stop offset="0%" stop-color="#0866ff" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#0866ff" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#18191a"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>

  <circle cx="87" cy="80" r="8" fill="#0866ff"/>
  <text x="108" y="90" font-family="Inter" font-size="30" font-weight="500" fill="#b0b3b8" letter-spacing="1">${URL}</text>

  <text x="78" y="288" font-family="Inter" font-size="96" font-weight="700" fill="#e4e6eb">${NAME}</text>
  <text x="80" y="356" font-family="Inter" font-size="44" font-weight="700" fill="#0a84ff">${ROLE}</text>
  <text x="80" y="416" font-family="Inter" font-size="30" font-weight="400" fill="#b0b3b8">${TAGLINE[0]}</text>
  <text x="80" y="456" font-family="Inter" font-size="30" font-weight="400" fill="#b0b3b8">${TAGLINE[1]}</text>

  ${pills.join("\n")}
</svg>`;

const resvg = new Resvg(svg, {
  font: { fontBuffers: [interBuffer], defaultFontFamily: "Inter", loadSystemFonts: false },
  background: "#18191a",
});
const png = resvg.render().asPng();

writeFileSync(join(root, "src/app/opengraph-image.png"), png);
writeFileSync(join(root, "src/app/twitter-image.png"), png);
console.log("Generated opengraph-image.png + twitter-image.png");
