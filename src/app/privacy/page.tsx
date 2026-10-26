import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-5 px-5 py-16 sm:px-8">
      <h1 className="font-display text-3xl font-semibold uppercase tracking-wide text-olive">
        Privacy Policy
      </h1>
      <p className="text-sm leading-relaxed text-muted-strong">
        This is a placeholder privacy policy page for the Uttarakhand Football Association public
        landing site. Replace with the association’s approved policy before publication.
      </p>
      <p className="text-sm leading-relaxed text-muted-strong">
        No personal data is collected or processed by this application.
      </p>
      <a href="/" className="mt-6 inline-flex text-sm font-semibold text-gold-strong hover:underline">
        Return to home
      </a>
    </main>
  );
}
