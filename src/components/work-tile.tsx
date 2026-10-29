"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/lib/types";
import { categoryLabel } from "@/lib/types";
import { Handwritten } from "@/components/handwritten";
import { cn } from "@/lib/utils";

type WorkTileProps = {
  project: Project;
  /** Visual shape of the tile. */
  shape?: "wide" | "tall" | "square";
  index?: number;
  className?: string;
};

export function WorkTile({ project, shape = "tall", index, className }: WorkTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    void video
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  };

  const stop = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.pause();
    setPlaying(false);
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor={project.preview ? "Play" : "View"}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      className={cn(
        "group relative block overflow-hidden rounded-sm bg-canvas-raised",
        shape === "wide" && "aspect-[4/5] sm:aspect-[16/9]",
        shape === "tall" && "aspect-[4/5]",
        shape === "square" && "aspect-square",
        className,
      )}
    >
      {project.poster ? (
        <Image
          src={project.poster}
          alt={`${project.title} by TND Films`}
          fill
          sizes={shape === "wide" ? "100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.05]"
        />
      ) : null}
      {project.preview ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            playing ? "opacity-100" : "opacity-0",
          )}
          muted
          loop
          playsInline
          preload="none"
        >
          <source src={project.preview} type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-canvas/95 via-canvas/10 to-transparent" />
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 text-[10px] tracking-[0.22em] text-ink/80 uppercase md:p-5">
        <span>
          {typeof index === "number" ? `${(index + 1).toString().padStart(2, "0")} · ` : ""}
          {categoryLabel(project.category)}
        </span>
        <span
          className={cn(
            "flex items-center gap-1.5 transition-opacity duration-300",
            playing ? "opacity-100" : "opacity-60",
          )}
        >
          {project.preview ? (
            <span className={cn("h-1.5 w-1.5 rounded-full", playing ? "bg-signal" : "bg-ink/60")} />
          ) : null}
          {project.films.length > 0 ? `${project.films.length} film${project.films.length > 1 ? "s" : ""}` : "Stills"}
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6">
        <Handwritten className="text-2xl md:text-3xl">{project.handwritten}</Handwritten>
        <h3
          className={cn(
            "font-display mt-1 leading-[0.9] tracking-tight uppercase",
            shape === "wide" ? "text-5xl md:text-8xl" : "text-4xl md:text-5xl",
          )}
        >
          {project.title}
        </h3>
        <p
          className={cn(
            "mt-2 max-w-md text-sm text-ink/80 transition-[opacity,transform] duration-500 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100",
            shape === "wide" && "md:translate-y-0 md:opacity-100",
          )}
        >
          {project.logline}
        </p>
      </div>
    </Link>
  );
}
