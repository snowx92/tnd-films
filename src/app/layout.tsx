import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Big_Shoulders, Caveat, Sora } from "next/font/google";
import { CustomCursor } from "@/components/custom-cursor";
import { FilmGrain } from "@/components/film-grain";
import { FilmLeader } from "@/components/film-leader";
import { SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/data/site";
import "./globals.css";

const display = Big_Shoulders({
  variable: "--font-display-family",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  adjustFontFallback: false,
});

const body = Sora({
  variable: "--font-body-family",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const script = Caveat({
  variable: "--font-script-family",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — Creative production`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-canvas font-body text-ink">
        <SmoothScroll>
          <FilmLeader />
          <FilmGrain />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
