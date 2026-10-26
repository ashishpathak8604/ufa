import type { Notice } from "@/types/notice";
import type { HeroAnnouncement } from "@/types/hero-announcement";
import { publicFileUrl } from "./storage";
export type NoticeRow = { id:string; title:string; description:string|null; category:string; published_at:string; file_path:string; file_name:string; created_at:string };
export function isNoticeRow(value: unknown): value is NoticeRow { if (!value || typeof value !== "object") return false; const r = value as Record<string, unknown>; return ["id","title","category","published_at","file_path","file_name","created_at"].every((k) => typeof r[k] === "string") && (r.description === null || typeof r.description === "string"); }
export function rowToNotice(row: NoticeRow): Notice { return { id:row.id,title:row.title,category:row.category,publishedAt:row.published_at,description:row.description?.trim() ? row.description : undefined,url:publicFileUrl(row.file_path),fileName:row.file_name,isSample:false }; }
export function rowToHeroAnnouncement(row: NoticeRow): HeroAnnouncement { return { id:row.id,title:row.title,description:row.description ?? "",category:row.category,publishedAt:row.published_at,url:publicFileUrl(row.file_path),isSample:false }; }
