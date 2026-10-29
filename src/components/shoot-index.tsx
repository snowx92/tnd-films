"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { capabilities, verticals } from "@/data/site";
import { projects } from "@/data/projects";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

function VerticalIcon({ id }: { id: (typeof verticals)[number]["id"] }) {
  const common = "h-4 w-4 fill-none stroke-current";
  switch (id) {
    case "fnb":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={common} strokeWidth="1.5">
          <path d="M7 3v8m-2.5-8v5a2.5 2.5 0 0 0 5 0V3M7 11v10M17 3c-2 1.5-3 4-3 7h3v11" />
        </svg>
      );
    case "fashion":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={common} strokeWidth="1.5">
          <path d="M12 6a2 2 0 1 1 2 2c-1 0-2 .7-2 1.6V11m0 0L3 18h18l-9-7Z" />
        </svg>
      );
    case "automotive":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={common} strokeWidth="1.5">
          <path d="M4 15h16m-15 0 1.5-5A2 2 0 0 1 8.4 8.5h7.2a2 2 0 0 1 1.9 1.5L19 15v3h-2.5v-2h-9v2H5v-3Z" />
        </svg>
      );
    case "music":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={common} strokeWidth="1.5">
          <path d="M9 18V5l11-2v13M9 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm11-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      );
    case "events":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className={common} strokeWidth="1.5">
          <path d="M4 7h16v13H4V7Zm0 4h16M8 4v4m8-4v4" />
        </svg>
      );
    default:
      return null;
  }
}

export function ShootIndex() {
  const rootRef = useRef<HTMLElement>(null);
  const floatRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    const float = floatRef.current;
    if (!root || !float || prefersReducedMotion()) {
      return;
    }

    const xTo = gsap.quickTo(float, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(float, "y", { duration: 0.5, ease: "power3.out" });
    const onMove = (event: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      xTo(event.clientX - rect.left);
      yTo(event.clientY - rect.top);
    };
    root.addEventListener("pointermove", onMove);
    return () => root.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section ref={rootRef} className="relative px-5 py-24 md:px-8 md:py-32">
      <Reveal className="text-center">
        <h2 className="font-display text-[clamp(2.6rem,8vw,7.5rem)] leading-[0.9] tracking-tight uppercase">
          We shoot what moves people<span className="text-signal">.</span>
        </h2>
        <ul className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[11px] tracking-[0.22em] text-mute uppercase">
          {verticals.map((item, index) => (
            <li key={item.id} className="flex items-center gap-4">
              {item.title}
              {index < verticals.length - 1 ? <span className="text-signal">/</span> : null}
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-0">
        <div className="md:border-r md:border-ink/10 md:pr-10">
          <p className="mb-4 text-[11px] tracking-[0.26em] text-signal uppercase">
            What we shoot
          </p>
          <ul onPointerLeave={() => setActive(null)}>
            {verticals.map((item, index) => {
              const count = projects.filter((project) => project.category === item.id).length;
              return (
                <li key={item.id} className="border-b border-ink/10">
                  <Link
                    href={`/work?c=${item.id}`}
                    data-cursor="View"
                    onPointerEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onBlur={() => setActive(null)}
                    className="group grid grid-cols-[2.5rem_1fr] items-center gap-4 py-5 md:grid-cols-[2.5rem_11rem_1fr_auto]"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 text-ink/80 transition-colors group-hover:border-signal group-hover:bg-signal group-hover:text-ink">
                      <VerticalIcon id={item.id} />
                    </span>
                    <span className="font-display text-2xl tracking-tight uppercase transition-transform duration-300 group-hover:translate-x-1 md:text-3xl">
                      {item.title}
                    </span>
                    <span className="col-start-2 text-sm text-mute md:col-start-auto">
                      {item.copy}
                    </span>
                    <span className="hidden text-[10px] tracking-[0.2em] text-mute uppercase md:block">
                      {count.toString().padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="md:pl-10">
          <p className="mb-4 text-[11px] tracking-[0.26em] text-signal uppercase">
            What we do
          </p>
          <ol>
            {capabilities.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-[2.5rem_1fr] items-center gap-4 border-b border-ink/10 py-5 md:grid-cols-[2.5rem_14rem_1fr]"
              >
                <span className="font-display flex h-9 w-9 items-center justify-center rounded-full border border-signal/60 text-sm text-signal">
                  {item.id}
                </span>
                <span className="font-display text-2xl tracking-tight uppercase md:text-3xl">
                  {item.title}
                </span>
                <span className="col-start-2 text-sm text-mute md:col-start-auto">
                  {item.copy}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div
        ref={floatRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-20 hidden md:block"
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          {verticals.map((item, index) => (
            <div
              key={item.id}
              className={cn(
                "absolute top-0 left-0 h-60 w-48 translate-x-12 -translate-y-1/2 overflow-hidden rounded-sm shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] transition-[opacity,transform] duration-500 ease-out",
                active === index ? "scale-100 rotate-[-3deg] opacity-100" : "scale-75 rotate-0 opacity-0",
              )}
            >
              <Image src={item.image} alt="" fill sizes="192px" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
