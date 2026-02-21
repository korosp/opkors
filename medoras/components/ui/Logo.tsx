import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ size = 'md', showText = true }: LogoProps) {
  const dims = { sm: 26, md: 32, lg: 44 };
  const textSizes = { sm: 'text-[13px]', md: 'text-[15px]', lg: 'text-2xl' };
  const d = dims[size];

  return (
    <div className="flex items-center gap-2.5 select-none">
      <svg width={d} height={d} viewBox="0 0 32 32" fill="none">
        <rect width="32" height="32" rx="8" fill="#111"/>
        <rect x="6" y="6" width="10" height="10" rx="2" fill="white" opacity="0.95"/>
        <rect x="16" y="16" width="10" height="10" rx="2" fill="white" opacity="0.35"/>
        <rect x="11" y="11" width="7" height="7" rx="1.5" fill="white"/>
      </svg>
      {showText && (
        <span className={`${textSizes[size]} font-display font-bold text-white leading-none tracking-tight`}
          style={{ fontFamily: "'Syne', sans-serif" }}>
          KarlX<span className="text-white/25 font-normal"> AI</span>
        </span>
      )}
    </div>
  );
}
