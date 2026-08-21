import type { Metadata } from "next";
import { ServicesScroller } from "@/components/services-scroller";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return <ServicesScroller />;
}
