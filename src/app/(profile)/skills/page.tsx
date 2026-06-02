import { Feed } from "@/components/profile/feed";
import { tabMetadata } from "@/lib/tab-metadata";

export const metadata = tabMetadata("skills");

export default function SkillsPage() {
  return <Feed active="skills" />;
}
