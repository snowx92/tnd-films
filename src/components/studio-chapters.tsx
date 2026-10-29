"use client";

import { useLenis } from "lenis/react";

const chapters = [
  { id: "screening", label: "01 Screening" },
  { id: "slate", label: "02 Slate" },
  { id: "selects", label: "03 Selects" },
  { id: "next", label: "04 Next" },
] as const;

export function StudioChapters({ hasStills }: { hasStills: boolean }) {
  const lenis = useLenis();
  const visible = chapters.filter((chapter) => hasStills || chapter.id !== "selects");

  return (
    <nav
      aria-label="Studio chapters"
      className="pointer-events-none fixed right-5 bottom-5 z-40 hidden flex-col gap-2 rounded-sm bg-canvas/60 p-3 backdrop-blur lg:flex"
    >
      {visible.map((chapter) => (
        <button
          key={chapter.id}
          type="button"
          onClick={() => lenis?.scrollTo(`#${chapter.id}`, { offset: -72 })}
          className="pointer-events-auto text-right text-[10px] tracking-[0.18em] text-mute uppercase transition-colors hover:text-signal"
        >
          {chapter.label}
        </button>
      ))}
    </nav>
  );
}
