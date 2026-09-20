"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence, type PanInfo } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import { IconArrowRight, IconTarget } from "@/components/icons";
import type { Plan } from "@/lib/plans";
import { referralDiscountPercent } from "@/lib/referralPricing";
import { planTranslations } from "@/i18n/dictionaries/plans";
import { pricingDictionaries } from "@/i18n/dictionaries/pricing";
import { localizedHref, type AppLocale } from "@/i18n/locales";

export type { Plan };

const SWIPE_THRESHOLD = 60;

export default function PricingCarousel({
  plans,
  referralCount = 0,
  lang = "en",
}: {
  plans: Plan[];
  referralCount?: number;
  lang?: AppLocale;
}) {
  const t = pricingDictionaries[lang].carousel;
  const [index, setIndex] = useState(0);
  const [checkingOut, setCheckingOut] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState<Record<string, boolean>>({});
  const { data: session, status } = useSession();
  const router = useRouter();

  function formatCents(cents: number): string {
    if (cents <= 0) return t.freeLabel;
    return cents % 100 === 0 ? `$${cents / 100}` : `$${(cents / 100).toFixed(2)}`;
  }

  function textFor(plan: Plan) {
    return lang === "en" ? plan : planTranslations[plan.planId]?.[lang] || plan;
  }

  const withdrawalNotice: Record<Plan["mode"], string> = {
    payment: t.withdrawalPayment,
    subscription: t.withdrawalSubscription,
  };

  function go(delta: 1 | -1) {
    setIndex((i) => (i + delta + plans.length) % plans.length);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  }

  async function handleGetStarted(plan: Plan) {
    if (status === "loading") return;
    if (!acknowledged[plan.planId]) return;

    if (!session) {
      router.push(localizedHref(lang, `/sign-in?callbackUrl=${localizedHref(lang, "/pricing")}`));
      return;
    }

    setCheckingOut(plan.planId);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: plan.planId, acknowledgedWithdrawal: true }),
    });

    const data = await res.json().catch(() => ({}));
    setCheckingOut(null);

    if (data.url) {
      window.location.assign(data.url);
    }
  }

  const currentText = textFor(plans[index]);

  return (
    <div>
      <div className="relative max-w-md lg:max-w-lg mx-auto">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label={t.prevAria}
          className="absolute -left-4 sm:-left-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface border border-line shadow-sm flex items-center justify-center hover:border-brand-600 hover:text-brand-600 transition-colors"
        >
          <IconArrowRight className="w-4 h-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label={t.nextAria}
          className="absolute -right-4 sm:-right-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-surface border border-line shadow-sm flex items-center justify-center hover:border-brand-600 hover:text-brand-600 transition-colors"
        >
          <IconArrowRight className="w-4 h-4" />
        </button>

        <div className="overflow-hidden rounded-2xl">
          <motion.div
            className="flex items-stretch"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            animate={{ x: `-${index * 100}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {plans.map((plan) => {
              const text = textFor(plan);
              const discountPercent = referralDiscountPercent(referralCount, plan.planId);
              const discountedCents =
                discountPercent > 0
                  ? Math.round((plan.amountCents * (100 - discountPercent)) / 100)
                  : plan.amountCents;

              return (
              <div key={plan.name} className="w-full shrink-0 px-1">
                <TiltCard
                  maxTilt={5}
                  className={`h-full flex flex-col rounded-2xl border p-6 sm:p-8 shadow-sm cursor-grab active:cursor-grabbing ${
                    plan.featured
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-line bg-surface"
                  }`}
                >
                  <h3 className={`font-bold text-xl ${plan.featured ? "text-white" : "text-ink"}`}>
                    {text.name}
                  </h3>
                  {discountPercent > 0 ? (
                    <p className="mt-3 flex items-baseline gap-2 flex-wrap">
                      <span className={`text-sm line-through ${plan.featured ? "text-white/60" : "text-muted"}`}>
                        {plan.price}
                      </span>
                      <span className="text-4xl font-bold">{formatCents(discountedCents)}</span>
                      <span className={plan.featured ? "text-white/70" : "text-muted"}>
                        {text.period}
                      </span>
                      <span
                        className={`text-xs font-semibold rounded-full px-2 py-0.5 ${
                          plan.featured ? "bg-white/20 text-white" : "bg-lime-100 text-lime-700"
                        }`}
                      >
                        {discountPercent}
                        {t.referralDiscount}
                      </span>
                    </p>
                  ) : (
                    <p className="mt-3 flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className={plan.featured ? "text-white/70" : "text-muted"}>
                        {text.period}
                      </span>
                    </p>
                  )}
                  <p className={`mt-3 text-sm ${plan.featured ? "text-white/85" : "text-body"}`}>
                    {text.description}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm flex-1">
                    {text.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className={plan.featured ? "text-lime-300" : "text-brand-600"}>
                          ✓
                        </span>
                        <span className={plan.featured ? "text-white/90" : "text-body"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <label
                    className={`mt-5 flex items-start gap-2 text-xs ${plan.featured ? "text-white/85" : "text-body"}`}
                  >
                    <input
                      type="checkbox"
                      checked={acknowledged[plan.planId] || false}
                      onChange={(e) =>
                        setAcknowledged((prev) => ({ ...prev, [plan.planId]: e.target.checked }))
                      }
                      className="mt-0.5 shrink-0"
                    />
                    <span>{withdrawalNotice[plan.mode]}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleGetStarted(plan)}
                    disabled={checkingOut === plan.planId || !acknowledged[plan.planId]}
                    className={`mt-3 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0 disabled:cursor-not-allowed ${
                      plan.featured
                        ? "bg-white text-brand-700 hover:bg-white/90"
                        : "bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow-md"
                    }`}
                  >
                    {checkingOut === plan.planId ? t.redirecting : t.getStarted}
                    <IconArrowRight className="w-4 h-4" />
                  </button>
                  <p
                    className={`mt-3 text-center text-xs ${plan.featured ? "text-white/70" : "text-muted"}`}
                  >
                    {t.agreePrefix}{" "}
                    <Link
                      href={localizedHref(lang, "/terms")}
                      className={plan.featured ? "underline hover:text-white" : "text-brand-600 hover:underline"}
                    >
                      {t.termsLabel}
                    </Link>{" "}
                    {t.andLabel}{" "}
                    <Link
                      href={localizedHref(lang, "/privacy")}
                      className={plan.featured ? "underline hover:text-white" : "text-brand-600 hover:underline"}
                    >
                      {t.privacyLabel}
                    </Link>
                    .
                  </p>
                </TiltCard>
              </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {plans.map((p, i) => (
          <button
            key={p.name}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Show ${p.name}`}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-brand-600" : "w-2 bg-line hover:bg-brand-100"
            }`}
          />
        ))}
      </div>

      <div className="mt-10 max-w-2xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={plans[index].planId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-line bg-brand-50/40 p-6 sm:p-8"
          >
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
              {t.whatYouGetEyebrow}
            </p>
            <h3 className="text-xl font-bold mt-1">
              {t.whatYouGetTitle.replace("{plan}", currentText.name)}
            </h3>
            <ul className="mt-5 space-y-3">
              {currentText.whatYouGet.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="shrink-0 mt-0.5 text-brand-600">
                    <IconTarget className="w-4 h-4" />
                  </span>
                  <span className="text-sm text-body">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
        <p className="mt-6 text-sm text-muted text-center max-w-xl mx-auto">{t.coachNote}</p>
      </div>
    </div>
  );
}
