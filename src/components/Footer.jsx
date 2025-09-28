import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../context/I18nContext";

export default function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (email) {
      // TODO: Implement actual subscription logic
      // Send to your backend API or email service
      alert(`Subscribed: ${email}`);
      setEmail("");
    }
  };

  return (
    <footer className="bg-gray-50 mt-8 md:mt-16 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: "#002866" }}>
              {t("quickLinks")}
            </h3>
            <div className="space-y-2">
              <Link to="/evolution" className="footer-link block">
                {t("evolution")}
              </Link>
              <Link to="/mission" className="footer-link block">
                {t("missionStatement")}
              </Link>
              <Link to="/donate" className="footer-link block">
                {t("donateNow")}
              </Link>
              <Link to="/contact" className="footer-link block">
                {t("contacts")}
              </Link>
              <Link to="/legal" className="footer-link block">
                {t("legal")}
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4" style={{ color: "#002866" }}>
              {t("newsletter")}
            </h3>
            <div>
              <div className="mb-2">
                <label
                  className="block text-sm mb-1"
                  style={{ color: "#002866" }}
                >
                  {t("email")}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("emailPlaceholder")}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <button
                onClick={handleSubscribe}
                className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded transition-colors w-full md:w-auto"
                style={{ color: "#002866" }}
              >
                {t("subscribeNow")}
              </button>
            </div>
          </div>
        </div>

        <div
          className="border-t mt-8 pt-8 text-center text-sm md:text-base"
          style={{ color: "#002866" }}
        >
          {t("copyright")}
        </div>
      </div>
    </footer>
  );
}
