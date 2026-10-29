"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { TndLogo } from "@/components/tnd-logo";
import { site } from "@/data/site";

export function FilmLeader() {
  const screenRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const screen = screenRef.current;
    // leaderSkipScript (in the root layout) hides the leader before first paint on repeat visits.
    if (!screen || document.documentElement.classList.contains("leader-skip")) {
      return;
    }

    document.documentElement.classList.add("leader-lock");

    const ctx = gsap.context(() => {
      const outlines = gsap.utils.toArray<SVGPathElement>(
        "[data-leader='outline'] [data-logo-path]",
      );
      outlines.forEach((path) => {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      });

      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("tnd-leader", "1");
          document.documentElement.classList.remove("leader-lock");
          setVisible(false);
        },
      });

      tl.to(outlines, {
        strokeDashoffset: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power2.inOut",
      })
        .fromTo(
          "[data-leader='fill']",
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)", duration: 0.55, ease: "power4.inOut" },
          "-=0.2",
        )
        .fromTo(
          "[data-leader='bar']",
          { scaleX: 0 },
          { scaleX: 1, duration: 1.6, ease: "power3.inOut" },
          0,
        )
        .from("[data-leader='meta']", { opacity: 0, duration: 0.4, stagger: 0.08 }, 0.2)
        .to(screen, { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, "+=0.25");
    }, screen);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove("leader-lock");
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={screenRef}
      data-film-leader
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-canvas px-6 py-6 text-ink md:px-10"
      role="status"
      aria-label="TND Films loading"
    >
      <div className="flex items-start justify-between text-[10px] tracking-[0.28em] uppercase">
        <p data-leader="meta">TND Films</p>
        <p data-leader="meta">{site.location}</p>
      </div>
      <div className="relative mx-auto w-[min(72vw,34rem)]">
        <div data-leader="outline" className="text-ink/80">
          <TndLogo outline />
        </div>
        <div data-leader="fill" className="absolute inset-0 text-ink">
          <TndLogo />
        </div>
      </div>
      <div className="flex items-end justify-between text-[10px] tracking-[0.22em] text-mute uppercase">
        <p data-leader="meta">{site.motto}</p>
        <p data-leader="meta" className="text-signal">
          ● Rec
        </p>
      </div>
      <div
        data-leader="bar"
        className="absolute inset-x-0 bottom-0 h-1.5 origin-left bg-signal"
      />
    </div>
  );
}
