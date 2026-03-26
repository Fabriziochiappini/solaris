import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { Veicolo } from '@/lib/types';
import VehicleDetailViewer from '@/components/VehicleDetailViewer';
import { notFound } from 'next/navigation';

// Dati di fallback se Firestore non è configurato o il veicolo non è trovato
const VEICOLI_FALLBACK: Record<string, Veicolo> = {
  '1': {
    id: '1',
    nome: 'Edizione Porto Cervo',
    categoria: 'TOURING DI LUSSO',
    prezzo: 24500,
    foto: [
      'https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1594484208280-efa00f96bb21?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: { 
      'Autonomia': '135 km', 
      'Capienza': '4 Adulti', 
      'Sistema di Guida': '72V AC Drive',
      'Motore': '4.0 kW AC',
      'Batterie': 'Litio 105Ah'
    }
  },
  '2': {
    id: '2',
    nome: 'Maremma Rugged',
    categoria: 'UTILITÀ PER TENUTE',
    prezzo: 19800,
    foto: [
      'https://images.unsplash.com/photo-1531920335384-aa0559124233?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: { 
      'Portata': '408 kg', 
      'Sospensioni': 'Fuoristrada', 
      'Pneumatici': 'All-Terrain',
      'Trazione': 'Posteriore Rinforzata'
    }
  },
  '3': {
    id: '3',
    nome: 'Costa Smeralda',
    categoria: 'CROCIERA PERSONALE',
    prezzo: 16200,
    foto: [
      'https://images.unsplash.com/photo-1594484208280-efa00f96bb21?auto=format&fit=crop&q=80&w=1200'
    ],
    specs: { 
      'Posti': '2 Persone', 
      'Cerchi': 'Cromati 14"', 
      'Garanzia': '5 Anni Ltd' 
    }
  }
};

async function getVeicolo(id: string): Promise<Veicolo | null> {
  if (!isFirebaseConfigured) return VEICOLI_FALLBACK[id] || null;
  
  try {
    const docRef = doc(db, 'veicoli', id);
    const snap = await getDoc(docRef);
    
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() } as Veicolo;
    }
    
    // Prova il fallback se non trovato in Firestore
    return VEICOLI_FALLBACK[id] || null;
  } catch (err) {
    console.error('Errore fetch veicolo:', err);
    return VEICOLI_FALLBACK[id] || null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const veicolo = await getVeicolo(id);
  
  return {
    title: veicolo ? `${veicolo.nome} | Solaris Golf Car` : 'Veicolo non trovato',
    description: veicolo ? `Scopri le caratteristiche tecniche di ${veicolo.nome}. Disponibile per vendita e noleggio in Sardegna.` : 'Veicolo non trovato',
  };
}

export default async function VehiclePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const veicolo = await getVeicolo(id);

  if (!veicolo) {
    notFound();
  }

  return <VehicleDetailViewer veicolo={veicolo} />;
}
