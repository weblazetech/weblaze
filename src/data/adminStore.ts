import { ProjectItem, InquiryItem, MetricItem, JobRole, ProgramTrack } from '../types';
import { PORTFOLIO_PROJECTS } from './portfolioData';

const AUTH_KEY = 'weblaze_admin_auth';
const PROJECTS_KEY = 'weblaze_cms_projects';
const INQUIRIES_KEY = 'weblaze_cms_inquiries';
const METRICS_KEY = 'weblaze_cms_metrics';
const CAREERS_KEY = 'weblaze_cms_careers';
const PROGRAMS_KEY = 'weblaze_cms_programs';

// Default initial inquiries so the inbox is immediately demonstrative
const DEFAULT_INQUIRIES: InquiryItem[] = [
  {
    id: 'inq-101',
    name: 'Suresh Verma',
    email: 'suresh@apexinstitutions.org',
    phone: '+91 98765 43210',
    subject: 'School ERP Demonstration',
    message: 'We manage 3 campus branches across Telangana and want a comprehensive demonstration of the attendance, fee management, and parent portal modules.',
    createdAt: '2026-10-25T11:42:00Z',
    status: 'new',
  },
  {
    id: 'inq-102',
    name: 'Priyanka Das',
    email: 'priyanka@palluvo.store',
    phone: '+91 91234 56789',
    subject: 'New Project Enquiry',
    message: 'We are expanding our retail brand into an international storefront and would like to consult on architecture and checkout optimizations.',
    createdAt: '2026-10-24T09:15:00Z',
    status: 'in_progress',
  },
  {
    id: 'inq-103',
    name: 'Vikram Reddy',
    email: 'vikram@hydlogistics.co.in',
    phone: '+91 99887 76655',
    subject: 'Business Automation Consulting',
    message: 'Looking to build an automated telematics tracking system for 40 fleet vehicles with WhatsApp alert dispatch.',
    createdAt: '2026-10-22T14:30:00Z',
    status: 'closed',
  },
];

const DEFAULT_METRICS: MetricItem[] = [
  { count: '10+', label: 'Projects Delivered' },
  { count: '1+', label: 'Year in Operation' },
  { count: '5+', label: 'Active Clients' },
  { count: '90%', label: 'Client Retention %' },
];

// --- AUTHENTICATION ---
export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function loginAdmin(email: string, pass: string): boolean {
  // Demo credentials for easy access
  const normalized = email.trim().toLowerCase();
  const validEmail = normalized === 'admin@weblaze.in' || normalized === 'contact@weblaze.in';
  const validPass = pass === 'weblaze2026' || pass === 'admin123';

  if (validEmail && validPass) {
    try {
      localStorage.setItem(AUTH_KEY, 'true');
    } catch {}
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {}
}

// --- PROJECTS CMS ---
export function getStoredProjects(): ProjectItem[] {
  if (typeof window === 'undefined') return PORTFOLIO_PROJECTS;
  try {
    const raw = localStorage.getItem(PROJECTS_KEY);
    if (!raw) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(PORTFOLIO_PROJECTS));
      return PORTFOLIO_PROJECTS;
    }
    const stored = JSON.parse(raw) as ProjectItem[];
    // Auto-heal: If LAVISH was mistakenly removed, ensure it is restored at the front of the portfolio
    const lavishDefault = PORTFOLIO_PROJECTS.find((p) => p.id === 'lavish');
    if (lavishDefault && !stored.some((p) => p.id === 'lavish')) {
      const restored = [lavishDefault, ...stored];
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(restored));
      return restored;
    }
    return stored;
  } catch {
    return PORTFOLIO_PROJECTS;
  }
}

export function saveStoredProject(project: ProjectItem): ProjectItem[] {
  const current = getStoredProjects();
  const existingIdx = current.findIndex((p) => p.id === project.id);
  let updated: ProjectItem[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = project;
  } else {
    updated = [project, ...current];
  }

  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('weblaze_projects_updated'));
  } catch {}

  return updated;
}

