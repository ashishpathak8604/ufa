import Image from "next/image";
import { development } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

/**
 * Football development (section 5J).
 * Clean image grid. No invented statistics or programme claims.
 */
export function Development() {
  return (
    <section
      aria-labelledby="development-title"
      className="bg-sage-soft/70"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <SectionHeading
          id="development-title"
          eyebrow={development.eyebrow}
          title={development.title}
          lede={development.lede}
          align="center"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {development.cards.map((card) => (
            <article key={card.id} className="card overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src={card.image.src}
                  alt={card.image.alt}
                  width={card.image.width}
                  height={card.image.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-olive">
                    {card.title}
                  </h3>
                  {!card.verified && (
                    <span className="rounded-full border border-eucalyptus/30 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-eucalyptus-strong">
                      Needs verification
                    </span>
                  )}
                </div>
                <p className="text-sm leading-relaxed text-muted-strong">
                  {card.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
