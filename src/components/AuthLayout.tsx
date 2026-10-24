import CourtBackdrop from "@/components/CourtBackdrop";
import { authDictionaries } from "@/i18n/dictionaries/auth";
import type { AppLocale } from "@/i18n/locales";

export default function AuthLayout({
  title,
  subtitle,
  lang = "en",
  children,
}: {
  title: string;
  subtitle: string;
  lang?: AppLocale;
  children: React.ReactNode;
}) {
  const panel = authDictionaries[lang].panel;

  return (
    <main className="flex-1 grid lg:grid-cols-2">
      <div className="hidden lg:flex relative overflow-hidden items-end">
        <div className="court-zoom-wrap absolute inset-0">
          <div className="animate-court-zoom absolute inset-0">
            <CourtBackdrop />
          </div>
        </div>
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(200deg, rgba(10,20,14,0.55) 0%, rgba(10,20,14,0.85) 70%, rgba(10,20,14,0.95) 100%)",
          }}
        />
        <div className="relative p-10 text-white max-w-md">
          <p className="text-sm font-semibold text-gold uppercase tracking-wide">
            Tactical Tennis Lab
          </p>
          <h2 className="text-3xl font-bold mt-2 leading-tight text-white">{panel.title}</h2>
          <p className="mt-3 text-white/70">{panel.subtitle}</p>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-16 bg-surface">
        <div className="w-full max-w-sm animate-fade-up">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-body">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </main>
  );
}
