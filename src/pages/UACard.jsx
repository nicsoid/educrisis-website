// src/pages/UACard.jsx
import React, { useEffect, useRef } from "react";
import { useI18n } from "../context/I18nContext";

// Use constants for clarity and easy updates
const LIQPAY_DATA =
  "eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXlkb25hdGUiLCJhbW91bnQiOiIxMCIsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiJFZHVjcmlzaXMuT3JnIERvbmF0aW9uIiwicHVibGljX2tleSI6ImkyMzMyMjgxOTQzNyIsImxhbmd1YWdlIjoiZW4iLCJyZXN1bHRfdXJsIjoiaHR0cHM6Ly9lZHVjcmlzaXMub3JnL3VhY2FyZCJ9";
const LIQPAY_SIGNATURE = "oOBzJ7Ej2ZkVHJo/Ls3rOByZ1/U=";
const LIQPAY_SCRIPT_SRC = "//static.liqpay.ua/libjs/checkout.js";
const LIQPAY_SCRIPT_ID = "liqpay-script-tag";
const LIQPAY_CONTAINER_ID = "liqpay_checkout";

export default function UACard() {
  const { t } = useI18n();
  // Ref is used to ensure the component is mounted before initialization
  const liqpayRef = useRef(null);

  useEffect(() => {
    // 1. Define the callback function required by LiqPay
    window.LiqPayCheckoutCallback = function () {
      // This function will run when the external LiqPay script finishes loading
      if (window.LiqPayCheckout && liqpayRef.current) {
        // Use a small timeout to let the DOM settle, often fixes blinking issues
        setTimeout(() => {
          try {
            LiqPayCheckout.init({
              data: LIQPAY_DATA,
              signature: LIQPAY_SIGNATURE,
              embedTo: `#${LIQPAY_CONTAINER_ID}`,
              mode: "embed",
            })
              .on("liqpay.callback", function (data) {
                console.log("LiqPay Callback Status:", data.status);
              })
              .on("liqpay.ready", function () {
                console.log("LiqPay widget is ready.");
              })
              .on("liqpay.close", function () {
                // close
              });
          } catch (error) {
            console.error("LiqPay initialization error:", error);
          }
        }, 50); // 50ms delay
      }
    };

    // 2. Load the external script, but only once
    const scriptExists = document.getElementById(LIQPAY_SCRIPT_ID);

    if (!scriptExists) {
      const script = document.createElement("script");
      script.id = LIQPAY_SCRIPT_ID;
      script.src = LIQPAY_SCRIPT_SRC;
      // 'async' flag tells the browser to execute the script as soon as it's ready,
      // which will then call window.LiqPayCheckoutCallback
      script.async = true;
      document.body.appendChild(script);

      // Cleanup function to remove the global callback when the component unmounts
      return () => {
        delete window.LiqPayCheckoutCallback;
        // NOTE: We generally avoid removing the script itself in development to prevent issues
      };
    } else {
      // If the script is already loaded (e.g., during hot reload), call the function directly
      window.LiqPayCheckoutCallback();
    }

    // Empty dependency array ensures this setup runs exactly once on component mount
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#002866" }}>
          {t("uaDebitCredit")}
        </h1>

        <div className="bg-white rounded-lg shadow-md p-2">
          {/* <h3
            className="text-xl font-semibold mt-8 mb-4"
            style={{ color: "#002866" }}
          >
            Pay with LiqPay
          </h3> */}

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
          {/* This is the embed container for the LiqPay widget */}
          <div
            id={LIQPAY_CONTAINER_ID}
            ref={liqpayRef} // Attach the ref here
            className="min-h-[400px] border border-gray-100 rounded-lg"
          ></div>
        </div>
      </div>
    </div>
  );
}
