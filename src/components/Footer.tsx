import Image from "next/image";
import Link from "next/link";
import { externalLinkProps, safeUrl } from "@/lib/safe-url";
import { footer, site } from "@/content/site";

/**
 * Footer (section 5L). Premium dark (#33372F). Copyright line uses the current
 * year computed at build. All contact/socials use safeUrl.
 */
export function Footer() {
  const year = new Date().getFullYear().toString();

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
                height={36}
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
            <ul className="mt-4 flex flex-col gap-2 text-sm text-warmwhite/75">
              {footer.contact.map((item) => (
                <li key={item.label}>
                  <span className="block font-semibold text-warmwhite/90">
                    {item.label}
                  </span>
                  <span className="block break-words">{item.value}</span>
                  {!item.verified && (
                    <span className="mt-1 inline-flex w-fit rounded-full border border-warmwhite/20 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-warmwhite/60">
                      Placeholder
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <h2 className="mt-6 font-display text-sm font-semibold uppercase tracking-[0.16em] text-warmwhite">
              Socials
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {footer.socials.map((item) => {
                const href = safeUrl(item.url);
                if (!href) return null;
                const isExternal = href.startsWith("http");
                return (
                  <li key={item.id}>
                    <a
                      href={href}
                      {...(isExternal ? externalLinkProps : {})}
                      className="inline-flex min-h-11 items-center rounded-full border border-warmwhite/25 px-4 text-xs font-semibold uppercase tracking-[0.14em] text-warmwhite/80 transition-colors hover:border-warmwhite/50 hover:text-warmwhite"
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>

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
            © {year} Uttarakhand Football Association. All rights reserved.{" "}
            <span className="inline-block">
              This is a development build awaiting client-supplied copy and photographs.
            </span>
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
