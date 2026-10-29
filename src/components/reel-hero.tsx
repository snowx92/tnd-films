"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { GradeWipe } from "@/components/grade-wipe";
import { ReelOverlay } from "@/components/reel-overlay";
import { site, verticals } from "@/data/site";

function timecode(seconds: number) {
  const frames = Math.floor((seconds % 1) * 25);
  const s = Math.floor(seconds);
  const pad = (value: number) => value.toString().padStart(2, "0");
  return `00:${pad(Math.floor(s / 60))}:${pad(s % 60)}:${pad(frames)}`;
}

export function ReelHero() {
  const [reelOpen, setReelOpen] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const tc = tcRef.current;
    if (!video || !tc) {
      return;
    }

    let raf = 0;
    const tick = () => {
      tc.textContent = timecode(video.currentTime);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const frame = frameRef.current;
    if (!root || !frame || prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from("[data-hero='line']", { yPercent: 110, duration: 0.9, stagger: 0.08 }, 0.15)
        .from("[data-hero='meta']", { opacity: 0, y: 12, duration: 0.6, stagger: 0.06 }, 0.4)
        .from("[data-hero='play']", { scale: 0.6, opacity: 0, duration: 0.8 }, 0.5);

      gsap.to(frame, {
        scale: 0.9,
        borderRadius: 18,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative h-svh min-h-[34rem] touch-pan-y bg-canvas">
      <div
        ref={frameRef}
        className="absolute inset-0 origin-top overflow-hidden will-change-transform"
      >
        {/* Phones letterbox the 16:9 reel so its burned-in captions stay whole. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 scale-125 bg-cover bg-center opacity-60 blur-2xl md:hidden"
          style={{ backgroundImage: `url(${site.showreelPoster})` }}
        />
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-contain object-[50%_38%] md:object-cover md:object-center"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={site.showreelPoster}
        >
          <source src={site.showreelLoop} type="video/mp4" />
        </video>
        <GradeWipe video={videoRef} host={rootRef} />
        <div className="absolute inset-0 bg-linear-to-b from-canvas/50 via-transparent to-canvas/90" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-5 md:inset-8">
          <span className="absolute top-14 left-0 h-5 w-5 border-t border-l border-ink/40" />
          <span className="absolute top-14 right-0 h-5 w-5 border-t border-r border-ink/40" />
          <span className="absolute bottom-0 left-0 h-5 w-5 border-b border-l border-ink/40" />
          <span className="absolute right-0 bottom-0 h-5 w-5 border-r border-b border-ink/40" />
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col justify-end px-5 pb-10 md:px-8 md:pb-12">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p
              data-hero="meta"
              className="flex items-center gap-2 text-[10px] tracking-[0.26em] text-ink/80 uppercase"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-signal" />
              Showreel 2026 · <span ref={tcRef}>00:00:00:00</span>
            </p>
            {/* On phones the cropped reel already carries this line, so it is read but not shown. */}
            <h1 className="font-display sr-only mt-4 text-[clamp(3.2rem,9vw,8.5rem)] leading-[0.84] tracking-tight uppercase md:not-sr-only">
              <span className="block overflow-hidden">
                <span data-hero="line" className="block">
                  We don&apos;t make ads.
                </span>
              </span>
              <span className="block overflow-hidden">
                <span data-hero="line" className="block">
                  We make <span className="text-signal">moments.</span>
                </span>
              </span>
            </h1>
            <ul
              data-hero="meta"
              className="mt-6 flex flex-wrap gap-x-3 gap-y-1 text-[11px] tracking-[0.2em] text-ink/70 uppercase"
            >
              {verticals.map((item, index) => (
                <li key={item.id} className="flex items-center gap-3">
                  {item.title}
                  {index < verticals.length - 1 ? (
                    <span className="text-signal">/</span>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            data-hero="play"
            data-cursor="Play"
            onClick={() => setReelOpen(true)}
            className="group relative flex h-28 w-28 shrink-0 items-center justify-center self-end md:h-36 md:w-36"
            aria-label="Play the showreel with sound"
          >
            <svg
              viewBox="0 0 100 100"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full animate-[spin_14s_linear_infinite] text-ink/80"
            >
              <defs>
                <path id="reel-ring" d="M50 50 m-38 0 a38 38 0 1 1 76 0 a38 38 0 1 1 -76 0" />
              </defs>
              <text className="fill-current text-[8.4px] tracking-[0.3em] uppercase">
                <textPath href="#reel-ring">Play reel · sound on · Play reel · sound on ·</textPath>
              </text>
            </svg>
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-signal transition-transform duration-500 group-hover:scale-110 md:h-16 md:w-16">
              <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-5 w-5 fill-ink">
                <path d="M7 4.5v15l12-7.5-12-7.5Z" />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <ReelOverlay open={reelOpen} onClose={() => setReelOpen(false)} />
    </section>
  );
}
