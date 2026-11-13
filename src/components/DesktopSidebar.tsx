import React from 'react';
import { 
  Home, 
  Grid, 
  Star, 
  Settings, 
  Users, 
  Globe, 
  ClipboardList, 
  ShieldCheck, 
  GraduationCap, 
  Calendar, 
  Calculator, 
  Monitor, 
  Smartphone
} from 'lucide-react';
import { Logo } from './Logo';
import type { TabType } from './BottomNavigation';

interface DesktopSidebarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenPortal: (portalType: 'connect' | 'showcase' | 'dpr' | 'prdams' | 'internship') => void;
  onOpenCalendar: () => void;
  onOpenCalculator: () => void;
  isDesktopMode: boolean;
  onToggleDesktopMode: () => void;
  activePortal: string | null;
}

export const DesktopSidebar: React.FC<DesktopSidebarProps> = ({
  activeTab,
  onTabChange,
  onOpenPortal,
  onOpenCalendar,
  onOpenCalculator,
  isDesktopMode,
  onToggleDesktopMode,
  activePortal
}) => {
  const mainNav = [
    { id: 'home' as TabType, label: 'Workspace Home', icon: Home },
    { id: 'apps' as TabType, label: 'Ecosystem Catalog', icon: Grid },
    { id: 'favorites' as TabType, label: 'Pinned Portals', icon: Star },
    { id: 'settings' as TabType, label: 'Preferences', icon: Settings },
  ];

  const corePortals = [
    { id: 'connect', label: 'Nexora Connect', icon: Users, color: '#6366F1' },
    { id: 'showcase', label: 'Nexora Showcase', icon: Globe, color: '#00E5FF' },
    { id: 'dpr', label: 'Daily Progress (DPR)', icon: ClipboardList, color: '#0878C9' },
    { id: 'prdams', label: 'PRDAMS Portal', icon: ShieldCheck, color: '#16B9FF' },
    { id: 'internship', label: 'Internship Academy', icon: GraduationCap, color: '#D4A72C' },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 bg-white dark:bg-[#040D1D] border-r border-black/5 dark:border-white/10 p-4 justify-between h-screen overflow-y-auto no-scrollbar select-none z-30">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2 pt-2">
          <Logo size={36} animated />
          <div>
            <h1 className="text-base font-black tracking-tight leading-none text-brand-navy dark:text-white">
              NEXORA <span className="text-brand-blue dark:text-brand-cyan">ONE</span>
            </h1>
            <span className="text-[9px] font-bold tracking-widest text-slate-400">
              DESKTOP WORKSTATION
            </span>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 block mb-1">
            Workspace
          </span>
          {mainNav.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !activePortal;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-98 ${
                  isActive
                    ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* 5 Core Portals */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 block mb-1">
            Core Portals
          </span>
          {corePortals.map(portal => {
            const Icon = portal.icon;
            const isActive = activePortal === portal.id;
            return (
              <button
                key={portal.id}
                onClick={() => onOpenPortal(portal.id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer active:scale-98 ${
                  isActive
                    ? 'bg-brand-blue/15 text-brand-blue dark:text-brand-cyan border border-brand-blue/30 shadow-xs'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <div 
                  className="w-5 h-5 rounded-lg flex items-center justify-center text-white shrink-0"
                  style={{ background: portal.color }}
                >
                  <Icon className="w-3 h-3" />
                </div>
                <span className="truncate">{portal.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Tools */}
        <div className="space-y-1">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 px-3 block mb-1">
            Ecosystem Tools
          </span>
          <button
            onClick={onOpenCalendar}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-emerald-500" />
            <span>Workspace Calendar</span>
          </button>
          <button
            onClick={onOpenCalculator}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
          >
            <Calculator className="w-4 h-4 text-pink-500" />
            <span>Office Calculator</span>
          </button>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="pt-4 border-t border-black/5 dark:border-white/10 space-y-2">
        {/* Toggle Mode */}
        <button
          onClick={onToggleDesktopMode}
          className="w-full flex items-center justify-between px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-xs font-bold text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
          title="Switch between Full Workstation and Mobile Device View"
        >
          <span className="flex items-center gap-2">
            {isDesktopMode ? <Monitor className="w-3.5 h-3.5 text-brand-cyan" /> : <Smartphone className="w-3.5 h-3.5 text-brand-gold" />}
            <span>{isDesktopMode ? 'Desktop View' : 'Mobile Frame'}</span>
          </span>
          <span className="text-[10px] uppercase font-bold text-slate-400">Toggle</span>
        </button>

        <div className="px-2 py-1 flex items-center justify-between text-[10px] text-slate-400 font-medium">
          <span>v2.0 • Multi-Platform</span>
          <span className="text-emerald-500 font-bold">Android / iOS / Win</span>
        </div>
      </div>
    </aside>
  );
};
