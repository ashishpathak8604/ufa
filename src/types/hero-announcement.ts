/**
 * Data contract for the standalone Hero Announcement Board.
 *
 * Independent from Match Centre `Notice` (src/types/notice.ts): different
 * purpose, different presentation, different backend integration point.
 * Final fields to be reconciled with Jagdeep before backend integration.
 */
export interface HeroAnnouncement {
  id: string;
  title: string;
  description: string;
  category: string;
  /** ISO 8601 date string */
  publishedAt: string;
  /** Destination for "Read Announcement"; null when no link exists yet */
  url: string | null;
  /** true only for mock/sample data — never true for real records */
  isSample: boolean;
}
