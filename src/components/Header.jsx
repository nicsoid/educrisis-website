// src/components/Header.jsx
import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useI18n } from "../context/I18nContext";

// Logo SVG Component - Fixed size 220x80
// const Logo = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="220"
//     height="80"
//     viewBox="0 0 220 80"
//     fill="none"
//     className="h-[50px] w-auto md:h-[60px] lg:h-[80px]"
//   >
//     <g clipPath="url(#clip0_9_4)">
//       <rect width="220" height="80" fill="white"></rect>
//       <text
//         fill="#0066CC"
//         xmlSpace="preserve"
//         style={{ whiteSpace: "pre" }}
//         fontFamily="Poppins"
//         fontSize="34"
//         fontWeight="600"
//       >
//         <tspan x="-1" y="46.4">
//           EduCrisis
//         </tspan>
//       </text>
//       <text
//         fill="#002866"
//         fillOpacity="0.8"
//         xmlSpace="preserve"
//         style={{ whiteSpace: "pre" }}
//         fontFamily="Poppins"
//         fontSize="11"
//       >
//         <tspan x="1" y="62.35">
//           Educational Crisis Relief Ukraine
//         </tspan>
//       </text>
//       <circle cx="186" cy="40" r="32" fill="#0066CC"></circle>
//       <circle cx="186" cy="40" r="27" fill="#FFCC00"></circle>
//       <path
//         d="M176.4 21.503H196.514V30.8048L196.04 31.088C189.967 34.7158 182.366 34.6062 176.4 30.8048V30.8048V21.503Z"
//         fill="#0066CC"
//       ></path>
//       <path
//         d="M170.381 23.3431L178.512 20.1717L186.642 17.0004L202 22.811L186.475 28.0033L170.381 23.3431Z"
//         fill="#FFCC00"
//       ></path>
//       <path
//         d="M170 22.0809L178.188 19.0175L186.375 15.9541L202 22.0141L186.354 26.997L170 22.0809Z"
//         fill="#0066CC"
//       ></path>
//       <path
//         d="M174.571 22.3643V29.9435L173.657 30.9771"
//         stroke="#0066CC"
//         strokeWidth="1.5"
//         strokeLinecap="round"
//       ></path>
//       <rect x="168" y="39" width="35" height="21" rx="1" fill="#0066CC"></rect>
//       <rect
//         x="169.5"
//         y="40.5"
//         width="32"
//         height="18"
//         rx="1"
//         fill="#FFCC00"
//       ></rect>
//       <path
//         d="M171 37.8887C171 37.3453 171.311 36.8499 171.8 36.6136V36.6136C173.962 35.5702 176.418 35.3077 178.751 35.8709L179.354 36.0165C180.686 36.3379 181.979 36.8003 183.213 37.3958L185.5 38.5V59.4787L182.423 58.3029C181.029 57.7702 179.567 57.4338 178.081 57.3033L177.137 57.2205C175.487 57.0756 173.826 57.3307 172.295 57.9641V57.9641C171.678 58.2193 171 57.7659 171 57.0984V37.8887Z"
//         fill="#0066CC"
//       ></path>
//       <path
//         d="M172.036 38.5468C172.036 38.1002 172.287 37.6916 172.685 37.49V37.49C174.556 36.5429 176.706 36.3047 178.739 36.8192L179.494 37.0102C180.437 37.2489 181.351 37.5912 182.219 38.0306C182.932 38.3912 183.572 38.7152 184.464 39.1669V58.0213L181.897 56.9928C180.656 56.4955 179.349 56.1807 178.018 56.0581L177.331 55.9949C175.895 55.8628 174.45 56.0943 173.127 56.6682V56.6682C172.611 56.8918 172.036 56.514 172.036 55.9522V38.5468Z"
//         fill="#FFCC00"
//       ></path>
//       <path
//         d="M200 37.8887C200 37.3453 199.689 36.8499 199.2 36.6136V36.6136C197.038 35.5702 194.582 35.3077 192.249 35.8709L191.646 36.0165C190.314 36.3379 189.021 36.8003 187.787 37.3958L185.5 38.5V59.4787L188.577 58.3029C189.971 57.7702 191.433 57.4338 192.919 57.3033L193.863 57.2205C195.513 57.0756 197.174 57.3307 198.705 57.9641V57.9641C199.322 58.2193 200 57.7659 200 57.0984V37.8887Z"
//         fill="#0066CC"
//       ></path>
//       <path
//         d="M198.964 38.5468C198.964 38.1002 198.713 37.6916 198.315 37.49V37.49C196.444 36.5429 194.293 36.3047 192.261 36.8192L191.506 37.0102C190.563 37.2489 189.649 37.5912 188.78 38.0306C188.068 38.3912 187.428 38.7152 186.536 39.1669V58.0213L189.103 56.9928C190.344 56.4955 191.651 56.1807 192.982 56.0581L193.669 55.9949C195.105 55.8628 196.55 56.0943 197.873 56.6682V56.6682C198.388 56.8918 198.964 56.514 198.964 55.9522V38.5468Z"
//         fill="#FFCC00"
//       ></path>
//       <text
//         fill="#0066CC"
//         xmlSpace="preserve"
//         style={{ whiteSpace: "pre" }}
//         fontFamily="Poppins"
//         fontSize="1.5"
//         fontWeight="600"
//       >
//         <tspan x="173" y="41.525">
//           Слава Україні!
//         </tspan>
//       </text>
//       <text
//         fill="#0066CC"
//         xmlSpace="preserve"
//         style={{ whiteSpace: "pre" }}
//         fontFamily="Poppins"
//         fontSize="1.5"
//         fontWeight="600"
//       >
//         <tspan x="187" y="41.525">
//           Героям Слава!
//         </tspan>
//       </text>
//     </g>
//     <defs>
//       <clipPath id="clip0_9_4">
//         <rect width="220" height="80" fill="white"></rect>
//       </clipPath>
//     </defs>
//   </svg>
// );

