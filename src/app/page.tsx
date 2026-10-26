import { cache } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AffiliationRibbon } from "@/components/AffiliationRibbon";
import { HeroAnnouncementBoard } from "@/components/HeroAnnouncementBoard";
import { Gallery } from "@/components/Gallery";
import { MatchCentre } from "@/components/MatchCentre";
import { Leadership } from "@/components/Leadership";
import { Journey } from "@/components/Journey";
import { Membership } from "@/components/Membership";
import { Development } from "@/components/Development";
// import { Affiliations } from "@/components/Affiliations";
import { Footer } from "@/components/Footer";
import { getHeroAnnouncements } from "@/lib/hero-announcements";

// Safety net; publish/delete also call revalidatePath.
export const revalidate = 300;

const loadHeroAnnouncements = cache(() => getHeroAnnouncements());

export default async function HomePage() {
  const heroAnnouncements = await loadHeroAnnouncements();

  return (
    <main id="main-content" className="flex flex-col">
      <Navbar />
      <Hero />
      <AffiliationRibbon />
      <HeroAnnouncementBoard announcements={heroAnnouncements} />
      <Gallery />
      <MatchCentre />
      <Leadership />
      <Journey />
      <Membership />
      <Development />
      {/* <Affiliations /> */}
      <Footer />
    </main>
  );
}
