import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';
import SpotlightCard from '../components/SpotlightCard';
import AnimatedCounter from '../components/AnimatedCounter';
import MagneticGlider, { GliderItem } from '../components/MagneticGlider';
import RevealOnScroll from '../components/RevealOnScroll';
import TiltCard from '../components/TiltCard';
import HeroBackground from '../components/HeroBackground';
import { MetricItem, ServiceItem } from '../types';
import { getStoredMetrics } from '../data/adminStore';

const SECTOR_ITEMS: GliderItem[] = [
  {
    id: 'education',
    label: 'Education',
    tag: 'Active Deployments',
    metric: 'SR University Partner',
    description: 'Comprehensive school ERPs, learning management platforms, automated fee collection, and digital report card systems for schools and coaching institutes.',
    link: '/industries#education',
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    tag: 'Compliance-Ready Architecture',
    metric: 'HIPAA & DPDP Ready',
    description: 'Hospital management systems, electronic health records (EHR), outpatient scheduling, diagnostic lab workflows, and patient mobile applications.',
    link: '/industries#healthcare',
  },
  {
    id: 'finance',
    label: 'Finance',
    tag: 'Security-First Approach',
    metric: 'Bank-Grade SLA',
    description: 'Secure customer interfaces, loan underwriting workflows, compliance tracking, automated KYC verification, and executive analytics dashboards.',
    link: '/industries#finance',
  },
  {
    id: 'retail',
    label: 'Retail',
    tag: 'End-to-End Retail Tech',
    metric: 'Sub-second Sync',
    description: 'High-volume digital storefronts, multi-vendor marketplace engines, inventory synchronization across physical stores and web, and POS integrations.',
    link: '/industries#retail',
  },
  {
    id: 'logistics',
    label: 'Logistics',
    tag: 'Real-Time Tracking Capable',
    metric: 'Live Telematics',
    description: 'Fleet GPS management, dispatch routing algorithms, automated consignment tracking, and warehouse handheld inventory scanners.',
    link: '/industries#logistics',
  },
];

