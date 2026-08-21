"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";

type StudioPlayerProps = {
  project: Project;
};

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function StudioPlayer({ project }: StudioPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [hasVideo, setHasVideo] = useState(Boolean(project.video));

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    const onTime = () => {
      setCurrent(video.currentTime);
      setDuration(video.duration || 0);
      setProgress(video.duration ? video.currentTime / video.duration : 0);
    };

    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onTime);
    return () => {
      video.removeEventListener("timeupdate", onTime);
      video.removeEventListener("loadedmetadata", onTime);
    };
  }, [hasVideo]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.code !== "Space") {
        return;
      }
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, button, a")
      ) {
        return;
      }
      event.preventDefault();
      const video = videoRef.current;
      if (!video || !project.video) {
        return;
      }
      if (video.paused) {
        void video.play();
        setPlaying(true);
      } else {
        video.pause();
        setPlaying(false);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project.video]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video || !hasVideo) {
      return;
    }
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const seek = (event: MouseEvent<HTMLButtonElement>) => {
    const video = videoRef.current;
    if (!video || !duration) {
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    const ratio = (event.clientX - rect.left) / rect.width;
    video.currentTime = Math.min(Math.max(ratio, 0), 1) * duration;
  };

  return (
    <div id="screening" className="relative min-h-[85svh] overflow-hidden bg-canvas-raised">
      {hasVideo ? (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={project.poster}
          muted={muted}
          playsInline
          loop
          onClick={togglePlay}
          onError={() => setHasVideo(false)}
        >
          <source src={project.video} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${project.poster})` }}
        />
      )}
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-canvas via-transparent to-canvas/35" />

      <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 md:px-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <button
            type="button"
            onClick={togglePlay}
            className="rounded-full border border-ink/25 px-4 py-2 text-[11px] tracking-[0.2em] uppercase hover:border-signal hover:text-signal"
          >
            {playing ? "Pause" : "Play film"}
          </button>
          <p className="font-display text-[10px] tracking-[0.22em] text-mute uppercase">
            {formatTime(current)} / {formatTime(duration)}
          </p>
        </div>
        <button
          type="button"
          aria-label="Seek film"
          onClick={seek}
          className="block h-3 w-full"
        >
          <span className="block h-px w-full bg-ink/20">
            <span
              className="block h-px bg-signal"
              style={{ width: `${progress * 100}%` }}
            />
          </span>
        </button>
        <div className="mt-4 flex items-center justify-between text-[10px] tracking-[0.18em] text-mute uppercase">
          <p>Screening room</p>
          <button
            type="button"
            onClick={() => setMuted((value) => !value)}
            className={cn("hover:text-signal", !hasVideo && "opacity-40")}
          >
            {muted ? "Sound off" : "Sound on"}
          </button>
        </div>
      </div>
    </div>
  );
}
