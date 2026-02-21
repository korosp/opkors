import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="relative p-12 rounded-3xl border border-[#00d4ff]/15 bg-gradient-to-b from-[#00d4ff]/5 to-transparent overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,212,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,212,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
              Siap kerja lebih{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#38bdf8]">
                cepat?
              </span>
            </h2>
            <p className="text-white/40 mb-8">
              Bergabung sekarang — gratis, tanpa kartu kredit, langsung bisa pakai.
            </p>
            <Link href="/chat"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white
                         bg-gradient-to-r from-[#00d4ff] to-[#0284c7]
                         hover:shadow-[0_0_40px_rgba(0,212,255,0.4)] transition-all duration-300">
              <Zap size={18} />
              Mulai Sekarang — Gratis
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