export default function HomePage(): React.JSX.Element {
  const [metrics, setMetrics] = useState<MetricItem[]>(() => getStoredMetrics());

  useEffect(() => {
    const handleUpdate = () => {
      setMetrics(getStoredMetrics());
    };
    window.addEventListener('weblaze_metrics_updated', handleUpdate);
    return () => window.removeEventListener('weblaze_metrics_updated', handleUpdate);
  }, []);

  const services: ServiceItem[] = [
    {
      title: 'Web Development',
      badge: 'Enterprise Portals',
      desc: 'High-performance web applications, business portals, and e-commerce platforms built with modern frameworks and clean code.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><path d="M7 8l2 2-2 2M11 12h4"/>
        </svg>
      )
    },
    {
      title: 'Mobile Applications',
      badge: 'iOS & Android',
      desc: 'Cross-platform and native mobile apps for iOS and Android with clean UX and reliable offline-first performance.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="18" r="1" fill="currentColor"/><path d="M9 6h6"/>
        </svg>
      )
    },
    {
      title: 'AI & ML Solutions',
      badge: 'Autonomous Systems',
      desc: 'Intelligent automation, chatbots, NLP integrations, and custom AI models that help streamline operations and decision-making.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M12 2a4 4 0 014 4v1h1a3 3 0 010 6h-1v1a4 4 0 01-8 0v-1H7a3 3 0 010-6h1V6a4 4 0 014-4z"/>
          <circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/>
        </svg>
      )
    },
    {
      title: 'Custom Software & ERP',
      badge: 'Operational Tools',
      desc: 'ERP, CRM, HRMS, and tailored business platforms designed around your specific workflows and operational needs.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><path d="M12 12v4M9 14h6"/>
        </svg>
      )
    },
    {
      title: 'Cloud & DevOps',
      badge: 'AWS / GCP / Azure',
      desc: 'Cloud deployment, CI/CD pipelines, containerisation, and infrastructure setup with zero-downtime scalability.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>
        </svg>
      )
    },
    {
      title: 'Digital Transformation',
      badge: 'Modernization',
      desc: 'Technology consulting, legacy system modernisation, and end-to-end digital strategy for growing businesses.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      )
    },
  ];

  return (
    <div>
      {/* ─── HERO SECTION ─── */}
      <section id="home" className="relative min-h-[100dvh] flex items-center justify-center pt-24 pb-20 overflow-hidden">
        
        {/* Hero Background — Circuit Board Animation with Active Signal Packets */}
        <HeroBackground variant="circuit" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 animate-fade-in-up">
          {/* Eyebrow Tag with Radiant Sheen */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-semibold tracking-wider uppercase mb-6 sm:mb-8 border transition-all duration-200 bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border-[#1E46EB]/20 dark:border-[#67BAF4]/20 shadow-sm animate-badge-sheen max-w-full">
            <span className="w-2 h-2 rounded-full bg-[#1E46EB] dark:bg-[#67BAF4] animate-pulse shrink-0" />
            <span className="truncate">India-Built &bull; Scalable Solutions &bull; Founded 2024</span>
          </div>

          {/* Main Headline with Radiant Flow */}
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] max-w-4xl mx-auto leading-[1.12] sm:leading-[1.08] font-display">
            We build software<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E46EB] via-[#67BAF4] to-[#1E46EB] animate-text-shimmer">
              that scales.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg lg:text-xl text-[#525866] dark:text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            Weblaze Technologies is a young, execution-focused software company building custom web platforms, mobile applications, and AI-driven systems — designed to grow with your business.
          </p>

          {/* Dual Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {/* Primary CTA: Start a Project with Ambient Breathing Aura Glow */}
            <div className="relative group/hero-primary inline-flex">
              {/* Soft blurred underlay halo that gently pulses (30% to 65% opacity over 3.5s loop) */}
              <span
                aria-hidden="true"
                className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-[#1E46EB] via-[#67BAF4] to-[#1E46EB] opacity-45 blur-md pointer-events-none animate-[heroAuraPulse_3.5s_ease-in-out_infinite] group-hover/hero-primary:opacity-85 group-hover/hero-primary:blur-lg group-hover/hero-primary:scale-105 transition-all duration-300"
              />

              <Link
                to="/contact"
                viewTransition
                className="relative z-10 inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#1E46EB] via-[#1E46EB] to-[#1738BD] shadow-lg shadow-[#1E46EB]/30 hover:shadow-xl hover:shadow-[#1E46EB]/50 hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200"
              >
                <span>Start a Project</span>
                <svg className="w-4 h-4 transition-transform duration-200 ease-out group-hover/hero-primary:translate-x-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </div>

            {/* Secondary CTA: Our Services with Border Gradient Ignite + Spring Arrow */}
            <Link
              to="/services"
              viewTransition
              className="relative group/hero-sec inline-flex items-center justify-center p-[1px] rounded-xl overflow-hidden hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-200 shadow-sm"
            >
              {/* Resting Base Border */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-xl border border-[#E2E8F0] dark:border-[#232734] transition-opacity duration-300 group-hover/hero-sec:opacity-0 pointer-events-none"
              />

              {/* Glowing Gradient Border Ignite on Hover (Desktop) & Ambient Glow (Mobile) */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#1E46EB] via-[#67BAF4] to-[#1E46EB] opacity-80 md:opacity-0 md:group-hover/hero-sec:opacity-100 transition-opacity duration-300 pointer-events-none"
              />

              {/* Button Core Surface */}
              <span className="relative z-10 inline-flex items-center gap-2 px-6 py-3 rounded-[11px] text-sm sm:text-base font-semibold bg-white dark:bg-[#161922] text-[#0D0D0D] dark:text-[#FAFAFA] group-hover/hero-sec:bg-white/95 dark:group-hover/hero-sec:bg-[#161922]/95 transition-colors duration-200">
                <span>Our Services</span>
                <svg
                  className="w-3.5 h-3.5 text-[#1E46EB] dark:text-[#67BAF4] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/hero-sec:translate-x-1.5 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>

          {/* Meta Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-[#E2E8F0] dark:via-[#232734] to-transparent my-14 max-w-3xl mx-auto" />

          {/* Metrics Counters Strip with Animated Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {metrics.map((stat, i) => (
              <div key={i} className="flex flex-col items-center">
                <strong className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] tracking-tight font-display">
                  <AnimatedCounter value={stat.count} />
                </strong>
                <span className="text-xs sm:text-sm text-[#525866] dark:text-[#94A3B8] font-medium mt-1">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── TRUST STRIP (SECTORS WITH MAGNETIC GLIDER) ─── */}
      <section className="py-12 border-y border-[#E2E8F0] dark:border-[#232734] bg-[#FFFFFF] dark:bg-[#12141B] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#525866] dark:text-[#94A3B8]">
              Domain Expertise
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mt-1">
              Building solutions across key sectors
            </h2>
          </div>
          <MagneticGlider items={SECTOR_ITEMS} defaultId="education" />
        </div>
      </section>

      {/* ─── SERVICES GRID (WITH TOP EXPANDING ACCENT LINE) ─── */}
      <section className="py-24 bg-[#FAFAFA] dark:bg-[#0D0D0D] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-3">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              End-to-end technology services
            </h2>
            <p className="mt-3 text-base sm:text-lg text-[#525866] dark:text-[#94A3B8]">
              From architecture to deployment — we handle every layer of your digital product.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, idx) => (
              <RevealOnScroll key={idx} delayMs={idx * 75} direction="up">
                <SpotlightCard
                  className="service-card-accent group relative flex flex-col justify-between p-8 hover:-translate-y-1.5 shadow-sm hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/70 h-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1E46EB] dark:text-[#67BAF4] group-hover:bg-[#1E46EB] group-hover:text-white dark:group-hover:bg-[#1E46EB] dark:group-hover:text-white">
                        {service.icon}
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#FAFAFA] dark:bg-[#1F232F] text-[#525866] dark:text-[#94A3B8] border border-[#E2E8F0] dark:border-[#232734]">
                        {service.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] group-hover:text-[#1E46EB] dark:group-hover:text-[#67BAF4] transition-colors font-display">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#525866] dark:text-[#94A3B8]">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#E2E8F0] dark:border-[#232734]/80 flex items-center">
                    <Link
                      to="/services"
                      viewTransition
                      className="inline-flex items-center justify-between w-full text-xs font-bold text-[#1E46EB] dark:text-[#67BAF4] group/link"
                    >
                      <span className="relative pb-0.5">
                        <span>Explore Architecture & Solutions</span>
                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1E46EB] dark:bg-[#67BAF4] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                      </span>
                      <span className="w-5 h-5 rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/15 flex items-center justify-center transition-transform duration-300 ease-out group-hover:translate-x-[3px] shrink-0">
                        →
                      </span>
                    </Link>
                  </div>
                </SpotlightCard>
              </RevealOnScroll>
            ))}
          </div>

        </div>
      </section>

      {/* ─── ACADEMIC COLLABORATION WITH 3D TILT ─── */}
      <section className="py-16 bg-white dark:bg-[#12141B] border-y border-[#E2E8F0] dark:border-[#232734] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <TiltCard className="rounded-3xl" maxTilt={3.5}>
            <div className="p-8 sm:p-12 rounded-3xl border border-[#E2E8F0] dark:border-[#232734] bg-gradient-to-br from-[#FAFAFA] dark:from-[#161922] to-[#E7F3FD]/30 dark:to-[#1E46EB]/10 flex flex-col md:flex-row items-center gap-8 shadow-sm">
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#1E46EB] text-white flex items-center justify-center shrink-0 shadow-lg shadow-[#1E46EB]/30">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                  <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                </svg>
              </div>

              <div className="flex-1 text-center md:text-left">
                <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4] mb-2">
                  Academic Partnership
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                  Memorandum of Understanding with SR University
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#525866] dark:text-[#94A3B8] leading-relaxed max-w-3xl">
                  Weblaze Technologies has signed a Memorandum of Understanding (MOU) with SR University to collaborate on technology development, student innovation programmes, and real-world system implementation — bridging the gap between academia and industry.
                </p>
              </div>

              <div className="shrink-0">
                <a
                  href="https://sru.edu.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#0D0D0D] dark:bg-[#1E46EB] hover:bg-[#222] dark:hover:bg-[#1738BD] transition-all duration-150 shadow-md"
                >
                  <span>Learn about SR University</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

            </div>
          </TiltCard>
        </div>
      </section>

      {/* ─── WHY CHOOSE WEBLAZE ─── */}
      <section className="py-24 bg-[#FAFAFA] dark:bg-[#0D0D0D] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-3">
                Why Weblaze
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display leading-tight">
                The case for<br />choosing us
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                We're a young company that moves fast, communicates clearly, and builds with long-term thinking. Every engagement is grounded in accountability and transparent delivery.
              </p>
              <div className="mt-8">
                <Link
                  to="/contact"
                  viewTransition
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] active:scale-[0.97] transition-all duration-150 shadow-md shadow-[#1E46EB]/20 hover:shadow-lg hover:shadow-[#1E46EB]/35"
                >
                  Start a Conversation
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {[
                {
                  num: '01',
                  title: 'Architecture-First Engineering',
                  desc: 'Every project starts with a proper technical architecture review — not a template. We design systems to handle growth from day one, so you don\'t need to re-platform later.'
                },
                {
                  num: '02',
                  title: 'Focused Domain Knowledge',
                  desc: 'We work closely with clients in education, healthcare, finance, and retail — bringing practical domain awareness that reduces revision cycles and accelerates delivery.'
                },
                {
                  num: '03',
                  title: 'Transparent Delivery Process',
                  desc: 'Agile sprints, weekly progress updates, milestone-based billing, and direct access to the developers building your product. No middlemen. No opaque workflows.'
                },
                {
                  num: '04',
                  title: 'Long-Term Partnership Model',
                  desc: 'We offer structured post-launch support, feature roadmap planning, and dedicated maintenance — because go-live is just the beginning, not the end of our engagement.'
                },
                {
                  num: '05',
                  title: 'India-Rooted, Globally Capable',
                  desc: 'Headquartered in Hyderabad with a team experienced in international development standards, data compliance (GDPR, DPDP), and remote collaboration.'
                },
              ].map((row, idx) => (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-white dark:bg-[#161922] hover:border-[#1E46EB]/30 dark:hover:border-[#67BAF4]/30 transition-all duration-200"
                >
                  <div className="flex items-start gap-4">
                    <span className="font-mono text-xl font-extrabold text-[#1E46EB] dark:text-[#67BAF4]">
                      {row.num}
                    </span>
                    <div>
                      <h4 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                        {row.title}
                      </h4>
                      <p className="mt-2 text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                        {row.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── PROCESS TIMELINE ─── */}
      <section className="py-24 bg-white dark:bg-[#12141B] border-t border-[#E2E8F0] dark:border-[#232734] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-3 animate-badge-sheen">
              How We Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              A structured delivery process
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#525866] dark:text-[#94A3B8]">
              Predictable, milestone-driven execution from architecture to scale.
            </p>
          </div>

          {/* Animated Stepper Pipeline Conduit (Desktop) */}
          <div className="hidden lg:block relative mb-8 px-6 select-none pointer-events-none" aria-hidden="true">
            <svg className="w-full h-10" viewBox="0 0 1000 40" fill="none">
              <defs>
                <linearGradient id="stepper-pipe-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1E46EB" stopOpacity="0.2" />
                  <stop offset="30%" stopColor="#67BAF4" stopOpacity="0.9" />
                  <stop offset="70%" stopColor="#1E46EB" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#67BAF4" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Static Guide Track */}
              <line x1="125" y1="20" x2="875" y2="20" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" className="text-[#E2E8F0] dark:text-[#232734]" />

              {/* Active Animated Pipeline Conduit */}
              <line
                x1="125"
                y1="20"
                x2="875"
                y2="20"
                stroke="url(#stepper-pipe-glow)"
                strokeWidth="2"
                strokeDasharray="6 12"
                className="animate-pipeline-dash"
              />

              {/* Traveling Signal Packets (Halts under prefers-reduced-motion) */}
              <g className="motion-reduce:hidden">
                <circle r="4" fill="#67BAF4" opacity="0.95">
                  <animateMotion path="M125 20 L875 20" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle r="3" fill="#1E46EB" opacity="0.95">
                  <animateMotion path="M125 20 L875 20" dur="4s" begin="2s" repeatCount="indefinite" />
                </circle>
              </g>

              {/* Milestone Anchors with Concentric Radar Pings */}
              {[125, 375, 625, 875].map((x, i) => (
                <g key={i}>
                  <circle cx={x} cy="20" r="12" stroke="#67BAF4" strokeWidth="0.8" opacity="0.6" className="motion-reduce:hidden">
                    <animate attributeName="r" values="5;14" dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.8;0" dur="2.4s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                  </circle>
                  <circle cx={x} cy="20" r="5" fill="#1E46EB" stroke="#67BAF4" strokeWidth="1.5" />
                </g>
              ))}
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: '01',
                step: 'Discovery',
                desc: 'Requirements analysis, stakeholder interviews, technical feasibility evaluation.',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                )
              },
              {
                num: '02',
                step: 'Architecture',
                desc: 'System design, database schemas, tech stack selection, architecture documentation.',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                  </svg>
                )
              },
              {
                num: '03',
                step: 'Development',
                desc: 'Agile sprints, test-driven implementations, milestone delivery, and weekly reviews.',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
                  </svg>
                )
              },
              {
                num: '04',
                step: 'Launch & Support',
                desc: 'Staged deployment, automated QA, post-launch maintenance and continuous roadmap.',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                )
              },
            ].map((step, idx) => (
              <RevealOnScroll key={idx} delayMs={idx * 100} direction="up">
                <div 
                  className="relative p-7 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] hover:-translate-y-1 transition-all duration-200 shadow-sm h-full"
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-black text-[#1E46EB] dark:text-[#67BAF4]">
                      {step.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1E46EB] dark:text-[#67BAF4]">
                      {step.icon}
                    </div>
                  </div>
                  <h4 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                    {step.step}
                  </h4>
                  <p className="mt-2 text-xs text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>

        </div>
      </section>

      {/* Shared CTA Banner */}
      <CtaBanner />
    </div>
  );
}
