import nodemailer from "nodemailer";

export class EmailNotConfigured extends Error {}

/** Server-side only. Visitor input never controls the sender or recipient. */
export async function sendLeadEmail(subject: string, text: string, replyTo: string) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const to = process.env.LEADS_TO;
  if (!user || !pass || !to) throw new EmailNotConfigured();
  const port = Number(process.env.SMTP_PORT || 587);
  if (![465, 587].includes(port)) throw new EmailNotConfigured();
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.office365.com",
    port,
    secure: port === 465,
    requireTLS: true,
    tls: { minVersion: "TLSv1.2" },
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  try {
    const result = await transport.sendMail({
      from: { name: "Luminari Cleaning", address: user },
      to, replyTo, subject, text,
    });
    if (!result.accepted.length || result.rejected.length) throw new Error("SMTP recipient rejected");
  } finally {
    transport.close();
  }
}

export const cleanField = (value: unknown) =>
  typeof value === "string" ? value.replace(/[\r\n\x00]/g, " ").trim().slice(0, 200) : "";
export const validEmail = (value: string) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value);

export async function readLead(req: Request): Promise<Record<string, unknown> | null> {
  const origin = req.headers.get("origin");
  if (origin && origin !== new URL(req.url).origin) return null;
  if (!req.headers.get("content-type")?.includes("application/json")) return null;
  const body = await req.text();
  if (body.length > 8_192) return null;
  try {
    const data: unknown = JSON.parse(body);
    return data && typeof data === "object" && !Array.isArray(data)
      ? data as Record<string, unknown> : null;
  } catch { return null; }
}

export async function deliverLead(subject: string, text: string, replyTo: string) {
  try {
    await sendLeadEmail(subject, text, replyTo);
    return Response.json({ ok: true });
  } catch (error) {
    if (error instanceof EmailNotConfigured) {
      return Response.json({ ok: false, reason: "not-configured" }, { status: 503 });
    }
    // Never log credentials, SMTP responses or lead details.
    const failure = error as { code?: unknown; responseCode?: unknown; response?: unknown };
    const code = typeof failure.code === "string" && /^[A-Z_]+$/.test(failure.code) ? failure.code : "UNKNOWN";
    const status = typeof failure.responseCode === "number" ? failure.responseCode : undefined;
    const response = typeof failure.response === "string" ? failure.response : "";
    const reason = /security defaults/i.test(response) ? "SECURITY_DEFAULTS"
      : /SmtpClientAuthentication.*disabled/i.test(response) ? "SMTP_AUTH_DISABLED"
      : /basic authentication.*disabled/i.test(response) ? "BASIC_AUTH_DISABLED"
      : /multi.factor|MFA|app.password/i.test(response) ? "MFA_REQUIRED"
      : /credentials.*incorrect|invalid.*credentials/i.test(response) ? "INVALID_CREDENTIALS"
      : /federat|STS/i.test(response) ? "FEDERATION_FAILURE" : "UNSPECIFIED";
    console.error("Lead email delivery failed", { code, status, reason });
    return Response.json({ ok: false, reason: "delivery-failed" }, { status: 502 });
  }
}
