import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProjectItem } from '../types';
import { getStoredProjects } from '../data/adminStore';
import ProjectCard from '../components/ProjectCard';
import CtaBanner from '../components/CtaBanner';

type FilterCategory = 'all' | 'website' | 'system';

export default function PortfolioPage(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [projects, setProjects] = useState<ProjectItem[]>(() => getStoredProjects());

  useEffect(() => {
    document.title = 'Selected Work & Portfolio — Weblaze';

    const handleUpdate = () => {
      setProjects(getStoredProjects());
    };

    window.addEventListener('weblaze_projects_updated', handleUpdate);
    return () => window.removeEventListener('weblaze_projects_updated', handleUpdate);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter((p) => p.typeGroup === activeFilter);
  }, [projects, activeFilter]);

  const websiteCount = projects.filter((p) => p.typeGroup === 'website').length;
  const systemCount = projects.filter((p) => p.typeGroup === 'system').length;

  return (
    <div className="animate-fade-in-up">
      {/* ─── PAGE HERO ─── */}
      <section className="relative pt-20 pb-16 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#232734]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1E46EB] dark:bg-[#67BAF4] animate-pulse" />
            Selected Work
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display max-w-3xl leading-tight text-balance">
            Software we’ve built.<br />Products that work.
          </h1>

          <p className="mt-6 text-base sm:text-xl text-[#525866] dark:text-[#94A3B8] max-w-2xl leading-relaxed text-balance">
            A selection of customer-facing websites, digital brand experiences, and internal business platforms designed and engineered by Weblaze.
          </p>

          {/* Quick Metrics Strip */}
          <div className="mt-8 flex flex-wrap items-center gap-6 pt-6 border-t border-[#E2E8F0] dark:border-[#232734]/80 text-xs sm:text-sm font-medium text-[#525866] dark:text-[#94A3B8]">
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold font-display text-[#0D0D0D] dark:text-[#FAFAFA]">10+</span>
              <span>Live Deployments</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">&bull;</span>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold font-display text-[#0D0D0D] dark:text-[#FAFAFA]">100%</span>
              <span>Custom Engineered</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">&bull;</span>
            <div className="flex items-center gap-2">
              <span className="text-xl sm:text-2xl font-bold font-display text-[#0D0D0D] dark:text-[#FAFAFA]">99.9%</span>
              <span>Uptime Reliability</span>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FILTER TABS & PROJECTS SHOWCASE ─── */}
      <section className="py-16 sm:py-20 bg-white dark:bg-[#12141B] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-[#E2E8F0] dark:border-[#232734]">
            <div className="flex items-center gap-2 p-1.5 rounded-xl bg-slate-100 dark:bg-[#161922] border border-[#E2E8F0] dark:border-[#232734] w-full sm:w-auto overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] ${
                  activeFilter === 'all'
                    ? 'bg-white dark:bg-[#1E46EB] text-[#1E46EB] dark:text-white shadow-xs'
                    : 'text-[#525866] dark:text-[#94A3B8] hover:text-[#0D0D0D] dark:hover:text-white'
                }`}
              >
                All Projects ({projects.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('website')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] ${
                  activeFilter === 'website'
                    ? 'bg-white dark:bg-[#1E46EB] text-[#1E46EB] dark:text-white shadow-xs'
                    : 'text-[#525866] dark:text-[#94A3B8] hover:text-[#0D0D0D] dark:hover:text-white'
                }`}
              >
                Websites &amp; Brand ({websiteCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('system')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1E46EB] dark:focus-visible:ring-[#67BAF4] ${
                  activeFilter === 'system'
                    ? 'bg-white dark:bg-[#1E46EB] text-[#1E46EB] dark:text-white shadow-xs'
                    : 'text-[#525866] dark:text-[#94A3B8] hover:text-[#0D0D0D] dark:hover:text-white'
                }`}
              >
                Business Systems &amp; CRM ({systemCount})
              </button>
            </div>

            <div className="text-xs text-[#525866] dark:text-[#94A3B8] flex items-center gap-2">
              <svg className="w-4 h-4 text-[#1E46EB] dark:text-[#67BAF4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
              </svg>
              <span>
                <span className="hidden md:inline">Hover card to preview live screenshot gallery</span>
                <span className="md:hidden">Swipe or tap to preview screenshot gallery</span>
              </span>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="mt-10">
            {activeFilter === 'all' ? (
              <div className="space-y-16">
                {/* 1. Customer-Facing Websites */}
                <div>
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E46EB] dark:text-[#67BAF4] font-mono">
                      Selected Websites
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mt-1">
                      Built for real businesses.
                    </h2>
                    <p className="text-sm text-[#525866] dark:text-[#94A3B8] mt-1 max-w-xl">
                      From bespoke brand showrooms to e-commerce and visual archives designed for high engagement and conversion.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                    {projects.filter((p) => p.typeGroup === 'website').map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>

                {/* 2. Business Systems & Platforms */}
                <div className="pt-8 border-t border-[#E2E8F0] dark:border-[#232734]">
                  <div className="mb-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E46EB] dark:text-[#67BAF4] font-mono">
                      Business Software
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mt-1">
                      Beyond websites.
                    </h2>
                    <p className="text-sm text-[#525866] dark:text-[#94A3B8] mt-1 max-w-xl">
                      Software engineered to streamline corporate pipelines, lead tracking, and point-of-sale retail operations.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {projects.filter((p) => p.typeGroup === 'system').map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            )}
          </div>

          {/* Interactive Info Banner */}
          <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#E7F3FD]/60 via-slate-50 to-[#E7F3FD]/40 dark:from-[#161922] dark:via-[#1A1E29] dark:to-[#161922] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                Want to see a customized demo for your industry?
              </h4>
              <p className="text-sm text-[#525866] dark:text-[#94A3B8]">
                We build interactive prototypes, proof-of-concepts, and custom architecture audits for prospective partners.
              </p>
            </div>
            <Link
              to="/contact"
              viewTransition
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1E46EB] hover:bg-[#1738C2] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#1E46EB]/20 transition-all shrink-0"
            >
              <span>Schedule a Demo</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>

        </div>
      </section>

      {/* ─── CALL TO ACTION BANNER ─── */}
      <CtaBanner
        tag="Start Your Next Project"
        title="Ready to build software that elevates your business?"
        desc="Whether you need an immersive brand web application or a mission-critical operations system, our engineering team is ready."
      />
    </div>
  );
}
