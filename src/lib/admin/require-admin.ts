import { redirect } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";
export type AdminContext = { supabase: SupabaseClient; userId:string; email:string|null };
export async function getAdminContext(): Promise<AdminContext|null> { const supabase=await createSupabaseServerClient(); const {data:{user},error}=await supabase.auth.getUser(); if(error||!user)return null; const {data,error:rpcError}=await supabase.rpc("is_admin"); return !rpcError && data===true ? {supabase,userId:user.id,email:user.email??null}:null; }
export async function requireAdmin(): Promise<AdminContext> { const context=await getAdminContext(); if(context)return context; const supabase=await createSupabaseServerClient(); const {data:{user}}=await supabase.auth.getUser(); redirect(user ? "/admin/login?reason=forbidden" : "/admin/login?reason=expired"); }