export function deleteStoredProject(id: string): ProjectItem[] {
  const current = getStoredProjects();
  const updated = current.filter((p) => p.id !== id);

  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('weblaze_projects_updated'));
  } catch {}

  return updated;
}

export function resetStoredProjects(): ProjectItem[] {
  try {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(PORTFOLIO_PROJECTS));
    window.dispatchEvent(new Event('weblaze_projects_updated'));
  } catch {}
  return PORTFOLIO_PROJECTS;
}

// --- INQUIRIES CMS ---
export function getStoredInquiries(): InquiryItem[] {
  if (typeof window === 'undefined') return DEFAULT_INQUIRIES;
  try {
    const raw = localStorage.getItem(INQUIRIES_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_KEY, JSON.stringify(DEFAULT_INQUIRIES));
      return DEFAULT_INQUIRIES;
    }
    return JSON.parse(raw) as InquiryItem[];
  } catch {
    return DEFAULT_INQUIRIES;
  }
}

export function addStoredInquiry(data: {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}): InquiryItem {
  const current = getStoredInquiries();
  const newInquiry: InquiryItem = {
    ...data,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: 'new',
  };

  const updated = [newInquiry, ...current];
  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('weblaze_inquiries_updated'));
  } catch {}

  return newInquiry;
}

export function updateInquiryStatus(id: string, status: InquiryItem['status']): InquiryItem[] {
  const current = getStoredInquiries();
  const updated = current.map((item) =>
    item.id === id ? { ...item, status } : item
  );

  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('weblaze_inquiries_updated'));
  } catch {}

  return updated;
}

export function deleteStoredInquiry(id: string): InquiryItem[] {
  const current = getStoredInquiries();
  const updated = current.filter((item) => item.id !== id);

  try {
    localStorage.setItem(INQUIRIES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('weblaze_inquiries_updated'));
  } catch {}

  return updated;
}

// --- METRICS CMS ---
export function getStoredMetrics(): MetricItem[] {
  if (typeof window === 'undefined') return DEFAULT_METRICS;
  try {
    const raw = localStorage.getItem(METRICS_KEY);
    if (!raw) {
      localStorage.setItem(METRICS_KEY, JSON.stringify(DEFAULT_METRICS));
      return DEFAULT_METRICS;
    }
    return JSON.parse(raw) as MetricItem[];
  } catch {
    return DEFAULT_METRICS;
  }
}

export function saveStoredMetrics(metrics: MetricItem[]): MetricItem[] {
  try {
    localStorage.setItem(METRICS_KEY, JSON.stringify(metrics));
    window.dispatchEvent(new Event('weblaze_metrics_updated'));
  } catch {}
  return metrics;
}

// --- DEFAULT CAREER ROLES & PRESETS ---
export const DEFAULT_CAREERS: JobRole[] = [
  {
    id: 'role-fullstack',
    title: 'Senior Full Stack Developer',
    type: 'Full-Time',
    location: 'Hyderabad / Hybrid',
    exp: '4+ Years Exp.',
    tags: ['PHP 8', 'React', 'MySQL', 'AWS'],
    desc: 'Lead the architecture of enterprise web platforms and multi-tenant SaaS products. Drive backend design, API contracts, and database optimization.',
  },
  {
    id: 'role-frontend',
    title: 'Frontend Engineer (React / Tailwind)',
    type: 'Full-Time',
    location: 'Hyderabad / Hybrid',
    exp: '2+ Years Exp.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    desc: 'Build accessible, responsive, high-performance UI systems with rich micro-animations and strict WCAG compliance.',
  },
  {
    id: 'role-aiml',
    title: 'AI / ML Engineering Intern',
    type: 'Internship / Fresher',
    location: 'Hyderabad / Remote',
    exp: 'Fresh Graduates',
    tags: ['Python', 'FastAPI', 'LLM Agents', 'LangChain'],
    desc: 'Work directly on customer-facing generative AI tools, document extraction pipelines, and automated support agents.',
  },
];

