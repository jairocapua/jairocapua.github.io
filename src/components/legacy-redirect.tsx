import type { Metadata } from "next";

// The previous (Facebook-profile) design had one page per tab: /about/,
// /experience/, /projects/<category>/, … Those URLs were in its sitemap and
// may be linked from elsewhere, so each still exists as a tiny page that
// forwards to the matching section of the new single page. A meta refresh
// works on GitHub Pages without any JavaScript.

export const legacyRedirectMetadata: Metadata = {
  robots: { index: false, follow: true },
};

export function LegacyRedirect({ to }: { to: string }) {
  return (
    <>
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <p className="text-muted-foreground">
        This page has moved.{" "}
        <a href={to} className="text-foreground underline underline-offset-4">
          Continue to the new page
        </a>
        .
      </p>
    </>
  );
}
