// src/pages/BankTransfer.jsx
import React, { useState } from "react";
import { useI18n } from "../context/I18nContext";

export default function BankTransfer() {
  const { t } = useI18n();
  const [activeTab, setActiveTab] = useState("USD");

  // Define the content for each currency
  const currencyData = {
    USD: {
      ibanLabel: "IBAN Code (USD)",
      ibanCode: "UA533052990000026004050595672",
      bankName:
        'JSC CB "PRIVATBANK", 1D HRUSHEVSKOHO STR., KYIV, 01001, UKRAINE',
      swiftCode: "PBANUA2X",
      remittanceInfo: "Charitable donation",
    },
    EUR: {
      ibanLabel: "IBAN Code (EUR)",
      ibanCode: "UA073052990000026007050596883",
      bankName:
        'JSC CB "PRIVATBANK", 1D HRUSHEVSKOHO STR., KYIV, 01001, UKRAINE',
      swiftCode: "PBANUA2X",
      remittanceInfo: "Charitable donation",
    },
    UAH: {
      ibanLabel: "IBAN Code (UAH)",
      ibanCode: "UA853052990000026005050597099",
      bankName: "АТ КБ «ПриватБанк»",
      receiverCodeLabel: "Код отримувача/Receiver code",
      receiverCode: "45390896",
      remittanceInfo: "Пожертва",
    },
  };

  // Helper function to render a single content section
  const renderContent = (currency) => {
    const data = currencyData[currency];

    // Common details for all currencies
    const commonDetails = (
      <>
        <p className="text-gray-600">Назва Компанії/Company Name</p>
        <p className="text-xl font-semibold text-gray-900">
          EDUCrisis Relief Ukraine
        </p>

        <p className="text-gray-600">{data.ibanLabel}</p>
        <p className="font-mono break-all">{data.ibanCode}</p>

        <p className="text-gray-600">Назва банку/Name of the bank</p>
        <p>{data.bankName}</p>
      </>
    );

    // Details unique to UAH (Receiver Code)
    // Details unique to UAH (Receiver Code)
    const uahSpecificDetails = (
      <>
        <p className="text-gray-600">{data.receiverCodeLabel}</p>
        <p className="font-semibold">{data.receiverCode}</p>
      </>
    );

    // Details common to USD and EUR (SWIFT Code)
    const internationalDetails = (
      <>
        <p className="text-gray-600">SWIFT code</p>
        <p className="font-semibold">{data.swiftCode}</p>
      </>
    );

    return (
      <div className="space-y-4">
        {commonDetails}

        {/* Conditional rendering for currency-specific fields */}
        {currency === "UAH" ? uahSpecificDetails : internationalDetails}

        <p className="text-gray-600">Адреса компанії/Company address</p>
        <p>04070, Ukraine, Kyiv, Borisohlibska str 16A, Apt 4</p>

        <p className="text-gray-600">
          Призначення платежу/Remittance information
        </p>
        <p className="font-semibold">{data.remittanceInfo}</p>
      </div>
    );
  };

  // Helper function to get the Tailwind classes for a tab button
  const getTabClasses = (tab) => {
    // These classes mimic the active/inactive state from your screenshots
    return activeTab === tab
      ? "px-4 py-2 text-sm font-medium border-t border-l border-r rounded-t-lg bg-gray-100 border-gray-200 text-gray-700"
      : "px-4 py-2 text-sm font-medium border-b border-gray-200 text-gray-500 hover:text-gray-700";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#002866" }}>
          {t("bankTransfer")}
        </h1>

        <div className="bg-white shadow-md p-8">
          <div className="prose max-w-none">
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "#002866" }}
            >
              {t("bankTransferText1")}
            </p>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "#002866" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("bankTransferText2")}
            </p>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "#002866" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("bankTransferText3")}
            </p>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "#002866" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{t("bankTransferText4")}
            </p>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "#002866" }}
            >
              {t("bankTransferText5")}
            </p>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "#002866" }}
            >
              {t("bankTransferText6")}
            </p>
            <p
              className="text-lg leading-relaxed mb-6"
              style={{ color: "#002866" }}
            >
              {t("bankTransferText7")}
            </p>
          </div>
        </div>

        <div className=" p-6 shadow-sm bg-white">
          {/* Tab Controls */}
          <div className="flex border-b mb-6">
            {["USD", "EUR", "UAH"].map((tab) => (
              <button
                key={tab}
                className={getTabClasses(tab)}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
            <div className="flex-grow border-b border-gray-200"></div>
          </div>

          {/* Tab Content Container */}
          <div id="tab-content">{renderContent(activeTab)}</div>
        </div>
      </div>
    </div>
  );
}
