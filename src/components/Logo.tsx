import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 120, animated = false }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-full ${animated ? 'animate-glow-pulse' : ''}`}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="nexoraBlueGrad" x1="20" y1="20" x2="100" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00E5FF" />
            <stop offset="50%" stopColor="#0878C9" />
            <stop offset="100%" stopColor="#06152F" />
          </linearGradient>

          <linearGradient id="nexoraGoldGrad" x1="30" y1="30" x2="90" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFE58F" />
            <stop offset="50%" stopColor="#F5B027" />
            <stop offset="100%" stopColor="#D4A72C" />
          </linearGradient>

          <linearGradient id="shieldGrad" x1="30" y1="20" x2="90" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0a224a" />
            <stop offset="100%" stopColor="#040e20" />
          </linearGradient>

          <linearGradient id="orbitStrokeGrad" x1="10" y1="10" x2="110" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#0878C9" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D4A72C" stopOpacity="0.7" />
          </linearGradient>

          <radialGradient id="hubGlow" cx="60" cy="60" r="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.28" />
            <stop offset="60%" stopColor="#0878C9" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0878C9" stopOpacity="0" />
          </radialGradient>

          {/* Premium Filter */}
          <filter id="logoShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0878C9" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Ambient Radial Energy Glow */}
        <circle cx="60" cy="60" r="48" fill="url(#hubGlow)" />

        {/* Orbit Ring 1 - Outer Pulsing Ecosystem Perimeter */}
        <circle
          cx="60"
          cy="60"
          r="46"
          stroke="url(#orbitStrokeGrad)"
          strokeWidth="1.2"
          strokeDasharray="4 8"
          className={animated ? 'animate-[spin_35s_linear_infinite]' : ''}
          style={{ transformOrigin: '60px 60px' }}
        />

        {/* Orbit Ring 2 - Inner Coordinate Ring */}
        <circle
          cx="60"
          cy="60"
          r="41"
          stroke="#0878C9"
          strokeWidth="0.8"
          strokeOpacity="0.35"
        />

        {/* Connecting Data Rays */}
        <g stroke="#00E5FF" strokeWidth="0.9" strokeOpacity="0.3" className={animated ? 'animate-pulse-slow' : ''}>
          <line x1="60" y1="14" x2="60" y2="106" strokeDasharray="3 3" />
          <line x1="14" y1="60" x2="106" y2="60" strokeDasharray="3 3" />
          <line x1="27" y1="27" x2="93" y2="93" strokeOpacity="0.2" />
          <line x1="27" y1="93" x2="93" y2="27" strokeOpacity="0.2" />
        </g>

        {/* Orbiting Satellite Ecosystem Nodes */}
        {/* Cardinal Nodes */}
        <circle cx="60" cy="14" r="4" fill="#00E5FF" className={animated ? 'animate-float' : ''} />
        <circle cx="106" cy="60" r="4" fill="#D4A72C" className={animated ? 'animate-float' : ''} />
        <circle cx="60" cy="106" r="4" fill="#0878C9" className={animated ? 'animate-float' : ''} />
        <circle cx="14" cy="60" r="4" fill="#00E5FF" className={animated ? 'animated-float' : ''} />

        {/* Diagonal Nodes */}
        <circle cx="27" cy="27" r="3" fill="#0878C9" className={animated ? 'animate-float-delayed' : ''} />
        <circle cx="93" cy="27" r="3.2" fill="#00E5FF" className={animated ? 'animate-float-delayed' : ''} />
        <circle cx="93" cy="93" r="3" fill="#D4A72C" className={animated ? 'animate-float-delayed' : ''} />
        <circle cx="27" cy="93" r="3.2" fill="#0878C9" className={animated ? 'animate-float-delayed' : ''} />

        {/* Central Hexagonal Shield with Rich Shadow */}
        <polygon
          points="60,26 89,43 89,77 60,94 31,77 31,43"
          fill="url(#shieldGrad)"
          stroke="#00E5FF"
          strokeWidth="1.8"
          filter="url(#logoShadow)"
        />

        {/* Inner Subtle Hexagon Inset Accent */}
        <polygon
          points="60,30 85,45 85,75 60,90 35,75 35,45"
          fill="none"
          stroke="#0878C9"
          strokeWidth="0.8"
          strokeOpacity="0.5"
        />

        {/* Modern Geometric "N" Monogram */}
        <g strokeLinecap="round" strokeLinejoin="round">
          {/* Left Vertical Pillar */}
          <path
            d="M45 74 V46"
            stroke="url(#nexoraBlueGrad)"
            strokeWidth="6"
            className={animated ? 'animate-draw-line' : ''}
            style={{ strokeDasharray: 100, strokeDashoffset: animated ? 100 : 0 }}
          />

          {/* Right Vertical Pillar */}
          <path
            d="M75 74 V46"
            stroke="url(#nexoraBlueGrad)"
            strokeWidth="6"
            className={animated ? 'animate-draw-line' : ''}
            style={{ strokeDasharray: 100, strokeDashoffset: animated ? 100 : 0, animationDelay: '0.35s' }}
          />

          {/* Golden Dynamic Diagonal Bridge */}
          <path
            d="M45 46 L75 74"
            stroke="url(#nexoraGoldGrad)"
            strokeWidth="6.5"
            className={animated ? 'animate-draw-line' : ''}
            style={{ strokeDasharray: 100, strokeDashoffset: animated ? 100 : 0, animationDelay: '0.7s' }}
          />
        </g>

        {/* Central White Pulse Spark */}
        <circle cx="60" cy="60" r="2" fill="#FFFFFF" className={animated ? 'animate-pulse' : ''} />
      </svg>
    </div>
  );
};
