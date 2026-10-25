import { track } from "@vercel/analytics";

/**
 * Custom Vercel Analytics event. The SDK drops events sent before its own queue exists (a page
 * component can mount before the layout's <Analytics /> has run), so make sure the queue is there
 * first: the analytics script replays it once it loads.
 */
export function trackEvent(name: string, properties?: Record<string, string | number | boolean>) {
  if (typeof window === "undefined") return;
  if (!window.va) {
    window.va = (...params: unknown[]) => {
      (window.vaq = window.vaq || []).push(params as [string, unknown?]);
    };
  }
  track(name, properties);
}
