export const locales = ["en", "ru", "tr", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const languageNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  tr: "Türkçe",
  de: "Deutsch",
};

export const intlLocales: Record<Locale, string> = {
  en: "en-US",
  ru: "ru-RU",
  tr: "tr-TR",
  de: "de-DE",
};

const en = {
  "meta.description":
    "JavaScript Software Engineer. I build web applications and the systems behind them.",
  "a11y.skip": "Skip to content",
  "a11y.toggleTheme": "Toggle theme",
  "a11y.menu": "Menu",
  "nav.work": "Work",
  "nav.about": "About",
  "nav.writing": "Writing",
  "nav.log": "Log",
  "nav.shipLog": "Ship log",
  "nav.contact": "Contact",
  "nav.home": "Home",
  "hero.badge": "Open to work",
  "hero.role": "JavaScript Software Engineer.",
  "hero.leadBefore": "I build",
  "hero.leadHighlight": "web applications",
  "hero.leadAfter": "and the systems behind them.",
  "hero.cta": "Get in touch",
  "section.shipLog": "Ship log",
  "section.work": "Work",
  "section.writing": "Writing",
  "section.experience": "Experience",
  "section.education": "Education",
  "section.stack": "Stack",
  "section.recognition": "Recognition",
  "section.contact": "Contact",
  "shipLog.full": "Full log",
  "writing.all": "All posts",
  "recognition.certificate": "Certificate",
  "stack.language": "Language",
  "stack.frontend": "Frontend",
  "stack.backend": "Backend & Database",
  "stack.testing": "Testing",
  "stack.infra": "Infrastructure",
  "stack.tools": "Tools",
  "contact.title": "Open to remote, hybrid or on-site roles.",
  "contact.lead": "Have a role, a project or a question? Email is the fastest way to reach me.",
  "contact.copy": "Copy email address",
  "contact.copied": "Copied",
  "contact.location": "Antalya, Turkey · UTC+3",
  "contact.send": "Send an email",
  "footer.label": "Footer",
  "footer.deployedOn": "Deployed on",
  "footer.deployedValue": "Own VPS · Docker",
  "footer.source": "Source code",
  "footer.sourceValue": "Open soon",
  "footer.license": "License",
  "footer.typeface": "Typeface",
  "footer.builtWith": "Built with",
  "footer.lastDeployed": "Last deployed",
  "log.title": "Ship log",
  "log.description": "A dated record of what I’ve shipped.",
  "blog.title": "Writing",
  "blog.description": "Notes on the things I build and the tools I use.",
  "blog.minRead": "{n} min read",
  "blog.onThisPage": "On this page",
  "blog.backToTop": "Back to top",
  "about.title": "About",
  "about.description": "Who I am and what I’m working on.",
  "about.role": "JavaScript Software Engineer",
  "about.location": "Antalya, Turkey",
  "about.greeting": "Merhaba!",
  "about.intro":
    "I’m Hamza Kargin — a JavaScript Software Engineer who builds web applications end to end, from the database to the server they run on.",
  "about.nowBefore": "Currently running",
  "about.nowAfter": ", an airport transfer booking platform, in production.",
  "about.personal":
    "Off the keyboard, you’ll find me at the gym, picking up Russian or out somewhere new with a camera.",
  "time.same": "same time as you",
  "time.ahead": "{n}h ahead",
  "time.behind": "{n}h behind",
  "language.label": "Language",
} as const;

export type UiKey = keyof typeof en;

export const ui: Record<Locale, Partial<Record<UiKey, string>>> = {
  en,
  ru: {},
  tr: {},
  de: {},
};
