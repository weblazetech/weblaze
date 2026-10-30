import React from 'react';
import CtaBanner from '../components/CtaBanner';
import AnimatedCounter from '../components/AnimatedCounter';
import RevealOnScroll from '../components/RevealOnScroll';
import TiltCard from '../components/TiltCard';

export default function AboutPage(): React.JSX.Element {
  return (
    <div className="animate-fade-in-up">
      {/* ─── PAGE HERO ─── */}
      <section id="overview" className="relative pt-20 pb-16 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#232734]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-4 animate-badge-sheen">
            Who We Are
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display max-w-3xl leading-tight">
            Built in India.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E46EB] via-[#67BAF4] to-[#1E46EB] animate-text-shimmer">
              Focused on execution.
            </span>
          </h1>
          <p className="mt-6 text-base sm:text-xl text-[#525866] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
            Weblaze Technologies is a technology company headquartered in Hyderabad. We design, build, and deploy custom software solutions for businesses that need reliable, scalable technology — delivered on time.
          </p>
        </div>
      </section>

      {/* ─── FOUNDATION & METRICS ─── */}
      <section id="why-us" className="py-20 bg-white dark:bg-[#12141B] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4]">
                Our Foundation
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                A company built on engineering discipline.
              </h2>
              <p className="text-base text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                Founded in 2024, Weblaze Technologies India Private Limited was incorporated with the conviction that businesses across India deserve better, purpose-built software — not generic, off-the-shelf tools that never quite fit.
              </p>
              <p className="text-base text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                Though we are an early-stage company, our founding team brings strong technical capabilities across web development, mobile applications, AI/ML, and cloud infrastructure. We've already delivered multiple projects across education, healthcare, and business automation.
              </p>
              <p className="text-base text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                We operate with a product-engineering mindset — bringing the same rigour to every client engagement that a product team brings to its own platform.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] shadow-sm">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#0D0D0D] border border-[#E2E8F0] dark:border-[#232734]">
                    <strong className="block text-3xl sm:text-4xl font-black text-[#1E46EB] dark:text-[#67BAF4] font-display">
                      <AnimatedCounter value="10+" />
                    </strong>
                    <span className="text-xs text-[#525866] dark:text-[#94A3B8] font-medium mt-1 block">Projects Delivered</span>
                  </div>
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#0D0D0D] border border-[#E2E8F0] dark:border-[#232734]">
                    <strong className="block text-3xl sm:text-4xl font-black text-[#1E46EB] dark:text-[#67BAF4] font-display">
                      <AnimatedCounter value="1+" />
                    </strong>
                    <span className="text-xs text-[#525866] dark:text-[#94A3B8] font-medium mt-1 block">Year of Operation</span>
                  </div>
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#0D0D0D] border border-[#E2E8F0] dark:border-[#232734]">
                    <strong className="block text-3xl sm:text-4xl font-black text-[#1E46EB] dark:text-[#67BAF4] font-display">
                      <AnimatedCounter value="5+" />
                    </strong>
                    <span className="text-xs text-[#525866] dark:text-[#94A3B8] font-medium mt-1 block">Active Clients</span>
                  </div>
                  <div className="p-6 rounded-2xl bg-white dark:bg-[#0D0D0D] border border-[#E2E8F0] dark:border-[#232734]">
                    <strong className="block text-3xl sm:text-4xl font-black text-[#1E46EB] dark:text-[#67BAF4] font-display">
                      <AnimatedCounter value="90%+" />
                    </strong>
                    <span className="text-xs text-[#525866] dark:text-[#94A3B8] font-medium mt-1 block">Client Retention</span>
                  </div>
                </div>
                <p className="mt-5 text-xs text-center text-[#525866] dark:text-[#94A3B8]">
                  Figures as of 2025. We're just getting started.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── MISSION & VISION DUAL CARDS ─── */}
      <section className="py-20 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-y border-[#E2E8F0] dark:border-[#232734] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="p-10 rounded-3xl border border-[#E2E8F0] dark:border-[#232734] bg-white dark:bg-[#161922] shadow-sm">
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] mb-4">
                Mission
              </span>
              <h3 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-4">
                To deliver technology that creates measurable business outcomes.
              </h3>
              <p className="text-sm sm:text-base text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                We help organisations leverage software as a strategic asset — not a cost centre. Every engagement we take on is driven by a clear question: what does this technology need to do for your business? We engineer to that answer, and we measure ourselves against real-world results.
              </p>
            </div>

            <div className="p-10 rounded-3xl border border-[#1E46EB]/30 bg-gradient-to-br from-[#161922] to-[#0D0D0D] text-white shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#1E46EB]/20 blur-3xl rounded-full pointer-events-none" />
              <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-white/10 text-[#67BAF4] border border-white/15 mb-4">
                Vision
              </span>
              <h3 className="text-2xl font-bold text-white font-display mb-4">
                To become a trusted technology partner for growing Indian businesses.
              </h3>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                We envision a future where every growing business in India has access to well-architected, custom technology — without the enterprise price tag. Technology that scales as you do.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── LEADERSHIP TEAM ─── */}
      <section id="leadership" className="py-20 bg-white dark:bg-[#12141B] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-3">
              Leadership
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              The team behind Weblaze
            </h2>
            <p className="mt-3 text-base text-[#525866] dark:text-[#94A3B8]">
              Our founding team combines strong technical capabilities with a hands-on approach to every project we deliver.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto md:items-center">
            
            {/* 1. Deshmukh Tanvi — Head of Design & Branding (Left Flank) */}
            <RevealOnScroll delayMs={0} direction="up" className="order-2 md:order-1">
              <TiltCard className="rounded-3xl h-full" maxTilt={5}>
                <div className="p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] text-center shadow-sm hover:border-[#1E46EB]/40 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#1E46EB]/90 to-[#67BAF4] text-white flex items-center justify-center text-xl font-extrabold mx-auto mb-5 shadow-md shadow-[#1E46EB]/20">
                      DT
                    </div>
                    <h4 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                      Deshmukh Tanvi
                    </h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#1E46EB] dark:text-[#67BAF4] mt-1 mb-4">
                      Head of Design &amp; Branding
                    </p>
                    <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                      Drives end-to-end visual design systems, brand identity, user experience (UX) architecture, and high-conversion editorial interfaces for all digital touchpoints.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>

            {/* 2. Srishanth — Founder & Director (Center Stage / Hierarchical Hero) */}
            <RevealOnScroll delayMs={100} direction="up" className="order-1 md:order-2 z-10">
              <TiltCard className="rounded-3xl h-full md:-translate-y-2 lg:-translate-y-3" maxTilt={6}>
                <div className="p-9 sm:p-10 rounded-3xl border-2 border-[#1E46EB]/40 dark:border-[#67BAF4]/40 bg-white dark:bg-[#181D28] text-center shadow-xl shadow-[#1E46EB]/10 dark:shadow-[#1E46EB]/20 relative overflow-hidden flex flex-col justify-between hover:border-[#1E46EB] dark:hover:border-[#67BAF4] transition-all">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#1E46EB]/15 dark:bg-[#67BAF4]/15 blur-2xl rounded-full pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#1E46EB] to-[#228BE6] text-white flex items-center justify-center text-2xl font-extrabold mx-auto mb-6 shadow-lg shadow-[#1E46EB]/30 ring-4 ring-[#1E46EB]/15 dark:ring-[#67BAF4]/20">
                      S
                    </div>
                    <h4 className="text-2xl font-black text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                      Srishanth
                    </h4>
                    <div className="inline-block px-3 py-1 rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/15 border border-[#1E46EB]/25 dark:border-[#67BAF4]/25 mt-2 mb-4">
                      <p className="text-xs font-black uppercase tracking-widest text-[#1E46EB] dark:text-[#67BAF4]">
                        Founder &amp; Director
                      </p>
                    </div>
                    <p className="text-sm sm:text-[15px] text-[#525866] dark:text-[#CBD5E1] leading-relaxed">
                      Directs company vision, technical strategy, enterprise architecture, and client partnerships. Leads long-term product direction and digital modernization engagements across all Weblaze initiatives.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>

            {/* 3. Imad Mohammed — Head of DevOps (Right Flank) */}
            <RevealOnScroll delayMs={200} direction="up" className="order-3 md:order-3">
              <TiltCard className="rounded-3xl h-full" maxTilt={5}>
                <div className="p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] text-center shadow-sm hover:border-[#1E46EB]/40 transition-colors h-full flex flex-col justify-between">
                  <div>
                    <div className="w-20 h-20 rounded-full bg-[#161922] dark:bg-[#232734] border border-[#1E46EB]/30 text-[#67BAF4] flex items-center justify-center text-xl font-extrabold mx-auto mb-5 shadow-md">
                      IM
                    </div>
                    <h4 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                      Imad Mohammed
                    </h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-[#1E46EB] dark:text-[#67BAF4] mt-1 mb-4">
                      Head of DevOps
                    </p>
                    <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                      Leads cloud infrastructure, automated CI/CD pipelines, container orchestration, and system reliability across client platforms and mission-critical products.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </RevealOnScroll>

          </div>
        </div>
      </section>

      {/* ─── TIMELINE WITH ILLUMINATED SPINE ─── */}
      <section id="timeline" className="py-20 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-t border-[#E2E8F0] dark:border-[#232734] transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-3 animate-badge-sheen">
              Our Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              Building from day one
            </h2>
          </div>

          <div className="relative pl-6 sm:pl-10 space-y-8">
            {/* Illuminated Vertical Spine */}
            <div className="absolute top-4 bottom-4 left-2 sm:left-4 w-0.5 bg-[#E2E8F0] dark:bg-[#232734]" aria-hidden="true">
              {/* Traveling Pulse Along Spine */}
              <div 
                className="w-full h-24 bg-gradient-to-b from-transparent via-[#1E46EB] dark:via-[#67BAF4] to-transparent animate-glow" 
              />
            </div>

            {[
              {
                year: '2024',
                title: 'Company Incorporated',
                desc: 'Weblaze Technologies India Private Limited incorporated in Telangana (CIN: U62099TS2024PTC189987). Founding team assembled with expertise across web, mobile, and cloud engineering.'
              },
              {
                year: '2024',
                title: 'First Client Projects',
                desc: 'Delivered initial projects including a School ERP system, business automation tools, and custom web platforms. Established core delivery processes and quality standards.'
              },
              {
                year: '2024',
                title: 'AI & Automation Capability',
                desc: 'Launched AI-powered solutions including conversational AI agents, document processing automation, and intelligent workflow systems for early clients.'
              },
              {
                year: '2025',
                title: 'Expanding Capabilities',
                desc: 'Growing our client base across education, healthcare, and business sectors. Scaling the team and refining our delivery processes to handle more complex engagements.'
              },
            ].map((milestone, idx) => (
              <RevealOnScroll key={idx} delayMs={idx * 80} direction="up">
                <div 
                  className="relative flex flex-col sm:flex-row items-start gap-6 p-7 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-white dark:bg-[#161922] shadow-sm hover:border-[#1E46EB]/40 transition-all duration-200 group hover:-translate-y-0.5"
                >
                  {/* Node Anchor on the Spine */}
                  <div 
                    className="absolute -left-[1.85rem] sm:-left-[2.35rem] top-8 w-4 h-4 rounded-full bg-white dark:bg-[#0D0D0D] border-2 border-[#1E46EB] dark:border-[#67BAF4] flex items-center justify-center shadow-sm"
                    aria-hidden="true"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1E46EB] dark:bg-[#67BAF4] group-hover:scale-125 transition-transform" />
                  </div>

                  <div className="px-4 py-2 rounded-xl bg-[#E7F3FD] dark:bg-[#67BAF4]/15 text-[#1E46EB] dark:text-[#67BAF4] font-mono text-base font-extrabold shrink-0 border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 animate-badge-sheen">
                    {milestone.year}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display group-hover:text-[#1E46EB] dark:group-hover:text-[#67BAF4] transition-colors">
                      {milestone.title}
                    </h4>
                    <p className="mt-2 text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                      {milestone.desc}
                    </p>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Shared CTA Banner */}
      <CtaBanner 
        title="Ready to work with us?" 
        desc="Let's have a direct conversation about your technology requirements — no sales pitch, no obligation."
      />
    </div>
  );
}
