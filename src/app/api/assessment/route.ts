import { cleanField, deliverLead, readLead, validEmail } from "@/lib/lead-email";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: Request) {
  const f = await readLead(req);
  if (!f) return Response.json({ ok: false }, { status: 400 });
  if (f.website) return Response.json({ ok: true });
  const email = cleanField(f.email), name = cleanField(f.name);
  if (!validEmail(email) || !Array.isArray(f.answers) || f.answers.length !== 8 ||
      !f.answers.every((n: unknown) => typeof n === "number" && [0, 1, 2].includes(n))) {
    return Response.json({ ok: false }, { status: 400 });
  }
  const answers = f.answers as number[];
  const score = Math.round(answers.reduce((sum, answer) => sum + answer, 0) / 16 * 100);
  return deliverLead(`New website lead: self-assessment ${score}/100`,
    `A new self-assessment lead from luminaricleaning.ca\n\nName: ${name || "-"}\nEmail: ${email}\nScore: ${score}/100\nAnswers (2 always, 1 sometimes, 0 rarely): ${answers.join(", ")}\n\nReply to this email to contact the visitor.`, email);
}
