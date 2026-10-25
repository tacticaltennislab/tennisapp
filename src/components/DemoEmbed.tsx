"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { trackEvent } from "@/lib/analytics";

// The Cal.com embed is only downloaded once this block is close to the screen.
const Cal = dynamic(() => import("@calcom/embed-react"), { ssr: false });

const NAMESPACE = "demo";
const LIME = "#c8f135";
const ON_LIME = "#11140a";

function currentTheme(): "light" | "dark" {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

// The site theme is the "dark" class on <html>; this follows it, including when the visitor toggles it.
function subscribeTheme(onChange: () => void) {
  const mo = new MutationObserver(onChange);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  return () => mo.disconnect();
}

/**
 * Inline Cal.com booking calendar for `calLink` (for example "team/event"), following the
 * site theme and the lime accent. Counts a visit to the page and a completed booking.
 */
export default function DemoEmbed({
  calLink,
  lang,
  loadingLabel,
}: {
  calLink: string;
  lang: string;
  loadingLabel: string;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const theme = useSyncExternalStore(subscribeTheme, currentTheme, () => "light" as const);

  // Someone opened /demo.
  useEffect(() => {
    trackEvent("demo_opened", { lang });
  }, [lang]);

  // Load the embed lazily, shortly before it scrolls into view.
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Style the calendar and listen for completed bookings once the embed has loaded.
  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    import("@calcom/embed-react").then(async ({ getCalApi }) => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (cancelled) return;
      cal("ui", {
        theme,
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: {
            "cal-brand": LIME,
            "cal-brand-emphasis": "#b5d92c",
            "cal-brand-text": ON_LIME,
            "cal-brand-subtle": "#eef7c4",
          },
          dark: {
            "cal-brand": LIME,
            "cal-brand-emphasis": "#d6f65c",
            "cal-brand-text": ON_LIME,
            "cal-brand-subtle": "#2b3510",
          },
        },
      });
    });
    return () => {
      cancelled = true;
    };
  }, [near, theme]);

  useEffect(() => {
    if (!near) return;
    let cancelled = false;
    let detach: (() => void) | undefined;
    import("@calcom/embed-react").then(async ({ getCalApi }) => {
      const cal = await getCalApi({ namespace: NAMESPACE });
      if (cancelled) return;
      const callback = () => trackEvent("demo_booked", { lang });
      cal("on", { action: "bookingSuccessful", callback });
      detach = () => cal("off", { action: "bookingSuccessful", callback });
    });
    return () => {
      cancelled = true;
      detach?.();
    };
  }, [near, lang]);

  return (
    <div ref={box} className="min-h-[720px] w-full" aria-busy={!near}>
      {near ? (
        <Cal
          namespace={NAMESPACE}
          calLink={calLink}
          style={{ width: "100%", height: "100%", minHeight: 720, overflow: "auto" }}
          config={{ layout: "month_view", theme }}
        />
      ) : (
        <p className="py-24 text-center text-sm text-muted">{loadingLabel}</p>
      )}
    </div>
  );
}
