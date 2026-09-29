// Walkthrough requests. Sends through Resend when RESEND_API_KEY is set; otherwise
// answers 501 so the form falls back to opening a ready-made email.
export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false, reason: "not-configured" }, { status: 501 });

  const f = await req.json().catch(() => null);
  const clean = (v: unknown) => String(v ?? "").trim().slice(0, 200);
  const name = clean(f?.name), email = clean(f?.email), company = clean(f?.company), service = clean(f?.service);
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !service) return Response.json({ ok: false }, { status: 400 });

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.WALKTHROUGH_FROM ?? "Luminari <onboarding@resend.dev>",
      to: process.env.WALKTHROUGH_TO ?? "Admin@luminaricleaning.com",
      reply_to: email,
      subject: "Walkthrough request",
      text: `Name: ${name}\nCompany: ${company || "-"}\nService: ${service}\nEmail: ${email}`,
    }),
  }).catch(() => null);
  return Response.json({ ok: Boolean(r?.ok) }, { status: r?.ok ? 200 : 502 });
}
