import { notFound } from "next/navigation";
import { ProjectStudio } from "@/components/project-studio";
import { getNextProject, getProject, projects } from "@/data/projects";

type StudioPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: StudioPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return { title: "Studio" };
  }
  return {
    title: `${project.title} studio`,
    description: project.logline,
  };
}

export default async function StudioPage({ params }: StudioPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectStudio project={project} nextProject={getNextProject(slug)} />;
}
