import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { I18nProvider } from "./context/I18nContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import DebitCredit from "./pages/DebitCredit";

// Lazy load pages for better performance
const HomePage = lazy(() => import("./pages/HomePage"));
const EvolutionPage = lazy(() => import("./pages/EvolutionPage"));
const MissionPage = lazy(() => import("./pages/MissionPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const DonatePage = lazy(() => import("./pages/DebitCredit"));
const BankTransfer = lazy(() => import("./pages/BankTransfer"));
const Crypto = lazy(() => import("./pages/Crypto"));
const UACard = lazy(() => import("./pages/UACard"));

const PartnerPage = lazy(() => import("./pages/PartnerPage"));

const OtherWaysPage = lazy(() => import("./pages/OtherWaysPage"));
const MajorGift = lazy(() => import("./pages/MajorGift"));
const HelpEquipment = lazy(() => import("./pages/HelpEquipment"));
// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppContent() {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ fontFamily: '"Poppins", sans-serif' }}
    >
      <style>{`
        .menu-item {
          padding: 8px 12px;
          border-radius: 4px;
          transition: background-color 0.3s ease;
          color: #002866;
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        @media (min-width: 1280px) {
          .menu-item {
            padding: 8px 16px;
            font-size: 1rem;
          }
        }
        
        .menu-item:hover,
        .menu-item.active {
          background-color: #FFEE00;
        }
        
        .dropdown-item {
          padding: 8px 16px;
          transition: background-color 0.3s ease;
          color: #002866;
        }
        
        .dropdown-item:hover {
          background-color: #FFEE00;
        }
        
        .footer-link {
          color: #002866;
          transition: opacity 0.2s;
        }
        
        .footer-link:hover {
          opacity: 0.7;
        }
      `}</style>

      <ScrollToTop />
      <Header />

      <main className="flex-grow bg-white">
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/evolution" element={<EvolutionPage />} />
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Donate routes */}
            <Route path="/donate" element={<DebitCredit />} />
            <Route path="/donate-by-bank-transfer" element={<BankTransfer />} />
            <Route path="/send-crypto" element={<Crypto />} />
            <Route path="/help" element={<DebitCredit />} />
            <Route path="/donate-ua-card" element={<UACard />} />

            {/* Partner route */}
            <Route path="/partner" element={<PartnerPage />} />

            {/* Other ways routes */}
            <Route path="/other-ways" element={<OtherWaysPage />} />
            <Route path="/make-a-major-gift" element={<MajorGift />} />
            <Route path="/help-with-equipment" element={<HelpEquipment />} />

            {/* Legal route */}
            <Route path="/legal" element={<LegalPage />} />

            {/* 404 - redirect to home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </BrowserRouter>
  );
}
