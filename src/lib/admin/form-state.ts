import type { NoticeFieldErrors, NoticeFormValues } from "@/lib/notice-db/validation";
export type FormState = { status:"idle"|"success"|"error"; message?:string; code?:"unauthenticated"|"validation"|"upload"|"database"|"unknown"; fieldErrors?:NoticeFieldErrors; values?:NoticeFormValues };
export const initialFormState: FormState = { status:"idle" };
