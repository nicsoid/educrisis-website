import React, { createContext, useContext, useState, useEffect } from "react";

import enTranslations from "../locales/en.json";
import ukTranslations from "../locales/uk.json";
// import ruTranslations from "../locales/ru.json";
// import zhTranslations from "../locales/zh.json";

const translations = {
  en: enTranslations,
  uk: ukTranslations,
  // ru: ruTranslations,
  // zh: zhTranslations,
};

const I18nContext = createContext();

// Helper function to detect browser language
const detectBrowserLanguage = () => {
  // Get browser language
  const browserLang = navigator.language || navigator.userLanguage;

  // Extract language code (e.g., 'en' from 'en-US')
  const langCode = browserLang.split("-")[0].toLowerCase();

  // Map browser language codes to our supported languages
  const languageMap = {
    en: "en",
    uk: "uk",
    ua: "uk", // Ukrainian can be 'ua' or 'uk'
    // ru: "ru",
    // zh: "zh",
    // cn: "zh", // Chinese can be 'cn' or 'zh'
  };

  // Return mapped language or default to English
  return languageMap[langCode] || "en";
};

// Helper function to get initial language
const getInitialLanguage = () => {
  // First, check if there's a saved language preference
  const savedLanguage = localStorage.getItem("educrisis_language");

  if (savedLanguage && translations[savedLanguage]) {
    return savedLanguage;
  }

  // If no saved preference, detect browser language
  const browserLanguage = detectBrowserLanguage();

  // Save the detected language
  localStorage.setItem("educrisis_language", browserLanguage);

  return browserLanguage;
};

// Provider component
export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage());

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Set language and persist to localStorage
  const setLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguageState(newLanguage);
      localStorage.setItem("educrisis_language", newLanguage);
    }
  };

  // Listen for storage changes (if user changes language in another tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (
        e.key === "educrisis_language" &&
        e.newValue &&
        translations[e.newValue]
      ) {
        setLanguageState(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const value = {
    language,
    setLanguage,
    t,
    translations,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

// Custom hook to use i18n
export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }

  return context;
}