export const CAREER_PRESETS: Array<Omit<JobRole, 'id'>> = [
  {
    title: 'Senior Full Stack Developer',
    type: 'Full-Time',
    location: 'Hyderabad / Hybrid',
    exp: '4+ Years Exp.',
    tags: ['PHP 8', 'React', 'MySQL', 'AWS'],
    desc: 'Lead the architecture of enterprise web platforms and multi-tenant SaaS products. Drive backend design, API contracts, and database optimization.',
  },
  {
    title: 'Frontend Engineer (React / Tailwind)',
    type: 'Full-Time',
    location: 'Hyderabad / Hybrid',
    exp: '2+ Years Exp.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    desc: 'Build accessible, responsive, high-performance UI systems with rich micro-animations and strict WCAG compliance.',
  },
  {
    title: 'Backend Engineer (Node.js / Python)',
    type: 'Full-Time',
    location: 'Hyderabad / Remote',
    exp: '3+ Years Exp.',
    tags: ['Node.js', 'FastAPI', 'PostgreSQL', 'Redis'],
    desc: 'Architect high-throughput REST and GraphQL APIs, event-driven pipelines, microservices, and database performance tuning.',
  },
  {
    title: 'AI / ML Engineering Intern',
    type: 'Internship / Fresher',
    location: 'Hyderabad / Remote',
    exp: 'Fresh Graduates',
    tags: ['Python', 'FastAPI', 'LLM Agents', 'LangChain'],
    desc: 'Work directly on customer-facing generative AI tools, document extraction pipelines, and automated support agents.',
  },
  {
    title: 'Cloud DevOps & Infrastructure Engineer',
    type: 'Full-Time',
    location: 'Hyderabad / Hybrid',
    exp: '3+ Years Exp.',
    tags: ['AWS', 'Docker', 'Kubernetes', 'Terraform'],
    desc: 'Design and automate zero-downtime CI/CD deployment pipelines, Kubernetes clusters, and cloud security governance.',
  },
  {
    title: 'UI/UX & Product Designer',
    type: 'Full-Time',
    location: 'Hyderabad / Hybrid',
    exp: '2+ Years Exp.',
    tags: ['Figma', 'Design Systems', 'Micro-Interactions', 'Prototyping'],
    desc: 'Craft intuitive enterprise user journeys, maintain component design systems, and collaborate with engineering on pixel-perfect handoffs.',
  },
  {
    title: 'QA & Test Automation Engineer',
    type: 'Full-Time',
    location: 'Hyderabad / Remote',
    exp: '2+ Years Exp.',
    tags: ['Playwright', 'Jest', 'Cypress', 'API Testing'],
    desc: 'Develop end-to-end regression suites, automated load testing, and continuous delivery test gates for enterprise clients.',
  },
];

// --- CAREERS CMS STORE ---
export function getStoredCareers(): JobRole[] {
  if (typeof window === 'undefined') return DEFAULT_CAREERS;
  try {
    const raw = localStorage.getItem(CAREERS_KEY);
    if (!raw) {
      localStorage.setItem(CAREERS_KEY, JSON.stringify(DEFAULT_CAREERS));
      return DEFAULT_CAREERS;
    }
    return JSON.parse(raw) as JobRole[];
  } catch {
    return DEFAULT_CAREERS;
  }
}

export function saveStoredCareer(role: JobRole): JobRole[] {
  const current = getStoredCareers();
  const roleId = role.id || `role-${Date.now()}`;
  const preparedRole = { ...role, id: roleId };
  const existingIdx = current.findIndex((r) => (r.id && r.id === roleId) || r.title === role.title);
  let updated: JobRole[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = preparedRole;
  } else {
    updated = [preparedRole, ...current];
  }

  try {
    localStorage.setItem(CAREERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('weblaze_careers_updated'));
  } catch {}

  return updated;
}

