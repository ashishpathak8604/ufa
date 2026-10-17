"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, FileText, ExternalLink } from "lucide-react";
import type { HeroAnnouncement } from "@/types/hero-announcement";
import { safeUrl } from "@/lib/safe-url";

/**
 * Independent hero announcement board positioned immediately below the hero.
 * Larger, more noticeable than a ticker. Manual controls by default; gentle
 * autoplay that pauses on interaction. Respects prefers-reduced-motion.
 * Never shares state with Match Centre notices.
 */
export function HeroAnnouncementBoard({
  announcements,
  loading = false,
  error = null,
}: {
  announcements: HeroAnnouncement[];
  loading?: boolean;
  error?: string | null;
}) {
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [interacted, setInteracted] = useState(false);
  const items = announcements.slice(0, 5);

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

  if (loading) {
    return (
      <section id="announcements" aria-label="Association announcements" className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="h-[140px] animate-pulse rounded-[2rem] bg-sage-soft" />
      </section>
    );
  }

  if (error) {
    return (
      <section id="announcements" aria-label="Association announcements" className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="rounded-[2rem] bg-olive p-6 text-warmwhite shadow-soft">
          <p className="text-sm font-semibold">Announcements are temporarily unavailable</p>
          <p className="mt-1 text-sm text-warmwhite/70">Please try again later.</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section id="announcements" aria-label="Association announcements" className="mx-auto w-full max-w-6xl px-4 py-6">
        <div className="rounded-[2rem] bg-warmwhite p-6 shadow-soft">
          <p className="text-sm text-muted-strong">No announcements at the moment</p>
        </div>
      </section>
    );
  }

  const item = items[index];
  if (!item) return null;
  const href = safeUrl(item.url);
  const isExternal = href?.startsWith("http") ?? false;

  return (
    <section
      id="announcements"
      aria-label="Association announcements"
      className="mx-auto w-full max-w-6xl px-4 py-6"
      onMouseEnter={() => setInteracted(true)}
        onFocus={() => setInteracted(true)}
        onTouchStart={() => setInteracted(true)}
    >
      <div className="relative rounded-[2rem] bg-warmwhite p-6 shadow-soft sm:p-8">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex items-center gap-2 rounded-full bg-sage-soft px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-eucalyptus-strong">
            <FileText size={14} aria-hidden="true" />
            ASSOCIATION ANNOUNCEMENT
          </div>

          {items.length > 1 && (
            <div className="ml-auto flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous announcement"
                onClick={() => {
                  setInteracted(true);
                  setIndex((i) => (i - 1 + items.length) % items.length);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-olive/15 bg-warmwhite text-olive transition-colors hover:bg-sage-soft"
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <span className="text-xs tabular-nums text-muted-strong">
                {index + 1} / {items.length}
              </span>
              <button
                type="button"
                aria-label="Next announcement"
                onClick={() => {
                  setInteracted(true);
                  setIndex((i) => (i + 1) % items.length);
                }}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-olive/15 bg-warmwhite text-olive transition-colors hover:bg-sage-soft"
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-4 space-y-2">
          <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-olive sm:text-3xl lg:text-4xl">
            {item.title}
          </h3>
          <p className="text-base leading-relaxed text-muted-strong sm:text-lg">{item.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-muted-strong">
          <time dateTime={item.publishedAt}>
            {new Date(item.publishedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
          </time>
          {item.category && <span>· {item.category}</span>}
          {item.isSample && <span className="rounded-full bg-sage px-2 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-olive">Sample</span>}
        </div>

        {href && (
          <div className="mt-6">
            <a
              href={href}
              {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-gold px-6 py-2 text-sm font-semibold text-olive hover:bg-gold-strong"
            >
              Read Announcement
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
