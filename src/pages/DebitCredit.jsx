import React, { useState } from "react";
import { useI18n } from "../context/I18nContext";

// --- Configuration ---
// NOTE: This URL must point to your running Python backend (e.g., when deployed)
const BACKEND_URL = "http://localhost:5078/api/generate-payment-data";
const WAYFORPAY_URL = "https://secure.wayforpay.com/pay";
const WAYFORPAY_DONATION_URL =
  "https://secure.wayforpay.com/donate/educrisisorg";

const QR_CODE_URL = `/assets/qr.png`;

export default function DebitCredit() {
  const { t } = useI18n();

  const [formState, setFormState] = useState({
    clientName: "",
    clientEmail: "",
    amount: 10.0, // Default amount set to the first preset
    comment: "",
    paymentFrequency: "one_time", // 'one_time', 'weekly', 'monthly'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === "amount") {
      // Ensure amount is a number and is positive
      processedValue = Math.max(0.01, parseFloat(value) || 0);
    }

    setFormState((prev) => ({
      ...prev,
      [name]: processedValue,
    }));
  };

  // Function to handle selecting a preset amount
  const handleAmountSelect = (presetAmount) => {
    setFormState((prev) => ({
      ...prev,
      amount: presetAmount,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Basic Validation
    if (
      !formState.clientName ||
      !formState.clientEmail ||
      formState.amount <= 0
    ) {
      setError(
        "Please fill in your Name, a valid Email, and an Amount greater than zero."
      );
      setLoading(false);
      return;
    }

    // 1. Call Backend to get Signed Data
    try {
      // Send all necessary fields including the new paymentFrequency
      const response = await fetch(BACKEND_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error(`Backend failed: ${response.statusText}`);
      }

      const paymentData = await response.json();

      // 2. Create and Submit WayForPay Form

      // Check if a form is already present to prevent duplicates during re-submission
      let form = document.getElementById("wayforpay_form");
      if (form) {
        form.remove();
      }

      form = document.createElement("form");
      form.method = "POST";
      form.action = WAYFORPAY_URL;
      form.id = "wayforpay_form";
      form.style.display = "none"; // Keep the form invisible

      // Add all data fields from the backend response
      for (const key in paymentData) {
        if (paymentData.hasOwnProperty(key)) {
          const input = document.createElement("input");
          input.type = "hidden";
          // WayForPay expects snake_case, but the backend sent camelCase/snake_case keys.
          const inputName = key.replace(/([A-Z])/g, "_$1").toLowerCase();

          let value = paymentData[key];
          if (Array.isArray(value)) {
            // Handle arrays (like productName, productCount, productPrice)
            value = value.join(";");
          }

          input.name = inputName;
          input.value = value;
          form.appendChild(input);
        }
      }

      document.body.appendChild(form);
      form.submit(); // Redirects the user to the WayForPay payment page
    } catch (err) {
      console.error("Payment initiation error:", err);
      setError("Could not connect to the payment server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- NEW HANDLER for the direct link ---
  const handleDirectDonation = (e) => {
    e.preventDefault();
    // Open the WayForPay link in a new tab for a cleaner user experience
    window.open(WAYFORPAY_DONATION_URL, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <h1 className="text-4xl font-bold mb-8" style={{ color: "#002866" }}>
          {t("debitCredit")}
        </h1>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="prose max-w-none">
            {/* Existing text content */}
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

          {/* WayForPay Donation Form */}
          <form
            onSubmit={handleDirectDonation}
            className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8 shadow-inner"
          >
            <h3 className="text-2xl font-bold mb-6 text-[#0066CC]">
              {t("Secure donation using a credit card.")}
            </h3>

            {error && (
              <div
                className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4"
                role="alert"
              >
                <p className="font-bold">Error:</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select or Enter Amount (USD)
                </label>

                <div className="flex flex-wrap gap-3 mb-4">
                  {[10, 25, 50, 100, 500, 2000].map((presetAmount) => (
                    <button
                      key={presetAmount}
                      type="button"
                      onClick={() => handleAmountSelect(presetAmount)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 border 
                                ${
                                  formState.amount === presetAmount
                                    ? "bg-[#0066CC] text-white border-[#0066CC] shadow-md"
                                    : "bg-white text-gray-700 border-gray-300 hover:border-[#0066CC] hover:text-[#0066CC]"
                                }`}
                    >
                      ${presetAmount.toFixed(2)}
                    </button>
                  ))}
                </div>

                <div className="relative mt-1 rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formState.amount}
                    onChange={handleInputChange}
                    required
                    min="0.01"
                    step="0.01"
                    // Padding adjusted from pl-16 (for "Custom $") back to pl-7 (for "$")
                    className="block w-full rounded-md border-gray-300 p-2 pl-7 border focus:border-[#0066CC] focus:ring focus:ring-[#0066CC] focus:ring-opacity-50"
                    placeholder="Enter custom amount (e.g., 75.00)"
                  />
                </div>
              </div>

              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Frequency
                </span>
                <div className="flex flex-wrap gap-4">
                  <label
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      formState.paymentFrequency === "one_time"
                        ? "bg-[#0066CC] border-[#0066CC] text-white shadow-md"
                        : "bg-white border-gray-300 hover:border-[#0066CC]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentFrequency"
                      value="one_time"
                      checked={formState.paymentFrequency === "one_time"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#FFCC00] border-gray-300 focus:ring-[#FFCC00] mr-2"
                    />
                    One-time
                  </label>

                  <label
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      formState.paymentFrequency === "weekly"
                        ? "bg-[#0066CC] border-[#0066CC] text-white shadow-md"
                        : "bg-white border-gray-300 hover:border-[#0066CC]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentFrequency"
                      value="weekly"
                      checked={formState.paymentFrequency === "weekly"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#FFCC00] border-gray-300 focus:ring-[#FFCC00] mr-2"
                    />
                    Weekly
                  </label>

                  <label
                    className={`flex items-center p-3 rounded-lg border cursor-pointer transition-all ${
                      formState.paymentFrequency === "monthly"
                        ? "bg-[#0066CC] border-[#0066CC] text-white shadow-md"
                        : "bg-white border-gray-300 hover:border-[#0066CC]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentFrequency"
                      value="monthly"
                      checked={formState.paymentFrequency === "monthly"}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-[#FFCC00] border-gray-300 focus:ring-[#FFCC00] mr-2"
                    />
                    Monthly
                  </label>
                </div>
              </div>

              <div>
                <label
                  htmlFor="clientName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Your Name (Required)
                </label>
                <input
                  type="text"
                  id="clientName"
                  name="clientName"
                  value={formState.clientName}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-[#0066CC] focus:ring focus:ring-[#0066CC] focus:ring-opacity-50"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="clientEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email (Required)
                </label>
                <input
                  type="email"
                  id="clientEmail"
                  name="clientEmail"
                  value={formState.clientEmail}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-[#0066CC] focus:ring focus:ring-[#0066CC] focus:ring-opacity-50"
                  placeholder="name@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700"
                >
                  Additional Info / Comment (Optional)
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formState.comment}
                  onChange={handleInputChange}
                  rows="2"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-[#0066CC] focus:ring focus:ring-[#0066CC] focus:ring-opacity-50"
                  placeholder="Add a note or special instruction..."
                ></textarea>
              </div>
            </div> */}

            {/* Submission Button */}
            {/* <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full px-6 py-3 text-white font-bold rounded-md transition duration-300 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              style={{ backgroundColor: "#FFCC00", color: "#002866" }}
            >
              {loading
                ? "Processing..."
                : formState.paymentFrequency === "one_time"
                ? `Donate $${formState.amount.toFixed(2)} Once`
                : `Donate $${formState.amount.toFixed(
                    2
                  )} ${formState.paymentFrequency
                    .toUpperCase()
                    .replace("_", " ")}`}
            </button> */}
            <button
              type="submit"
              // Removed disabled={loading} as we are not waiting for an AP
              // onClick={window.open(WAYFORPAY_DONATION_URL, "_blank")}
              className="mt-6 w-full px-6 py-3 text-white font-bold rounded-md transition duration-300 hover:opacity-90 shadow-md"
              style={{ backgroundColor: "#FFCC00", color: "#002866" }}
            >
              {/* Simplified button text as the logic is now client-side */}
              {t("Donate")}
            </button>

            <p className="text-xs text-gray-500 mt-2 text-center">
              You will be redirected to the secure WayForPay portal.
            </p>
            {/* --- NEW: QR Code Section --- */}
            <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col items-center">
              <p className="text-lg font-semibold text-gray-700 mb-3">
                {t("Or Scan to Donate")}
              </p>
              <a
                href={WAYFORPAY_DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg shadow-xl"
              >
                <img
                  src={QR_CODE_URL}
                  alt={t("QR code for educrisisorg WayForPay donation")}
                  className="w-40 h-40 rounded-lg border-4 border-[#002866] p-1 transition duration-300 hover:border-[#FFCC00]"
                />
              </a>
              <p className="text-sm text-gray-500 mt-2 text-center">
                {t("Scan the code with your mobile device.")}
              </p>
            </div>
            {/* --- END QR Code Section --- */}
          </form>
        </div>
      </div>
    </div>
  );
}
