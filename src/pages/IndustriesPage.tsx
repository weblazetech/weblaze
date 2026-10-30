import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';
import { IndustryItem } from '../types';

interface IndustryDeepDive {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  badge: string;
  overview: string;
  coreChallenge: string;
  icon: React.ReactNode;
  modules: {
    title: string;
    description: string;
    features: string[];
  }[];
  compliances: {
    name: string;
    desc: string;
  }[];
  integrations: string[];
  impactStats: {
    metric: string;
    label: string;
  }[];
}

export default function IndustriesPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<string>('education');

  const industriesOverview: IndustryItem[] = [
    {
      title: 'Education & EdTech',
      tag: 'Active Deployments',
      desc: 'Comprehensive school ERPs, learning management platforms, automated fee collection, and digital report card systems for schools and coaching institutes.',
      capabilities: ['Multi-Campus SIS', 'Automated Attendance', 'Fee Gateway Integration', 'Parent Mobile App'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M2 3h20v13H2z"/><path d="M8 21h8M12 16v5"/><path d="M7 8h10M7 11h6"/>
        </svg>
      )
    },
    {
      title: 'Healthcare & Life Sciences',
      tag: 'Compliance-Ready',
      desc: 'Hospital management systems, electronic health records (EHR), outpatient scheduling, diagnostic lab workflows, and patient mobile applications.',
      capabilities: ['HIPAA / DPDP Compliance', 'Telemedicine Consultations', 'Lab Report Automation', 'Doctor Scheduling'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      )
    },
    {
      title: 'Finance, Fintech & BFSI',
      tag: 'Security-First',
      desc: 'Secure customer interfaces, loan application and underwriting workflows, compliance tracking, and executive analytics dashboards with bank-grade encryption.',
      capabilities: ['Automated KYC Verification', 'Multi-Factor Auth (MFA)', 'Loan Lifecycle Management', 'Audit Trail Logging'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h2M10 15h4"/>
        </svg>
      )
    },
    {
      title: 'Retail & E-Commerce',
      tag: 'End-to-End Retail Tech',
      desc: 'High-volume digital storefronts, multi-vendor marketplace engines, inventory synchronization across physical stores and web, and POS integrations.',
      capabilities: ['Omnichannel Sync', 'Real-time Stock Tracking', 'One-Click Checkout', 'Dynamic Pricing Rules'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
        </svg>
      )
    },
    {
      title: 'Manufacturing & Industry 4.0',
      tag: 'IoT-Aware Systems',
      desc: 'Factory floor production scheduling, machine maintenance tracking, raw material supply chain workflows, and quality assurance metrics.',
      capabilities: ['IoT Telemetry Ingestion', 'Batch Tracking & Traceability', 'Downtime Alerting', 'Equipment OEE Metrics'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="2"/>
        </svg>
      )
    },
    {
      title: 'Logistics & Supply Chain',
      tag: 'Real-Time Tracking',
      desc: 'Fleet GPS management, dispatch routing algorithms, automated consignment tracking, and warehouse handheld inventory scanners.',
      capabilities: ['Live Driver GPS Tracking', 'Route Optimization', 'Digital Proof of Delivery', 'Automated Dispatch Notifications'],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      )
    },
  ];

  const industryDeepDives: IndustryDeepDive[] = [
    {
      id: 'education',
      name: 'Education & EdTech',
      shortName: 'Education',
      tagline: 'Scalable Institutional ERPs, Digital Exam Engines & Campus Automation',
      badge: 'Active Deployments',
      overview: 'From multi-campus school chains to university networks and high-growth EdTech platforms, we build robust educational software engineered to handle peak admissions traffic, multi-currency fee processing, and seamless parent-teacher-student collaboration.',
      coreChallenge: 'Institutions suffer from fragmented records across paper spreadsheets, high fee collection dropouts, delayed student progress reporting, and lack of unified campus analytics.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M2 3h20v13H2z"/><path d="M8 21h8M12 16v5"/><path d="M7 8h10M7 11h6"/>
        </svg>
      ),
      modules: [
        {
          title: 'Multi-Campus Student Information System (SIS)',
          description: 'Comprehensive student lifecycle management from online admissions through alumni status.',
          features: ['Centralized student profiles & document vault', 'Biometric & RFID automated attendance', 'Multi-branch timetable conflict resolution', 'Role-based access for faculty, staff, and admin']
        },
        {
          title: 'Automated Fee Collection & Auto-Reconciliation',
          description: 'Automated billing schedules with instant multi-channel payment gateway settlement.',
          features: ['One-click fee payments via WhatsApp, UPI & netbanking', 'Instant digital tax invoice generation', 'Automatic bank reconciliation with zero revenue leakage', 'Customizable installment & scholarship logic']
        },
        {
          title: 'Learning Management System (LMS) & Proctored Exams',
          description: 'Interactive digital learning environment with high-concurrency online examination capacity.',
          features: ['Curriculum authoring with video & SCORM support', 'AI-assisted anti-cheat exam proctoring', 'Automated objective grading & instant report cards', 'Personalized learning analytics for teachers']
        },
        {
          title: 'Parent & Faculty Collaborative Mobile Apps',
          description: 'Native mobile interfaces connecting parents, students, and educators in real time.',
          features: ['Real-time school bus GPS tracking with geofences', 'Daily homework, circulars & instant push alerts', 'Direct encrypted parent-teacher messaging', 'Digital fee receipts and attendance summaries']
        }
      ],
      compliances: [
        { name: 'DPDP Act 2023', desc: 'Strict student PII protection with verifiable parental consent mechanisms' },
        { name: 'NEP 2020 Aligned', desc: 'Holistic progress card formats compliant with current academic frameworks' },
        { name: 'ISO 27001', desc: 'Certified data storage architecture with 256-bit encryption for all academic records' }
      ],
      integrations: ['Razorpay / BillDesk', 'WhatsApp Cloud API', 'AWS S3 & CloudFront CDN', 'Google Classroom API', 'Zoom / WebRTC'],
      impactStats: [
        { metric: '99.4%', label: 'Automated Fee Reconciliation' },
        { metric: '100k+', label: 'Concurrent Exam Submissions' },
        { metric: '60%', label: 'Reduction in Administrative Hours' }
      ]
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Life Sciences',
      shortName: 'Healthcare',
      tagline: 'Compliance-Ready EHRs, Diagnostic Workflows & Telehealth Engines',
      badge: 'Compliance-Ready Architecture',
      overview: 'We architect enterprise hospital management systems, digital health record repositories, diagnostic laboratory pipelines, and patient-centric portals built to withstand rigorous clinical demands with zero data exposure.',
      coreChallenge: 'Healthcare providers lose critical hours to siloed clinical records, delayed diagnostic analyzer interfacing, and complex multi-layered compliance mandates.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
        </svg>
      ),
      modules: [
        {
          title: 'Electronic Health Records (EHR) & Clinical Charting',
          description: 'Standardized digital patient health records with granular role-based doctor access.',
          features: ['HL7 / FHIR compliant patient history interchange', 'Digital prescription builder with drug interaction checks', 'ICD-10 clinical diagnosis cataloging', 'IPD bed management & nursing handover logs']
        },
        {
          title: 'Diagnostic Laboratory Information Management (LIMS)',
          description: 'End-to-end specimen tracking and diagnostic test automation for multi-center labs.',
          features: ['Direct unidirectional / bidirectional analyzer interfacing', 'Automated barcode generation & sample chain-of-custody', 'Critical value threshold alerts for pathologists', 'Automated patient report dispatch via WhatsApp/Email']
        },
        {
          title: 'Telemedicine & Virtual Consultation Engine',
          description: 'Secure, low-latency audio-video consultations with integrated scheduling and billing.',
          features: ['HIPAA-compliant end-to-end encrypted WebRTC video', 'In-session vital logging & clinical whiteboard', 'Automated patient appointment queue management', 'Instant post-consult prescription delivery']
        },
        {
          title: 'Hospital Pharmacy & Insurance TPA Claims',
          description: 'Inventory control for medicines with cashless insurance pre-authorization workflows.',
          features: ['Batch expiry tracking & FIFO automated dispensing', 'Digital TPA insurance claim document bundling', 'Outpatient billing with integrated POS payment', 'Real-time stock reorder alerting for critical drugs']
        }
      ],
      compliances: [
        { name: 'HIPAA & DPDP Ready', desc: 'Field-level encryption for sensitive medical data and granular consent capture' },
        { name: 'HL7 / FHIR Standard', desc: 'Interoperable clinical records format for universal hospital system exchange' },
        { name: 'ABDM Compatible', desc: 'Ayushman Bharat Digital Mission compliant health IDs and registry linkage' }
      ],
      integrations: ['Twilio / WebRTC', 'HL7 Clinical Bridges', 'DICOM Imaging Viewers', 'Cashfree / Razorpay', 'ABDM Health Gateways'],
      impactStats: [
        { metric: '< 2.1s', label: 'Patient Record Retrieval Time' },
        { metric: '100%', label: 'Analyzer Machine Sync Accuracy' },
        { metric: '45%', label: 'Decrease in OPD Waiting Time' }
      ]
    },
    {
      id: 'finance',
      name: 'Finance, Fintech & BFSI',
      shortName: 'Fintech & BFSI',
      tagline: 'Bank-Grade Security, High-Throughput Gateways & Automated Underwriting',
      badge: 'Security-First Approach',
      overview: 'Delivering financial technology software that demands sub-second latency, immutable audit trails, and strict banking regulations. We empower NBFCs, credit lenders, and digital payment platforms with enterprise security.',
      coreChallenge: 'Fintechs face stringent data localization mandates, high applicant dropoff during manual KYC, and operational exposure to fraud in high-velocity digital transactions.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h2M10 15h4"/>
        </svg>
      ),
      modules: [
        {
          title: 'Digital e-KYC & Instant Onboarding Pipeline',
          description: 'Automated verification workflows reducing customer onboarding from days to minutes.',
          features: ['Real-time Aadhaar OTP & DigiLocker document ingestion', 'PAN OCR extraction & verification with instant NSDL check', 'AI face match and liveness detection against fraud', 'Automated AML & sanctions list screening']
        },
        {
          title: 'Loan Origination & Automated Underwriting (LMS)',
          description: 'End-to-end lending engine from loan application to automated disbursement.',
          features: ['Rule-based algorithmic credit scoring model', 'Bank statement parser with Account Aggregator integration', 'Automated e-Sign & digital loan agreement stamping', 'Dynamic repayment amortization schedules with NACH auto-debit']
        },
        {
          title: 'High-Throughput Double-Entry Ledger Engine',
          description: 'Fault-tolerant financial ledger guaranteeing cryptographic consistency across transactions.',
          features: ['Multi-currency double-entry accounting ledger', 'Dual-switch payment gateway routing with automated fallback', 'Sub-second webhook delivery for transaction status', 'Instant dispute resolution & refund automation workflows']
        },
        {
          title: 'Regulatory Audit Trail & Executive Dashboard',
          description: 'Immutable transaction logging built to withstand strict central bank and auditor scrutiny.',
          features: ['Append-only cryptographic event logging', 'Automated regulatory compliance reporting generation', 'Real-time transaction velocity anomaly alerting', 'Granular multi-factor role authorization for operators']
        }
      ],
      compliances: [
        { name: 'RBI Directives', desc: 'Strict domestic data localization, cybersecurity framework, and NACH standards' },
        { name: 'SOC 2 Type II', desc: 'Independently auditable security controls covering privacy, availability, and integrity' },
        { name: 'AES-256 & TLS 1.3', desc: 'Hardware-level encryption for all credentials, tokens, and financial payloads' }
      ],
      integrations: ['Account Aggregator (AA)', 'NPCI / NACH e-Mandate', 'UIDAI / DigiLocker', 'Experian / CIBIL APIs', 'Setu / Cashfree'],
      impactStats: [
        { metric: '< 250ms', label: 'Underwriting API Latency' },
        { metric: '99.99%', label: 'Payment Gateway Uptime' },
        { metric: '70%', label: 'Reduction in Loan Approval TAT' }
      ]
    },
    {
      id: 'retail',
      name: 'Retail & E-Commerce',
      shortName: 'Retail & E-Com',
      tagline: 'High-Volume Headless Commerce, Omnichannel Sync & Unified POS',
      badge: 'End-to-End Retail Tech',
      overview: 'We engineer blistering-fast headless digital storefronts, multi-vendor marketplaces, and centralized omnichannel inventory engines that keep physical retail outlets and web stores synchronized down to the second.',
      coreChallenge: 'Retailers battle inventory discrepancies between physical shelves and online storefronts, cart abandonment from slow checkout pages, and disjointed customer returns.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/>
        </svg>
      ),
      modules: [
        {
          title: 'High-Performance Headless Storefront Architecture',
          description: 'Modern decoupled storefronts optimized for sub-second page loads and mobile conversions.',
          features: ['Edge-cached static and server-rendered product catalog', 'Faceted instant search with typo-tolerance and filters', 'Rich product bundling and personalized upsell recommendations', 'Progressive Web App (PWA) with offline catalog viewing']
        },
        {
          title: 'Real-Time Omnichannel Inventory Synchronization',
          description: 'Single source of truth inventory engine coordinating all sales channels.',
          features: ['Bidirectional sync across physical POS, website, and marketplaces', 'Automated safety stock thresholds and stockout alerts', 'Multi-warehouse stock allocation based on buyer zip code', 'Barcode scanning and handheld cycle count workflows']
        },
        {
          title: 'Frictionless One-Click Checkout & Dynamic Pricing',
          description: 'Streamlined checkout flows tailored to maximize conversion and reduce friction.',
          features: ['Address auto-fill via PIN code integration', 'Multi-payment support: UPI intent, cards, BNPL & COD verification', 'Algorithmic dynamic pricing and tiered volume discounts', 'Automated cart abandonment reminders via WhatsApp & email']
        },
        {
          title: 'Unified Order Management & Reverse Logistics',
          description: 'Automated post-purchase logistics coordination from dispatch to return.',
          features: ['Smart shipping courier allocation based on delivery speed & cost', 'Automated shipping label, packing slip & GST invoice creation', 'Customer self-service return & exchange management portal', 'Real-time package tracking page with branded notifications']
        }
      ],
      compliances: [
        { name: 'PCI-DSS Compliant', desc: 'Zero local storage of customer card data with tokenized gateway processing' },
        { name: 'Consumer Protection Rules', desc: 'Standardized seller grievance workflows and clear return window policies' },
        { name: 'GST E-Invoicing', desc: 'Direct automated GST calculation, IRN generation, and tax invoice compliance' }
      ],
      integrations: ['Shiprocket / Delhivery', 'Razorpay / Stripe', 'WhatsApp Commerce', 'Shopify / WooCommerce APIs', 'Tally / SAP ERP'],
      impactStats: [
        { metric: '420ms', label: 'Average Storefront Page Load' },
        { metric: '38%', label: 'Increase in Checkout Conversion' },
        { metric: '100%', label: 'Elimination of Overselling Errors' }
      ]
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing & Industry 4.0',
      shortName: 'Manufacturing',
      tagline: 'Shop-Floor Execution (MES), IoT Machine Telemetry & Batch Traceability',
      badge: 'IoT-Aware Systems',
      overview: 'Bridging industrial hardware with cloud computing. We build digital Manufacturing Execution Systems (MES), live sensor telemetry pipelines, and raw-material-to-finished-product traceability systems for modern manufacturing plants.',
      coreChallenge: 'Plant managers grapple with untracked machine downtime, paper-based operator logs, high rejection rates, and zero end-to-end batch traceability during quality audits.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/><circle cx="12" cy="12" r="2"/>
        </svg>
      ),
      modules: [
        {
          title: 'Manufacturing Execution System (MES)',
          description: 'Digital production scheduling, operator task dispatch, and shop-floor accountability.',
          features: ['Digital work order routing through sequential production lines', 'Operator shift logging with touchscreen kiosk interfaces', 'Real-time stage completion reporting with quality signoffs', 'Standard Operating Procedure (SOP) digital displays on floor']
        },
        {
          title: 'IoT Sensor Telemetry & Predictive Maintenance',
          description: 'High-frequency telemetry ingestion monitoring machine health in real time.',
          features: ['MQTT and WebSocket pipelines for vibration, heat, and power sensors', 'Threshold-based anomaly alerting to prevent catastrophic downtime', 'Predictive maintenance scheduling based on operating hours', 'Historic machine wear analytics and breakdown root-cause logs']
        },
        {
          title: 'Batch Tracking & End-to-End Material Traceability',
          description: 'Complete pedigree tracing from supplier raw materials to shipped pallets.',
          features: ['Serial barcode and QR code generation for work-in-progress parts', 'Sub-component genealogy mapping across every assembly step', 'Instant batch recall isolation with upstream and downstream tracking', 'Automated certificate of analysis (CoA) digital document linking']
        },
        {
          title: 'Overall Equipment Effectiveness (OEE) & Yield Dashboards',
          description: 'Executive and plant manager visual dashboards measuring production velocity.',
          features: ['Real-time OEE calculations (Availability x Performance x Quality)', 'Scrap and rework classification with root-cause Pareto charts', 'Target vs. Actual hourly output performance indicators', 'Automated daily plant production email and PDF reports']
        }
      ],
      compliances: [
        { name: 'ISO 9001 / IATF 16949', desc: 'Strict digital audit logging and batch quality control standards' },
        { name: 'Industrial IoT Security', desc: 'Secure edge-to-cloud gateways preventing unauthorized factory network access' },
        { name: 'Factory Safety Standards', desc: 'Automated equipment safety lockout checks and incident reporting' }
      ],
      integrations: ['MQTT & OPC-UA Protocols', 'Siemens / Allen-Bradley PLCs', 'AWS IoT Greengrass', 'SAP / ERP Systems', 'Industrial Barcode Scanners'],
      impactStats: [
        { metric: '28%', label: 'Reduction in Unplanned Downtime' },
        { metric: '99.8%', label: 'Batch Traceability Accuracy' },
        { metric: '18%', label: 'Improvement in Overall OEE' }
      ]
    },
    {
      id: 'logistics',
      name: 'Logistics & Supply Chain',
      shortName: 'Logistics & Fleet',
      tagline: 'AIS-140 Fleet Telemetry, Dynamic Route Optimization & Digital e-PoD',
      badge: 'Real-Time Tracking Capable',
      overview: 'Powering 3PL freight providers, intra-city delivery networks, and enterprise supply chains with real-time GPS tracking, multi-stop routing engines, and driver mobile applications with automated electronic proof-of-delivery.',
      coreChallenge: 'Logistics businesses suffer from spiraling fuel costs, vehicle blind spots once shipments leave hubs, manual billing delays due to paper delivery receipts, and detention at docks.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      ),
      modules: [
        {
          title: 'Live Fleet Telemetry & Geofence Intelligence',
          description: 'High-frequency vehicle telemetry ingestion with automatic milestone tracking.',
          features: ['AIS-140 GPS device protocol ingestion and live map plotting', 'Automated geofencing around hubs, ports, and customer warehouses', 'Speeding, harsh braking, and route deviation alerting', 'Driver driving-hour compliance and idle engine time logging']
        },
        {
          title: 'Multi-Stop Dynamic Route Optimization',
          description: 'Algorithmic route computation that minimizes fuel consumption and maximizes drop counts.',
          features: ['Clustering deliveries based on truck payload and volumetric capacity', 'Time-window-aware sequencing with live traffic recalculation', 'Multi-depot dispatch routing with return leg optimization', 'Instant route dispatch to driver mobile applications']
        },
        {
          title: 'Electronic Proof-of-Delivery (e-PoD) Driver App',
          description: 'Offline-capable native mobile application ensuring immediate billing readiness.',
          features: ['Digital customer signature capture and photo evidence of dropoff', 'GPS and timestamp watermarking on all delivery proofs', 'Partial delivery and rejection logging with itemized return tracking', 'Instant webhook trigger to customer ERP to release invoice']
        },
        {
          title: 'Warehouse Dock Scheduling & Yard Management',
          description: 'Digital coordination of inbound trucks and dock bays to eliminate yard congestion.',
          features: ['Time-slot booking for suppliers and third-party transport carriers', 'Automated gate check-in via license plate recognition (ANPR)', 'Forklift task allocation based on unloading bay priorities', 'Consignment consolidation and automated shipping manifests']
        }
      ],
      compliances: [
        { name: 'AIS-140 Standards', desc: 'Government-mandated Indian vehicle tracking and emergency button compliance' },
        { name: 'E-Way Bill & FASTag API', desc: 'Automated toll verification and automated electronic consignment e-way clearance' },
        { name: 'ISO 28000', desc: 'Supply chain security management and cargo anti-theft protocols' }
      ],
      integrations: ['Google Maps Platform', 'MapmyIndia APIs', 'NIC E-Way Bill Portal', 'FASTag Toll Gateways', 'Twilio SMS & WhatsApp'],
      impactStats: [
        { metric: '32%', label: 'Reduction in Fleet Fuel Costs' },
        { metric: '99.6%', label: 'On-Time Consignment Delivery' },
        { metric: 'Instant', label: 'Billing Generation via e-PoD' }
      ]
    }
  ];

  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetSector = location.hash.replace('#', '');
      if (industryDeepDives.some((ind) => ind.id === targetSector)) {
        setActiveTab(targetSector);
        setTimeout(() => {
          const el = document.getElementById(targetSector) || document.getElementById('sector-deep-dive');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    }
  }, [location.hash]);

  const selectedIndustry = industryDeepDives.find((ind) => ind.id === activeTab) || industryDeepDives[0];

  const handleSelectSector = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById('sector-deep-dive');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in-up">
      {/* ─── PAGE HERO ─── */}
      <section className="relative pt-20 pb-16 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#232734]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-4">
            Domain Awareness & Engineering
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display max-w-3xl leading-tight">
            Sector-focused<br />technology solutions.
          </h1>
          <p className="mt-6 text-base sm:text-xl text-[#525866] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
            We bring deep domain awareness to every engagement — engineering custom software that fits the exact operational nuances, compliance requirements, and user expectations of your industry.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 text-xs text-[#525866] dark:text-[#94A3B8]">
            <span className="font-semibold text-[#0D0D0D] dark:text-[#FAFAFA]">Featured Domains:</span>
            {industryDeepDives.map((sec) => (
              <button
                key={sec.id}
                type="button"
                onClick={() => handleSelectSector(sec.id)}
                className="px-2.5 py-1 rounded-lg border border-[#E2E8F0] dark:border-[#232734] hover:border-[#1E46EB] dark:hover:border-[#67BAF4] bg-white dark:bg-[#161922] transition-colors cursor-pointer"
              >
                {sec.shortName}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES GRID (TOP OVERVIEW) ─── */}
      <section className="py-20 bg-white dark:bg-[#12141B] transition-colors border-b border-[#E2E8F0] dark:border-[#232734]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#1E46EB] dark:text-[#67BAF4]">
                Overview
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mt-1">
                Industries We Serve
              </h2>
            </div>
            <p className="text-sm text-[#525866] dark:text-[#94A3B8] max-w-md mt-2 md:mt-0">
              Click any sector to inspect its full architectural blueprint, core software modules, compliance profile, and measurable outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industriesOverview.map((sector, idx) => {
              const matchedDeepDive = industryDeepDives[idx];
              const isSelected = activeTab === matchedDeepDive?.id;

              return (
                <div
                  key={idx}
                  onClick={() => matchedDeepDive && handleSelectSector(matchedDeepDive.id)}
                  className={`service-card-accent p-8 rounded-2xl border transition-all duration-200 flex flex-col justify-between shadow-sm cursor-pointer group ${
                    isSelected
                      ? 'border-[#1E46EB] dark:border-[#67BAF4] bg-[#F4F9FE] dark:bg-[#161B26] ring-2 ring-[#1E46EB]/20 dark:ring-[#67BAF4]/20'
                      : 'border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] hover:border-[#1E46EB]/50 dark:hover:border-[#67BAF4]/50 hover:-translate-y-1'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#1E46EB] text-white dark:bg-[#67BAF4] dark:text-[#0D0D0D]'
                          : 'bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1E46EB] dark:text-[#67BAF4] group-hover:bg-[#1E46EB] group-hover:text-white dark:group-hover:bg-[#67BAF4] dark:group-hover:text-[#0D0D0D]'
                      }`}>
                        {sector.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white dark:bg-[#1F232F] text-[#1765A8] dark:text-[#67BAF4] border border-[#E2E8F0] dark:border-[#232734]">
                        {sector.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-3">
                      {sector.title}
                    </h3>
                    <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed mb-6">
                      {sector.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#232734]">
                    <div className="grid grid-cols-2 gap-2 text-[11px] font-medium text-[#525866] dark:text-[#94A3B8] mb-4">
                      {sector.capabilities.map((cap, i) => (
                        <span key={i} className="flex items-center gap-1.5">
                          <span className="text-[#1E46EB] dark:text-[#67BAF4] font-bold">•</span>
                          <span className="truncate">{cap}</span>
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-semibold text-[#1E46EB] dark:text-[#67BAF4] pt-2">
                      <span className="relative pb-0.5">
                        <span>Explore Architecture & Modules</span>
                        <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#1E46EB] dark:bg-[#67BAF4] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                      </span>
                      <span className="transition-transform duration-300 ease-out group-hover:translate-x-[3px]">&rarr;</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── INTERACTIVE TABBED DEEP DIVE SECTION ─── */}
      <section id="sector-deep-dive" className="py-24 bg-[#FAFAFA] dark:bg-[#0D0D0D] transition-colors scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-3">
              Comprehensive Domain Blueprints
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display tracking-tight">
              Detailed Sector Architecture
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#525866] dark:text-[#94A3B8] leading-relaxed">
              Explore the specific subsystems, regulatory frameworks, ecosystem integrations, and proven business metrics we deliver across each domain.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center justify-start lg:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
            {industryDeepDives.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-4.5 py-3 rounded-xl font-medium text-sm transition-all whitespace-nowrap cursor-pointer border ${
                    isActive
                      ? 'bg-[#1E46EB] text-white border-[#1E46EB] shadow-md shadow-[#1E46EB]/25 dark:bg-[#67BAF4] dark:text-[#0D0D0D] dark:border-[#67BAF4] font-semibold'
                      : 'bg-white dark:bg-[#161922] text-[#525866] dark:text-[#94A3B8] border-[#E2E8F0] dark:border-[#232734] hover:text-[#0D0D0D] dark:hover:text-[#FAFAFA] hover:border-[#CBD5E1] dark:hover:border-[#33394B]'
                  }`}
                  aria-selected={isActive}
                >
                  <span className={`w-4 h-4 shrink-0 ${isActive ? 'text-white dark:text-[#0D0D0D]' : 'text-[#1E46EB] dark:text-[#67BAF4]'}`}>
                    {tab.icon}
                  </span>
                  <span>{tab.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Active Industry Showcase Content Card */}
          <div className="bg-white dark:bg-[#12141B] rounded-3xl border border-[#E2E8F0] dark:border-[#232734] shadow-sm overflow-hidden transition-all duration-300">
            
            {/* Header Banner */}
            <div className="p-8 sm:p-10 border-b border-[#E2E8F0] dark:border-[#232734] bg-gradient-to-r from-transparent via-[#1E46EB]/5 to-transparent">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-10 h-10 rounded-xl bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1E46EB] dark:text-[#67BAF4] flex items-center justify-center">
                      {selectedIndustry.icon}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20">
                      {selectedIndustry.badge}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                    {selectedIndustry.name}
                  </h3>
                  <p className="mt-1.5 text-base sm:text-lg font-medium text-[#1E46EB] dark:text-[#67BAF4]">
                    {selectedIndustry.tagline}
                  </p>
                </div>

                <Link
                  to="/contact"
                  viewTransition
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] transition-all duration-150 shadow-md shadow-[#1E46EB]/25 active:scale-95 shrink-0 self-start md:self-auto"
                >
                  Consult on {selectedIndustry.shortName}
                </Link>
              </div>

              {/* Strategic Overview & Pain Points */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 pt-6 border-t border-[#E2E8F0] dark:border-[#232734]">
                <div className="lg:col-span-7">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#525866] dark:text-[#94A3B8] mb-2">
                    Domain Overview
                  </h4>
                  <p className="text-sm text-[#0D0D0D] dark:text-[#FAFAFA] leading-relaxed">
                    {selectedIndustry.overview}
                  </p>
                </div>
                <div className="lg:col-span-5 p-4 rounded-xl bg-[#FAFAFA] dark:bg-[#161922] border border-[#E2E8F0] dark:border-[#232734]">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97706] dark:text-[#F59E0B] mb-1.5 flex items-center gap-1.5">
                    <span>⚠️</span>
                    <span>Critical Industry Bottleneck Solved</span>
                  </h4>
                  <p className="text-xs text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                    {selectedIndustry.coreChallenge}
                  </p>
                </div>
              </div>
            </div>

            {/* Core Modules Grid (4 Detailed Cards) */}
            <div className="p-8 sm:p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E46EB] dark:text-[#67BAF4]">
                    Production Deliverables
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mt-0.5">
                    Flagship Modules & Systems We Engineer
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {selectedIndustry.modules.map((mod, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922]/80 hover:border-[#1E46EB]/40 dark:hover:border-[#67BAF4]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <span className="w-6 h-6 rounded-lg bg-[#1E46EB]/10 dark:bg-[#67BAF4]/10 text-[#1E46EB] dark:text-[#67BAF4] font-bold text-xs flex items-center justify-center shrink-0">
                        {i + 1}
                      </span>
                      <h5 className="font-bold text-base text-[#0D0D0D] dark:text-[#FAFAFA]">
                        {mod.title}
                      </h5>
                    </div>
                    <p className="text-xs text-[#525866] dark:text-[#94A3B8] leading-relaxed mb-4">
                      {mod.description}
                    </p>

                    <div className="space-y-1.5 pt-3 border-t border-[#E2E8F0] dark:border-[#232734]">
                      {mod.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2 text-xs text-[#525866] dark:text-[#94A3B8]">
                          <span className="text-[#1E46EB] dark:text-[#67BAF4] font-bold mt-0.5">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Compliance & Regulatory Frameworks */}
              <div className="p-6 sm:p-8 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#F8FAFC] dark:bg-[#161922] mb-10">
                <div className="mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1E46EB] dark:text-[#67BAF4]">
                    Governance & Security
                  </span>
                  <h4 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mt-0.5">
                    Regulatory Compliance & Security Architecture
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {selectedIndustry.compliances.map((comp, cIdx) => (
                    <div key={cIdx} className="p-4 rounded-xl bg-white dark:bg-[#12141B] border border-[#E2E8F0] dark:border-[#232734]">
                      <div className="flex items-center gap-2 mb-1.5">
                        <svg className="w-4 h-4 text-[#16A34A] dark:text-[#22C55E] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        <span className="font-bold text-sm text-[#0D0D0D] dark:text-[#FAFAFA]">
                          {comp.name}
                        </span>
                      </div>
                      <p className="text-xs text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                        {comp.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supported Third-Party Integrations */}
              <div className="mb-10">
                <span className="text-xs font-bold uppercase tracking-wider text-[#525866] dark:text-[#94A3B8] block mb-3">
                  Ecosystem Integrations & Supported Protocols
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedIndustry.integrations.map((item, intIdx) => (
                    <span
                      key={intIdx}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#FAFAFA] dark:bg-[#161922] text-[#0D0D0D] dark:text-[#FAFAFA] border border-[#E2E8F0] dark:border-[#232734]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Proven Business Metrics Grid */}
              <div className="pt-8 border-t border-[#E2E8F0] dark:border-[#232734]">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1E46EB] dark:text-[#67BAF4] block mb-4">
                  Measurable Business Outcomes
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {selectedIndustry.impactStats.map((stat, sIdx) => (
                    <div key={sIdx} className="p-5 rounded-2xl bg-[#E7F3FD]/40 dark:bg-[#161922] border border-[#1E46EB]/15 dark:border-[#67BAF4]/15">
                      <div className="text-3xl font-extrabold text-[#1E46EB] dark:text-[#67BAF4] font-display">
                        {stat.metric}
                      </div>
                      <div className="text-xs font-medium text-[#525866] dark:text-[#94A3B8] mt-1">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ─── INDUSTRY DELIVERY LIFECYCLE ─── */}
      <section className="py-20 bg-white dark:bg-[#12141B] transition-colors border-t border-[#E2E8F0] dark:border-[#232734]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1E46EB] dark:text-[#67BAF4]">
              Delivery Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mt-1">
              How We Deliver for Your Industry
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#525866] dark:text-[#94A3B8]">
              A proven four-stage engineering sequence built specifically to eliminate compliance friction and technical risk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '01',
                title: 'Domain & Compliance Discovery',
                desc: 'Mapping your specific operational workflows, edge cases, legacy databases, and applicable statutory standards (RBI, HIPAA, DPDP).'
              },
              {
                step: '02',
                title: 'Architecture & Security Blueprint',
                desc: 'Designing cloud infrastructure, data schemas, API contracts, field-level encryption, and zero-trust authentication layers.'
              },
              {
                step: '03',
                title: 'Agile Engineering & Pilot Run',
                desc: 'Iterative sprint delivery with weekly builds, automated unit/integration tests, and controlled sandbox validation.'
              },
              {
                step: '04',
                title: 'Production Cutover & SLA Support',
                desc: 'Zero-downtime database migration, operational staff training, 24/7 telemetry monitoring, and defined response time SLAs.'
              }
            ].map((st, sIdx) => (
              <div
                key={sIdx}
                className="p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] relative"
              >
                <div className="text-2xl font-black text-[#1E46EB]/40 dark:text-[#67BAF4]/40 font-mono mb-3">
                  {st.step}
                </div>
                <h4 className="font-bold text-base text-[#0D0D0D] dark:text-[#FAFAFA] mb-2 font-display">
                  {st.title}
                </h4>
                <p className="text-xs text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                  {st.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shared CTA Banner */}
      <CtaBanner 
        title="Ready to engineer for your industry?" 
        desc="Schedule a technical consultation with our engineering team to design a secure, compliant architecture tailored to your sector."
      />
    </div>
  );
}
