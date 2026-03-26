'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import SpecEditor from './SpecEditor';
import PhotoUploader, { LocalPhoto } from './PhotoUploader';
import PhotoGallery, { GalleryPhoto } from './PhotoGallery';

const CATEGORIE = [
  'Touring di Lusso',
  'Utilità per Tenute',
  'Crociera Personale',
  'Off-Road',
  'Bespoke / Su Misura',
];

export interface VehicleData {
  id?: string;
  nome: string;
  categoria: string;
  prezzo: number;
  specs: { chiave: string; valore: string }[];
  foto: string[];
}

interface VehicleFormProps {
  initialData?: VehicleData;
}

export default function VehicleForm({ initialData }: VehicleFormProps) {
  const router = useRouter();
  const isEdit = !!initialData?.id;

  const [nome, setNome] = useState(initialData?.nome || '');
  const [categoria, setCategoria] = useState(initialData?.categoria || CATEGORIE[0]);
  const [prezzo, setPrezzo] = useState(initialData?.prezzo || 0);
  const [specs, setSpecs] = useState(initialData?.specs || [
    { chiave: 'Autonomia', valore: '' },
    { chiave: 'Capienza', valore: '' },
    { chiave: 'Sistema di Guida', valore: '' },
  ]);

  // Foto già caricate su Storage (edit mode)
  const [savedPhotos, setSavedPhotos] = useState<GalleryPhoto[]>(
    (initialData?.foto || []).map((url) => ({ id: url, url }))
  );
  // Nuove foto locali ancora da caricare
  const [newLocalPhotos, setNewLocalPhotos] = useState<LocalPhoto[]>([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Combina le gallerie per l'anteprima (le salvate prima)
  const allGalleryPhotos: GalleryPhoto[] = [
    ...savedPhotos,
    ...newLocalPhotos.map((lp) => ({
      id: lp.id,
      url: lp.preview,
      preview: lp.preview,
      compressing: lp.compressing,
    })),
  ];

  const handleGalleryChange = (updated: GalleryPhoto[]) => {
    // Se una foto salvata viene rimossa, aggiorna savedPhotos
    const updatedIds = new Set(updated.map((p) => p.id));
    setSavedPhotos((prev) => prev.filter((p) => updatedIds.has(p.id)));
    setNewLocalPhotos((prev) => prev.filter((lp) => updatedIds.has(lp.id)));
  };

  const handleNewPhotos = (photos: LocalPhoto[]) => {
    // unisci le precedenti con quelle nuove (aggiornando i compressi)
    setNewLocalPhotos((prev) => {
      const prevMap = new Map(prev.map((p) => [p.id, p]));
      photos.forEach((p) => prevMap.set(p.id, p));
      return Array.from(prevMap.values());
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) { setError('Il nome è obbligatorio.'); return; }
    if (allGalleryPhotos.length === 0) { setError('Aggiungi almeno una foto.'); return; }
    if (newLocalPhotos.some((p) => p.compressing)) { setError('Attendi il completamento della compressione foto.'); return; }

    setSaving(true);
    setError('');

    try {
      const vehicleId = initialData?.id || doc(collection(db, 'veicoli')).id;

      // 1. Carica le nuove foto su Firebase Storage
      const newUploadedUrls: string[] = [];
      for (const lp of newLocalPhotos) {
        const path = `veicoli/${vehicleId}/${lp.id}.webp`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, lp.file);
        const url = await getDownloadURL(storageRef);
        newUploadedUrls.push(url);
      }

      // 2. Costruisci l'array foto finale rispettando l'ordine della gallery
      const newUrlMap = new Map(newLocalPhotos.map((lp, i) => [lp.id, newUploadedUrls[i]]));
      const finalFotoUrls = allGalleryPhotos.map((p) => {
        if (newUrlMap.has(p.id)) return newUrlMap.get(p.id)!;
        return p.url;
      });

      // 3. Se in edit, cancella le foto rimosse da Storage
      if (isEdit && initialData?.foto) {
        const removedUrls = initialData.foto.filter((url) => !finalFotoUrls.includes(url));
        await Promise.allSettled(
          removedUrls.map((url) => deleteObject(ref(storage, url)))
        );
      }

      // 4. Salva su Firestore
      const specsObj: Record<string, string> = {};
      specs.forEach((s) => { if (s.chiave) specsObj[s.chiave] = s.valore; });

      const payload = {
        nome,
        categoria,
        prezzo,
        specs: specsObj,
        foto: finalFotoUrls,
        updatedAt: serverTimestamp(),
      };

      if (isEdit) {
        await updateDoc(doc(db, 'veicoli', vehicleId), payload);
      } else {
        await addDoc(collection(db, 'veicoli'), { ...payload, createdAt: serverTimestamp() });
      }

      router.push('/admin/dashboard');
      router.refresh();
    } catch (err) {
      console.error(err);
      setError('Si è verificato un errore durante il salvataggio. Riprova.');
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="max-w-3xl mx-auto p-8 space-y-10">
      <h1 className="font-montserrat text-2xl font-bold text-primary uppercase tracking-tight">
        {isEdit ? `Modifica: ${initialData.nome}` : 'Nuovo Veicolo'}
      </h1>

      {/* INFO BASE */}
      <section className="space-y-4">
        <h2 className="text-xs font-montserrat font-bold uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/20 pb-2">Informazioni Base</h2>
        <div>
          <label className="block text-xs font-montserrat font-bold uppercase tracking-widest text-primary mb-2">Nome Veicolo *</label>
          <input
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            className="w-full border border-outline-variant bg-surface px-4 py-3 text-sm font-lato focus:outline-none focus:ring-1 focus:ring-primary rounded-none"
            placeholder="es. Porto Cervo Edition"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-montserrat font-bold uppercase tracking-widest text-primary mb-2">Categoria</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full border border-outline-variant bg-surface px-4 py-3 text-sm font-lato focus:outline-none focus:ring-1 focus:ring-primary rounded-none"
            >
              {CATEGORIE.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-montserrat font-bold uppercase tracking-widest text-primary mb-2">Prezzo (€)</label>
            <input
              type="number"
              value={prezzo}
              onChange={(e) => setPrezzo(Number(e.target.value))}
              min={0}
              className="w-full border border-outline-variant bg-surface px-4 py-3 text-sm font-lato focus:outline-none focus:ring-1 focus:ring-primary rounded-none"
              placeholder="es. 24500"
            />
          </div>
        </div>
      </section>

      {/* SPECIFICHE TECNICHE */}
      <section className="space-y-4">
        <h2 className="text-xs font-montserrat font-bold uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/20 pb-2">Specifiche Tecniche</h2>
        <SpecEditor specs={specs} onChange={setSpecs} />
      </section>

      {/* GALLERIA FOTO */}
      <section className="space-y-4">
        <h2 className="text-xs font-montserrat font-bold uppercase tracking-widest text-on-surface-variant border-b border-outline-variant/20 pb-2">
          Galleria Foto
          <span className="ml-2 normal-case tracking-normal font-lato text-on-surface-variant font-normal">— la prima è la copertina della card</span>
        </h2>
        <PhotoUploader onFilesReady={handleNewPhotos} />
        {allGalleryPhotos.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-lato text-on-surface-variant mb-2">Trascina per riordinare · Hover per eliminare</p>
            <PhotoGallery photos={allGalleryPhotos} onChange={handleGalleryChange} />
          </div>
        )}
      </section>

      {/* ERROR / SUBMIT */}
      {error && (
        <div className="bg-error-container text-on-error-container text-sm font-lato px-4 py-3">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 bg-primary text-white py-4 font-montserrat font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {saving ? (
            <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Salvataggio...</>
          ) : (
            <><span className="material-symbols-outlined text-sm">save</span> {isEdit ? 'Salva Modifiche' : 'Crea Veicolo'}</>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/dashboard')}
          className="px-6 py-4 border border-outline-variant text-on-surface-variant font-montserrat font-bold uppercase tracking-widest text-sm hover:bg-surface-container-low transition-colors"
        >
          Annulla
        </button>
      </div>
    </form>
  );
}
