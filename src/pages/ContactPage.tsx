import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ContactFormData } from '../types';
import CopyableText from '../components/CopyableText';
import RevealOnScroll from '../components/RevealOnScroll';
import { addStoredInquiry } from '../data/adminStore';

export default function ContactPage(): React.JSX.Element {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    subject: 'New Project Enquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const location = useLocation();

  // Parse prefilled parameters from URL search params or router location state
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const subjectParam = searchParams.get('subject') || (location.state as { subject?: string } | null)?.subject;
    const messageParam = searchParams.get('message') || (location.state as { message?: string } | null)?.message;

    if (subjectParam || messageParam) {
      setFormData((prev) => ({
        ...prev,
        ...(subjectParam ? { subject: subjectParam } : {}),
        ...(messageParam ? { message: messageParam } : {}),
      }));
    }

    // Scroll directly to contact form and focus name field when arriving via #contact-form
    if (location.hash === '#contact-form') {
      const timer = setTimeout(() => {
        const formEl = document.getElementById('contact-form');
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth' });
          const nameInput = document.getElementById('contact-name');
          if (nameInput) {
            nameInput.focus();
          }
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [location.hash, location.search, location.state]);

  const isEmailValid = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isPhoneValid = (phone: string): boolean => {
    const digits = phone.replace(/[\s\-\(\)\+]/g, '');
    return digits.length >= 10 && digits.length <= 15 && /^\d+$/.test(digits);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Please enter your full name.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!isEmailValid(formData.email)) {
      errors.email = 'Please enter a valid email address (e.g. name@domain.com).';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Please enter your phone number.';
    } else if (!isPhoneValid(formData.phone)) {
      errors.phone = 'Please enter a valid phone number (at least 10 digits).';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please describe your project or inquiry.';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Please provide at least 10 characters describing your inquiry.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    // Save lead submission to Admin CMS Inbox
    addStoredInquiry({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject,
      message: formData.message.trim(),
    });

    // Micro-delay simulating secure network transmission with realistic physics
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 650);
  };

  return (
    <div className="animate-fade-in-up">
      {/* ─── PAGE HERO ─── */}
      <section className="relative pt-20 pb-16 bg-[#FAFAFA] dark:bg-[#0D0D0D] border-b border-[#E2E8F0] dark:border-[#232734]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/10 text-[#1765A8] dark:text-[#67BAF4] border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 mb-4 animate-badge-sheen">
            Get In Touch
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#0D0D0D] dark:text-[#FAFAFA] font-display max-w-3xl leading-tight">
            Let's discuss<br />your project.
          </h1>
          <p className="mt-6 text-base sm:text-xl text-[#525866] dark:text-[#94A3B8] max-w-2xl leading-relaxed">
            Reach our technical team directly. No sales layers — just a focused conversation about what you need to build.
          </p>
        </div>
      </section>

      {/* ─── CONTACT DETAILS & FORM ─── */}
      <section className="py-24 bg-white dark:bg-[#12141B] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left Contact Information */}
            <RevealOnScroll direction="left" className="lg:col-span-5 space-y-8">
              
              <div className="p-6 rounded-2xl bg-[#FAFAFA] dark:bg-[#161922] border border-[#E2E8F0] dark:border-[#232734] transition-all hover:border-[#1E46EB]/30 dark:hover:border-[#67BAF4]/30 group">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4] block mb-2">
                  Corporate Office
                </span>
                <p className="text-sm text-[#0D0D0D] dark:text-[#FAFAFA] font-semibold leading-relaxed mb-3">
                  #1-111-1/B-185, 100 Ground Floor, Raghavendra Colony, Kondapur,<br />
                  Hyderabad – 500084, Telangana, India
                </p>
                <CopyableText
                  text="#1-111-1/B-185, 100 Ground Floor, Raghavendra Colony, Kondapur, Hyderabad – 500084, Telangana, India"
                  displayText="Copy full address"
                  className="text-xs font-medium text-[#525866] dark:text-[#94A3B8]"
                />
              </div>

              <div className="p-6 rounded-2xl bg-[#FAFAFA] dark:bg-[#161922] border border-[#E2E8F0] dark:border-[#232734] transition-all hover:border-[#1E46EB]/30 dark:hover:border-[#67BAF4]/30 group">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4] block mb-2">
                  Registered Office
                </span>
                <p className="text-sm text-[#0D0D0D] dark:text-[#FAFAFA] font-semibold leading-relaxed mb-3">
                  #2-5-257/S1, 301, 3rd Floor, Nakkalagutta, Hanamkonda,<br />
                  Telangana – 506001, India
                </p>
                <CopyableText
                  text="#2-5-257/S1, 301, 3rd Floor, Nakkalagutta, Hanamkonda, Telangana – 506001, India"
                  displayText="Copy full address"
                  className="text-xs font-medium text-[#525866] dark:text-[#94A3B8]"
                />
              </div>

              <div className="p-6 rounded-2xl bg-[#FAFAFA] dark:bg-[#161922] border border-[#E2E8F0] dark:border-[#232734] space-y-5">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4] block mb-2">
                    Direct Phone Lines
                  </span>
                  <div className="space-y-2">
                    <div>
                      <CopyableText
                        text="+91 8465067156"
                        href="tel:+918465067156"
                        className="text-sm font-semibold text-[#1E46EB] dark:text-[#67BAF4]"
                      />
                    </div>
                    <div>
                      <CopyableText
                        text="+91 9581745402"
                        href="tel:+919581745402"
                        className="text-sm font-semibold text-[#1E46EB] dark:text-[#67BAF4]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#232734]">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4] block mb-2">
                    Direct Email
                  </span>
                  <div>
                    <CopyableText
                      text="contact@weblaze.in"
                      href="mailto:contact@weblaze.in"
                      className="text-sm font-semibold text-[#1E46EB] dark:text-[#67BAF4]"
                    />
                  </div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#E7F3FD]/40 dark:bg-[#1E46EB]/10 border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#1E46EB]/10 dark:bg-[#67BAF4]/20 text-[#1E46EB] dark:text-[#67BAF4] flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6l4 2" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0D0D0D] dark:text-[#FAFAFA] block mb-0.5">
                    Response SLA Guarantee
                  </span>
                  <p className="text-xs text-[#525866] dark:text-[#94A3B8] leading-relaxed">
                    We review every submission carefully and respond within 1 business day.
                  </p>
                </div>
              </div>

            </RevealOnScroll>

            {/* Right Contact Form */}
            <RevealOnScroll direction="right" delayMs={150} className="lg:col-span-7">
              <div 
                id="contact-form" 
                className="p-8 sm:p-10 rounded-3xl border border-[#E2E8F0] dark:border-[#232734] bg-[#FAFAFA] dark:bg-[#161922] shadow-sm relative overflow-hidden scroll-mt-28"
              >
                
                {submitted ? (
                  <div className="py-12 text-center space-y-5 animate-fade-in-up">
                    <div className="relative inline-flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-4xl mx-auto shadow-inner ring-8 ring-emerald-500/10 animate-[scaleIn_0.35s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                        ✓
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                      Message Received!
                    </h3>
                    <p className="text-sm text-[#525866] dark:text-[#94A3B8] max-w-md mx-auto leading-relaxed">
                      Thank you for contacting Weblaze Technologies. One of our lead technical architects will review your enquiry and get back to you within 24 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'New Project Enquiry',
                          message: '',
                        });
                      }}
                      className="mt-4 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#1E46EB] hover:bg-[#1738BD] active:scale-95 transition-all shadow-md shadow-[#1E46EB]/20 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <h3 className="text-xl font-bold text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
                        Send us a message
                      </h3>
                      <p className="text-xs text-[#525866] dark:text-[#94A3B8] mt-1">
                        Fill in the form below and we'll reach out promptly.
                      </p>
                    </div>

                    {Object.keys(formErrors).length > 0 && (
                      <div 
                        role="alert" 
                        aria-live="polite"
                        className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2.5 animate-fade-in-up"
                      >
                        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" strokeWidth="2" />
                          <path strokeLinecap="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
                        </svg>
                        <span>Please review and complete the required fields highlighted below.</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1.5">
                          Your Name *
                        </label>
                        <div className="relative flex items-center">
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            aria-invalid={!!formErrors.name}
                            aria-describedby={formErrors.name ? "contact-name-error" : undefined}
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value });
                              if (formErrors.name) setFormErrors(prev => ({ ...prev, name: '' }));
                            }}
                            placeholder="e.g. John Doe"
                            className={`w-full px-4 py-3 pr-11 rounded-xl border ${
                              formErrors.name
                                ? 'border-red-500 dark:border-red-400 focus:ring-4 focus:ring-red-500/15 focus:border-red-500'
                                : 'border-[#E2E8F0] dark:border-[#232734] focus:ring-4 focus:ring-[#1E46EB]/15 focus:border-[#1E46EB]'
                            } bg-white dark:bg-[#0D0D0D] text-xs font-medium text-[#0D0D0D] dark:text-[#FAFAFA] placeholder:text-[#94A3B8] dark:placeholder:text-[#525866] focus:outline-none transition-all duration-200`}
                          />
                          <div className="absolute right-3.5 flex items-center pointer-events-none">
                            {formData.name.trim().length >= 2 && !formErrors.name ? (
                              <div
                                title="Valid entry"
                                className="w-5 h-5 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] shadow-sm ring-1 ring-emerald-500/25"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            ) : formErrors.name ? (
                              <div
                                title={formErrors.name}
                                className="w-5 h-5 rounded-full bg-red-500/15 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] ring-1 ring-red-500/25"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                                </svg>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {formErrors.name && (
                          <span id="contact-name-error" className="text-[11px] font-semibold text-red-600 dark:text-red-400 block mt-1">
                            {formErrors.name}
                          </span>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1.5">
                          Your Email *
                        </label>
                        <div className="relative flex items-center">
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            autoComplete="email"
                            spellCheck={false}
                            aria-invalid={!!formErrors.email}
                            aria-describedby={formErrors.email ? "contact-email-error" : undefined}
                            value={formData.email}
                            onChange={(e) => {
                              setFormData({ ...formData, email: e.target.value });
                              if (formErrors.email) setFormErrors(prev => ({ ...prev, email: '' }));
                            }}
                            placeholder="e.g. john@company.com"
                            className={`w-full px-4 py-3 pr-11 rounded-xl border ${
                              formErrors.email
                                ? 'border-red-500 dark:border-red-400 focus:ring-4 focus:ring-red-500/15 focus:border-red-500'
                                : 'border-[#E2E8F0] dark:border-[#232734] focus:ring-4 focus:ring-[#1E46EB]/15 focus:border-[#1E46EB]'
                            } bg-white dark:bg-[#0D0D0D] text-xs font-medium text-[#0D0D0D] dark:text-[#FAFAFA] placeholder:text-[#94A3B8] dark:placeholder:text-[#525866] focus:outline-none transition-all duration-200`}
                          />
                          <div className="absolute right-3.5 flex items-center pointer-events-none">
                            {isEmailValid(formData.email) && !formErrors.email ? (
                              <div
                                title="Valid email"
                                className="w-5 h-5 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] shadow-sm ring-1 ring-emerald-500/25"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            ) : formErrors.email ? (
                              <div
                                title={formErrors.email}
                                className="w-5 h-5 rounded-full bg-red-500/15 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] ring-1 ring-red-500/25"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                                </svg>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {formErrors.email && (
                          <span id="contact-email-error" className="text-[11px] font-semibold text-red-600 dark:text-red-400 block mt-1">
                            {formErrors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone Field */}
                      <div>
                        <label htmlFor="contact-phone" className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1.5">
                          Phone Number *
                        </label>
                        <div className="relative flex items-center">
                          <input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            required
                            autoComplete="tel"
                            aria-invalid={!!formErrors.phone}
                            aria-describedby={formErrors.phone ? "contact-phone-error" : undefined}
                            value={formData.phone}
                            onChange={(e) => {
                              setFormData({ ...formData, phone: e.target.value });
                              if (formErrors.phone) setFormErrors(prev => ({ ...prev, phone: '' }));
                            }}
                            placeholder="+91 XXXXX XXXXX"
                            className={`w-full px-4 py-3 pr-11 rounded-xl border ${
                              formErrors.phone
                                ? 'border-red-500 dark:border-red-400 focus:ring-4 focus:ring-red-500/15 focus:border-red-500'
                                : 'border-[#E2E8F0] dark:border-[#232734] focus:ring-4 focus:ring-[#1E46EB]/15 focus:border-[#1E46EB]'
                            } bg-white dark:bg-[#0D0D0D] text-xs font-medium text-[#0D0D0D] dark:text-[#FAFAFA] placeholder:text-[#94A3B8] dark:placeholder:text-[#525866] focus:outline-none transition-all duration-200`}
                          />
                          <div className="absolute right-3.5 flex items-center pointer-events-none">
                            {isPhoneValid(formData.phone) && !formErrors.phone ? (
                              <div
                                title="Valid phone number"
                                className="w-5 h-5 rounded-full bg-emerald-500/15 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] shadow-sm ring-1 ring-emerald-500/25"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            ) : formErrors.phone ? (
                              <div
                                title={formErrors.phone}
                                className="w-5 h-5 rounded-full bg-red-500/15 dark:bg-red-500/20 text-red-600 dark:text-red-400 flex items-center justify-center animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] ring-1 ring-red-500/25"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
                                </svg>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {formErrors.phone && (
                          <span id="contact-phone-error" className="text-[11px] font-semibold text-red-600 dark:text-red-400 block mt-1">
                            {formErrors.phone}
                          </span>
                        )}
                      </div>

                      {/* Project / Enquiry Field */}
                      <div>
                        <label htmlFor="contact-subject" className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1.5">
                          Project / Enquiry
                        </label>
                        <div className="relative flex items-center">
                          <select
                            id="contact-subject"
                            name="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full px-4 py-3 pr-10 rounded-xl border border-[#E2E8F0] dark:border-[#232734] bg-white dark:bg-[#0D0D0D] text-xs font-medium text-[#0D0D0D] dark:text-[#FAFAFA] focus:outline-none focus:ring-4 focus:ring-[#1E46EB]/15 focus:border-[#1E46EB] transition-all duration-200 cursor-pointer appearance-none"
                          >
                            <option>New Project Enquiry</option>
                            <option>School ERP Demonstration</option>
                            <option>Business Automation Consulting</option>
                            <option>Partnership / Collaboration</option>
                            <option>Careers &amp; Internship Inquiry</option>
                            <option>General Query</option>
                            {!['New Project Enquiry', 'School ERP Demonstration', 'Business Automation Consulting', 'Partnership / Collaboration', 'Careers & Internship Inquiry', 'General Query'].includes(formData.subject) && (
                              <option value={formData.subject}>{formData.subject}</option>
                            )}
                          </select>
                          <div className="absolute right-3.5 flex items-center pointer-events-none text-slate-400 dark:text-slate-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Message Field */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label htmlFor="contact-message" className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA]">
                          Project Details or Message *
                        </label>
                        <div className="flex items-center gap-2">
                          {formData.message.trim().length >= 10 && !formErrors.message && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 dark:text-emerald-400 animate-[scaleIn_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards] bg-emerald-500/10 dark:bg-emerald-500/20 px-2 py-0.5 rounded-full ring-1 ring-emerald-500/20">
                              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                              Ready
                            </span>
                          )}
                          <span className="text-[10px] text-[#525866] dark:text-[#94A3B8]">
                            {formData.message.length} characters
                          </span>
                        </div>
                      </div>
                      <textarea
                        id="contact-message"
                        name="message"
                        required
                        rows={4}
                        aria-invalid={!!formErrors.message}
                        aria-describedby={formErrors.message ? "contact-message-error" : undefined}
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (formErrors.message) setFormErrors(prev => ({ ...prev, message: '' }));
                        }}
                        placeholder="Describe your timeline, business context, or technology requirements..."
                        className={`w-full px-4 py-3 rounded-xl border ${
                          formErrors.message
                            ? 'border-red-500 dark:border-red-400 focus:ring-4 focus:ring-red-500/15 focus:border-red-500'
                            : 'border-[#E2E8F0] dark:border-[#232734] focus:ring-4 focus:ring-[#1E46EB]/15 focus:border-[#1E46EB]'
                        } bg-white dark:bg-[#0D0D0D] text-xs font-medium text-[#0D0D0D] dark:text-[#FAFAFA] placeholder:text-[#94A3B8] dark:placeholder:text-[#525866] focus:outline-none transition-all duration-200`}
                      />
                      {formErrors.message && (
                        <span id="contact-message-error" className="text-[11px] font-semibold text-red-600 dark:text-red-400 block mt-1">
                          {formErrors.message}
                        </span>
                      )}
                    </div>

                    {/* Interactive Submit Button with Physics */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group/btn overflow-hidden inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] active:scale-[0.98] transition-all duration-150 shadow-md shadow-[#1E46EB]/25 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {/* Specular Light Sweep on Hover (Desktop) & Perpetual Sheen Slide (Mobile) */}
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 -left-[100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-[20deg] animate-sheen-slide md:animate-none md:transition-all md:duration-700 md:ease-out md:group-hover/btn:left-[100%] pointer-events-none"
                      />

                      {isSubmitting ? (
                        <span className="inline-flex items-center gap-2 relative z-10">
                          <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          <span>Dispatching Message...</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 relative z-10">
                          <span>Send Message</span>
                          <svg className="w-4 h-4 transition-transform duration-200 group-hover/btn:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </form>
                )}

              </div>
            </RevealOnScroll>

          </div>
        </div>
      </section>

    </div>
  );
}
