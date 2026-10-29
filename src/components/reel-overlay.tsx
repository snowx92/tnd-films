"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";
import { site } from "@/data/site";

type ReelOverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function ReelOverlay({ open, onClose }: ReelOverlayProps) {
  const lenis = useLenis();

  useEffect(() => {
    if (!open) {
      lenis?.start();
      return;
    }

    lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      lenis?.start();
    };
  }, [lenis, onClose, open]);

  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="TND Films showreel"
      className="fixed inset-0 z-[85] flex items-center justify-center bg-canvas/95 backdrop-blur-sm"
    >
      <video
        className="max-h-full w-full object-contain"
        autoPlay
        controls
        playsInline
        poster={site.showreelPoster}
      >
        <source src={site.showreel} type="video/mp4" />
      </video>
      <button
        type="button"
        onClick={onClose}
        autoFocus
        className="absolute top-5 right-5 rounded-full border border-ink/25 bg-canvas/60 px-4 py-2 text-[11px] tracking-[0.2em] uppercase hover:border-signal hover:text-signal"
      >
        Close / Esc
      </button>
    </div>
  );
}
