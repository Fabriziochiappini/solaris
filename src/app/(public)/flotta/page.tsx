import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { Veicolo } from '@/lib/types';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'La Nostra Flotta | Solaris Golf Car Sardegna',
  description: 'Scopri la gamma completa di golf car e veicoli utility Solaris. Veicoli elettrici premium per la Sardegna.',
};

async function getVeicoli(): Promise<Veicolo[]> {
  if (!isFirebaseConfigured) return [];
  try {
    let snap;
    try {
      const { orderBy } = await import('firebase/firestore');
      const q = query(collection(db, 'veicoli'), orderBy('updatedAt', 'desc'), limit(12));
      snap = await getDocs(q);
    } catch {
      const q = query(collection(db, 'veicoli'), limit(12));
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
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,.05) 40px, rgba(255,255,255,.05) 41px)' }}
        />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <p className="text-secondary font-bold text-xs uppercase tracking-[0.4em] mb-4">Sardynia Golf Car</p>
          <h1 className="font-montserrat font-extrabold text-5xl md:text-7xl text-white tracking-tight mb-6">
            La Nostra Flotta
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Ogni veicolo è selezionato per garantire il massimo del comfort, dell&apos;efficienza e dello stile nel territorio sardo.
          </p>
          <div className="h-1 w-20 bg-secondary mx-auto mt-10" />
        </div>
      </header>

      {/* ── SEZIONI VEICOLI (alternating text + image) ── */}
      {veicoli.length === 0 ? (
        <section className="py-40 text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-6 block">directions_car</span>
          <p className="text-on-surface-variant text-lg">Nessun veicolo disponibile al momento.</p>
          <p className="text-on-surface-variant/60 text-sm mt-2">Torna presto o contattaci per informazioni.</p>
        </section>
      ) : (
        veicoli.map((v, i) => {
          const imageRight = i % 2 === 0;
          const foto = v.landing?.heroImmagine || v.foto?.[0] || null;
          const desc = v.landing?.heroDescrizione || '';
          const prezzo = v.prezzo > 0;

          return (
            <section
              key={v.id}
              className={`py-20 md:py-28 ${i % 2 === 0 ? 'bg-white' : 'bg-surface-container-lowest'} border-b border-outline-variant/10`}
            >
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${!imageRight ? 'lg:grid-flow-dense' : ''}`}>

                  {/* ── COLONNA TESTO ── */}
                  <div className={!imageRight ? 'lg:col-start-2' : ''}>
                    {/* Numero progressivo */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="font-montserrat font-black text-7xl text-primary/8 leading-none select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-outline-variant/30" />
                    </div>

                    {v.categoria && (
                      <p className="text-secondary font-bold text-[10px] uppercase tracking-[0.35em] mb-3">
                        {v.categoria}
                      </p>
                    )}
                    <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-primary tracking-tight leading-tight mb-5">
                      {v.nome}
                    </h2>

                    {desc && (
                      <p className="text-on-surface-variant text-base md:text-lg leading-relaxed mb-8 max-w-lg">
                        {desc}
                      </p>
                    )}

                    {/* Specs se disponibili */}
                    {Object.keys(v.specs || {}).length > 0 && (
                      <div className="space-y-2 mb-8">
                        {Object.entries(v.specs || {}).slice(0, 4).map(([k, val]) => (
                          <div key={k} className="flex items-center justify-between border-b border-outline-variant/15 pb-2">
                            <span className="text-on-surface-variant text-sm">{k}</span>
                            <span className="font-montserrat font-bold text-primary text-sm">{val}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4">
                      {prezzo && (
                        <span className="font-montserrat font-black text-2xl text-secondary">
                          Da €{v.prezzo.toLocaleString('it-IT')}
                        </span>
                      )}
                      <Link
                        href={`/veicoli/${v.id}`}
                        className="inline-flex items-center gap-2 bg-primary text-white font-montserrat font-bold text-[11px] uppercase tracking-[0.2em] px-7 py-4 hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                      >
                        Scopri di più
                        <span className="material-symbols-outlined text-sm">north_east</span>
                      </Link>
                    </div>
                  </div>

                  {/* ── COLONNA IMMAGINE ── */}
                  <div className={`relative ${!imageRight ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                    {/* Decorazione geometrica */}
                    <div className={`absolute inset-0 bg-secondary/8 ${imageRight ? 'translate-x-4 translate-y-4' : '-translate-x-4 translate-y-4'} -z-10`} />
                    <div className="aspect-[4/3] bg-white overflow-hidden shadow-2xl">
                      {foto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={foto}
                          alt={v.nome}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-surface-container">
                          <span className="material-symbols-outlined text-8xl text-on-surface-variant/15">directions_car</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })
      )}

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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contatti"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-primary font-montserrat font-bold text-sm uppercase tracking-widest px-10 py-5 hover:bg-secondary/90 transition-all shadow-xl hover:-translate-y-1"
            >
              <span className="material-symbols-outlined text-base">chat</span>
              Richiedi Preventivo
            </Link>
            <Link
              href="https://wa.me/393401234567"
              target="_blank"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-montserrat font-bold text-sm uppercase tracking-widest px-10 py-5 hover:bg-white/10 transition-all"
            >
              WhatsApp
            </Link>
          </div>
        </div>
      </section>

    </main>
  );
}
