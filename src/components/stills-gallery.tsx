"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import type { Still } from "@/lib/types";

type StillsGalleryProps = {
  title: string;
  stills: Still[];
};

export function StillsGallery({ title, stills }: StillsGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);
  const lenis = useLenis();

  const step = useCallback(
    (delta: number) => {
      setOpen((value) => (value === null ? value : (value + delta + stills.length) % stills.length));
    },
    [stills.length],
  );

  useEffect(() => {
    if (open === null) {
      lenis?.start();
      return;
    }
    lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [lenis, open, step]);

  const still = open === null ? null : stills[open];

  return (
    <>
      <div className="columns-2 gap-3 md:columns-3 lg:columns-4">
        {stills.map((item, index) => (
          <button
            key={item.src}
            type="button"
            data-still
            data-cursor="View"
            onClick={() => setOpen(index)}
            className="group relative mb-3 block w-full overflow-hidden rounded-sm bg-canvas-raised"
            style={{ aspectRatio: `${item.w} / ${item.h}` }}
            aria-label={`Open ${title} still ${index + 1}`}
          >
            <Image
              src={item.src}
              alt={`${title} still ${index + 1}`}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
          </button>
        ))}
      </div>

      {still ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${title} still ${(open ?? 0) + 1} of ${stills.length}`}
          className="fixed inset-0 z-[85] flex items-center justify-center bg-canvas/95 p-4 backdrop-blur-sm md:p-10"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative h-full w-full"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              key={still.src}
              src={still.src}
              alt={`${title} still ${(open ?? 0) + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[11px] tracking-[0.2em] uppercase md:inset-x-10">
            <span className="text-mute">
              {((open ?? 0) + 1).toString().padStart(2, "0")} / {stills.length.toString().padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              {([-1, 1] as const).map((delta) => (
                <button
                  key={delta}
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    step(delta);
                  }}
                  aria-label={delta === 1 ? "Next still" : "Previous still"}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/25 hover:border-signal hover:text-signal"
                >
                  {delta === 1 ? "→" : "←"}
                </button>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 rounded-full border border-ink/25 bg-canvas/60 px-4 py-2 text-[11px] tracking-[0.2em] uppercase hover:border-signal hover:text-signal md:top-6 md:right-6"
          >
            Close / Esc
          </button>
        </div>
      ) : null}
    </>
  );
}
