"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import Link from "next/link";
import { ReelOverlay } from "@/components/reel-overlay";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

type HeroWord = {
  text: string;
  blur?: boolean;
};

const lineOne: HeroWord[] = [
  { text: "Commerce", blur: true },
  { text: " and horsepower. It's " },
  { text: "not", blur: true },
  { text: " a catalog." },
];

const lineTwo: HeroWord[] = [
  { text: "It's cool. Let's shoot it together." },
];

function HeroLine({ words }: { words: HeroWord[] }) {
  return (
    <span className="block">
      {words.map((word) => (
        <span
          key={word.text}
          data-hero-word
          className={cn(
            "inline",
            word.blur && "inline-block blur-[7px] md:blur-[9px]",
          )}
        >
          {word.text}
        </span>
      ))}
    </span>
  );
}

export function ReelHero() {
  const [reelOpen, setReelOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-word]", {
        opacity: 0,
        y: 18,
        duration: 0.8,
        stagger: 0.05,
      })
        .from("[data-hero='cta']", { opacity: 0, y: 10, duration: 0.5 }, "-=0.25")
        .from("[data-hero='bar']", { opacity: 0, duration: 0.4 }, "-=0.2");
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-svh flex-col justify-center overflow-hidden px-5 md:px-8"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${site.showreelPoster})`,
        }}
      />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={site.showreelPoster}
      >
        <source src={site.showreel} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-canvas/55" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[46vh]"
      >
        <div className="absolute inset-x-[-10%] bottom-[-12%] h-48 rounded-[100%] bg-canvas/80 blur-3xl" />
        <div className="absolute inset-0 bg-linear-to-t from-canvas via-canvas/70 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-2 text-center">
        <h1 className="max-w-4xl font-body text-[clamp(1.55rem,4.1vw,3.15rem)] leading-[1.25] font-medium tracking-[-0.02em] text-ink">
          <HeroLine words={lineOne} />
          <HeroLine words={lineTwo} />
        </h1>
        <div data-hero="cta" className="relative mt-8">
          <span
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 h-16 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink/20 blur-2xl"
          />
          <Link
            href="/contact"
            className="relative inline-flex items-center justify-center rounded-full border border-ink/25 bg-ink/8 px-7 py-3 text-[11px] tracking-[0.2em] text-ink uppercase shadow-[inset_0_1px_0_0_rgba(255,255,255,0.22)] backdrop-blur-xl transition-[border-color,background-color] duration-300 hover:border-ink/45 hover:bg-ink/14"
          >
            Get started
          </Link>
        </div>
      </div>

      <div
        data-hero="bar"
        className="absolute inset-x-5 bottom-6 z-10 flex items-end justify-between text-[10px] tracking-[0.2em] text-mute uppercase md:inset-x-8"
      >
        <button
          type="button"
          onClick={() => setReelOpen(true)}
          className="rounded-full border border-ink/25 bg-canvas/50 px-3 py-1.5 hover:text-signal"
        >
          Play reel
        </button>
        <p>Scroll to view more ↓</p>
      </div>
      <ReelOverlay open={reelOpen} onClose={() => setReelOpen(false)} />
    </section>
  );
}
