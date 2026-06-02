import { Feed } from "@/components/profile/feed";
import { tabMetadata } from "@/lib/tab-metadata";

export const metadata = tabMetadata("experience");

export default function ExperiencePage() {
  return <Feed active="experience" />;
}
