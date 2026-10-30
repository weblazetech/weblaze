import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CtaBannerProps } from '../types';

export default function CtaBanner({ 
  title = "Have a project in mind?", 
  desc = "Talk directly with our development team. No sales pitch — just a focused conversation about what you need.",
  tag = "Let's build something"
}: CtaBannerProps): React.JSX.Element {
  const location = useLocation();

  return (
    <section className="relative py-24 bg-[#0D0D0D] text-white overflow-hidden">
      {/* Background Grid Lines SVG */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
        <svg width="100%" height="100%" viewBox="0 0 1200 280" fill="none" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="70" x2="1200" y2="70" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          <line x1="0" y1="140" x2="1200" y2="140" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          <line x1="0" y1="210" x2="1200" y2="210" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
          <line x1="200" y1="0" x2="200" y2="280" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <line x1="400" y1="0" x2="400" y2="280" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <line x1="600" y1="0" x2="600" y2="280" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <line x1="800" y1="0" x2="800" y2="280" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <line x1="1000" y1="0" x2="1000" y2="280" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        </svg>
      </div>

      {/* Subtle Ambient Radial Glow */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#1E46EB]/30 blur-3xl pointer-events-none"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-block px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-white/10 text-[#67BAF4] border border-white/15 mb-4">
          {tag}
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-display">
          {title}
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
          {desc}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact#contact-form"
            viewTransition
            onClick={() => {
              if (location.pathname === '/contact') {
                const form = document.getElementById('contact-form');
                if (form) {
                  form.scrollIntoView({ behavior: 'smooth' });
                  const input = document.getElementById('contact-name');
                  if (input) input.focus();
                }
              }
            }}
            className="relative group/shimmer inline-flex items-center justify-center p-[1.5px] rounded-2xl overflow-hidden active:scale-95 transition-all duration-200 shadow-xl shadow-black/25 hover:shadow-2xl hover:shadow-[#1E46EB]/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB]"
          >
            {/* Specular Diagonal Light Shimmer — Perpetually active without hover */}
            <span
              aria-hidden="true"
              className="absolute -inset-[150%] w-[400%] h-[400%] pointer-events-none opacity-85 group-hover/shimmer:opacity-100 transition-opacity duration-300 animate-specular-shimmer"
              style={{
                background:
                  'linear-gradient(115deg, transparent 38%, rgba(30,70,235,0.8) 45%, rgba(103,186,244,0.95) 48%, #ffffff 50%, rgba(103,186,244,0.95) 52%, rgba(30,70,235,0.8) 55%, transparent 62%)',
              }}
            />

            {/* Resting Base Border */}
            <span
              aria-hidden="true"
              className="absolute inset-0 rounded-2xl border border-white/20 dark:border-white/15 pointer-events-none"
            />

            {/* Button Body — Radiant Vibrant Blue in both themes so specular white+cyan highlight pops brilliantly */}
            <span className="relative z-10 inline-flex items-center justify-center px-8 py-3.5 rounded-[14px] text-base font-bold tracking-wide text-white bg-gradient-to-r from-[#1E46EB] via-[#1E46EB] to-[#1738BD] group-hover/shimmer:from-[#1738BD] group-hover/shimmer:to-[#132D96] transition-all duration-200 shadow-inner">
              {/* Internal specular glass sheen glint across button surface — Perpetually active */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-[14px] overflow-hidden pointer-events-none opacity-75 group-hover/shimmer:opacity-100 transition-opacity duration-300"
              >
                <span className="absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-25deg] animate-sheen-slide pointer-events-none" />
              </span>

              <span className="relative z-20 flex items-center gap-2.5">
                <span>Get in Touch</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 ease-out group-hover/shimmer:translate-x-1 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
