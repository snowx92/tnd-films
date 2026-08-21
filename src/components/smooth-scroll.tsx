"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type SmoothScrollProps = {
  children: ReactNode;
};

function ScrollTriggerBridge() {
  const pathname = usePathname();
  const lenis = useLenis();

  useLenis(() => {
    ScrollTrigger.update();
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  }, [pathname]);

  return null;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    const onTick = (time: number) => {
      lenisRef.current?.lenis?.raf(time * 1000);
    };

    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(onTick);
    };
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{ autoRaf: false, lerp: 0.08, duration: 1.1, smoothWheel: true }}
    >
      <ScrollTriggerBridge />
      {children}
    </ReactLenis>
  );
}
