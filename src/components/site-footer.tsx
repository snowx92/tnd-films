import Link from "next/link";
import { nav, site } from "@/data/site";
import { Handwritten } from "@/components/handwritten";
import { SocialLinks } from "@/components/social-links";
import { TndLogo } from "@/components/tnd-logo";

export function SiteFooter() {
  return (
    <footer className="overflow-hidden border-t border-ink/10 bg-canvas px-5 pt-20 pb-6 md:px-8">
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
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-signal px-7 py-3.5 text-[11px] tracking-[0.2em] text-ink uppercase transition-colors hover:bg-signal-hot"
          >
            Bring the brief
          </Link>
        </div>
        <div className="flex flex-col justify-between gap-8 md:col-span-4 md:items-end md:pt-4">
          <div className="flex flex-col gap-1 md:items-end">
            <a
              href={`mailto:${site.email}`}
              className="text-lg tracking-wide transition-colors hover:text-signal"
            >
              {site.email}
            </a>
            <p className="text-sm text-mute">{site.location}</p>
          </div>
          <SocialLinks className="md:justify-end" />
          <ul className="flex flex-col gap-2 text-[11px] tracking-[0.18em] uppercase md:items-end">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-signal">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={site.archive} target="_blank" rel="noreferrer" className="text-mute hover:text-signal">
                Archive on Drive ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <TndLogo className="mt-20 w-full text-ink/[0.06]" title="" />

      <div className="mt-6 flex flex-wrap items-end justify-between gap-2 text-[10px] tracking-[0.16em] text-mute uppercase">
        <p>© {site.name} 2026 · {site.motto}</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  );
}
