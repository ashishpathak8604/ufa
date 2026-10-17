"use client";

import { useState } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import { leadership, leaders } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { PlaceholderBadge } from "./PlaceholderBadge";

/**
 * Leadership (section 5G).
 * Asymmetric editorial layout. Selecting a leader updates image, quote, name,
 * and designation together. No names, titles, or quotes are invented.
 */
export function Leadership() {
  const [activeId, setActiveId] = useState(leaders[0]?.id ?? "");
  const active = leaders.find((leader) => leader.id === activeId) ?? leaders[0];

  if (!active) return null;

  return (
    <section
      id="leadership"
      aria-labelledby="leadership-title"
      className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28"
    >
      <SectionHeading
        id="leadership-title"
        eyebrow={leadership.eyebrow}
        title={leadership.title}
        lede={leadership.lede}
      />

      <div className="mt-12 grid items-start gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
        <figure className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-sage shadow-soft">
            <Image
              key={active.id}
              src={active.image.src}
              alt={active.image.alt}
              width={active.image.width}
              height={active.image.height}
              sizes="(max-width: 1024px) 100vw, 38vw"
              loading={active.id === leaders[0]?.id ? "eager" : "lazy"}
              className="h-full w-full object-cover"
            />
          </div>
          <figcaption className="mt-4 flex items-center gap-3">
            <span className="text-xs text-muted-strong">{active.image.alt}</span>
          </figcaption>
        </figure>

        <div className="lg:pt-6">
          <Quote aria-hidden="true" size={30} className="text-gold" />
          <blockquote>
            <p className="mt-5 font-serif text-[1.5rem] leading-[1.45] text-olive sm:text-[1.9rem]">
              {active.quote}
            </p>
          </blockquote>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <p className="font-display text-xl font-semibold uppercase tracking-wide text-olive">
              {active.name}
            </p>
            {!active.verified && <PlaceholderBadge />}
          </div>
          <p className="mt-1 text-sm text-muted-strong">{active.designation}</p>

          <div className="divider my-8" />

          <ul className="flex flex-wrap gap-3">
            {leaders.map((leader) => {
              const selected = leader.id === active.id;
              return (
                <li key={leader.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(leader.id)}
                    aria-pressed={selected}
                    aria-label={`View profile: ${leader.name}, ${leader.designation}`}
                    className={`flex items-center gap-3 rounded-full border p-1.5 pr-4 transition-colors ${
                      selected
                        ? "border-gold bg-gold/10"
                        : "border-olive/15 bg-warmwhite hover:bg-sage-soft"
                    }`}
                  >
                    <Image
                      src={leader.thumb.src}
                      alt=""
                      width={leader.thumb.width}
                      height={leader.thumb.height}
                      sizes="48px"
                      loading="lazy"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <span className="text-left text-xs font-semibold uppercase tracking-[0.14em] text-olive">
                      {leader.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
