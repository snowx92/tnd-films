import type { Metadata } from "next";
import Image from "next/image";
import { aboutCopy } from "@/components/about-intro";
import { ClientsMarquee } from "@/components/clients-marquee";
import { Handwritten } from "@/components/handwritten";
import { ProcessSection } from "@/components/process-section";
import { Reveal } from "@/components/reveal";
import { TeamSection } from "@/components/team-section";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <section className="relative mx-5 min-h-[78svh] overflow-hidden rounded-sm md:mx-8">
        <Image
          src="/media/bts/b14.jpg"
          alt="On set with TND Films"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
          className="object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-linear-to-t from-canvas via-canvas/30 to-canvas/10" />
        <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8">
          <div>
            <p className="text-[11px] tracking-[0.28em] text-ink/80 uppercase">
              {site.location}
            </p>
            <h1 className="font-display mt-2 text-[clamp(3.4rem,11vw,9rem)] leading-[0.82] tracking-tight uppercase">
              Tough nature
              <br />
              dominates.
            </h1>
          </div>
          <Handwritten className="text-4xl md:text-5xl">about us</Handwritten>
        </div>
      </section>

      <section className="grid gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <Reveal className="md:col-span-5">
          <h2 className="font-display text-5xl leading-[0.9] tracking-tight uppercase md:text-7xl">
            The house
            <br />
            behind the cut.
          </h2>
        </Reveal>
        <div className="flex flex-col gap-6 md:col-span-6 md:col-start-7">
          {aboutCopy.map((line, index) => (
            <Reveal key={line} delay={index * 0.06}>
              <p className={index === 0 ? "text-xl leading-relaxed md:text-2xl" : "text-lg leading-relaxed text-mute"}>
                {line}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      <div id="crew">
        <TeamSection full />
      </div>
      <ClientsMarquee />
      <ProcessSection />
    </div>
  );
}
