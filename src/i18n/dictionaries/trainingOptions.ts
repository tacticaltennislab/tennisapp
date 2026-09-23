import type { AppLocale } from "@/i18n/locales";
import type { FocusArea, Goal, SkillLevel } from "@/lib/trainingOptions";

interface TrainingOptionsText {
  levels: Record<SkillLevel, string>;
  goals: Record<Goal, string>;
  focusAreas: Record<FocusArea, string>;
}

const en: TrainingOptionsText = {
  levels: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
  goals: {
    "general-fitness": "General Fitness",
    technique: "Technique Improvement",
    "tournament-prep": "Tournament Preparation",
    footwork: "Footwork & Movement",
  },
  focusAreas: {
    serve: "Serve",
    forehand: "Forehand",
    backhand: "Backhand",
    volleys: "Volleys & Net Play",
    footwork: "Footwork & Movement",
    tactical: "Tactical Training",
    fitness: "Fitness & Conditioning",
    mental: "Mental Game",
  },
};

const pl: TrainingOptionsText = {
  levels: { beginner: "Początkujący", intermediate: "Średniozaawansowany", advanced: "Zaawansowany" },
  goals: {
    "general-fitness": "Ogólna sprawność",
    technique: "Poprawa techniki",
    "tournament-prep": "Przygotowanie do turnieju",
    footwork: "Praca nóg i ruch",
  },
  focusAreas: {
    serve: "Serwis",
    forehand: "Forehand",
    backhand: "Backhand",
    volleys: "Wolej i gra przy siatce",
    footwork: "Praca nóg i ruch",
    tactical: "Trening taktyczny",
    fitness: "Kondycja i sprawność",
    mental: "Gra mentalna",
  },
};

const es: TrainingOptionsText = {
  levels: { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" },
  goals: {
    "general-fitness": "Forma física general",
    technique: "Mejora de técnica",
    "tournament-prep": "Preparación para torneo",
    footwork: "Juego de piernas y movimiento",
  },
  focusAreas: {
    serve: "Servicio",
    forehand: "Derecha",
    backhand: "Revés",
    volleys: "Voleas y juego de red",
    footwork: "Juego de piernas y movimiento",
    tactical: "Entrenamiento táctico",
    fitness: "Forma física y acondicionamiento",
    mental: "Juego mental",
  },
};

const it: TrainingOptionsText = {
  levels: { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzato" },
  goals: {
    "general-fitness": "Forma fisica generale",
    technique: "Miglioramento tecnico",
    "tournament-prep": "Preparazione al torneo",
    footwork: "Gioco di gambe e movimento",
  },
  focusAreas: {
    serve: "Servizio",
    forehand: "Diritto",
    backhand: "Rovescio",
    volleys: "Volée e gioco a rete",
    footwork: "Gioco di gambe e movimento",
    tactical: "Allenamento tattico",
    fitness: "Fitness e condizionamento",
    mental: "Gioco mentale",
  },
};

const ru: TrainingOptionsText = {
  levels: { beginner: "Начинающий", intermediate: "Средний уровень", advanced: "Продвинутый" },
  goals: {
    "general-fitness": "Общая физподготовка",
    technique: "Улучшение техники",
    "tournament-prep": "Подготовка к турниру",
    footwork: "Работа ног и передвижение",
  },
  focusAreas: {
    serve: "Подача",
    forehand: "Форхенд",
    backhand: "Бэкхенд",
    volleys: "Игра с лёта у сетки",
    footwork: "Работа ног и передвижение",
    tactical: "Тактическая тренировка",
    fitness: "Физподготовка",
    mental: "Ментальная игра",
  },
};

const trainingOptionsDictionaries: Record<AppLocale, TrainingOptionsText> = { en, pl, es, it, ru };

export function focusLabel(area: FocusArea, lang: AppLocale = "en"): string {
  return trainingOptionsDictionaries[lang].focusAreas[area];
}

export function goalLabel(goal: Goal, lang: AppLocale = "en"): string {
  return trainingOptionsDictionaries[lang].goals[goal];
}

export function levelLabel(level: SkillLevel, lang: AppLocale = "en"): string {
  return trainingOptionsDictionaries[lang].levels[level];
}

export function localizedLevels(lang: AppLocale = "en"): { value: SkillLevel; label: string }[] {
  const t = trainingOptionsDictionaries[lang].levels;
  return (Object.keys(t) as SkillLevel[]).map((value) => ({ value, label: t[value] }));
}

export function localizedGoals(lang: AppLocale = "en"): { value: Goal; label: string }[] {
  const t = trainingOptionsDictionaries[lang].goals;
  return (Object.keys(t) as Goal[]).map((value) => ({ value, label: t[value] }));
}
