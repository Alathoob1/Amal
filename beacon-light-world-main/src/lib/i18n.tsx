import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Dict, type Lang } from "./i18n-dict";

type Ctx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  t: Dict;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "hemaya.lang";

function readInitial(): Lang {
  if (typeof window === "undefined") return "ar";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "ar" || stored === "en") return stored;
  return "ar";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  // Hydrate from localStorage on the client without breaking SSR.
  useEffect(() => {
    const initial = readInitial();
    setLangState(initial);
  }, []);

  // Reflect language onto <html> for global CSS (dir, lang, font-family swap).
  useEffect(() => {
    if (typeof document === "undefined") return;
    const html = document.documentElement;
    html.setAttribute("lang", lang);
    html.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, l);
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      t: dictionaries[lang],
      setLang,
      toggle: () => setLang(lang === "ar" ? "en" : "ar"),
    }),
    [lang, setLang],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    // Safe fallback during SSR shell or if provider is missing.
    return {
      lang: "ar" as Lang,
      dir: "rtl" as const,
      t: dictionaries.ar,
      setLang: () => {},
      toggle: () => {},
    };
  }
  return ctx;
}

export function useT() {
  return useLanguage().t;
}