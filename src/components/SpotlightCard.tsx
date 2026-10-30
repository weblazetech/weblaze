import React, { useRef, useState } from 'react';

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(30, 70, 235, 0.09)',
  borderColor = 'rgba(103, 186, 244, 0.35)',
  ...props
}: SpotlightCardProps): React.JSX.Element {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl overflow-hidden border border-[#E2E8F0] dark:border-[#232734] bg-white dark:bg-[#161922] transition-all duration-300 active:scale-[0.985] active:border-[#1E46EB]/40 md:active:scale-100 ${className}`}
      {...props}
    >
      {/* ─── Desktop Radial Spotlight Sheen ─── */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 z-10 hidden md:block"
        style={{
          opacity,
          background: `radial-gradient(350px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* ─── Desktop Hairline Dynamic Border Glow ─── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 z-10 hidden md:block"
        style={{
          opacity,
          border: `1.5px solid ${borderColor}`,
          WebkitMaskImage: `radial-gradient(220px circle at ${position.x}px ${position.y}px, black 35%, transparent 100%)`,
          maskImage: `radial-gradient(220px circle at ${position.x}px ${position.y}px, black 35%, transparent 100%)`,
        }}
      />

      {/* ─── Mobile View Ambient Sheen & Hairline Glow (Perpetually Active on Touch Devices) ─── */}
      <div
        aria-hidden="true"
        className="md:hidden pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-[#1E46EB]/[0.08] via-transparent to-[#67BAF4]/[0.05] dark:from-[#1E46EB]/[0.18] dark:to-[#67BAF4]/[0.09] z-10"
      />
      <div
        aria-hidden="true"
        className="md:hidden pointer-events-none absolute -inset-px rounded-2xl border border-[#1E46EB]/20 dark:border-[#67BAF4]/25 z-10"
      />

      {/* ─── Card Content ─── */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
