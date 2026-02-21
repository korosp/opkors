'use client';

import Link from 'next/link';
import { ArrowRight, Zap, Shield, Cpu } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#00d4ff]/4 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-6 text-center z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 text-[#00d4ff] text-xs font-mono mb-8"
          style={{ animation: 'fadeUp 0.5s ease forwards' }}>
          <span className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full animate-pulse" />
          KarlX AI — Powered by GPT-4o
        </div>

        <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-6 text-white"
          style={{ animation: 'fadeUp 0.55s 0.1s ease forwards', opacity: 0 }}>
          AI yang{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#38bdf8]">
            Benar-Benar
          </span>
          <br />Memahami Kamu
        </h1>

        <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ animation: 'fadeUp 0.55s 0.2s ease forwards', opacity: 0 }}>
          KarlX AI hadir untuk bantu kamu coding, nulis, analisis data, dan banyak lagi.
          Response instan, akurat, dan gratis untuk mulai.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          style={{ animation: 'fadeUp 0.55s 0.3s ease forwards', opacity: 0 }}>
          <Link href="/chat"
            className="group flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-[#00d4ff] to-[#0284c7]
                       hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300">
            <Zap size={18} />
            Mulai Sekarang
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="#fitur"
            className="px-6 py-3.5 rounded-xl font-semibold border border-white/10 text-white/70
                       hover:bg-white/5 hover:border-white/20 transition-all duration-300">
            Lihat Fitur
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto"
          style={{ animation: 'fadeUp 0.55s 0.4s ease forwards', opacity: 0 }}>
          {[
            { icon: Zap, label: 'Response Instan', value: '<1s' },
            { icon: Shield, label: 'End-to-End', value: '100%' },
            { icon: Cpu, label: 'Powered by', value: 'GPT-4o' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold text-[#00d4ff] mb-1">{value}</div>
              <div className="text-xs text-white/30 flex items-center justify-center gap-1">
                <Icon size={10} />{label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
