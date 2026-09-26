# Activation key backend (cPanel)

Handles the `/activationkey` page on the Vercel site: saves the customer,
triggers an M-Pesa STK push for $10 (converted to KES), and on payment
confirmation generates and emails a 64-character activation key.

## 1. Database

In cPanel → MySQL Databases, create a database and a user with all
privileges on it, then run `schema.sql` against it (phpMyAdmin → Import,
or the "SQL" tab).

## 2. Upload

Upload this whole `cpanel-backend/` folder to your hosting (e.g.
`public_html/cpanel-backend/`, or better, one level above `public_html` with
only the endpoints you call — `process.php`, `catch.php`, `status.php` —
exposed via a small router, if you want `config.php` off the public web).

## 3. Configure

Edit `config.php`:
- `DB_HOST` / `DB_NAME` / `DB_USER` / `DB_PASS` — from step 1.
- `ALLOWED_ORIGIN` — your Vercel URL, e.g. `https://devworkstation.vercel.app`.
- `MPESA_*` — from your Safaricom Daraja app (start in `sandbox`, switch
  `MPESA_ENV` to `production` and use your real shortcode/passkey when live).
- `MPESA_CALLBACK_URL` — the public HTTPS URL of `catch.php` on this server.
  Safaricom must be able to reach it, so it can't be `localhost`.
- `MAIL_FROM_ADDRESS` — an address on your own domain (helps deliverability).

## 4. Point the frontend at it

The frontend reads this backend's URL from an env var, not from code.

- **Local dev**: copy `.env.example` (repo root) to `.env.local` and fill in
  `NEXT_PUBLIC_ACTIVATION_API_BASE`.
- **Vercel**: Project Settings → Environment Variables → add
  `NEXT_PUBLIC_ACTIVATION_API_BASE` = `https://yourdomain.com/cpanel-backend`,
  then redeploy (env var changes need a redeploy to take effect).

It must keep the `NEXT_PUBLIC_` prefix — the activation form calls this API
straight from the browser, and Next.js only ships `NEXT_PUBLIC_*` vars to
client-side code.

## 5. Test end to end

1. Submit the form on `/activationkey` with a Safaricom test number
   (sandbox) or your own number (production).
2. Confirm the STK prompt arrives and `keyactive.mpesa_checkout_id` gets
   filled in right after submit.
3. Enter the PIN, confirm Safaricom calls `catch.php` (check its error log
   for the `[mpesa-callback]` line), and that the row flips to
   `status = paid` with `mpesa_reference` and `activation_key` filled in.
4. Confirm the email arrives. If `mail()` lands in spam or doesn't send,
   switch `send_key_email()` in `helpers.php` to SMTP via PHPMailer using a
   real mailbox on your domain.

## Notes

- `id` is 16 random bytes as hex (32 chars) — unguessable, used as the
  public reference the frontend polls with.
- `activation_key` is 32 random bytes as hex (64 chars), generated only
  once payment is confirmed.
- `catch.php` is idempotent: if Safaricom calls back twice, the second call
  is a no-op once `status` is already `paid`.
