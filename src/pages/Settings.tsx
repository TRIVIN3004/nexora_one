import React, { useState, useEffect } from 'react';
import { 
  Moon, 
  Sun, 
  Monitor, 
  Bell, 
  Trash2, 
  Info, 
  ChevronRight, 
  AlertCircle,
  Globe,
  ArrowUpRight
} from 'lucide-react';
import { storage } from '../utils/storage';
import type { ThemeType } from '../utils/storage';

interface SettingsProps {
  onClearFavorites: () => void;
  onClearRecents: () => void;
  onClearCalendarNotes: () => void;
  onNavigateToAbout: () => void;
  onThemeChange: (theme: ThemeType) => void;
  currentTheme: ThemeType;
}

export const Settings: React.FC<SettingsProps> = ({
  onClearFavorites,
  onClearRecents,
  onClearCalendarNotes,
  onNavigateToAbout,
  onThemeChange,
  currentTheme
}) => {
  const [notifications, setNotifications] = useState(true);
  const [showClearFavConfirm, setShowClearFavConfirm] = useState(false);
  const [showClearRecentsConfirm, setShowClearRecentsConfirm] = useState(false);
  const [showClearCalendarConfirm, setShowClearCalendarConfirm] = useState(false);

  useEffect(() => {
    setNotifications(storage.getNotificationsEnabled());
  }, []);

  const handleNotificationsToggle = () => {
    const nextState = !notifications;
    setNotifications(nextState);
    storage.setNotificationsEnabled(nextState);
  };

  return (
    <div className="flex-grow flex flex-col p-5 pb-24 overflow-y-auto no-scrollbar page-enter page-enter-active">
      {/* Title */}
      <div className="mt-2 mb-5">
        <h2 className="text-xl font-extrabold text-brand-navy dark:text-white">Settings</h2>
        <p className="text-xs text-brand-secondary">Configure app preferences and manage cached data.</p>
      </div>

      <div className="flex flex-col gap-5">
        {/* Section: Appearance */}
        <div className="glass-effect rounded-2xl p-4 border border-black/5 dark:border-white/5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-cyan mb-3">Appearance</h3>
          
          <div className="flex flex-col gap-4">
            <span className="text-xs text-brand-secondary leading-snug">
              Select your visual styling mode. Light mode offers maximum clarity for bright environments.
            </span>
            
            {/* Theme Selector Capsule Grid */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-black/5 dark:bg-[#030a17]/60 border border-black/5 dark:border-white/5 rounded-xl">
              {(['light', 'dark', 'auto'] as ThemeType[]).map((theme) => {
                const isActive = currentTheme === theme;
                const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor;
                const label = theme.charAt(0).toUpperCase() + theme.slice(1);

                return (
                  <button
                    key={theme}
                    onClick={() => onThemeChange(theme)}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold cursor-pointer active:scale-95 transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white shadow-md'
                        : 'text-brand-secondary hover:text-brand-navy dark:hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Section: Preferences */}
        <div className="glass-effect rounded-2xl p-4 border border-black/5 dark:border-white/5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-cyan mb-3">Preferences</h3>
          
          {/* Notifications Row */}
          <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand-blue/10 dark:bg-brand-cyan/15 flex items-center justify-center text-brand-blue dark:text-brand-cyan">
                <Bell className="w-4.5 h-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-brand-navy dark:text-white">App Notifications</span>
                <span className="text-[10px] text-brand-secondary">Mock alert system logs</span>
              </div>
            </div>
            
            {/* Slide Switch */}
            <button
              onClick={handleNotificationsToggle}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors cursor-pointer duration-300 relative ${
                notifications ? 'bg-brand-blue dark:bg-brand-cyan' : 'bg-black/10 dark:bg-white/10'
              }`}
            >
              <div 
                className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 transform ${
                  notifications ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Section: Cache & Storage */}
        <div className="glass-effect rounded-2xl p-4 border border-black/5 dark:border-white/5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-cyan mb-3">Cache & Storage</h3>
          
          <div className="flex flex-col gap-3">
            {/* Clear Favorites Row */}
            <div className="flex items-center justify-between py-1 border-b border-black/5 dark:border-white/5 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 dark:text-red-400">
                  <Trash2 className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-brand-navy dark:text-white">Clear Favorites</span>
                  <span className="text-[10px] text-brand-secondary">Remove all pinned apps</span>
                </div>
              </div>

              {showClearFavConfirm ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onClearFavorites();
                      setShowClearFavConfirm(false);
                    }}
                    className="px-2.5 py-1 rounded bg-red-500 text-white text-[10px] font-bold"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowClearFavConfirm(false)}
                    className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 text-brand-secondary text-[10px] font-bold"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowClearFavConfirm(true)}
                  className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-brand-secondary hover:text-brand-navy dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 text-[10px] font-bold transition-all"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Clear Recently Used Row */}
            <div className="flex items-center justify-between py-1 border-b border-black/5 dark:border-white/5 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 dark:text-red-400">
                  <AlertCircle className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-brand-navy dark:text-white">Clear Recents</span>
                  <span className="text-[10px] text-brand-secondary">Reset recently opened log</span>
                </div>
              </div>

              {showClearRecentsConfirm ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onClearRecents();
                      setShowClearRecentsConfirm(false);
                    }}
                    className="px-2.5 py-1 rounded bg-red-500 text-white text-[10px] font-bold"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowClearRecentsConfirm(false)}
                    className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 text-brand-secondary text-[10px] font-bold"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowClearRecentsConfirm(true)}
                  className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-brand-secondary hover:text-brand-navy dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 text-[10px] font-bold transition-all"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Clear Calendar Notes Row */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 dark:text-red-400">
                  <AlertCircle className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-brand-navy dark:text-white">Clear Calendar</span>
                  <span className="text-[10px] text-brand-secondary">Delete all offline calendar notes</span>
                </div>
              </div>

              {showClearCalendarConfirm ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      onClearCalendarNotes();
                      setShowClearCalendarConfirm(false);
                    }}
                    className="px-2.5 py-1 rounded bg-red-500 text-white text-[10px] font-bold"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowClearCalendarConfirm(false)}
                    className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 text-brand-secondary text-[10px] font-bold"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowClearCalendarConfirm(true)}
                  className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-brand-secondary hover:text-brand-navy dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 text-[10px] font-bold transition-all"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Section: Support */}
        <div className="glass-effect rounded-2xl p-4 border border-black/5 dark:border-white/5">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-cyan mb-3">Support</h3>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={onNavigateToAbout}
              className="w-full flex items-center justify-between py-1.5 group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 dark:bg-brand-cyan/15 flex items-center justify-center text-brand-blue dark:text-brand-cyan">
                  <Info className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-brand-navy dark:text-white">About Nexora One</span>
                  <span className="text-[10px] text-brand-secondary">Corporate mission & guidelines</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-brand-secondary group-hover:text-brand-navy dark:group-hover:text-white transition-colors" />
            </button>

            <div className="w-full h-[1px] bg-black/5 dark:bg-white/5 my-1" />

            <a
              href="https://www.nexoratechs.xyz/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between py-1.5 group cursor-pointer text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-blue/10 dark:bg-brand-cyan/15 flex items-center justify-center text-brand-blue dark:text-brand-cyan">
                  <Globe className="w-4.5 h-4.5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-brand-navy dark:text-white">Official Website</span>
                  <span className="text-[10px] text-brand-secondary">nexoratechs.xyz</span>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-brand-secondary group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors" />
            </a>
          </div>
        </div>

        {/* Section: Multi-Platform Targets */}
        <div className="glass-effect rounded-2xl p-4 border border-black/5 dark:border-white/5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-brand-blue dark:text-brand-cyan">Multi-Platform Architecture</h3>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Android</span>
              <span className="text-xs font-black text-emerald-500">Capacitor 8</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">iOS</span>
              <span className="text-xs font-black text-brand-cyan">Xcode Ready</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <span className="text-[10px] font-bold text-slate-400 uppercase block">Desktop</span>
              <span className="text-xs font-black text-purple-400">Electron + PWA</span>
            </div>
          </div>
        </div>

        {/* Brand version info */}
        <div className="flex flex-col items-center justify-center mt-2 text-center text-brand-secondary">
          <span className="text-xs font-bold text-brand-navy dark:text-white">Nexora One</span>
          <span className="text-[10px] font-medium mt-0.5">Build version 1.0.0 (Release)</span>
          <span className="text-[9px] font-mono tracking-wider opacity-60 mt-1">OFFLINE LOCAL CACHE READY</span>
        </div>
      </div>
    </div>
  );
};
