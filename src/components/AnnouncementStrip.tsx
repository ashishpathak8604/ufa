"use client";

import { useEffect, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type { Notice } from "@/types/notice";
import { safeUrl } from "@/lib/safe-url";

/**
 * Prominent announcement strip (section D).
 * Takes up to 3 latest notices; cycles them every ~6s with controls.
 * Pauses on hover/focus/touch; respects prefers-reduced-motion.
 * Shows NEW badge if published within last 7 days.
 */
export function AnnouncementStrip({ notices }: { notices?: Notice[] | null }) {
  const items = notices && notices.length > 0 ? notices.slice(0, 3) : [];
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced || interacted || items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 6000);
    return () => clearInterval(id);
  }, [reduced, interacted, items.length]);

  if (items.length === 0) {
    return (
      <div className="mx-auto w-full max-w-6xl px-4 py-3">
        <div className="flex items-center justify-center gap-3 rounded-full bg-olive px-5 py-3 text-warmwhite shadow-lift">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-warmwhite/70" aria-hidden="true" />
          <p className="text-sm">No announcements at the moment</p>
        </div>
      </div>
    );
  }

  const notice = items[index];
  if (!notice) return null;
  const href = safeUrl(notice.url) ?? "#notices";
  const isExternal = href.startsWith("http");
  const date = formatDate(notice.publishedAt);
  const isNew = isWithinDays(notice.publishedAt, 7);

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-3">
      <div
        className="group relative rounded-full bg-olive px-3 py-2 text-warmwhite shadow-lift sm:px-5 sm:py-3"
        onMouseEnter={() => setInteracted(true)}
        onFocus={() => setInteracted(true)}
        onTouchStart={() => setInteracted(true)}
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-gold px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-olive sm:text-[0.65rem]">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-olive" aria-hidden="true" />
            LATEST NOTICE
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-sage-soft px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-olive">
            {notice.category}
          </span>

          {notice.isSample && (
            <span className="rounded-full bg-warmwhite/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-warmwhite/90">
              Sample
            </span>
          )}

          {isNew && (
            <span className="rounded-full bg-gold/90 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-olive">
              NEW
            </span>
          )}

          <p className="min-w-0 flex-1 truncate text-sm font-medium sm:text-base">
            <span className="sr-only">Latest announcement: </span>
            {notice.title}
          </p>

          <time dateTime={notice.publishedAt} className="hidden text-xs text-warmwhite/70 sm:block">
            {date}
          </time>

          <a
            href={href}
            {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-sm font-semibold text-olive hover:bg-gold-strong"
          >
            Read Notice →
          </a>

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous notice"
                onClick={() => {
                  setInteracted(true);
                  setIndex((i) => (i - 1 + items.length) % items.length);
                }}
                className="hidden h-10 w-10 items-center justify-center rounded-full bg-warmwhite/10 text-warmwhite transition-colors hover:bg-warmwhite/20 sm:flex"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next notice"
                onClick={() => {
                  setInteracted(true);
                  setIndex((i) => (i + 1) % items.length);
                }}
                className="hidden h-10 w-10 items-center justify-center rounded-full bg-warmwhite/10 text-warmwhite transition-colors hover:bg-warmwhite/20 sm:flex"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
              <span className="ml-1 text-[0.7rem] tabular-nums text-warmwhite/70">
                {index + 1} / {items.length}
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function isWithinDays(value: string, days: number): boolean {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return false;
  const diff = Date.now() - parsed.getTime();
  return diff <= days * 24 * 60 * 60 * 1000;
}