export function deleteStoredCareer(idOrTitle: string): JobRole[] {
  const current = getStoredCareers();
  const updated = current.filter((r) => r.id !== idOrTitle && r.title !== idOrTitle);

  try {
    localStorage.setItem(CAREERS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('weblaze_careers_updated'));
  } catch {}

  return updated;
}

export function resetStoredCareers(): JobRole[] {
  try {
    localStorage.setItem(CAREERS_KEY, JSON.stringify(DEFAULT_CAREERS));
    window.dispatchEvent(new Event('weblaze_careers_updated'));
  } catch {}
  return DEFAULT_CAREERS;
}

// --- DEFAULT PROGRAMS & PRESETS ---
export const DEFAULT_PROGRAMS: ProgramTrack[] = [
  {
    id: 'fullstack-track',
    title: 'Full Stack Web Engineering',
    duration: '12 Weeks',
    level: 'Intermediate',
    stack: 'React, TypeScript, Node.js, PHP, PostgreSQL, Docker',
    desc: 'Master full-cycle web development from responsive UI architecture and state machines to RESTful backend services, database migrations, and cloud hosting.',
    topics: ['Component Architecture & State', 'Relational DB Modeling & Indexing', 'Authentication & JWT Sessions', 'CI/CD Automated Deployment'],
  },
  {
    id: 'ai-track',
    title: 'AI & Intelligent Automation Track',
    duration: '10 Weeks',
    level: 'Advanced',
    stack: 'Python, FastAPI, LangChain, PyTorch, Vector DBs',
    desc: 'Build real-world AI applications: autonomous agents, retrieval-augmented generation (RAG) pipelines, and fine-tuned models for business data extraction.',
    topics: ['Prompt Engineering & Evaluation', 'RAG Pipelines & Embeddings', 'Autonomous Agentic Workflows', 'Model Deployment & Guardrails'],
  },
  {
    id: 'mobile-track',
    title: 'Cross-Platform Mobile App Track',
    duration: '10 Weeks',
    level: 'Intermediate',
    stack: 'React Native, Expo, Flutter, Firebase, REST APIs',
    desc: 'Develop smooth 60fps mobile applications for iOS and Android, handling native hardware APIs, push notifications, and offline SQLite synchronization.',
    topics: ['Touch Gestures & Reanimated', 'Offline Cache & Sync Architecture', 'Native Device Sensor APIs', 'App Store & Play Store Submissions'],
  },
  {
    id: 'devops-track',
    title: 'Cloud Infrastructure & DevOps Track',
    duration: '8 Weeks',
    level: 'Intermediate to Advanced',
    stack: 'AWS, Docker, Kubernetes, Terraform, Linux',
    desc: 'Learn industry DevOps standards: orchestrating container clusters, configuring load balancers, provisioning infrastructure as code, and securing VPCs.',
    topics: ['Docker Multi-stage Builds', 'Kubernetes Pod Networking', 'Terraform State & Modules', 'Uptime Monitoring & Alerting'],
  },
];

