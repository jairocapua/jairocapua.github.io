import { Feed } from "@/components/profile/feed";
import { tabMetadata } from "@/lib/tab-metadata";

export const metadata = tabMetadata("about");

export default function AboutPage() {
  return <Feed active="about" />;
}
