import { Feed } from "@/components/profile/feed";
import { tabMetadata } from "@/lib/tab-metadata";

export const metadata = tabMetadata("hackathons");

export default function HackathonsPage() {
  return <Feed active="hackathons" />;
}
