import { useEffect, useRef } from "react";

const SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY ||
  "6LdCBbosAAAAAFZRVJIR7PIQ9F8J9Slp8woteTLH";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (cb: () => void) => void;
      execute: (siteKey: string, opts: { action: string }) => Promise<string>;
    };
  }
}

let scriptPromise: Promise<void> | null = null;

function loadScript(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.grecaptcha) return Promise.resolve();
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`;
    s.async = true;
    s.defer = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Falha ao carregar reCAPTCHA"));
    document.head.appendChild(s);
  });
  return scriptPromise;
}

export function useRecaptcha() {
  const loadedRef = useRef(false);
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    loadScript().catch(console.error);
  }, []);

  const execute = async (action: string): Promise<string> => {
    await loadScript();
    return new Promise<string>((resolve, reject) => {
      if (!window.grecaptcha) return reject(new Error("reCAPTCHA não carregou"));
      window.grecaptcha.ready(() => {
        window
          .grecaptcha!.execute(SITE_KEY, { action })
          .then(resolve)
          .catch(reject);
      });
    });
  };

  return { execute };
}
