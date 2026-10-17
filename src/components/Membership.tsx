import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { membership } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

/**
 * Membership (section 5I). All specifics are marked as needing verification.
 */
export function Membership() {
  return (
    <section
      id="membership"
      aria-labelledby="membership-title"
      className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28"
    >
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            id="membership-title"
            eyebrow={membership.eyebrow}
            title={membership.title}
            lede={membership.lede}
          />

          <ul className="mt-10 space-y-5">
            {membership.pathways.map((pathway) => (
              <li
                key={pathway.id}
                className="flex items-start gap-3 rounded-[1.5rem] bg-warmwhite p-5 shadow-soft"
              >
                <CheckCircle2
                  aria-hidden="true"
                  size={18}
                  className="mt-0.5 shrink-0 text-eucalyptus"
                />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-olive">
                      {pathway.title}
                    </h3>
                    {!pathway.verified && (
                      <span className="rounded-full border border-eucalyptus/30 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-eucalyptus-strong">
                        Needs verification
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-strong">
                    {pathway.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href={membership.applyUrl} className="btn btn-primary">
              {membership.applyLabel}
            </a>
            <p className="text-xs text-muted-strong">
              Details (fees, eligibility, process) to be confirmed with the association.
            </p>
          </div>
        </div>

        <figure className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-sage">
            <Image
              src={membership.image.src}
              alt={membership.image.alt}
              width={membership.image.width}
              height={membership.image.height}
              sizes="(max-width: 1024px) 100vw, 44vw"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
