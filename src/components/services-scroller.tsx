"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { Handwritten } from "@/components/handwritten";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";

const services = [
  {
    id: "01",
    title: "E-commerce film",
    copy: "Hero loops, PDP cuts, paid stabs. The product is the talent.",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "02",
    title: "Automotive film",
    copy: "Launch spots, night runs, body studies. Paint first, brochure never.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "03",
    title: "Production",
    copy: "Concept through wrap. Crew, light, locations, the day that has to work.",
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=80",
  },
  {
    id: "04",
    title: "Post",
    copy: "Edit, grade, sound, motion. Delivered ready for every channel.",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=2000&q=80",
  },
] as const;

type ServicesScrollerProps = {
  heading?: "h1" | "h2";
};

export function ServicesScroller({ heading = "h1" }: ServicesScrollerProps) {
  const Heading = heading;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("[data-services='line']", {
        yPercent: prefersReducedMotion() ? 0 : 110,
        duration: 0.85,
        stagger: 0.08,
        ease: "power4.out",
      });

      if (prefersReducedMotion()) {
        return;
      }

      const panels = gsap.utils.toArray<HTMLElement>("[data-service-panel]");

      panels.forEach((panel) => {
        const image = panel.querySelector("[data-service-image]");
        const copy = panel.querySelector("[data-service-copy]");

        if (image) {
          gsap.fromTo(
            image,
            { scale: 1.22 },
            {
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }

        if (copy) {
          gsap.fromTo(
            copy,
            { y: 56, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top 80%",
                end: "top 30%",
                scrub: true,
              },
            },
          );
        }
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="pb-24">
      <div className="px-5 pt-28 pb-10 md:px-8">
        <p className="text-[11px] tracking-[0.28em] text-mute uppercase">
          Services
        </p>
        <Heading className="font-display mt-3 text-[clamp(3.2rem,8vw,6.5rem)] leading-none tracking-tight uppercase">
          <span className="block overflow-hidden">
            <span data-services="line" className="block">
              What we
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-services="line" className="block">
              cover.
            </span>
          </span>
        </Heading>
        <Handwritten className="mt-4 block text-5xl">the work</Handwritten>
      </div>

      <div className="relative">
        {services.map((service, index) => (
          <article
            key={service.id}
            data-service-panel
            className="sticky top-0 h-svh overflow-hidden"
            style={{ zIndex: index + 1 }}
          >
            <div data-service-image className="absolute inset-0">
              <Image
                src={service.image}
                alt={service.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-canvas via-canvas/20 to-transparent" />
            <div
              data-service-copy
              className="absolute inset-x-0 bottom-0 z-10 px-5 pb-10 md:px-8 md:pb-14"
            >
              <p className="font-display text-5xl text-signal md:text-7xl">
                {service.id}
              </p>
              <h2 className="font-display mt-2 text-4xl tracking-tight uppercase md:text-7xl">
                {service.title}
              </h2>
              <p className="mt-4 max-w-lg text-lg text-ink/90">{service.copy}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
