import { MessageSquare, Image, Code2, FileText, History, Lock } from 'lucide-react';

const features = [
  { icon: MessageSquare, title: 'Chat Cerdas', desc: 'Tanya apa saja, jawaban muncul dalam hitungan detik. Support konteks percakapan panjang.' },
  { icon: Image, title: 'Analisis Gambar', desc: 'Upload foto atau screenshot, KarlX AI bisa mendeskripsikan dan menganalisis isinya.' },
  { icon: Code2, title: 'Code Editor', desc: 'Tulis, debug, dan jelaskan kode langsung dalam chat. Support 50+ bahasa pemrograman.' },
  { icon: FileText, title: 'Buat Dokumen', desc: 'Dari email, artikel, hingga laporan bisnis — semua dibuat dalam hitungan detik.' },
  { icon: History, title: 'Riwayat Chat', desc: 'Semua percakapan tersimpan otomatis. Bisa dilanjutkan dan diakses kapan saja.' },
  { icon: Lock, title: 'Aman & Privat', desc: 'Data kamu terenkripsi. Tidak pernah dibagikan ke pihak ketiga manapun.' },
];

export function FeaturesSection() {
  return (
    <section id="fitur" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 text-[#00d4ff] text-xs font-mono mb-4">
            FITUR UNGGULAN
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Semua yang kamu butuhkan,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#38bdf8]">
              satu tempat
            </span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">
            Tidak perlu pindah-pindah aplikasi. KarlX AI punya semua tools yang kamu butuhkan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title}
              className="group p-6 rounded-2xl border border-white/5 bg-white/[0.02]
                         hover:border-[#00d4ff]/25 hover:bg-white/[0.04]
                         transition-all duration-300">
              <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 flex items-center justify-center mb-4
                              group-hover:bg-[#00d4ff]/20 transition-colors">
                <Icon size={20} className="text-[#00d4ff]" />
              </div>
              <h3 className="font-semibold text-base mb-2 text-white">{title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
