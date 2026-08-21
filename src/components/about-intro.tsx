import { Handwritten } from "@/components/handwritten";
import { Reveal } from "@/components/reveal";

export function AboutIntro() {
  return (
    <section id="about" className="px-5 py-24 md:px-8 md:py-32">
      <Reveal>
        <p className="text-[11px] tracking-[0.28em] text-mute uppercase">
          About us
        </p>
        <h2 className="font-display mt-3 text-[clamp(3rem,8vw,6.5rem)] leading-none tracking-tight uppercase">
          The house
          <br />
          behind the cut.
        </h2>
        <Handwritten className="mt-4 block text-4xl md:text-5xl">
          TND Films
        </Handwritten>
      </Reveal>
      <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-20">
        <Reveal>
          <p className="max-w-xl text-xl leading-relaxed md:text-2xl">
            TND Films is a creative production agency for e-commerce and
            automotive. We shoot the object until it feels inevitable, then cut
            it so a stranger stays.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="max-w-xl text-xl leading-relaxed text-mute md:text-2xl">
            Product films, launch spots, stills that hold a grid. One crew, two
            temperatures: warm glass and cold metal. If you sell something
            people want to own, we know how to light it.{" "}
            <Handwritten className="text-3xl">always</Handwritten>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
