import { ribbon } from "@/content/site";
import { PlaceholderBadge } from "./PlaceholderBadge";

/**
 * Affiliation marquee (section C).
 * Continuously scrolling CSS marquee: duplicate text twice,
 * animate translateX(-50%) to (0) with linear infinite.
 * Respects prefers-reduced-motion; pauses on hover/focus-within.
 */
export function AffiliationRibbon() {
  const text = ribbon.text;
  return (
    <section
      aria-label="Affiliation information"
      className="relative border-y border-olive/10 bg-sage-soft"
    >
      <div className="sr-only">{text}</div>
      <div
        className="mx-auto flex overflow-hidden py-2.5 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-olive sm:py-3 sm:text-[0.75rem]"
        style={
          {
            // CSS variable drives speed (40-60s full cycle)
            "--marquee-duration": "48s",
          } as React.CSSProperties
        }
      >
        <div
          aria-hidden="true"
          className="marquee-track group flex min-w-full items-center gap-3 whitespace-nowrap will-change-transform motion-reduce:animate-none group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
          style={{ animation: "marquee var(--marquee-duration) linear infinite" }}
        >
          <span className="flex items-center gap-3">
            {text.split("·").map((part, idx, arr) => (
              <span key={idx} className="flex items-center gap-3">
                <span>{part.trim()}</span>
                {idx < arr.length - 1 && (
                  <span aria-hidden="true" className="text-gold-strong">•</span>
                )}
              </span>
            ))}
          </span>
          <span className="flex items-center gap-3">
            {text.split("·").map((part, idx, arr) => (
              <span key={idx} className="flex items-center gap-3">
                <span>{part.trim()}</span>
                {idx < arr.length - 1 && (
                  <span aria-hidden="true" className="text-gold-strong">•</span>
                )}
              </span>
            ))}
          </span>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-sage-soft to-transparent sm:w-16"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-sage-soft to-transparent sm:w-16"
        />
      </div>
      <div className="absolute -bottom-2 left-4 sm:left-8">
        {!ribbon.verified && <PlaceholderBadge />}
      </div>
    </section>
  );
}
