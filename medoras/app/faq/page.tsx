'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronLeft, Plus } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

const faqs = [
  { q: 'Apakah KarlX AI gratis?', a: 'Ya, 100% gratis. Tidak ada biaya tersembunyi atau batasan penggunaan.' },
  { q: 'Model AI apa yang digunakan?', a: 'KarlX AI menggunakan Gemini 2.0 Flash Lite dari Google — cepat dan akurat.' },
  { q: 'Apakah history chat tersimpan?', a: 'History tersimpan di browser kamu (localStorage). Data tidak dikirim ke server kami.' },
  { q: 'Bagaimana cara login?', a: 'Kamu bisa masuk dengan Google, GitHub, atau email (magic link — tanpa password).' },
  { q: 'Apakah data saya aman?', a: 'Pesan dikirim ke Gemini API untuk diproses. History hanya ada di browser kamu.' },
  { q: 'Bagaimana cara hapus history?', a: 'Di halaman Obrolan, hover pada chat lalu klik icon hapus di sebelah kanan.' },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
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
            FAQ
          </h1>
          <p className="text-white/30 text-sm mb-10">Pertanyaan yang sering ditanyakan</p>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl overflow-hidden transition-all"
                style={{ border: '1px solid rgba(255,255,255,0.07)', background: open === i ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.015)' }}>
                <button className="w-full flex items-center justify-between p-5 text-left gap-4 hover:bg-white/2 transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}>
                  <span className="text-sm font-semibold text-white/75" style={{ fontFamily: "'Syne', sans-serif" }}>{faq.q}</span>
                  <div className={`w-5 h-5 flex items-center justify-center rounded-md flex-shrink-0 transition-all ${open === i ? 'bg-white/10 rotate-45' : ''}`}>
                    <Plus size={13} className="text-white/30" />
                  </div>
                </button>
                {open === i && (
                  <div className="px-5 pb-5 text-sm text-white/40 leading-relaxed" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <p className="pt-4">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-14 pt-10" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <Link href="/chat"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-white text-black hover:opacity-88 transition-all"
              style={{ fontFamily: "'Syne', sans-serif" }}>
              Mulai Chat
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
