import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import nodemailer from "nodemailer";
import { POST as walkthrough } from "../src/app/api/walkthrough/route";
import { POST as assessment } from "../src/app/api/assessment/route";

vi.mock("nodemailer", () => ({ default: { createTransport: vi.fn() } }));
const sendMail = vi.fn();
const close = vi.fn();
const lead = { name: "Test Visitor", email: "visitor@example.com", service: "Office cleaning", company: "Test Company" };
const request = (body: unknown, origin = "https://luminaricleaning.ca") => new Request("https://luminaricleaning.ca/api/walkthrough", {
  method: "POST", headers: { "content-type": "application/json", origin }, body: JSON.stringify(body),
});

beforeEach(() => {
  vi.stubEnv("SMTP_USER", "bzrihen@luminaricleaning.ca");
  vi.stubEnv("SMTP_PASSWORD", "test-only-password");
  vi.stubEnv("SMTP_HOST", "smtp.office365.com");
  vi.stubEnv("SMTP_PORT", "587");
  vi.stubEnv("LEADS_TO", "bzrihen@luminaricleaning.ca");
  vi.mocked(nodemailer.createTransport).mockReturnValue({ sendMail, close } as unknown as ReturnType<typeof nodemailer.createTransport>);
  sendMail.mockResolvedValue({ accepted: ["bzrihen@luminaricleaning.ca"], rejected: [] });
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("SMTP form delivery", () => {
  it("uses the mailbox sender and recipient, visitor Reply-To, and required TLS", async () => {
    const response = await walkthrough(request({ ...lead, to: "attacker@example.com", from: "attacker@example.com" }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    expect(nodemailer.createTransport).toHaveBeenCalledWith(expect.objectContaining({ host: "smtp.office365.com", port: 587, secure: false, requireTLS: true }));
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({
      from: { name: "Luminari Cleaning", address: "bzrihen@luminaricleaning.ca" },
      to: "bzrihen@luminaricleaning.ca", replyTo: lead.email,
      text: expect.stringContaining("Service: Office cleaning"),
    }));
    expect(close).toHaveBeenCalled();
  });
  it("reports missing credentials without attempting SMTP", async () => {
    vi.stubEnv("SMTP_PASSWORD", "");
    const response = await walkthrough(request(lead));
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ ok: false, reason: "not-configured" });
    expect(sendMail).not.toHaveBeenCalled();
  });
  it("does not claim success when SMTP rejects the recipient", async () => {
    sendMail.mockResolvedValueOnce({ accepted: [], rejected: ["bzrihen@luminaricleaning.ca"] });
    expect((await walkthrough(request(lead))).status).toBe(502);
    expect(close).toHaveBeenCalled();
  });
  it("does not expose SMTP errors or credentials", async () => {
    sendMail.mockRejectedValueOnce(new Error("private SMTP error test-only-password"));
    const response = await walkthrough(request(lead));
    expect(response.status).toBe(502);
    expect(await response.text()).not.toContain("private");
    expect(console.error).toHaveBeenCalledWith("Lead email delivery failed");
    expect(close).toHaveBeenCalled();
  });
  it("rejects invalid, cross-origin, and oversized input before SMTP", async () => {
    expect((await walkthrough(request({ ...lead, email: "invalid" }))).status).toBe(400);
    expect((await walkthrough(request(lead, "https://other.example"))).status).toBe(400);
    expect((await walkthrough(request({ ...lead, extra: "x".repeat(9000) }))).status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });
  it("silently discards honeypot submissions", async () => {
    expect((await walkthrough(request({ ...lead, website: "spam" }))).status).toBe(200);
    expect(sendMail).not.toHaveBeenCalled();
  });
  it("calculates assessment scores from the answers instead of trusting the browser", async () => {
    const response = await assessment(request({ email: lead.email, answers: [2, 2, 2, 2, 0, 0, 0, 0], score: 100 }));
    expect(response.status).toBe(200);
    expect(sendMail).toHaveBeenCalledWith(expect.objectContaining({ subject: "New website lead: self-assessment 50/100" }));
  });
  it("rejects incomplete or invalid assessment answers", async () => {
    expect((await assessment(request({ email: lead.email, answers: [2] }))).status).toBe(400);
    expect((await assessment(request({ email: lead.email, answers: Array(8).fill(3) }))).status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });
});
