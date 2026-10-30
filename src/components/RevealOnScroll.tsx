import React, { useEffect, useRef, useState } from 'react';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  threshold?: number;
  durationMs?: number;
}

export default function RevealOnScroll({
  children,
  className = '',
  delayMs = 0,
  direction = 'up',
  threshold = 0.1,
  durationMs = 650,
}: RevealOnScrollProps): React.JSX.Element {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Respect user's motion preference (WCAG AA)
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const getTransformClass = (): string => {
    if (isVisible) {
      return 'opacity-100 translate-y-0 translate-x-0';
    }
    switch (direction) {
      case 'up':
        return 'opacity-0 translate-y-8';
      case 'down':
        return 'opacity-0 -translate-y-8';
      case 'left':
        return 'opacity-0 translate-x-8';
      case 'right':
        return 'opacity-0 -translate-x-8';
      case 'none':
        return 'opacity-0';
      default:
        return 'opacity-0 translate-y-8';
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        transitionDuration: `${durationMs}ms`,
        transitionDelay: `${delayMs}ms`,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      className={`transition-[transform,opacity] transform will-change-[transform,opacity] ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
}
