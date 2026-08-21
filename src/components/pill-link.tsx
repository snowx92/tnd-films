import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type PillLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  invert?: boolean;
};

export function PillLink({ href, children, className, invert }: PillLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300",
        invert
          ? "border-canvas/20 bg-ink text-canvas hover:bg-signal hover:text-ink hover:border-signal"
          : "border-ink/25 text-ink hover:border-signal hover:text-signal",
        className,
      )}
    >
      {children}
    </Link>
  );
}
