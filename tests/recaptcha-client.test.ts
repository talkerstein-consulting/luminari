import { afterEach, expect, it, vi } from "vitest";

afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.resetModules(); });

it("accepts Google's thenable without requiring a native Promise.finally", async () => {
  vi.stubEnv("NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "public-test-key");
  const execute = vi.fn().mockReturnValue({ then: (resolve: (value: string) => void) => resolve("fresh-token") });
  vi.stubGlobal("window", { setTimeout, clearTimeout, grecaptcha: { ready: (fn: () => void) => fn(), execute } });
  const { getRecaptchaToken } = await import("../src/lib/recaptcha-client");
  expect(await getRecaptchaToken("walkthrough")).toBe("fresh-token");
  expect(await getRecaptchaToken("assessment")).toBe("fresh-token");
  expect(execute).toHaveBeenCalledTimes(2);
});
