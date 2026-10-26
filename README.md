# UFA website

The Uttarakhand Football Association website includes a protected notice-publishing dashboard. It uses Next.js 16, React 19, TypeScript, Tailwind CSS, and Supabase (Auth, Postgres, and Storage).

## Local setup

Use a current Node LTS release and npm. Run `npm install`, copy `.env.example` to `.env.local`, enter the Supabase URL and anon key, then run `npm run dev`. Without Supabase variables, development displays sample notices; production displays the notice error state rather than fake data.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start development server |
| `npm run build` / `npm run start` | Production build / server |
| `npm run lint` / `npm run typecheck` | Code checks |
| `npm run placeholders` / `npm run optimize-images` | Asset utilities |

## Supabase setup

1. Create a project near the association.
2. Disable new-user sign-up in Authentication, keep email/password sign-in enabled, and set a 12+ character minimum password.
3. Run `supabase/migrations/0001_notices.sql` in SQL Editor.
4. Add the authorised administrator in Authentication, auto-confirming it.
5. Add that user: `insert into public.admins (user_id) select id from auth.users where email = '<admin email>';`.
6. Set `SUPABASE_URL`, `SUPABASE_ANON_KEY`, and (when using a custom domain) `NEXT_PUBLIC_SITE_URL` locally and in both Vercel Production and Preview; redeploy after updating them. On Vercel the production URL is used automatically when `NEXT_PUBLIC_SITE_URL` is unset. Optionally set `GOOGLE_SITE_VERIFICATION` / `BING_SITE_VERIFICATION`.

Architecture: public page → `lib/notices.ts` → `lib/notice-db` → Supabase. Admin → proxy + `requireAdmin` → server actions → Supabase RLS. RLS and storage policies are the security boundary. No service-role key is used; server checks use `getUser()`.

Folders: `src/lib/notice-db` (data/validation/storage), `src/app/admin` (dashboard/actions), `src/components/admin` (admin UI), and `supabase` (SQL). Troubleshooting: notice errors usually mean missing variables/RLS; uploads are PDF-only and max 4 MB; an unauthorised login needs an `admins` row; revalidation is immediate but can take five minutes. V1 has no editing, lists newest 20 notices, and supports one admin.
