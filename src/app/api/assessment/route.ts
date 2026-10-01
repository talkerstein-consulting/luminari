// Self-assessment leads. Sends the lead (and its score) through Resend when RESEND_API_KEY
// is set; otherwise answers 501 — the visitor still sees their result either way.
export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return Response.json({ ok: false, reason: "not-configured" }, { status: 501 });

  const f = await req.json().catch(() => null);
  const clean = (v: unknown) => String(v ?? "").trim().slice(0, 200);
  const email = clean(f?.email), name = clean(f?.name);
  const score = Math.max(0, Math.min(100, Number(f?.score) || 0));
  const answers = Array.isArray(f?.answers) ? f.answers.slice(0, 8).map((n: unknown) => Number(n) || 0) : [];
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return Response.json({ ok: false }, { status: 400 });

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.WALKTHROUGH_FROM ?? "Luminari <onboarding@resend.dev>",
      to: process.env.WALKTHROUGH_TO ?? "Admin@luminaricleaning.com",
      reply_to: email,
      subject: `Self-assessment: ${score}/100`,
      text: `Name: ${name || "-"}\nEmail: ${email}\nScore: ${score}/100\nAnswers (2 always, 1 sometimes, 0 rarely): ${answers.join(", ")}`,
    }),
  }).catch(() => null);
  return Response.json({ ok: Boolean(r?.ok) }, { status: r?.ok ? 200 : 502 });
}
