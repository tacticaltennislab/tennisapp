"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { currentLocaleFromPathname } from "@/components/LanguageSwitcher";

/** The root <html lang="en"> is static since English pages live outside
 * any [lang] segment -- this keeps it in sync with the actual locale on
 * translated routes, which matters for screen readers and search engines. */
export default function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = currentLocaleFromPathname(pathname);
  }, [pathname]);

  return null;
}
