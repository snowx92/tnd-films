import type { Metadata } from "next";
import { WorkIndex } from "@/components/work-index";
import { projects } from "@/data/projects";
import type { Vertical } from "@/lib/types";

export const metadata: Metadata = {
  title: "Work",
};

type WorkPageProps = {
  searchParams: Promise<{ v?: string }>;
};

function parseFilter(value?: string): "all" | Vertical {
  switch (value) {
    case "ecommerce":
    case "automotive":
      return value;
    default:
      return "all";
  }
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const params = await searchParams;

  return (
    <WorkIndex projects={projects} initialFilter={parseFilter(params.v)} />
  );
}
