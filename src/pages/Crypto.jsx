// src/pages/Crypto.jsx
import React from "react";
import { useI18n } from "../context/I18nContext";

export default function Crypto() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#002866" }}>
          {t("crypto")}
        </h1>

        <div className="bg-white  p-8">
          <div className="bg-white p-8">
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
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: "#002866" }}
              >
                <br />
                <br />
                {t("donateCryptoText1")}
              </p>
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: "#002866" }}
              >
                {t("donateCryptoText2")} -
                <a href="https://cwallet.com/t/BT5FY3WT" className="underline">
                  https://cwallet.com/t/BT5FY3WT
                </a>
                <img src="/assets/QRCode-1-300x300.jpg" />
              </p>
              <p
                className="text-lg leading-relaxed mb-6"
                style={{ color: "#002866" }}
              >
                {t("donateCryptoText3")} -
                <a href="https://cwallet.com/t/AN8AUL3G" className="underline">
                  https://cwallet.com/t/AN8AUL3G
                </a>
                <img src="/assets/QRCode-2-300x300.jpg" />
              </p>
            </div>
          </div>

          {/* <div className="space-y-6">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Bitcoin (BTC)</h3>
              <p className="font-mono text-sm break-all bg-gray-100 p-2 rounded">
                1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Ethereum (ETH)</h3>
              <p className="font-mono text-sm break-all bg-gray-100 p-2 rounded">
                0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
              </p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">USDT (TRC20)</h3>
              <p className="font-mono text-sm break-all bg-gray-100 p-2 rounded">
                TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
