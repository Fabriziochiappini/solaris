import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { Veicolo } from '@/lib/types';
import ShowroomCarousel from '@/components/ShowroomCarousel';

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
    const q = query(collection(db, 'veicoli'), orderBy('ordine', 'asc'), limit(6));
    const snap = await getDocs(q);
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
      {/* Hero Section: The Grand Fairway — Full-screen cinematic */}
      <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          alt="high-end white luxury golf car parked on a perfectly manicured green fairway of a Sardinian golf resort at sunrise, soft golden light reflecting off polished surfaces"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEG4yCcX-Qja9CH_Q63o2XGahbG_96AdVoxsme_SXdM9R0AB5UGrTAGR_lJbuIJZ9iog2Np9tnIn_0JCL4K8wczO0fYjqLrlDSu8EUtCWwrOeDVRvL6ShWH0oLTutas5nUpJ5u1G3D3vBJI4kq3p8OuUyEGCEAWbi5Jtr7tyIajmwJJGfQFaYW0ssrPChDkh6IrLeHjG5cL3k5cgzAWE6Qq72glZOrfHiJa7iCt4zRWjISFK_DzE1anc1XtYyKURNzGybmUuBCzSU"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-primary/20 bg-gradient-to-b from-primary/10 to-primary/40"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <div className="max-w-3xl">
            <h1 className="text-white font-montserrat text-6xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] mb-8 uppercase">
              Il Grande <br /> Fairway.
            </h1>
            <p className="text-white/90 font-lato text-xl md:text-2xl max-w-xl mb-12 leading-relaxed">
              Elevate il vostro stile con veicoli di trasporto personale su misura, progettati per l&apos;élite sarda. Silenziosi, sostenibili e puramente lussuosi.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-primary px-8 py-4 text-white font-montserrat font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-colors shadow-xl">
                Scopri la Flotta
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 px-8 py-4 text-white font-montserrat font-bold uppercase tracking-widest text-sm hover:bg-white/20 transition-colors">
                Visita lo Showroom
              </button>
            </div>
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

      {/* The Sardinia Connection */}
      <section className="py-32 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <h2 className="font-montserrat font-extrabold text-4xl text-primary mb-8 leading-tight">
                Il Patrimonio della<br />
                <span className="text-secondary italic">Costa Sarda</span>
              </h2>
              <div className="space-y-6 text-on-surface-variant leading-relaxed">
                <p>Nati nel cuore della Costa Smeralda, Solaris nasce con una missione semplice: attraversare i paesaggi più belli della terra senza turbarne la pace.</p>
                <p>Il nostro linguaggio di design è ispirato dall&apos;architettura naturale della Sardegna — le scogliere granitiche frastagliate, le acque cristalline color zaffiro e la profumata macchia mediterranea.</p>
              </div>
              <div className="mt-12 flex items-center gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary">25+</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mt-1">Anni di Maestria</div>
                </div>
                <div className="h-10 w-px bg-outline-variant"></div>
                <div>
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant mt-1">Rifinito a Mano</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="h-64 bg-slate-300 overflow-hidden shadow-lg">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="scenic aerial view of turquoise mediterranean coastline with yachts and rocky outcrops" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAXUaNv5zBzWjLfCqMcCGZ5MN6CNANU97e_IxZj7R8DgOMzhU752EfHPmYPZgNBfrVGHMo_sX25m1pkKckOerDT4-bFGv8MazDjzV7EX5WP4fBQ2Tl0covkr9CuIoroTQJkoAE5AIJzoe5K0_oFndf0wgua2vvtkWmMC8VcMGu254v_O2KBFReLxNLyX8mwCXMWYflB7oWTj_ZBobS64vQNQGX7rP3J901XNh5tC2QB2lD2_4VFtcWa7Gn5iIt7-KkWylmda6jeH24" 
                    />
                  </div>
                  <div className="h-80 bg-slate-400 overflow-hidden shadow-lg">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="traditional Sardinian stone architecture with flowering bougainvillea under a bright blue sky" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT9S7lwGuHySZl0qwcK1FW_7LV7PmHI0YNJUS6an_gyhqe8_7_hQNZWmNCqrnMjml7-4y-Oys0nmAJGbzijHGv8P4Cj9-5kT10XlD4NLTVpPoDiltR2kSCISX9cmksVExWQFYu2mXD2P5aI_xgXJBfJTLPGwdPdyjBEot13xpnlhyk_6RH2USgtj9Pz-G-Mm7jOdAwr6FsdvswC5fQGiiSWNcmvqULwGyskhrKtLfIV5sYQvtxVXbwoMJjij3i7RxJWUCDp6GB2lo" 
                    />
                  </div>
                </div>
                <div className="pt-12 space-y-4">
                  <div className="h-80 bg-slate-500 overflow-hidden shadow-lg">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="pristine white sand beach with gentle waves and clear blue water" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYpxMCAcURg99-da_cNLK0VGKv6gspR8b-sC5QNfMFEUCxky7Fkwlpt2FPjGNVXZh1O6vYv4FXB-pU0PzjX6tIiz_Rk-Hx-vOtGwYoO2WBQex0Tshj3i4E5jdIOooKigGXh8EV6kQVQagiffwqCA-WWMJPrpYpfCSyNbNHfrGmm6iHLhC9SKYQxHz4e2wtdJuYWwmITVI-t2ZA3Os5ChjDLf4t7RSXcCQXvK7iTXMSFyYN-Zr2xvs7yRFxSnElqATCN2QswagCBS8" 
                    />
                  </div>
                  <div className="h-64 bg-slate-600 overflow-hidden shadow-lg">
                    <img 
                      className="w-full h-full object-cover" 
                      alt="close up of premium leather upholstery work on a luxury vehicle seat" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAUBFHSatZQI0EV3z93u_sYoQu4qgmYUL4L1EQHf_x_FpmEX3o7Ar8WPBDFt1WJaWaz_WeB1bA5h-vyPIIEFPpbJG5XYRiJd0ZV2HYHXDRckk97Cbdn9M3AJjIFsVE_Lcp_xvBfymyB-kRCFHzaEUXl9RXj2gcscjkEsDAfKbZQmzOnz_qWc2yjhJ_pekFtB7TX9aRIGxrtmZ2NCZRtZpJVgpmSnYGiNjW8pvZC2e-RcKrN721aDHlmlaAiq5Xy_1YkP2LQ0ZaLW3w" 
                    />
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-48 h-48 border-[20px] border-secondary/10 -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Asymmetric CTA Section */}
      <section className="py-32 bg-primary">
        <div className="max-w-7xl mx-auto px-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-container/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-on-primary mb-8 leading-tight">Pronto a Configurare il Tuo Solaris Personalizzato?</h2>
            <p className="text-on-primary-container text-lg mb-12 font-light">Vivi la perfetta sintesi tra stile mediterraneo e prestazioni elettriche all&apos;avanguardia. I nostri consulenti sono pronti a costruire una flotta su misura per le tue esigenze.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button className="bg-secondary text-on-secondary px-10 py-5 font-montserrat font-bold uppercase tracking-[0.2em] shadow-2xl hover:bg-secondary-container hover:text-on-secondary-container transition-all">Configura il Tuo Veicolo</button>
              <button className="bg-transparent border-2 border-on-primary text-on-primary px-10 py-5 font-montserrat font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all">Scarica il Catalogo</button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
