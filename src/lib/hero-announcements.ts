import type { HeroAnnouncement } from "@/types/hero-announcement";

/**
 * Data-access seam for the Hero Announcement Board (independent of
 * Match Centre notices in lib/notices.ts).
 *
 * OWNER: Jagdeep (backend).
 *
 * The landing page only calls `getHeroAnnouncements()` from a Server
 * Component and passes the result as props. To wire real data, replace the
 * body of `createDatabaseSource()` with a Supabase (or other) query. Nothing
 * else in the frontend needs to change.
 *
 * Behaviour today:
 *  - production  -> returns [] so the UI shows the honest empty state
 *  - development -> returns clearly flagged sample data (isSample: true)
 */
export interface HeroAnnouncementSource {
  name: string;
  getHeroAnnouncements(): Promise<HeroAnnouncement[]>;
}

const SAMPLE_ANNOUNCEMENTS: HeroAnnouncement[] = [
  {
    id: "sample-announcement-001",
    title: "Sample announcement — replace with the administrator's published notice",
    description:
      "Development placeholder shown only while the announcement backend is being connected. This is not an official association announcement.",
    category: "General",
    publishedAt: new Date().toISOString().slice(0, 10),
    url: null,
    isSample: true,
  },
  {
    id: "sample-announcement-002",
    title: "Sample announcement — registration window placeholder",
    description:
      "Second development placeholder. Real announcements will be published from the admin dashboard once integrated.",
    category: "Registration",
    publishedAt: "2025-12-02",
    url: null,
    isSample: true,
  },
  {
    id: "sample-announcement-003",
    title: "Sample announcement — tournament announcement placeholder",
    description:
      "Third development placeholder demonstrating multi-announcement navigation. Not official information.",
    category: "Tournament",
    publishedAt: "2025-11-18",
    url: null,
    isSample: true,
  },
];

export const staticSampleSource: HeroAnnouncementSource = {
  name: "static-sample",
  async getHeroAnnouncements() {
    return SAMPLE_ANNOUNCEMENTS;
  },
};

export const emptySource: HeroAnnouncementSource = {
  name: "empty",
  async getHeroAnnouncements() {
    return [];
  },
};

/**
 * Jagdeep: replace this function body with a real database query and return
 * HeroAnnouncement records. Keep the return type Promise<HeroAnnouncement[]>.
 */
export function createDatabaseSource(): HeroAnnouncementSource {
  return emptySource;
}

const defaultSource: HeroAnnouncementSource =
  process.env.NODE_ENV === "production"
    ? createDatabaseSource()
    : staticSampleSource;

export async function getHeroAnnouncements(
  source: HeroAnnouncementSource = defaultSource,
): Promise<HeroAnnouncement[]> {
  try {
    const announcements = await source.getHeroAnnouncements();
    if (!Array.isArray(announcements)) return [];
    return announcements.filter(
      (item) =>
        item !== null &&
        typeof item === "object" &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.publishedAt === "string",
    );
  } catch {
    throw new Error("Announcements could not be loaded.");
  }
}