export const PROGRAM_PRESETS: Array<Omit<ProgramTrack, 'id'>> = [
  {
    title: 'Full Stack Web Engineering',
    duration: '12 Weeks',
    level: 'Intermediate',
    stack: 'React, TypeScript, Node.js, PHP, PostgreSQL, Docker',
    desc: 'Master full-cycle web development from responsive UI architecture and state machines to RESTful backend services, database migrations, and cloud hosting.',
    topics: ['Component Architecture & State', 'Relational DB Modeling & Indexing', 'Authentication & JWT Sessions', 'CI/CD Automated Deployment'],
  },
  {
    title: 'AI & Intelligent Automation Track',
    duration: '10 Weeks',
    level: 'Advanced',
    stack: 'Python, FastAPI, LangChain, PyTorch, Vector DBs',
    desc: 'Build real-world AI applications: autonomous agents, retrieval-augmented generation (RAG) pipelines, and fine-tuned models for business data extraction.',
    topics: ['Prompt Engineering & Evaluation', 'RAG Pipelines & Embeddings', 'Autonomous Agentic Workflows', 'Model Deployment & Guardrails'],
  },
  {
    title: 'Cross-Platform Mobile App Track',
    duration: '10 Weeks',
    level: 'Intermediate',
    stack: 'React Native, Expo, Flutter, Firebase, REST APIs',
    desc: 'Develop smooth 60fps mobile applications for iOS and Android, handling native hardware APIs, push notifications, and offline SQLite synchronization.',
    topics: ['Touch Gestures & Reanimated', 'Offline Cache & Sync Architecture', 'Native Device Sensor APIs', 'App Store & Play Store Submissions'],
  },
  {
    title: 'Cloud Infrastructure & DevOps Track',
    duration: '8 Weeks',
    level: 'Intermediate to Advanced',
    stack: 'AWS, Docker, Kubernetes, Terraform, Linux',
    desc: 'Learn industry DevOps standards: orchestrating container clusters, configuring load balancers, provisioning infrastructure as code, and securing VPCs.',
    topics: ['Docker Multi-stage Builds', 'Kubernetes Pod Networking', 'Terraform State & Modules', 'Uptime Monitoring & Alerting'],
  },
  {
    title: 'Cybersecurity & Ethical Hacking Track',
    duration: '10 Weeks',
    level: 'Intermediate',
    stack: 'Linux, Wireshark, Burp Suite, Python, OWASP, Metasploit',
    desc: 'Gain practical offensive and defensive security skills: penetration testing web applications, vulnerability scanning, security audits, and network protection.',
    topics: ['OWASP Top 10 Exploitation & Prevention', 'Network Traffic Analysis & Defense', 'Web API Penetration Testing', 'Security Compliance & Hardening'],
  },
  {
    title: 'Data Engineering & Analytics Track',
    duration: '10 Weeks',
    level: 'Intermediate',
    stack: 'SQL, Python, Apache Spark, Snowflake, dbt, Airflow',
    desc: 'Design scalable analytical data lakes, ETL pipelines, automated data orchestration, and real-time business intelligence dashboards.',
    topics: ['Data Warehousing & Star Schema', 'ETL Automation with Apache Airflow', 'Big Data Transformations with Spark', 'Data Quality Testing & Governance'],
  },
];

// --- PROGRAMS CMS STORE ---
export function getStoredPrograms(): ProgramTrack[] {
  if (typeof window === 'undefined') return DEFAULT_PROGRAMS;
  try {
    const raw = localStorage.getItem(PROGRAMS_KEY);
    if (!raw) {
      localStorage.setItem(PROGRAMS_KEY, JSON.stringify(DEFAULT_PROGRAMS));
      return DEFAULT_PROGRAMS;
    }
    return JSON.parse(raw) as ProgramTrack[];
  } catch {
    return DEFAULT_PROGRAMS;
  }
}

export function saveStoredProgram(program: ProgramTrack): ProgramTrack[] {
  const current = getStoredPrograms();
  const progId = program.id || `track-${Date.now()}`;
  const preparedProg = { ...program, id: progId };
  const existingIdx = current.findIndex((p) => p.id === progId || p.title === program.title);
  let updated: ProgramTrack[];

  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = preparedProg;
  } else {
    updated = [preparedProg, ...current];
  }

  try {
    localStorage.setItem(PROGRAMS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('weblaze_programs_updated'));
  } catch {}

  return updated;
}

export function deleteStoredProgram(id: string): ProgramTrack[] {
  const current = getStoredPrograms();
  const updated = current.filter((p) => p.id !== id);

  try {
    localStorage.setItem(PROGRAMS_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('weblaze_programs_updated'));
  } catch {}

  return updated;
}

export function resetStoredPrograms(): ProgramTrack[] {
  try {
    localStorage.setItem(PROGRAMS_KEY, JSON.stringify(DEFAULT_PROGRAMS));
    window.dispatchEvent(new Event('weblaze_programs_updated'));
  } catch {}
  return DEFAULT_PROGRAMS;
}
