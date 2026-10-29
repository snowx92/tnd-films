"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { nav } from "@/data/site";
import { TndLogo } from "@/components/tnd-logo";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const last = useRef(0);

  useLenis((lenis) => {
    const y = lenis.scroll;
    setScrolled(y > 24);
    setHidden(y > 240 && y > last.current);
    last.current = y;
  });

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 transition-[background-color,transform] duration-500 md:px-8",
        scrolled && "bg-canvas/70 backdrop-blur-md",
        hidden && "-translate-y-full",
      )}
    >
      <Link
        href="/"
        aria-label="TND Films home"
        className="pointer-events-auto flex items-center gap-3 text-ink transition-colors hover:text-signal"
      >
        <TndLogo className="w-14 sm:w-16 md:w-20" />
        <span className="hidden text-[10px] tracking-[0.26em] text-mute uppercase sm:block">
          Films
        </span>
      </Link>
      <nav className="pointer-events-auto flex justify-end gap-x-3 text-[10px] tracking-[0.14em] uppercase sm:gap-x-4 sm:text-[11px] sm:tracking-[0.18em] md:gap-x-7">
        {nav.map((item) => {
          const active =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative text-ink/75 transition-colors hover:text-ink",
                active && "text-ink",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100",
                  active && "scale-x-100",
                )}
              />
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
