import Image from "next/image";
import { affiliations } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

/**
 * Affiliations and partners (section 5K).
 * Verified affiliations visually distinct from commercial sponsors.
 * Sponsors list is empty -> sponsors block is omitted entirely.
 */
export function Affiliations() {
  const hasAffiliations = affiliations.list.length > 0;
  const hasSponsors = affiliations.sponsors.length > 0;

  return (
    <section aria-labelledby="affiliations-title" className="bg-ivory">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:py-22">
        <SectionHeading
          id="affiliations-title"
          eyebrow="Affiliations"
          title={affiliations.title}
          lede={affiliations.intro}
        />

        {hasAffiliations && (
          <div className="mt-8">
            <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {affiliations.list.map((aff) => (
                <li
                  key={aff.id}
                  className="flex flex-col gap-3 rounded-[1.5rem] border border-gold/30 bg-warmwhite p-5 shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative h-16 w-28 overflow-hidden rounded-2xl bg-sage-soft">
                      <Image
                        src={aff.logo}
                        alt={`${aff.name} logo placeholder`}
                        width={280}
                        height={160}
                        sizes="120px"
                        loading="lazy"
                        className="h-full w-full object-contain p-2"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-olive">
                        {aff.name}
                      </h3>
                      {!aff.verified && (
                        <span className="rounded-full border border-gold/50 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-gold-strong">
                          Verified affiliation (to be confirmed)
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-strong">{aff.note}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        {hasSponsors && (
          <div className="mt-10">
            <p className="eyebrow text-muted-strong">Commercial partners</p>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              {affiliations.sponsors.map((sponsor) => (
                <li
                  key={sponsor.id}
                  className="flex items-center justify-center rounded-[1.25rem] border border-olive/10 bg-warmwhite p-5"
                >
                  <div className="relative h-14 w-36">
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo placeholder`}
                      width={180}
                      height={56}
                      sizes="120px"
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
