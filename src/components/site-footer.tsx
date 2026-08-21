import Link from "next/link";
import { nav, site } from "@/data/site";
import { Handwritten } from "@/components/handwritten";
import { PillLink } from "@/components/pill-link";
import { SocialLinks } from "@/components/social-links";

export function SiteFooter() {
  return (
    <footer className="border-t border-ink/10 bg-canvas px-5 pt-20 pb-8 md:px-8">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-8">
          <p className="font-display text-[clamp(3rem,10vw,8rem)] leading-[0.85] tracking-tight uppercase">
            Let&apos;s shoot
            <br />
            the next one.
          </p>
          <Handwritten className="mt-3 block text-4xl md:text-5xl">
            together
          </Handwritten>
          <div className="mt-8">
            <PillLink href="/contact">Get started</PillLink>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-8 md:col-span-4 md:items-end md:pt-4">
          <a
            href={`mailto:${site.email}`}
            className="text-sm tracking-wide text-mute transition-colors hover:text-signal"
          >
            E: {site.email}
          </a>
          <SocialLinks className="md:justify-end" />
          <ul className="flex flex-col gap-2 text-[11px] tracking-[0.18em] uppercase md:items-end">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-signal">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-16 flex items-end justify-between text-[10px] tracking-[0.16em] text-mute uppercase">
        <p>© {site.name} 2026</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}
