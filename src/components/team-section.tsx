import Image from "next/image";
import { team } from "@/data/team";
import { Handwritten } from "@/components/handwritten";
import { Reveal } from "@/components/reveal";

export function TeamSection() {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <Reveal>
        <div className="mb-10 flex items-end justify-between">
          <h2 className="font-display text-5xl tracking-tight uppercase md:text-7xl">
            Team
          </h2>
          <Handwritten className="text-3xl md:text-4xl">the crew</Handwritten>
        </div>
      </Reveal>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((member, index) => (
          <Reveal key={member.name} delay={index * 0.06}>
            <article>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-canvas-raised">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 50vw"
                  className="object-cover grayscale transition-[filter,transform] duration-700 ease-out hover:scale-[1.03] hover:grayscale-0"
                />
              </div>
              <h3 className="mt-4 text-lg">{member.name}</h3>
              <p className="text-sm text-mute">{member.role}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
