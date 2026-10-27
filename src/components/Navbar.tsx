"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { JOIN_UFA_URL, navItems, site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * Floating capsule navigation (section 5A).
 * Never becomes a full-width bar: only background opacity and shadow refine
 * on scroll. Mobile menu keeps the page scrollable (no body lock) so nothing
 * gets trapped behind an overlay.
 */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    // Move focus into the menu so keyboard users are not stranded.
    firstLinkRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const closeMenu = () => setOpen(false);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-3 sm:px-4 sm:pt-4">
      <nav
        aria-label="Primary"
        className={cn(
          "pointer-events-auto relative w-full max-w-6xl rounded-full border border-olive/10 bg-warmwhite/80 backdrop-blur-xl transition-[box-shadow,background-color] duration-300",
          scrolled
            ? "bg-warmwhite/95 shadow-lift"
            : "shadow-soft",
        )}
      >
        <div className="flex h-14 items-center justify-between gap-3 px-3 sm:h-16 sm:px-5">
          <Link
            href="#home"
            className="flex min-h-11 items-center gap-2.5 rounded-full pr-2"
            onClick={closeMenu}
          >
            <Image
              src={site.logo.src}
              alt=""
                width={100}
               height={100}
              className="h-15 w-auto"
              priority={false}
            />
            <span className="font-display text-lg font-semibold uppercase tracking-[0.18em] text-olive">
              {site.shortName}
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-olive/80 transition-colors hover:text-olive"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={JOIN_UFA_URL}
              className="btn btn-primary hidden min-h-11 px-5 py-2.5 text-sm sm:inline-flex"
            >
              Join UFA
            </a>

            <button
              ref={toggleRef}
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-olive/15 bg-warmwhite text-olive lg:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile panel: sits under the capsule, page stays scrollable. */}
        <div
          id={menuId}
          hidden={!open}
          className="absolute left-0 right-0 top-full mt-2 overflow-hidden rounded-[1.75rem] border border-olive/10 bg-warmwhite/97 shadow-lift backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col gap-1 p-3">
            {navItems.map((item, index) => (
              <li key={item.href}>
                <a
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex min-h-11 items-center rounded-2xl px-4 text-[0.95rem] font-medium text-olive transition-colors hover:bg-sage-soft"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={JOIN_UFA_URL}
                onClick={closeMenu}
                className="btn btn-primary mt-1 w-full"
              >
                Join USFA
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
