// src/pages/MajorGift.jsx
import React from "react";
import { useI18n } from "../context/I18nContext";

export default function MajorGift() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#002866" }}>
          {t("makeGift")}
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2
            className="text-2xl font-semibold mb-6"
            style={{ color: "#0066CC" }}
          >
            Make a Major Gift
          </h2>
          <p className="mb-6 text-gray-700">
            Your major gift can make a transformative impact on education in
            Ukraine. Major gifts of $10,000 or more provide critical support for
            our programs.
          </p>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-6">
            <h3 className="font-semibold mb-2">Benefits of Major Giving:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Direct impact on educational programs</li>
              <li>Named giving opportunities</li>
              <li>Regular impact reports</li>
              <li>Recognition in annual report</li>
              <li>Invitations to special events</li>
            </ul>
          </div>

          <p className="text-gray-700">
            To discuss major gift opportunities, please contact our development
            team at{" "}
            <a
              href="mailto:development@educrisis.org"
              className="text-blue-600 hover:underline"
            >
              development@educrisis.org
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
