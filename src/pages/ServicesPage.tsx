import React, { useState, useEffect } from 'react';
import CtaBanner from '../components/CtaBanner';
import SpotlightCard from '../components/SpotlightCard';
import RevealOnScroll from '../components/RevealOnScroll';

export default function ServicesPage(): React.JSX.Element {
  const [activeSection, setActiveSection] = useState<string>('custom-software');

  const subNavItems = [
    { id: 'custom-software', label: 'Custom Software' },
    { id: 'web-apps', label: 'Web Development' },
    { id: 'mobile-apps', label: 'Mobile Apps' },
    { id: 'ai-ml', label: 'AI & ML' },
    { id: 'cloud-devops', label: 'Cloud & DevOps' },
    { id: 'digital', label: 'Digital Transformation' },
  ];

  // Active section scrollspy
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0,
      }
    );

    subNavItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="animate-fade-in-up">
      {/* ─── PAGE HERO ─── */}
      <section className="relative pt-20 pb-16 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#232734]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-4 animate-badge-sheen">
            What We Build
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display max-w-3xl leading-tight">
            Full-spectrum technology<br />
            services for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E46EB] via-[#67BAF4] to-[#1E46EB] animate-text-shimmer">
              growing businesses.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-xl text-[#525866] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
            From greenfield product development to legacy modernisation — we deliver across every layer of the technology stack, with a single focus: measurable business outcomes for our clients.
          </p>
        </div>
      </section>

      {/* ─── STICKY SCROLLSPY SUB-NAV BAR ─── */}
      <div className="sticky top-[72px] sm:top-[80px] z-40 bg-white/95 dark:bg-[#12141B]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#232734] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-3 text-xs font-semibold scrollbar-none">
          {subNavItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-3.5 py-1.5 rounded-xl whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#1E46EB] text-white shadow-md shadow-[#1E46EB]/30 font-bold'
                    : 'text-[#525866] dark:text-[#94A3B8] hover:text-[#1E46EB] dark:hover:text-[#67BAF4] hover:bg-slate-100 dark:hover:bg-[#1F232F]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>

      {/* ─── 1. CUSTOM SOFTWARE ─── */}
      <section id="custom-software" className="py-20 bg-white dark:bg-[#12141B] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              <div className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4]">
                  Custom Software Development
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                  Software built precisely for how your business works.
                </h2>
                <p className="text-base text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                  Off-the-shelf software is designed for the average business. Your business is not average. We design and build custom software platforms, internal tools, and business systems that match your exact processes — not the other way around.
                </p>
                <p className="text-base text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                  Our engagement model starts with deep business analysis. We understand your workflows, pain points, and growth trajectory before writing a line of code. The result is software that fits, performs, and scales.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {[
                    'Requirements architecture & technical specification',
                    'Agile development with weekly client reviews',
                    'API-first design for future integrations',
                    'Comprehensive testing: unit, integration, UAT',
                    'Documentation and knowledge transfer',
                    'Post-launch AMC and enhancement support',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#0D0D0D] dark:text-[#FAFAFA]">
                      <span className="text-[#1E46EB] dark:text-[#67BAF4]">✓</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 space-y-4">
                <div className="p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922]">
                  <h4 className="text-sm font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-2 font-display">Business Outcome</h4>
                  <p className="text-xs text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                    Software that reflects your competitive advantage, rather than limiting you to what a generic tool supports. Faster operations, lower error rates, and clear audit trails.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922]">
                  <h4 className="text-sm font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-2 font-display">Typical Engagement</h4>
                  <p className="text-xs text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                    3–18 month delivery cycles depending on scope. Fixed-scope or retainer-based. Milestone billing available. Post-launch SLA included.
                  </p>
                </div>

                <div className="p-6 rounded-2xl border border-[#1E46EB]/30 bg-[#0D0D0D] text-white">
                  <h4 className="text-sm font-bold text-[#67BAF4] mb-2 font-display">Technology Stack</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-mono">
                    PHP 8, Python, Node.js, React, Vue, MySQL, PostgreSQL, MongoDB, Redis, Docker, AWS, Azure
                  </p>
                </div>
              </div>

            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── 2. WEB DEVELOPMENT ─── */}
      <section id="web-apps" className="py-20 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-t border-[#E2E8F0] dark:border-[#232734] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4]">
              Web Development
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mt-2">
              High-performance web platforms
            </h2>
            <p className="mt-3 text-base text-[#525866] dark:text-[#94A3B8]">
              Corporate portals, e-commerce infrastructure, customer-facing web applications, and content platforms — built for speed, accessibility, and conversion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Corporate Websites & Portals',
                desc: 'Professional, SEO-optimised corporate sites and client portals with CMS integration, multi-language support, and role-based access control.',
                checks: ['Responsive, accessible design (WCAG 2.1 AA)', 'Core Web Vitals optimisation', 'Custom PHP & Headless CMS', 'SSL, security hardening, CDN setup']
              },
              {
                title: 'E-Commerce Platforms',
                desc: 'Multi-vendor marketplaces, B2B ordering portals, and D2C e-commerce platforms with custom checkout flows, inventory management, and payment gateway integration.',
                checks: ['Razorpay, PayU, Stripe, Paytm integration', 'Inventory & real-time order tracking', 'Seller/vendor management panels', 'Sales & cohort analytics dashboards']
              },
              {
                title: 'Web Applications & SaaS',
                desc: 'Complex, interactive web applications with real-time capabilities, multi-tenant SaaS architecture, and enterprise-grade authentication.',
                checks: ['Single Page Apps (React, Vite, Next)', 'REST and GraphQL APIs', 'Real-time features via WebSockets', 'Multi-tenant SaaS architecture']
              },
              {
                title: 'Progressive Web Apps (PWA)',
                desc: 'Offline-capable, installable web applications that deliver near-native mobile experiences without app store dependencies.',
                checks: ['Service worker & offline sync', 'Push notification support', 'App-like responsive touch UX', 'Lighthouse 95+ performance scores']
              },
            ].map((card, idx) => (
              <SpotlightCard 
                key={idx}
                className="p-8 rounded-2xl shadow-sm hover:border-[#1E46EB]/40 transition-all duration-200"
              >
                <h3 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-3">
                  {card.title}
                </h3>
                <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed mb-6">
                  {card.desc}
                </p>
                <div className="space-y-2 pt-4 border-t border-[#E2E8F0] dark:border-[#232734]">
                  {card.checks.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#0D0D0D] dark:text-[#FAFAFA]">
                      <span className="text-[#1E46EB] dark:text-[#67BAF4] font-bold">✓</span>
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. MOBILE APPS & AI SOLUTIONS ─── */}
      <section id="mobile-apps" className="py-20 bg-white dark:bg-[#12141B] border-t border-[#E2E8F0] dark:border-[#232734] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealOnScroll direction="up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              
              <div className="p-8 sm:p-10 rounded-3xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4] mb-2 block">
                  Mobile Apps
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-4">
                  Native &amp; Cross-Platform Mobile Engineering
                </h3>
                <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed mb-6">
                  From consumer mobile products to internal enterprise workforce apps, we design iOS and Android applications focused on high FPS performance, intuitive gestures, and offline persistence.
                </p>
                <div className="space-y-2.5 text-xs font-semibold text-[#0D0D0D] dark:text-[#FAFAFA]">
                  <div className="flex items-center gap-2"><span className="text-[#1E46EB] dark:text-[#67BAF4]">✓</span> React Native &amp; Flutter cross-platform velocity</div>
                  <div className="flex items-center gap-2"><span className="text-[#1E46EB] dark:text-[#67BAF4]">✓</span> Native iOS (Swift) &amp; Android (Kotlin) development</div>
                  <div className="flex items-center gap-2"><span className="text-[#1E46EB] dark:text-[#67BAF4]">✓</span> Secure biometrics (FaceID/TouchID) integration</div>
                  <div className="flex items-center gap-2"><span className="text-[#1E46EB] dark:text-[#67BAF4]">✓</span> Apple App Store &amp; Google Play Store compliance</div>
                </div>
              </div>

              <div id="ai-ml" className="p-8 sm:p-10 rounded-3xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4] mb-2 block">
                  AI &amp; ML Solutions
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-4">
                  Automated Intelligence for Real Workflows
                </h3>
                <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed mb-6">
                  We integrate practical AI that cuts overhead: conversational support bots, automated PDF/invoice parsing, and intelligent recommendation pipelines connected straight into your operational database.
                </p>
                <div className="space-y-2.5 text-xs font-semibold text-[#0D0D0D] dark:text-[#FAFAFA]">
                  <div className="flex items-center gap-2"><span className="text-[#1E46EB] dark:text-[#67BAF4]">✓</span> Conversational AI &amp; custom LLM workflow agents</div>
                  <div className="flex items-center gap-2"><span className="text-[#1E46EB] dark:text-[#67BAF4]">✓</span> Intelligent document OCR &amp; invoice parsing</div>
                  <div className="flex items-center gap-2"><span className="text-[#1E46EB] dark:text-[#67BAF4]">✓</span> Predictive models for inventory and student drop-off</div>
                  <div className="flex items-center gap-2"><span className="text-[#1E46EB] dark:text-[#67BAF4]">✓</span> Privacy-preserving local models &amp; API guards</div>
                </div>
              </div>

            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* ─── 4. CLOUD & DIGITAL TRANSFORMATION ─── */}
      <section id="cloud-devops" className="py-20 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-t border-[#E2E8F0] dark:border-[#232734] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-white dark:bg-[#161922]">
              <h4 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-3">Cloud Infrastructure &amp; DevOps</h4>
              <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed mb-4">
                Setup, containerization, and management across AWS, Azure, and Google Cloud with automated CI/CD pipelines, autoscaling groups, and continuous uptime monitoring.
              </p>
              <span className="text-xs font-bold text-[#1E46EB] dark:text-[#67BAF4]">Docker • Kubernetes • Terraform • AWS • GitHub Actions</span>
            </div>

            <div id="digital" className="p-8 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-white dark:bg-[#161922]">
              <h4 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-3">Digital Transformation &amp; Modernization</h4>
              <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed mb-4">
                Migrate legacy monolithic systems into responsive, cloud-native microservices with zero operational downtime and robust data integrity verification.
              </p>
              <span className="text-xs font-bold text-[#1E46EB] dark:text-[#67BAF4]">Architecture Review • Database Migration • API Gateway</span>
            </div>
          </div>
        </div>
      </section>

      {/* Shared CTA Banner */}
      <CtaBanner 
        title="Have a technical project in mind?" 
        desc="Let's review your system requirements and map out an execution architecture."
      />
    </div>
  );
}
