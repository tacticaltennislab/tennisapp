"use client";

import { useEffect, useState } from "react";
import { IconBell, IconBellOff } from "@/components/icons";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default function PushToggle({ showLabel = false }: { showLabel?: boolean }) {
  const [supported, setSupported] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;
    // Feature detection reads browser-only APIs unavailable during SSR,
    // so it can't be computed during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(true);

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => registration.pushManager.getSubscription())
      .then((sub) => setSubscribed(Boolean(sub)))
      .catch(() => {});
  }, []);

  async function subscribe() {
    const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (!publicKey) return;

    setBusy(true);
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        setBusy(false);
        return;
      }

      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicKey),
      });

      await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });
      setSubscribed(true);
    } catch {
      // ignore -- user can retry
    } finally {
      setBusy(false);
    }
  }

  async function unsubscribe() {
    setBusy(true);
    try {
      const registration = await navigator.serviceWorker.ready;
      const sub = await registration.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/unsubscribe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setSubscribed(false);
    } catch {
      // ignore -- user can retry
    } finally {
      setBusy(false);
    }
  }

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={() => (subscribed ? unsubscribe() : subscribe())}
      disabled={busy}
      aria-label={subscribed ? "Turn off notifications" : "Turn on notifications"}
      title={subscribed ? "Notifications on" : "Get notified about new messages"}
      className={
        showLabel
          ? "flex items-center gap-2 py-2 text-body hover:text-brand-600 disabled:opacity-60"
          : `p-2 rounded-lg border transition-colors disabled:opacity-60 ${
              subscribed
                ? "border-brand-600 text-brand-600 bg-brand-50"
                : "border-line text-body hover:border-brand-600 hover:text-brand-600"
            }`
      }
    >
      {subscribed ? <IconBell className="w-4 h-4" /> : <IconBellOff className="w-4 h-4" />}
      {showLabel && <span>{subscribed ? "Notifications on" : "Turn on notifications"}</span>}
    </button>
  );
}
