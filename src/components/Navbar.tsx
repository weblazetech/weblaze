import React, { useState, useEffect, useRef } from 'react';
import { flushSync } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { NavbarProps } from '../types';

interface DropdownItem {
  name: string;
  desc: string;
  path: string;
  badge?: string;
}

interface NavSection {
  id: string;
  name: string;
  basePath: string;
  items: DropdownItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    id: 'about',
    name: 'About',
    basePath: '/about',
    items: [
      {
        name: 'Company Overview',
        desc: 'Our mission, engineering values, and vision for digital transformation',
        path: '/about#overview',
      },
      {
        name: 'Leadership & Team',
        desc: 'Meet the architects, strategists, and innovators behind Weblaze',
        path: '/about#leadership',
      },
      {
        name: 'Milestones & History',
        desc: 'A decade of shipping mission-critical systems and client wins',
        path: '/about#timeline',
      },
      {
        name: 'Why Choose Weblaze',
        desc: 'Enterprise SLAs, security compliance, and transparent delivery',
        path: '/about#why-us',
      },
    ],
  },
  {
    id: 'services',
    name: 'Services',
    basePath: '/services',
    items: [
      {
        name: 'Custom Software Development',
        desc: 'Scalable backend architectures, microservices, and bespoke APIs',
        path: '/services#custom-software',
      },
      {
        name: 'Web Applications & Cloud',
        desc: 'Modern, high-performance web platforms built for high conversion',
        path: '/services#web-apps',
      },
      {
        name: 'Mobile App Engineering',
        desc: 'Native iOS, Android, and cross-platform mobile experiences',
        path: '/services#mobile-apps',
      },
      {
        name: 'AI & Machine Learning',
        desc: 'Intelligent automation, tailored LLM pipelines, and predictive models',
        path: '/services#ai-ml',
        badge: 'Popular',
      },
      {
        name: 'DevOps & Cloud Architecture',
        desc: 'Automated CI/CD, multi-cloud governance, and 99.99% uptime SLAs',
        path: '/services#cloud-devops',
      },
    ],
  },
  {
    id: 'solutions',
    name: 'Solutions',
    basePath: '/solutions',
    items: [
      {
        name: 'School & Campus ERP',
        desc: 'All-in-one management for admissions, fees, academics, and exams',
        path: '/solutions#school-erp',
        badge: 'Flagship',
      },
      {
        name: 'Business Process Automation',
        desc: 'Streamline legacy manual operations into frictionless digital pipelines',
        path: '/solutions#automation',
      },
      {
        name: 'Enterprise Data Platforms',
        desc: 'Secure, real-time analytics hubs and high-throughput data pipelines',
        path: '/solutions#enterprise',
      },
      {
        name: 'Custom SaaS Products',
        desc: 'Multi-tenant cloud platforms designed for rapid organic scaling',
        path: '/solutions#saas',
      },
    ],
  },
  {
    id: 'careers',
    name: 'Careers',
    basePath: '/careers',
    items: [
      {
        name: 'Open Positions',
        desc: 'Explore active roles across frontend, backend, AI, and design',
        path: '/careers#openings',
        badge: 'Hiring',
      },
      {
        name: 'Engineering Culture',
        desc: 'How we build, collaborate, ship fast, and cultivate talent',
        path: '/careers#culture',
      },
      {
        name: 'Internship Program',
        desc: 'Mentorship and real production experience for aspiring developers',
        path: '/careers#internships',
      },
      {
        name: 'Perks & Benefits',
        desc: 'Flexible work, continuous learning budgets, and competitive compensation',
        path: '/careers#benefits',
      },
    ],
  },
  {
    id: 'programs',
    name: 'Programs',
    basePath: '/programs',
    items: [
      {
        name: 'Career Development Programs',
        desc: 'Hands-on project-driven programs to bridge college to corporate',
        path: '/programs#overview',
        badge: 'New',
      },
      {
        name: 'Full-Stack Web Track',
        desc: 'Master React, TypeScript, Node.js, and cloud deployments with mentors',
        path: '/programs#fullstack-track',
      },
      {
        name: 'AI & Data Engineering Track',
        desc: 'Hands-on machine learning, LLM integrations, and data engineering',
        path: '/programs#ai-track',
      },
      {
        name: 'Cloud & DevOps Apprenticeship',
        desc: 'Docker, Kubernetes, CI/CD pipelines, and AWS/GCP infrastructure',
        path: '/programs#devops-track',
      },
      {
        name: 'College & Campus Partnerships',
        desc: 'Tailored hackathons, workshops, and hiring pipelines for universities',
        path: '/programs#institutions',
      },
    ],
  },
];

