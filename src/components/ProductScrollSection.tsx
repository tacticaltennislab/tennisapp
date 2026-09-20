"use client";

import Image from "next/image";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { homeDictionaries } from "@/i18n/dictionaries/home";
import type { AppLocale } from "@/i18n/locales";

export default function ProductScrollSection({ lang = "en" }: { lang?: AppLocale }) {
  const t = homeDictionaries[lang].productScroll;

  return (
    <div className="flex flex-col overflow-hidden bg-surface">
      <ContainerScroll
        titleComponent={
          <>
            <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">
              {t.eyebrow}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold text-ink mt-2">
              {t.titleLine1}
              <br />
              {t.titleLine2}
            </h2>
          </>
        }
      >
        <Image
          src="/product-preview.png"
          alt="A weekly tennis training plan built by a coach, showing session drills and tips"
          height={630}
          width={1568}
          className="mx-auto rounded-2xl object-contain h-full w-full"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
