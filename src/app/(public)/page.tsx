import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { Veicolo } from '@/lib/types';
import ShowroomCarousel from '@/components/ShowroomCarousel';
import Link from 'next/link';

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
          <div className="mb-6 inline-block">
            <span className="bg-green-600 text-white font-bold tracking-widest uppercase text-sm md:text-base px-4 py-2 rounded-md shadow-sm">
              SARDYNIA GOLF CAR
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6">
            Mobilità Elettrica<br />
            <span className="text-white/80">Premium.</span>
          </h1>
          <p className="text-lg md:text-xl text-white/80 font-light mb-10 max-w-2xl">
            Vivi la bellezza della Sardegna con la nostra flotta di veicoli ad alte prestazioni, pensati per il lavoro e il tempo libero.
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

      {/* Lo Showroom — carosello 3D coverflow */}
      <section className="py-32 bg-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 mb-16">
          <h2 className="font-montserrat font-extrabold text-4xl text-primary tracking-tight uppercase mb-4">Lo Showroom</h2>
          <div className="h-1 w-24 bg-secondary"></div>
        </div>
        <ShowroomCarousel veicoli={veicoli} />
      </section>

      {/* Sostenibilità & Design — Sezione con nave */}
      <section className="relative py-32 overflow-hidden">
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
                Sostenibilità &amp; Design Italiano.
              </h2>
              <p className="text-xl text-on-surface-variant mb-10 leading-relaxed">
                Crediamo che il futuro della Sardegna debba essere preservato. Ogni nostro veicolo è selezionato per garantire il minimo impatto ambientale senza rinunciare allo stile iconico del design italiano.
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
      <section className="bg-surface-container-lowest py-24 border-y border-primary/5">
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

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-white">
            <h2 className="text-4xl font-bold mb-4 font-montserrat">Pronto a Guidare il Futuro?</h2>
            <p className="text-white/80 text-lg">Contattaci oggi per una prova gratuita o un preventivo personalizzato.</p>
          </div>
          <div className="flex gap-4">
            <Link href="/contatti" className="px-8 py-4 bg-white text-primary font-bold rounded-lg hover:shadow-2xl transition-all shadow-lg inline-block text-center">
              Parla con un Esperto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
