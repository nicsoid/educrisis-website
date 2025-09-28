import React from "react";
import { useI18n } from "../context/I18nContext";

export default function HomePage() {
  const { t } = useI18n();

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      <h1
        className="text-2xl md:text-4xl font-bold mb-4 md:mb-6"
        style={{ color: "#002866" }}
      >
        {t("homeTitle")}
      </h1>
      <div className="prose max-w-none" style={{ color: "#002866" }}>
        <p className="text-base md:text-lg mb-4">{t("homeContent")}</p>
        {/* Add more content sections here */}
      </div>
    </div>
  );
}
