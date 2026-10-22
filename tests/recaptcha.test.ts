import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { verifyRecaptcha } from "../src/lib/recaptcha";

const token = "test-token";
const approved = () => ({ success: true, score: 0.9, action: "walkthrough", hostname: "luminaricleaning.ca", challenge_ts: new Date().toISOString() });
beforeEach(() => { vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret"); });
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); });
const respond = (data: unknown) => vi.stubGlobal("fetch", vi.fn().mockResolvedValue(Response.json(data)));

describe("reCAPTCHA server verification", () => {
  it("accepts a valid token and sends the secret only to Google", async () => {
    respond(approved());
    expect(await verifyRecaptcha(token, "walkthrough")).toBeNull();
    expect(fetch).toHaveBeenCalledWith("https://www.google.com/recaptcha/api/siteverify", expect.objectContaining({ method: "POST", cache: "no-store" }));
    const body = vi.mocked(fetch).mock.calls[0][1]?.body as URLSearchParams;
    expect(body.get("secret")).toBe("test-secret");
    expect(body.get("response")).toBe(token);
  });
  it.each([
    { success: false }, { score: 0.4 }, { score: 2 }, { action: "assessment" },
    { hostname: "attacker.example" }, { challenge_ts: new Date(Date.now() - 180_000).toISOString() },
    { challenge_ts: "invalid" }, { challenge_ts: new Date(Date.now() + 60_000).toISOString() },
  ])("rejects invalid verification details %j", async (override) => {
    respond({ ...approved(), ...override });
    expect((await verifyRecaptcha(token, "walkthrough"))?.status).toBe(403);
  });
  it("rejects missing tokens", async () => {
    const mockedFetch = vi.fn(); vi.stubGlobal("fetch", mockedFetch);
    expect((await verifyRecaptcha(undefined, "walkthrough"))?.status).toBe(403);
    expect(mockedFetch).not.toHaveBeenCalled();
  });
  it("fails closed when a secret is missing or Google is unavailable", async () => {
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "");
    expect((await verifyRecaptcha(token, "walkthrough"))?.status).toBe(503);
    vi.stubEnv("RECAPTCHA_SECRET_KEY", "test-secret");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network")));
    expect((await verifyRecaptcha(token, "walkthrough"))?.status).toBe(503);
  });
});
