// Script seed: popola Firestore con i 3 veicoli statici dall'homepage
// Esegui con: npx tsx scripts/seed-veicoli.ts

import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Usa Admin SDK con service account oppure variabili d'ambiente
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n')!,
    }),
  });
}

const db = getFirestore();

const veicoli = [
  {
    nome: 'Edizione Porto Cervo',
    categoria: 'Touring di Lusso',
    prezzo: 24500,
    specs: {
      Autonomia: '135 km',
      Capienza: '4 Adulti',
      'Sistema di Guida': '72V AC Drive',
    },
    foto: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBhJEJRrhyTOhMsCK0pumZwXOIeDD0im9Lte-RWCFmXBz4IfESPd1bTXPJkZnpCT3i6EH5-VzoIyImKLACFiWM-e436JAoRxstB2HVMUNeGmb44ObaZz6iUxbtHQWzsOteFNk3GXvCu5aiQCD-BdzZGWLiMs7Jr9N3qzsdEYTaTbvVaIYzUyqIEke43Zp6oh8fJKyWwob7ZgaIie7cSiGOvo2sB8bD_pwJyFlMRdG5KwsrKQwVpDre6l2BWSbvC3bGcerovvddJdYE',
    ],
    ordine: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: 'Maremma Rugged',
    categoria: 'Utilità per Tenute',
    prezzo: 19800,
    specs: {
      Portata: '408 kg',
      Sospensioni: 'Fuoristrada',
      Pneumatici: 'All-Terrain',
    },
    foto: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCSZsm7RbUNMr1rVhJNwQZ54ZlkiFzhiaDi6TZnqmD4DrdhYdhRU6J-T17qlWGKVPQBwPKZ6cYa03oziKrY8ARPjEQZtVPVUWW4SxwjUug_5CbmMvgl4q4PsIgsFeVVqmcqsbMmHa66vmJsuKa6lRlfDuBExKovQWRdASRUlUQHNMKVjs8LJP_0b2N2ozy_opIWqqyfQsyXYJSbkUndZFBqyFFjrPMa5mDQ65UwcRJw7VA6Ogx_bwrfZq3p2RBF9fmvjQP6AV7uQfE',
    ],
    ordine: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    nome: 'Costa Smeralda',
    categoria: 'Crociera Personale',
    prezzo: 16200,
    specs: {
      Posti: '2 Persone',
      'Cerchi': 'Cromati 14"',
      Garanzia: '5 Anni Ltd',
    },
    foto: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkmnJMKgcjBvM1Gl0FXnx2PRmC6v5JAluHq6V9iq_fd38TdQOum4Hg1sMUwoVzZz9i97E-x6emuUeLyKWWnx2HymLLP73KXcDm3bj4H37Pb037wUbd9wheEI1dlxmYillZ68JkeC4JLy75WmiNIWIdOqEFeWA8KaTPoZGuQBCuwB6gfDVpWiQgCx359dXTyy9Gkqu5JJMZ4SYeXHK4TJaWw2bCCWzpnpnFvU5YPF9WYVqUNx9Wc8hoEx7ytc23PTFxxgQwjQlzOrs',
    ],
    ordine: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

async function seed() {
  console.log('🌱 Seeding veicoli in Firestore...');
  for (const v of veicoli) {
    const ref = await db.collection('veicoli').add(v);
    console.log(`✅ Aggiunto: ${v.nome} → ID: ${ref.id}`);
  }
  console.log('🎉 Seed completato!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Errore seed:', err);
  process.exit(1);
});
