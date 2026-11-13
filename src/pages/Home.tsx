import React from 'react';
import { Logo } from '../components/Logo';
import type { Application } from '../config/applications';
import { AppCard } from '../components/AppCard';
import { Star, ArrowRight } from 'lucide-react';

interface HomeProps {
  apps: Application[];
  favorites: string[];
  recents: string[];
  onToggleFav: (id: string) => void;
  onOpenApp: (app: Application) => void;
  onOpenDetails: (app: Application) => void;
  onNavigateToCatalog: () => void;
  isOnline: boolean;
}

export const Home: React.FC<HomeProps> = ({
  apps,
  favorites,
  recents,
  onToggleFav,
  onOpenApp,
  onOpenDetails,
  onNavigateToCatalog,
  isOnline
}) => {
  // Resolve current greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning 👋';
    if (hour < 17) return 'Good Afternoon 👋';
    return 'Good Evening 👋';
  };

  // Find full app metadata from IDs
  const favoriteApps = apps.filter(app => favorites.includes(app.id));
  const recentApps = apps
    .filter(app => recents.includes(app.id))
    // Keep the order of insertion from the recents list
    .sort((a, b) => recents.indexOf(a.id) - recents.indexOf(b.id));

  return (
    <div className="flex-grow flex flex-col p-5 pb-24 overflow-y-auto no-scrollbar page-enter page-enter-active">
      {/* Top Header Row */}
      <div className="flex justify-between items-center w-full mt-2">
        <div className="flex items-center gap-3">
          <Logo size={42} animated />
          <div>
            <h1 className="text-xl font-black text-brand-navy dark:text-white m-0 tracking-tight leading-none">
              NEXORA <span className="text-brand-blue dark:text-brand-cyan">ONE</span>
            </h1>
            <span className="text-[9px] tracking-widest text-brand-secondary font-bold">
              ONE WORKSPACE
            </span>
          </div>
        </div>

        {/* Dynamic Online/Offline Indicator */}
        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-semibold tracking-wide ${
          isOnline 
            ? 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400' 
            : 'bg-red-500/10 border-red-500/25 text-red-400'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full status-dot ${
            isOnline ? 'bg-emerald-500 after:bg-emerald-400' : 'bg-red-500 after:bg-red-400'
          }`} />
          <span>{isOnline ? 'Online' : 'Offline Mode'}</span>
        </div>
      </div>

      {/* Greeting Banner */}
      <div className="mt-6">
        <h2 className="text-2xl font-black text-brand-navy dark:text-white leading-tight">{getGreeting()}</h2>
        <p className="text-sm text-brand-secondary">Welcome to the Nexora ecosystem.</p>
      </div>

      {/* Corporate Ecosystem Metric Banner */}
      <div className="mt-5 glass-effect rounded-[28px] p-5 border border-brand-blue/15 dark:border-brand-cyan/15 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 dark:bg-brand-cyan/5 rounded-full filter blur-2xl pointer-events-none" />
        <div className="flex justify-between items-center relative z-10">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold text-brand-blue dark:text-brand-cyan tracking-wider">Operational Summary</span>
            <span className="text-base font-extrabold text-brand-navy dark:text-white mt-1">Ecosystem Status</span>
            <span className="text-xs text-brand-secondary mt-0.5">
              5 Core Portals Unified • Offline Ready
            </span>
          </div>
          <div className="flex gap-1 bg-black/5 dark:bg-[#06152f]/80 p-1 rounded-xl border border-black/5 dark:border-white/5 shadow-inner">
            <div className="flex flex-col items-center justify-center px-3 py-1.5 rounded-lg bg-white dark:bg-brand-navy/60 border border-brand-blue/20 dark:border-brand-cyan/20 shadow-xs">
              <span className="text-sm font-black text-brand-blue dark:text-brand-cyan">5</span>
              <span className="text-[8px] font-bold text-slate-400 dark:text-gray-500">PORTALS</span>
            </div>
            <div className="flex flex-col items-center justify-center px-3 py-1.5 rounded-lg bg-white dark:bg-brand-navy/60 border border-black/5 dark:border-white/5 shadow-xs">
              <span className="text-sm font-black text-brand-gold">100%</span>
              <span className="text-[8px] font-bold text-slate-400 dark:text-gray-500">SYNCED</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5 Core Portals Showcase */}
      <div className="mt-6 select-none">
        <div className="flex justify-between items-center mb-2 px-1">
          <h3 className="text-sm font-bold text-brand-navy dark:text-white tracking-wide uppercase">Core Portals</h3>
          <span className="text-[10px] text-brand-blue dark:text-brand-cyan font-bold">5 Portals Unified</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {apps.filter(a => a.portalType).map(app => (
            <button
              key={app.id}
              onClick={() => onOpenApp(app)}
              className="flex items-center justify-between p-3.5 rounded-2xl glass-effect border border-black/5 dark:border-white/10 hover:border-brand-blue/40 text-left cursor-pointer active:scale-98 transition-all group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
                  style={{ background: `linear-gradient(135deg, ${app.color}ee, ${app.color})` }}
                >
                  <span className="text-xs font-black uppercase tracking-tight">
                    {app.shortName.slice(0, 3)}
                  </span>
                </div>
                <div className="truncate pr-1">
                  <h4 className="text-xs font-black text-brand-navy dark:text-white truncate group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors">
                    {app.name}
                  </h4>
                  <span className="text-[10px] text-brand-secondary block truncate">
                    {app.description}
                  </span>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand-blue dark:group-hover:text-brand-cyan group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
            </button>
          ))}
        </div>
      </div>

      {/* Recently Used Horizontal launcher */}
      {recentApps.length > 0 && (
        <div className="mt-6 select-none">
          <div className="flex justify-between items-center mb-2 px-1">
            <h3 className="text-sm font-bold text-brand-navy dark:text-white tracking-wide uppercase">Recently Used</h3>
            <span className="text-[10px] text-brand-secondary">Last {recentApps.length} opened</span>
          </div>
          <div className="flex gap-2.5 overflow-x-auto no-scrollbar py-1 px-1 -mx-1">
            {recentApps.map((app) => (
              <button
                key={app.id}
                onClick={() => onOpenApp(app)}
                className="flex-shrink-0 flex items-center gap-3 py-3 px-4 rounded-2xl glass-effect border border-black/5 dark:border-white/5 text-left active:scale-[0.97] transition-all cursor-pointer min-w-[145px]"
              >
                <div 
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white"
                  style={{ background: `linear-gradient(135deg, ${app.color}dd, ${app.color})` }}
                >
                  {/* Miniature representations of application icons */}
                  <span className="text-sm font-black uppercase tracking-tighter">
                    {app.shortName.slice(0, 2)}
                  </span>
                </div>
                <div className="flex flex-col truncate pr-1">
                  <span className="text-xs font-bold text-brand-navy dark:text-white truncate">{app.name}</span>
                  <span className="text-[9px] text-brand-secondary truncate">{app.category}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Favorites Pinned Area */}
      <div className="mt-6 flex-grow">
        <div className="flex justify-between items-center mb-3.5 px-1">
          <div className="flex items-center gap-1.5 text-brand-gold">
            <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
            <h3 className="text-sm font-bold text-brand-navy dark:text-white tracking-wide uppercase">⭐ Favorites</h3>
          </div>
          {favoriteApps.length > 0 && (
            <span className="text-[10px] text-brand-secondary">Pinned apps</span>
          )}
        </div>

        {favoriteApps.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5">
            {favoriteApps.map((app) => (
              <AppCard
                key={app.id}
                app={app}
                isFav={true}
                onToggleFav={() => onToggleFav(app.id)}
                onOpen={() => onOpenApp(app)}
                onOpenDetails={() => onOpenDetails(app)}
              />
            ))}
          </div>
        ) : (
          <div 
            onClick={onNavigateToCatalog}
            className="flex flex-col items-center justify-center py-9 px-5 text-center glass-effect rounded-[28px] border border-black/5 dark:border-white/5 cursor-pointer hover:border-brand-blue/30 dark:hover:border-brand-cyan/20 active:scale-99 transition-all"
          >
            <div className="w-11 h-11 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center text-brand-secondary mb-3">
              <Star className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-brand-navy dark:text-white">No pinned applications</h4>
            <p className="text-[11px] text-brand-secondary mt-1 max-w-[200px] leading-normal">
              Tap the star icon on any application to pin it on your main dashboard.
            </p>
            <span className="flex items-center gap-1 text-[10px] text-brand-blue dark:text-brand-cyan font-semibold mt-3">
              Browse Catalogue <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
