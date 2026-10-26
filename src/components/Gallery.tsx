"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { gallerySlides } from "@/content/site";
import { SectionHeading } from "./SectionHeading";

/**
 * Winning gallery (section 5E).
 * Continuously moving, seamless infinite carousel (marquee style).
 * The slides are rendered twice; the track slides left forever and wraps
 * back to the start without any visible jump, so slide 1 follows the last
 * slide with no gap or reset.
 *
 * - Auto-moves constantly (SPEED px/second).
 * - Pauses on hover, touch and keyboard focus so people can read.
 * - Respects prefers-reduced-motion (no auto movement).
 * - Arrow buttons / ArrowLeft / ArrowRight nudge by one slide.
 */

const SPEED = 40; // pixels per second

export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCopyRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0); // current scroll offset inside one copy
  const nudgeRef = useRef(0); // remaining manual movement (eased out)
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState(0);

  const total = gallerySlides.length;

  /** Move by a number of pixels (positive = forward, negative = back). */
  const nudgeBy = useCallback((pixels: number) => {
    nudgeRef.current += pixels;
  }, []);

  /** Width of one slide including the gap, used for arrow steps. */
  const getStep = useCallback(() => {
    const first = firstCopyRef.current?.children[0];
    const second = firstCopyRef.current?.children[1];

    if (first instanceof HTMLElement && second instanceof HTMLElement) {
      return second.offsetLeft - first.offsetLeft;
    }
    if (first instanceof HTMLElement) return first.offsetWidth;
    return 0;
  }, []);

  const goNext = useCallback(() => nudgeBy(getStep()), [nudgeBy, getStep]);
  const goPrevious = useCallback(() => nudgeBy(-getStep()), [nudgeBy, getStep]);

  const scrollToIndex = useCallback((index: number) => {
    const copy = firstCopyRef.current;
    if (!copy) return;

    const target = copy.children[index];
    if (!(target instanceof HTMLElement)) return;

    const loop = copy.offsetWidth;
    if (loop === 0) return;

    // Shortest path to the chosen slide (forward or backward).
    let delta = target.offsetLeft - offsetRef.current;
    if (delta > loop / 2) delta -= loop;
    if (delta < -loop / 2) delta += loop;

    nudgeRef.current = delta;
  }, []);

  // Respect "reduce motion" setting.
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = media.matches;

    const onChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // The animation loop.
  useEffect(() => {
    const track = trackRef.current;
    const firstCopy = firstCopyRef.current;
    if (!track || !firstCopy || total === 0) return;

    let frame = 0;
    let last = 0;

    const tick = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;

      const loop = firstCopy.offsetWidth;

      if (loop > 0) {
        // Constant automatic movement.
        if (!pausedRef.current && !reducedMotionRef.current) {
          offsetRef.current += SPEED * dt;
        }

        // Smoothly consume manual movement (arrows / dots / keyboard).
        if (Math.abs(nudgeRef.current) > 0.5) {
          const step = nudgeRef.current * 0.12;
          offsetRef.current += step;
          nudgeRef.current -= step;
        } else {
          nudgeRef.current = 0;
        }

        // Wrap seamlessly: copy two is identical to copy one.
        offsetRef.current = ((offsetRef.current % loop) + loop) % loop;

        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;

        // Work out which slide is closest to the left edge.
        const slides = Array.from(firstCopy.children) as HTMLElement[];
        let closest = 0;
        let smallest = Number.POSITIVE_INFINITY;

        slides.forEach((slide, index) => {
          let distance = Math.abs(slide.offsetLeft - offsetRef.current);
          distance = Math.min(distance, loop - distance); // wrap-around distance

          if (distance < smallest) {
            smallest = distance;
            closest = index;
          }
        });

        setActiveIndex(closest);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [total]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrevious();
    } else if (event.key === "Home") {
      event.preventDefault();
      scrollToIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      scrollToIndex(total - 1);
    }
  };

  const renderSlides = (isClone: boolean) =>
    gallerySlides.map((slide, index) => (
      <article
        key={`${isClone ? "clone" : "main"}-${slide.id}`}
        aria-roledescription="slide"
        aria-label={`${index + 1} of ${total}`}
        className="w-[86vw] max-w-[26rem] shrink-0 sm:w-[62vw] md:w-[46vw] lg:w-[31rem]"
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-sage">
          <Image
            src={slide.image.src}
            alt={isClone ? "" : slide.image.alt}
            width={slide.image.width}
            height={slide.image.height}
            sizes="(max-width: 640px) 86vw, (max-width: 1024px) 46vw, 31rem"
            loading={!isClone && index === 0 ? "eager" : "lazy"}
            fetchPriority={!isClone && index === 0 ? "high" : "low"}
            draggable={false}
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
    ));

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
            aria-live="off"
            className="font-display text-lg font-semibold tabular-nums tracking-[0.12em] text-muted-strong"
          >
            {String(activeIndex + 1).padStart(2, "0")}
            <span className="mx-1 text-eucalyptus">/</span>
            {String(total).padStart(2, "0")}
          </p>

          <button
            type="button"
            onClick={goPrevious}
            aria-label="Previous gallery slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-olive/15 bg-warmwhite text-olive transition-colors hover:bg-sage-soft"
          >
            <ArrowLeft aria-hidden="true" size={18} />
          </button>

          <button
            type="button"
            onClick={goNext}
            aria-label="Next gallery slide"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-olive/15 bg-warmwhite text-olive transition-colors hover:bg-sage-soft"
          >
            <ArrowRight aria-hidden="true" size={18} />
          </button>
        </div>
      </div>

      <div
        onKeyDown={onKeyDown}
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
        onTouchCancel={resume}
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label="Our proudest moments — the gallery moves continuously; hover or focus to pause, use the left and right arrow keys to move"
        className="mt-10 overflow-hidden pb-4 outline-none focus-visible:rounded-[1.75rem]"
      >
        <div
          ref={trackRef}
          className="flex w-max will-change-transform"
        >
          {/* Copy 1 — the real slides. pr-5 keeps the gap at the loop seam. */}
          <div ref={firstCopyRef} className="flex gap-5 pr-5">
            {renderSlides(false)}
          </div>

          {/* Copy 2 — identical clone that makes the loop seamless. */}
          <div className="flex gap-5 pr-5" aria-hidden="true">
            {renderSlides(true)}
          </div>
        </div>
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
              index === activeIndex
                ? "w-8 bg-gold"
                : "w-4 bg-olive/20 hover:bg-olive/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}