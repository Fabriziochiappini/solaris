import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { Veicolo } from '@/lib/types';
import { Metadata } from 'next';
import VeicoliGrid from '@/components/VeicoliGrid';
import CtaButtons from '@/components/CtaButtons';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Veicoli Club Car | Noleggio e Vendita Golf Car Sardegna',
  description: 'Scopri la flotta Sardinya Golf Car. Vendita e noleggio di veicoli elettrici Club Car, golf car premium per resort, privati e strutture in Costa Smeralda.',
  keywords: ['club car sardegna', 'vendita club car', 'flotta golf car', 'veicoli elettrici resort', 'noleggio golf car privati', 'comprare golf car sardegna', 'golf car litio'],
  alternates: {
    canonical: 'https://sardinyagolfcar.com/veicoli',
  }
};

async function getVeicoli(): Promise<Veicolo[]> {
  if (!isFirebaseConfigured) return [];
  try {
    let snap;
    try {
      const { orderBy } = await import('firebase/firestore');
      const q = query(collection(db, 'veicoli'), orderBy('updatedAt', 'desc'), limit(50));
      snap = await getDocs(q);
    } catch {
      const q = query(collection(db, 'veicoli'), limit(50));
      snap = await getDocs(q);
    }
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Veicolo));
  } catch {
    return [];
  }
}

export default async function FlottaPage() {
  const veicoli = await getVeicoli();

  return (
    <main className="bg-white">

      {/* ── HERO BANNER ── */}
      <header className="relative pt-40 pb-20 md:pt-52 md:pb-28 bg-primary overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,.05) 40px, rgba(255,255,255,.05) 41px)' }}
        />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <p className="text-secondary font-bold text-xs uppercase tracking-[0.4em] mb-4">Sardinya Golf Car</p>
          <h1 className="font-montserrat font-extrabold text-5xl md:text-7xl text-white tracking-tight mb-6">
            I Nostri Veicoli
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Ogni veicolo è selezionato per garantire il massimo del comfort, dell&apos;efficienza e dello stile nel territorio sardo.
          </p>
          <div className="h-1 w-20 bg-secondary mx-auto mt-10" />
        </div>
      </header>

      {/* ── GRIGLIA CON FILTRI ── */}
      <VeicoliGrid veicoli={veicoli} />

      {/* ── CTA FINALE ── */}
      <section className="py-24 bg-primary text-center">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-4">Pronto a scegliere?</p>
          <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-white mb-6 tracking-tight">
            Parliamo del tuo veicolo ideale
          </h2>
          <p className="text-white/70 text-lg mb-10">
            Contattaci per una consulenza personalizzata, un preventivo o per organizzare una prova.
          </p>
          <CtaButtons location="pagina_veicoli_bottom" />
        </div>
      </section>

    </main>
  );
}
