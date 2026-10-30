import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import CopyableText from './CopyableText';

export default function Footer(): React.JSX.Element {
  const location = useLocation();

  return (
    <footer id="footer" className="bg-[#FAFAFA] dark:bg-[#0A0A0A] border-t border-[#E2E8F0] dark:border-[#232734] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#E2E8F0] dark:border-[#232734]">
          
          {/* Brand Information & Legal */}
          <div className="lg:col-span-5 space-y-4">
            <Link 
              to="/" 
              viewTransition 
              onClick={(e) => {
                if (location.pathname === '/') {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="flex items-center py-1"
            >
              <img
                src="/assets/logo-light.png"
                alt="Weblaze"
                className="h-[22px] sm:h-6 w-auto object-contain block dark:hidden"
              />
              <img
                src="/assets/logo-dark.png"
                alt="Weblaze"
                className="h-[22px] sm:h-6 w-auto object-contain hidden dark:block"
              />
            </Link>
            <div className="text-xs text-[#525866] dark:text-[#94A3B8] space-y-1">
              <p className="font-semibold text-[#0D0D0D] dark:text-[#FAFAFA]">Weblaze Technologies India Private Limited</p>
              <div className="flex items-center gap-1.5">
                <span>CIN:</span>
                <CopyableText text="U62099TS2024PTC189987" className="font-mono text-[#0D0D0D] dark:text-[#FAFAFA]" />
              </div>
            </div>
            <p className="text-xs text-[#525866] dark:text-[#94A3B8] leading-relaxed max-w-sm">
              Custom software solutions engineered for performance, security, and long-term scale. Building reliable technology for businesses across India.
            </p>
            <div className="pt-2 space-y-2.5 text-xs font-medium text-[#525866] dark:text-[#94A3B8]">
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#1E46EB] dark:text-[#67BAF4] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div className="flex flex-wrap items-center gap-2">
                  <CopyableText text="+91 8465067156" href="tel:+918465067156" />
                  <span>&bull;</span>
                  <CopyableText text="+91 9581745402" href="tel:+919581745402" />
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <svg className="w-4 h-4 text-[#1E46EB] dark:text-[#67BAF4] shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <CopyableText text="contact@weblaze.in" href="mailto:contact@weblaze.in" className="text-[#1E46EB] dark:text-[#67BAF4] font-semibold" />
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              Company
            </h5>
            <ul className="space-y-2 text-xs text-[#525866] dark:text-[#94A3B8]">
              <li><Link to="/about" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">About Us</Link></li>
              <li><Link to="/portfolio" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Portfolio</Link></li>
              <li><Link to="/industries" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Industries</Link></li>
              <li><Link to="/about#leadership" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Leadership</Link></li>
              <li><Link to="/about#timeline" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Our Journey</Link></li>
              <li><Link to="/about#why-us" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Why Choose Us</Link></li>
              <li><Link to="/careers" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Careers</Link></li>
              <li><Link to="/programs" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Career Programs</Link></li>
              <li><Link to="/contact" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              Services
            </h5>
            <ul className="space-y-2 text-xs text-[#525866] dark:text-[#94A3B8]">
              <li><Link to="/services#custom-software" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Custom Software</Link></li>
              <li><Link to="/services#web-apps" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Web Development</Link></li>
              <li><Link to="/services#mobile-apps" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Mobile Apps</Link></li>
              <li><Link to="/services#ai-ml" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">AI &amp; ML Solutions</Link></li>
              <li><Link to="/services#cloud-devops" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">Cloud &amp; DevOps</Link></li>
              <li><Link to="/solutions#school-erp" viewTransition className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors">School ERP</Link></li>
            </ul>
          </div>

          {/* Offices */}
          <div className="lg:col-span-3 space-y-4">
            <h5 className="text-xs font-bold uppercase tracking-wider text-[#0D0D0D] dark:text-[#FAFAFA] font-display">
              Offices
            </h5>
            <div className="space-y-3 text-xs text-[#525866] dark:text-[#94A3B8]">
              <div>
                <span className="block font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-0.5">Corporate Office</span>
                <p className="leading-relaxed">#1-111-1/B-185, 100 Ground Floor, Raghavendra Colony, Kondapur, Hyderabad – 500084</p>
              </div>
              <div>
                <span className="block font-bold text-[#0D0D0D] dark:text-[#FAFAFA] mb-0.5">Registered Office</span>
                <p className="leading-relaxed">#2-5-257/S1, 301, 3rd Floor, Nakkalagutta, Hanamkonda, Telangana – 506001</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#525866] dark:text-[#94A3B8] gap-4 text-center sm:text-left">
          <p>&copy; {new Date().getFullYear()} Weblaze Technologies India Pvt. Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-5 sm:gap-x-6 gap-y-2">
            <Link to="/privacy" viewTransition className="hover:text-[#0D0D0D] dark:hover:text-[#FAFAFA] transition-colors">Privacy Policy</Link>
            <Link to="/terms" viewTransition className="hover:text-[#0D0D0D] dark:hover:text-[#FAFAFA] transition-colors">Terms of Service</Link>
            <Link to="/contact" viewTransition className="hover:text-[#0D0D0D] dark:hover:text-[#FAFAFA] transition-colors">Contact</Link>
            <Link 
              to="/admin" 
              viewTransition 
              title="Staff / Admin Portal"
              className="hover:text-[#1E46EB] dark:hover:text-[#67BAF4] transition-colors inline-flex items-center gap-1 opacity-70 hover:opacity-100"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Staff Portal</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
