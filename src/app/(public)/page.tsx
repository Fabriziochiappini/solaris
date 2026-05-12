import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { Veicolo } from '@/lib/types';
import ShowroomCarousel from '@/components/ShowroomCarousel';
import UseCasesSection from '@/components/UseCasesSection';
import Link from 'next/link';
import CtaButtons from '@/components/CtaButtons';

export const revalidate = 0;

// Dati di fallback (mostrati se Firestore è vuoto o non raggiungibile)
const VEICOLI_FALLBACK: Veicolo[] = [
  {
    id: 'fallback-1',
    nome: 'Edizione Porto Cervo',
    categoria: 'Touring di Lusso',
    prezzo: 24500,
    specs: { Autonomia: '135 km', Capienza: '4 Adulti', 'Sistema di Guida': '72V AC Drive' },
    foto: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBhJEJRrhyTOhMsCK0pumZwXOIeDD0im9Lte-RWCFmXBz4IfESPd1bTXPJkZnpCT3i6EH5-VzoIyImKLACFiWM-e436JAoRxstB2HVMUNeGmb44ObaZz6iUxbtHQWzsOteFNk3GXvCu5aiQCD-BdzZGWLiMs7Jr9N3qzsdEYTaTbvVaIYzUyqIEke43Zp6oh8fJKyWwob7ZgaIie7cSiGOvo2sB8bD_pwJyFlMRdG5KwsrKQwVpDre6l2BWSbvC3bGcerovvddJdYE'],
  },
  {
    id: 'fallback-2',
    nome: 'Maremma Rugged',
    categoria: 'Utilità per Tenute',
    prezzo: 19800,
    specs: { Portata: '408 kg', Sospensioni: 'Fuoristrada', Pneumatici: 'All-Terrain' },
    foto: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCSZsm7RbUNMr1rVhJNwQZ54ZlkiFzhiaDi6TZnqmD4DrdhYdhRU6J-T17qlWGKVPQBwPKZ6cYa03oziKrY8ARPjEQZtVPVUWW4SxwjUug_5CbmMvgl4q4PsIgsFeVVqmcqsbMmHa66vmJsuKa6lRlfDuBExKovQWRdASRUlUQHNMKVjs8LJP_0b2N2ozy_opIWqqyfQsyXYJSbkUndZFBqyFFjrPMa5mDQ65UwcRJw7VA6Ogx_bwrfZq3p2RBF9fmvjQP6AV7uQfE'],
  },
  {
    id: 'fallback-3',
    nome: 'Costa Smeralda',
    categoria: 'Crociera Personale',
    prezzo: 16200,
    specs: { Posti: '2 Persone', Cerchi: 'Cromati 14"', Garanzia: '5 Anni Ltd' },
    foto: ['https://lh3.googleusercontent.com/aida-public/AB6AXuAkmnJMKgcjBvM1Gl0FXnx2PRmC6v5JAluHq6V9iq_fd38TdQOum4Hg1sMUwoVzZz9i97E-x6emuUeLyKWWnx2HymLLP73KXcDm3bj4H37Pb037wUbd9wheEI1dlxmYillZ68JkeC4JLy75WmiNIWIdOqEFeWA8KaTPoZGuQBCuwB6gfDVpWiQgCx359dXTyy9Gkqu5JJMZ4SYeXHK4TJaWw2bCCWzpnpnFvU5YPF9WYVqUNx9Wc8hoEx7ytc23PTFxxgQwjQlzOrs'],
  },
];

async function getVeicoli(): Promise<Veicolo[]> {
  if (!isFirebaseConfigured) return VEICOLI_FALLBACK;
  try {
    // Prova prima con updatedAt, poi senza order se manca l'indice
    let snap;
    try {
      const q = query(collection(db, 'veicoli'), orderBy('updatedAt', 'desc'), limit(8));
      snap = await getDocs(q);
    } catch {
      const q = query(collection(db, 'veicoli'), limit(8));
      snap = await getDocs(q);
    }
    if (snap.empty) return VEICOLI_FALLBACK;
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Veicolo));
  } catch {
    return VEICOLI_FALLBACK;
  }
}

