import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type HandwrittenProps = {
  children: ReactNode;
  className?: string;
};

export function Handwritten({ children, className }: HandwrittenProps) {
  return (
    <span
      className={cn(
        "font-script font-medium italic leading-none text-signal",
        className,
      )}
    >
      {children}
    </span>
  );
}
