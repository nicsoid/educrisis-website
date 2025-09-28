import React from "react";
import { useI18n } from "../context/I18nContext";

export default function EvolutionPage() {
  const { t } = useI18n();

  return (
    <div className="container mx-auto px-4 py-6 md:py-8">
      {/* <h1
        className="text-2xl md:text-4xl font-bold mb-4 md:mb-6"
        style={{ color: "#002866" }}
      >
        {t("evolutionTitle")}
      </h1> */}

      <img src="/assets/evolution-1-last-day.png" height={300} />

      <div className="prose max-w-none" style={{ color: "#002866" }}>
        <p className="text-base md:text-lg mb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent")}
        </p>
        <p className="text-base md:text-lg mb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent2")}
        </p>
        <p className="text-base md:text-lg mb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent3")}
        </p>
        <p className="text-base md:text-lg mb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent4")}
        </p>
        <p className="text-base md:text-lg mb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent5")}
        </p>
        <p className="text-base md:text-lg mb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent6")}
        </p>
        <p className="text-base md:text-lg mb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent7")}
        </p>
        <p className="text-base md:text-lg mb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent8")}
        </p>
        <p className="text-base md:text-lg mb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent9")}
        </p>
        <p className="text-base md:text-lg mb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent10")}
        </p>
        <p className="text-base md:text-lg mb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent11")}
        </p>
        <p className="text-base md:text-lg mb-4">
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent12")}
        </p>
      </div>
    </div>
  );
}
