// src/components/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useI18n } from "../context/I18nContext";

export default function Footer() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    setEmail("");
  };

  return (
    <footer>
      {/* Menu Links Section - Full width dark blue background */}
      <div style={{ backgroundColor: "#002866" }} className="w-full">
        <div className="container mx-auto px-4 max-w-[1200px] py-12">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {t("quickLinks")}
              </h3>

              <ul className="space-y-2">
                <li>
                  <Link
                    to="/evolution"
                    className="footer-link text-white hover:text-yellow-300 transition-colors duration-200"
                    style={{ color: "white" }}
                  >
                    {t("evolution")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mission"
                    className="footer-link text-white hover:text-yellow-300 transition-colors duration-200"
                    style={{ color: "white" }}
                  >
                    {t("missionStatement")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/donate"
                    className="footer-link text-white hover:text-yellow-300 transition-colors duration-200"
                    style={{ color: "white" }}
                  >
                    {t("donateNow")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="footer-link text-white hover:text-yellow-300 transition-colors duration-200"
                    style={{ color: "white" }}
                  >
                    {t("contacts")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/legal"
                    className="footer-link text-white hover:text-yellow-300 transition-colors duration-200"
                    style={{ color: "white" }}
                  >
                    {t("legal")}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {t("contacts")}
              </h3>
              <div className="space-y-2 text-white">
                <p className="text-sm">Email: info@educrisis.org</p>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {t("newsletter")}
              </h3>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div>
                  <label
                    htmlFor="newsletter-email"
                    className="block text-sm mb-1 text-white"
                  >
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    required
                    className="w-full px-3 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2"
                    style={{ focusRingColor: "#FFEE00" }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-md font-medium transition-all duration-200 hover:transform hover:translateY-[-1px]"
                  style={{
                    backgroundColor: "#FFEE00",
                    color: "#002866",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#FFD700")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#FFEE00")
                  }
                >
                  {t("subscribeNow")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section - White background */}
      <div className="bg-white w-full">
        <div className="container mx-auto px-4 max-w-[1200px] py-4">
          <p className="text-center text-sm" style={{ color: "#002866" }}>
            {t("copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}

// <footer className="bg-gray-50 mt-8 md:mt-16 py-8 md:py-12">
//   <div className="container mx-auto px-4">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       <div>
//         <h3 className="font-bold text-lg mb-4" style={{ color: "#002866" }}>
//           {t("quickLinks")}
//         </h3>
//         <div className="space-y-2">
//           <Link to="/evolution" className="footer-link block">
//             {t("evolution")}
//           </Link>
//           <Link to="/mission" className="footer-link block">
//             {t("missionStatement")}
//           </Link>
//           <Link to="/donate" className="footer-link block">
//             {t("donateNow")}
//           </Link>
//           <Link to="/contact" className="footer-link block">
//             {t("contacts")}
//           </Link>
//           <Link to="/legal" className="footer-link block">
//             {t("legal")}
//           </Link>
//         </div>
//       </div>

//       <div>
//         <h3 className="font-bold text-lg mb-4" style={{ color: "#002866" }}>
//           {t("newsletter")}
//         </h3>
//         <div>
//           <div className="mb-2">
//             <label
//               className="block text-sm mb-1"
//               style={{ color: "#002866" }}
//             >
//               {t("email")}
//             </label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder={t("emailPlaceholder")}
//               className="w-full border rounded px-3 py-2"
//             />
//           </div>
//           <button
//             onClick={handleSubscribe}
//             className="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded transition-colors w-full md:w-auto"
//             style={{ color: "#002866" }}
//           >
//             {t("subscribeNow")}
//           </button>
//         </div>
//       </div>
//     </div>

//     <div
//       className="border-t mt-8 pt-8 text-center text-sm md:text-base"
//       style={{ color: "#002866" }}
//     >
//       {t("copyright")}
//     </div>
//   </div>
// </footer>