export default async function Home() {
  const veicoli = await getVeicoli();
  return (
    <main>
      {/* Hero Section — Bottom-left aligned cinematic */}
      <header className="relative h-screen w-full overflow-hidden flex flex-col justify-end pb-24 md:pb-32 px-6 lg:px-20">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"></div>
        <img
          className="absolute inset-0 w-full h-full object-cover z-0"
          alt="Premium electric golf cart on a lush green fairway of a world-class golf course"
          src="/hero-bg.webp"
        />
        <div className="relative z-20 text-left w-full max-w-4xl">
          <div className="mb-4 inline-block">
            <span className="bg-green-600 text-white font-bold tracking-widest uppercase text-sm md:text-base px-4 py-2 rounded-md shadow-sm">
              SARDYNIA GOLF CAR
            </span>
          </div>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <Link href="/servizi#vendita" className="bg-white/15 backdrop-blur-md border border-white/30 text-white font-semibold tracking-widest uppercase text-xs px-3 py-1.5 rounded-md hover:bg-white/25 transition-all">
              Vendita
            </Link>
            <span className="text-white/60 select-none">·</span>
            <Link href="/servizi#noleggio" className="bg-white/15 backdrop-blur-md border border-white/30 text-white font-semibold tracking-widest uppercase text-xs px-3 py-1.5 rounded-md hover:bg-white/25 transition-all">
              Noleggio
            </Link>
            <span className="text-white/60 select-none">·</span>
            <Link href="/servizi#assistenza" className="bg-white/15 backdrop-blur-md border border-white/30 text-white font-semibold tracking-widest uppercase text-xs px-3 py-1.5 rounded-md hover:bg-white/25 transition-all">
              Assistenza
            </Link>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6">
            Mobilità Elettrica<br />
            <span className="text-white/80">Premium.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light mb-10 max-w-2xl">
            Vendita, noleggio e assistenza di golf car e veicoli elettrici premium in tutta la Sardegna. Per il lavoro, il tempo libero e le strutture ricettive.
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Link href="/veicoli" className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-lg text-lg font-bold hover:scale-105 transition-transform inline-block text-center shadow-lg">
              Scopri i Veicoli
            </Link>
            <Link href="/servizi" className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg text-lg font-bold hover:bg-white/20 transition-all inline-block text-center shadow-lg">
              Richiedi Preventivo
            </Link>
          </div>
        </div>
      </header>

      {/* I nostri servizi — 3 card affiancate (vendita / noleggio / assistenza) */}
      <section className="py-20 md:py-24 bg-white border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">Cosa Facciamo</p>
            <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-primary tracking-tight">
              Tre servizi, un&apos;unica realtà
            </h2>
            <div className="h-1.5 w-24 bg-secondary mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card Vendita */}
            <Link
              href="/servizi#vendita"
              className="group relative flex flex-col bg-white border border-outline-variant/20 hover:border-primary/40 hover:shadow-2xl transition-all duration-300 p-8 lg:p-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <span className="material-symbols-outlined text-secondary text-5xl mb-6">storefront</span>
              <h3 className="font-montserrat font-extrabold text-2xl text-primary tracking-tight mb-2 uppercase">
                Vendita
              </h3>
              <p className="text-xs text-secondary font-semibold tracking-widest uppercase mb-4">Nuovo &middot; Usato &middot; Personalizzato</p>
              <p className="text-on-surface-variant leading-relaxed mb-6 flex-1">
                Golf car Club Car e veicoli elettrici premium per privati, hotel, resort e aziende.
                Modelli nuovi, selezione di usato garantito e configurazioni su misura.
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-montserrat font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                Scopri la vendita
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </Link>

            {/* Card Noleggio */}
            <Link
              href="/servizi#noleggio"
              className="group relative flex flex-col bg-primary text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 p-8 lg:p-10 overflow-hidden"
            >
              <div className="absolute top-3 right-3 bg-secondary text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-sm">
                Più richiesto
              </div>
              <span className="material-symbols-outlined text-secondary text-5xl mb-6">key</span>
              <h3 className="font-montserrat font-extrabold text-2xl tracking-tight mb-2 uppercase">
                Noleggio
              </h3>
              <p className="text-xs text-secondary font-semibold tracking-widest uppercase mb-4">Eventi &middot; Stagionale &middot; Long-term</p>
              <p className="text-white/80 leading-relaxed mb-6 flex-1">
                Soluzioni mensili e stagionali su misura per hotel, resort, agriturismi e ville private.
                Manutenzione e assistenza incluse nel canone.
              </p>
              <span className="inline-flex items-center gap-2 text-white font-montserrat font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                Richiedi un preventivo
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </Link>

            {/* Card Assistenza */}
            <Link
              href="/servizi#assistenza"
              className="group relative flex flex-col bg-white border border-outline-variant/20 hover:border-primary/40 hover:shadow-2xl transition-all duration-300 p-8 lg:p-10 overflow-hidden"
            >
              <div className="absolute top-0 left-0 h-1 w-full bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              <span className="material-symbols-outlined text-secondary text-5xl mb-6">build</span>
              <h3 className="font-montserrat font-extrabold text-2xl text-primary tracking-tight mb-2 uppercase">
                Assistenza
              </h3>
              <p className="text-xs text-secondary font-semibold tracking-widest uppercase mb-4">Manutenzione &middot; Ricambi &middot; In loco</p>
              <p className="text-on-surface-variant leading-relaxed mb-6 flex-1">
                Tecnici certificati Club Car, ricambi originali e interventi a domicilio in tutta la Sardegna.
                Manutenzione programmata e upgrade batterie.
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-montserrat font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                Prenota un intervento
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Lo Showroom — carosello 3D coverflow */}
      <section className="py-20 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 mb-12">
          <h2 className="font-montserrat font-extrabold text-4xl text-primary tracking-tight uppercase mb-4">Lo Showroom</h2>
          <div className="h-1 w-24 bg-secondary"></div>
        </div>
        <ShowroomCarousel veicoli={veicoli} />
      </section>

      {/* Per ogni stile di vita */}
      <UseCasesSection />

      {/* Sostenibilità & Design — Sezione con nave */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-20 grayscale"
            alt="Scenic view of the Sardinian coast with crystal clear water and granite rocks"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI9zuZICZzaG-7tolc3-yX78SSBiP_6l5uaDA4xudLvsqFkmzLRs0Kb0vJni66y8pPHjLxFamOnjYKLd5b6PUelhGBBx11_zDt3gPlN0o3YLfAM0pYYh87jjtmtmJVhrPxzUIdewnD6HAKP3WwcQE9N7g9YgJTmVWNfWxBs4PJXRtyHYQuX7NvSxTyQ-tJxEmCLQnYZPO5p099SnLMnrBqr9rQ8LNZViXyGWkN_O-HdoHAVno5PzVRZcTAWjh2S8bH3s3H9ojBU0o"
          />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-primary font-bold tracking-widest uppercase text-xs">Il Nostro Impegno</span>
              <h2 className="text-5xl font-bold mt-4 mb-8 leading-tight text-on-surface">
                Sostenibilità &amp; Stile.
              </h2>
              <p className="text-xl text-on-surface-variant mb-10 leading-relaxed">
                Crediamo che il futuro della Sardegna debba essere preservato. Ogni nostro veicolo è selezionato per garantire il minimo impatto ambientale senza rinunciare a uno stile iconico e all&apos;avanguardia.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <span className="material-symbols-outlined text-primary text-4xl">eco</span>
                  <h4 className="font-bold text-lg text-on-surface">Zero Emissioni</h4>
                  <p className="text-sm text-on-surface-variant">Rispetto totale per la natura sarda.</p>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="material-symbols-outlined text-primary text-4xl">verified</span>
                  <h4 className="font-bold text-lg text-on-surface">Qualità Premium</h4>
                  <p className="text-sm text-on-surface-variant">Solo i migliori brand internazionali.</p>
                </div>
              </div>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
              <img
                className="w-full h-auto"
                alt="Luxury yacht and electric vehicles at a private port"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7hSkc425MGFAgWiIOUULsQGsE4wJuDa42jfVMP2YxU7gsSBF5lkrkEsn--IYjPVfM8FH-iGwBYwhfxZ-ZVMTXFJSIDbbWqCC0H_Y-tLqMRf7JHrNpK2tJ-45ep0oGR10sDnmhppb2roIlvNfB7pLmDX9JHhO_11NXBrbVqak3kaI9p3z55gqybXmiZ8kvABD-OUE44e9q9NkqDSpec9HIwuSUP-Q56zkqLrUex5btoEpaz3nddqMaH1645xVJc20pIQZ94LOFirk"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="bg-surface-container-lowest py-16 border-y border-primary/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="material-symbols-outlined text-primary text-6xl mb-8">format_quote</span>
          <div className="mb-12">
            <p className="text-2xl md:text-3xl font-medium leading-relaxed italic mb-8 text-on-surface">
              &quot;Solaris ha trasformato il modo in cui i nostri ospiti si muovono all&apos;interno del resort. Il servizio di assistenza è impeccabile e i veicoli sono all&apos;altezza dell&apos;esclusività che offriamo.&quot;
            </p>
            <div>
              <h5 className="font-bold text-lg text-on-surface">Marco Rossi</h5>
              <p className="text-on-surface-variant text-sm">Direttore Operations, Luxury Resort Costa Smeralda</p>
            </div>
          </div>
          <div className="flex justify-center gap-2">
            <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-primary hover:border-transparent">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all text-primary hover:border-transparent">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </section>

      {/* Assistenza & Ricambi — mini teaser */}
      <section className="py-20 bg-white border-y border-primary/8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* Testo sx */}
            <div>
              <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">Assistenza &amp; Ricambi</p>
              <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-primary tracking-tight mb-4 leading-tight">
                Il tuo golf car<br />sempre in forma.
              </h2>
              <div className="h-1.5 w-24 bg-secondary mb-6" />
              <p className="text-on-surface-variant text-lg leading-relaxed mb-8">
                Interventi rapidi, ricambi originali Club Car certificati e manutenzione programmata.
                Il nostro team tecnico copre tutta la Sardegna — direttamente a domicilio.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: 'build', label: 'Manutenzione Programmata' },
                  { icon: 'construction', label: 'Ricambi Originali' },
                  { icon: 'electric_bolt', label: 'Interventi in Loco' },
                  { icon: 'battery_charging_full', label: 'Upgrade Batterie' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 py-3 border-b border-outline-variant/15">
                    <span className="material-symbols-outlined text-secondary text-xl flex-shrink-0">{item.icon}</span>
                    <span className="text-sm font-montserrat font-semibold text-primary">{item.label}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/servizi#assistenza"
                className="inline-flex items-center gap-2 bg-primary text-white font-montserrat font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-0.5"
              >
                <span className="material-symbols-outlined text-sm">handyman</span>
                Scopri il servizio
              </Link>
            </div>

            {/* Foto collage dx */}
            <div className="grid grid-cols-12 grid-rows-2 gap-3 h-[420px]">
              <div className="col-span-7 row-span-2 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2F8vJFXVSQjL7Pq3HrZPil%2Ffeat-cd430286-0b6e-4d17-8e74-bdf12fdad576.webp?alt=media&token=4d4c95a5-2d97-42d2-917d-048fb872545a"
                  alt="Assistenza golf car"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="col-span-5 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2FA10BfuaSW7cTn6ipSmrR%2Fgallery-26ec963e-17b9-4240-9cc4-416428cd4864.webp?alt=media&token=2b7c7470-0657-442e-ad75-6d7a2d267c6e"
                  alt="Ricambi Club Car"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="col-span-5 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2FA10BfuaSW7cTn6ipSmrR%2Fgallery-502891a2-338d-4191-9dd8-3faa80bd768d.webp?alt=media&token=7b2fcbbe-d789-4d2b-85a2-4d786b4cb913"
                  alt="Golf car manutenzione"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}

      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 font-montserrat">Pronto a Guidare il Futuro?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">
              Scegli il servizio che ti interessa — ti rispondiamo entro 24 ore con un preventivo personalizzato.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <Link
              href="/servizi#vendita"
              className="group flex items-center justify-center gap-3 bg-white text-primary font-montserrat font-bold text-sm uppercase tracking-widest px-6 py-5 hover:bg-secondary hover:text-white transition-all shadow-lg hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-base">storefront</span>
              Voglio Comprare
            </Link>
            <Link
              href="/servizi#noleggio"
              className="group flex items-center justify-center gap-3 bg-secondary text-white font-montserrat font-bold text-sm uppercase tracking-widest px-6 py-5 hover:bg-secondary/90 transition-all shadow-lg hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-base">key</span>
              Voglio Noleggiare
            </Link>
            <Link
              href="/servizi#assistenza"
              className="group flex items-center justify-center gap-3 bg-white text-primary font-montserrat font-bold text-sm uppercase tracking-widest px-6 py-5 hover:bg-secondary hover:text-white transition-all shadow-lg hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-base">build</span>
              Mi Serve Assistenza
            </Link>
          </div>
          <div className="text-center mt-8">
            <CtaButtons location="homepage_bottom" preventivoText="Oppure parla con un esperto" />
          </div>
        </div>
      </section>
    </main>
  );
}
