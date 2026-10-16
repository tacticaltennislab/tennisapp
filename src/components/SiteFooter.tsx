"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentLocaleFromPathname } from "@/components/LanguageSwitcher";
import { localizedHref } from "@/i18n/locales";
import { footerDictionaries } from "@/i18n/dictionaries/footer";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/tacticaltennislab" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=6159084826074" },
];

export default function SiteFooter() {
  const pathname = usePathname();
  const locale = currentLocaleFromPathname(pathname);
  const t = footerDictionaries[locale];

  return (
    <footer className="print:hidden border-t border-line py-8">
      <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
        <p className="text-muted">{t.tagline}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <a
            href="mailto:tacticaltennislab@gmail.com"
            className="text-body hover:text-brand-600"
          >
            tacticaltennislab@gmail.com
          </a>
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-body hover:text-brand-600"
            >
              {s.label}
            </a>
          ))}
          <Link href={localizedHref(locale, "/about")} className="text-body hover:text-brand-600">
            {t.about}
          </Link>
          <Link href={localizedHref(locale, "/faq")} className="text-body hover:text-brand-600">
            {t.faq}
          </Link>
          <Link href={`${localizedHref(locale, "/")}#reviews`} className="text-body hover:text-brand-600">
            {t.reviews}
          </Link>
          <Link href={localizedHref(locale, "/review")} className="text-body hover:text-brand-600">
            {t.leaveReview}
          </Link>
          <Link href={localizedHref(locale, "/contact")} className="text-body hover:text-brand-600">
            {t.contact}
          </Link>
          <Link href="/terms" className="text-muted hover:text-brand-600">
            {t.terms}
          </Link>
          <Link href="/privacy" className="text-muted hover:text-brand-600">
            {t.privacy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
