import { redirect } from "next/navigation";
import Link from "next/link";
import { getAdminContext } from "@/lib/admin/require-admin";
import { safeAdminNext } from "@/lib/admin/safe-next";
import { LoginForm } from "@/components/admin/LoginForm";
export const dynamic="force-dynamic";
export const metadata={title:"Admin sign in",robots:{index:false,follow:false}};
export default async function LoginPage({searchParams}:{searchParams:Promise<{next?:string;reason?:string}>}) { const {next,reason}=await searchParams; if(await getAdminContext())redirect(safeAdminNext(next)); const notice=reason==="expired"?"Your session has expired. Please sign in again.":reason==="forbidden"?"This account is not authorised to manage notices.":null; return <main id="main-content" className="flex min-h-screen items-center justify-center p-5"><section className="w-full max-w-md rounded-[1.75rem] bg-warmwhite p-6 shadow-soft sm:p-8"><h1 className="font-display text-3xl uppercase text-olive">Association administrator sign in</h1>{notice&&<p className="mt-4 rounded-xl bg-rose-soft/60 p-3 text-sm text-olive">{notice}</p>}<LoginForm next={safeAdminNext(next)}/><Link href="/" className="mt-6 inline-block text-sm font-semibold text-gold-strong hover:underline">← Back to website</Link></section></main>; }
