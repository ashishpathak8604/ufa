import type { Notice } from "@/types/notice";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabasePublicClient } from "@/lib/supabase/public";
import { PUBLIC_NOTICE_LIMIT } from "@/lib/notice-db/constants";
import { rowToNotice } from "@/lib/notice-db/mappers";
import { fetchNoticeRows } from "@/lib/notice-db/queries";

/**
 * Data-access seam for public notices.
 *
 * OWNER: Jagdeep (backend).
 *
 * The landing page receives database-backed notices when Supabase is
 * configured. Development without credentials retains clearly flagged samples.
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
export function createDatabaseSource(): NoticeSource { return { name: "supabase", async getNotices() { return (await fetchNoticeRows(createSupabasePublicClient(), PUBLIC_NOTICE_LIMIT)).map(rowToNotice); } }; }

function pickDefaultSource(): NoticeSource {
  if (hasSupabaseEnv()) return createDatabaseSource();
  if (process.env.NODE_ENV === "production") return { name: "misconfigured", async getNotices() { console.error("[notices] SUPABASE_URL / SUPABASE_ANON_KEY are not set"); throw new Error("Supabase is not configured."); } };
  return staticSampleSource;
}

export async function getNotices(
  source: NoticeSource = pickDefaultSource(),
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
