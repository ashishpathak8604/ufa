import { requireAdmin } from "@/lib/admin/require-admin";
import { fetchNoticeRows } from "@/lib/notice-db/queries";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { NoticeForm } from "@/components/admin/NoticeForm";
import { NoticeList } from "@/components/admin/NoticeList";
import type { NoticeRow } from "@/lib/notice-db/mappers";
export const dynamic="force-dynamic";
export default async function AdminPage(){const {supabase,email}=await requireAdmin();let notices: NoticeRow[]=[];let loadError:string|null=null;try{notices=await fetchNoticeRows(supabase);}catch{loadError="Could not load notices. Refresh the page to try again.";}return <main id="main-content" className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8"><AdminHeader email={email}/><div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]"><section><h2 className="mb-4 font-display text-3xl uppercase text-olive">Publish a notice</h2><NoticeForm/></section><section><h2 className="mb-4 font-display text-3xl uppercase text-olive">Published notices {notices.length?`(${notices.length})`:""}</h2><NoticeList notices={notices} loadError={loadError}/></section></div></main>;}
