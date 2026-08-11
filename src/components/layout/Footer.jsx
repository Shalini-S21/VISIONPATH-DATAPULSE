import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Globe, Send, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-emerald-600 text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                Vision<span className="text-emerald-500">Path</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Empowering students and professionals worldwide with AI-driven career guidance, structured learning roadmaps, 1-on-1 industry mentorship, and smart ATS resume acceleration.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-emerald-600 transition-colors">
                <Send className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-emerald-600 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-800 hover:text-white hover:bg-emerald-600 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Platform</h4>
            <ul className="space-y-2">
              <li><Link to="/features" className="hover:text-emerald-400 transition-colors">AI Skill Assessment</Link></li>
              <li><Link to="/features" className="hover:text-emerald-400 transition-colors">Interactive Roadmaps</Link></li>
              <li><Link to="/pricing" className="hover:text-emerald-400 transition-colors">Course Catalog</Link></li>
              <li><Link to="/pricing" className="hover:text-emerald-400 transition-colors">Counselor Booking</Link></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Solutions</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">For Universities</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">For Enterprise Hiring</Link></li>
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">Career Advisors</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">Student Grants</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-emerald-400 transition-colors">Contact Support</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link to="/faq" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 VisionPath Platform. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              All Systems Operational (v2.4.0)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
