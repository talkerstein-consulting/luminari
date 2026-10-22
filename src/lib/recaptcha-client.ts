"use client";

type Recaptcha = {
  ready: (callback: () => void) => void;
  execute: (key: string, options: { action: string }) => Promise<string>;
};
declare global { interface Window { grecaptcha?: Recaptcha } }

let loading: Promise<Recaptcha> | undefined;
export async function getRecaptchaToken(action: "walkthrough" | "assessment"): Promise<string> {
  const key = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!key) throw new Error("Form verification is unavailable");
  if (!loading) {
    loading = new Promise<Recaptcha>((resolve, reject) => {
      const timeout = window.setTimeout(() => reject(new Error("Verification timed out")), 12_000);
      const ready = () => {
        if (!window.grecaptcha) { reject(new Error("Verification failed to load")); return; }
        window.grecaptcha.ready(() => {
          window.clearTimeout(timeout);
          resolve(window.grecaptcha!);
        });
      };
      if (window.grecaptcha) { ready(); return; }
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(key)}`;
      script.async = true;
      script.onload = ready;
      script.onerror = () => { window.clearTimeout(timeout); script.remove(); reject(new Error("Verification failed to load")); };
      document.head.appendChild(script);
    }).catch((error) => { loading = undefined; throw error; });
  }
  const recaptcha = await loading;
  // Tokens are short-lived and single-use: obtain a fresh one for every submit/retry.
  return new Promise<string>((resolve, reject) => {
    const timeout = window.setTimeout(() => reject(new Error("Verification timed out")), 12_000);
    Promise.resolve(recaptcha.execute(key, { action })).then(
      (token) => { window.clearTimeout(timeout); resolve(token); },
      (error) => { window.clearTimeout(timeout); reject(error); },
    );
  });
}
