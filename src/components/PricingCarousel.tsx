"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion, type PanInfo } from "framer-motion";
import TiltCard from "@/components/TiltCard";
import { IconArrowRight } from "@/components/icons";

export interface Plan {
  planId: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  featured?: boolean;
}

const SWIPE_THRESHOLD = 60;

export default function PricingCarousel({ plans }: { plans: Plan[] }) {
  const [index, setIndex] = useState(0);
  const [checkingOut, setCheckingOut] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  function go(delta: 1 | -1) {
    setIndex((i) => (i + delta + plans.length) % plans.length);
  }

  function handleDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.x < -SWIPE_THRESHOLD) go(1);
    else if (info.offset.x > SWIPE_THRESHOLD) go(-1);
  }

  async function handleGetStarted(plan: Plan) {
    if (status === "loading") return;

    if (!session) {
      router.push(`/sign-in?callbackUrl=/pricing`);
      return;
    }

    setCheckingOut(plan.planId);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ planId: plan.planId }),
    });

    const data = await res.json().catch(() => ({}));
    setCheckingOut(null);

    if (data.url) {
      window.location.assign(data.url);
    }
  }

  return (
    <div>
      <div className="relative max-w-md lg:max-w-lg mx-auto">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous plan"
          className="absolute -left-4 sm:-left-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-line shadow-sm flex items-center justify-center hover:border-brand-600 hover:text-brand-600 transition-colors"
        >
          <IconArrowRight className="w-4 h-4 rotate-180" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next plan"
          className="absolute -right-4 sm:-right-14 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white border border-line shadow-sm flex items-center justify-center hover:border-brand-600 hover:text-brand-600 transition-colors"
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
            {plans.map((plan) => (
              <div key={plan.name} className="w-full shrink-0 px-1">
                <TiltCard
                  maxTilt={5}
                  className={`h-full flex flex-col rounded-2xl border p-6 sm:p-8 shadow-sm cursor-grab active:cursor-grabbing ${
                    plan.featured
                      ? "border-brand-600 bg-brand-600 text-white"
                      : "border-line bg-white"
                  }`}
                >
                  <h3 className={`font-bold text-xl ${plan.featured ? "text-white" : "text-ink"}`}>
                    {plan.name}
                  </h3>
                  <p className="mt-3 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className={plan.featured ? "text-white/70" : "text-muted"}>
                      {plan.period}
                    </span>
                  </p>
                  <p className={`mt-3 text-sm ${plan.featured ? "text-white/85" : "text-body"}`}>
                    {plan.description}
                  </p>
                  <ul className="mt-4 space-y-2 text-sm flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className={plan.featured ? "text-lime-300" : "text-brand-600"}>
                          ✓
                        </span>
                        <span className={plan.featured ? "text-white/90" : "text-body"}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => handleGetStarted(plan)}
                    disabled={checkingOut === plan.planId}
                    className={`mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:translate-y-0 ${
                      plan.featured
                        ? "bg-white text-brand-700 hover:bg-white/90"
                        : "bg-brand-600 text-white hover:bg-brand-700 shadow-sm hover:shadow-md"
                    }`}
                  >
                    {checkingOut === plan.planId ? "Redirecting..." : "Get started"}
                    <IconArrowRight className="w-4 h-4" />
                  </button>
                </TiltCard>
              </div>
            ))}
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
    </div>
  );
}
