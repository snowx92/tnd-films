import Image from "next/image";
import Link from "next/link";
import { Handwritten } from "@/components/handwritten";
import { Reveal } from "@/components/reveal";

const industries = [
  {
    href: "/work?v=ecommerce",
    title: "E-commerce",
    note: "product",
    image:
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=1400&q=80",
    copy: "Bottles, metal, fabric, the thing in the cart. Built to loop on a PDP and still hold a 15s buy.",
  },
  {
    href: "/work?v=automotive",
    title: "Automotive",
    note: "metal",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    copy: "Paint, night, torque. Films that sell the body, not the brochure.",
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
            className="group relative block min-h-[28rem] overflow-hidden rounded-sm"
          >
            <Image
              src={industry.image}
              alt={industry.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-canvas/45 transition-colors duration-500 group-hover:bg-canvas/25" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
              <Handwritten className="text-3xl">{industry.note}</Handwritten>
              <h2 className="font-display mt-1 text-5xl tracking-tight uppercase md:text-7xl">
                {industry.title}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink/80">
                {industry.copy}
              </p>
            </div>
          </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
