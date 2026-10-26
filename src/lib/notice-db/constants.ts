export const NOTICE_BUCKET = "notice-files";
export const NOTICE_LIMITS = { titleMax: 200, descriptionMax: 1000, categoryMax: 40, fileNameMax: 150, fileMaxBytes: 4 * 1024 * 1024 } as const;
export const NOTICE_CATEGORIES = ["General", "Registration", "Competition", "Tournament", "Other"] as const;
export type NoticeCategoryValue = (typeof NOTICE_CATEGORIES)[number];
export const PUBLIC_NOTICE_LIMIT = 20;
export const HERO_ANNOUNCEMENT_LIMIT = 5;
export const PDF_MIME = "application/pdf";
