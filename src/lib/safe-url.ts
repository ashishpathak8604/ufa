/**
 * Safe URL validation for every externally supplied href
 * (notices, social links, partners, policy links).
 *
 * Frontend validation is a hygiene measure, not a security boundary —
 * backend authorisation is Jagdeep's responsibility.
 */

const ALLOWED_PROTOCOLS = new Set(["mailto:", "tel:"]);

type SafeUrlOptions = {
  /** Allow plain http: links. Default false (https only). */
  allowInsecure?: boolean;
};

export function safeUrl(
  raw: string | null | undefined,
  { allowInsecure = process.env.NODE_ENV !== "production" }: SafeUrlOptions = {},
): string | null {
  if (typeof raw !== "string") return null;
  const value = raw.trim();
  if (value === "") return null;

  // Relative paths (same-origin) are always allowed.
  if (value.startsWith("/") && !value.startsWith("//")) {
    return value;
  }

  // Anchor-only links stay on the page.
  if (value.startsWith("#")) {
    return value;
  }

  const lower = value.toLowerCase();

  if (lower.startsWith("javascript:") || lower.startsWith("data:")) {
    return null;
  }

  if (lower.startsWith("mailto:") || lower.startsWith("tel:")) {
    const prefix = lower.slice(0, lower.indexOf(":") + 1);
    if (!ALLOWED_PROTOCOLS.has(prefix)) return null;
    const rest = value.slice(prefix.length);
    // Reject payload trickery such as mailto:a@b.c?body=<script>
    if (/[\s<>"']/.test(rest)) return null;
    return value;
  }

  if (lower.startsWith("https://")) return value;
  if (allowInsecure && lower.startsWith("http://")) return value;

  return null;
}

/** Same as safeUrl but throws nothing — returns a fallback instead. */
export function safeUrlOr(
  raw: string | null | undefined,
  fallback: string,
  options?: SafeUrlOptions,
): string {
  return safeUrl(raw, options) ?? fallback;
}

/** Attributes for an external link: new tab + noopener + noreferrer. */
export const externalLinkProps = {
  target: "_blank",
  rel: "noopener noreferrer",
} as const;
