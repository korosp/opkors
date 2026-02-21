import Link from 'next/link';
import { Zap } from 'lucide-react';

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
    </svg>
  );
}

function IconGithub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function IconTiktok() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z"/>
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0284c7] flex items-center justify-center">
            <Zap size={13} className="text-white fill-white" />
          </div>
          <span className="font-bold text-base text-white">
            Karl<span className="text-[#00d4ff]">X</span>
            <span className="text-xs ml-1 opacity-40 font-mono">AI</span>
          </span>
        </div>

        <p className="text-sm text-white/30">© 2025 KarlX AI. All rights reserved.</p>

        <div className="flex items-center gap-5">
          <Link href="/privacy" className="text-sm text-white/30 hover:text-white/70 transition-colors">Privacy</Link>
          <Link href="#" className="text-sm text-white/30 hover:text-white/70 transition-colors">Terms</Link>
          <div className="flex items-center gap-3 ml-2">
            <Link href="https://instagram.com" target="_blank"
              className="text-white/30 hover:text-[#00d4ff] transition-colors">
              <IconInstagram />
            </Link>
            <Link href="https://github.com" target="_blank"
              className="text-white/30 hover:text-[#00d4ff] transition-colors">
              <IconGithub />
            </Link>
            <Link href="https://tiktok.com" target="_blank"
              className="text-white/30 hover:text-[#00d4ff] transition-colors">
              <IconTiktok />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
