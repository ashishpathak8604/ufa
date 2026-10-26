/**
 * Integration contract between the public landing page (Ashish) and the
 * backend / admin work (Jagdeep).
 *
 * This file is the single place where the notice shape is defined so it can
 * be changed in one commit once both sides agree on the final fields.
 *
 * The landing page never fetches notices itself: it receives `Notice[]`
 * through props. See lib/notices.ts for the data-access seam.
 */
export type NoticeCategory = string;

export interface Notice {
  id: string;
  title: string;
  category: NoticeCategory;
  /** ISO 8601 date string, e.g. 2026-04-12 or 2026-04-12T09:30:00.000Z */
  publishedAt: string;
  description?: string;
  /** Link to the notice page or PDF. Validated with lib/safe-url.ts. */
  url?: string;
  /** Original/display name of the attachment, e.g. "Referee-circular.pdf". */
  fileName?: string;
  /** true only for mock/sample data — never true for real records. */
  isSample?: boolean;
  /** optional pinned flag for important notices */
  pinned?: boolean;
}
