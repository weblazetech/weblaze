import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
}

export default function ProjectCard({ project }: ProjectCardProps): React.JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const images = project.slideshowImages && project.slideshowImages.length > 0 
    ? project.slideshowImages 
    : [project.previewImage];

  // Preload secondary images strictly on hover/focus to prevent initial bandwidth exhaustion on mobile
  useEffect(() => {
    if ((!isHovered && !isFocused) || typeof window === 'undefined') return;
    images.slice(1).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [isHovered, isFocused, images]);

  // Auto-slide when hovered
  useEffect(() => {
    if (!isHovered || images.length <= 1) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1100);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isHovered, images.length]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setCurrentIndex(0); // Reset to first slide cleanly
  }, []);

  const handlePrevSlide = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextSlide = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 40) {
      // Swiped left -> next
      e.preventDefault();
      setCurrentIndex((prev) => (prev + 1) % images.length);
    } else if (diff < -40) {
      // Swiped right -> prev
      e.preventDefault();
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className="group relative flex flex-col h-full bg-white dark:bg-[#161922] border border-[#E2E8F0] dark:border-[#232734] rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40 hover:border-[#1E46EB]/40 dark:hover:border-[#67BAF4]/40 active:scale-[0.985] active:border-[#1E46EB]/40 md:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4]"
    >
      {/* Sliding Preview Screen */}
      <div 
        className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-slate-100 dark:bg-[#0D0D0D] border border-slate-200/80 dark:border-[#232734] select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Horizontal Slider Track */}
        <div
          className="flex h-full w-full transition-transform duration-500 ease-out will-change-transform"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((imgSrc, idx) => (
            <div
              key={`${project.id}-slide-${idx}`}
              className="relative w-full h-full shrink-0 flex items-center justify-center bg-slate-100 dark:bg-[#0E1015]"
            >
              {imageError[idx] ? (
                <div className="flex flex-col items-center justify-center p-4 text-center">
                  <span className="text-2xl font-bold text-[#1E46EB] dark:text-[#67BAF4] font-display">
                    {project.name}
                  </span>
                  <span className="text-xs text-slate-400 mt-1">Live Preview</span>
                </div>
              ) : (
                <img
                  src={imgSrc}
                  alt={`${project.name} screenshot ${idx + 1}`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  onError={() => setImageError((prev) => ({ ...prev, [idx]: true }))}
                  className="w-full h-full object-cover object-top pointer-events-none"
                />
              )}
            </div>
          ))}
        </div>

        {/* Hover / Active Slide Navigation Arrows — using accessible span to avoid nested interactive button inside anchor */}
        {images.length > 1 && (
          <>
            <span
              role="button"
              tabIndex={0}
              onClick={handlePrevSlide}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handlePrevSlide(e);
                }
              }}
              aria-label="Previous screenshot"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-85 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white z-10 cursor-pointer"
            >
              <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={handleNextSlide}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleNextSlide(e);
                }
              }}
              aria-label="Next screenshot"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-85 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white z-10 cursor-pointer"
            >
              <svg className="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </>
        )}

        {/* Slide Indicator Dots Pill */}
        {images.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md pointer-events-none z-10">
            {images.map((_, dotIdx) => (
              <span
                key={`${project.id}-dot-${dotIdx}`}
                className={`transition-all duration-300 rounded-full ${
                  dotIdx === currentIndex
                    ? 'w-4 h-1.5 bg-[#67BAF4]'
                    : 'w-1.5 h-1.5 bg-white/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Live Badge overlay */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/90 dark:bg-[#161922]/90 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-xs pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold tracking-wider text-slate-700 dark:text-slate-300 uppercase">
            Live
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-col flex-grow pt-4">
        {/* Category Eyebrow */}
        <span className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#1E46EB] dark:text-[#67BAF4] font-mono">
          {project.category}
        </span>

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-bold font-display text-[#0D0D0D] dark:text-[#FAFAFA] mt-1 group-hover:text-[#1E46EB] dark:group-hover:text-[#67BAF4] transition-colors flex items-center justify-between">
          <span>{project.name}</span>
          <svg
            className="w-4 h-4 text-slate-400 group-hover:text-[#1E46EB] dark:group-hover:text-[#67BAF4] transform -translate-x-1 group-hover:translate-x-0 group-hover:-translate-y-0.5 transition-all shrink-0 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </h3>

        {/* Description */}
        <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed mt-2.5 flex-grow">
          {project.description}
        </p>

        {/* Meta (Platform / Role for business systems) */}
        {project.meta && (
          <div className="mt-3 pt-3 border-t border-[#E2E8F0] dark:border-[#232734] text-[11px] sm:text-xs text-[#525866] dark:text-[#94A3B8] font-mono">
            {project.meta}
          </div>
        )}

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-[#1F232F] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-[#2B3040]"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Bottom CTA Button */}
        <div className="mt-4 pt-3 flex items-center justify-between border-t border-slate-100 dark:border-[#1F232F]">
          <span className="text-xs sm:text-sm font-semibold text-[#0D0D0D] dark:text-[#FAFAFA] group-hover:text-[#1E46EB] dark:group-hover:text-[#67BAF4] flex items-center gap-1.5 transition-colors">
            {project.buttonText}
          </span>
          <span className="text-xs text-slate-400 font-mono group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
            <span className="hidden md:inline">Hover to preview</span>
            <span className="md:hidden">Swipe / tap to preview</span>
          </span>
        </div>
      </div>
    </a>
  );
}
