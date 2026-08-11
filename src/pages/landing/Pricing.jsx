import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Sparkles, Zap } from 'lucide-react';
import Button from '../../components/ui/Button';

export const Pricing = () => {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: 'Student Starter',
      price: '$0',
      period: 'Forever Free',
      description: 'Essential AI career roadmap & course catalog for university students.',
      features: [
        '1 Active AI Career Roadmap',
        'Basic Skill Gap Assessment',
        'Access to Free Courses',
        'Community Forum Access',
        'Standard ATS Resume Check'
      ],
      cta: 'Get Started Free',
      popular: false
    },
    {
      name: 'Pro Career Acceleration',
      price: isAnnual ? '$29' : '$39',
      period: '/ month',
      description: 'Full platform access with unlimited AI tools, resume scanner, and mock interviews.',
      features: [
        'Unlimited AI Career Roadmaps',
        'Unlimited ATS Resume Scans & Edits',
        'AI Interview Prep Simulator',
        '1 Monthly 1-on-1 Counselor Call',
        'Full Course Catalog Access',
        'Direct Job Application Pipeline'
      ],
      cta: 'Start 14-Day Free Trial',
      popular: true
    },
    {
      name: 'Enterprise / Campus',
      price: 'Custom',
      period: 'Institutional',
      description: 'Dedicated portal for university career centers & enterprise hiring pipelines.',
      features: [
        'Unlimited Student & Counselor Seats',
        'Custom Campus Curriculum Roadmaps',
        'Dedicated Account Manager',
        'Admin Analytics & Placement Reports',
        'SSO & LMS API Integration'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
          Transparent Pricing Plans
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
          Invest In Your Career Acceleration
        </h1>
        <p className="text-base text-gray-600 dark:text-gray-300">
          Transparent plans for students, job seekers, and university career departments.
        </p>

        {/* Annual Toggle */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <span className={`text-xs font-semibold ${!isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>Monthly</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-12 h-6 rounded-full bg-emerald-600 p-1 flex items-center transition-colors focus:outline-none"
          >
            <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          <span className={`text-xs font-semibold ${isAnnual ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
            Annual <span className="text-emerald-600 font-bold">(Save 25%)</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`relative p-8 rounded-3xl bg-white dark:bg-slate-800/80 border transition-all duration-300 flex flex-col justify-between ${
              plan.popular
                ? 'border-emerald-500 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500'
                : 'border-gray-200 dark:border-slate-700'
            }`}
          >
            {plan.popular && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Most Popular
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{plan.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{plan.description}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-xs text-gray-500">{plan.period}</span>
              </div>

              <ul className="space-y-3 pt-2">
                {plan.features.map((feat, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-2.5 text-xs text-gray-700 dark:text-gray-300">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-8">
              <Link to="/register">
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  size="lg"
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
