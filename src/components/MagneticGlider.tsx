import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export interface GliderItem {
  id: string;
  label: string;
  tag: string;
  description: string;
  metric?: string;
  link: string;
  icon?: React.ReactNode;
}

interface MagneticGliderProps {
  items: GliderItem[];
  defaultId?: string;
}

export default function MagneticGlider({ items, defaultId }: MagneticGliderProps): React.JSX.Element {
  const [activeId, setActiveId] = useState<string>(defaultId || items[0]?.id || '');
  const [gliderStyle, setGliderStyle] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Measure and align glider capsule
  useEffect(() => {
    const activeIdx = items.findIndex((item) => item.id === activeId);
    if (activeIdx !== -1 && tabRefs.current[activeIdx] && containerRef.current) {
      const tabEl = tabRefs.current[activeIdx];
      const containerEl = containerRef.current;
      if (tabEl) {
        const tabRect = tabEl.getBoundingClientRect();
        const containerRect = containerEl.getBoundingClientRect();
        setGliderStyle({
          left: tabRect.left - containerRect.left,
          width: tabRect.width,
          opacity: 1,
        });
      }
    }
  }, [activeId, items]);

  // Recalculate on window resize
  useEffect(() => {
    const handleResize = () => {
      const activeIdx = items.findIndex((item) => item.id === activeId);
      if (activeIdx !== -1 && tabRefs.current[activeIdx] && containerRef.current) {
        const tabEl = tabRefs.current[activeIdx];
        const containerEl = containerRef.current;
        if (tabEl) {
          const tabRect = tabEl.getBoundingClientRect();
          const containerRect = containerEl.getBoundingClientRect();
          setGliderStyle({
            left: tabRect.left - containerRect.left,
            width: tabRect.width,
            opacity: 1,
          });
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeId, items]);

  const activeItem = items.find((item) => item.id === activeId) || items[0];

  return (
    <div className="w-full">
      {/* ─── TAB NAVIGATION WITH SLIDING CAPSULE GLIDER ─── */}
      <div className="flex flex-col items-center w-full">
        <div className="w-full sm:w-auto overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden px-1 py-1 flex sm:block justify-start sm:justify-center">
          <div
            ref={containerRef}
            role="tablist"
            aria-label="Industries and key sectors"
            className="relative inline-flex flex-nowrap items-center p-1.5 rounded-2xl bg-[#F1F5F9] dark:bg-[#161922] border border-[#E2E8F0] dark:border-[#232734] shadow-inner shrink-0"
          >
            {/* Sliding Magnetic Highlight Capsule */}
            <div
              className="absolute top-1.5 bottom-1.5 rounded-xl bg-white dark:bg-[#1E46EB] shadow-md transition-all duration-300 ease-out pointer-events-none"
              style={{
                left: `${gliderStyle.left}px`,
                width: `${gliderStyle.width}px`,
                opacity: gliderStyle.opacity,
              }}
              aria-hidden="true"
            />

            {items.map((item, idx) => {
              const isActive = item.id === activeId;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabRefs.current[idx] = el;
                  }}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`sector-panel-${item.id}`}
                  id={`sector-tab-${item.id}`}
                  onClick={() => setActiveId(item.id)}
                  onMouseEnter={() => setActiveId(item.id)}
                  type="button"
                  className={`relative z-10 px-3.5 sm:px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-colors duration-200 whitespace-nowrap outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] ${
                    isActive
                      ? 'text-[#1E46EB] dark:text-white font-bold'
                      : 'text-[#525866] dark:text-[#94A3B8] hover:text-[#0D0D0D] dark:hover:text-[#FAFAFA]'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── INTERACTIVE DYNAMIC PREVIEW CARD ─── */}
      {activeItem && (
        <div
          id={`sector-panel-${activeItem.id}`}
          role="tabpanel"
          aria-labelledby={`sector-tab-${activeItem.id}`}
          className="relative overflow-hidden mt-6 p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-white dark:bg-[#161922] shadow-sm transition-all duration-300"
        >
          {/* Ambient Mobile Corner Glow */}
          <div
            aria-hidden="true"
            className="md:hidden pointer-events-none absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-br from-[#1E46EB]/15 to-[#67BAF4]/10 dark:from-[#1E46EB]/25 dark:to-[#67BAF4]/15 rounded-full blur-xl"
          />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-3">
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#E7F3FD] dark:bg-[#67BAF4]/15 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 animate-badge-sheen">
                  {activeItem.tag}
                </span>
                {activeItem.metric && (
                  <span className="text-xs font-mono font-bold text-[#1E46EB] dark:text-[#67BAF4]">
                    {activeItem.metric}
                  </span>
                )}
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                {activeItem.label} Solutions
              </h3>
              <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                {activeItem.description}
              </p>
            </div>

            <div className="shrink-0 self-end md:self-center">
              <Link
                to={activeItem.link}
                viewTransition
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-[#FAFAFA] dark:bg-[#1F232F] hover:bg-[#E7F3FD] dark:hover:bg-[#1E46EB]/20 text-[#1E46EB] dark:text-[#67BAF4] border border-[#E2E8F0] dark:border-[#232734] transition-all duration-200 active:scale-[0.98]"
              >
                <span>Explore {activeItem.label}</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
