import React from 'react';
import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';
import SpotlightCard from '../components/SpotlightCard';

export default function SolutionsPage(): React.JSX.Element {
  return (
    <div className="animate-fade-in-up">
      {/* ─── PAGE HERO ─── */}
      <section className="relative pt-20 pb-16 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#232734]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-4">
            What We've Built
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display max-w-3xl leading-tight">
            Purpose-built platforms<br />for critical operations.
          </h1>
          <p className="mt-6 text-base sm:text-xl text-[#525866] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
            Our solutions are not generic templates. Each one is designed around a specific operational problem — built to be practical, reliable, and ready to grow with your business.
          </p>
        </div>
      </section>

      {/* ─── 1. SCHOOL ERP SYSTEM ─── */}
      <section id="school-erp" className="py-20 bg-white dark:bg-[#12141B] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4]">
                Flagship Platform
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                Complete school management, unified in one platform.
              </h2>
              <p className="text-base text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                Managing a school involves dozens of interdependent processes — admissions, academics, staff, finance, transport, communication. Our School ERP platform brings all of them into a single, coherent system, accessible from desktop and mobile.
              </p>
              <p className="text-base text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                Designed for institutions of all sizes — from single-branch academies to multi-campus institutions. Configurable for CBSE, ICSE, and state board curricula with clean implementation, teacher training, and dedicated support.
              </p>

              {/* Modules Grid */}
              <div className="pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#0D0D0D] dark:text-[#FAFAFA] mb-3">
                  Integrated ERP Modules
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    'Admissions & Enquiry Pipeline',
                    'Student Information System (SIS)',
                    'Smart Attendance & Automated Timetable',
                    'Examination Grading & Report Cards',
                    'Fee Management & Digital Receipts',
                    'Staff & HR Payroll Management',
                    'Library & Asset Cataloging',
                    'Transport Route GPS Tracking',
                    'Parent Communication WhatsApp Portal',
                    'Custom Branded Mobile App (iOS & Android)',
                  ].map((mod, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#FAFAFA] dark:bg-[#161922] border border-[#E2E8F0] dark:border-[#232734] text-xs font-semibold text-[#0D0D0D] dark:text-[#FAFAFA]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1E46EB] dark:bg-[#67BAF4]" />
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Impact Metric Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] shadow-sm">
                <h4 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-6">
                  Proven Institutional Impact
                </h4>
                
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-[#E2E8F0] dark:border-[#232734]">
                    <span className="text-[#525866] dark:text-[#94A3B8]">Fee collection efficiency</span>
                    <strong className="text-[#1E46EB] dark:text-[#67BAF4] font-bold">+40% Faster</strong>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#E2E8F0] dark:border-[#232734]">
                    <span className="text-[#525866] dark:text-[#94A3B8]">Admin paper workload</span>
                    <strong className="text-[#1E46EB] dark:text-[#67BAF4] font-bold">Reduced by 65%</strong>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#E2E8F0] dark:border-[#232734]">
                    <span className="text-[#525866] dark:text-[#94A3B8]">Parent engagement rate</span>
                    <strong className="text-[#1E46EB] dark:text-[#67BAF4] font-bold">98% High</strong>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#525866] dark:text-[#94A3B8]">System uptime guarantee</span>
                    <strong className="text-[#1E46EB] dark:text-[#67BAF4] font-bold">99.9% Cloud SLA</strong>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    to="/contact"
                    viewTransition
                    className="group w-full inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] active:scale-[0.97] transition-all duration-200 shadow-md shadow-[#1E46EB]/25"
                  >
                    <span>Schedule an ERP Demonstration</span>
                    <span className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 shrink-0">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── 2. BUSINESS AUTOMATION ─── */}
      <section id="automation" className="py-20 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-t border-[#E2E8F0] dark:border-[#232734] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4]">
              Workflow Automation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mt-2">
              Eliminate manual work. Accelerate decisions.
            </h2>
            <p className="mt-3 text-base text-[#525866] dark:text-[#94A3B8]">
              Business automation is not about replacing people — it is about removing the friction that prevents people from doing high-value work: approvals, reporting, data entry, and routine communications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: 'Approval Workflow Automation',
                desc: 'Configure multi-level approval chains for procurement, HR, finance, and operations — with mobile push notifications, escalation rules, and full audit logs.',
                checks: ['Configurable approval hierarchies', 'Instant email & WhatsApp alerts', 'SLA breach tracking & auto-escalation', 'Immutable audit logs for compliance']
              },
              {
                title: 'Document & Report Automation',
                desc: 'Auto-generate invoices, purchase orders, compliance certificates, and executive dashboards on schedule or event-triggered.',
                checks: ['Scheduled and event-triggered generation', 'Automated PDF, Excel, and CSV distribution', 'Multi-database aggregation', 'Brand-consistent styled templates']
              },
              {
                title: 'CRM & Sales Pipeline Automation',
                desc: 'Lead capture, automated nurturing sequences, WhatsApp follow-up reminders, pipeline tracking, and sales analytics.',
                checks: ['Intelligent lead scoring & routing', 'Automated multi-channel follow-up sequences', 'WhatsApp API integration', 'Real-time sales velocity dashboards']
              },
              {
                title: 'Inventory & Supply Chain Automation',
                desc: 'Automated reorder triggers, supplier communication, GRN processing, and stock reconciliation for multi-location warehouses.',
                checks: ['Real-time multi-warehouse stock monitoring', 'Automated PO generation on threshold breach', 'Barcode and QR code handheld scanning', 'Vendor fulfillment tracking']
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

      {/* ─── 3. ENTERPRISE PLATFORMS & SAAS ─── */}
      <section id="enterprise" className="py-20 bg-white dark:bg-[#12141B] border-t border-[#E2E8F0] dark:border-[#232734] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div id="saas" className="p-8 sm:p-12 rounded-3xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4] mb-2 block">
                Custom SaaS &amp; Enterprise Platforms
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                Need a bespoke platform built from scratch?
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                We engineer scalable, secure multi-tenant architectures, complete with subscription billing, enterprise role-based access control (RBAC), and robust RESTful APIs.
              </p>
            </div>
            <Link
              to="/contact"
              viewTransition
              className="group shrink-0 inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] active:scale-[0.97] transition-all duration-200 shadow-md shadow-[#1E46EB]/20"
            >
              <span>Consult an Architect</span>
              <span className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center transition-transform duration-200 group-hover:translate-x-1 shrink-0">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Shared CTA Banner */}
      <CtaBanner 
        title="Ready to transform your operations?" 
        desc="Let's build a solution tailored precisely around your organizational workflows."
      />
    </div>
  );
}
