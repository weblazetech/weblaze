import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: string | number;
  duration?: number;
  className?: string;
}

export default function AnimatedCounter({
  value,
  duration = 1800,
  className = '',
}: AnimatedCounterProps): React.JSX.Element {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState<number>(0);
  const hasAnimatedRef = useRef<boolean>(false);

  // Parse numeric part and prefix/suffix
  const valueStr = String(value);
  const numericMatch = valueStr.match(/[\d.]+/);
  const targetNumber = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const isDecimal = valueStr.includes('.') && !valueStr.endsWith('+');
  const prefix = valueStr.startsWith('+') || valueStr.startsWith('$') ? valueStr[0] : '';
  const suffix = valueStr.replace(/^[+$]/, '').replace(/[\d.]+/, '');

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayValue(targetNumber);
      hasAnimatedRef.current = true;
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    if (hasAnimatedRef.current) {
      setDisplayValue(targetNumber);
      return;
    }

    let rafId: number | null = null;

    if (typeof IntersectionObserver === 'undefined') {
      setDisplayValue(targetNumber);
      hasAnimatedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimatedRef.current) {
          hasAnimatedRef.current = true;
          observer.disconnect();

          let startTime: number | null = null;
          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth easeOutQuart curve
            const easeProgress = 1 - Math.pow(1 - progress, 4);
            const current = easeProgress * targetNumber;

            setDisplayValue(current);

            if (progress < 1) {
              rafId = requestAnimationFrame(animate);
            } else {
              setDisplayValue(targetNumber);
            }
          };

          rafId = requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [targetNumber, duration]);

  const formattedNumber = isDecimal
    ? displayValue.toFixed(1)
    : Math.floor(displayValue);

  return (
    <span
      ref={containerRef}
      className={`tabular-nums inline-block ${className}`}
      style={{ fontVariantNumeric: 'tabular-nums' }}
    >
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
}
