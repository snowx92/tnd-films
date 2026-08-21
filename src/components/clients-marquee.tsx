"use client";

import { useEffect, useRef } from "react";
import { projects } from "@/data/projects";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function ClientsMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const names = [
    ...projects.map((project) => project.client),
    ...projects.map((project) => project.client),
  ];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || prefersReducedMotion()) {
      return;
    }

    const tween = gsap.to(track, {
      xPercent: -50,
      duration: 28,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section className="overflow-hidden border-y border-ink/10 py-8">
      <p className="mb-6 px-5 text-[11px] tracking-[0.28em] text-mute uppercase md:px-8">
        Selected clients
      </p>
      <div ref={trackRef} className="flex w-max gap-10 pr-10">
        {names.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="font-display text-5xl tracking-tight text-ink/80 uppercase md:text-7xl"
          >
            {name}
            <span className="text-signal">,</span>
          </span>
        ))}
      </div>
    </section>
  );
}
