"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hot, setHot] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) {
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const last = { x: -1, y: -1 };

    const inspect = (target: Element | null) => {
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      setLabel(labelled?.dataset.cursor ?? null);
      setHot(Boolean(target?.closest("a, button, input, textarea, iframe")));
    };

    const onMove = (event: MouseEvent) => {
      last.x = event.clientX;
      last.y = event.clientY;
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
      inspect(event.target instanceof Element ? event.target : null);
    };

    // Content moves under a still pointer while scrolling; re-check what it is over.
    const onScroll = () => {
      if (last.x >= 0) {
        inspect(document.elementFromPoint(last.x, last.y));
      }
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90]"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      {label ? (
        <div className="flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-signal text-[10px] tracking-[0.2em] text-ink uppercase shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)]">
          {label}
        </div>
      ) : (
        <div
          className={cn(
            "relative -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-[width,height] duration-200 ease-out",
            hot ? "h-10 w-10" : "h-5 w-5",
          )}
        >
          <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-ink" />
          <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-ink" />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-ink" />
          <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-ink" />
          <span className="absolute top-1/2 left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
        </div>
      )}
    </div>
  );
}
