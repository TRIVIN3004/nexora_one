import React, { useState } from 'react';
import { WifiOff, RefreshCw, ArrowLeft } from 'lucide-react';

interface OfflineAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry: () => void;
}

export const OfflineAlertModal: React.FC<OfflineAlertModalProps> = ({ isOpen, onClose, onRetry }) => {
  const [retrying, setRetrying] = useState(false);
  const [shake, setShake] = useState(false);

  if (!isOpen) return null;

  const handleRetry = () => {
    setRetrying(true);
    // Simulate checking connection
    setTimeout(() => {
      setRetrying(false);
      if (navigator.onLine) {
        onRetry();
      } else {
        // Still offline, trigger shake animation
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Dialog Frame */}
      <div 
        className={`w-full max-w-sm glass-effect-static relative rounded-3xl p-6 text-center shadow-2xl border border-brand-cyan/20 z-10 transition-transform duration-300 ${
          shake ? 'animate-[bounce_0.5s_ease-in-out]' : ''
        }`}
      >
        {/* Glow behind icon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand-cyan/20 blur-md" />

        {/* Icon Header */}
        <div className="mx-auto w-14 h-14 rounded-2xl bg-white dark:bg-brand-navy/80 border border-brand-cyan/20 dark:border-brand-cyan/35 flex items-center justify-center text-brand-cyan shadow-inner relative z-10">
          <WifiOff className="w-7 h-7 animate-pulse" />
        </div>

        {/* Body Text */}
        <h3 className="text-xl font-bold mt-6 text-brand-navy dark:text-white">You're currently offline</h3>
        <p className="text-sm text-brand-secondary mt-2 px-2 leading-relaxed">
          The selected Nexora application requires an active internet connection to load its external platform.
        </p>

        {/* Status indicator mockup */}
        <div className="flex items-center justify-center gap-1.5 mt-4 text-xs font-medium text-red-400">
          <span className="w-2 h-2 rounded-full bg-red-500 status-dot after:bg-red-400" />
          <span>No internet detected</span>
        </div>

        {/* Actions Grid */}
        <div className="flex flex-col gap-2.5 mt-6">
          <button
            onClick={handleRetry}
            disabled={retrying}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-blue to-brand-cyan text-white font-semibold text-sm shadow-md hover:shadow-lg active:scale-[0.98] transition-all duration-200 disabled:opacity-80"
          >
            <RefreshCw className={`w-4 h-4 ${retrying ? 'animate-spin' : ''}`} />
            {retrying ? 'Verifying Link...' : 'Try Again'}
          </button>

          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-brand-navy dark:text-white font-semibold text-sm hover:bg-black/10 dark:hover:bg-white/10 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Nexora One
          </button>
        </div>
      </div>
    </div>
  );
};
