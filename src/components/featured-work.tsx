import Link from "next/link";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/reveal";
import { WorkTile } from "@/components/work-tile";

export function FeaturedWork() {
  const featured = projects.slice(0, 4);

  return (
    <section id="work" className="px-5 py-10 md:px-8">
      <Reveal className="mb-8 flex items-end justify-between">
        <h2 className="font-display text-5xl tracking-tight uppercase md:text-7xl">
          Latest work
        </h2>
        <Link
          href="/work"
          className="text-[11px] tracking-[0.2em] text-mute uppercase hover:text-signal"
        >
          View all
        </Link>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-2">
        {featured.map((project, index) => (
          <div
            key={project.slug}
            className={index === 0 ? "md:col-span-2" : undefined}
          >
            <WorkTile project={project} featured={index === 0} />
          </div>
        ))}
      </div>
    </section>
  );
}
