import { DATA } from "@/data/resume";

/**
 * Injects schema.org JSON-LD so search engines can build a rich
 * understanding of the person behind the portfolio (knowledge panel,
 * sitelinks, rich results). Rendered server-side into the static HTML.
 */
export function StructuredData() {
  const social = DATA.contact.social;

  const sameAs = [
    social.GitHub.url,
    social.LinkedIn.url,
    social.X.navbar ? social.X.url : null,
    social.YouTube.navbar ? social.YouTube.url : null,
  ].filter((u): u is string => Boolean(u) && !u!.includes("youtube.com/@your-handle") && u !== "https://x.com");

  const person = {
    "@type": "Person",
    "@id": `${DATA.url}/#person`,
    name: DATA.name,
    alternateName: DATA.username,
    url: DATA.url,
    image: `${DATA.url}${DATA.avatarUrl}`,
    jobTitle: DATA.role,
    description: DATA.description,
    email: `mailto:${DATA.contact.email}`,
    sameAs,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Batangas",
      addressCountry: "PH",
    },
    knowsAbout: [...DATA.skills],
    knowsLanguage: ["English", "Filipino"],
    alumniOf: DATA.education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.school,
    })),
    worksFor: DATA.work
      .filter((w) => w.end === "Present")
      .map((w) => ({ "@type": "Organization", name: w.company, url: w.href })),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${DATA.url}/#website`,
    url: DATA.url,
    name: `${DATA.name} — ${DATA.role}`,
    description: DATA.description,
    inLanguage: "en-US",
    author: { "@id": `${DATA.url}/#person` },
    publisher: { "@id": `${DATA.url}/#person` },
  };

  const profilePage = {
    "@type": "ProfilePage",
    "@id": `${DATA.url}/#profilepage`,
    url: DATA.url,
    name: `${DATA.name} — ${DATA.role}`,
    isPartOf: { "@id": `${DATA.url}/#website` },
    about: { "@id": `${DATA.url}/#person` },
    mainEntity: { "@id": `${DATA.url}/#person` },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [person, website, profilePage],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
