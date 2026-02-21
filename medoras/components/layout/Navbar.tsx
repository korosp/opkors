'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const links = [
    { href: '#fitur', label: 'Fitur' },
    { href: '#harga', label: 'Harga' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#0284c7] flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all duration-300">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">
            Karl<span className="text-[#00d4ff]">X</span>
            <span className="text-xs ml-1 opacity-40 font-mono">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <Link key={l.href} href={l.href}
              className="text-sm text-white/50 hover:text-[#00d4ff] transition-all duration-200 font-medium">
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/chat"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold
                       bg-gradient-to-r from-[#00d4ff] to-[#0284c7] text-white
                       hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all duration-300">
            <Zap size={14} />
            Mulai Gratis
          </Link>
          <button className="md:hidden p-2 rounded-lg border border-white/10 text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-black border-b border-white/5 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="text-sm font-medium text-white/60" onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/chat" className="text-sm font-semibold text-[#00d4ff]" onClick={() => setOpen(false)}>
            Mulai Gratis →
          </Link>
        </div>
      )}
    </nav>
  );
}
