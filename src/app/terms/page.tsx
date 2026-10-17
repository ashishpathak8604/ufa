import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
};

export default function TermsPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-5 px-5 py-16 sm:px-8">
      <h1 className="font-display text-3xl font-semibold uppercase tracking-wide text-olive">
        Terms of Use
      </h1>
      <p className="text-sm leading-relaxed text-muted-strong">
        This is a placeholder terms of use page for the Uttarakhand Football Association public
        landing site. Replace with the association’s approved terms before publication.
      </p>
      <p className="text-sm leading-relaxed text-muted-strong">
        The content on this site is provided for general information. Unverified items are clearly
        marked in development and are awaiting client confirmation.
      </p>
      <a href="/" className="mt-6 inline-flex text-sm font-semibold text-gold-strong hover:underline">
        Return to home
      </a>
    </main>
  );
}
