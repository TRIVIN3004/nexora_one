import React, { useRef, useState } from 'react';
import { 
  Clipboard, 
  GraduationCap, 
  Shield, 
  UserCheck, 
  MessageSquare, 
  Mic, 
  Brain, 
  Info, 
  Star, 
  ArrowUpRight,
  Calendar,
  Calculator,
  Globe,
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

interface AppCardProps {
  app: Application;
  isFav: boolean;
  onToggleFav: () => void;
  onOpen: () => void;
  onOpenDetails: () => void;
}

export const AppCard: React.FC<AppCardProps> = ({ 
  app, 
  isFav, 
  onToggleFav, 
  onOpen, 
  onOpenDetails 
}) => {
  const IconComponent = iconMap[app.icon] || Clipboard;
  const longPressTimer = useRef<number | null>(null);
  const [isPressing, setIsPressing] = useState(false);

  // Long press gesture simulation
  const handleTouchStart = () => {
    setIsPressing(true);
    longPressTimer.current = window.setTimeout(() => {
      setIsPressing(false);
      onOpenDetails();
    }, 600); // 600ms threshold for long press
  };

  const handleTouchEnd = () => {
    setIsPressing(false);
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      className={`glass-effect relative flex flex-col justify-between items-start rounded-2xl sm:rounded-3xl p-4 sm:p-5 min-h-[175px] h-full cursor-pointer active:scale-95 transition-all duration-200 select-none overflow-hidden group ${
        isPressing ? 'scale-97 border-brand-cyan/40 bg-brand-cyan/5' : ''
      }`}
      style={{
        '--card-border': `${app.color}25`,
        '--card-glow': `${app.color}08`,
      } as React.CSSProperties}
      onClick={() => {
        // Prevent click if we were doing a long press (handled by timer clear)
        if (longPressTimer.current) {
          clearTimeout(longPressTimer.current);
        }
        onOpen();
      }}
    >
      {/* Glow highlight */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 rounded-full filter blur-2xl opacity-20 pointer-events-none transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: app.color }}
      />

      {/* Top Bar (Icon and Utility Buttons) */}
      <div className="flex justify-between items-center w-full relative z-10">
        {/* Customized Dynamic App Icon Wrapper */}
        <div 
          className="w-11 h-11 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
          style={{ 
            background: `linear-gradient(135deg, ${app.color}dd, ${app.color})`,
            boxShadow: `0 4px 12px ${app.color}44`
          }}
        >
          <IconComponent className="w-5.5 h-5.5 animate-float" style={{ animationDelay: `${app.id === 'internship' ? '0.5s' : '0s'}` }} />
        </div>

        {/* Favorite & Info Buttons */}
        <div className="flex gap-1.5 items-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFav();
            }}
            className={`p-1.5 rounded-lg transition-colors border cursor-pointer ${
              isFav 
                ? 'bg-brand-gold/15 text-brand-gold border-brand-gold/30' 
                : 'bg-black/5 dark:bg-white/5 text-brand-secondary border-black/5 dark:border-white/10 hover:text-brand-navy dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-brand-gold' : ''}`} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails();
            }}
            className="p-1.5 rounded-lg border bg-black/5 dark:bg-white/5 text-brand-secondary border-black/5 dark:border-white/10 hover:text-brand-navy dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Bottom Content (Title, Description, Arrow) */}
      <div className="w-full mt-4 flex flex-col relative z-10">
        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-blue dark:text-brand-cyan mb-0.5">
          {app.category}
        </span>
        <h4 className="text-base font-extrabold text-brand-navy dark:text-white leading-tight truncate w-[90%]">
          {app.name}
        </h4>
        <p className="text-[11px] text-brand-secondary mt-1 line-clamp-2 leading-snug">
          {app.description}
        </p>

        {/* Go Arrow */}
        <div className="flex justify-between items-center w-full mt-3">
          <span className="text-[10px] font-semibold text-brand-secondary group-hover:text-brand-blue dark:group-hover:text-brand-cyan transition-colors">
            Launch Portal
          </span>
          <div className="w-6 h-6 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-brand-secondary transition-all group-hover:bg-brand-blue/15 dark:group-hover:bg-brand-cyan/20 group-hover:text-brand-blue dark:group-hover:text-brand-cyan group-hover:border-brand-blue/30 dark:group-hover:border-brand-cyan/30">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
