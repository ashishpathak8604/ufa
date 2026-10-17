import { NoticeBoard } from "./NoticeBoard";
import { getNotices } from "@/lib/notices";

/**
 * Server-side notices region. Fetches through the lib/notices.ts seam and
 * passes plain props down; all notice presentation lives in NoticeBoard.
 */
export async function NoticesRegion() {
  const notices = await getNotices();
  return <NoticeBoard notices={notices} />;
}
