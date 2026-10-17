import { LegacyRedirect, legacyRedirectMetadata } from "@/components/legacy-redirect";

// The old /projects/<category>/ pages. Automation case studies have their own
// section now; every other category lives under Projects.
const TARGETS: Record<string, string> = {
  "ai-web-apps": "/#projects",
  "ai-agents": "/#projects",
  "ai-projects": "/#projects",
  "ai-automation": "/#automations",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(TARGETS).map((category) => ({ category }));
}

export const metadata = legacyRedirectMetadata;

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  return <LegacyRedirect to={TARGETS[category]} />;
}
