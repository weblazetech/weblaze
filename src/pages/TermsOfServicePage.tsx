import React from 'react';
import CtaBanner from '../components/CtaBanner';

export default function TermsOfServicePage(): React.JSX.Element {
  return (
    <div className="animate-fade-in-up">
      {/* ─── PAGE HERO ─── */}
      <section className="relative pt-20 pb-16 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#232734]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-4">
            Legal &amp; Compliance
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display max-w-3xl leading-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#525866] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
            Effective Date: January 1, 2025 &bull; Last Updated: January 2025
          </p>
        </div>
      </section>

      {/* ─── TERMS CONTENT ─── */}
      <section className="py-20 bg-white dark:bg-[#12141B] transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] text-xs text-[#525866] dark:text-[#94A3B8] space-y-2">
            <p className="font-bold text-sm text-[#0D0D0D] dark:text-[#FAFAFA]">Entity Identification</p>
            <p><strong>Company:</strong> Weblaze Technologies India Private Limited</p>
            <p><strong>CIN:</strong> U62099TS2024PTC189987</p>
            <p><strong>Registered Office:</strong> #2-5-257/S1, 301, 3rd Floor, Nakkalagutta, Hanamkonda, Telangana – 506001, India</p>
            <p><strong>Corporate Office:</strong> #1-111-1/B-185, 100 Ground Floor, Raghavendra Colony, Kondapur, Hyderabad – 500084, Telangana, India</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              1. Acceptance of Terms
            </h2>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              These Terms of Service ("Terms") govern your access to and use of websites, digital portals, software platforms, and professional engineering services provided by Weblaze Technologies India Private Limited ("Weblaze", "we", "our"). By visiting our website or entering into a Statement of Work (SOW), you agree to be bound by these Terms.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              2. Scope of Services &amp; Engagements
            </h2>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              Weblaze provides professional technology services including custom software engineering, web application development, mobile application design, ERP solutions, artificial intelligence pipeline integration, and cloud DevOps architecture. Specific project milestones, deliverables, pricing, and timelines are detailed in individual Statements of Work executed between Weblaze and each client.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              3. Intellectual Property Rights
            </h2>
            <div className="space-y-3 text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              <p>
                <strong>Client Deliverables:</strong> Upon receipt of full and final milestone payments, the client owns all bespoke application code, designs, and business logic created specifically under the relevant Statement of Work.
              </p>
              <p>
                <strong>Pre-Existing Frameworks &amp; Tooling:</strong> Weblaze retains all rights, title, and interest in pre-existing reusable code libraries, utilities, algorithms, and development frameworks. Clients are granted a non-exclusive, perpetual, worldwide license to utilize such components as embedded within the delivered software.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              4. Payment Terms &amp; Invoicing
            </h2>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              Fees for custom software projects and consulting are invoiced on agreed milestones, sprint cadences, or monthly retainers as specified in the applicable contract. Unless otherwise indicated in writing, invoices are due within fifteen (15) calendar days from issuance. Payments must be remitted via valid electronic bank transfer or approved enterprise payment gateways.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              5. Confidentiality &amp; Non-Disclosure
            </h2>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              Both parties agree to treat all business plans, database schemas, trade secrets, proprietary algorithms, and non-public communications as strictly confidential. Confidential information will not be disclosed to any third party without prior written consent, except where required by lawful judicial or regulatory authorities.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              6. Warranties &amp; Service Level Agreements (SLAs)
            </h2>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              Weblaze warrants that all delivered software will substantially conform to the agreed written technical specifications during the contracted acceptance testing or warranty period (typically 30–90 days post-deployment). Ongoing maintenance, uptime guarantees, and incident resolution SLAs are governed under our Annual Maintenance Contracts (AMC).
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              7. Limitation of Liability &amp; Governing Law
            </h2>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              To the maximum extent permitted by law, Weblaze shall not be liable for any indirect, incidental, punitive, or consequential damages arising from system downtime, data loss, or business interruption. Our cumulative aggregate liability shall not exceed the total fees paid by the client under the specific Statement of Work giving rise to the claim.
            </p>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in Hyderabad, Telangana, India.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              8. Contact Information
            </h2>
            <div className="p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] space-y-1 text-sm">
              <p className="font-bold text-[#0D0D0D] dark:text-[#FAFAFA]">Legal &amp; Commercial Contracts Desk</p>
              <p className="text-[#525866] dark:text-[#94A3B8]">Weblaze Technologies India Private Limited</p>
              <p className="text-[#525866] dark:text-[#94A3B8]">Email: <a href="mailto:contact@weblaze.in" className="text-[#1E46EB] dark:text-[#67BAF4] font-semibold">contact@weblaze.in</a></p>
              <p className="text-[#525866] dark:text-[#94A3B8]">Phone: +91 8465067156 &bull; +91 9581745402</p>
            </div>
          </div>

        </div>
      </section>

      {/* Shared CTA Banner */}
      <CtaBanner 
        title="Ready to begin your engineering engagement?"
        desc="Connect with our technical leadership to scope your project and prepare a tailored Statement of Work."
        tag="Enterprise Agility"
      />
    </div>
  );
}
