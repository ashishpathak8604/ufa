import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { getSupabaseEnv, hasSupabaseEnv } from "@/lib/supabase/env";
function noStore(response: NextResponse) { response.headers.set("Cache-Control", "no-store"); return response; }
function redirectWithCookies(url: URL, source: NextResponse) { const target=NextResponse.redirect(url); source.cookies.getAll().forEach((cookie)=>target.cookies.set(cookie)); return noStore(target); }
export async function proxy(request: NextRequest) { if(!hasSupabaseEnv())return new NextResponse("Admin is not configured.",{status:503,headers:{"Cache-Control":"no-store"}}); const {url,anonKey}=getSupabaseEnv(); let response=NextResponse.next({request}); const supabase=createServerClient(url,anonKey,{cookies:{getAll:()=>request.cookies.getAll(),setAll(cookiesToSet){cookiesToSet.forEach(({name,value})=>request.cookies.set(name,value));response=NextResponse.next({request});cookiesToSet.forEach(({name,value,options})=>response.cookies.set(name,value,options));}}}); const {data:{user}}=await supabase.auth.getUser(); if(!user && request.nextUrl.pathname!=="/admin/login"){const login=new URL("/admin/login",request.url);login.searchParams.set("next",request.nextUrl.pathname);return redirectWithCookies(login,response);} return noStore(response); }
export const config={matcher:["/admin/:path*"]};
