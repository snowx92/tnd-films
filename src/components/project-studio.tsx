"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLenis } from "lenis/react";
import { useEffect, useRef } from "react";
import type { Project } from "@/lib/types";
import { verticalLabel } from "@/lib/types";
import { gsap, prefersReducedMotion, ScrollTrigger } from "@/lib/gsap";
import { Handwritten } from "@/components/handwritten";
import { StudioChapters } from "@/components/studio-chapters";
import { StudioPlayer } from "@/components/studio-player";
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
      if (event.key === "Escape") {
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
      { opacity: 1 },
      {
        opacity: 0,
        duration: 0.55,
        delay: 0.08,
        ease: "power3.out",
        onComplete: () => {
          gsap.set(flash, { visibility: "hidden" });
        },
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

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
        scrollTrigger: { trigger: "#slate", start: "top 80%", once: true },
      });

      gsap.from("#brief article", {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: "#brief", start: "top 82%", once: true },
      });

      gsap.from("#selects [data-still]", {
        x: 48,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: "#selects", start: "top 78%", once: true },
      });

      gsap.from("#cut > div", {
        y: 36,
        opacity: 0,
        duration: 0.75,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: "#cut", start: "top 82%", once: true },
      });

      gsap.from("[data-next-studio]", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power4.out",
        scrollTrigger: {
          trigger: "[data-next-studio]",
          start: "top 85%",
          once: true,
        },
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

      <header className="fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 pt-5 md:px-8">
        <div>
          <Link
            href="/"
            className="font-display text-lg tracking-[0.16em] uppercase"
          >
            TND
          </Link>
          <p className="mt-1 text-[10px] tracking-[0.22em] text-mute uppercase">
            Project studio
          </p>
        </div>
        <Link
          href="/work"
          className="rounded-full border border-ink/20 px-4 py-2 text-[11px] tracking-[0.2em] uppercase hover:border-signal hover:text-signal"
        >
          Close / Esc
        </Link>
      </header>

      <StudioChapters />
      <StudioPlayer project={project} />

      <section id="slate" className="px-5 py-16 md:px-8 md:py-24">
        <p
          data-studio
          className="text-[11px] tracking-[0.24em] text-mute uppercase"
        >
          {verticalLabel(project.vertical)} · {project.year}
        </p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h1
            data-studio
            className="font-display text-[clamp(3.4rem,10vw,8rem)] leading-none tracking-tight uppercase"
          >
            {project.title}
          </h1>
          <span data-studio>
            <Handwritten className="text-5xl md:text-7xl">
              {project.handwritten}
            </Handwritten>
          </span>
        </div>
        <p
          data-studio
          className="mt-6 max-w-2xl text-xl text-ink/85 md:text-2xl"
        >
          {project.logline}
        </p>

        <dl
          data-studio
          className="mt-12 grid gap-6 border-t border-ink/10 pt-8 text-sm md:grid-cols-4"
        >
          <div>
            <dt className="text-[10px] tracking-[0.2em] text-mute uppercase">
              Client
            </dt>
            <dd className="mt-2">{project.client}</dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.2em] text-mute uppercase">
              Year
            </dt>
            <dd className="mt-2">{project.year}</dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.2em] text-mute uppercase">
              Vertical
            </dt>
            <dd className="mt-2">{verticalLabel(project.vertical)}</dd>
          </div>
          <div>
            <dt className="text-[10px] tracking-[0.2em] text-mute uppercase">
              Services
            </dt>
            <dd className="mt-2">{project.services.join(" · ")}</dd>
          </div>
        </dl>
      </section>

      <section id="brief" className="grid gap-10 px-5 py-10 md:grid-cols-2 md:px-8 md:py-16">
        <article>
          <h2 className="font-display text-3xl tracking-tight uppercase">
            Brief
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-mute">
            {project.brief}
          </p>
        </article>
        <article>
          <h2 className="font-display text-3xl tracking-tight uppercase">
            On set
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-mute">
            {project.production}
          </p>
        </article>
      </section>

      <section id="selects" className="px-5 py-10 md:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-3xl tracking-tight uppercase">
            Selects
          </h2>
          <Handwritten className="text-3xl">stills</Handwritten>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4">
          {project.stills.map((still, index) => (
            <div
              key={still}
              data-still
              className="relative h-72 w-[min(80vw,28rem)] shrink-0 overflow-hidden rounded-sm"
            >
              <Image
                src={still}
                alt={`${project.title} select ${index + 1}`}
                fill
                sizes="448px"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <section id="cut" className="grid gap-12 px-5 py-16 md:grid-cols-12 md:px-8 md:py-24">
        <div className="md:col-span-7">
          <h2 className="font-display text-3xl tracking-tight uppercase">
            The cut
          </h2>
          <p className="mt-4 max-w-xl leading-relaxed text-mute">
            {project.result}
          </p>
        </div>
        <div className="md:col-span-5">
          <h2 className="font-display text-3xl tracking-tight uppercase">
            Credits
          </h2>
          <ul className="mt-4 divide-y divide-ink/10 border-y border-ink/10">
            {project.credits.map((credit) => (
              <li
                key={credit.role}
                className="flex items-baseline justify-between py-3 text-sm"
              >
                <span className="text-mute">{credit.role}</span>
                <span>{credit.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-next-studio className="px-5 pb-16 md:px-8">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="font-display text-4xl tracking-tight uppercase">
            Next studio
          </h2>
          <Link
            href="/work"
            className="text-[11px] tracking-[0.18em] text-mute uppercase hover:text-signal"
          >
            All work
          </Link>
        </div>
        <WorkTile project={nextProject} featured />
      </section>
    </div>
  );
}
