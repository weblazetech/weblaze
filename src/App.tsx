import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import SolutionsPage from './pages/SolutionsPage';
import IndustriesPage from './pages/IndustriesPage';
import CareersPage from './pages/CareersPage';
import ProgramsPage from './pages/ProgramsPage';
import ContactPage from './pages/ContactPage';
import PortfolioPage from './pages/PortfolioPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsOfServicePage from './pages/TermsOfServicePage';
import NotFoundPage from './pages/NotFoundPage';
import AdminPage from './pages/admin/AdminPage';

interface AppContentProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  showScrollTopBtn: boolean;
  scrollProgress: number;
  scrollToTop: () => void;
}

const PAGE_TITLES: Record<string, string> = {
  '/': 'Weblaze Technologies — Enterprise Software, Web & Mobile Engineering',
  '/about': 'About Us & Leadership — Weblaze',
  '/services': 'Technology Services & Engineering — Weblaze',
  '/solutions': 'Enterprise Solutions & Automation — Weblaze',
  '/portfolio': 'Selected Work & Portfolio — Weblaze',
  '/industries': 'Industry Blueprints & Sectors — Weblaze',
  '/careers': 'Careers & Opportunities — Weblaze',
  '/programs': 'Career Development Programs — Weblaze',
  '/contact': 'Contact & Project Inquiries — Weblaze',
  '/privacy': 'Privacy Policy — Weblaze',
  '/terms': 'Terms of Service — Weblaze',
};

function AppContent({
  darkMode,
  setDarkMode,
  showScrollTopBtn,
  scrollProgress,
  scrollToTop,
}: AppContentProps): React.JSX.Element {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  // Synchronize document title on SPA route changes
  useEffect(() => {
    if (!isAdmin) {
      const title = PAGE_TITLES[location.pathname] || '404 — Page Not Found — Weblaze';
      document.title = title;
    }
  }, [location.pathname, isAdmin]);

  if (isAdmin) {
    return (
      <div className={`min-h-[100dvh] w-full overflow-x-hidden ${darkMode ? 'dark' : ''} bg-[#FAFAFA] dark:bg-[#0D0D0D] text-[#0D0D0D] dark:text-[#FAFAFA] font-sans selection:bg-[#1E46EB] selection:text-white transition-colors duration-300`}>
        <Routes>
          <Route path="/admin/*" element={<AdminPage darkMode={darkMode} setDarkMode={setDarkMode} />} />
        </Routes>
      </div>
    );
  }

  return (
    <div className={`min-h-[100dvh] w-full overflow-x-hidden ${darkMode ? 'dark' : ''} bg-[#FAFAFA] dark:bg-[#0D0D0D] text-[#0D0D0D] dark:text-[#FAFAFA] font-sans selection:bg-[#1E46EB] selection:text-white transition-colors duration-300 flex flex-col justify-between`}>
      {/* Skip to Main Content Link for Keyboard and Screen-Reader Users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-[#1E46EB] focus:text-white focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-white text-xs font-bold"
      >
        Skip to main content
      </a>

      {/* Public Navigation Bar */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Routed Content with View Transition Name */}
      <main id="main-content" tabIndex={-1} className="flex-grow [view-transition-name:page-content] outline-none">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Public Footer */}
      <Footer />

      {/* Floating Scroll-to-Top Button with Circular Progress Gauge & Mobile Safe-Area Inset */}
      {showScrollTopBtn && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={`Scroll to top (${Math.round(scrollProgress)}% scrolled)`}
          className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 mb-[env(safe-area-inset-bottom)] mr-[env(safe-area-inset-right)] group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 dark:bg-[#161922]/95 backdrop-blur-md text-[#1E46EB] dark:text-[#67BAF4] shadow-xl shadow-black/15 dark:shadow-black/50 hover:scale-105 active:scale-95 transition-all duration-200 border border-[#E2E8F0] dark:border-[#232734] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4]"
        >
          <svg className="w-11 h-11 sm:w-12 sm:h-12 -rotate-90 transform absolute inset-0 pointer-events-none" viewBox="0 0 48 48">
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="transparent"
              className="text-slate-200 dark:text-[#232734]"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#1E46EB"
              strokeWidth="2.5"
              strokeDasharray="125.66"
              strokeDashoffset={125.66 - (125.66 * scrollProgress) / 100}
              strokeLinecap="round"
              fill="transparent"
              className="transition-[stroke-dashoffset] duration-150 ease-out dark:stroke-[#67BAF4]"
            />
          </svg>

          <svg className="w-5 h-5 transition-transform duration-200 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}

export default function App(): React.JSX.Element {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('weblaze_theme');
      if (savedTheme !== null) {
        return savedTheme === 'dark';
      }
    } catch {
      // In case localStorage is blocked
    }
    return true; // Default theme
  });
  const [showScrollTopBtn, setShowScrollTopBtn] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Sync dark class on document root, update mobile browser theme-color meta, and persist preference
  useEffect(() => {
    const root = document.documentElement;
    const themeHex = darkMode ? '#0D0D0D' : '#FAFAFA';

    // Synchronize mobile browser address bar theme-color
    let metaThemeColor = document.querySelector('meta[name="theme-color"]:not([media])') as HTMLMetaElement | null;
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    metaThemeColor.setAttribute('content', themeHex);

    if (darkMode) {
      root.classList.add('dark');
      try {
        localStorage.setItem('weblaze_theme', 'dark');
      } catch {}
    } else {
      root.classList.remove('dark');
      try {
        localStorage.setItem('weblaze_theme', 'light');
      } catch {}
    }
  }, [darkMode]);

  // Floating back to top trigger & scroll progress percentage
  useEffect(() => {
    const handleScroll = (): void => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
      setShowScrollTopBtn(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppContent
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        showScrollTopBtn={showScrollTopBtn}
        scrollProgress={scrollProgress}
        scrollToTop={scrollToTop}
      />
    </BrowserRouter>
  );
}
