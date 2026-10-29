import Image from "next/image";
import Link from "next/link";
import { Handwritten } from "@/components/handwritten";
import { Reveal } from "@/components/reveal";

const industries = [
  {
    href: "/work?c=fnb",
    title: "E-commerce",
    note: "product",
    image: "/media/work/monster/f01.jpg",
    copy: "Bottles, metal, fabric — the thing in the cart. Objects, texture and detail, built to stop the scroll, sell the product and survive the replay.",
  },
  {
    href: "/work?c=automotive",
    title: "Automotive",
    note: "metal",
    image: "/media/work/audi/f01.jpg",
    copy: "Paint, night, torque. Films that sell the feeling, not the brochure.",
  },
] as const;

export function IndustrySplit() {
  return (
    <section className="px-5 pb-24 md:px-8">
      <div className="grid gap-4 md:grid-cols-2">
        {industries.map((industry, index) => (
          <Reveal key={industry.title} className="h-full" delay={index * 0.08}>
            <Link
              href={industry.href}
              data-cursor="View"
              className="group relative block min-h-[30rem] overflow-hidden rounded-sm md:min-h-[36rem]"
            >
              <Image
                src={industry.image}
                alt={`${industry.title} work by TND Films`}
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-canvas via-canvas/30 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                <Handwritten className="text-3xl">{industry.note}</Handwritten>
                <h3 className="font-display mt-1 text-5xl tracking-tight uppercase md:text-7xl">
                  {industry.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/80">
                  {industry.copy}
                </p>
                <span className="mt-6 inline-flex w-fit items-center gap-2 text-[11px] tracking-[0.2em] uppercase">
                  See the work
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
