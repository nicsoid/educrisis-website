// src/pages/HelpEquipment.jsx
import React from "react";
import { useI18n } from "../context/I18nContext";

export default function HelpEquipment() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#002866" }}>
          {t("helpEquipment")}
        </h1>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2
            className="text-2xl font-semibold mb-6"
            style={{ color: "#0066CC" }}
          >
            Help with Equipment
          </h2>
          <p className="mb-6 text-gray-700">
            Educational equipment donations help us provide students and
            teachers with the tools they need for effective learning.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-3" style={{ color: "#002866" }}>
                Equipment We Need:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Laptops and tablets</li>
                <li>Projectors and screens</li>
                <li>Internet routers and modems</li>
                <li>Printers and scanners</li>
                <li>Educational software licenses</li>
                <li>School supplies and materials</li>
              </ul>
            </div>

            <div className="border rounded-lg p-6">
              <h3 className="font-semibold mb-3" style={{ color: "#002866" }}>
                How to Donate Equipment:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>Contact us to discuss your donation</li>
                <li>We'll arrange collection or shipping</li>
                <li>Equipment is inspected and prepared</li>
                <li>Distribution to schools in need</li>
                <li>You receive an impact report</li>
              </ol>
            </div>
          </div>

          <div className="mt-8 p-6 bg-yellow-50 rounded-lg">
            <p className="text-gray-700">
              <strong>Contact us:</strong> For equipment donations, please email{" "}
              <a
                href="mailto:equipment@educrisis.org"
                className="text-blue-600 hover:underline"
              >
                equipment@educrisis.org
              </a>{" "}
              or call +380 XX XXX XXXX
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
