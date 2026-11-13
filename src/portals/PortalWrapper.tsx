import React from 'react';
import { ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';

interface PortalWrapperProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  cloudUrl?: string;
  onBack: () => void;
  children: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export const PortalWrapper: React.FC<PortalWrapperProps> = ({
  title,
  subtitle,
  icon,
  cloudUrl,
  onBack,
  children,
  badge = 'Unified Local & Cloud',
  badgeColor = 'text-brand-blue bg-brand-blue/10 border-brand-blue/20'
}) => {
  const [refreshKey, setRefreshKey] = React.useState(0);

  const handleOpenCloud = () => {
    if (cloudUrl) {
      window.open(cloudUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-[#030A17] text-slate-800 dark:text-slate-100 overflow-hidden">
      {/* Universal Top Header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-[#06152F]/90 backdrop-blur-md border-b border-black/5 dark:border-white/10 shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 text-brand-navy dark:text-white cursor-pointer active:scale-95 transition-all"
            title="Return to Nexora One Workspace"
            aria-label="Back to Workspace"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="p-2 rounded-xl bg-gradient-to-br from-brand-blue/15 to-brand-cyan/20 border border-brand-blue/30 text-brand-blue dark:text-brand-cyan shrink-0">
            {icon}
          </div>

          <div className="truncate">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-extrabold tracking-tight truncate text-brand-navy dark:text-white leading-tight">
                {title}
              </h2>
              <span className={`hidden sm:inline-flex text-[9px] font-bold px-2 py-0.5 rounded-full border ${badgeColor}`}>
                {badge}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate leading-tight">
              {subtitle}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setRefreshKey(prev => prev + 1)}
            className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5 text-slate-500 dark:text-slate-400 active:scale-95 transition-all cursor-pointer"
            title="Refresh local state"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {cloudUrl && (
            <button
              onClick={handleOpenCloud}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-blue/10 dark:bg-brand-cyan/10 hover:bg-brand-blue/20 dark:hover:bg-brand-cyan/20 border border-brand-blue/25 dark:border-brand-cyan/25 text-brand-blue dark:text-brand-cyan text-xs font-bold active:scale-95 transition-all cursor-pointer"
              title="Open full cloud production deployment"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live Web</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Portal Viewport */}
      <main key={refreshKey} className="flex-1 overflow-y-auto no-scrollbar relative">
        {children}
      </main>
    </div>
  );
};
