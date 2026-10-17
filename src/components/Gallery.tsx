"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gallerySlides } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

/**
 * Winning gallery (section 5E).
 * CSS scroll-snap rail + a small client component. No carousel library.
 * Keyboard: ArrowLeft/ArrowRight when the rail is focused.
 * Swipe/touch: native horizontal scrolling.
 */
export function Gallery() {
  const railRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = gallerySlides.length;

  const scrollToIndex = useCallback(
    (index: number) => {
      const rail = railRef.current;
      if (!rail) return;
      const bounded = Math.min(Math.max(index, 0), total - 1);
      const target = rail.children[bounded];
      if (target instanceof HTMLElement) {
        rail.scrollTo({ left: target.offsetLeft, behavior: "smooth" });
      }
      setActiveIndex(bounded);
    },
    [total],
  );

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = Array.from(rail.children) as HTMLElement[];
        const railLeft = rail.scrollLeft;
        let closest = 0;
        let smallest = Number.POSITIVE_INFINITY;
        slides.forEach((slide, index) => {
          const distance = Math.abs(slide.offsetLeft - railLeft);
          if (distance < smallest) {
            smallest = distance;
            closest = index;
          }
        });
        setActiveIndex(closest);
      });
    };

    rail.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      rail.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollToIndex(activeIndex + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollToIndex(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(total - 1);
    }
  };

  return (
    <section
      id="achievements"
      aria-labelledby="achievements-title"
      className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:py-28"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="achievements-title"
          eyebrow="Honours and milestones"
          title="Our proudest moments"
          lede="Every victory tells a story of teamwork, determination, and pride in representing Uttarakhand."
        />

        <div className="flex items-center gap-3">
          <p
            aria-live="polite"
            className="font-display text-lg font-semibold tabular-nums tracking-[0.12em] text-muted-strong"
          >
            {String(activeIndex + 1).padStart(2, "0")}
            <span className="mx-1 text-eucalyptus">/</span>
            {String(total).padStart(2, "0")}
          </p>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex - 1)}
            disabled={activeIndex === 0}
            aria-label="Previous achievement"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-olive/15 bg-warmwhite text-olive transition-colors hover:bg-sage-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft aria-hidden="true" size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(activeIndex + 1)}
            disabled={activeIndex === total - 1}
            aria-label="Next achievement"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-olive/15 bg-warmwhite text-olive transition-colors hover:bg-sage-soft disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>

      <div
        ref={railRef}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Our proudest moments — use the left and right arrow keys to move between slides"
        className="snap-rail mt-10 gap-5 pb-4 outline-none focus-visible:rounded-[1.75rem]"
      >
        {gallerySlides.map((slide, index) => (
          <article
            key={slide.id}
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${total}`}
            className="w-[86vw] max-w-[26rem] sm:w-[62vw] md:w-[46vw] lg:w-[31rem]"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-sage">
              <Image
                src={slide.image.src}
                alt={slide.image.alt}
                width={slide.image.width}
                height={slide.image.height}
                sizes="(max-width: 640px) 86vw, (max-width: 1024px) 46vw, 31rem"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.03]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-warmwhite/92 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-olive">
                Development placeholder
              </span>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-eucalyptus-strong">
              <span>{slide.tournament}</span>
              <span aria-hidden="true">·</span>
              <span>{slide.year}</span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-semibold uppercase tracking-wide text-olive">
              {slide.title}
            </h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-muted-strong">
              {slide.description}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-2" aria-hidden="true">
        {gallerySlides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            tabIndex={-1}
            onClick={() => scrollToIndex(index)}
            aria-hidden="true"
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeIndex ? "w-8 bg-gold" : "w-4 bg-olive/20 hover:bg-olive/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
