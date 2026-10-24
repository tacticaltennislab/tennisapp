"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { currentLocaleFromPathname } from "@/components/LanguageSwitcher";
import { localizedHref } from "@/i18n/locales";
import { footerDictionaries } from "@/i18n/dictionaries/footer";
import { navDictionaries } from "@/i18n/dictionaries/nav";

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/tacticaltennislab" },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=6159084826074" },
];

export default function SiteFooter() {
  const pathname = usePathname();
  const locale = currentLocaleFromPathname(pathname);
  const t = footerDictionaries[locale];
  const link = "text-body hover:text-brand-600 transition-colors";

  return (
    // "dark" scopes the colour tokens to their dark values inside this
    // permanently dark footer.
    <footer className="dark print:hidden bg-brand-900 border-t border-white/10 text-body">
      <div className="container-x py-12 grid gap-10 md:grid-cols-[1.1fr_1.4fr] md:gap-16">
        <div>
          <Image
            src="/brand/logo-dark.png"
            alt="Tactical Tennis Lab"
            width={1203}
            height={369}
            className="h-11 w-auto"
          />
          <p className="mt-4 max-w-sm text-sm text-muted">{t.tagline}</p>
          <a
            href="mailto:tacticaltennislab@gmail.com"
            className="mt-4 inline-block text-sm text-ink hover:text-brand-600 transition-colors"
          >
            tacticaltennislab@gmail.com
          </a>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm sm:grid-cols-3 content-start">
          <Link href={localizedHref(locale, "/about")} className={link}>
            {t.about}
          </Link>
          <Link href={localizedHref(locale, "/coaches")} className={link}>
            {navDictionaries[locale].coaches}
          </Link>
          <Link href={localizedHref(locale, "/faq")} className={link}>
            {t.faq}
          </Link>
          <Link href={`${localizedHref(locale, "/")}#reviews`} className={link}>
            {t.reviews}
          </Link>
          <Link href={localizedHref(locale, "/review")} className={link}>
            {t.leaveReview}
          </Link>
          <Link href={localizedHref(locale, "/contact")} className={link}>
            {t.contact}
          </Link>
          {SOCIALS.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className={link}>
              {s.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x py-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between text-xs text-muted">
          <p>&copy; {new Date().getFullYear()} Tactical Tennis Lab</p>
          <div className="flex gap-5">
            <Link href={localizedHref(locale, "/terms")} className="hover:text-brand-600 transition-colors">
              {t.terms}
            </Link>
            <Link href={localizedHref(locale, "/privacy")} className="hover:text-brand-600 transition-colors">
              {t.privacy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
