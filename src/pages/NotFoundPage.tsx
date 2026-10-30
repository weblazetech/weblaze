import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage(): React.JSX.Element {
  return (
    <div className="min-h-[75dvh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden animate-fade-in-up">
      {/* Background Circuit Decoration */}
      <div className="absolute inset-0 opacity-10 dark:opacity-15 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 1200 600" fill="none" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="150" x2="1200" y2="150" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
          <line x1="0" y1="450" x2="1200" y2="450" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
          <line x1="300" y1="0" x2="300" y2="600" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
          <line x1="900" y1="0" x2="900" y2="600" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="300" cy="150" r="4" stroke="#1E46EB" strokeWidth="1.5" fill="none" />
          <circle cx="900" cy="450" r="4" stroke="#1E46EB" strokeWidth="1.5" fill="none" />
          <path d="M300 150 L600 300 L900 450" stroke="#1E46EB" strokeWidth="0.8" strokeDasharray="3 6" />
        </svg>
      </div>

      {/* Subtle Radial Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[#1E46EB]/15 dark:bg-[#1E46EB]/20 blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-6 bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#1E46EB] dark:bg-[#67BAF4]" />
          <span>Error 404 &bull; Page Not Found</span>
        </div>

        {/* Big visual number */}
        <div className="font-mono text-7xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#1E46EB] to-[#67BAF4] leading-none mb-4 select-none">
          404
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
          Lost in the architecture?
        </h1>

        <p className="mt-4 text-sm sm:text-base text-[#525866] dark:text-[#94A3B8] max-w-lg mx-auto leading-relaxed">
          The page you requested may have been moved, renamed, or doesn't exist. Use the shortcuts below to get back on track.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            viewTransition
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] active:scale-95 transition-all duration-150 shadow-md shadow-[#1E46EB]/25"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Back to Home</span>
          </Link>

          <Link
            to="/services"
            viewTransition
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold border border-[#E2E8F0] dark:border-[#232734] bg-white dark:bg-[#161922] text-[#0D0D0D] dark:text-[#FAFAFA] hover:bg-slate-50 dark:hover:bg-[#1F232F] transition-all duration-150 shadow-xs"
          >
            <span>View Services</span>
          </Link>

          <Link
            to="/contact"
            viewTransition
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold border border-[#E2E8F0] dark:border-[#232734] bg-white dark:bg-[#161922] text-[#0D0D0D] dark:text-[#FAFAFA] hover:bg-slate-50 dark:hover:bg-[#1F232F] transition-all duration-150 shadow-xs"
          >
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Popular Destinations List */}
        <div className="mt-12 pt-8 border-t border-[#E2E8F0] dark:border-[#232734] max-w-lg mx-auto text-xs text-[#525866] dark:text-[#94A3B8]">
          <span className="font-bold uppercase tracking-wider block mb-3 text-[#0D0D0D] dark:text-[#FAFAFA]">
            Popular Sections
          </span>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link to="/about" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">About Weblaze</Link>
            <span>&bull;</span>
            <Link to="/industries" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Industries</Link>
            <span>&bull;</span>
            <Link to="/solutions" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">School ERP Platform</Link>
            <span>&bull;</span>
            <Link to="/careers" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Career Openings</Link>
            <span>&bull;</span>
            <Link to="/programs" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Training Programs</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
