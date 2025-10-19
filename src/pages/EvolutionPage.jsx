// src/pages/Evolution.jsx
import React from "react";
import { useI18n } from "../context/I18nContext";

export default function Evolution() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-[1200px] py-12">
        <h1
          className="text-4xl font-bold mb-8 text-center"
          style={{ color: "#002866", display: "none" }}
        >
          {t("evolution")}
        </h1>

        {/* Large centered photo https://via.placeholder.com/1200x600/0066CC/FFCC00?text=Evolution+of+EduCrisis*/}
        <div className="w-full mb-12">
          <img
            src="/assets/evolution-1-last-day.png"
            alt="Evolution of EduCrisis"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>

        <div className="prose max-w-none">
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "#002866" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent")}
          </p>
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "#002866" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent2")}
          </p>
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "#002866" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent3")}
          </p>
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "#002866" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent4")}
          </p>
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "#002866" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent5")}
          </p>
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "#002866" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent6")}
          </p>
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "#002866" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent7")}
          </p>
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "#002866" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent8")}
          </p>
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "#002866" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent9")}
          </p>
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "#002866" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent10")}
          </p>
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "#002866" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent11")}
          </p>
          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "#002866" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent12")}
          </p>
        </div>
      </div>
    </div>
  );
}

//   <div className="prose max-w-none" style={{ color: "#002866" }}>
//     <p className="text-base md:text-lg mb-4">
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent")}
//     </p>
//     <p className="text-base md:text-lg mb-4">
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent2")}
//     </p>
//     <p className="text-base md:text-lg mb-4">
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent3")}
//     </p>
//     <p className="text-base md:text-lg mb-4">
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent4")}
//     </p>
//     <p className="text-base md:text-lg mb-4">
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent5")}
//     </p>
//     <p className="text-base md:text-lg mb-4">
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent6")}
//     </p>
//     <p className="text-base md:text-lg mb-4">
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent7")}
//     </p>
//     <p className="text-base md:text-lg mb-4">
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent8")}
//     </p>
//     <p className="text-base md:text-lg mb-4">
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent9")}
//     </p>
//     <p className="text-base md:text-lg mb-4">
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent10")}
//     </p>
//     <p className="text-base md:text-lg mb-4">
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent11")}
//     </p>
//     <p className="text-base md:text-lg mb-4">
//       &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("evolutionContent12")}
//     </p>
//   </div>
