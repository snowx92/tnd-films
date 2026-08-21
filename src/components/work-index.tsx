"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Project, Vertical } from "@/lib/types";
import { verticalLabel } from "@/lib/types";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { WorkTile } from "@/components/work-tile";
import { cn } from "@/lib/utils";

type Filter = "all" | Vertical;

type WorkIndexProps = {
  projects: Project[];
  initialFilter?: Filter;
};

const filters: Filter[] = ["all", "ecommerce", "automotive"];

function filterLabel(filter: Filter): string {
  switch (filter) {
    case "all":
      return "All";
    case "ecommerce":
    case "automotive":
      return verticalLabel(filter);
    default: {
      const _exhaustive: never = filter;
      return _exhaustive;
    }
  }
}

export function WorkIndex({ projects, initialFilter = "all" }: WorkIndexProps) {
  const [filter, setFilter] = useState<Filter>(initialFilter);
  const gridRef = useRef<HTMLDivElement>(null);

  const visible = useMemo(() => {
    if (filter === "all") {
      return projects;
    }
    return projects.filter((project) => project.vertical === filter);
  }, [filter, projects]);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || prefersReducedMotion()) {
      return;
    }

    const tiles = grid.querySelectorAll("[data-work-tile]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        tiles,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: "power4.out",
        },
      );
    }, grid);

    return () => ctx.revert();
  }, [visible]);

  return (
    <div className="px-5 pt-28 pb-24 md:px-8">
      <p className="text-[11px] tracking-[0.28em] text-mute uppercase">Work</p>
      <h1 className="font-display mt-3 text-[clamp(4rem,12vw,9rem)] leading-[0.82] tracking-tight uppercase">
        The reel
      </h1>
      <div className="mt-8 flex flex-wrap gap-3">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={cn(
              "rounded-full border px-4 py-2 text-[11px] tracking-[0.18em] uppercase transition-colors",
              filter === item
                ? "border-signal bg-signal text-ink"
                : "border-ink/20 text-mute hover:border-signal hover:text-signal",
            )}
          >
            {filterLabel(item)}
          </button>
        ))}
      </div>
      <div ref={gridRef} className="mt-10 grid gap-4 md:grid-cols-2">
        {visible.map((project) => (
          <div key={project.slug} data-work-tile>
            <WorkTile project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
