import type { Metadata } from "next";
import Image from "next/image";
import { ProcessSection } from "@/components/process-section";
import { TeamSection } from "@/components/team-section";
import { Handwritten } from "@/components/handwritten";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="relative mx-5 min-h-[72svh] overflow-hidden rounded-sm md:mx-8">
        <Image
          src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=2000&q=80"
          alt="On set at TND Films"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-canvas via-canvas/20 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
          <h1 className="font-display text-[clamp(3.2rem,10vw,7rem)] leading-none tracking-tight uppercase">
            About us
          </h1>
          <p className="hidden text-[10px] tracking-[0.2em] text-ink/70 uppercase md:block">
            Scroll to view more ↓
          </p>
        </div>
      </section>

      <section className="grid gap-10 px-5 py-20 md:grid-cols-2 md:px-8">
        <Reveal>
          <p className="max-w-xl text-xl leading-relaxed">
            TND Films is a creative production agency for e-commerce and
            automotive. We shoot the object until it feels inevitable, then cut
            it so a stranger stays.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-xl text-xl leading-relaxed text-mute">
            Product films, launch spots, stills that hold a grid. One crew, two
            temperatures: warm glass and cold metal. If you sell something
            people want to own, we know how to light it.{" "}
            <Handwritten className="text-3xl">always</Handwritten>
          </p>
        </Reveal>
      </section>

      <TeamSection />
      <ProcessSection />
    </div>
  );
}
