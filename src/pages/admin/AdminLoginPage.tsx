import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginAdmin } from '../../data/adminStore';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
}

export default function AdminLoginPage({ onLoginSuccess }: AdminLoginPageProps): React.JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      const ok = loginAdmin(email, password);
      setIsLoading(false);
      if (ok) {
        onLoginSuccess();
      } else {
        setError('Invalid credentials. Please use admin@weblaze.in / weblaze2026.');
      }
    }, 450);
  };

  const handleDemoFill = () => {
    setEmail('admin@weblaze.in');
    setPassword('weblaze2026');
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 bg-[#FAFAFA] dark:bg-[#0A0D14] transition-colors relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div 
        aria-hidden="true" 
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#1E46EB]/15 dark:bg-[#67BAF4]/10 blur-3xl pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#67BAF4]/15 dark:bg-[#1E46EB]/10 blur-3xl pointer-events-none" 
      />

      <div className="w-full max-w-md relative z-10 animate-fade-in-up">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block py-2 mb-3">
            <img
              src="/assets/logo-light.png"
              alt="Weblaze"
              className="h-6 w-auto object-contain block dark:hidden mx-auto"
            />
            <img
              src="/assets/logo-dark.png"
              alt="Weblaze"
              className="h-6 w-auto object-contain hidden dark:block mx-auto"
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E7F3FD] dark:bg-[#67BAF4]/15 border border-[#1E46EB]/20 dark:border-[#67BAF4]/20 text-[11px] font-bold uppercase tracking-wider text-[#1765A8] dark:text-[#67BAF4] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#1E46EB] dark:bg-[#67BAF4] animate-pulse" />
            Control Management Portal
          </div>
          <h1 className="text-2xl font-bold font-display text-[#0D0D0D] dark:text-[#FAFAFA] mt-3">
            Sign in to Weblaze CMS
          </h1>
          <p className="text-xs text-[#525866] dark:text-[#94A3B8] mt-1">
            Manage projects, view inquiries, and update site metrics
          </p>
        </div>

        {/* Login Card */}
        <div className="p-7 sm:p-8 rounded-3xl border border-[#E2E8F0] dark:border-[#232734] bg-white/95 dark:bg-[#121620]/95 backdrop-blur-xl shadow-xl shadow-black/5 dark:shadow-black/50">
          {error && (
            <div className="mb-5 p-3.5 rounded-xl border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center gap-2.5 animate-fade-in-up">
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="2" />
                <path strokeLinecap="round" strokeWidth="2" d="M12 8v4m0 4h.01" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-1.5">
                Staff Email Address
              </label>
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@weblaze.in"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#232734] bg-slate-50/50 dark:bg-[#0D0D0D] text-xs font-medium text-[#0D0D0D] dark:text-[#FAFAFA] focus:outline-none focus:ring-4 focus:ring-[#1E46EB]/15 focus:border-[#1E46EB] transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-[#0D0D0D] dark:text-[#FAFAFA]">
                  Admin Password
                </label>
                <button
                  type="button"
                  onClick={handleDemoFill}
                  className="text-[11px] font-semibold text-[#1E46EB] dark:text-[#67BAF4] hover:underline cursor-pointer"
                >
                  Quick Demo Fill
                </button>
              </div>
              <input
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-[#E2E8F0] dark:border-[#232734] bg-slate-50/50 dark:bg-[#0D0D0D] text-xs font-medium text-[#0D0D0D] dark:text-[#FAFAFA] focus:outline-none focus:ring-4 focus:ring-[#1E46EB]/15 focus:border-[#1E46EB] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#1E46EB] hover:bg-[#1738BD] active:scale-[0.98] shadow-md shadow-[#1E46EB]/25 transition-all disabled:opacity-70 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <svg className="w-4 h-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>

          {/* Demo hint banner */}
          <div className="mt-6 pt-5 border-t border-[#E2E8F0] dark:border-[#232734] text-center">
            <p className="text-[11px] text-[#525866] dark:text-[#94A3B8]">
              Default Demo: <span className="font-mono text-[#0D0D0D] dark:text-[#FAFAFA]">admin@weblaze.in</span> / <span className="font-mono text-[#0D0D0D] dark:text-[#FAFAFA]">weblaze2026</span>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            to="/"
            className="text-xs font-medium text-[#525866] dark:text-[#94A3B8] hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors"
          >
            ← Return to public website
          </Link>
        </div>
      </div>
    </div>
  );
}
