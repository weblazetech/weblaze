import React from 'react';
import CtaBanner from '../components/CtaBanner';

export default function PrivacyPolicyPage(): React.JSX.Element {
  return (
    <div className="animate-fade-in-up">
      {/* ─── PAGE HERO ─── */}
      <section className="relative pt-20 pb-16 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#232734]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-4">
            Legal &amp; Compliance
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display max-w-3xl leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm sm:text-base text-[#525866] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
            Effective Date: January 1, 2025 &bull; Last Updated: January 2025
          </p>
        </div>
      </section>

      {/* ─── POLICY CONTENT ─── */}
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
              1. Overview &amp; Commitment
            </h2>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              At Weblaze Technologies India Private Limited ("Weblaze", "we", "us", or "our"), we respect your privacy and are committed to protecting the personal data of our website visitors, clients, partners, and enterprise software users. This Privacy Policy outlines our practices regarding data collection, use, processing, and disclosure in compliance with India's Digital Personal Data Protection (DPDP) Act and applicable international standards.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              2. Information We Collect
            </h2>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              We collect information only when reasonably necessary to provide our software development services, respond to project inquiries, process internship applications, or communicate with stakeholders:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-sm text-[#525866] dark:text-[#94A3B8]">
              <li><strong>Contact Information:</strong> Name, professional email address, phone number, and organization name submitted via contact or inquiry forms.</li>
              <li><strong>Project &amp; Technical Requirements:</strong> Scope documents, specifications, or details shared to evaluate architectural feasibility or receive project estimates.</li>
              <li><strong>Usage &amp; Device Information:</strong> Standard server logs, IP addresses, browser types, operating systems, and anonymous telemetry collected via analytical cookies to monitor uptime and site performance.</li>
              <li><strong>Recruitment &amp; Internship Data:</strong> Resumes, educational credentials, portfolios, and contact details provided when applying for employment or training programs.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              3. Purpose &amp; Legal Basis of Processing
            </h2>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              We process personal information under the following legitimate grounds:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922]">
                <h4 className="text-sm font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1 font-display">Service Delivery</h4>
                <p className="text-xs text-[#525866] dark:text-[#94A3B8]">Delivering custom software, SaaS platforms, ERP systems, and cloud infrastructure as contracted.</p>
              </div>
              <div className="p-5 rounded-xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922]">
                <h4 className="text-sm font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1 font-display">Communication</h4>
                <p className="text-xs text-[#525866] dark:text-[#94A3B8]">Responding directly to client inquiries, demonstration requests, and customer support tickets.</p>
              </div>
              <div className="p-5 rounded-xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922]">
                <h4 className="text-sm font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1 font-display">Security &amp; Integrity</h4>
                <p className="text-xs text-[#525866] dark:text-[#94A3B8]">Safeguarding systems against unauthorized access, DDoS attacks, and fraudulent activities.</p>
              </div>
              <div className="p-5 rounded-xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922]">
                <h4 className="text-sm font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1 font-display">Legal Compliance</h4>
                <p className="text-xs text-[#525866] dark:text-[#94A3B8]">Complying with statutory corporate, tax, and cyber regulations under Indian law.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              4. Data Retention &amp; Security Standards
            </h2>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              We employ industry-standard administrative, technical, and physical safeguards. Client project source code, database credentials, and personal communications are encrypted both in transit (TLS 1.3) and at rest (AES-256). We never sell, monetize, or rent personal data to third parties.
            </p>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              We retain personal data only for as long as necessary to fulfill the operational purposes for which it was gathered, or to satisfy legal, accounting, and audit requirements.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              5. Your Rights as a Data Principal
            </h2>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              Under applicable data protection laws, you have the right to request access to the personal data we hold about you, request corrections or updates, request erasure of your data, or withdraw consent for non-essential communications.
            </p>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              To exercise any of these rights, please contact our Data Governance Officer at <a href="mailto:contact@weblaze.in" className="text-[#1E46EB] dark:text-[#67BAF4] font-semibold hover:underline">contact@weblaze.in</a>.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              6. Contact &amp; Grievances
            </h2>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              If you have any questions or concerns regarding our privacy practices, please contact:
            </p>
            <div className="p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] space-y-1 text-sm">
              <p className="font-bold text-[#0D0D0D] dark:text-[#FAFAFA]">Privacy &amp; Compliance Officer</p>
              <p className="text-[#525866] dark:text-[#94A3B8]">Weblaze Technologies India Private Limited</p>
              <p className="text-[#525866] dark:text-[#94A3B8]">Email: <a href="mailto:contact@weblaze.in" className="text-[#1E46EB] dark:text-[#67BAF4] font-semibold">contact@weblaze.in</a></p>
              <p className="text-[#525866] dark:text-[#94A3B8]">Phone: +91 8465067156 &bull; +91 9581745402</p>
            </div>
          </div>

        </div>
      </section>

      {/* Shared CTA Banner */}
      <CtaBanner 
        title="Have questions about security or compliance?"
        desc="Our technical architects are happy to review our data protection standards and hosting infrastructure with your team."
        tag="Security First"
      />
    </div>
  );
}
