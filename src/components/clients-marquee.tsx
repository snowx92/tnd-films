"use client";

import { useEffect, useRef } from "react";
import { clients } from "@/data/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const half = Math.ceil(clients.length / 2);
const rows = [clients.slice(0, half), clients.slice(half)];

export function ClientsMarquee() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-marquee]").forEach((track, index) => {
        const reverse = index % 2 === 1;
        const tween = gsap.fromTo(
          track,
          { xPercent: reverse ? -50 : 0 },
          { xPercent: reverse ? 0 : -50, duration: 42, ease: "none", repeat: -1 },
        );
        track.addEventListener("mouseenter", () => gsap.to(tween, { timeScale: 0.2, duration: 0.6 }));
        track.addEventListener("mouseleave", () => gsap.to(tween, { timeScale: 1, duration: 0.6 }));
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Selected clients"
      className="overflow-hidden border-y border-ink/10 py-10 md:py-14"
    >
      <div className="mb-8 flex items-baseline justify-between px-5 md:px-8">
        <p className="text-[11px] tracking-[0.28em] text-mute uppercase">
          Selected clients
        </p>
        <p className="text-[11px] tracking-[0.28em] text-mute uppercase">
          {clients.length} brands and artists
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} data-marquee className="flex w-max">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 || undefined}
                className="flex shrink-0 gap-10 pr-10"
              >
                {row.map((name) => (
                  <li
                    key={name}
                    className={cn(
                      "font-display text-5xl tracking-tight whitespace-nowrap uppercase transition-colors duration-300 hover:text-signal md:text-7xl",
                      rowIndex === 0 ? "text-ink/85" : "text-transparent [-webkit-text-stroke:1px_var(--ink)] hover:[-webkit-text-stroke:1px_var(--signal)]",
                    )}
                  >
                    {name}
                    <span className="text-signal [-webkit-text-stroke:0]">,</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
