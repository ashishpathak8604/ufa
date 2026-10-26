# Testing notices

## Automated checks

Run `npm run typecheck`, `npm run lint`, `npm run build`, and `supabase/tests/rls_checks.sql` (expect `PASS` notices).

## Manual checklist

- [ ] Logged out landing page and Notices section render; empty state works.
- [ ] Admin can log in and open dashboard; missing title is blocked.
- [ ] Non-PDF, over-4-MB PDF, and renamed-image PDF are blocked.
- [ ] Publish complete metadata and PDF; it appears publicly without redeploy and persists after refresh.
- [ ] Download is the uploaded PDF; newest notice appears in hero; double publish creates one record.
- [ ] Delete confirmation removes public/admin notice and its PDF URL returns 400/404.
- [ ] Logout redirects `/admin`; wrong password is generic; non-admin is denied.
- [ ] Bad env/network leaves rest of public page visible; repeat workflow in production.

## API permission checks

With `$SUPABASE_URL` and `$ANON`, anonymous REST insert/delete/update and storage upload/list attempts must be denied or affect zero rows; `admins` must be denied/empty. Repeat with a non-admin JWT. Public object GET for an existing PDF must return 200.

## Client decisions

- [ ] Confirm PDF-only and 4 MB rules.
- [ ] Confirm categories and archive policy.
- [ ] Confirm account owners and publishing administrator.
