"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Handwritten } from "@/components/handwritten";

const frames = ["08", "07", "06", "05", "04"];

export function FilmLeader() {
  const screenRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLParagraphElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion() || sessionStorage.getItem("tnd-leader") === "1") {
      return;
    }

    setVisible(true);
    document.documentElement.classList.add("leader-lock");
  }, []);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const screen = screenRef.current;
    const number = frameRef.current;
    const bar = barRef.current;
    if (!screen || !number || !bar) {
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("tnd-leader", "1");
          document.documentElement.classList.remove("leader-lock");
          setVisible(false);
        },
      });

      tl.fromTo(
        bar,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.35, ease: "power3.inOut" },
        0,
      );

      frames.forEach((_, index) => {
        tl.call(() => setFrame(index), [], index * 0.22);
      });

      tl.to(
        screen,
        { yPercent: -100, duration: 0.55, ease: "power4.in" },
        1.25,
      );
    }, screen);

    return () => {
      ctx.revert();
      document.documentElement.classList.remove("leader-lock");
    };
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <div
      ref={screenRef}
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-canvas px-6 py-6 text-ink md:px-10"
      role="status"
      aria-label="TND Films loading"
    >
      <div className="flex items-start justify-between text-[10px] tracking-[0.28em] uppercase">
        <p>TND</p>
        <p>Leader</p>
      </div>
      <div className="text-center">
        <p
          ref={frameRef}
          className="font-display text-[clamp(6rem,22vw,16rem)] leading-none tracking-tight"
        >
          {frames[frame]}
        </p>
        <Handwritten className="mt-2 block text-5xl">mark</Handwritten>
      </div>
      <div className="flex items-end justify-between text-[10px] tracking-[0.22em] text-mute uppercase">
        <p>Picture start</p>
        <p className="text-signal">Red</p>
      </div>
      <div
        ref={barRef}
        className="absolute inset-x-0 bottom-0 h-1.5 origin-left bg-signal"
      />
    </div>
  );
}
