"use client";

import { useEffect, useRef } from "react";
import { processSteps } from "@/data/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export function ProcessSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-process='title']", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power4.out",
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true,
        },
      });

      gsap.from("[data-process='row']", {
        y: 28,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          once: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="px-5 py-24 md:px-8 md:py-32">
      <h2
        data-process="title"
        className="font-display text-5xl tracking-tight uppercase md:text-7xl"
      >
        Our process
      </h2>
      <ol className="mt-14 divide-y divide-ink/10 border-y border-ink/10">
        {processSteps.map((step) => (
          <li key={step.id} data-process="row">
            <div className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline">
              <p className="font-display text-3xl text-signal md:col-span-2">
                {step.id}
              </p>
              <h3 className="font-display text-3xl tracking-tight uppercase md:col-span-4 md:text-4xl">
                {step.title}
              </h3>
              <p className="max-w-xl text-mute md:col-span-6">{step.copy}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
