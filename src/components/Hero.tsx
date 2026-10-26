import Image from "next/image";
import { hero } from "@/content/site";


/**
 * Cinematic hero (section 5B).
 * Server Component — entrance animation is CSS-only and every element is
 * fully visible if animation or JS fails (animation is decorative only).
 * The image is the LCP element: priority, fetchPriority="high", never lazy.
 */
export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate flex min-h-[92svh] w-full items-end overflow-hidden bg-olive sm:min-h-[94svh]"
    >
     <Image
  src={hero.image.src}
  alt={hero.image.alt}
  width={hero.image.width}
  height={hero.image.height}
  priority
  fetchPriority="high"
  sizes="100vw"
  quality={80}
  className="hero-image-zoom absolute inset-0 -z-10 h-full w-full object-cover object-center"
/>

      {/* Localised contrast gradient — text area only, never a full overlay. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-[78%] bg-[linear-gradient(to_top,rgba(31,34,28,0.88)_0%,rgba(31,34,28,0.62)_38%,rgba(31,34,28,0.16)_70%,rgba(31,34,28,0)_100%)] sm:h-[70%] sm:bg-[linear-gradient(to_top,rgba(31,34,28,0.86)_0%,rgba(31,34,28,0.55)_42%,rgba(31,34,28,0.1)_78%,rgba(31,34,28,0)_100%)]"
      />
      {/* Soft black overlay behind hero text only */}
<div
  aria-hidden="true"
  className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.22)_35%,transparent_70%)]"
/>

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-14 pt-36 sm:px-8 sm:pb-20 lg:pb-24">
        <div className="max-w-3xl">
         

          <h1
            id="hero-heading"
            className="display-heading fade-rise fade-rise-delay-1 mt-5  text-warmwhite [font-size:clamp(2.75rem,1.1rem+8vw,6.5rem)]"
          >
            {hero.headlineLines.map((line, index) => (
              <span
                key={line}
                className={index === hero.goldLineIndex ? "block text-gold" : "block"}
              >
                {line}
              </span>
            ))}
          </h1>

          <p className="fade-rise fade-rise-delay-2 mt-6 max-w-xl text-base leading-relaxed text-warmwhite/85 [font-size:clamp(1rem,0.95rem+0.3vw,1.15rem)] sm:text-lg">
            {hero.body}
          </p>

          <div className="fade-rise fade-rise-delay-3 mt-8 flex flex-wrap gap-3">
            <a href={hero.primaryCta.href} className="btn btn-primary">
              {hero.primaryCta.label}
            </a>
            <a href={hero.secondaryCta.href} className="btn btn-secondary">
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
