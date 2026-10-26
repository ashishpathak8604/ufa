import type { ReactNode } from "react";
export const metadata={title:{default:"Admin",template:"%s | UFA Admin"},robots:{index:false,follow:false}};
export default function AdminLayout({children}:{children:ReactNode}) { return <div className="min-h-screen bg-ivory">{children}</div>; }
