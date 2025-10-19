// src/pages/Mission.jsx
import React from "react";
import { useI18n } from "../context/I18nContext";

export default function Mission() {
  const { t } = useI18n();

  const missionPoints = [
    {
      title: "WHO WE ARE",
      content:
        "We are a dedicated nonprofit organization committed to providing educational support and resources to Ukrainian communities affected by crisis. Our team consists of educators, volunteers, and advocates working together to ensure continuous access to quality education.",
    },
    {
      title: "WHAT WE DO",
      content:
        "We provide emergency educational resources, digital learning platforms, teacher training, and educational materials to students and educators in Ukraine. Our programs include remote learning support, psychological assistance for students, and rebuilding educational infrastructure.",
    },
    {
      title: "WHERE WE IMPACT",
      content:
        "Our work reaches communities across Ukraine, with a focus on regions most affected by the ongoing crisis. We operate in partnership with local schools, community centers, and educational institutions to deliver targeted support where it's needed most.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-[1200px] py-12">
        <h1
          className="text-4xl font-bold mb-12 text-center"
          style={{ color: "#002866" }}
        >
          {t("missionTitle")}
        </h1>

        {/* <div className="space-y-8 md:space-y-0">
          {missionPoints.map((point, index) => (
            <div
              key={index}
              className="grid md:grid-cols-2 gap-6 md:gap-12 mb-8 md:mb-12"
            >
             
              <div className="flex items-center justify-center md:justify-end">
                <h2
                  className="text-2xl md:text-3xl font-bold text-center md:text-right"
                  style={{ color: "#0066CC" }}
                >
                  {point.title}
                </h2>
              </div>

              
              <div className="flex items-center">
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "#002866" }}
                >
                  {point.content}
                </p>
              </div>
            </div>
          ))}
        </div> */}

        <div className="space-y-8 md:space-y-0">
          <div className="grid md:grid-cols-4 gap-6 md:gap-12 mb-8 md:mb-12">
            <div className="flex items-start justify-center md:justify-end md:col-span-1">
              <h2
                className="text-2xl md:text-3xl font-bold text-center md:text-right"
                style={{ color: "#0066CC" }}
              >
                {t("missionPart1Title")}
              </h2>
            </div>

            <div className="flex items-center md:col-span-3">
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#002866" }}
              >
                {t("missionContent")}
                <br />
                <br />
                {t("missionContent2")}
                <br />
                <br />
                {t("missionContent3")}
                <br />
                <br />
                {t("missionContent4")}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-12 mb-8 md:mb-12">
            <div className="flex items-start justify-center md:justify-end md:col-span-1">
              <h2
                className="text-2xl md:text-3xl font-bold text-center md:text-right"
                style={{ color: "#0066CC" }}
              >
                {t("missionPart2Title")}
              </h2>
            </div>

            <div className="flex items-center md:col-span-3">
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#002866" }}
              >
                {t("missionContent5")}
                <br />
                <br />
                {t("missionContent6")}
                <br />
                <br />
                {t("missionContent7")}
                <br />
                <br />
                {t("missionContent8")}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-12 mb-8 md:mb-12">
            <div className="flex items-start justify-center md:justify-end md:col-span-1">
              <h2
                className="text-2xl md:text-3xl font-bold text-center md:text-right"
                style={{ color: "#0066CC" }}
              >
                {t("missionPart3Title")}
              </h2>
            </div>

            <div className="flex items-center md:col-span-3">
              <p
                className="text-lg leading-relaxed"
                style={{ color: "#002866" }}
              >
                {t("missionContent9")}
                <br />
                <br />
                {t("missionContent10")}
                <br />
                <br />
                {t("missionContent11")}
                <br />
                <br />
                {t("missionContent12")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
