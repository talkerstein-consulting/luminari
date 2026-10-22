# Form lead delivery

Both `/api/walkthrough` and `/api/assessment` send notifications to the configured inbox using Nodemailer in the Node.js runtime. The authenticated mailbox is the sender; Reply-To is the visitor. Visitor input cannot select recipients. Success means the SMTP server accepted the notification, not that inbox placement is guaranteed.

## Vercel production configuration

| Variable | Value |
| --- | --- |
| SMTP_HOST | smtp.office365.com |
| SMTP_PORT | 587 |
| SMTP_USER | bzrihen@luminaricleaning.ca |
| SMTP_PASSWORD | Mailbox password or supported app password; store as a Vercel Secret |
| LEADS_TO | bzrihen@luminaricleaning.ca |

The GoDaddy Microsoft 365 mailbox must permit authenticated SMTP. If the account requires OAuth or blocks password authentication, use the provider-supported authentication flow rather than disabling MFA or security defaults. An app password is for application access, not owner webmail sign-in.

Never commit the password. Add it directly to Vercel production environment settings, then redeploy. Keep Preview credentials separate from Production. No email credentials are exposed to the browser.

## Verification

Run `npm test` and `npm run build`. After adding credentials, submit a clearly labeled test lead through the live form and confirm its arrival in the mailbox. Test both forms. Until credentials are present, valid submissions return 503 and the form displays a retry message; it does not claim delivery or open an email app.

The self-assessment displays its results after the owner notification is accepted. It does not automatically email results to the visitor. Both forms include a honeypot and reject cross-origin and oversized JSON requests; these checks are not a substitute for a distributed anti-abuse service if traffic requires one.

## reCAPTCHA v3

Production also requires `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (public) and `RECAPTCHA_SECRET_KEY` (Secret). Register `luminaricleaning.ca` in the Google reCAPTCHA v3 console. The server accepts only the apex and www hostnames, the correct form action, scores of at least 0.5, and tokens no older than two minutes. Verification errors block SMTP; no bypass is deployed. A new token is obtained on each submission and retry. Google privacy and terms notices appear beside each form.
