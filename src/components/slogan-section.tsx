"use client";

import { useEffect, useRef } from "react";
import { Handwritten } from "@/components/handwritten";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

export function SloganSection() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      const letters = root.querySelectorAll("[data-slogan-letter]");

      gsap.from("[data-slogan-line]", {
        yPercent: 110,
        duration: 0.85,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          once: true,
        },
      });

      gsap.from(letters, {
        opacity: 0,
        y: 18,
        rotate: -8,
        duration: 0.45,
        stagger: 0.035,
        ease: "power3.out",
        scrollTrigger: {
          trigger: root,
          start: "top 68%",
          once: true,
        },
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  const script = "don't blink";

  return (
    <section
      ref={rootRef}
      className="flex min-h-[80svh] flex-col items-center justify-center px-5 py-28 text-center md:px-8"
    >
      <p className="text-[11px] tracking-[0.28em] text-mute uppercase">
        The line
      </p>
      <h2 className="font-display mt-6 text-[clamp(2.6rem,8vw,7rem)] leading-none tracking-tight uppercase">
        <span className="block overflow-hidden">
          <span data-slogan-line className="block">
            Shot for the cart.
          </span>
        </span>
        <span className="block overflow-hidden">
          <span data-slogan-line className="block">
            Cut for the road.
          </span>
        </span>
      </h2>
      <Handwritten className="mt-8 block text-5xl md:text-7xl">
        {script.split("").map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            data-slogan-letter
            className="inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </Handwritten>
    </section>
  );
}
