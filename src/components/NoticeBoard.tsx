import { CalendarDays, Download, FileText, Inbox, TriangleAlert } from "lucide-react";
import type { Notice } from "@/types/notice";
import { safeUrl } from "@/lib/safe-url";
import { PlaceholderBadge } from "./PlaceholderBadge";

/**
 * Official notices board (section 5F / section 8 contract).
 * Strictly presentational: props only, no fetching. Loading, empty, and error
 * states are all representable so the parent region can drive them.
 */
export function NoticeBoard({
  notices,
  loading = false,
  error = null,
}: {
  notices: Notice[];
  loading?: boolean;
  error?: string | null;
}) {
  if (loading) return <NoticeSkeleton />;

  if (error) {
    return (
      <div className="flex items-start gap-3 rounded-[1.5rem] bg-rose-soft/60 p-5">
        <TriangleAlert aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-olive" />
        <div>
          <p className="text-sm font-semibold text-olive">Notices are unavailable</p>
          <p className="mt-1 text-sm text-muted-strong">{error}</p>
        </div>
      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <div className="flex items-start gap-3 rounded-[1.5rem] bg-sage-soft p-5">
        <Inbox aria-hidden="true" size={18} className="mt-0.5 shrink-0 text-eucalyptus-strong" />
        <div>
          <p className="text-sm font-semibold text-olive">No notices published yet</p>
          <p className="mt-1 text-sm text-muted-strong">
            Official circulars and announcements will appear here once published by the association.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ul className="divide-y divide-olive/10">
        {notices.map((notice) => {
          const href = safeUrl(notice.url);
          const isExternal = href?.startsWith("http") ?? false;

          return (
            <li key={notice.id} className="py-5 first:pt-0 last:pb-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-eucalyptus-strong">
                  <FileText aria-hidden="true" size={13} />
                  {notice.category}
                </span>
                <time
                  dateTime={notice.publishedAt}
                  className="inline-flex items-center gap-1.5 text-xs text-muted-strong"
                >
                  <CalendarDays aria-hidden="true" size={13} />
                  {formatDate(notice.publishedAt)}
                </time>
                {notice.isSample && (
                  <span className="rounded-full bg-sage px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-olive">
                    Sample
                  </span>
                )}
                {!notice.isSample && <PlaceholderBadge label="Unverified" />}
              </div>

              <h3 className="mt-2 text-[1.05rem] font-semibold leading-snug text-olive">
                {notice.title}
              </h3>

              {notice.description && (
                <p className="mt-1.5 text-sm leading-relaxed text-muted-strong">
                  {notice.description}
                </p>
              )}

              {href && (
                <a
                  href={href}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-gold-strong hover:underline"
                >
                  <Download aria-hidden="true" size={15} />
                  Read / Download
                  {isExternal && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              )}
            </li>
          );
        })}
      </ul>

      <a
        href="#official-notices"
        className="mt-6 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-olive hover:underline"
      >
        View all circulars
        <span className="sr-only"> (placeholder link)</span>
      </a>
    </div>
  );
}

export function NoticeSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite" className="space-y-5">
      <span className="sr-only">Loading notices…</span>
      {[0, 1, 2].map((row) => (
        <div key={row} className="space-y-2.5">
          <div className="h-3 w-32 animate-pulse rounded-full bg-olive/10" />
          <div className="h-4 w-4/5 animate-pulse rounded-full bg-olive/10" />
          <div className="h-3 w-3/5 animate-pulse rounded-full bg-olive/10" />
        </div>
      ))}
    </div>
  );
}

function formatDate(value: string): string {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
