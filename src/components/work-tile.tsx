"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/lib/types";
import { verticalLabel } from "@/lib/types";
import { Handwritten } from "@/components/handwritten";
import { cn } from "@/lib/utils";

type WorkTileProps = {
  project: Project;
  featured?: boolean;
};

export function WorkTile({ project, featured = false }: WorkTileProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(Boolean(project.video));
  const [playing, setPlaying] = useState(false);

  const start = () => {
    const video = videoRef.current;
    if (!video || !hasVideo) {
      return;
    }
    void video.play().then(() => setPlaying(true)).catch(() => {
      setHasVideo(false);
    });
  };

  const stop = () => {
    const video = videoRef.current;
    if (!video) {
      return;
    }
    video.pause();
    video.currentTime = 0;
    setPlaying(false);
  };

  return (
    <Link
      href={`/work/${project.slug}`}
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
      className={cn(
        "group relative block overflow-hidden rounded-sm bg-canvas-raised",
        featured ? "min-h-[34rem] md:min-h-[40rem]" : "min-h-[22rem] md:min-h-[28rem]",
      )}
    >
      <Image
        src={project.poster}
        alt={`${project.title} still`}
        fill
        sizes={featured ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
        className={cn(
          "object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.04]",
          playing && "opacity-0",
        )}
      />
      {hasVideo ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
            playing ? "opacity-100" : "opacity-0",
          )}
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.poster}
          onError={() => setHasVideo(false)}
        >
          <source src={project.video} type="video/mp4" />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-linear-to-t from-canvas via-canvas/20 to-transparent" />
      <p
        className={cn(
          "absolute top-5 right-5 text-[10px] tracking-[0.22em] text-ink/80 uppercase transition-opacity duration-300",
          playing ? "opacity-0" : "opacity-100",
        )}
      >
        Play
      </p>
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-6">
        <div>
          <p className="text-[10px] tracking-[0.2em] text-ink/70 uppercase">
            {verticalLabel(project.vertical)} · {project.year}
          </p>
          <h3 className="font-display mt-1 text-4xl tracking-tight uppercase md:text-5xl">
            {project.title}
          </h3>
          <p className="mt-1 max-w-xs text-sm text-ink/80">{project.logline}</p>
        </div>
        <Handwritten className="text-3xl md:text-4xl">
          {project.handwritten}
        </Handwritten>
      </div>
    </Link>
  );
}
