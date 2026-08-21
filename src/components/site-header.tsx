"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { nav, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useLenis((lenis) => {
    setScrolled(lenis.scroll > 24);
  });

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between px-5 pt-5 transition-colors duration-500 md:px-8",
        scrolled && "bg-canvas/70 pb-4 backdrop-blur-sm",
      )}
    >
      <Link
        href="/"
        className="pointer-events-auto font-display text-2xl tracking-[0.14em] text-ink uppercase"
      >
        {site.name}
      </Link>
      <nav className="pointer-events-auto flex flex-wrap justify-end gap-x-4 gap-y-1 text-[11px] tracking-[0.18em] uppercase">
        {nav.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-ink/75 transition-colors hover:text-signal",
                active && "text-signal",
              )}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
