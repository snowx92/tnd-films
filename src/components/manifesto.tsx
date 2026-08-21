import { Handwritten } from "@/components/handwritten";
import { Reveal } from "@/components/reveal";

export function Manifesto() {
  return (
    <section className="px-5 py-24 md:px-8 md:py-36">
      <Reveal>
        <p className="mb-10 text-[11px] tracking-[0.28em] text-mute uppercase">
          TND Films
        </p>
      </Reveal>
      <div className="grid gap-10 md:grid-cols-2 md:gap-20">
        <Reveal>
          <p className="max-w-xl text-xl leading-relaxed text-ink/90 md:text-2xl">
            We are a production house for brands that sell objects people want
            to touch. Skin. Steel. Light on a bottle. A car leaving the frame.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-xl text-xl leading-relaxed text-mute md:text-2xl">
            E-commerce and automotive, shot like they belong in the same reel.
            Because they do. Desire is desire. We just know where to put the{" "}
            <Handwritten className="text-3xl md:text-4xl">cut</Handwritten>.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
