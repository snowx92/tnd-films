"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Category, Project } from "@/lib/types";
import { categories, categoryLabel } from "@/lib/types";
import { site } from "@/data/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Handwritten } from "@/components/handwritten";
import { WorkTile } from "@/components/work-tile";
import { cn } from "@/lib/utils";

type Filter = "all" | Category;

type WorkIndexProps = {
  projects: Project[];
  initialFilter?: Filter;
};

function filterLabel(filter: Filter): string {
  return filter === "all" ? "All" : categoryLabel(filter);
}

/** Every 7th tile spans two columns so the grid keeps a rhythm. */
function shapeFor(index: number): "wide" | "tall" {
  return index % 7 === 0 ? "wide" : "tall";
}

export function WorkIndex({ projects, initialFilter = "all" }: WorkIndexProps) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const gridRef = useRef<HTMLDivElement>(null);

  const filters = useMemo<Filter[]>(
    () => ["all", ...categories.filter((item) => projects.some((project) => project.category === item))],
    [projects],
  );

  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.category === filter)),
    [filter, projects],
  );

  const select = (next: Filter) => {
    setFilter(next);
    const url = next === "all" ? "/work" : `/work?c=${next}`;
    window.history.replaceState(null, "", url);
  };

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-work-tile]",
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: "power4.out" },
      );
    }, grid);

    return () => ctx.revert();
  }, [visible]);

  return (
    <div className="px-5 pt-28 pb-24 md:px-8 md:pt-36">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-[11px] tracking-[0.28em] text-mute uppercase">
            Portfolio · {projects.length} projects
          </p>
          <h1 className="font-display mt-3 text-[clamp(4rem,13vw,11rem)] leading-[0.8] tracking-tight uppercase">
            The reel
          </h1>
          <Handwritten className="mt-3 block text-4xl md:text-5xl">sorted by what moves</Handwritten>
        </div>
        <a
          href={site.archive}
          target="_blank"
          rel="noreferrer"
          className="group flex items-center gap-3 rounded-full border border-ink/25 px-5 py-3 text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-signal hover:bg-signal"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal group-hover:bg-ink" />
          Full archive on Google Drive ↗
        </a>
      </div>

      <div
        role="tablist"
        aria-label="Filter work by category"
        className="sticky top-16 z-30 -mx-5 mt-10 flex gap-2 overflow-x-auto bg-canvas/80 px-5 py-3 backdrop-blur-md [scrollbar-width:none] md:-mx-8 md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {filters.map((item) => {
          const count =
            item === "all" ? projects.length : projects.filter((project) => project.category === item).length;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={filter === item}
              onClick={() => select(item)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition-colors",
                filter === item
                  ? "border-signal bg-signal text-ink"
                  : "border-ink/20 text-mute hover:border-signal hover:text-ink",
              )}
            >
              {filterLabel(item)}
              <span className={cn("text-[9px]", filter === item ? "text-ink/70" : "text-mute/70")}>
                {count.toString().padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </div>

      <div ref={gridRef} className="mt-8 grid grid-flow-row-dense gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, index) => {
          const shape = shapeFor(index);
          return (
            <div
              key={project.slug}
              data-work-tile
              className={cn(shape === "wide" && "sm:col-span-2")}
            >
              <WorkTile
                project={project}
                index={index}
                shape={shape}
                className={cn(shape === "wide" && "lg:aspect-auto lg:h-full lg:min-h-[28rem]")}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
