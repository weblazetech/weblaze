import React, { useState, useRef, useEffect } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glare?: boolean;
}

export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  glare = true,
}: TiltCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transformStyle, setTransformStyle] = useState<string>('');
  const [glareStyle, setGlareStyle] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotX = (0.5 - y) * maxTilt * 2;
    const rotY = (x - 0.5) * maxTilt * 2;

    setTransformStyle(
      `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`
    );

    if (glare) {
      setGlareStyle({
        x: x * 100,
        y: y * 100,
        opacity: 0.15,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setGlareStyle((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: reducedMotion ? 'none' : transformStyle,
        transition: isHovered
          ? 'transform 0.1s ease-out'
          : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        transformStyle: 'preserve-3d',
      }}
      className={`relative will-change-transform active:scale-[0.985] md:active:scale-100 transition-transform duration-200 ${className}`}
    >
      {/* Moving Glare Overlay for Desktop */}
      {glare && !reducedMotion && (
        <div
          className="hidden md:block absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 overflow-hidden"
          style={{
            opacity: glareStyle.opacity,
            background: `radial-gradient(circle 320px at ${glareStyle.x}% ${glareStyle.y}%, rgba(255, 255, 255, 0.8), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Mobile Glare & Ambient Specular Highlight */}
      {glare && (
        <div
          className="md:hidden absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-gradient-to-br from-white/35 dark:from-white/10 to-transparent blur-xl pointer-events-none" />
        </div>
      )}
      {children}
    </div>
  );
}
