import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { Veicolo } from '@/lib/types';
import Link from 'next/link';
import { Metadata } from 'next';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'I Nostri Veicoli | Solaris Golf Car Sardegna',
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
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,.05) 40px, rgba(255,255,255,.05) 41px)' }}
        />
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <p className="text-secondary font-bold text-xs uppercase tracking-[0.4em] mb-4">Sardynia Golf Car</p>
          <h1 className="font-montserrat font-extrabold text-5xl md:text-7xl text-white tracking-tight mb-6">
            I Nostri Veicoli
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Ogni veicolo è selezionato per garantire il massimo del comfort, dell&apos;efficienza e dello stile nel territorio sardo.
          </p>
          <div className="h-1 w-20 bg-secondary mx-auto mt-10" />
        </div>
      </header>

      {/* ── SEZIONI VEICOLI ── */}
      {veicoli.length === 0 ? (
        <section className="py-40 text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-6 block">directions_car</span>
          <p className="text-on-surface-variant text-lg">Nessun veicolo disponibile al momento.</p>
        </section>
      ) : (
        veicoli.map((v, i) => {
          const imageRight = i % 2 === 0;
          const foto = v.landing?.heroImmagine || v.foto?.[0] || null;
          const desc = v.landing?.heroDescrizione || '';

          return (
            <section
              key={v.id}
              className={`py-14 md:py-28 ${i % 2 === 0 ? 'bg-white' : 'bg-surface-container-lowest'} border-b border-outline-variant/10`}
            >
              <div className="max-w-7xl mx-auto px-5 lg:px-8">
                {/*
                  MOBILE: immagine SEMPRE in cima (order-1), testo sotto (order-2)
                  DESKTOP: alterna sinistra/destra con lg:order-*
                */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

                  {/* ── IMMAGINE: order-1 su mobile, alterna su lg ── */}
                  <div className={`relative order-1 ${imageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className={`absolute inset-0 bg-secondary/8 -z-10 ${imageRight
                      ? 'translate-x-3 translate-y-3 lg:translate-x-4 lg:translate-y-4'
                      : '-translate-x-3 translate-y-3 lg:-translate-x-4 lg:translate-y-4'
                    }`} />
                    <div className="aspect-[16/10] md:aspect-[4/3] bg-white overflow-hidden shadow-xl">
                      {foto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={foto} alt={v.nome} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-surface-container">
                          <span className="material-symbols-outlined text-8xl text-on-surface-variant/15">directions_car</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── TESTO: order-2 su mobile, alterna su lg ── */}
                  <div className={`order-2 ${imageRight ? 'lg:order-1' : 'lg:order-2'}`}>

                    {/* Numero decorativo solo desktop */}
                    <div className="hidden lg:flex items-center gap-4 mb-6">
                      <span className="font-montserrat font-black text-7xl text-primary/8 leading-none select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-outline-variant/30" />
                    </div>

                    {v.categoria && (
                      <p className="text-secondary font-bold text-[10px] uppercase tracking-[0.35em] mb-2 lg:mb-3">
                        {v.categoria}
                      </p>
                    )}
                    <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl lg:text-5xl text-primary tracking-tight leading-tight mb-4 lg:mb-5">
                      {v.nome}
                    </h2>

                    {desc && (
                      <p className="text-on-surface-variant text-sm md:text-base lg:text-lg leading-relaxed mb-5 lg:mb-8 max-w-lg">
                        {desc}
                      </p>
                    )}

                    {/* Specs */}
                    {Object.keys(v.specs || {}).length > 0 && (
                      <div className="space-y-2 mb-6 lg:mb-8">
                        {Object.entries(v.specs || {}).slice(0, 4).map(([k, val]) => (
                          <div key={k} className="flex items-center justify-between border-b border-outline-variant/15 pb-2">
                            <span className="text-on-surface-variant text-sm">{k}</span>
                            <span className="font-montserrat font-bold text-primary text-sm">{val}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4">
                      {v.prezzo > 0 && (
                        <span className="font-montserrat font-black text-xl md:text-2xl text-secondary">
                          Da €{v.prezzo.toLocaleString('it-IT')}
                        </span>
                      )}
                      <Link
                        href={`/veicoli/${v.slug || v.id}`}
                        className="inline-flex items-center gap-2 bg-primary text-white font-montserrat font-bold text-[11px] uppercase tracking-[0.2em] px-6 py-3.5 lg:px-7 lg:py-4 hover:bg-primary/90 shadow-lg hover:-translate-y-0.5 transition-all"
                      >
                        Scopri di più
                        <span className="material-symbols-outlined text-sm">north_east</span>
                      </Link>
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
