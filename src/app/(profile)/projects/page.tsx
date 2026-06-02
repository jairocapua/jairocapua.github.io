import { Feed } from "@/components/profile/feed";
import { tabMetadata } from "@/lib/tab-metadata";

export const metadata = tabMetadata("projects");

export default function ProjectsPage() {
  return <Feed active="projects" />;
}
