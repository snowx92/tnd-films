"use client";

import Image from "next/image";
import { useState } from "react";
import type { Project } from "@/lib/types";
import { driveEmbed } from "@/lib/types";
import { cn } from "@/lib/utils";

type DriveScreeningProps = {
  project: Project;
};

export function DriveScreening({ project }: DriveScreeningProps) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const film = project.films[current];
  const poster = film?.poster ?? project.poster;
  const vertical = film?.vertical ?? false;

  return (
    <section id="screening" className="px-5 pt-24 md:px-8 md:pt-28">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-black sm:aspect-video">
        {poster ? (
          <Image
            src={poster}
            alt=""
            fill
            sizes="50vw"
            className={cn(
              "scale-110 object-cover blur-2xl transition-opacity duration-700",
              vertical ? "opacity-50" : "opacity-0",
            )}
          />
        ) : null}
        <div
          className={cn(
            "absolute inset-y-0 left-1/2 -translate-x-1/2 overflow-hidden",
            vertical ? "aspect-[9/16] h-full max-w-full shadow-[0_0_80px_rgba(0,0,0,0.6)]" : "w-full",
          )}
        >
          {film && playing ? (
            <iframe
              key={film.id}
              src={driveEmbed(film.id)}
              title={`${project.title} — ${film.label}`}
              allow="autoplay; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          ) : (
            <button
              type="button"
              data-cursor={film ? "Play" : undefined}
              disabled={!film}
              onClick={() => setPlaying(true)}
              className="group absolute inset-0 block h-full w-full text-left"
              aria-label={film ? `Play ${project.title} ${film.label}` : project.title}
            >
              {poster ? (
                <Image
                  src={poster}
                  alt={`${project.title} still`}
                  fill
                  loading="eager"
                  fetchPriority="high"
                  sizes={vertical ? "(min-width: 640px) 32vw, 90vw" : "100vw"}
                  className="object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.03]"
                />
              ) : null}
              <span className="absolute inset-0 bg-linear-to-t from-canvas/80 via-transparent to-canvas/20" />
              {film ? (
                <span className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-signal transition-transform duration-500 group-hover:scale-110 md:h-24 md:w-24">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="ml-1 h-7 w-7 fill-ink">
                    <path d="M7 4.5v15l12-7.5-12-7.5Z" />
                  </svg>
                </span>
              ) : null}
            </button>
          )}
        </div>
        <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-canvas/60 px-3 py-1 text-[10px] tracking-[0.22em] text-ink/80 uppercase backdrop-blur md:bottom-6 md:left-6">
          {film ? `Screening room · ${film.label}${vertical ? " · 9:16" : ""}` : "Stills"}
        </span>
      </div>

      {project.films.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {project.films.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setCurrent(index);
                setPlaying(true);
              }}
              className={cn(
                "group flex shrink-0 items-center gap-3 rounded-full border py-1.5 pr-4 pl-1.5 text-[11px] tracking-[0.16em] uppercase transition-colors",
                index === current
                  ? "border-signal text-ink"
                  : "border-ink/15 text-mute hover:border-ink/40 hover:text-ink",
              )}
            >
              <span className="relative h-8 w-8 overflow-hidden rounded-full bg-canvas-raised">
                {item.poster ?? project.poster ? (
                  <Image src={item.poster ?? project.poster ?? ""} alt="" fill sizes="32px" className="object-cover" />
                ) : null}
              </span>
              {item.label}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  );
}
