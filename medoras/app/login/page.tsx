'use client';

import { useState, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, ArrowLeft, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

function GoogleIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="rgba(255,255,255,0.8)">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

function LoginContent() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState('');
  const [sent, setSent] = useState(false);
  const params = useSearchParams();
  const isVerify = params.get('verify') === '1';
  const isError = params.get('error') === '1';

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading('email');
    try {
      await signIn('email', { email, redirect: false });
      setSent(true);
    } finally { setLoading(''); }
  };

  if (isVerify || sent) {
    return (
      <div className="flex flex-col items-center gap-5 text-center py-2 stagger">
        <div className="w-16 h-16 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center">
          <Mail size={26} className="text-white/70" />
        </div>
        <div>
          <p className="font-display font-bold text-white text-xl mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
            Cek email kamu
          </p>
          <p className="text-sm text-white/40 leading-relaxed max-w-xs">
            Link masuk sudah dikirim ke<br />
            <span className="text-white/70 font-medium">{email || 'email kamu'}</span>
          </p>
        </div>
        <button onClick={() => setSent(false)} className="text-xs text-white/25 hover:text-white/50 transition-colors">
          ← Kembali
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3.5 w-full stagger">
      {isError && (
        <div className="p-3 rounded-xl bg-white/4 border border-white/8 text-xs text-white/50 text-center">
          Terjadi kesalahan. Silakan coba lagi.
        </div>
      )}

      <button className="btn-oauth" onClick={() => { setLoading('google'); signIn('google', { callbackUrl: '/chat' }); }} disabled={!!loading}>
        <GoogleIcon />
        {loading === 'google' ? 'Menghubungkan...' : 'Lanjutkan dengan Google'}
      </button>

      <button className="btn-oauth" onClick={() => { setLoading('github'); signIn('github', { callbackUrl: '/chat' }); }} disabled={!!loading}>
        <GitHubIcon />
        {loading === 'github' ? 'Menghubungkan...' : 'Lanjutkan dengan GitHub'}
      </button>

      <div className="flex items-center gap-3 my-0.5">
        <div className="flex-1 h-px bg-white/6" />
        <span className="text-xs text-white/20">atau dengan email</span>
        <div className="flex-1 h-px bg-white/6" />
      </div>

      <form onSubmit={handleEmail} className="flex flex-col gap-3">
        <input type="email" placeholder="nama@email.com" value={email}
          onChange={e => setEmail(e.target.value)} className="auth-input" required />
        <button type="submit" className="btn-primary" disabled={!!loading || !email.trim()}>
          {loading === 'email' ? 'Mengirim...' : 'Kirim Link Masuk'}
        </button>
      </form>

      <p className="text-xs text-white/20 text-center pt-1">
        Dengan masuk kamu menyetujui{' '}
        <Link href="/privacy" className="underline decoration-white/20 hover:text-white/50 transition-colors">
          Kebijakan Privasi
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 60%)' }} />

      {/* Grid */}
      <div className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }} />

      <div className="w-full max-w-sm relative z-10">
        <Link href="/"
          className="inline-flex items-center gap-1.5 text-xs text-white/25 hover:text-white/55 transition-colors mb-8">
          <ArrowLeft size={12} /> Beranda
        </Link>

        <div className="bg-white/[0.025] border border-white/8 rounded-2xl p-7 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-1.5 mb-7">
            <Logo size="md" />
            <p className="text-sm text-white/30 mt-2">Masuk untuk mulai chat</p>
          </div>

          <Suspense fallback={<div className="text-center text-white/20 text-sm py-4">Memuat...</div>}>
            <LoginContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
