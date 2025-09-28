import React, { createContext, useState, useContext } from "react";
import enTranslations from "../locales/en.json";
import ukTranslations from "../locales/uk.json";
import ruTranslations from "../locales/ru.json";
import zhTranslations from "../locales/zh.json";

const translations = {
  en: enTranslations,
  uk: ukTranslations,
  ru: ruTranslations,
  zh: zhTranslations,
};

const I18nContext = createContext();

export function I18nProvider({ children }) {
  const [language, setLanguage] = useState("en");

  const t = (key) => translations[language]?.[key] || key;

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
