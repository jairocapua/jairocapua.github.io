import { Feed } from "@/components/profile/feed";
import { tabMetadata } from "@/lib/tab-metadata";

export const metadata = tabMetadata("post");

export default function PostPage() {
  return <Feed active="all" />;
}
