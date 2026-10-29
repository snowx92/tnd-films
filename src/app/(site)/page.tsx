import { AboutIntro } from "@/components/about-intro";
import { ClientsMarquee } from "@/components/clients-marquee";
import { FeaturedWork } from "@/components/featured-work";
import { IndustrySplit } from "@/components/industry-split";
import { ProcessSection } from "@/components/process-section";
import { ReelHero } from "@/components/reel-hero";
import { ShootIndex } from "@/components/shoot-index";
import { SloganSection } from "@/components/slogan-section";
import { TeamSection } from "@/components/team-section";

export default function HomePage() {
  return (
    <>
      <ReelHero />
      <ClientsMarquee />
      <AboutIntro />
      <SloganSection />
      <IndustrySplit />
      <ShootIndex />
      <ProcessSection />
      <FeaturedWork />
      <TeamSection />
    </>
  );
}
