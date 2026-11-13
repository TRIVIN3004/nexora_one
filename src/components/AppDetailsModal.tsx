import React from 'react';
import { 
  X, 
  Clipboard, 
  GraduationCap, 
  Shield, 
  UserCheck, 
  MessageSquare, 
  Mic, 
  Brain, 
  Star, 
  Globe, 
  CheckCircle2, 
  ArrowUpRight,
  Calendar,
  Calculator,
  Users,
  Network
} from 'lucide-react';
import type { Application } from '../config/applications';

const iconMap = {
  clipboard: Clipboard,
  'graduation-cap': GraduationCap,
  shield: Shield,
  'user-check': UserCheck,
  'message-square': MessageSquare,
  mic: Mic,
  brain: Brain,
  calendar: Calendar,
  calculator: Calculator,
  globe: Globe,
  users: Users,
  network: Network,
};

interface AppDetailsModalProps {
  app: Application | null;
  isOpen: boolean;
  isFav: boolean;
  onToggleFav: () => void;
  onClose: () => void;
  onOpenApp: () => void;
}

export const AppDetailsModal: React.FC<AppDetailsModalProps> = ({
  app,
  isOpen,
  isFav,
  onToggleFav,
  onClose,
  onOpenApp
}) => {
  if (!isOpen || !app) return null;

  const IconComponent = iconMap[app.icon] || Clipboard;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal sheet */}
      <div 
        className="w-full max-w-md bg-white dark:bg-brand-navy/95 border-t sm:border border-black/5 dark:border-white/10 rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl z-10 transition-transform duration-300 transform translate-y-0 relative max-h-[90vh] sm:max-h-[85vh] flex flex-col overflow-hidden"
        style={{
          borderTopColor: `${app.color}40`,
        }}
      >
        {/* Decorative Top Pill (for pull down feeling on mobile) */}
        <div className="w-12 h-1.5 bg-black/10 dark:bg-white/10 rounded-full mx-auto mb-4 sm:hidden cursor-pointer" onClick={onClose} />

        {/* Top Header Row */}
        <div className="flex justify-between items-start w-full">
          <div className="flex gap-4 items-center">
            {/* Custom Icon wrapper */}
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
              style={{ background: `linear-gradient(135deg, ${app.color}dd, ${app.color})` }}
            >
              <IconComponent className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-blue dark:text-brand-cyan">
                {app.category}
              </span>
              <h3 className="text-xl font-extrabold text-brand-navy dark:text-white leading-tight mt-0.5">{app.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 rounded bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[9px] font-bold text-brand-secondary">
                  {app.version}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-500 dark:text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 status-dot after:bg-emerald-400" />
                  Offline Data Cached
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onToggleFav}
              className={`p-2 rounded-xl transition-all border cursor-pointer ${
                isFav 
                  ? 'bg-brand-gold/15 text-brand-gold border-brand-gold/30' 
                  : 'bg-black/5 dark:bg-white/5 text-brand-secondary border-black/5 dark:border-white/10 hover:text-brand-navy dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'
              }`}
            >
              <Star className={`w-4.5 h-4.5 ${isFav ? 'fill-brand-gold' : ''}`} />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-brand-secondary hover:text-brand-navy dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>

        {/* Scrollable details area */}
        <div className="flex-grow overflow-y-auto no-scrollbar my-5 pr-1">
          {/* Platform Description */}
          <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-cyan mb-1.5">Overview</h4>
            <p className="text-sm text-brand-secondary leading-relaxed">
              {app.description}
            </p>
          </div>

          {/* Key Features List */}
          <div className="mt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-cyan mb-2.5 px-1">
              Key Capabilities
            </h4>
            <div className="grid grid-cols-1 gap-2">
              {app.features.map((feature, idx) => (
                <div key={idx} className="flex gap-2.5 items-start p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                  <CheckCircle2 className="w-4.5 h-4.5 text-brand-blue dark:text-brand-cyan mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-brand-navy/90 dark:text-white/90 font-medium leading-normal">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Connection Metadata */}
          <div className="flex items-center gap-2 mt-4 px-4 py-3 bg-gray-50 dark:bg-[#030a17]/50 border border-black/5 dark:border-white/10 rounded-xl text-xs text-brand-secondary">
            <Globe className="w-4 h-4 text-brand-blue dark:text-brand-cyan flex-shrink-0" />
            <span className="truncate">
              Link: <span className="text-brand-blue dark:text-brand-cyan underline">{app.url}</span>
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onOpenApp}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl text-white font-bold text-sm shadow-lg active:scale-[0.98] transition-all duration-200"
          style={{
            background: `linear-gradient(135deg, ${app.color}, ${app.color}cc)`,
            boxShadow: `0 8px 24px ${app.color}40`
          }}
        >
          Open Application
          <ArrowUpRight className="w-4.5 h-4.5" />
        </button>
      </div>
    </div>
  );
};