export default function Header() {
  const { t, language, setLanguage } = useI18n();
  const location = useLocation();
  const [showWaysDropdown, setShowWaysDropdown] = useState(false);
  const [showDonateSubmenu, setShowDonateSubmenu] = useState(false);
  const [showOtherWaysSubmenu, setShowOtherWaysSubmenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileWaysOpen, setMobileWaysOpen] = useState(false);
  const [mobileDonateOpen, setMobileDonateOpen] = useState(false);
  const [mobileOtherWaysOpen, setMobileOtherWaysOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileWaysOpen(false);
    setMobileDonateOpen(false);
    setMobileOtherWaysOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const isWaysToHelpActive = () => {
    return (
      location.pathname.startsWith("/donate") ||
      location.pathname.startsWith("/send-crypto") ||
      location.pathname.startsWith("/help") ||
      location.pathname.startsWith("/donate-ua-card") ||
      location.pathname.startsWith("/partner") ||
      location.pathname.startsWith("/make-a-major-gift") ||
      location.pathname.startsWith("/help-with-equipment")
    );
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-[1200px]">
        <div className="flex justify-between items-center py-2 md:py-3">
          {/* Logo - Fixed size */}
          <Link to="/" className="flex items-center">
            {/* <Logo /> */}
            <img src="/assets/logo-educrisis.svg" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              {t("home")}
            </NavLink>

            <NavLink
              to="/evolution"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              {t("evolution")}
            </NavLink>

            <NavLink
              to="/mission"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              {t("missionStatement")}
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
            >
              {t("contactUs")}
            </NavLink>

            {/* Ways to Help Dropdown */}
            <div
              className="dropdown-container relative"
              onMouseEnter={() => setShowWaysDropdown(true)}
              onMouseLeave={() => {
                setShowWaysDropdown(false);
                setShowDonateSubmenu(false);
                setShowOtherWaysSubmenu(false);
              }}
            >
              <button
                className={`menu-item ${isWaysToHelpActive() ? "active" : ""}`}
              >
                {t("waysToHelp")} ▼
              </button>

              {showWaysDropdown && (
                <div className="dropdown-menu absolute left-0 top-full bg-white shadow-lg rounded-md py-2 w-64 z-50">
                  {/* Donate Now with Submenu */}
                  <div
                    className="submenu-container relative"
                    onMouseEnter={() => setShowDonateSubmenu(true)}
                    onMouseLeave={() => setShowDonateSubmenu(false)}
                  >
                    <Link
                      to="/donate"
                      className="dropdown-item w-full text-left block"
                    >
                      {t("donateNow")} →
                    </Link>
                    {showDonateSubmenu && (
                      <div className="submenu absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-56">
                        <Link
                          to="/donate-by-bank-transfer"
                          className="dropdown-item w-full text-left block"
                        >
                          {t("bankTransfer")}
                        </Link>
                        <Link
                          to="/send-crypto"
                          className="dropdown-item w-full text-left block"
                        >
                          {t("crypto")}
                        </Link>
                        <Link
                          to="/help"
                          className="dropdown-item w-full text-left block"
                        >
                          {t("debitCredit")}
                        </Link>
                        <Link
                          to="/donate-ua-card"
                          className="dropdown-item w-full text-left block"
                        >
                          {t("uaDebitCredit")}
                        </Link>
                      </div>
                    )}
                  </div>

                  {/* Partner With Us */}
                  <Link
                    to="/partner"
                    className="dropdown-item w-full text-left block"
                  >
                    {t("partnerWithUs")}
                  </Link>

                  {/* Other Ways to Give with Submenu */}
                  <div
                    className="submenu-container relative"
                    onMouseEnter={() => setShowOtherWaysSubmenu(true)}
                    onMouseLeave={() => setShowOtherWaysSubmenu(false)}
                  >
                    <Link
                      to="/other-ways"
                      className="dropdown-item w-full text-left block"
                    >
                      {t("otherWays")} →
                    </Link>
                    {showOtherWaysSubmenu && (
                      <div className="submenu absolute left-full top-0 bg-white shadow-lg rounded-md py-2 w-48">
                        <Link
                          to="/make-a-major-gift"
                          className="dropdown-item w-full text-left block"
                        >
                          {t("makeGift")}
                        </Link>
                        <Link
                          to="/help-with-equipment"
                          className="dropdown-item w-full text-left block"
                        >
                          {t("helpEquipment")}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* DONATE Button - Desktop */}
            <Link
              to="/help"
              className="donate-button px-4 py-2 rounded-md font-semibold transition-all duration-300"
              style={{
                backgroundColor: "#FFCC00",
                color: "#002866",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#FFD700";
                e.target.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#FFCC00";
                e.target.style.transform = "translateY(0)";
              }}
            >
              {t("donate")}
            </Link>

            {/* Language Selector */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
              style={{ color: "#002866" }}
            >
              <option value="en">EN</option>
              <option value="uk">UA</option>
              {/* <option value="ru">RU</option>
              <option value="zh">中文</option> */}
            </select>
          </nav>

          {/* Mobile Menu Section */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* DONATE Button - Mobile */}
            <Link
              to="/help"
              className="donate-button px-3 py-1.5 text-sm rounded-md font-semibold"
              style={{
                backgroundColor: "#FFCC00",
                color: "#002866",
              }}
            >
              {t("donate")}
            </Link>

            {/* Language Selector - Mobile */}
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
              style={{ color: "#002866" }}
            >
              <option value="en">EN</option>
              <option value="uk">UA</option>
              {/* <option value="ru">RU</option>
              <option value="zh">中文</option> */}
            </select>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
              style={{ color: "#002866" }}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pb-4 space-y-2">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="block w-full text-left px-4 py-2 rounded"
              style={{
                color: "#002866",
                backgroundColor: isActive("/") ? "#FFEE00" : "transparent",
              }}
            >
              {t("home")}
            </Link>

            <Link
              to="/evolution"
              onClick={closeMobileMenu}
              className="block w-full text-left px-4 py-2 rounded"
              style={{
                color: "#002866",
                backgroundColor: isActive("/evolution")
                  ? "#FFEE00"
                  : "transparent",
              }}
            >
              {t("evolution")}
            </Link>

            <Link
              to="/mission"
              onClick={closeMobileMenu}
              className="block w-full text-left px-4 py-2 rounded"
              style={{
                color: "#002866",
                backgroundColor: isActive("/mission")
                  ? "#FFEE00"
                  : "transparent",
              }}
            >
              {t("missionStatement")}
            </Link>

            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="block w-full text-left px-4 py-2 rounded"
              style={{
                color: "#002866",
                backgroundColor: isActive("/contact")
                  ? "#FFEE00"
                  : "transparent",
              }}
            >
              {t("contactUs")}
            </Link>

            <div>
              <button
                onClick={() => setMobileWaysOpen(!mobileWaysOpen)}
                className="block w-full text-left px-4 py-2 rounded"
                style={{ color: "#002866" }}
              >
                {t("waysToHelp")} {mobileWaysOpen ? "▲" : "▼"}
              </button>

              {mobileWaysOpen && (
                <div className="pl-4 space-y-2 mt-2">
                  <button
                    onClick={() => setMobileDonateOpen(!mobileDonateOpen)}
                    className="block w-full text-left px-4 py-2"
                    style={{ color: "#002866" }}
                  >
                    {t("donateNow")} {mobileDonateOpen ? "▲" : "▼"}
                  </button>

                  {mobileDonateOpen && (
                    <div className="pl-4 space-y-1">
                      <Link
                        to="/donate-by-bank-transfer"
                        onClick={closeMobileMenu}
                        className="block w-full text-left px-4 py-2 text-sm"
                        style={{ color: "#002866" }}
                      >
                        {t("bankTransfer")}
                      </Link>
                      <Link
                        to="/send-crypto"
                        onClick={closeMobileMenu}
                        className="block w-full text-left px-4 py-2 text-sm"
                        style={{ color: "#002866" }}
                      >
                        {t("crypto")}
                      </Link>
                      <Link
                        to="/help"
                        onClick={closeMobileMenu}
                        className="block w-full text-left px-4 py-2 text-sm"
                        style={{ color: "#002866" }}
                      >
                        {t("debitCredit")}
                      </Link>
                      <Link
                        to="/donate-ua-card"
                        onClick={closeMobileMenu}
                        className="block w-full text-left px-4 py-2 text-sm"
                        style={{ color: "#002866" }}
                      >
                        {t("uaDebitCredit")}
                      </Link>
                    </div>
                  )}

                  <Link
                    to="/partner"
                    onClick={closeMobileMenu}
                    className="block w-full text-left px-4 py-2"
                    style={{ color: "#002866" }}
                  >
                    {t("partnerWithUs")}
                  </Link>

                  <button
                    onClick={() => setMobileOtherWaysOpen(!mobileOtherWaysOpen)}
                    className="block w-full text-left px-4 py-2"
                    style={{ color: "#002866" }}
                  >
                    {t("otherWays")} {mobileOtherWaysOpen ? "▲" : "▼"}
                  </button>

                  {mobileOtherWaysOpen && (
                    <div className="pl-4 space-y-1">
                      <Link
                        to="/make-a-major-gift"
                        onClick={closeMobileMenu}
                        className="block w-full text-left px-4 py-2 text-sm"
                        style={{ color: "#002866" }}
                      >
                        {t("makeGift")}
                      </Link>
                      <Link
                        to="/help-with-equipment"
                        onClick={closeMobileMenu}
                        className="block w-full text-left px-4 py-2 text-sm"
                        style={{ color: "#002866" }}
                      >
                        {t("helpEquipment")}
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
