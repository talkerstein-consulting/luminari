type Verification = {
  success?: boolean;
  score?: number;
  action?: string;
  hostname?: string;
  challenge_ts?: string;
};

export async function verifyRecaptcha(token: unknown, action: "walkthrough" | "assessment"): Promise<Response | null> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return Response.json({ ok: false, reason: "verification-unavailable" }, { status: 503 });
  if (typeof token !== "string" || !token || token.length > 4096) {
    return Response.json({ ok: false, reason: "verification-failed" }, { status: 403 });
  }
  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
      signal: AbortSignal.timeout(8_000),
      cache: "no-store",
    });
    if (!response.ok) throw new Error("Verification service unavailable");
    const result: Verification = await response.json();
    const age = Date.now() - Date.parse(result.challenge_ts || "");
    const hostnames = ["luminaricleaning.ca", "www.luminaricleaning.ca"];
    if (result.success !== true || typeof result.score !== "number" || !Number.isFinite(result.score) ||
        result.score < 0.5 || result.score > 1 || result.action !== action ||
        !hostnames.includes(result.hostname || "") || !Number.isFinite(age) || age < -10_000 || age > 120_000) {
      return Response.json({ ok: false, reason: "verification-failed" }, { status: 403 });
    }
    return null;
  } catch {
    return Response.json({ ok: false, reason: "verification-unavailable" }, { status: 503 });
  }
}
