import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import SearchBar from '../../components/common/SearchBar';

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIdx, setOpenIdx] = useState(0);

  const faqs = [
    {
      q: 'How does VisionPath calculate AI Career Recommendations?',
      a: 'VisionPath evaluates your assessment test results, educational background, verified skills, and project history against current hiring requirements scraped from top tech recruiters. It then calculates an index score to generate custom roadmaps.'
    },
    {
      q: 'Is VisionPath free for college & university students?',
      a: 'Yes! The Student Starter plan is 100% free forever and provides full access to initial skill assessments, fundamental learning roadmaps, course previews, and basic resume checks.'
    },
    {
      q: 'How does counselor booking work on the platform?',
      a: 'Students can browse certified counselors by track, view available calendar time slots, and schedule 1-on-1 video calls. Counselors review incoming requests and accept bookings directly inside their portal.'
    },
    {
      q: 'How accurate is the AI Resume ATS Analyzer?',
      a: 'Our ATS Scanner tests your resume format and syntax against standard ATS parsers (Lever, Greenhouse, Workday) to highlight missing skill keywords, formatting errors, and metric bullet density.'
    },
    {
      q: 'Can universities integrate VisionPath into their career centers?',
      a: 'Absolutely. We offer Enterprise Campus integrations with SSO support, LMS compatibility, custom university branding, and administrative cohort reports for university career directors.'
    }
  ];

  const filteredFaqs = faqs.filter(f =>
    f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12">
      <div className="text-center space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Frequently Asked Questions
        </span>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
          Everything You Need To Know
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Find instant answers regarding features, pricing, counselor booking, and account management.
        </p>

        <div className="pt-4 max-w-xl mx-auto">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search questions (e.g. ATS, Counselor, Free plan)..."
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center text-xs text-gray-500">
            No matching questions found for "{searchQuery}".
          </div>
        ) : (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-gray-200 dark:border-slate-700 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-gray-900 dark:text-white focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-200/50 dark:border-slate-700/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FAQ;
