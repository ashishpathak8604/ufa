import Image from "next/image";
import { externalLinkProps, safeUrl } from "@/lib/safe-url";
import { footer, site } from "@/content/site";
import {
  FaXTwitter,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

const socialIcons = {
  x: FaXTwitter,
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
} as const;

/**
 * Footer (section 5L). Premium dark (#33372F). Copyright line uses the current
 * year computed at build. All contact/socials use safeUrl.
 */
export function Footer() {
  const year = new Date().getFullYear().toString();
  const socials = footer.socials.flatMap((item) => {
    const href = safeUrl(item.url);
    if (!href) return [];

    try {
      const hostname = new URL(href).hostname;
      if (hostname === "example.com" || hostname.endsWith(".example.com")) {
        return [];
      }
    } catch {
      return [];
    }

    const Icon = socialIcons[item.id as keyof typeof socialIcons];
    if (!Icon) return [];

    return [{ ...item, href, Icon }];
  });

  return (
    <footer id="contact" className="bg-olive text-warmwhite">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <Image
                src={site.logo.src}
                alt=""
                width={72}
                height={70}
                className="h-8 w-auto opacity-90"
                loading="lazy"
              />
              <span className="font-display text-lg font-semibold uppercase tracking-[0.18em]">
                {site.shortName}
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-warmwhite/75">
              {footer.intro}
            </p>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-warmwhite">
              Quick links
            </h2>
            <ul className="mt-4 flex flex-col gap-2">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-warmwhite/75 transition-colors hover:text-warmwhite"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-warmwhite">
              Office bearers
            </h2>
            <ul className="mt-4 flex flex-col gap-2 text-sm text-warmwhite/75">
              {footer.officeBearers.map((item) => (
                <li key={item.role} className="flex flex-col">
                  <span className="font-semibold text-warmwhite/90">{item.role}</span>
                  <span>{item.name}</span>
                  {!item.verified && (
                    <span className="mt-1 inline-flex w-fit rounded-full border border-warmwhite/20 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-warmwhite/60">
                      Placeholder
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-warmwhite">
              Contact
            </h2>
           <ul className="mt-4 flex flex-col gap-3 text-sm text-warmwhite/75">
  {footer.contact.map((item) => {
    const isPhone = item.label.toLowerCase() === "phone";
    const isEmail = item.label.toLowerCase() === "email";
    const isAddress = item.label.toLowerCase() === "address";

    const value = item.value;

    const href = isPhone
      ? `tel:${value.replace(/[^\d+]/g, "")}`
      : isEmail
        ? `mailto:${value}`
        : isAddress
          ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`
          : null;

    return (
      <li key={item.label}>
        <span className="block font-semibold text-warmwhite/90">
          {item.label}
        </span>

        {href ? (
          <a
            href={href}
            {...(isAddress
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="block break-words transition-colors duration-200 hover:text-gold hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-olive"
          >
            {value}
          </a>
        ) : (
          <span className="block break-words">{value}</span>
        )}

        {!item.verified && (
          <span className="mt-1 inline-flex w-fit rounded-full border border-warmwhite/20 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-warmwhite/60">
            Placeholder
          </span>
        )}
      </li>
    );
  })}
</ul>

            {socials.length > 0 && (
              <>
                <h2 className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.16em] text-warmwhite">
                  Follow Us
                </h2>

                <ul className="mt-3 flex flex-wrap gap-3">
                  {socials.map(({ id, label, href, Icon }) => (
                    <li key={id}>
                      <a
                        href={href}
                        {...(href.startsWith("http") ? externalLinkProps : {})}
                        aria-label={label}
                        title={label}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-warmwhite/20 text-warmwhite/80 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-olive focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                      >
                        <Icon size={19} aria-hidden="true" />
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <h2 className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.16em] text-warmwhite">
              Policies
            </h2>
            <ul className="mt-3 flex flex-wrap gap-3 text-xs text-warmwhite/70">
              {footer.policies.map((policy) => {
                const href = safeUrl(policy.href);
                return href ? (
                  <li key={policy.label}>
                    <a href={href} className="hover:text-warmwhite">
                      {policy.label}
                    </a>
                  </li>
                ) : null;
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-warmwhite/10 pt-6 text-sm text-warmwhite/60">
          <p>
            © {year} Uttrakhand Football Association. All rights reserved.{" "}
            
          </p>
          {/* <Link
            href={footer.admin.href}
            className="ml-auto inline-flex min-h-11 items-center font-semibold text-warmwhite/70 transition-colors hover:text-warmwhite"
          >
            {footer.admin.label}
          </Link> */}
        </div>
      </div>
    </footer>
  );
}
