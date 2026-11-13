import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    // Stage 1: Reveal logo details and animate nodes
    const t1 = setTimeout(() => setStage(1), 1000);
    
    // Stage 2: Reveal subtexts & taglines
    const t2 = setTimeout(() => setStage(2), 2200);

    // Stage 3: Initiate page slide-up / fade-out transition
    const t3 = setTimeout(() => setStage(3), 3200);

    // Finalize transition
    const t4 = setTimeout(() => {
      onComplete();
    }, 3700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-between items-center bg-[#030a17] text-white p-8 transition-all duration-500 ease-in-out ${
        stage === 3 ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Decorative Mesh Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-br from-brand-cyan/20 to-transparent blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] rounded-full bg-gradient-to-tl from-brand-blue/20 to-transparent blur-3xl" />
      </div>

      {/* Spacer */}
      <div className="h-10" />

      {/* Central Content */}
      <div className="flex flex-col items-center justify-center flex-grow text-center z-10">
        {/* Animated Logo */}
        <div
          className={`transition-all duration-1000 ease-out transform ${
            stage >= 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          <Logo size={140} animated={stage >= 1} />
        </div>

        {/* Nexora One Title */}
        <h1
          className={`text-4xl font-extrabold tracking-wider mt-8 text-white transition-all duration-700 transform ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ textShadow: '0 0 20px rgba(22, 185, 255, 0.4)' }}
        >
          NEXORA <span className="text-brand-cyan">ONE</span>
        </h1>

        {/* Tagline */}
        <p
          className={`text-sm text-brand-cyan/80 font-medium tracking-wide mt-2 transition-all duration-700 delay-300 transform ${
            stage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          "One Nexora. Everything Connected."
        </p>

        {/* Connected Node Network Status Mock Bar */}
        <div
          className={`flex items-center gap-1.5 mt-8 px-4 py-1.5 rounded-full bg-brand-navy/60 border border-brand-cyan/15 text-[11px] font-mono tracking-widest text-brand-cyan transition-all duration-1000 ${
            stage >= 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
        >
          <span className="w-1.5 h-1.5 bg-brand-cyan rounded-full animate-ping" />
          <span>ESTABLISHING SECURE LINKS...</span>
        </div>
      </div>

      {/* Corporate Branding Footer */}
      <div
        className={`flex flex-col items-center text-center z-10 transition-all duration-700 delay-500 transform ${
          stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-xs tracking-[0.25em] text-brand-cyan font-bold">NEXORA TECHNOLOGIES</span>
        <span className="text-[9px] tracking-[0.3em] text-gray-500 font-semibold mt-1">BUILDING TOMORROW, TODAY</span>
      </div>
    </div>
  );
};
