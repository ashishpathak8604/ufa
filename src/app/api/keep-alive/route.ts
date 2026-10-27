import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabasePublicClient } from "@/lib/supabase/public";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store, max-age=0" };

export async function GET() {
  if (!hasSupabaseEnv()) {
    return Response.json(
      { ok: false, error: "Supabase is not configured" },
      { status: 500, headers: NO_STORE },
    );
  }

  const startedAt = Date.now();

  try {
    const supabase = createSupabasePublicClient();
    const { error } = await supabase
      .from("notices")
      .select("id", { head: true })
      .limit(1);

    if (error) {
      console.error("[keep-alive] Supabase ping failed", {
        code: error.code,
        message: error.message,
      });

      return Response.json(
        { ok: false, error: "Database ping failed" },
        { status: 503, headers: NO_STORE },
      );
    }

    return Response.json(
      {
        ok: true,
        database: "supabase",
        latencyMs: Date.now() - startedAt,
        checkedAt: new Date().toISOString(),
      },
      { headers: NO_STORE },
    );
  } catch (error) {
    console.error("[keep-alive] Unexpected ping failure", {
      message: error instanceof Error ? error.message : "unknown",
    });

    return Response.json(
      { ok: false, error: "Database ping failed" },
      { status: 503, headers: NO_STORE },
    );
  }
}
