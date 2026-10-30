import React from 'react';

export type HeroBackgroundVariant = 'wave' | 'aurora' | 'circuit';

interface HeroBackgroundProps {
  variant?: HeroBackgroundVariant;
}

export default function HeroBackground({ variant = 'wave' }: HeroBackgroundProps): React.JSX.Element {
  if (variant === 'circuit') {
    // ─── ORIGINAL WEBLAZE CIRCUIT BOARD ANIMATION (PRESERVED FOR INSTANT ROLLBACK) ───
    return (
      <>
        {/* Exact Weblaze Circuit SVG Background with Active Signal Packets */}
        <div className="absolute inset-0 opacity-20 dark:opacity-25 pointer-events-none select-none overflow-hidden" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 1200 700" fill="none" preserveAspectRatio="xMidYMid slice">
            <line x1="0" y1="100" x2="1200" y2="100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 10" />
            <line x1="0" y1="250" x2="1200" y2="250" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 10" />
            <line x1="0" y1="400" x2="1200" y2="400" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 10" />
            <line x1="0" y1="550" x2="1200" y2="550" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 10" />
            <line x1="200" y1="0" x2="200" y2="700" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 10" />
            <line x1="400" y1="0" x2="400" y2="700" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 10" />
            <line x1="600" y1="0" x2="600" y2="700" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 10" />
            <line x1="800" y1="0" x2="800" y2="700" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 10" />
            <line x1="1000" y1="0" x2="1000" y2="700" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 10" />

            {/* Static Nodes */}
            <circle cx="800" cy="250" r="4" stroke="#1E46EB" strokeWidth="1.5" fill="none" />
            <circle cx="800" cy="250" r="12" stroke="#67BAF4" strokeWidth="0.7" fill="none" strokeDasharray="2 4" />
            <circle cx="1000" cy="400" r="4" stroke="#1E46EB" strokeWidth="1.5" fill="none" />
            <circle cx="1000" cy="400" r="10" stroke="#67BAF4" strokeWidth="0.7" fill="none" />
            <circle cx="600" cy="550" r="3" stroke="#1E46EB" strokeWidth="1" fill="none" />
            <circle cx="400" cy="100" r="3" stroke="#1E46EB" strokeWidth="1" fill="none" />

            {/* Circuit Paths */}
            <path id="circuit-wire-1" d="M400 100 L800 250" stroke="#1E46EB" strokeWidth="0.8" strokeDasharray="3 8" className="circuit-path" />
            <path id="circuit-wire-2" d="M800 250 L1000 400" stroke="#1E46EB" strokeWidth="0.8" strokeDasharray="3 8" className="circuit-path" />
            <path id="circuit-wire-3" d="M1000 400 L600 550" stroke="#1E46EB" strokeWidth="0.8" strokeDasharray="3 8" className="circuit-path" />

            <path id="circuit-corner-1" d="M1100 40 L1160 40 L1160 100" stroke="#1E46EB" strokeWidth="1.5" fill="none" />
            <path id="circuit-corner-2" d="M1100 660 L1160 660 L1160 600" stroke="#1E46EB" strokeWidth="1.5" fill="none" />
            <path id="circuit-corner-3" d="M40 100 L40 40 L100 40" stroke="#1E46EB" strokeWidth="0.8" fill="none" />

            {/* Animated Pulses & Signal Packets (Halts under prefers-reduced-motion) */}
            <g className="motion-reduce:hidden">
              <circle cx="800" cy="250" r="16" stroke="#67BAF4" strokeWidth="0.8" fill="none" opacity="0.6">
                <animate attributeName="r" values="4;18" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="3s" repeatCount="indefinite" />
              </circle>
              <circle cx="1000" cy="400" r="14" stroke="#1E46EB" strokeWidth="0.8" fill="none" opacity="0.6">
                <animate attributeName="r" values="4;16" dur="2.4s" begin="1s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.4s" begin="1s" repeatCount="indefinite" />
              </circle>
              <circle cx="600" cy="550" r="12" stroke="#67BAF4" strokeWidth="0.8" fill="none" opacity="0.6">
                <animate attributeName="r" values="3;14" dur="2.8s" begin="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.8;0" dur="2.8s" begin="1.8s" repeatCount="indefinite" />
              </circle>

              <circle r="3.5" fill="#67BAF4" opacity="0.95">
                <animateMotion path="M400 100 L800 250" dur="3.2s" repeatCount="indefinite" />
              </circle>
              <circle r="3.5" fill="#1E46EB" opacity="0.95">
                <animateMotion path="M800 250 L1000 400" dur="2.5s" begin="1.1s" repeatCount="indefinite" />
              </circle>
              <circle r="3" fill="#67BAF4" opacity="0.9">
                <animateMotion path="M1000 400 L600 550" dur="2.8s" begin="0.4s" repeatCount="indefinite" />
              </circle>
              <circle r="2.5" fill="#67BAF4" opacity="0.85">
                <animateMotion path="M1100 40 L1160 40 L1160 100" dur="4.2s" repeatCount="indefinite" />
              </circle>
              <circle r="2.5" fill="#1E46EB" opacity="0.85">
                <animateMotion path="M40 100 L40 40 L100 40" dur="3.8s" begin="1.5s" repeatCount="indefinite" />
              </circle>
            </g>
          </svg>
        </div>

        {/* Ambient Glowing Gradient */}
        <div 
          aria-hidden="true" 
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-gradient-to-b from-[#1E46EB]/15 dark:from-[#1E46EB]/25 to-transparent blur-3xl pointer-events-none -z-10 animate-glow"
        />
      </>
    );
  }

  if (variant === 'aurora') {
    // ─── OPTION 1: FLUID AMBIENT AURORA MESH ───
    return (
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
        <div 
          className="absolute inset-0 opacity-[0.38] dark:opacity-[0.25]"
          style={{
            backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 80%)',
            maskImage: 'radial-gradient(ellipse 70% 60% at 50% 35%, black 20%, transparent 80%)',
          }}
        />

        <div className="absolute inset-0 overflow-hidden -z-10">
          <div
            className="absolute top-1/4 left-1/2 w-[520px] sm:w-[720px] h-[360px] sm:h-[440px] rounded-full bg-gradient-to-tr from-[#1E46EB]/25 via-[#1E46EB]/35 to-[#1738BD]/20 dark:from-[#1E46EB]/30 dark:via-[#1E46EB]/45 dark:to-[#1738BD]/30 blur-[90px] sm:blur-[130px] will-change-transform animate-[auroraFloat1_12s_ease-in-out_infinite]"
          />
          <div
            className="absolute top-1/6 left-1/2 w-[380px] sm:w-[540px] h-[300px] sm:h-[380px] rounded-full bg-gradient-to-br from-[#67BAF4]/25 via-[#67BAF4]/35 to-transparent dark:from-[#67BAF4]/20 dark:via-[#67BAF4]/30 dark:to-transparent blur-[80px] sm:blur-[120px] will-change-transform animate-[auroraFloat2_15s_ease-in-out_infinite]"
          />
          <div
            className="absolute top-1/3 left-1/2 w-[400px] sm:w-[560px] h-[320px] sm:h-[400px] rounded-full bg-gradient-to-tl from-[#1E46EB]/20 via-[#4338CA]/25 to-transparent dark:from-[#1E46EB]/25 dark:via-[#312E81]/35 dark:to-transparent blur-[90px] sm:blur-[130px] will-change-transform animate-[auroraFloat3_18s_ease-in-out_infinite]"
          />
        </div>
      </div>
    );
  }

  // ─── VARIATION A: THE SMOOTH HORIZONTAL HORIZON WAVE SWEEP (DEFAULT) ───
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" aria-hidden="true">
      {/* 1. Subtle Architectural Dot Matrix Grid with Smooth Radial Fade Mask */}
      <div 
        className="absolute inset-0 opacity-[0.32] dark:opacity-[0.22]"
        style={{
          backgroundImage: `radial-gradient(currentColor 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          WebkitMaskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black 25%, transparent 80%)',
          maskImage: 'radial-gradient(ellipse 75% 65% at 50% 40%, black 25%, transparent 80%)',
        }}
      />

      {/* 2. Soft Resting Ambient Core Halo (So the hero always has an elegant grounding glow) */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[850px] h-[320px] sm:h-[420px] rounded-full bg-gradient-to-b from-[#1E46EB]/15 via-[#67BAF4]/10 to-transparent dark:from-[#1E46EB]/25 dark:via-[#67BAF4]/15 dark:to-transparent blur-[90px] sm:blur-[130px] -z-10"
      />

      {/* 3. The Smooth Horizontal Horizon Wave Currents */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        
        {/* Primary Radiant Wave Beam — Sweeps across the horizon (left to right) */}
        <div
          className="absolute top-[32%] left-1/2 w-[700px] sm:w-[1100px] h-[320px] sm:h-[420px] rounded-[100%] bg-gradient-to-r from-transparent via-[#1E46EB]/30 via-[#67BAF4]/40 to-transparent dark:from-transparent dark:via-[#1E46EB]/45 dark:via-[#67BAF4]/55 dark:to-transparent blur-[70px] sm:blur-[100px] animate-horizon-wave"
        />

        {/* Secondary Harmonic Wave — Follows with soft counter-skew for rich fluid depth */}
        <div
          className="absolute top-[28%] left-1/2 w-[600px] sm:w-[950px] h-[280px] sm:h-[380px] rounded-[100%] bg-gradient-to-r from-transparent via-[#67BAF4]/20 via-[#1E46EB]/30 to-transparent dark:from-transparent dark:via-[#67BAF4]/30 dark:via-[#1E46EB]/40 dark:to-transparent blur-[75px] sm:blur-[110px] animate-horizon-wave-sec"
        />

        {/* Hairline Luminous Horizon Line */}
        <div 
          className="absolute top-[18%] left-1/2 -translate-x-1/2 w-[80vw] max-w-[1100px] h-[1px] bg-gradient-to-r from-transparent via-[#1E46EB]/20 dark:via-[#67BAF4]/25 to-transparent" 
        />
      </div>
    </div>
  );
}
