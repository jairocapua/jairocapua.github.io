import type { Metadata } from "next";
import { Feed } from "@/components/profile/feed";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return <Feed active="all" />;
}
