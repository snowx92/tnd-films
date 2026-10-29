import Image from "next/image";
import { processSteps } from "@/data/site";
import { GradeTimeline } from "@/components/grade-timeline";
import { Handwritten } from "@/components/handwritten";
import { Reveal } from "@/components/reveal";

export function ProcessSection() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-32">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-28">
            <Reveal>
              <p className="text-[11px] tracking-[0.28em] text-mute uppercase">
                Services
              </p>
              <h2 className="font-display mt-3 text-[clamp(3rem,7vw,6rem)] leading-[0.88] tracking-tight uppercase">
                Our process
              </h2>
              <p className="mt-4 max-w-xs text-lg text-mute">
                From idea to final frame. Clearer structure, stronger rhythm,
                trust through process.
              </p>
              <Handwritten className="mt-6 block text-4xl">one roof</Handwritten>
            </Reveal>
          </div>
        </div>

        <ol className="flex flex-col gap-6 md:col-span-8">
          {processSteps.map((step, index) => (
            <li
              key={step.id}
              className="sticky overflow-hidden rounded-md border border-ink/10 bg-canvas-raised shadow-[0_-24px_60px_-20px_rgba(0,0,0,0.8)]"
              style={{ top: `${6 + index * 1.25}rem` }}
            >
              <div className="grid min-h-[26rem] md:grid-cols-[1fr_1.15fr]">
                <div className="flex flex-col justify-between gap-8 p-6 md:p-8">
                  <div>
                    <p className="font-display text-6xl leading-none text-signal md:text-7xl">
                      {step.id}
                    </p>
                    <h3 className="font-display mt-3 text-4xl tracking-tight uppercase md:text-5xl">
                      {step.title}
                    </h3>
                  </div>
                  <div>
                    <Handwritten className="text-3xl">{step.note}</Handwritten>
                    <p className="mt-2 max-w-sm leading-relaxed text-mute">{step.copy}</p>
                  </div>
                </div>
                <div className="relative min-h-72 p-2 md:p-3">
                  {step.id === "04" ? (
                    <GradeTimeline />
                  ) : (
                    <div className="relative h-full min-h-72 overflow-hidden rounded-sm">
                      <Image
                        src={step.image}
                        alt={`${step.title} on a TND set`}
                        fill
                        sizes="(min-width: 768px) 35vw, 90vw"
                        className="object-cover"
                      />
                      <span className="absolute bottom-3 left-3 rounded-full bg-canvas/70 px-3 py-1 text-[10px] tracking-[0.2em] uppercase backdrop-blur">
                        Behind the scenes
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
