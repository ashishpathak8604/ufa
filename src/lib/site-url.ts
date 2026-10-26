const PLACEHOLDER_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "example.com",
  "example.org",
  "example.net",
]);

function toUrl(value: string): URL | null {
  const trimmed = value.trim();
  if (!trimmed) return null;

  try {
    return new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
  } catch {
    return null;
  }
}

function isPlaceholderHost(hostname: string): boolean {
  return (
    PLACEHOLDER_HOSTS.has(hostname) ||
    hostname.endsWith(".local") ||
    hostname.endsWith(".example.com")
  );
}

export function getSiteUrl(): URL {
  const configured = toUrl(process.env.NEXT_PUBLIC_SITE_URL ?? "");
  const vercelProduction = toUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "");
  const vercelDeployment = toUrl(
    process.env.VERCEL_BRANCH_URL ?? process.env.VERCEL_URL ?? "",
  );

  const candidate =
    configured && !isPlaceholderHost(configured.hostname)
      ? configured
      : vercelProduction ?? vercelDeployment ?? configured;

  return new URL((candidate ?? new URL("http://localhost:3000")).origin);
}

export function isIndexableSite(): boolean {
  if (process.env.VERCEL_ENV) {
    return process.env.VERCEL_ENV === "production";
  }

  if (process.env.NODE_ENV !== "production") {
    return false;
  }

  return !isPlaceholderHost(getSiteUrl().hostname);
}
