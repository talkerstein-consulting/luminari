import { cleanField, deliverLead, readLead, validEmail } from "@/lib/lead-email";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const f = await readLead(req);
  if (!f) return Response.json({ ok: false }, { status: 400 });
  if (f.website) return Response.json({ ok: true });
  const name = cleanField(f.name), email = cleanField(f.email);
  const company = cleanField(f.company), service = cleanField(f.service);
  if (!name || !validEmail(email) || !service) return Response.json({ ok: false }, { status: 400 });
  return deliverLead("New website lead: walkthrough request",
    `A new walkthrough request from luminaricleaning.ca\n\nName: ${name}\nCompany: ${company || "-"}\nService: ${service}\nEmail: ${email}\n\nReply to this email to contact the visitor.`, email);
}
