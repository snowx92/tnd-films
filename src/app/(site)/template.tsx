"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Template({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) {
      return;
    }

    const tween = gsap.fromTo(
      el,
      { opacity: 0 },
      { opacity: 1, duration: 0.45, ease: "power3.out" },
    );

    return () => {
      tween.kill();
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
