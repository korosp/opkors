import Link from 'next/link';
import { ChevronLeft, Mail, Github, Instagram, ArrowUpRight } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const contacts = [
  { href: 'mailto:dev@karlxai.com', icon: <Mail size={17} />, label: 'Email', sub: 'dev@karlxai.com', external: false },
  { href: 'https://github.com', icon: <Github size={17} />, label: 'GitHub', sub: 'github.com/karlxai', external: true },
  { href: 'https://instagram.com', icon: <Instagram size={17} />, label: 'Instagram', sub: '@karlxai', external: true },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-2xl mx-auto px-5 py-10">
        <div className="flex items-center gap-3 mb-12">
          <Link href="/chat"
            className="w-9 h-9 flex items-center justify-center rounded-xl text-white/30 hover:text-white hover:bg-white/6 transition-all -ml-2">
            <ChevronLeft size={18} />
          </Link>
          <Logo size="sm" />
        </div>
        <div className="stagger">
          <h1 className="font-bold text-white mb-2 tracking-tight" style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem' }}>
            Kontak
          </h1>
          <p className="text-white/30 text-sm mb-10">Hubungi developer atau ikuti kami</p>
          <div className="space-y-3">
            {contacts.map(item => (
              <a key={item.label} href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-4 p-5 rounded-2xl transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'; }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white/35 group-hover:text-white/70 transition-colors"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-white/70" style={{ fontFamily: "'Syne', sans-serif" }}>{item.label}</p>
                  <p className="text-xs text-white/30 mt-0.5">{item.sub}</p>
                </div>
                {item.external && <ArrowUpRight size={14} className="text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
