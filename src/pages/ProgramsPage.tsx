import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';
import SpotlightCard from '../components/SpotlightCard';
import { ProgramTrack } from '../types';
import { getStoredPrograms } from '../data/adminStore';

export default function ProgramsPage(): React.JSX.Element {
  const [programs, setPrograms] = useState<ProgramTrack[]>(() => getStoredPrograms());

  useEffect(() => {
    const handleUpdate = () => {
      setPrograms(getStoredPrograms());
    };
    window.addEventListener('weblaze_programs_updated', handleUpdate);
    return () => window.removeEventListener('weblaze_programs_updated', handleUpdate);
  }, []);

  return (
    <div className="animate-fade-in-up">
      {/* ─── PAGE HERO ─── */}
      <section id="overview" className="relative pt-20 pb-16 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#232734]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-4">
            Career Development Programs
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display max-w-3xl leading-tight">
            Build skills that<br />get you hired.
          </h1>
          <p className="mt-6 text-base sm:text-xl text-[#525866] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
            Structured, mentor-led programs designed for college students and fresh graduates who want to build real engineering skills, work on live projects, and launch their tech careers with confidence.
          </p>

          <div className="flex flex-wrap gap-4 mt-8">
            <a
              href="#programs-list"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] transition-all shadow-md shadow-[#1E46EB]/20"
            >
              Explore Programs
            </a>
            <Link
              to="/contact?subject=Careers%20%26%20Internship%20Inquiry&message=I%20would%20like%20to%20inquire%20about%20admission%20status%20and%20batch%20enrollment%20for%20Weblaze%20Career%20Development%20Programs.#contact-form"
              state={{
                subject: 'Careers & Internship Inquiry',
                message: 'I would like to inquire about admission status and batch enrollment for Weblaze Career Development Programs.',
              }}
              viewTransition
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold border border-[#E2E8F0] dark:border-[#232734] bg-white dark:bg-[#161922] text-[#0D0D0D] dark:text-[#FAFAFA] hover:bg-slate-50 dark:hover:bg-[#1F232F] transition-all"
            >
              Apply / Inquire Status
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY WEBLAZE PROGRAMS ─── */}
      <section className="py-20 bg-white dark:bg-[#12141B] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4]">
              Why Weblaze Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mt-2">
              Learning that translates to real-world results
            </h2>
            <p className="mt-3 text-base text-[#525866] dark:text-[#94A3B8]">
              We don't teach theory in isolation. Every week is designed around real deliverables, professional code reviews, and the kind of mentorship that accelerates your career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] shadow-sm">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1E46EB] dark:text-[#67BAF4] mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-2">Live Project Work</h3>
              <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                Every program involves working on real client platforms. Your code is merged into production, not discarded in a toy sandbox.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] shadow-sm">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1E46EB] dark:text-[#67BAF4] mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-2">Senior Mentorship</h3>
              <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                Work directly with experienced software engineers — not TAs or forum bots. Receive structured weekly 1-on-1 code architecture guidance.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] shadow-sm">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1E46EB] dark:text-[#67BAF4] mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-2">Verified Certificate</h3>
              <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                Earn a verified Weblaze completion certificate — with a unique verification code and online portal validation for your LinkedIn profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PROGRAM TRACKS LISTING ─── */}
      <section id="programs-list" className="py-24 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-t border-[#E2E8F0] dark:border-[#232734] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-3">
              Available Programs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              Choose your career track
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {programs.map((prog) => (
              <SpotlightCard 
                key={prog.id}
                id={prog.id}
                className="p-8 rounded-3xl shadow-sm hover:border-[#1E46EB]/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-bold text-[#1E46EB] dark:text-[#67BAF4] bg-[#E7F3FD] dark:bg-[#67BAF4]/15 px-3 py-1 rounded-full border border-[#1E46EB]/20 dark:border-[#67BAF4]/20">
                      {prog.duration} &bull; {prog.level}
                    </span>
                    <span className="text-[11px] font-semibold text-[#525866] dark:text-[#94A3B8]">
                      Batch Open
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-3">
                    {prog.title}
                  </h3>
                  <p className="text-xs font-mono text-[#1E46EB] dark:text-[#67BAF4] mb-3">
                    {prog.stack}
                  </p>
                  <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed mb-6">
                    {prog.desc}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-[#E2E8F0] dark:border-[#232734]">
                    {prog.topics.map((t, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#0D0D0D] dark:text-[#FAFAFA]">
                        <span className="text-[#1E46EB] dark:text-[#67BAF4] font-bold">✓</span>
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-[#E2E8F0] dark:border-[#232734]">
                  <Link
                    to={`/contact?subject=Careers%20%26%20Internship%20Inquiry&message=${encodeURIComponent(`I would like to enroll in the ${prog.title} (${prog.duration}, ${prog.level}). Tech Stack: ${prog.stack}. Please share upcoming batch dates and registration details.`)}#contact-form`}
                    state={{
                      subject: 'Careers & Internship Inquiry',
                      message: `I would like to enroll in the ${prog.title} (${prog.duration}, ${prog.level}). Tech Stack: ${prog.stack}. Please share upcoming batch dates and registration details.`,
                    }}
                    viewTransition
                    className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] active:scale-[0.97] transition-all shadow-md shadow-[#1E46EB]/20 text-center"
                  >
                    <span>Enroll in Program</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1 shrink-0 text-base font-bold">
                      →
                    </span>
                  </Link>
                </div>
              </SpotlightCard>
            ))}
          </div>

        </div>
      </section>

      {/* ─── COLLEGE & INSTITUTIONAL PARTNERSHIPS ─── */}
      <section id="institutions" className="py-20 bg-white dark:bg-[#12141B] border-t border-[#E2E8F0] dark:border-[#232734] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4] mb-2 block">
                Academic &amp; University Partnerships
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                Partner with Weblaze for Campus Training
              </h3>
              <p className="mt-3 text-sm sm:text-base text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                We collaborate with engineering colleges and universities to conduct technical bootcamps, faculty development programs, and direct campus placement pipelines.
              </p>
            </div>
            <Link
              to="/contact"
              viewTransition
              className="shrink-0 inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] transition-all duration-150 shadow-md shadow-[#1E46EB]/20"
            >
              Partner With Us
            </Link>
          </div>
        </div>
      </section>

      {/* Shared CTA Banner */}
      <CtaBanner 
        title="Ready to fast-track your tech career?" 
        desc="Connect with our program advisors to find the curriculum that best matches your aspirations."
        tag="Student Applications Open"
      />
    </div>
  );
}
