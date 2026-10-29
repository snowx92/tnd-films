"use client";

import Link from "next/link";
import { useRef } from "react";
import { featuredProjects } from "@/data/projects";
import { site } from "@/data/site";
import { Reveal } from "@/components/reveal";
import { WorkTile } from "@/components/work-tile";

export function FeaturedWork() {
  const [lead, ...shelf] = featuredProjects;
  const shelfRef = useRef<HTMLDivElement>(null);

  const nudge = (direction: 1 | -1) => {
    const el = shelfRef.current;
    if (!el) {
      return;
    }
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id="work" className="py-16 md:py-24">
      <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4 px-5 md:px-8">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-mute uppercase">On the shelf</p>
          <h2 className="font-display mt-2 text-5xl tracking-tight uppercase md:text-8xl">
            Latest work
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={site.archive}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] tracking-[0.2em] text-mute uppercase hover:text-signal"
          >
            Full archive ↗
          </a>
          <Link
            href="/work"
            className="rounded-full border border-ink/25 px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-signal hover:bg-signal"
          >
            View all
          </Link>
        </div>
      </Reveal>

      {lead ? (
        <Reveal className="px-5 md:px-8">
          <WorkTile project={lead} shape="wide" />
        </Reveal>
      ) : null}

      <div className="mt-4 flex items-center justify-between px-5 md:px-8">
        <p className="text-[10px] tracking-[0.22em] text-mute uppercase">
          Drag or scroll the shelf →
        </p>
        <div className="flex gap-2">
          {([-1, 1] as const).map((direction) => (
            <button
              key={direction}
              type="button"
              onClick={() => nudge(direction)}
              aria-label={direction === 1 ? "Next projects" : "Previous projects"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/20 transition-colors hover:border-signal hover:text-signal"
            >
              {direction === 1 ? "→" : "←"}
            </button>
          ))}
        </div>
      </div>
      <div
        ref={shelfRef}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-4 [scrollbar-width:none] md:scroll-px-8 md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {shelf.map((project, index) => (
          <div
            key={project.slug}
            className="w-[78vw] shrink-0 snap-start sm:w-[44vw] lg:w-[28vw]"
          >
            <WorkTile project={project} index={index + 1} />
          </div>
        ))}
        <Link
          href="/work"
          className="group flex w-[60vw] shrink-0 snap-start flex-col justify-between rounded-sm border border-ink/15 p-6 transition-colors hover:border-signal sm:w-[30vw] lg:w-[20vw]"
        >
          <span className="text-[10px] tracking-[0.22em] text-mute uppercase">
            And more
          </span>
          <span className="font-display text-5xl leading-[0.9] tracking-tight uppercase group-hover:text-signal">
            View all
            <br />
            work →
          </span>
        </Link>
      </div>
    </section>
  );
}
