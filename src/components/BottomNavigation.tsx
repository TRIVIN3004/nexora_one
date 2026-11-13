import React from 'react';
import { Home, Grid, Star, Settings } from 'lucide-react';

export type TabType = 'home' | 'apps' | 'favorites' | 'settings';

interface BottomNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home' as TabType, label: 'Home', icon: Home },
    { id: 'apps' as TabType, label: 'Apps', icon: Grid },
    { id: 'favorites' as TabType, label: 'Favorites', icon: Star },
    { id: 'settings' as TabType, label: 'Settings', icon: Settings },
  ];

  return (
    <div className="absolute bottom-5 left-4 right-4 h-16 rounded-2xl glass-effect border border-black/5 dark:border-white/10 shadow-lg dark:shadow-2xl flex items-center justify-around px-2 z-40">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-300 w-16 cursor-pointer group active:scale-90"
          >
            {/* Active Glow Bubble behind icon */}
            {isActive && (
              <div 
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-brand-blue/10 to-brand-cyan/15 dark:from-brand-blue/15 dark:to-brand-cyan/15 border border-brand-blue/20 dark:border-brand-cyan/20 scale-100 transition-all duration-300"
                style={{ boxShadow: '0 0 12px rgba(22, 185, 255, 0.15)' }}
              />
            )}

            {/* Icon */}
            <IconComponent 
              className={`w-5 h-5 transition-transform duration-300 relative z-10 ${
                isActive 
                  ? 'text-brand-blue dark:text-brand-cyan scale-110' 
                  : 'text-brand-secondary group-hover:text-brand-navy dark:group-hover:text-white group-hover:scale-105'
              }`} 
            />

            {/* Label */}
            <span 
              className={`text-[9px] font-bold tracking-wide mt-1 relative z-10 transition-colors duration-300 ${
                isActive 
                  ? 'text-brand-blue dark:text-brand-cyan' 
                  : 'text-slate-600 dark:text-slate-400 group-hover:text-brand-navy dark:group-hover:text-white'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
