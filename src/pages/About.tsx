import React from 'react';
import { Logo } from '../components/Logo';
import { 
  Sparkles, 
  Briefcase, 
  Layers, 
  Laptop, 
  ArrowLeft,
  Globe,
  ArrowUpRight
} from 'lucide-react';

interface AboutProps {
  onBackToSettings: () => void;
}

export const About: React.FC<AboutProps> = ({ onBackToSettings }) => {
  const divisions = [
    {
      title: "Applications",
      desc: "Robust productivity interfaces supporting day-to-day coordination.",
      icon: Laptop,
      color: "from-brand-blue/20 to-transparent",
      iconColor: "text-brand-blue"
    },
    {
      title: "AI Solutions",
      desc: "Cognitive frameworks and recruitment modeling built on neural processors.",
      icon: Sparkles,
      color: "from-purple-500/10 to-transparent",
      iconColor: "text-purple-400"
    },
    {
      title: "Business Tools",
      desc: "Dynamic marketing metrics engines and analytical lead forecasters.",
      icon: Briefcase,
      color: "from-brand-gold/15 to-transparent",
      iconColor: "text-brand-gold"
    },
    {
      title: "Internal Platforms",
      desc: "Requirement stores and permission nodes keeping data encrypted and synced.",
      icon: Layers,
      color: "from-brand-cyan/20 to-transparent",
      iconColor: "text-brand-cyan"
    }
  ];

  return (
    <div className="flex-grow flex flex-col p-5 pb-24 overflow-y-auto no-scrollbar page-enter page-enter-active">
      {/* Back button */}
      <div className="mt-2 mb-4 flex items-center">
        <button
          onClick={onBackToSettings}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs font-semibold text-brand-secondary hover:text-brand-navy dark:hover:text-white transition-all cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Settings
        </button>
      </div>

      {/* Main Logo & Hub Intro */}
      <div className="flex flex-col items-center text-center mt-3 mb-6">
        <Logo size={90} animated />
        <h2 className="text-2xl font-black text-brand-navy dark:text-white mt-4 tracking-tight">
          NEXORA <span className="text-brand-cyan">ONE</span>
        </h2>
        <span className="text-xs font-bold text-brand-blue dark:text-brand-cyan uppercase tracking-widest mt-1">
          "One Nexora. Everything Connected."
        </span>
        <p className="text-sm text-brand-secondary mt-3.5 px-4 leading-relaxed">
          Nexora One brings the Nexora Technologies ecosystem together in one simple, premium mobile experience. Designed for instant loading, full offline capability, and quick portal switching.
        </p>

        {/* Official Website Button */}
        <a
          href="https://www.nexoratechs.xyz/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white text-xs font-extrabold shadow-lg hover:shadow-cyan-500/20 active:scale-95 transition-all"
        >
          <Globe className="w-4 h-4" />
          Visit Official Website
          <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
        </a>
      </div>

      {/* Division Cards Grid */}
      <div className="flex flex-col gap-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-cyan px-1 mb-1">
          Supported Portals
        </h3>

        <div className="grid grid-cols-2 gap-3">
          {divisions.map((div, index) => {
            const IconComponent = div.icon;
            return (
              <div 
                key={index} 
                className={`glass-effect rounded-2xl p-4 border border-black/5 dark:border-white/5 bg-gradient-to-br ${div.color} flex flex-col items-start`}
              >
                <div className={`w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center ${div.iconColor} mb-2.5`}>
                  <IconComponent className="w-4.5 h-4.5" />
                </div>
                <h4 className="text-xs font-extrabold text-brand-navy dark:text-white">{div.title}</h4>
                <p className="text-[10px] text-brand-secondary mt-1.5 leading-snug">
                  {div.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Developer Spotlight */}
      <div className="mt-5 glass-effect rounded-2xl p-4 border border-brand-blue/20 dark:border-brand-cyan/20 bg-gradient-to-br from-brand-blue/10 via-purple-500/5 to-brand-cyan/10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white font-black text-base flex items-center justify-center shadow-md shrink-0">
            TS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-brand-navy dark:text-white">Trivin</h4>
              <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-brand-cyan/20 text-brand-cyan font-extrabold border border-brand-cyan/30">
                Lead Architect
              </span>
            </div>
            <p className="text-xs text-brand-blue dark:text-brand-cyan font-bold mt-0.5">
              Developed by Trivin
            </p>
            <p className="text-[10px] text-brand-secondary mt-1 leading-snug">
              Chief Architect & Lead Developer behind Nexora One universal multi-platform engine, Supabase database integration, and cross-portal synchronizer.
            </p>
          </div>
        </div>
      </div>

      {/* Corporate Tagline Footer */}
      <div className="mt-8 flex flex-col items-center text-center pb-2">
        <div className="w-8 h-[1px] bg-black/10 dark:bg-white/10 mb-3" />
        <span className="text-xs tracking-[0.25em] text-brand-blue dark:text-brand-cyan font-extrabold">NEXORA TECHNOLOGIES</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">DEVELOPED BY TRIVIN</span>
        <span className="text-[8px] tracking-[0.3em] text-gray-500 font-bold mt-0.5">BUILDING TOMORROW, TODAY</span>
      </div>
    </div>
  );
};