export default function Navbar({ darkMode, setDarkMode }: NavbarProps): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);
  const [isThemeBursting, setIsThemeBursting] = useState<boolean>(false);
  
  const navRef = useRef<HTMLElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  // Close dropdowns on location changes
  useEffect(() => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard accessibility: Escape closes dropdown and mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cleanup dropdown timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = (sectionId: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(sectionId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const isSectionActive = (basePath: string): boolean => {
    return location.pathname === basePath || location.pathname.startsWith(`${basePath}/`);
  };

  const toggleMobileSection = (sectionId: string) => {
    setMobileExpandedSection(prev => (prev === sectionId ? null : sectionId));
  };

  const handleDropdownItemClick = (path: string) => {
    setActiveDropdown(null);
    setMobileMenuOpen(false);

    if (path.includes('#')) {
      const [targetPath, hash] = path.split('#');
      if (location.pathname === targetPath) {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  // Circular ripple view transition expanding from the button center across the whole screen
  const toggleThemeWithRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    setIsThemeBursting(true);
    setTimeout(() => setIsThemeBursting(false), 650);

    const doc = document as Document & {
      startViewTransition?: (callback: () => void) => {
        ready: Promise<void>;
        finished?: Promise<void>;
      };
    };

    if (
      !doc.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setDarkMode(!darkMode);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    // Disable separate page-content isolation so the circular ripple seamlessly clips the entire screen
    document.documentElement.classList.add('theme-transitioning');

    const cleanupThemeTransition = () => {
      document.documentElement.classList.remove('theme-transitioning');
    };

    const transition = doc.startViewTransition(() => {
      flushSync(() => {
        setDarkMode(prev => !prev);
      });
    });

    transition.ready
      .then(() => {
        const clipPath = [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ];

        const anim = document.documentElement.animate(
          {
            clipPath: clipPath,
          },
          {
            duration: 520,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );

        anim.finished
          .then(cleanupThemeTransition)
          .catch(cleanupThemeTransition);
      })
      .catch(cleanupThemeTransition);

    if (transition.finished) {
      transition.finished
        .then(cleanupThemeTransition)
        .catch(cleanupThemeTransition);
    }
  };

  return (
    <>
      <header 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/95 dark:bg-[#0D0D0D]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#232734] transition-colors duration-200 shadow-sm"
      >
      {/* Refined Navbar Container: Compact & balanced (h-18 sm:h-20) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-5 xl:px-8 h-18 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo: weblaze; */}
        <Link 
          to="/" 
          viewTransition
          title="Weblaze — Home"
          aria-label="Weblaze Home"
          onClick={(e) => {
            setMobileMenuOpen(false);
            setActiveDropdown(null);
            if (location.pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center py-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] rounded-xl cursor-pointer shrink-0"
        >
          <img
            src="/assets/logo-light.png"
            alt="Weblaze"
            className="h-[18px] sm:h-[20px] w-auto object-contain block dark:hidden"
          />
          <img
            src="/assets/logo-dark.png"
            alt="Weblaze"
            className="h-[18px] sm:h-[20px] w-auto object-contain hidden dark:block"
          />
        </Link>

        {/* Desktop Navigation Links with Rich Dropdowns */}
        <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 font-medium text-[13px] xl:text-[15px]">
          {NAV_SECTIONS.map((section) => {
            const isCurrent = isSectionActive(section.basePath);
            const isOpen = activeDropdown === section.id;

            return (
              <div 
                key={section.id} 
                className="relative"
                onMouseEnter={() => handleMouseEnter(section.id)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to={section.basePath}
                  viewTransition
                  onClick={() => setActiveDropdown(null)}
                  aria-expanded={isOpen}
                  className={`inline-flex items-center gap-1 xl:gap-1.5 px-2 xl:px-3 py-1.5 xl:py-2 rounded-xl transition-all duration-150 ${
                    isCurrent || isOpen
                      ? 'text-[#1E46EB] dark:text-[#67BAF4] font-semibold bg-[#E7F3FD] dark:bg-[#67BAF4]/10 shadow-xs'
                      : 'text-[#525866] dark:text-[#94A3B8] hover:text-[#0D0D0D] dark:hover:text-[#FAFAFA] hover:bg-slate-100 dark:hover:bg-[#161922]'
                  }`}
                >
                  <span>{section.name}</span>
                  <svg 
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#1E46EB] dark:text-[#67BAF4]' : 'text-slate-400 dark:text-slate-500'}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                {/* Dropdown Menu Flyout — centered under the CTA and opening from the middle */}
                {isOpen && (
                  <div 
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
                    onMouseEnter={() => handleMouseEnter(section.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="w-max rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-white/95 dark:bg-[#161922]/95 backdrop-blur-xl shadow-xl shadow-black/10 dark:shadow-black/50 p-1.5 animate-fade-in-up origin-top">
                      <div className="space-y-0.5">
                        {section.items.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            viewTransition
                            onClick={() => handleDropdownItemClick(item.path)}
                            className="flex items-center justify-between gap-3 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-[#1F232F] transition-all duration-150 group whitespace-nowrap"
                          >
                            <span className="text-sm font-medium text-[#0D0D0D] dark:text-[#FAFAFA] group-hover:text-[#1E46EB] dark:group-hover:text-[#67BAF4] transition-colors">
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/15 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/15 dark:border-[#67BAF4]/20 shrink-0">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Standalone Top-Level Link: Portfolio */}
          <Link 
            to="/portfolio" 
            viewTransition
            className={`px-2 xl:px-3 py-1.5 xl:py-2 rounded-xl transition-all ${
              location.pathname === '/portfolio'
                ? 'text-[#1E46EB] dark:text-[#67BAF4] font-semibold bg-[#E7F3FD] dark:bg-[#67BAF4]/10 shadow-xs' 
                : 'text-[#525866] dark:text-[#94A3B8] hover:text-[#0D0D0D] dark:hover:text-[#FAFAFA] hover:bg-slate-100 dark:hover:bg-[#161922]'
            }`}
          >
            Portfolio
          </Link>

          {/* Standalone Top-Level Link: Industries */}
          <Link 
            to="/industries" 
            viewTransition
            className={`px-2 xl:px-3 py-1.5 xl:py-2 rounded-xl transition-all ${
              location.pathname === '/industries'
                ? 'text-[#1E46EB] dark:text-[#67BAF4] font-semibold bg-[#E7F3FD] dark:bg-[#67BAF4]/10 shadow-xs' 
                : 'text-[#525866] dark:text-[#94A3B8] hover:text-[#0D0D0D] dark:hover:text-[#FAFAFA] hover:bg-slate-100 dark:hover:bg-[#161922]'
            }`}
          >
            Industries
          </Link>

          {/* Standalone Top-Level Link: Contact */}
          <Link 
            to="/contact" 
            viewTransition
            className={`px-2 xl:px-3 py-1.5 xl:py-2 rounded-xl transition-all ${
              location.pathname === '/contact'
                ? 'text-[#1E46EB] dark:text-[#67BAF4] font-semibold bg-[#E7F3FD] dark:bg-[#67BAF4]/10 shadow-xs' 
                : 'text-[#525866] dark:text-[#94A3B8] hover:text-[#0D0D0D] dark:hover:text-[#FAFAFA] hover:bg-slate-100 dark:hover:bg-[#161922]'
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Right Actions: Theme Switcher & Primary CTA */}
        <div className="flex items-center gap-2 xl:gap-3 shrink-0">
          
          {/* Dark / Light Toggle with Celestial Breathing Emission (Opt 1) & Click Flare Burst (Opt 3) */}
          <div className="relative inline-flex items-center justify-center group/theme">
            {/* Ambient Breathing Border Light Emission (Option 1) */}
            <span
              aria-hidden="true"
              className={`absolute -inset-[3px] rounded-2xl blur-sm pointer-events-none transition-all duration-500 ${
                darkMode
                  ? 'bg-gradient-to-r from-[#67BAF4]/40 via-[#F59E0B]/30 to-[#67BAF4]/40 group-hover/theme:opacity-100 group-hover/theme:blur-md'
                  : 'bg-gradient-to-r from-[#1E46EB]/30 via-[#67BAF4]/35 to-[#1E46EB]/30 group-hover/theme:opacity-100 group-hover/theme:blur-md'
              } animate-[celestialBreathe_4s_ease-in-out_infinite]`}
            />

            {/* Click Flare Burst Ring (Option 3) */}
            {isThemeBursting && (
              <span
                aria-hidden="true"
                className={`absolute -inset-1.5 rounded-2xl pointer-events-none border-2 ${
                  darkMode
                    ? 'border-[#67BAF4] bg-[#67BAF4]/20'
                    : 'border-[#1E46EB] bg-[#1E46EB]/20'
                } animate-[flareBurst_0.6s_cubic-bezier(0.16,1,0.3,1)_forwards] z-20`}
              />
            )}

            {/* Button Core */}
            <button
              type="button"
              onClick={toggleThemeWithRipple}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`relative z-10 p-2.5 rounded-xl border transition-all duration-200 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] active:scale-95 group-hover/theme:scale-105 cursor-pointer ${
                darkMode
                  ? 'border-[#67BAF4]/40 bg-[#161922] text-[#67BAF4] shadow-[#67BAF4]/15'
                  : 'border-[#1E46EB]/25 bg-white text-[#1E46EB] shadow-[#1E46EB]/15'
              }`}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg className="w-4 h-4 text-[#67BAF4] transition-transform duration-300 group-hover/theme:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-[#1E46EB] transition-transform duration-300 group-hover/theme:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* High Priority CTA with Orbiting Border Beam */}
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
            className="relative hidden sm:inline-flex items-center justify-center p-[1.5px] rounded-xl overflow-hidden active:scale-95 transition-all duration-200 group/cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] shadow-sm shadow-[#1E46EB]/20 hover:shadow-xl hover:shadow-[#1E46EB]/35 shrink-0 whitespace-nowrap"
          >
            {/* Spinning Comet Border Beam — Perpetually active without needing hover */}
            <span 
              aria-hidden="true" 
              className="absolute inset-[-150%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_300deg,#1E46EB_330deg,#67BAF4_350deg,#ffffff_360deg)] opacity-90 group-hover/cta:opacity-100 transition-opacity duration-300 pointer-events-none" 
            />

            {/* Resting Base Border */}
            <span 
              aria-hidden="true" 
              className="absolute inset-0 rounded-xl border border-[#1E46EB]/20 dark:border-[#67BAF4]/15 pointer-events-none" 
            />

            {/* Button Surface & Text */}
            <span className="relative z-10 inline-flex items-center justify-center px-3 xl:px-4 py-2 rounded-[10.5px] text-xs xl:text-sm font-semibold tracking-wide text-white bg-gradient-to-r from-[#1E46EB] to-[#1738BD] group-hover/cta:from-[#1E46EB] group-hover/cta:to-[#1738BD] transition-all duration-200 whitespace-nowrap leading-none">
              <span className="whitespace-nowrap">Get in Touch</span>
            </span>
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#232734] lg:hidden text-[#0D0D0D] dark:text-[#FAFAFA] hover:bg-slate-100 dark:hover:bg-[#161922] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB]"
            aria-label="Toggle navigation menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Accordion Dropdowns — Positioned as an absolute floating overlay so it does NOT push page content down */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 border-b border-[#E2E8F0] dark:border-[#232734] bg-white/95 dark:bg-[#0D0D0D]/95 backdrop-blur-2xl px-4 py-4 space-y-1.5 max-h-[calc(100dvh-4.5rem)] overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch] shadow-2xl shadow-black/25 dark:shadow-black/70 animate-fade-in origin-top">
          {NAV_SECTIONS.map((section) => {
            const isExpanded = mobileExpandedSection === section.id;
            const isCurrent = isSectionActive(section.basePath);

            return (
              <div key={section.id} className="rounded-xl border border-transparent dark:border-transparent">
                <div className="flex items-center justify-between">
                  <Link
                    to={section.basePath}
                    viewTransition
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-colors ${
                      isCurrent
                        ? 'text-[#1E46EB] dark:text-[#67BAF4] bg-[#E7F3FD] dark:bg-[#67BAF4]/10'
                        : 'text-[#0D0D0D] dark:text-[#FAFAFA] hover:bg-slate-100 dark:hover:bg-[#161922]'
                    }`}
                  >
                    {section.name}
                  </Link>

                  <button
                    type="button"
                    onClick={() => toggleMobileSection(section.id)}
                    className="p-2.5 rounded-lg text-[#525866] dark:text-[#94A3B8] hover:text-[#0D0D0D] dark:hover:text-[#FAFAFA]"
                    aria-label={`Toggle ${section.name} sub-menu`}
                  >
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>

                {/* Sub-links inside accordion */}
                {isExpanded && (
                  <div className="pl-4 pr-2 py-1 space-y-1 border-l-2 border-[#1E46EB]/30 dark:border-[#67BAF4]/30 ml-3 my-1">
                    {section.items.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        viewTransition
                        onClick={() => handleDropdownItemClick(subItem.path)}
                        className="block py-2 px-2.5 rounded-lg text-xs font-medium text-[#525866] dark:text-[#94A3B8] hover:text-[#1E46EB] dark:hover:text-[#67BAF4] hover:bg-slate-50 dark:hover:bg-[#161922]"
                      >
                        <div className="flex items-center justify-between">
                          <span>{subItem.name}</span>
                          {subItem.badge && (
                            <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/15 text-[#1765A8] dark:text-[#67BAF4]">
                              {subItem.badge}
                            </span>
                          )}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Standalone Mobile Links */}
          <Link
            to="/portfolio"
            viewTransition
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2.5 px-3 rounded-lg text-sm font-semibold ${
              location.pathname === '/portfolio'
                ? 'text-[#1E46EB] dark:text-[#67BAF4] bg-[#E7F3FD] dark:bg-[#67BAF4]/10'
                : 'text-[#0D0D0D] dark:text-[#FAFAFA] hover:bg-slate-100 dark:hover:bg-[#161922]'
            }`}
          >
            Portfolio
          </Link>

          <Link
            to="/industries"
            viewTransition
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2.5 px-3 rounded-lg text-sm font-semibold ${
              location.pathname === '/industries'
                ? 'text-[#1E46EB] dark:text-[#67BAF4] bg-[#E7F3FD] dark:bg-[#67BAF4]/10'
                : 'text-[#0D0D0D] dark:text-[#FAFAFA] hover:bg-slate-100 dark:hover:bg-[#161922]'
            }`}
          >
            Industries
          </Link>

          <Link
            to="/contact"
            viewTransition
            onClick={() => setMobileMenuOpen(false)}
            className={`block py-2.5 px-3 rounded-lg text-sm font-semibold ${
              location.pathname === '/contact'
                ? 'text-[#1E46EB] dark:text-[#67BAF4] bg-[#E7F3FD] dark:bg-[#67BAF4]/10'
                : 'text-[#0D0D0D] dark:text-[#FAFAFA] hover:bg-slate-100 dark:hover:bg-[#161922]'
            }`}
          >
            Contact
          </Link>

          <div className="pt-3 border-t border-[#E2E8F0] dark:border-[#232734]">
            <Link
              to="/contact#contact-form"
              viewTransition
              onClick={() => {
                setMobileMenuOpen(false);
                if (location.pathname === '/contact') {
                  const form = document.getElementById('contact-form');
                  if (form) {
                    form.scrollIntoView({ behavior: 'smooth' });
                    const input = document.getElementById('contact-name');
                    if (input) input.focus();
                  }
                }
              }}
              className="relative flex items-center justify-center w-full p-[1.5px] rounded-xl overflow-hidden active:scale-[0.98] transition-transform duration-150 shadow-md shadow-[#1E46EB]/25"
            >
              {/* Spinning Comet Border Beam */}
              <span 
                aria-hidden="true" 
                className="absolute inset-[-150%] animate-border-beam bg-[conic-gradient(from_0deg,transparent_0_300deg,#1E46EB_330deg,#67BAF4_350deg,#ffffff_360deg)] opacity-95 pointer-events-none" 
              />
              <span className="relative z-10 flex items-center justify-center w-full py-2.5 px-4 rounded-[10.5px] text-sm font-semibold text-white bg-gradient-to-r from-[#1E46EB] via-[#1E46EB] to-[#1738BD] overflow-hidden">
                <span 
                  aria-hidden="true"
                  className="absolute top-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-25deg] animate-sheen-slide pointer-events-none"
                />
                <span className="relative z-10 flex items-center gap-2">
                  <span>Get in Touch</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </header>

    {/* Structural Spacer to preserve exact layout flow height for fixed navbar on all viewports */}
    <div className="h-18 sm:h-20 shrink-0 pointer-events-none" aria-hidden="true" />
  </>
  );
}
