import { AboutIntro } from "@/components/about-intro";
import { ClientsMarquee } from "@/components/clients-marquee";
import { FeaturedWork } from "@/components/featured-work";
import { IndustrySplit } from "@/components/industry-split";
import { ProcessSection } from "@/components/process-section";
import { ReelHero } from "@/components/reel-hero";
import { ServicesScroller } from "@/components/services-scroller";
import { SloganSection } from "@/components/slogan-section";
import { TeamSection } from "@/components/team-section";

export default function HomePage() {
  return (
    <>
      <ReelHero />
      <AboutIntro />
      <SloganSection />
      <IndustrySplit />
      <ServicesScroller heading="h2" />
      <FeaturedWork />
      <TeamSection />
      <ClientsMarquee />
      <ProcessSection />
    </>
  );
}
