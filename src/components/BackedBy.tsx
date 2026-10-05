import Reveal from "@/components/Reveal";
import type { AppLocale } from "@/i18n/locales";

const COPY: Record<AppLocale, { eyebrow: string; title: string; body: string; note: string }> = {
  en: {
    eyebrow: "Our backing",
    title: "Backed by Stanford University",
    body: "Stanford University is backing the development of our software. Their support helps us build better tools for video and match analysis, so players, coaches and academies get feedback they can trust.",
    note: "Tactical Tennis Lab is an independent project. Stanford University is a supporter of the software development.",
  },
  pl: {
    eyebrow: "Nasze wsparcie",
    title: "Wspierani przez Uniwersytet Stanforda",
    body: "Uniwersytet Stanforda wspiera rozwój naszego oprogramowania. Dzięki temu budujemy lepsze narzędzia do analizy wideo i meczów, aby zawodnicy, trenerzy i akademie dostawali opinie, którym mogą zaufać.",
    note: "Tactical Tennis Lab to niezależny projekt. Uniwersytet Stanforda wspiera rozwój oprogramowania.",
  },
  es: {
    eyebrow: "Nuestro respaldo",
    title: "Con el respaldo de la Universidad de Stanford",
    body: "La Universidad de Stanford respalda el desarrollo de nuestro software. Su apoyo nos ayuda a crear mejores herramientas de análisis de vídeo y de partidos, para que jugadores, entrenadores y academias reciban opiniones en las que puedan confiar.",
    note: "Tactical Tennis Lab es un proyecto independiente. La Universidad de Stanford apoya el desarrollo del software.",
  },
  it: {
    eyebrow: "Il nostro sostegno",
    title: "Con il sostegno della Stanford University",
    body: "La Stanford University sostiene lo sviluppo del nostro software. Il suo supporto ci aiuta a creare strumenti migliori per l'analisi di video e partite, così giocatori, allenatori e accademie ricevono feedback di cui possono fidarsi.",
    note: "Tactical Tennis Lab è un progetto indipendente. La Stanford University sostiene lo sviluppo del software.",
  },
  ru: {
    eyebrow: "Наша поддержка",
    title: "При поддержке Стэнфордского университета",
    body: "Стэнфордский университет поддерживает разработку нашего программного обеспечения. Эта поддержка помогает нам создавать более качественные инструменты видеоанализа и разбора матчей, чтобы игроки, тренеры и академии получали отзывы, которым можно доверять.",
    note: "Tactical Tennis Lab — независимый проект. Стэнфордский университет поддерживает разработку программного обеспечения.",
  },
};

export default function BackedBy({ lang = "en" }: { lang?: AppLocale }) {
  const t = COPY[lang];

  return (
    <section className="px-4 py-16">
      <Reveal>
        <div className="max-w-3xl mx-auto rounded-3xl border border-line bg-surface p-8 sm:p-12 text-center shadow-sm">
          <p className="text-sm font-semibold text-brand-600 uppercase tracking-wide">{t.eyebrow}</p>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold">{t.title}</h2>
          <p className="mt-4 text-body max-w-xl mx-auto">{t.body}</p>
          <p className="mt-6 text-xs text-muted max-w-md mx-auto">{t.note}</p>
        </div>
      </Reveal>
    </section>
  );
}
