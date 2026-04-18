import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { Veicolo } from '@/lib/types';
import FlottaFullCatalog from '@/components/FlottaFullCatalog';

// Dati di fallback se Firestore è vuoto
const VEICOLI_FALLBACK: Veicolo[] = [
  {
    id: '1',
    nome: 'Edizione Porto Cervo',
    categoria: 'TOURING DI LUSSO',
    prezzo: 24500,
    foto: ['https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=1200'],
    specs: { 'Autonomia': '135 km', 'Capienza': '4 Adulti', 'Sistema di Guida': '72V AC Drive' }
  },
  {
    id: '2',
    nome: 'Maremma Rugged',
    categoria: 'UTILITÀ PER TENUTE',
    prezzo: 19800,
    foto: ['https://images.unsplash.com/photo-1531920335384-aa0559124233?auto=format&fit=crop&q=80&w=1200'],
    specs: { 'Portata': '408 kg', 'Sospensioni': 'Fuoristrada', 'Pneumatici': 'All-Terrain' }
  },
  {
    id: '3',
    nome: 'Costa Smeralda',
    categoria: 'CROCIERA PERSONALE',
    prezzo: 16200,
    foto: ['https://images.unsplash.com/photo-1594484208280-efa00f96bb21?auto=format&fit=crop&q=80&w=1200'],
    specs: { 'Posti': '2 Persone', 'Cerchi': 'Cromati 14"', 'Garanzia': '5 Anni Ltd' }
  }
];

async function getVeicoli(): Promise<Veicolo[]> {
  if (!isFirebaseConfigured) return VEICOLI_FALLBACK;
  try {
    const q = query(collection(db, 'veicoli'), orderBy('ordine', 'asc'));
    const snap = await getDocs(q);
    if (snap.empty) return VEICOLI_FALLBACK;
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Veicolo));
  } catch (err) {
    console.error('Errore fetch flotta:', err);
    return VEICOLI_FALLBACK;
  }
}

export const metadata = {
  title: 'Flotta Premium | Solaris Golf Car Sardegna',
  description: 'Scopri la nostra gamma completa di golf car e veicoli utility elettrici. Qualità e stile porto cervo.',
};

export default async function FlottaPage() {
  const veicoli = await getVeicoli();
  
  return (
    <main className="bg-surface-container-lowest">
      <FlottaFullCatalog veicoli={veicoli} />
    </main>
  );
}
