/**
 * Development-only marker for content that still needs client confirmation.
 * Renders nothing in production builds.
 */
export function PlaceholderBadge({ label = "Placeholder" }: { label?: string }) {
  if (process.env.NODE_ENV === "production") return null;

  return (
    <span
      className="pointer-events-none inline-flex items-center rounded-full border border-eucalyptus/40 bg-sage-soft px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-eucalyptus-strong"
      title="This content is a development placeholder awaiting client confirmation"
    >
      {label}
    </span>
  );
}
