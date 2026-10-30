import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProjectItem, InquiryItem, MetricItem, JobRole, ProgramTrack } from '../../types';
import {
  logoutAdmin,
  getStoredProjects,
  saveStoredProject,
  deleteStoredProject,
  resetStoredProjects,
  getStoredInquiries,
  updateInquiryStatus,
  deleteStoredInquiry,
  getStoredMetrics,
  saveStoredMetrics,
  getStoredCareers,
  saveStoredCareer,
  deleteStoredCareer,
  resetStoredCareers,
  CAREER_PRESETS,
  getStoredPrograms,
  saveStoredProgram,
  deleteStoredProgram,
  resetStoredPrograms,
  PROGRAM_PRESETS,
} from '../../data/adminStore';

type AdminTab = 'overview' | 'projects' | 'careers' | 'programs' | 'inquiries' | 'metrics' | 'settings';

interface AdminDashboardProps {
  onLogout: () => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AdminDashboard({ onLogout, darkMode, setDarkMode }: AdminDashboardProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [projects, setProjects] = useState<ProjectItem[]>(() => getStoredProjects());
  const [inquiries, setInquiries] = useState<InquiryItem[]>(() => getStoredInquiries());
  const [metrics, setMetrics] = useState<MetricItem[]>(() => getStoredMetrics());
  const [careers, setCareers] = useState<JobRole[]>(() => getStoredCareers());
  const [programs, setPrograms] = useState<ProgramTrack[]>(() => getStoredPrograms());

  // Project Modal State
  const [isProjectModalOpen, setIsProjectModalOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [projectFormData, setProjectFormData] = useState<Partial<ProjectItem>>({
    id: '',
    name: '',
    category: 'Website Design & Development',
    typeGroup: 'website',
    description: '',
    url: '',
    previewImage: '',
    slideshowImages: [''],
    tags: [],
    buttonText: 'View Website →',
    meta: '',
  });

  // Career Modal State
  const [isCareerModalOpen, setIsCareerModalOpen] = useState<boolean>(false);
  const [editingCareer, setEditingCareer] = useState<JobRole | null>(null);
  const [careerFormData, setCareerFormData] = useState<JobRole>({
    id: '',
    title: '',
    type: 'Full-Time',
    location: 'Hyderabad / Hybrid',
    exp: '2+ Years Exp.',
    tags: ['React', 'TypeScript'],
    desc: '',
  });

  // Program Modal State
  const [isProgramModalOpen, setIsProgramModalOpen] = useState<boolean>(false);
  const [editingProgram, setEditingProgram] = useState<ProgramTrack | null>(null);
  const [programFormData, setProgramFormData] = useState<ProgramTrack>({
    id: '',
    title: '',
    duration: '10 Weeks',
    level: 'Intermediate',
    stack: '',
    desc: '',
    topics: ['Module Architecture', 'Database Modeling', 'Live Capstone Project'],
  });

  // Inquiry View Modal State
  const [selectedInquiry, setSelectedInquiry] = useState<InquiryItem | null>(null);

  // Search & Filters
  const [projectSearch, setProjectSearch] = useState<string>('');
  const [inquirySearch, setInquirySearch] = useState<string>('');
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'new' | 'in_progress' | 'closed'>('all');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Sync state on store events
  useEffect(() => {
    const handleProjectsUpdate = () => setProjects(getStoredProjects());
    const handleInquiriesUpdate = () => setInquiries(getStoredInquiries());
    const handleMetricsUpdate = () => setMetrics(getStoredMetrics());
    const handleCareersUpdate = () => setCareers(getStoredCareers());
    const handleProgramsUpdate = () => setPrograms(getStoredPrograms());

    window.addEventListener('weblaze_projects_updated', handleProjectsUpdate);
    window.addEventListener('weblaze_inquiries_updated', handleInquiriesUpdate);
    window.addEventListener('weblaze_metrics_updated', handleMetricsUpdate);
    window.addEventListener('weblaze_careers_updated', handleCareersUpdate);
    window.addEventListener('weblaze_programs_updated', handleProgramsUpdate);

    return () => {
      window.removeEventListener('weblaze_projects_updated', handleProjectsUpdate);
      window.removeEventListener('weblaze_inquiries_updated', handleInquiriesUpdate);
      window.removeEventListener('weblaze_metrics_updated', handleMetricsUpdate);
      window.removeEventListener('weblaze_careers_updated', handleCareersUpdate);
      window.removeEventListener('weblaze_programs_updated', handleProgramsUpdate);
    };
  }, []);

  // --- PROJECT ACTIONS ---
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjectFormData({
      id: `proj-${Date.now().toString(36)}`,
      name: '',
      category: 'Website Design & Development',
      typeGroup: 'website',
      description: '',
      url: 'https://',
      previewImage: 'https://portfolio.weblaze.in/images/lavish/screenshot-1.jpg',
      slideshowImages: ['https://portfolio.weblaze.in/images/lavish/screenshot-1.jpg'],
      tags: ['Modern Web', 'Responsive'],
      buttonText: 'View Website →',
      meta: '',
    });
    setIsProjectModalOpen(true);
  };

  const handleOpenEditProject = (proj: ProjectItem) => {
    setEditingProject(proj);
    setProjectFormData({
      ...proj,
      slideshowImages: proj.slideshowImages?.length ? [...proj.slideshowImages] : [proj.previewImage],
    });
    setIsProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!projectFormData.name || !projectFormData.url) return;

    const cleanedImages = (projectFormData.slideshowImages || []).filter((img) => img.trim().length > 0);
    const finalProject: ProjectItem = {
      id: projectFormData.id || `proj-${Date.now()}`,
      name: projectFormData.name.trim(),
      category: projectFormData.category || 'Website Design & Development',
      typeGroup: (projectFormData.typeGroup as 'website' | 'system') || 'website',
      description: projectFormData.description || '',
      url: projectFormData.url.trim(),
      previewImage: cleanedImages[0] || 'https://portfolio.weblaze.in/images/lavish/screenshot-1.jpg',
      slideshowImages: cleanedImages.length > 0 ? cleanedImages : ['https://portfolio.weblaze.in/images/lavish/screenshot-1.jpg'],
      buttonText: projectFormData.buttonText || (projectFormData.typeGroup === 'system' ? 'View Product →' : 'View Website →'),
      meta: projectFormData.meta || '',
      tags: Array.isArray(projectFormData.tags) 
        ? projectFormData.tags 
        : typeof projectFormData.tags === 'string'
        ? (projectFormData.tags as string).split(',').map((t) => t.trim()).filter(Boolean)
        : [],
    };

    saveStoredProject(finalProject);
    setIsProjectModalOpen(false);
    showToast(`Project "${finalProject.name}" saved successfully!`);
  };

