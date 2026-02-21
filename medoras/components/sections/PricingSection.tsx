import { Check, Zap } from 'lucide-react';
import Link from 'next/link';

const plans = [
  {
    name: 'Free',
    price: 'Rp 0',
    period: '/ selamanya',
    desc: 'Coba semua fitur dasar tanpa biaya',
    features: ['AI Chat (KarlX AI)', 'Upload gambar', 'Riwayat chat terbatas', 'Syntax highlighting'],
    cta: 'Mulai Gratis',
    popular: false,
  },
  {
    name: 'Pro',
    price: 'Rp 20.000',
    period: '/ bulan',
    desc: 'Untuk yang butuh lebih — tanpa batas',
    features: ['Semua fitur Free', 'Chat tanpa limit', 'Riwayat permanen', 'Code workspace lengkap', 'Priority support'],
    cta: 'Upgrade ke Pro',
    popular: true,
  },
  {
    name: '1 Tahun',
    price: 'Rp 120.000',
    period: '/ tahun',
    desc: 'Hemat lebih banyak dengan paket tahunan',
    features: ['Semua fitur Pro', 'Dedicated support', 'Custom deployment', 'SLA guarantee'],
    cta: 'Pilih Tahunan',
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="harga" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full border border-[#00d4ff]/20 bg-[#00d4ff]/5 text-[#00d4ff] text-xs font-mono mb-4">
            HARGA
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Mulai gratis,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#38bdf8]">
              upgrade kalau butuh
            </span>
          </h2>
          <p className="text-white/40">Tidak ada biaya tersembunyi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {plans.map((plan) => (
            <div key={plan.name}
              className={`relative p-6 rounded-2xl border transition-all duration-300 ${
                plan.popular
                  ? 'border-[#00d4ff]/30 bg-gradient-to-b from-[#00d4ff]/8 to-transparent shadow-[0_0_40px_rgba(0,212,255,0.07)]'
                  : 'border-white/5 bg-white/[0.02]'
              }`}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-[#00d4ff] to-[#0284c7] text-white text-xs font-bold whitespace-nowrap">
                  Paling Populer
                </div>
              )}
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-1 text-white">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-white/30">{plan.period}</span>
                </div>
                <p className="text-sm text-white/40">{plan.desc}</p>
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                    <Check size={14} className="text-[#00d4ff] flex-shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/chat"
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-[#00d4ff] to-[#0284c7] text-white hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]'
                    : 'border border-white/10 text-white/60 hover:bg-white/5 hover:text-white'
                }`}>
                <Zap size={14} />{plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
