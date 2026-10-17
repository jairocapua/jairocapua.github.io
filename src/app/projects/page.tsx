import { LegacyRedirect, legacyRedirectMetadata } from "@/components/legacy-redirect";

export const metadata = legacyRedirectMetadata;

export default function Page() {
  return <LegacyRedirect to="/#projects" />;
}
