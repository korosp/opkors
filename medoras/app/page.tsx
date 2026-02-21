'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { ArrowRight, MessageSquare, Zap, Code2, Shield } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export default function LandingPage() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen bg-black flex flex-col relative overflow-hidden">

      {/* Grid background */}
      <div className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }} />

      {/* Glow center */}
      <div className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] z-0"
        style={{ background: 'radial-gradient(ellipse at center top, rgba(255,255,255,0.04) 0%, transparent 70%)' }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto w-full">
        <Logo size="sm" />
        <div className="flex items-center gap-2">
          {session ? (
            <Link href="/chat"
              className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:opacity-85 transition-all active:scale-95"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Buka Chat <ArrowRight size={13} />
            </Link>
          ) : (
            <>
              <Link href="/login"
                className="text-sm text-white/40 hover:text-white/80 transition-colors px-3 py-2 rounded-lg"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                Masuk
              </Link>
              <Link href="/login"
                className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-semibold rounded-lg hover:opacity-85 transition-all active:scale-95"
                style={{ fontFamily: "'Syne', sans-serif" }}>
                Mulai Gratis
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-16 stagger">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs text-white/40 mb-10 backdrop-blur-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-white/50 animate-pulse" />
          Powered by Gemini AI — 100% Gratis
        </div>

        <h1 className="font-display font-bold text-white leading-[1.05] tracking-tight mb-6"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: 'clamp(2.8rem, 8vw, 5.5rem)' }}>
          AI yang <span className="text-white/20">benar-benar</span><br />
          membantu kamu
        </h1>

        <p className="text-white/40 max-w-md mb-10 leading-relaxed" style={{ fontSize: '1rem' }}>
          KarlX AI siap bantu coding, menulis, analisis, dan apapun yang kamu butuhkan. Cerdas, cepat, dan gratis.
        </p>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <Link href={session ? '/chat' : '/login'}
            className="group flex items-center gap-2.5 px-6 py-3.5 bg-white text-black font-semibold text-sm rounded-xl hover:opacity-88 transition-all active:scale-95"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            {session ? 'Lanjut Chat' : 'Mulai Sekarang'}
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link href="/faq"
            className="px-6 py-3.5 text-white/40 text-sm font-medium rounded-xl border border-white/8 hover:border-white/18 hover:text-white/70 transition-all"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            Pelajari lebih
          </Link>
        </div>
      </main>

      {/* Feature cards */}
      <section className="relative z-10 max-w-5xl mx-auto w-full px-6 pb-20 stagger">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: <MessageSquare size={18} />, title: 'Chat Natural', desc: 'Percakapan Bahasa Indonesia yang natural dan kontekstual' },
            { icon: <Zap size={18} />, title: 'Respons Cepat', desc: 'Jawaban instan, tidak ada delay yang menyebalkan' },
            { icon: <Code2 size={18} />, title: 'Bantu Coding', desc: 'Debug, review, dan tulis kode bersama AI' },
            { icon: <Shield size={18} />, title: '100% Gratis', desc: 'Tidak ada biaya, tidak ada batasan tersembunyi' },
          ].map((f, i) => (
            <div key={i}
              className="group p-5 rounded-2xl border border-white/6 bg-white/[0.015] hover:bg-white/[0.04] hover:border-white/12 transition-all duration-300 cursor-default">
              <div className="w-8 h-8 rounded-lg border border-white/8 bg-white/5 flex items-center justify-center text-white/40 group-hover:text-white/70 transition-colors mb-4">
                {f.icon}
              </div>
              <p className="text-sm font-semibold text-white/70 mb-1.5" style={{ fontFamily: "'Syne', sans-serif" }}>{f.title}</p>
              <p className="text-xs text-white/30 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 py-5 px-6 flex items-center justify-between max-w-6xl mx-auto w-full">
        <Logo size="sm" showText={false} />
        <div className="flex items-center gap-5 text-xs text-white/20">
          <Link href="/privacy" className="hover:text-white/50 transition-colors">Privacy</Link>
          <Link href="/faq" className="hover:text-white/50 transition-colors">FAQ</Link>
          <Link href="/contact" className="hover:text-white/50 transition-colors">Kontak</Link>
        </div>
        <p className="text-xs text-white/15">© 2025 KarlX AI</p>
      </footer>
    </div>
  );
}
