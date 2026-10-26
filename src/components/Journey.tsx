"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { journey, journeyEntries } from "@/content/site";
import { PlaceholderBadge } from "./PlaceholderBadge";

/**
 * Interactive history (section 5H).
 * Clickable year rail + featured detail panel. Selecting a year changes the
 * image AND the text. The rail scrolls inside its own container on mobile.
 * Only the active image is preloaded; the rest lazy-load.
 */
export function Journey() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selected = journeyEntries[selectedIndex];

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const lastIndex = journeyEntries.length - 1;
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = index === lastIndex ? 0 : index + 1;
    else if (event.key === "ArrowLeft") nextIndex = index === 0 ? lastIndex : index - 1;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = lastIndex;

    if (nextIndex !== null) {
      event.preventDefault();
      setSelectedIndex(nextIndex);
      buttonRefs.current[nextIndex]?.focus();
      buttonRefs.current[nextIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  if (!selected) return null;

  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="bg-olive text-warmwhite"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow text-sage">{journey.eyebrow}</p>
            <PlaceholderBadge />
          </div>
          <h2
            id="journey-title"
            className="section-title text-warmwhite"
          >
            {journey.title}
          </h2>
          <p className="max-w-xl text-[1.05rem] leading-relaxed text-warmwhite/75">
            {journey.lede}
          </p>
        </div>

        {/* Year rail: scrolls inside its own container, never the page */}
        <div
          role="tablist"
          aria-label="Timeline years"
          aria-orientation="horizontal"
          className="snap-rail mt-12 gap-3 pb-2"
        >
          {journeyEntries.map((entry, index) => {
            const selectedItem = index === selectedIndex;
            return (
              <button
                key={entry.id}
                ref={(element) => {
                  buttonRefs.current[index] = element;
                }}
                role="tab"
                type="button"
                aria-selected={selectedItem}
                aria-controls="journey-panel"
                id={`journey-tab-${entry.id}`}
                tabIndex={selectedItem ? 0 : -1}
                onClick={() => setSelectedIndex(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
                className={`relative min-h-11 min-w-[6.5rem] rounded-full border px-5 py-3 font-display text-lg font-semibold uppercase tracking-[0.12em] transition-colors ${
                  selectedItem
                    ? "border-gold bg-gold/15 text-warmwhite"
                    : "border-warmwhite/20 text-warmwhite/70 hover:border-warmwhite/40 hover:text-warmwhite"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-1/2 top-[-0.85rem] h-1.5 w-1.5 -translate-x-1/2 rounded-full ${
                    selectedItem ? "bg-gold" : "bg-warmwhite/30"
                  }`}
                />
                {entry.year}
              </button>
            );
          })}
        </div>

        <div
          id="journey-panel"
          role="tabpanel"
          aria-labelledby={`journey-tab-${selected.id}`}
          tabIndex={0}
          className="mt-8 grid items-center gap-8 outline-none lg:grid-cols-2 lg:gap-14"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-eucalyptus/30">
            <Image
              key={selected.id}
              src={selected.image.src}
              alt={selected.image.alt}
              width={selected.image.width}
              height={selected.image.height}
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading={selectedIndex === 0 ? "eager" : "lazy"}
              fetchPriority={selectedIndex === 0 ? "high" : "low"}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <p className="font-display text-2xl font-semibold uppercase tracking-[0.14em] text-gold">
              {selected.year}
            </p>
            <h3 className="mt-3 font-display text-3xl font-semibold uppercase tracking-wide text-warmwhite sm:text-4xl">
              {selected.title}
            </h3>
            <p className="mt-4 text-[1.05rem] leading-relaxed text-warmwhite/78">
              {selected.description}
            </p>
            {!selected.verified && (
              <div className="mt-5">
                <PlaceholderBadge label="Dev placeholder" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
