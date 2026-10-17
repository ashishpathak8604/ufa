import type { Notice } from "@/types/notice";

/**
 * Data-access seam for public notices.
 *
 * OWNER: Jagdeep (backend).
 *
 * The landing page only ever calls `getNotices()` from a React Server
 * Component and passes the result down as props. To wire real data, replace
 * the body of `createDatabaseSource()` (and the default export below) with a
 * Supabase query. Nothing else in the frontend needs to change.
 *
 * Behaviour today:
 *  - production  -> returns [] so the UI shows the honest empty state
 *  - development -> returns clearly flagged sample data (isSample: true)
 *
 * The `NoticeSource` interface exists so a remote source, a cache, or a
 * static file can be swapped in without touching components.
 */
export interface NoticeSource {
  name: string;
  getNotices(): Promise<Notice[]>;
}

const SAMPLE_NOTICES: Notice[] = [
  {
    id: "sample-001",
    title: "Sample notice — replace with the client's official circular",
    category: "General",
    publishedAt: "2026-01-15",
    description:
      "Development placeholder shown only while the notice database is being connected. This is not an official announcement.",
    url: "#notices",
    isSample: true,
  },
  {
    id: "sample-002",
    title: "Sample notice — registration window placeholder",
    category: "Registration",
    publishedAt: "2025-12-02",
    description:
      "Second development placeholder. Real circulars will be published from the admin dashboard.",
    url: "#notices",
    isSample: true,
  },
  {
    id: "sample-003",
    title: "Sample notice — competition circular placeholder",
    category: "Competition",
    publishedAt: "2025-11-18",
    url: "#notices",
    isSample: true,
  },
];

export const staticSampleSource: NoticeSource = {
  name: "static-sample",
  async getNotices() {
    return SAMPLE_NOTICES;
  },
};

export const emptySource: NoticeSource = {
  name: "empty",
  async getNotices() {
    return [];
  },
};

/**
 * Jagdeep: replace this function body with a Supabase (or other) query and
 * return real Notice records. Keep the return type `Promise<Notice[]>`.
 */
export function createDatabaseSource(): NoticeSource {
  return emptySource;
}

const defaultSource: NoticeSource =
  process.env.NODE_ENV === "production"
    ? createDatabaseSource()
    : staticSampleSource;

export async function getNotices(
  source: NoticeSource = defaultSource,
): Promise<Notice[]> {
  try {
    const notices = await source.getNotices();
    // Defensive: never let a malformed record reach the UI.
    if (!Array.isArray(notices)) return [];
    return notices.filter(
      (n) =>
        n !== null &&
        typeof n === "object" &&
        typeof n.id === "string" &&
        typeof n.title === "string" &&
        typeof n.publishedAt === "string",
    );
  } catch {
    // The page must still render; the notices region surfaces an error state.
    throw new Error("Notices could not be loaded.");
  }
}
