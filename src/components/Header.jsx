import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useI18n } from "../context/I18nContext";

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
      location.pathname.startsWith("/partner") ||
      location.pathname.startsWith("/other-ways")
    );
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold"
            style={{ color: "#002866" }}
          >
            EduCrisis
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
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

            <div
              className="relative"
              onMouseEnter={() => setShowWaysDropdown(true)}
              onMouseLeave={() => setShowWaysDropdown(false)}
            >
              <button
                className={`menu-item ${isWaysToHelpActive() ? "active" : ""}`}
              >
                {t("waysToHelp")} ▼
              </button>

              {showWaysDropdown && (
                <div className="absolute left-0 top-full mt-1 bg-white shadow-lg rounded-md py-2 w-64 z-50">
                  <div
                    className="relative"
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
                      <div className="absolute left-full top-0 ml-1 bg-white shadow-lg rounded-md py-2 w-56">
                        <Link
                          to="/donate/bank-transfer"
                          className="dropdown-item w-full text-left block"
                        >
                          {t("bankTransfer")}
                        </Link>
                        <Link
                          to="/donate/crypto"
                          className="dropdown-item w-full text-left block"
                        >
                          {t("crypto")}
                        </Link>
                        <Link
                          to="/donate/debit-credit"
                          className="dropdown-item w-full text-left block"
                        >
                          {t("debitCredit")}
                        </Link>
                        <Link
                          to="/donate/ua-debit-credit"
                          className="dropdown-item w-full text-left block"
                        >
                          {t("uaDebitCredit")}
                        </Link>
                      </div>
                    )}
                  </div>

                  <Link
                    to="/partner"
                    className="dropdown-item w-full text-left block"
                  >
                    {t("partnerWithUs")}
                  </Link>

                  <div
                    className="relative"
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
                      <div className="absolute left-full top-0 ml-1 bg-white shadow-lg rounded-md py-2 w-48">
                        <Link
                          to="/other-ways/make-gift"
                          className="dropdown-item w-full text-left block"
                        >
                          {t("makeGift")}
                        </Link>
                        <Link
                          to="/other-ways/help-equipment"
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

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
              style={{ color: "#002866" }}
            >
              <option value="en">EN</option>
              <option value="uk">UK</option>
              <option value="ru">RU</option>
              <option value="zh">中文</option>
            </select>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 lg:hidden">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
              style={{ color: "#002866" }}
            >
              <option value="en">EN</option>
              <option value="uk">UK</option>
              <option value="ru">RU</option>
              <option value="zh">中文</option>
            </select>

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

        {/* Mobile Navigation */}
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
                        to="/donate/bank-transfer"
                        onClick={closeMobileMenu}
                        className="block w-full text-left px-4 py-2 text-sm"
                        style={{ color: "#002866" }}
                      >
                        {t("bankTransfer")}
                      </Link>
                      <Link
                        to="/donate/crypto"
                        onClick={closeMobileMenu}
                        className="block w-full text-left px-4 py-2 text-sm"
                        style={{ color: "#002866" }}
                      >
                        {t("crypto")}
                      </Link>
                      <Link
                        to="/donate/debit-credit"
                        onClick={closeMobileMenu}
                        className="block w-full text-left px-4 py-2 text-sm"
                        style={{ color: "#002866" }}
                      >
                        {t("debitCredit")}
                      </Link>
                      <Link
                        to="/donate/ua-debit-credit"
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
                        to="/other-ways/make-gift"
                        onClick={closeMobileMenu}
                        className="block w-full text-left px-4 py-2 text-sm"
                        style={{ color: "#002866" }}
                      >
                        {t("makeGift")}
                      </Link>
                      <Link
                        to="/other-ways/help-equipment"
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
