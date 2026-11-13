import React, { useState } from 'react';
import { PortalWrapper } from './PortalWrapper';
import { 
  Globe, 
  Cpu, 
  Smartphone, 
  Database, 
  Cloud, 
  Sparkles, 
  CheckCircle2, 
  Calculator, 
  ExternalLink
} from 'lucide-react';

interface NexoraShowcasePortalProps {
  onBack: () => void;
}

export const NexoraShowcasePortal: React.FC<NexoraShowcasePortalProps> = ({ onBack }) => {
  // Interactive Project Cost Estimator state
  const [projectType, setProjectType] = useState<'ai' | 'web' | 'mobile' | 'enterprise'>('ai');
  const [timelineWeeks, setTimelineWeeks] = useState(6);
  const [needDevOps, setNeedDevOps] = useState(true);
  const [needMultiPlatform, setNeedMultiPlatform] = useState(true);

  // Estimator calculation
  const baseCost = projectType === 'ai' ? 4500 : projectType === 'enterprise' ? 6000 : projectType === 'mobile' ? 3500 : 2800;
  const platformMultiplier = needMultiPlatform ? 1.3 : 1.0;
  const devOpsMultiplier = needDevOps ? 1.2 : 1.0;
  const estimatedQuote = Math.round(baseCost * platformMultiplier * devOpsMultiplier);

  // Active showcase pillar
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      title: 'Enterprise AI & Autonomous Multi-Agent Swarms',
      icon: <Cpu className="w-5 h-5 text-brand-cyan" />,
      tag: 'Autonomous Intelligence',
      description: 'Specialized multi-agent cognitive architectures integrating Gemini, Claude, and local edge LLMs with RAG databases and deterministic verification layers.',
      deliverables: ['Custom LLM Fine-Tuning & Quantization', 'Enterprise RAG with Hybrid Vector Search', 'Multi-Agent Autonomous Orchestration', 'On-Premise & Edge AI Deployment']
    },
    {
      title: 'Full-Stack Modern Web & Mobile Systems',
      icon: <Smartphone className="w-5 h-5 text-emerald-400" />,
      tag: 'Cross-Platform Native',
      description: 'Ultra-low latency web and native mobile applications with React 19, Vite, Capacitor 8, and modern micro-frontends ensuring sub-second interactions.',
      deliverables: ['Universal iOS, Android & Desktop Codebases', 'Offline-First Local Synchronization', 'Pixel-Perfect Responsive Glassmorphism', 'Real-Time WebSockets & Push Notifications']
    },
    {
      title: 'Cloud Infrastructure & DevOps Automation',
      icon: <Cloud className="w-5 h-5 text-indigo-400" />,
      tag: 'Zero-Downtime Scale',
      description: 'Declarative Kubernetes deployments, CI/CD automated pipelines, Supabase PostgreSQL transaction poolers, and global CDN caching.',
      deliverables: ['Zero-Trust Role-Based Access Control', 'Automated GitHub Actions CI/CD', 'Serverless Edge Functions', 'Audit-Ready Disaster Recovery & Backups']
    },
    {
      title: 'High-Throughput Data & Analytics Pipelines',
      icon: <Database className="w-5 h-5 text-amber-400" />,
      tag: 'Real-Time Insights',
      description: 'Streaming analytics engines, automated daily progress tracking (DPR), and cryptographic verifiable credentials (PRDAMS).',
      deliverables: ['Cryptographic Audit Trail Logging', 'Automated PDF/Excel Reporting Suites', 'Executive Metric Dashboards', 'Continuous Data Integrity Verification']
    }
  ];

  const showcaseProjects = [
    {
      name: 'Nexora Connect',
      category: 'Workforce Collaboration',
      desc: 'Unified team communications, QR attendance, webinar platform, and IT ticketing hub.',
      stats: '4 platforms • 100% synced'
    },
    {
      name: 'PRDAMS Verification Suite',
      category: 'Security & Credentials',
      desc: 'Cryptographic digital acknowledgement generator, role management, and tamper-proof certificate scanner.',
      stats: 'SHA-256 verification • Audit-ready'
    },
    {
      name: 'Nexora DPR System',
      category: 'Operations & Tracking',
      desc: 'Enterprise daily progress reporting with attendance clock, analytics charts, and instant PDF generation.',
      stats: '98.4% team compliance'
    },
    {
      name: 'Nexora Internship Academy',
      category: 'EdTech & Evaluation',
      desc: 'Structured cohort curriculum, weekly assignment tracking, mentor evaluations, and offer letter generation.',
      stats: '4 specialized tracks'
    }
  ];

  return (
    <PortalWrapper
      title="Nexora Technologies"
      subtitle="Corporate Solutions, Flagship 3D Showcase & Enterprise Engineering"
      icon={<Globe className="w-5 h-5" />}
      cloudUrl="https://www.nexoratechs.xyz/"
      onBack={onBack}
      badge="Flagship Showcase"
      badgeColor="text-brand-cyan bg-brand-cyan/10 border-brand-cyan/20"
    >
      <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-10">

        {/* HERO SHOWCASE BANNER */}
        <div className="relative rounded-3xl p-6 sm:p-10 bg-gradient-to-br from-[#06152F] via-[#08224d] to-[#040E20] border border-brand-cyan/20 shadow-2xl overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/10 rounded-full filter blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/15 rounded-full filter blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan text-xs font-black tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5 animate-spin" />
              <span>Next-Gen Software & Autonomous AI</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Empowering Enterprises with <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-sky-300 to-brand-blue">Autonomous Intelligence</span> & High-Scale Systems
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
              Nexora Technologies engineers custom enterprise software architectures, multi-agent AI ecosystems, and responsive cross-platform native applications designed for bulletproof reliability.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="#estimator"
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-cyan text-[#06152F] font-black text-xs tracking-wider uppercase hover:opacity-95 cursor-pointer shadow-lg shadow-brand-cyan/20 active:scale-95 transition-all"
              >
                Estimate Project Cost
              </a>
              <button
                onClick={() => window.open('https://www.nexoratechs.xyz/', '_blank')}
                className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-xs cursor-pointer active:scale-95 transition-all"
              >
                <span>Visit Official Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 4 CORE ENGINEERING PILLARS */}
        <div className="space-y-4">
          <div className="text-center sm:text-left">
            <span className="text-xs font-black uppercase tracking-widest text-brand-blue dark:text-brand-cyan">Engineering Expertise</span>
            <h2 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white mt-1">What We Build</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            {pillars.map((pillar, idx) => (
              <button
                key={idx}
                onClick={() => setActivePillar(idx)}
                className={`p-4 rounded-2xl text-left transition-all border cursor-pointer active:scale-98 ${
                  activePillar === idx
                    ? 'bg-white dark:bg-[#06152F] border-brand-cyan/50 shadow-md ring-2 ring-brand-cyan/20'
                    : 'bg-slate-100/70 dark:bg-white/5 border-transparent hover:border-black/5 dark:hover:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-200 dark:bg-white/10">
                    {pillar.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pillar {idx + 1}</span>
                    <span className="text-xs font-bold text-brand-navy dark:text-white line-clamp-1">{pillar.tag}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Active Pillar Detail Box */}
          <div className="p-6 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-brand-blue/10 dark:bg-brand-cyan/10">
                {pillars[activePillar].icon}
              </div>
              <div>
                <h3 className="text-base font-black text-brand-navy dark:text-white">{pillars[activePillar].title}</h3>
                <span className="text-xs font-bold text-brand-cyan">{pillars[activePillar].tag}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {pillars[activePillar].description}
            </p>

            <div className="pt-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-slate-400 block mb-2">Key Production Deliverables</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {pillars[activePillar].deliverables.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ECOSYSTEM CASE STUDIES */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-blue dark:text-brand-cyan">Portfolio & Proven Work</span>
            <h2 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white mt-1">Flagship Solutions</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {showcaseProjects.map((p, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-3xl bg-white dark:bg-[#06152F]/70 border border-black/5 dark:border-white/10 shadow-sm space-y-3 hover:border-brand-cyan/30 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue dark:text-brand-cyan">
                    {p.category}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-500 font-bold">{p.stats}</span>
                </div>
                <h3 className="text-base font-extrabold text-brand-navy dark:text-white">{p.name}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* INTERACTIVE PROJECT ESTIMATOR */}
        <div id="estimator" className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-[#06152F] dark:to-[#040F22] border border-black/10 dark:border-brand-cyan/20 shadow-xl space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-blue dark:text-brand-cyan">Instant Scope Assessment</span>
              <h2 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white mt-1">Project Quote Calculator</h2>
            </div>
            <div className="p-3 rounded-2xl bg-brand-blue/10 dark:bg-brand-cyan/10 text-brand-blue dark:text-brand-cyan">
              <Calculator className="w-6 h-6" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">Project Architecture Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'ai', label: 'AI Multi-Agent Swarm' },
                    { id: 'mobile', label: 'Cross-Platform Mobile (iOS/Android)' },
                    { id: 'web', label: 'Full-Stack Web App' },
                    { id: 'enterprise', label: 'Complete Enterprise ERP/Portal' }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setProjectType(opt.id as any)}
                      className={`p-3 rounded-2xl text-xs font-bold border text-left cursor-pointer transition-all active:scale-95 ${
                        projectType === opt.id
                          ? 'bg-brand-blue text-white border-brand-blue shadow-md'
                          : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-300 border-black/10 dark:border-white/10'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-2">Target Timeline ({timelineWeeks} Weeks)</label>
                <input
                  type="range"
                  min="2"
                  max="16"
                  value={timelineWeeks}
                  onChange={e => setTimelineWeeks(Number(e.target.value))}
                  className="w-full accent-brand-blue"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1">
                  <span>2 Weeks (Sprint)</span>
                  <span>8 Weeks (Standard)</span>
                  <span>16 Weeks (Enterprise)</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needMultiPlatform}
                    onChange={e => setNeedMultiPlatform(e.target.checked)}
                    className="w-4 h-4 accent-brand-blue rounded"
                  />
                  <span>Universal Responsive Layout (Android, iOS & Desktop)</span>
                </label>
                <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={needDevOps}
                    onChange={e => setNeedDevOps(e.target.checked)}
                    className="w-4 h-4 accent-brand-blue rounded"
                  />
                  <span>Include CI/CD Deployment, Supabase Cloud & Monitoring</span>
                </label>
              </div>
            </div>

            {/* Quote Result Card */}
            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-black/30 border border-black/5 dark:border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Estimated Investment Estimate</span>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-black text-brand-navy dark:text-brand-cyan">${estimatedQuote}</span>
                  <span className="text-xs text-slate-400 font-bold">USD</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  Includes full source code ownership, end-to-end multi-platform build assets, automated tests, and 90-day maintenance.
                </p>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => alert(`Quote Request sent! An architect will reach out regarding your ${timelineWeeks}-week ${projectType.toUpperCase()} build.`)}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white dark:text-[#06152F] font-black text-xs uppercase tracking-wider shadow-lg shadow-brand-blue/20 cursor-pointer active:scale-98 transition-all"
                >
                  Book Architectural Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* LEADERSHIP & ARCHITECT - DEVELOPED BY TRIVIN */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-blue dark:text-brand-cyan">Engineering & Architecture</span>
            <h2 className="text-xl sm:text-2xl font-black text-brand-navy dark:text-white mt-1">Developed by Trivin</h2>
          </div>

          <div className="p-6 rounded-3xl bg-gradient-to-br from-white to-slate-50 dark:from-[#06152F] dark:to-[#030914] border border-brand-cyan/25 shadow-xl flex flex-col sm:flex-row items-center gap-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-brand-blue via-sky-400 to-brand-cyan flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-brand-blue/30 shrink-0">
              TR
            </div>
            <div className="space-y-1.5 text-center sm:text-left flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="text-xl font-black text-brand-navy dark:text-white">Trivin</h3>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-brand-blue/15 text-brand-blue dark:text-brand-cyan border border-brand-blue/25">
                  Chief Architect & Lead Developer
                </span>
              </div>
              <p className="text-xs font-bold text-brand-blue dark:text-brand-cyan">
                Sole Architect & Creator of the Nexora One Ecosystem
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                Engineered the entire Nexora One unified multi-platform application across Android, iOS, and Desktop, incorporating all five core portal subsystems, real-time cryptographic verification, attendance automation, and offline resilience.
              </p>
            </div>
          </div>
        </div>

      </div>
    </PortalWrapper>
  );
};
