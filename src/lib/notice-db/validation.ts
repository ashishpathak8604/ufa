import { NOTICE_CATEGORIES, NOTICE_LIMITS, PDF_MIME } from "./constants";
import { isValidIsoDate, todayInIndia } from "./dates";
export type NoticeFieldName = "title" | "category" | "publishedAt" | "description" | "file" | "submissionId";
export type NoticeFieldErrors = Partial<Record<NoticeFieldName, string>>;
export type NoticeFormValues = { title: string; description: string; category: string; publishedAt: string };
export type ValidatedNoticeInput = { submissionId: string; title: string; description: string | null; category: string; publishedAt: string; file: File; fileName: string };
export type NoticeValidationResult = { ok: true; value: ValidatedNoticeInput } | { ok: false; fieldErrors: NoticeFieldErrors; values: NoticeFormValues };
const stringValue = (formData: FormData, key: string) => { const value = formData.get(key); return typeof value === "string" ? value : ""; };
export function isUuid(value: string): boolean { return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value); }
export function sanitizeDisplayFileName(raw: string): string {
  let name = raw.split(/[\\/]/).pop()?.replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " ").replace(/^\.+/, "").trim() ?? "";
  name = name.replace(/\.pdf$/i, "");
  const maxBase = NOTICE_LIMITS.fileNameMax - 4;
  name = name.slice(0, maxBase).trim();
  return `${name || "notice"}.pdf`;
}
export async function validateNoticeForm(formData: FormData): Promise<NoticeValidationResult> {
  const title = stringValue(formData, "title").trim().replace(/\s+/g, " ");
  const descriptionRaw = stringValue(formData, "description").trim();
  const category = stringValue(formData, "category");
  const publishedAt = stringValue(formData, "publishedAt");
  const submissionId = stringValue(formData, "submissionId");
  const values: NoticeFormValues = { title, description: descriptionRaw, category, publishedAt };
  const fieldErrors: NoticeFieldErrors = {};
  if (!title) fieldErrors.title = "Enter a title for the notice."; else if (title.length > NOTICE_LIMITS.titleMax) fieldErrors.title = "Title must be 200 characters or fewer.";
  if (!NOTICE_CATEGORIES.includes(category as typeof NOTICE_CATEGORIES[number])) fieldErrors.category = "Choose a category from the list.";
  if (!publishedAt || !isValidIsoDate(publishedAt)) fieldErrors.publishedAt = "Enter a valid publication date."; else if (publishedAt > todayInIndia()) fieldErrors.publishedAt = "Publication date cannot be in the future.";
  if (descriptionRaw.length > NOTICE_LIMITS.descriptionMax) fieldErrors.description = "Description must be 1000 characters or fewer.";
  if (!isUuid(submissionId)) fieldErrors.submissionId = "The form expired. Reload the page and try again.";
  const candidate = formData.get("file");
  if (!(candidate instanceof File) || candidate.size <= 0) fieldErrors.file = "Attach a PDF file.";
  else if (candidate.size > NOTICE_LIMITS.fileMaxBytes) fieldErrors.file = "The file is larger than 4 MB. Compress it and try again.";
  else if (!/\.pdf$/i.test(candidate.name) || candidate.type !== PDF_MIME) fieldErrors.file = "Only PDF files are supported.";
  else { const bytes = new Uint8Array(await candidate.slice(0, 5).arrayBuffer()); if (new TextDecoder().decode(bytes) !== "%PDF-") fieldErrors.file = "This file does not look like a valid PDF."; }
  if (Object.keys(fieldErrors).length) return { ok: false, fieldErrors, values };
  return { ok: true, value: { submissionId, title, description: descriptionRaw || null, category, publishedAt, file: candidate as File, fileName: sanitizeDisplayFileName((candidate as File).name) } };
}
