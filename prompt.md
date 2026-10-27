# Supabase setup prompt for the UFA notice publishing app

Copy the prompt below into ChatGPT/Claude after you have opened the relevant Supabase project. Replace only the values inside angle brackets. Do **not** paste passwords, anon/publishable keys, secret keys, or service-role keys into chat.

---

I need help configuring an existing Supabase project for a Next.js UFA website that has a protected notice-publishing dashboard.

Important security rules:

- Do not create a backdoor, bypass RLS, use a service-role/secret key, create public write policies, or weaken any policy.
- Do not ask me to paste passwords, API keys, cookies, tokens, or SQL connection strings into chat.
- Do not create a public sign-up flow.
- If you cannot operate the Supabase dashboard directly, give me one dashboard action at a time and wait for my confirmation.
- Use only the supplied SQL migration. Do not invent additional tables, policies, functions, or storage rules.

Project details:

- Project: `<SUPABASE PROJECT NAME>`
- Administrator email: `<ADMIN EMAIL>`
- Local app environment variable names: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`
- Upload policy: PDF only; maximum 4 MB.

Please complete or guide me through these steps, in this exact order:

1. In Authentication configuration, ensure Email/password sign-in remains enabled.
2. Disable **Allow new users to sign up**.
3. Disable **Allow manual linking** and **Allow anonymous sign-ins**.
4. Set the minimum password length to at least 12 characters if the project plan/settings expose that control.
5. Keep email confirmation enabled. We will manually create and auto-confirm the one administrator.
6. Open SQL Editor and run the full contents of this repository file exactly once:
   `supabase/migrations/0001_notices.sql`
7. Verify that it created:
   - `public.admins`
   - `public.notices`
   - `public.is_admin()`
   - public storage bucket `notice-files`
   - bucket file limit `4194304` bytes
   - allowed MIME type `application/pdf`
8. Create the administrator in Authentication → Users using `<ADMIN EMAIL>`. Use a password I enter directly in the Supabase dashboard; do not request it in chat. Auto-confirm the user/email.
9. In SQL Editor, allow-list that exact user by running:

   ```sql
   insert into public.admins (user_id)
   select id
   from auth.users
   where email = '<ADMIN EMAIL>';
   ```

   Confirm that exactly one row was inserted. If it was not, stop and explain why rather than guessing.
10. Run the full contents of `supabase/tests/rls_checks.sql` in SQL Editor. It must output only `PASS` notices, except that the admin positive test may say `SKIP` if there is no admin row. Do not continue until this is resolved.
11. Tell me where in the current Supabase dashboard to copy:
    - Project URL → I will store it as `SUPABASE_URL`
    - anon or publishable key → I will store it as `SUPABASE_ANON_KEY`
12. Remind me to put those values only in `.env.local` locally and in Vercel’s Production and Preview environment settings. Never commit them to Git.

After completing the steps, provide a short verification report with:

- Auth signup/anonymous status
- migration result
- administrator allow-list status
- RLS test result
- bucket access/type/size configuration
- any remaining action I must take in the Next.js app or Vercel

---

Before starting, ask me to confirm that I am operating on the correct Supabase project. Do not make destructive changes or delete users/files.
