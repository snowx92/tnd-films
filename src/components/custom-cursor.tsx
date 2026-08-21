"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [hot, setHot] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) {
      return;
    }

    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (event: MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);
      const target = event.target;
      setHot(target instanceof Element && Boolean(target.closest("a, button")));
    };

    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
    >
      <div
        className={cn(
          "-translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200 ease-out",
          hot ? "h-10 w-10" : "h-5 w-5",
        )}
      >
        <span className="absolute top-0 left-0 h-2 w-2 border-t border-l border-ink" />
        <span className="absolute top-0 right-0 h-2 w-2 border-t border-r border-ink" />
        <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-ink" />
        <span className="absolute right-0 bottom-0 h-2 w-2 border-r border-b border-ink" />
        <span className="absolute top-1/2 left-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal" />
      </div>
    </div>
  );
}
