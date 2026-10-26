"use client";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
export function SubmitButton({label,pendingLabel,variant="primary",disabled=false}:{label:string;pendingLabel:string;variant?:"primary"|"danger";disabled?:boolean}) { const {pending}=useFormStatus(); const danger=variant==="danger"; return <button type="submit" disabled={pending||disabled} aria-disabled={pending||disabled} className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold disabled:opacity-60 ${danger?"bg-rose-soft text-olive hover:bg-rose":"bg-olive text-warmwhite hover:bg-olive/90"}`}>{pending&&<Loader2 size={16} className="animate-spin motion-reduce:animate-none"/>}{pending?pendingLabel:label}</button>; }
