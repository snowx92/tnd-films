"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import type { Project } from "@/lib/types";
import { categoryLabel } from "@/lib/types";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { DriveScreening } from "@/components/drive-screening";
import { Handwritten } from "@/components/handwritten";
import { StillsGallery } from "@/components/stills-gallery";
import { StudioChapters } from "@/components/studio-chapters";
import { TndLogo } from "@/components/tnd-logo";
import { WorkTile } from "@/components/work-tile";

type ProjectStudioProps = {
  project: Project;
  nextProject: Project;
};

export function ProjectStudio({ project, nextProject }: ProjectStudioProps) {
  const router = useRouter();
  const lenis = useLenis();
  const flashRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true });
  }, [lenis, project.slug]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.querySelector("[role='dialog']")) {
        router.push("/work");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router]);

  useEffect(() => {
    const flash = flashRef.current;
    if (!flash || prefersReducedMotion()) {
      if (flash) {
        flash.style.visibility = "hidden";
      }
      return;
    }

    const tween = gsap.fromTo(
      flash,
      { scaleY: 1 },
      {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.7,
        delay: 0.05,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(flash, { visibility: "hidden" });
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, [project.slug]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || prefersReducedMotion()) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from("#slate [data-studio]", {
        y: 32,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: { trigger: "#slate", start: "top 85%", once: true },
      });

      gsap.from("#selects [data-still]", {
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: "power4.out",
        scrollTrigger: { trigger: "#selects", start: "top 80%", once: true },
      });

      gsap.from("[data-next-studio]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: { trigger: "[data-next-studio]", start: "top 85%", once: true },
      });
    }, root);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [project.slug]);

  return (
    <div ref={rootRef} className="bg-canvas text-ink">
      <div
        ref={flashRef}
        className="pointer-events-none fixed inset-0 z-[70] bg-signal"
      />

      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-canvas/70 px-5 py-4 backdrop-blur-md md:px-8">
        <Link href="/" aria-label="TND Films home" className="flex items-center gap-3 hover:text-signal">
          <TndLogo className="w-16 md:w-20" />
          <span className="hidden text-[10px] tracking-[0.22em] text-mute uppercase sm:block">
            Project studio
          </span>
        </Link>
        <Link
          href="/work"
          className="rounded-full border border-ink/20 px-4 py-2 text-[11px] tracking-[0.2em] uppercase hover:border-signal hover:text-signal"
        >
          Close / Esc
        </Link>
      </header>

      <StudioChapters hasStills={project.stills.length > 0} />
      <DriveScreening project={project} />

      <section id="slate" className="px-5 py-14 md:px-8 md:py-20">
        <p data-studio className="text-[11px] tracking-[0.24em] text-mute uppercase">
          {categoryLabel(project.category)}
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1
            data-studio
            className="font-display text-[clamp(3.4rem,11vw,9rem)] leading-[0.85] tracking-tight uppercase"
          >
            {project.title}
          </h1>
          <span data-studio>
            <Handwritten className="text-5xl md:text-7xl">{project.handwritten}</Handwritten>
          </span>
        </div>
        <p data-studio className="mt-6 max-w-2xl text-xl text-ink/85 md:text-2xl">
          {project.logline}
        </p>

        <dl
          data-studio
          className="mt-12 grid gap-6 border-t border-ink/10 pt-8 text-sm sm:grid-cols-2 md:grid-cols-4"
        >
          <div>
            <dt className="text-[10px] tracking-[0.2em] text-mute uppercase">Client</dt>
            <dd className="mt-2">{project.title}</dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.2em] text-mute uppercase">Vertical</dt>
            <dd className="mt-2">{categoryLabel(project.category)}</dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.2em] text-mute uppercase">In the folder</dt>
            <dd className="mt-2">{project.deliverables.join(" · ")}</dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.2em] text-mute uppercase">Production</dt>
            <dd className="mt-2">TND Films · concept to grade</dd>
          </div>
        </dl>
        <a
          data-studio
          href={project.drive}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-ink/25 px-5 py-3 text-[11px] tracking-[0.2em] uppercase transition-colors hover:border-signal hover:bg-signal"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal" />
          Open the full shoot on Drive ↗
        </a>
      </section>

      {project.stills.length > 0 ? (
        <section id="selects" className="px-5 py-10 md:px-8">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-4xl tracking-tight uppercase md:text-5xl">Selects</h2>
            <Handwritten className="text-3xl">stills from the set</Handwritten>
          </div>
          <StillsGallery title={project.title} stills={project.stills} />
        </section>
      ) : null}

      <section id="next" data-next-studio className="px-5 pt-10 pb-16 md:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-4xl tracking-tight uppercase md:text-5xl">Next up</h2>
          <Link
            href="/work"
            className="text-[11px] tracking-[0.18em] text-mute uppercase hover:text-signal"
          >
            All work
          </Link>
        </div>
        <WorkTile project={nextProject} shape="wide" />
      </section>
    </div>
  );
}
