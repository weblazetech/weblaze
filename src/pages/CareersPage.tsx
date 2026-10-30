import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CtaBanner from '../components/CtaBanner';
import SpotlightCard from '../components/SpotlightCard';
import { JobRole } from '../types';
import { getStoredCareers } from '../data/adminStore';

export default function CareersPage(): React.JSX.Element {
  const [roles, setRoles] = useState<JobRole[]>(() => getStoredCareers());

  useEffect(() => {
    const handleUpdate = () => {
      setRoles(getStoredCareers());
    };
    window.addEventListener('weblaze_careers_updated', handleUpdate);
    return () => window.removeEventListener('weblaze_careers_updated', handleUpdate);
  }, []);

  return (
    <div className="animate-fade-in-up">
      {/* ─── PAGE HERO ─── */}
      <section className="relative pt-20 pb-16 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#232734]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-4">
            Join The Team
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display max-w-3xl leading-tight">
            Build the next generation<br />of enterprise software.
          </h1>
          <p className="mt-6 text-base sm:text-xl text-[#525866] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
            We are a focused team of engineers, designers, and strategists. We value depth over breadth, ownership over delegation, and craft over output.
          </p>
        </div>
      </section>

      {/* ─── CULTURE PILLARS ─── */}
      <section id="culture" className="py-20 bg-white dark:bg-[#12141B] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-8 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1E46EB] dark:text-[#67BAF4] flex items-center justify-center font-bold text-lg mb-5">
                ◈
              </div>
              <h3 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-2">
                Technical Excellence
              </h3>
              <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                We build production-grade systems. Every engineer here is expected to own their domain, question assumptions, write comprehensive tests, and ship with confidence.
              </p>
            </div>

            <div className="p-8 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1E46EB] dark:text-[#67BAF4] flex items-center justify-center font-bold text-lg mb-5">
                ◉
              </div>
              <h3 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-2">
                Real Ownership
              </h3>
              <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                From architecture decisions to client communication — our team members lead, not just execute. You will see your software in production, deployed and used by thousands.
              </p>
            </div>

            <div id="benefits" className="p-8 rounded-2xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1E46EB] dark:text-[#67BAF4] flex items-center justify-center font-bold text-lg mb-5">
                ◎
              </div>
              <h3 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display mb-2">
                Growth-Focused Culture
              </h3>
              <p className="text-sm text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                Structured mentorship, learning budgets, internal tech tear-downs, and direct collaboration with leadership. Your growth is a core business priority here.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ─── INTERNSHIP & TRAINING PROGRAM ─── */}
      <section id="internships" className="py-20 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-y border-[#E2E8F0] dark:border-[#232734] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl border border-[#E2E8F0] dark:border-[#232734] bg-white dark:bg-[#161922] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4]">
                  Students &amp; Fresh Graduates
                </span>
                <h2 className="text-3xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                  Internship &amp; Training Program
                </h2>
                <p className="text-sm sm:text-base text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                  A structured hands-on program designed for college students and fresh graduates who want to build real-world experience, work on live projects, and earn a verified Weblaze completion certificate.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-semibold text-[#0D0D0D] dark:text-[#FAFAFA]">
                  <div className="flex items-center gap-2"><span className="text-[#1E46EB] dark:text-[#67BAF4]">✓</span> Live Client Project Experience</div>
                  <div className="flex items-center gap-2"><span className="text-[#1E46EB] dark:text-[#67BAF4]">✓</span> Mentor-Led Code Reviews</div>
                  <div className="flex items-center gap-2"><span className="text-[#1E46EB] dark:text-[#67BAF4]">✓</span> Professional Git &amp; CI/CD Workflows</div>
                  <div className="flex items-center gap-2"><span className="text-[#1E46EB] dark:text-[#67BAF4]">✓</span> Online Verifiable Certificate</div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-3 justify-center items-start lg:items-end">
                <Link
                  to="/contact?subject=Careers%20%26%20Internship%20Inquiry&message=I%20would%20like%20to%20apply%20for%20the%20Internship%20%26%20Training%20Program%20at%20Weblaze.#contact-form"
                  state={{
                    subject: 'Careers & Internship Inquiry',
                    message: 'I would like to apply for the Internship & Training Program at Weblaze.',
                  }}
                  viewTransition
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] transition-all duration-150 shadow-md shadow-[#1E46EB]/20 w-full sm:w-auto text-center"
                >
                  Apply for Internship
                </Link>
                <Link
                  to="/contact?subject=Careers%20%26%20Internship%20Inquiry&message=I%20would%20like%20to%20inquire%20about%20program%20syllabus%2C%20batch%20schedules%2C%20and%20details.#contact-form"
                  state={{
                    subject: 'Careers & Internship Inquiry',
                    message: 'I would like to inquire about program syllabus, batch schedules, and details.',
                  }}
                  viewTransition
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold border border-[#E2E8F0] dark:border-[#232734] bg-white dark:bg-[#161922] text-[#0D0D0D] dark:text-[#FAFAFA] hover:bg-slate-50 dark:hover:bg-[#1F232F] transition-all w-full sm:w-auto text-center"
                >
                  Inquire Program Details
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ─── CURRENT OPEN POSITIONS ─── */}
      <section id="openings" className="py-24 bg-white dark:bg-[#12141B] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-3">
              Open Positions
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              Join our engineering team
            </h2>
            <p className="mt-3 text-base text-[#525866] dark:text-[#94A3B8]">
              We hire for potential and precision. If you don't see a perfect match below, apply anyway — we review every application.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {roles.map((role, idx) => (
              <SpotlightCard 
                key={role.id || idx}
                className="p-7 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-2">
                    <h3 className="text-lg font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                      {role.title}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#E7F3FD] dark:bg-[#67BAF4]/15 text-[#1765A8] dark:text-[#67BAF4]">
                      {role.type}
                    </span>
                  </div>
                  <p className="text-xs text-[#525866] dark:text-[#94A3B8] mb-3 max-w-xl">
                    {role.desc}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-[11px] font-medium text-[#525866] dark:text-[#94A3B8]">
                    <span className="font-semibold text-[#0D0D0D] dark:text-[#FAFAFA]">{role.location}</span>
                    <span>&bull;</span>
                    <span>{role.exp}</span>
                    <span>&bull;</span>
                    <span className="font-mono">{role.tags.join(' · ')}</span>
                  </div>
                </div>

                <div className="shrink-0">
                  <Link
                    to={`/contact?subject=Careers%20%26%20Internship%20Inquiry&message=${encodeURIComponent(`Applying for the role: ${role.title} (${role.type}, ${role.location}).`)}#contact-form`}
                    state={{
                      subject: 'Careers & Internship Inquiry',
                      message: `Applying for the role: ${role.title} (${role.type}, ${role.location}).`,
                    }}
                    viewTransition
                    className="group inline-flex items-center gap-2 pl-4 pr-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] active:scale-[0.97] transition-all duration-200 shadow-sm"
                  >
                    <span>Apply for Role</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1 shrink-0 text-sm font-bold">
                      →
                    </span>
                  </Link>
                </div>
              </SpotlightCard>
            ))}
          </div>

        </div>
      </section>

      {/* Shared CTA Banner */}
      <CtaBanner 
        title="Don't see your specific role?" 
        desc="Send your resume and portfolio directly to our engineering leadership at contact@weblaze.in."
        tag="Spontaneous Applications"
      />
    </div>
  );
}
