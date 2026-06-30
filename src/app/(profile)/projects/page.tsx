import { ProjectCategories } from "@/components/profile/project-categories";
import { tabMetadata } from "@/lib/tab-metadata";

export const metadata = tabMetadata("projects");

export default function ProjectsPage() {
  return <ProjectCategories />;
}
