import { cn } from "@/lib/utils";

// Traced from the TND.jpeg mark on Drive (1659 × 670).
export const logoPaths = [
  "M128 0 L281 0 L275 45 L276 52 L429 52 L410 205 L257 205 L254 217 L221 496 L224 504 L229 510 L241 515 L372 515 L353 668 L90 668 L76 664 L68 659 L60 651 L54 641 L51 621 L102 206 L0 205 L0 200 L18 52 L120 52 L122 47 L127 1Z",
  "M564 0 L717 0 L711 48 L712 52 L976 52 L988 55 L999 62 L1009 74 L1014 88 L1012 121 L944 668 L791 668 L845 233 L845 224 L841 215 L835 209 L825 205 L692 206 L636 667 L483 668 L539 209 L538 205 L488 205 L491 175 L506 53 L557 52 L564 1Z",
  "M1155 0 L1308 0 L1302 48 L1303 52 L1619 52 L1634 57 L1647 68 L1654 79 L1657 91 L1654 126 L1593 621 L1586 639 L1574 653 L1557 664 L1543 668 L1279 668 L1298 515 L1452 514 L1490 208 L1489 205 L1284 205 L1282 211 L1227 667 L1073 668 L1130 209 L1129 205 L1079 205 L1095 68 L1097 52 L1149 51 L1155 1Z",
] as const;

type TndLogoProps = {
  className?: string;
  title?: string;
  /** Render each letter as an outline that can be drawn with GSAP. */
  outline?: boolean;
};

export function TndLogo({ className, title = "TND Films", outline }: TndLogoProps) {
  return (
    <svg
      viewBox="-8 -8 1675 686"
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cn("block h-auto", className)}
    >
      {logoPaths.map((d) => (
        <path
          key={d}
          d={d}
          data-logo-path
          fill={outline ? "none" : "currentColor"}
          stroke={outline ? "currentColor" : "none"}
          strokeWidth={outline ? 5 : 0}
          strokeLinejoin="round"
          vectorEffect={outline ? "non-scaling-stroke" : undefined}
        />
      ))}
    </svg>
  );
}
