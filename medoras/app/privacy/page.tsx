import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <Link href="/" className="p-2 rounded-xl hover:bg-white/6 transition-colors text-white/40 hover:text-white">
            <ChevronLeft size={18} />
          </Link>
          <Logo size="sm" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Kebijakan Privasi</h1>
        <p className="text-white/40 text-sm mb-10">Terakhir diperbarui: Februari 2025</p>
        <div className="space-y-8 text-sm text-white/50 leading-relaxed">
          {[
            { title: 'Data yang Dikumpulkan', content: 'Kami mengumpulkan email dan nama saat kamu login via Google, GitHub, atau email. History chat hanya disimpan di browser kamu (localStorage) dan tidak dikirim ke server kami.' },
            { title: 'Penggunaan Data', content: 'Data login digunakan hanya untuk autentikasi. Pesan kamu dikirim ke Gemini API untuk mendapatkan respons AI, namun tidak disimpan permanen di sisi kami.' },
            { title: 'Keamanan', content: 'Kami menggunakan NextAuth.js untuk autentikasi yang aman. Semua komunikasi dienkripsi via HTTPS.' },
            { title: 'Hak Kamu', content: 'Kamu bisa menghapus akun kapan saja. History chat bisa dihapus langsung dari browser di halaman Obrolan.' },
            { title: 'Kontak', content: 'Ada pertanyaan? Hubungi kami di dev@karlxai.com' },
          ].map(s => (
            <div key={s.title}>
              <h2 className="text-base font-semibold text-white/80 mb-2">{s.title}</h2>
              <p>{s.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
