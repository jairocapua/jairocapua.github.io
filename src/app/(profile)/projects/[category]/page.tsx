import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CategoryFeed } from "@/components/profile/category-feed";
import { categoryMetadata } from "@/lib/tab-metadata";
import {
  PROJECT_CATEGORIES,
  isProjectCategorySlug,
} from "@/lib/project-categories";

export function generateStaticParams() {
  return PROJECT_CATEGORIES.map((c) => ({ category: c.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { category: string };
}): Metadata {
  if (!isProjectCategorySlug(params.category)) return {};
  return categoryMetadata(params.category);
}

export default function ProjectCategoryPage({
  params,
}: {
  params: { category: string };
}) {
  if (!isProjectCategorySlug(params.category)) notFound();
  return <CategoryFeed slug={params.category} />;
}
