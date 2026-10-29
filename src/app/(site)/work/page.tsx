import type { Metadata } from "next";
import { WorkIndex } from "@/components/work-index";
import { projects } from "@/data/projects";
import { isCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Fashion, automotive, F&B, events and music videos by TND Films. Every project, sorted by what moves.",
};

type WorkPageProps = {
  searchParams: Promise<{ c?: string }>;
};

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const { c } = await searchParams;

  return <WorkIndex projects={projects} initialFilter={isCategory(c) ? c : "all"} />;
}
