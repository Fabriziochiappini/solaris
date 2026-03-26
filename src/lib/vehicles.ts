import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

export interface Vehicle {
  id?: string;
  marca: string;
  modello: string;
  anno: number;
  prezzo: number;
  descrizione: string;
  stato: 'disponibile' | 'noleggiato' | 'manutenzione';
  immagini: string[];
  createdAt?: any;
}

const COLLECTION_NAME = 'veicoli';

// Aggiunge un nuovo veicolo su Firestore
export async function addVehicle(data: Omit<Vehicle, 'id' | 'createdAt'>) {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Errore durante l\'aggiunta del veicolo:', error);
    throw error;
  }
}

// Recupera tutti i veicoli
export async function getVehicles(): Promise<Vehicle[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const vehicles: Vehicle[] = [];
    querySnapshot.forEach((doc) => {
      vehicles.push({ id: doc.id, ...doc.data() } as Vehicle);
    });
    return vehicles;
  } catch (error) {
    console.error('Errore durante il recupero dei veicoli:', error);
    throw error;
  }
}

// Carica un'immagine su Firebase Storage e restituisce l'URL
export async function uploadVehicleImage(file: File): Promise<string> {
  if (!file) throw new Error('Nessun file fornito');
  
  const storageRef = ref(storage, `veicoli/${Date.now()}_${file.name}`);
  
  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return downloadURL;
  } catch (error) {
    console.error('Errore durante il caricamento dell\'immagine:', error);
    throw error;
  }
}