  const handleDeleteProject = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}" from the portfolio?`)) {
      deleteStoredProject(id);
      showToast(`Deleted "${name}".`);
    }
  };

  const handleResetProjects = () => {
    if (window.confirm('Reset portfolio back to default 10 projects?')) {
      resetStoredProjects();
      showToast('Portfolio reset to default showcase.');
    }
  };

  // --- CAREER ACTIONS ---
  const handleOpenAddCareer = () => {
    setEditingCareer(null);
    setCareerFormData({
      id: `role-${Date.now()}`,
      title: '',
      type: 'Full-Time',
      location: 'Hyderabad / Hybrid',
      exp: '2+ Years Exp.',
      tags: ['React', 'TypeScript'],
      desc: '',
    });
    setIsCareerModalOpen(true);
  };

  const handleOpenEditCareer = (role: JobRole) => {
    setEditingCareer(role);
    setCareerFormData({
      ...role,
      tags: [...role.tags],
    });
    setIsCareerModalOpen(true);
  };

  const handleSelectCareerPreset = (title: string) => {
    const preset = CAREER_PRESETS.find((p) => p.title === title);
    if (preset) {
      setCareerFormData((prev) => ({
        ...prev,
        title: preset.title,
        type: preset.type,
        location: preset.location,
        exp: preset.exp,
        tags: [...preset.tags],
        desc: preset.desc,
      }));
    }
  };

  const handleSaveCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerFormData.title.trim() || !careerFormData.desc.trim()) {
      showToast('Please provide a role title and description.');
      return;
    }
    const updated = saveStoredCareer(careerFormData);
    setCareers(updated);
    setIsCareerModalOpen(false);
    showToast(`Role "${careerFormData.title}" saved successfully.`);
  };

  const handleDeleteCareer = (roleIdOrTitle: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete the role "${title}"?`)) {
      const updated = deleteStoredCareer(roleIdOrTitle);
      setCareers(updated);
      showToast(`Removed role "${title}".`);
    }
  };

  const handleResetCareers = () => {
    if (window.confirm('Reset open positions back to default engineering roles?')) {
      const updated = resetStoredCareers();
      setCareers(updated);
      showToast('Careers reset to default roles.');
    }
  };

  // --- PROGRAM ACTIONS ---
  const handleOpenAddProgram = () => {
    setEditingProgram(null);
    setProgramFormData({
      id: `track-${Date.now()}`,
      title: '',
      duration: '10 Weeks',
      level: 'Intermediate',
      stack: '',
      desc: '',
      topics: ['Module Architecture & State', 'Relational DB Modeling', 'Capstone Project & Code Review'],
    });
    setIsProgramModalOpen(true);
  };

  const handleOpenEditProgram = (prog: ProgramTrack) => {
    setEditingProgram(prog);
    setProgramFormData({
      ...prog,
      topics: [...prog.topics],
    });
    setIsProgramModalOpen(true);
  };

  const handleSelectProgramPreset = (title: string) => {
    const preset = PROGRAM_PRESETS.find((p) => p.title === title);
    if (preset) {
      setProgramFormData((prev) => ({
        ...prev,
        title: preset.title,
        duration: preset.duration,
        level: preset.level,
        stack: preset.stack,
        desc: preset.desc,
        topics: [...preset.topics],
      }));
    }
  };

  const handleSaveProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!programFormData.title.trim() || !programFormData.desc.trim()) {
      showToast('Please provide a track title and description.');
      return;
    }
    const updated = saveStoredProgram(programFormData);
    setPrograms(updated);
    setIsProgramModalOpen(false);
    showToast(`Program track "${programFormData.title}" saved successfully.`);
  };

  const handleDeleteProgram = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete program "${title}"?`)) {
      const updated = deleteStoredProgram(id);
      setPrograms(updated);
      showToast(`Removed program "${title}".`);
    }
  };

  const handleResetPrograms = () => {
    if (window.confirm('Reset program tracks back to default curricula?')) {
      const updated = resetStoredPrograms();
      setPrograms(updated);
      showToast('Programs reset to default curricula.');
    }
  };

  // --- INQUIRY ACTIONS ---
  const handleUpdateInquiryStatus = (id: string, newStatus: InquiryItem['status']) => {
    updateInquiryStatus(id, newStatus);
    showToast(`Inquiry status updated to ${newStatus}.`);
  };

  const handleDeleteInquiry = (id: string) => {
    if (window.confirm('Delete this inquiry permanently?')) {
      deleteStoredInquiry(id);
      setSelectedInquiry(null);
      showToast('Inquiry removed from inbox.');
    }
  };

  // --- METRICS ACTIONS ---
  const handleSaveMetrics = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredMetrics(metrics);
    showToast('Homepage metric counters saved successfully!');
  };

  const handleMetricChange = (index: number, field: 'count' | 'label', val: string) => {
    setMetrics((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: val };
      return copy;
    });
  };

  // Filtered lists
  const filteredProjects = projects.filter((p) =>
    p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(projectSearch.toLowerCase())
  );

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.subject.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesFilter = inquiryFilter === 'all' || inq.status === inquiryFilter;
    return matchesSearch && matchesFilter;
  });

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#090C10] text-[#0D0D0D] dark:text-[#FAFAFA] flex flex-col font-sans transition-colors">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-[#0D0D0D] dark:bg-white text-white dark:text-[#0D0D0D] shadow-xl text-xs font-semibold animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Admin Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#11141D]/95 backdrop-blur-md border-b border-[#E2E8F0] dark:border-[#202533] px-4 sm:px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/assets/logo-light.png"
              alt="Weblaze"
              className="h-5 w-auto object-contain block dark:hidden"
            />
            <img
              src="/assets/logo-dark.png"
              alt="Weblaze"
              className="h-5 w-auto object-contain hidden dark:block"
            />
          </Link>
          <span className="h-4 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />
          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/15 border border-[#1E46EB]/15 dark:border-[#67BAF4]/20 text-[10px] font-bold text-[#1765A8] dark:text-[#67BAF4] uppercase font-mono">
            <span>Admin CMS</span>
          </div>
        </div>

        {/* Right header actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-[#0D0D0D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A1F2C] transition-colors"
          >
            <span>Live Web</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>

          {/* Theme switch */}
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className="w-9 h-9 rounded-xl border border-[#E2E8F0] dark:border-[#232734] bg-slate-50 dark:bg-[#161B26] text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-[#1E2433] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4]"
          >
            {darkMode ? (
              <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* Logout */}
          <button
            type="button"
            onClick={() => {
              logoutAdmin();
              onLogout();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl w-full mx-auto px-4 sm:px-6 py-4 md:py-6 gap-4 md:gap-6">
        
        {/* Navigation Sidebar / Mobile Scrollable Tab Strip */}
        <aside className="w-full md:w-60 shrink-0">
          <nav className="p-1.5 md:p-2 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs flex flex-row md:flex-col overflow-x-auto space-x-1.5 md:space-x-0 md:space-y-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`shrink-0 md:w-full flex items-center justify-between px-3 py-2 md:px-3.5 md:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] ${
                activeTab === 'overview'
                  ? 'bg-[#1E46EB] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#0D0D0D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A1F2C]'
              }`}
            >
              <div className="flex items-center gap-2 md:gap-2.5">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Overview</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('projects')}
              className={`shrink-0 md:w-full flex items-center justify-between gap-2 px-3 py-2 md:px-3.5 md:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] ${
                activeTab === 'projects'
                  ? 'bg-[#1E46EB] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#0D0D0D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A1F2C]'
              }`}
            >
              <div className="flex items-center gap-2 md:gap-2.5">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>Portfolio Projects</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                activeTab === 'projects' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {projects.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('careers')}
              className={`shrink-0 md:w-full flex items-center justify-between gap-2 px-3 py-2 md:px-3.5 md:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] ${
                activeTab === 'careers'
                  ? 'bg-[#1E46EB] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#0D0D0D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A1F2C]'
              }`}
            >
              <div className="flex items-center gap-2 md:gap-2.5">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Job Openings</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                activeTab === 'careers' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {careers.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('programs')}
              className={`shrink-0 md:w-full flex items-center justify-between gap-2 px-3 py-2 md:px-3.5 md:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] ${
                activeTab === 'programs'
                  ? 'bg-[#1E46EB] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#0D0D0D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A1F2C]'
              }`}
            >
              <div className="flex items-center gap-2 md:gap-2.5">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Program Tracks</span>
              </div>
              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                activeTab === 'programs' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
              }`}>
                {programs.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('inquiries')}
              className={`shrink-0 md:w-full flex items-center justify-between gap-2 px-3 py-2 md:px-3.5 md:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] ${
                activeTab === 'inquiries'
                  ? 'bg-[#1E46EB] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#0D0D0D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A1F2C]'
              }`}
            >
              <div className="flex items-center gap-2 md:gap-2.5">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Enquiries Inbox</span>
              </div>
              {newInquiriesCount > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500 text-white shrink-0">
                  {newInquiriesCount} new
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('metrics')}
              className={`shrink-0 md:w-full flex items-center justify-between px-3 py-2 md:px-3.5 md:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] ${
                activeTab === 'metrics'
                  ? 'bg-[#1E46EB] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#0D0D0D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A1F2C]'
              }`}
            >
              <div className="flex items-center gap-2 md:gap-2.5">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Stats &amp; Metrics</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('settings')}
              className={`shrink-0 md:w-full flex items-center justify-between px-3 py-2 md:px-3.5 md:py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] ${
                activeTab === 'settings'
                  ? 'bg-[#1E46EB] text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-[#0D0D0D] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#1A1F2C]'
              }`}
            >
              <div className="flex items-center gap-2 md:gap-2.5">
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
              </div>
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0">
          
          {/* ─── TAB 1: OVERVIEW ─── */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div 
                  onClick={() => setActiveTab('projects')}
                  className="p-5 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs cursor-pointer hover:border-[#1E46EB]/40 transition-colors"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">Live Projects</span>
                  <div className="text-3xl font-bold font-display text-[#0D0D0D] dark:text-[#FAFAFA] mt-1">
                    {projects.length}
                  </div>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1 inline-block">
                    Active in Portfolio
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('careers')}
                  className="p-5 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs cursor-pointer hover:border-[#1E46EB]/40 transition-colors"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">Job Roles</span>
                  <div className="text-3xl font-bold font-display text-[#0D0D0D] dark:text-[#FAFAFA] mt-1">
                    {careers.length}
                  </div>
                  <span className="text-xs text-[#1E46EB] dark:text-[#67BAF4] font-medium mt-1 inline-block">
                    Live Open Positions
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('programs')}
                  className="p-5 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs cursor-pointer hover:border-[#1E46EB]/40 transition-colors"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">Program Tracks</span>
                  <div className="text-3xl font-bold font-display text-[#0D0D0D] dark:text-[#FAFAFA] mt-1">
                    {programs.length}
                  </div>
                  <span className="text-xs text-[#1E46EB] dark:text-[#67BAF4] font-medium mt-1 inline-block">
                    Live Training Tracks
                  </span>
                </div>

                <div 
                  onClick={() => setActiveTab('inquiries')}
                  className="p-5 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs cursor-pointer hover:border-[#1E46EB]/40 transition-colors"
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">Total Enquiries</span>
                  <div className="text-3xl font-bold font-display text-[#0D0D0D] dark:text-[#FAFAFA] mt-1">
                    {inquiries.length}
                  </div>
                  <span className="text-xs text-[#1E46EB] dark:text-[#67BAF4] font-medium mt-1 inline-block">
                    {newInquiriesCount} require response
                  </span>
                </div>
              </div>

              {/* Quick Actions & Recent Enquiries */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent Inquiries List */}
                <div className="lg:col-span-8 p-6 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                      Recent Contact Submissions
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs font-semibold text-[#1E46EB] dark:text-[#67BAF4] hover:underline"
                    >
                      View All Inbox →
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100 dark:divide-[#1F2535]">
                    {inquiries.slice(0, 3).map((inq) => (
                      <div key={inq.id} className="py-3.5 flex items-start justify-between gap-4">
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] truncate">
                              {inq.name}
                            </span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              inq.status === 'new'
                                ? 'bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400'
                                : inq.status === 'in_progress'
                                ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}>
                              {inq.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 truncate">{inq.subject} · {inq.email}</p>
                          <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-1">{inq.message}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedInquiry(inq)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-[#1A1F2C] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#252C3D] shrink-0"
                        >
                          Review
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Add Project Promo */}
                <div className="lg:col-span-4 p-6 rounded-2xl bg-gradient-to-br from-[#1E46EB]/10 via-slate-50 to-white dark:from-[#1E46EB]/20 dark:via-[#121620] dark:to-[#121620] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 shadow-xs flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E46EB] dark:text-[#67BAF4] font-mono">
                      Fast Action
                    </span>
                    <h4 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                      Add a New Case Study
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      Publish a new client website or business platform with live screenshot sliders in under 60 seconds.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleOpenAddProject}
                    className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] shadow-md shadow-[#1E46EB]/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4]"
                  >
                    <span>+ New Portfolio Project</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB 2: PORTFOLIO PROJECTS ─── */}
          {activeTab === 'projects' && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Header & Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs">
                <div>
                  <h2 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                    Portfolio Projects ({projects.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Changes here immediately sync with the public <Link to="/portfolio" target="_blank" className="text-[#1E46EB] dark:text-[#67BAF4] underline">/portfolio</Link> page.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <input
                    type="text"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Search projects..."
                    className="px-3.5 py-2 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] w-full sm:w-56"
                  />
                  <button
                    type="button"
                    onClick={handleOpenAddProject}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] shadow-sm shadow-[#1E46EB]/20 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4]"
                  >
                    <span>+ Add Project</span>
                  </button>
                </div>
              </div>

              {/* Projects Table */}
              <div className="rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-[#161B26] border-b border-[#E2E8F0] dark:border-[#202533] text-slate-600 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider font-mono">
                      <tr>
                        <th className="py-3 px-4">Preview</th>
                        <th className="py-3 px-4">Name &amp; Category</th>
                        <th className="py-3 px-4">Type</th>
                        <th className="py-3 px-4">Screenshots</th>
                        <th className="py-3 px-4">Live URL</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#202533]">
                      {filteredProjects.map((p) => (
                        <tr key={p.id} className="hover:bg-slate-50/70 dark:hover:bg-[#161B26]/60 transition-colors">
                          <td className="py-3 px-4">
                            <img
                              src={p.previewImage}
                              alt={p.name}
                              className="w-12 h-8 object-cover rounded-md border border-slate-200 dark:border-slate-700 bg-slate-100"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-[#0D0D0D] dark:text-[#FAFAFA]">{p.name}</div>
                            <div className="text-[11px] text-slate-500">{p.category}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                              p.typeGroup === 'system'
                                ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300'
                                : 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300'
                            }`}>
                              {p.typeGroup === 'system' ? 'System' : 'Website'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-mono text-xs">{p.slideshowImages?.length || 1} slides</span>
                          </td>
                          <td className="py-3 px-4">
                            <a
                              href={p.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#1E46EB] dark:text-[#67BAF4] hover:underline flex items-center gap-1"
                            >
                              <span className="truncate max-w-[160px]">{p.url}</span>
                              <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </a>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleOpenEditProject(p)}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-[#1E2433] text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#2A3245] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4]"
                              >
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteProject(p.id, p.name)}
                                className="px-2 py-1 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB: CAREERS & JOB ROLES ─── */}
          {activeTab === 'careers' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs">
                <div>
                  <h2 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                    Job Roles &amp; Openings ({careers.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Roles configured here immediately update the public <Link to="/careers" target="_blank" className="text-[#1E46EB] dark:text-[#67BAF4] underline">/careers</Link> page.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetCareers}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Reset Defaults
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenAddCareer}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] shadow-sm shadow-[#1E46EB]/20 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB]"
                  >
                    <span>+ Add Role</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {careers.map((role) => (
                  <div
                    key={role.id || role.title}
                    className="p-5 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                          {role.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E7F3FD] dark:bg-[#67BAF4]/15 text-[#1765A8] dark:text-[#67BAF4] shrink-0">
                          {role.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                        {role.desc}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-slate-500 mb-3">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">{role.location}</span>
                        <span>&bull;</span>
                        <span>{role.exp}</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100 dark:border-slate-800">
                        {role.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditCareer(role)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteCareer(role.id || role.title, role.title)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── TAB: CAREER DEVELOPMENT PROGRAMS ─── */}
          {activeTab === 'programs' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs">
                <div>
                  <h2 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                    Program Tracks ({programs.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Programs configured here immediately update the public <Link to="/programs" target="_blank" className="text-[#1E46EB] dark:text-[#67BAF4] underline">/programs</Link> page.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResetPrograms}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    Reset Defaults
                  </button>
                  <button
                    type="button"
                    onClick={handleOpenAddProgram}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] shadow-sm shadow-[#1E46EB]/20 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB]"
                  >
                    <span>+ Add Program</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {programs.map((prog) => (
                  <div
                    key={prog.id}
                    className="p-5 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                          {prog.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E7F3FD] dark:bg-[#67BAF4]/15 text-[#1765A8] dark:text-[#67BAF4] shrink-0">
                          {prog.duration} &bull; {prog.level}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-[#1E46EB] dark:text-[#67BAF4] mb-2">
                        {prog.stack}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mb-3 leading-relaxed">
                        {prog.desc}
                      </p>
                      <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400">
                        {prog.topics.map((t, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="text-[#1E46EB] dark:text-[#67BAF4] font-bold">✓</span>
                            <span>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenEditProgram(prog)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteProgram(prog.id, prog.title)}
                        className="px-3 py-1.5 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ─── TAB 3: INQUIRIES INBOX ─── */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Inbox Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs">
                <div>
                  <h2 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                    Contact Enquiries Inbox ({inquiries.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Messages submitted via the public <Link to="/contact" target="_blank" className="text-[#1E46EB] dark:text-[#67BAF4] underline">/contact</Link> page arrive here instantly.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <input
                    type="text"
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    placeholder="Search enquiries..."
                    className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] w-44 sm:w-52"
                  />
                  {(['all', 'new', 'in_progress', 'closed'] as const).map((filterVal) => (
                    <button
                      key={filterVal}
                      type="button"
                      onClick={() => setInquiryFilter(filterVal)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] ${
                        inquiryFilter === filterVal
                          ? 'bg-[#1E46EB] text-white'
                          : 'bg-slate-100 dark:bg-[#1E2433] text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-[#252C3D]'
                      }`}
                    >
                      {filterVal.replace('_', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Inquiries Table */}
              <div className="rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 dark:bg-[#161B26] border-b border-[#E2E8F0] dark:border-[#202533] text-slate-600 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider font-mono">
                      <tr>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Lead Contact</th>
                        <th className="py-3 px-4">Phone</th>
                        <th className="py-3 px-4">Subject</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0] dark:divide-[#202533]">
                      {filteredInquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50/70 dark:hover:bg-[#161B26]/60 transition-colors">
                          <td className="py-3 px-4 text-slate-500 whitespace-nowrap font-mono text-[11px]">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-[#0D0D0D] dark:text-[#FAFAFA]">{inq.name}</div>
                            <a href={`mailto:${inq.email}`} className="text-slate-500 hover:text-[#1E46EB] dark:hover:text-[#67BAF4]">
                              {inq.email}
                            </a>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px]">
                            <a href={`tel:${inq.phone}`} className="text-slate-700 dark:text-slate-300 hover:text-[#1E46EB]">
                              {inq.phone}
                            </a>
                          </td>
                          <td className="py-3 px-4 font-medium text-[#0D0D0D] dark:text-[#FAFAFA]">
                            {inq.subject}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={inq.status}
                              onChange={(e) => handleUpdateInquiryStatus(inq.id, e.target.value as InquiryItem['status'])}
                              className={`text-[11px] font-bold px-2 py-1 rounded-lg border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] ${
                                inq.status === 'new'
                                  ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                                  : inq.status === 'in_progress'
                                  ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-800'
                                  : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                              }`}
                            >
                              <option value="new">New</option>
                              <option value="in_progress">In Progress</option>
                              <option value="closed">Closed</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="inline-flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setSelectedInquiry(inq)}
                                className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#1E46EB]/10 dark:bg-[#67BAF4]/15 text-[#1E46EB] dark:text-[#67BAF4] hover:bg-[#1E46EB]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4]"
                              >
                                View
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteInquiry(inq.id)}
                                className="px-2 py-1 rounded-lg text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ─── TAB 4: METRICS & STATS ─── */}
          {activeTab === 'metrics' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs">
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                    Homepage Stat Counters
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Edit the animated counters displayed on the homepage hero strip. These update instantly across the site.
                  </p>
                </div>

                <form onSubmit={handleSaveMetrics} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {metrics.map((m, idx) => (
                      <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0D0D0D] space-y-3">
                        <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                          Counter #{idx + 1}
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Counter Value (e.g. 10+, 90%)
                          </label>
                          <input
                            type="text"
                            required
                            value={m.count}
                            onChange={(e) => handleMetricChange(idx, 'count', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#161B26] text-xs font-bold font-mono focus:outline-none focus:ring-2 focus:ring-[#1E46EB]/20"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                            Label Description
                          </label>
                          <input
                            type="text"
                            required
                            value={m.label}
                            onChange={(e) => handleMetricChange(idx, 'label', e.target.value)}
                            className="w-full px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#161B26] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1E46EB]/20"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] shadow-md shadow-[#1E46EB]/20 transition-all cursor-pointer"
                    >
                      Save Counters
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* ─── TAB 5: SETTINGS ─── */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="p-6 rounded-2xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] shadow-xs space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                    Admin Portal Settings
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    System tools and default resets for the Weblaze CMS.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#202533] space-y-4">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0D0D0D]">
                    <div>
                      <div className="text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA]">Reset Portfolio Projects</div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Restores the 10 original flagship projects from the initial Weblaze portfolio showcase.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleResetProjects}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4]"
                    >
                      Reset Showcase
                    </button>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-[#0D0D0D]">
                    <div>
                      <div className="text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA]">Staff Session</div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Logged in as <span className="font-mono text-[#1E46EB] dark:text-[#67BAF4]">admin@weblaze.in</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logoutAdmin();
                        onLogout();
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-200 transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ─── ADD / EDIT PROJECT MODAL ─── */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] dark:border-[#202533]">
              <h3 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                {editingProject ? `Edit Project: ${editingProject.name}` : 'Add New Portfolio Project'}
              </h3>
              <button
                type="button"
                onClick={() => setIsProjectModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectFormData.name}
                    onChange={(e) => setProjectFormData({ ...projectFormData, name: e.target.value })}
                    placeholder="e.g. CAMPUSFLOW ERP"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E46EB]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                    Type Group *
                  </label>
                  <select
                    value={projectFormData.typeGroup}
                    onChange={(e) => setProjectFormData({ ...projectFormData, typeGroup: e.target.value as 'website' | 'system' })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1E46EB]/20"
                  >
                    <option value="website">Website Design &amp; Development</option>
                    <option value="system">Business Software / CRM / POS</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                    Category Tag *
                  </label>
                  <input
                    type="text"
                    required
                    value={projectFormData.category}
                    onChange={(e) => setProjectFormData({ ...projectFormData, category: e.target.value })}
                    placeholder="e.g. Website Design & Development"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1E46EB]/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                    Live Project / Demo URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={projectFormData.url}
                    onChange={(e) => setProjectFormData({ ...projectFormData, url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#1E46EB]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={projectFormData.description}
                  onChange={(e) => setProjectFormData({ ...projectFormData, description: e.target.value })}
                  placeholder="A modern digital presence designed to showcase the brand..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1E46EB]/20"
                />
              </div>

              {/* Screenshots list */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA]">
                    Slideshow Screenshot URLs (For Hover Slider)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setProjectFormData({
                        ...projectFormData,
                        slideshowImages: [...(projectFormData.slideshowImages || []), ''],
                      });
                    }}
                    className="text-xs font-semibold text-[#1E46EB] dark:text-[#67BAF4] hover:underline"
                  >
                    + Add Slide URL
                  </button>
                </div>

                <div className="space-y-2">
                  {(projectFormData.slideshowImages || []).map((imgUrl, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-slate-400 w-5 text-right">{i + 1}.</span>
                      <input
                        type="url"
                        value={imgUrl}
                        onChange={(e) => {
                          const updated = [...(projectFormData.slideshowImages || [])];
                          updated[i] = e.target.value;
                          setProjectFormData({ ...projectFormData, slideshowImages: updated });
                        }}
                        placeholder="https://.../screenshot.jpg"
                        className="flex-1 px-3 py-2 rounded-lg border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#1E46EB]/20"
                      />
                      {(projectFormData.slideshowImages || []).length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (projectFormData.slideshowImages || []).filter((_, idx) => idx !== i);
                            setProjectFormData({ ...projectFormData, slideshowImages: updated });
                          }}
                          className="text-slate-400 hover:text-red-500 p-1"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={Array.isArray(projectFormData.tags) ? projectFormData.tags.join(', ') : projectFormData.tags || ''}
                  onChange={(e) => setProjectFormData({ ...projectFormData, tags: e.target.value as any })}
                  placeholder="e.g. Modern UI, E-Commerce, Fast Performance"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1E46EB]/20"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E2E8F0] dark:border-[#202533]">
                <button
                  type="button"
                  onClick={() => setIsProjectModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] shadow-md shadow-[#1E46EB]/20 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4]"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── ADD / EDIT CAREER ROLE MODAL (WITH PRESET TEMPLATE SELECTOR) ─── */}
      {isCareerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] dark:border-[#202533]">
              <h3 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                {editingCareer ? `Edit Role: ${editingCareer.title}` : 'Add New Engineering Role'}
              </h3>
              <button
                type="button"
                onClick={() => setIsCareerModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Quick Template Selector */}
            <div className="mt-4 p-3.5 rounded-2xl bg-[#E7F3FD]/60 dark:bg-[#1E46EB]/10 border border-[#1E46EB]/20">
              <label className="block text-xs font-bold text-[#1E46EB] dark:text-[#67BAF4] mb-1">
                ⚡ Quick Role Presets (Select to Auto-Fill)
              </label>
              <select
                onChange={(e) => {
                  if (e.target.value) handleSelectCareerPreset(e.target.value);
                }}
                defaultValue=""
                className="w-full px-3 py-2 rounded-xl border border-[#1E46EB]/30 bg-white dark:bg-[#0D0D0D] text-xs font-semibold text-[#0D0D0D] dark:text-[#FAFAFA] focus:outline-none cursor-pointer"
              >
                <option value="">-- Choose a pre-built role preset to avoid retyping --</option>
                {CAREER_PRESETS.map((p) => (
                  <option key={p.title} value={p.title}>
                    {p.title} ({p.type})
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleSaveCareer} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                  Role Title *
                </label>
                <input
                  type="text"
                  required
                  value={careerFormData.title}
                  onChange={(e) => setCareerFormData({ ...careerFormData, title: e.target.value })}
                  placeholder="e.g. Senior Full Stack Developer"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E46EB]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                    Employment Type
                  </label>
                  <select
                    value={careerFormData.type}
                    onChange={(e) => setCareerFormData({ ...careerFormData, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship / Fresher">Internship / Fresher</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={careerFormData.location}
                    onChange={(e) => setCareerFormData({ ...careerFormData, location: e.target.value })}
                    placeholder="e.g. Hyderabad / Hybrid"
                    className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                    Experience
                  </label>
                  <input
                    type="text"
                    value={careerFormData.exp}
                    onChange={(e) => setCareerFormData({ ...careerFormData, exp: e.target.value })}
                    placeholder="e.g. 2+ Years Exp."
                    className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                  Skills &amp; Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={careerFormData.tags.join(', ')}
                  onChange={(e) =>
                    setCareerFormData({
                      ...careerFormData,
                      tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="e.g. React, TypeScript, Node.js, AWS"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                  Role Description &amp; Responsibilities *
                </label>
                <textarea
                  rows={3}
                  required
                  value={careerFormData.desc}
                  onChange={(e) => setCareerFormData({ ...careerFormData, desc: e.target.value })}
                  placeholder="Describe ownership, expectations, and core mission..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1E46EB]/20"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E2E8F0] dark:border-[#202533]">
                <button
                  type="button"
                  onClick={() => setIsCareerModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] shadow-md shadow-[#1E46EB]/20"
                >
                  Save Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── ADD / EDIT PROGRAM TRACK MODAL (WITH PRESET TEMPLATE SELECTOR) ─── */}
      {isProgramModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0] dark:border-[#202533]">
              <h3 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                {editingProgram ? `Edit Track: ${editingProgram.title}` : 'Add Program Track'}
              </h3>
              <button
                type="button"
                onClick={() => setIsProgramModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            {/* Quick Template Selector */}
            <div className="mt-4 p-3.5 rounded-2xl bg-[#E7F3FD]/60 dark:bg-[#1E46EB]/10 border border-[#1E46EB]/20">
              <label className="block text-xs font-bold text-[#1E46EB] dark:text-[#67BAF4] mb-1">
                ⚡ Quick Curriculum Presets (Select to Auto-Fill)
              </label>
              <select
                onChange={(e) => {
                  if (e.target.value) handleSelectProgramPreset(e.target.value);
                }}
                defaultValue=""
                className="w-full px-3 py-2 rounded-xl border border-[#1E46EB]/30 bg-white dark:bg-[#0D0D0D] text-xs font-semibold text-[#0D0D0D] dark:text-[#FAFAFA] focus:outline-none cursor-pointer"
              >
                <option value="">-- Choose a standard track preset to avoid retyping --</option>
                {PROGRAM_PRESETS.map((p) => (
                  <option key={p.title} value={p.title}>
                    {p.title} ({p.duration})
                  </option>
                ))}
              </select>
            </div>

            <form onSubmit={handleSaveProgram} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                  Program Track Title *
                </label>
                <input
                  type="text"
                  required
                  value={programFormData.title}
                  onChange={(e) => setProgramFormData({ ...programFormData, title: e.target.value })}
                  placeholder="e.g. Full Stack Web Engineering"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#1E46EB]/20"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={programFormData.duration}
                    onChange={(e) => setProgramFormData({ ...programFormData, duration: e.target.value })}
                    placeholder="e.g. 12 Weeks"
                    className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                    Target Level
                  </label>
                  <input
                    type="text"
                    value={programFormData.level}
                    onChange={(e) => setProgramFormData({ ...programFormData, level: e.target.value })}
                    placeholder="e.g. Intermediate, Advanced"
                    className="w-full px-3 py-2 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                  Tech Stack (Headline summary)
                </label>
                <input
                  type="text"
                  value={programFormData.stack}
                  onChange={(e) => setProgramFormData({ ...programFormData, stack: e.target.value })}
                  placeholder="e.g. React, TypeScript, Node.js, PostgreSQL"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-mono focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                  Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={programFormData.desc}
                  onChange={(e) => setProgramFormData({ ...programFormData, desc: e.target.value })}
                  placeholder="Program objectives, real client projects involved, etc..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none focus:ring-2 focus:ring-[#1E46EB]/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1">
                  Syllabus Topics (One per line or comma-separated)
                </label>
                <textarea
                  rows={3}
                  value={programFormData.topics.join('\n')}
                  onChange={(e) =>
                    setProgramFormData({
                      ...programFormData,
                      topics: e.target.value.split('\n').map((t) => t.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Component Architecture & State&#10;Relational DB Modeling & Indexing&#10;Live Capstone Project"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-[#202533] bg-slate-50 dark:bg-[#0D0D0D] text-xs font-medium focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#E2E8F0] dark:border-[#202533]">
                <button
                  type="button"
                  onClick={() => setIsProgramModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl text-xs font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] shadow-md shadow-[#1E46EB]/20"
                >
                  Save Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── INQUIRY DETAIL MODAL ─── */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#121620] border border-[#E2E8F0] dark:border-[#202533] p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-[#E2E8F0] dark:border-[#202533]">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                  Lead Details · {new Date(selectedInquiry.createdAt).toLocaleString()}
                </span>
                <h3 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mt-0.5">
                  {selectedInquiry.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#0D0D0D]">
                <span className="text-slate-500 font-medium">Email:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="font-semibold text-[#1E46EB] dark:text-[#67BAF4]">
                  {selectedInquiry.email}
                </a>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#0D0D0D]">
                <span className="text-slate-500 font-medium">Phone:</span>
                <a href={`tel:${selectedInquiry.phone}`} className="font-semibold text-[#1E46EB] dark:text-[#67BAF4] font-mono">
                  {selectedInquiry.phone}
                </a>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-[#0D0D0D]">
                <span className="text-slate-500 font-medium">Subject:</span>
                <span className="font-semibold text-[#0D0D0D] dark:text-[#FAFAFA]">
                  {selectedInquiry.subject}
                </span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#0D0D0D] space-y-1.5">
                <span className="text-slate-500 font-medium block">Message / Business Context:</span>
                <p className="text-[#0D0D0D] dark:text-[#FAFAFA] leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#E2E8F0] dark:border-[#202533]">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) => {
                    const nextStatus = e.target.value as InquiryItem['status'];
                    handleUpdateInquiryStatus(selectedInquiry.id, nextStatus);
                    setSelectedInquiry({ ...selectedInquiry, status: nextStatus });
                  }}
                  className="text-xs font-bold px-2.5 py-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#161B26] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4]"
                >
                  <option value="new">New</option>
                  <option value="in_progress">In Progress</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re: ${encodeURIComponent(selectedInquiry.subject)} - Weblaze Technologies`}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4]"
                >
                  Reply via Email
                </a>
                <button
                  type="button"
                  onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
