import { Handwritten } from "@/components/handwritten";
import { Reveal } from "@/components/reveal";
import { site } from "@/data/site";

export const aboutCopy = [
  "TND Films is an independent creative production house in Maadi, Cairo. We make films, commercials and visual content for brands and artists.",
  "Our work moves across automotive, fashion, F&B, music videos and events. Branded content and full commercial production, for big names.",
  "Concept, production and post sit under one roof, so nothing gets lost between the first board and the final grade.",
] as const;

const stats = [
  { value: "30+", label: "Brands and artists" },
  { value: "5", label: "Verticals" },
  { value: "1", label: "Roof: concept to grade" },
  { value: "17", label: "People on the crew" },
] as const;

export function AboutIntro() {
  return (
    <section id="about" className="px-5 py-24 md:px-8 md:py-36">
      <div className="grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <p className="text-[11px] tracking-[0.28em] text-mute uppercase">
            About us
          </p>
          <h2 className="font-display mt-3 text-[clamp(3rem,7.5vw,6.5rem)] leading-[0.88] tracking-tight uppercase">
            The house
            <br />
            behind the cut.
          </h2>
          <Handwritten className="mt-4 block text-4xl md:text-5xl">
            {site.motto.toLowerCase()}
          </Handwritten>
        </Reveal>
        <div className="flex flex-col gap-8 md:col-span-6 md:col-start-7 md:pt-8">
          {aboutCopy.map((line, index) => (
            <Reveal key={line} delay={index * 0.06}>
              <p
                className={
                  index === 0
                    ? "text-xl leading-relaxed md:text-2xl"
                    : "text-lg leading-relaxed text-mute md:text-xl"
                }
              >
                {line}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
      <Reveal className="mt-20">
        <dl className="grid grid-cols-2 border-t border-ink/10 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col border-b border-ink/10 py-6 pr-4 md:border-b-0">
              <dt className="order-2 mt-2 text-[11px] tracking-[0.2em] text-mute uppercase">
                {stat.label}
              </dt>
              <dd className="font-display order-1 text-6xl tracking-tight md:text-7xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
