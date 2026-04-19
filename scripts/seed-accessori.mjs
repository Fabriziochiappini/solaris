import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';

// Leggi le credenziali dal file serviceAccount
const serviceAccount = JSON.parse(
  readFileSync('./serviceAccount.json', 'utf8')
);

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

const accessori = [
  {
    titolo: 'Tappetini Premium',
    descrizione: 'Tappetini in gomma resistente con logo, proteggono il pavimento da sporco e umidità.',
    foto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
  },
  {
    titolo: 'Copertura Veicolo',
    descrizione: 'Telo copri-veicolo impermeabile e anti-UV, protegge il golf cart da pioggia e sole.',
    foto: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?w=600',
  },
  {
    titolo: 'Portabagagli Posteriore',
    descrizione: 'Rack portabagagli in acciaio inox per trasportare borse, attrezzatura o spesa.',
    foto: 'https://images.unsplash.com/photo-1558618047-3f9c19ce1649?w=600',
  },
  {
    titolo: 'Kit Luci LED',
    descrizione: 'Fari anteriori e posteriori a LED ad alta luminosità per la guida notturna in totale sicurezza.',
    foto: 'https://images.unsplash.com/photo-1504222490345-c075b626c787?w=600',
  },
  {
    titolo: 'Sedili Imbottiti Premium',
    descrizione: 'Sedili in similpelle ergonomici con imbottitura extra, ideali per lunghe sessioni di guida.',
    foto: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600',
  },
  {
    titolo: 'Pneumatici Off-Road',
    descrizione: 'Pneumatici all-terrain con battistrada rinforzato per affrontare percorsi sterrati e sabbia.',
    foto: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
  },
  {
    titolo: 'Cerchi in Lega',
    descrizione: 'Cerchi in lega leggera dal design sportivo, disponibili in più misure e finiture.',
    foto: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600',
  },
  {
    titolo: 'Sistema Audio Bluetooth',
    descrizione: 'Speaker impermeabili integrati con connettività Bluetooth per ascoltare musica in movimento.',
    foto: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600',
  },
  {
    titolo: 'Specchietti Retrovisori',
    descrizione: 'Specchietti laterali omologati in acciaio inox per una guida più sicura su strada.',
    foto: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600',
  },
  {
    titolo: 'Parasole Personalizzato',
    descrizione: 'Tetto parasole in acciaio verniciato disponibile in diversi colori per personalizzare il tuo veicolo.',
    foto: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600',
  },
  {
    titolo: 'Cinture di Sicurezza',
    descrizione: 'Set di cinture di sicurezza a 2 punti per tutti i passeggeri, conformi agli standard europei.',
    foto: 'https://images.unsplash.com/photo-1597404294360-feeeda04612e?w=600',
  },
  {
    titolo: 'Caricatore USB',
    descrizione: 'Pannello con porte USB integrate nel cruscotto per ricaricare smartphone e dispositivi in viaggio.',
    foto: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=600',
  },
];

async function seed() {
  const col = db.collection('accessori');
  let count = 0;

  for (const acc of accessori) {
    const ref = col.doc();
    await ref.set(acc);
    console.log(`✅ Aggiunto: ${acc.titolo} (id: ${ref.id})`);
    count++;
  }

  console.log(`\n🎉 Seed completato! ${count} accessori aggiunti alla collection "accessori".`);
}

seed().catch(console.error);
