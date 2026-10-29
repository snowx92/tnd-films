import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { verticals } from "@/data/site";
import { Handwritten } from "@/components/handwritten";
import { ProcessSection } from "@/components/process-section";
import { Reveal } from "@/components/reveal";
import { ShootIndex } from "@/components/shoot-index";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Creative development, pre-production, production and post for fashion, automotive, F&B, music and events.",
};

export default function ServicesPage() {
  return (
    <div className="pt-28 md:pt-36">
      <section className="px-5 md:px-8">
        <p className="text-[11px] tracking-[0.28em] text-mute uppercase">Services</p>
        <h1 className="font-display mt-3 text-[clamp(4rem,13vw,11rem)] leading-[0.8] tracking-tight uppercase">
          What we
          <br />
          cover.
        </h1>
        <Handwritten className="mt-4 block text-5xl">the work</Handwritten>
      </section>

      <ProcessSection />
      <ShootIndex />

      <section className="px-5 pb-24 md:px-8">
        <Reveal>
          <p className="text-[11px] tracking-[0.28em] text-mute uppercase">By vertical</p>
          <h2 className="font-display mt-2 text-5xl tracking-tight uppercase md:text-7xl">
            Treatments, sets, finals
          </h2>
          <p className="mt-4 max-w-xl text-mute">
            Each vertical gets its own playbook. Here is what came off set — tap
            through to every project and its full folder.
          </p>
        </Reveal>
        <div className="mt-12 flex flex-col gap-16">
          {verticals.map((vertical) => {
            const work = projects.filter((project) => project.category === vertical.id);
            const strip = work.flatMap((project) =>
              project.stills.slice(0, 2).map((still) => ({ still, project })),
            ).slice(0, 6);
            return (
              <Reveal key={vertical.id}>
                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-ink/10 pt-6">
                  <div>
                    <h3 className="font-display text-4xl tracking-tight uppercase md:text-6xl">
                      {vertical.title}
                    </h3>
                    <p className="mt-2 max-w-md text-mute">{vertical.copy}</p>
                  </div>
                  <Link
                    href={`/work?c=${vertical.id}`}
                    className="rounded-full border border-ink/25 px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-signal hover:bg-signal"
                  >
                    {work.length} project{work.length === 1 ? "" : "s"} →
                  </Link>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2 md:grid-cols-6">
                  {strip.map(({ still, project }) => (
                    <Link
                      key={still.src}
                      href={`/work/${project.slug}`}
                      data-cursor="View"
                      className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-canvas-raised"
                    >
                      <Image
                        src={still.src}
                        alt={`${project.title} still`}
                        fill
                        sizes="(min-width: 768px) 16vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute inset-x-0 bottom-0 bg-linear-to-t from-canvas/90 to-transparent p-2 text-[9px] tracking-[0.16em] uppercase opacity-0 transition-opacity group-hover:opacity-100">
                        {project.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </div>
  );
}
