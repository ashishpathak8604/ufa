import { Suspense } from "react";
import { SectionHeading } from "./SectionHeading";
import { MatchTabs } from "./MatchTabs";
import { NoticesRegion } from "./NoticesRegion";
import { NoticesBoundary } from "./NoticesBoundary";
import { NoticeSkeleton } from "./NoticeBoard";

/**
 * Section 5F: Match Centre + Official Notices.
 * Desktop: two columns. Mobile: Match Centre first, Notices second.
 */
export function MatchCentre() {
  return (
    <section
      id="match-centre"
      aria-labelledby="match-centre-title"
      className="bg-sage-soft/70"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <SectionHeading
          id="match-centre-title"
          eyebrow="Fixtures and results"
          title="The game never stops."
          lede="Upcoming fixtures, live match information, and recent results from around the state."
        />

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <h3 className="eyebrow mb-4">Match Centre</h3>
            <MatchTabs />
          </div>

          <div id="official-notices" className="lg:pl-8 lg:border-l lg:border-olive/10">
            <h3 className="eyebrow mb-4">Official Notices</h3>
            <NoticesBoundary>
              <Suspense fallback={<NoticeSkeleton />}>
                <NoticesRegion />
              </Suspense>
            </NoticesBoundary>
          </div>
        </div>
      </div>
    </section>
  );
}
