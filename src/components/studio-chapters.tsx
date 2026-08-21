"use client";

import { useLenis } from "lenis/react";

export const studioChapters = [
  { id: "screening", label: "01 Screening" },
  { id: "slate", label: "02 Slate" },
  { id: "brief", label: "03 Brief" },
  { id: "selects", label: "04 Selects" },
  { id: "cut", label: "05 Cut" },
] as const;

export function StudioChapters() {
  const lenis = useLenis();

  return (
    <nav
      aria-label="Studio chapters"
      className="pointer-events-none fixed top-1/2 right-5 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
    >
      {studioChapters.map((chapter) => (
        <button
          key={chapter.id}
          type="button"
          onClick={() => lenis?.scrollTo(`#${chapter.id}`, { offset: -16 })}
          className="pointer-events-auto text-right text-[10px] tracking-[0.18em] text-mute uppercase transition-colors hover:text-signal"
        >
          {chapter.label}
        </button>
      ))}
    </nav>
  );
}
