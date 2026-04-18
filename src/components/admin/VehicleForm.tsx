'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import SpecEditor from './SpecEditor';
import PhotoUploader, { LocalPhoto } from './PhotoUploader';
import PhotoGallery, { GalleryPhoto } from './PhotoGallery';
import SinglePhotoUploader from './SinglePhotoUploader';
import { VeicoloLanding, VeicoloAccessorio, FotoGalleria } from '@/lib/types';

const CATEGORIE = [
  'GOLF',
  'TEMPO LIBERO',
  'LAVORO',
];

export interface VehicleData {
  id?: string;
  nome: string;
  categoria: string;
  prezzo: number;
  specs: { chiave: string; valore: string }[];
  foto: string[];
  landing?: VeicoloLanding;
}

export interface AccessoryFormType extends VeicoloAccessorio {
  localPhoto?: LocalPhoto | null;
  compressing?: boolean;
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

  // Gallery Photos
  const [savedPhotos, setSavedPhotos] = useState<GalleryPhoto[]>(
    (initialData?.foto || []).map((url) => ({ id: url, url }))
  );
  const [newLocalPhotos, setNewLocalPhotos] = useState<LocalPhoto[]>([]);

  // ---- LANDING PAGE STATE ----
  const initialLanding = initialData?.landing;
  const [landingHeroTitolo, setLandingHeroTitolo] = useState(initialLanding?.heroTitolo || '');
  const [landingHeroDescrizione, setLandingHeroDescrizione] = useState(initialLanding?.heroDescrizione || '');
  const [heroSavedUrl] = useState<string>(initialLanding?.heroImmagine || '');
  const [heroLocalPhoto, setHeroLocalPhoto] = useState<LocalPhoto | null>(null);

  const [landingCitazione, setLandingCitazione] = useState(initialLanding?.citazione || '');
  const [landingSpecificheHtml, setLandingSpecificheHtml] = useState(initialLanding?.specificheHtml || '');

  // Accessories
  const [accessori, setAccessori] = useState<AccessoryFormType[]>(
    initialLanding?.accessori?.map(a => ({ ...a })) || []
  );

  // Galleria metadati (titolo / sottotitolo per foto)
  const [galleriaFoto, setGalleriaFoto] = useState<FotoGalleria[]>(
    initialLanding?.galleriaFoto || []
  );

  const updateGalleriaFotoMeta = (index: number, field: 'titolo' | 'sottotitolo', value: string) => {
    setGalleriaFoto(prev => {
      const copy = [...prev];
      // Garantiamo che l'array abbia abbastanza slot
      while (copy.length <= index) copy.push({ url: '' });
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // COMBINED GALLERY
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
    const updatedIds = new Set(updated.map((p) => p.id));
    setSavedPhotos((prev) => prev.filter((p) => updatedIds.has(p.id)));
    setNewLocalPhotos((prev) => prev.filter((lp) => updatedIds.has(lp.id)));
  };

  const handleNewPhotos = (photos: LocalPhoto[]) => {
    setNewLocalPhotos((prev) => {
      const prevMap = new Map(prev.map((p) => [p.id, p]));
      photos.forEach((p) => prevMap.set(p.id, p));
      return Array.from(prevMap.values());
    });
  };

  const addAccessory = () => {
    setAccessori([...accessori, { id: crypto.randomUUID(), titolo: '', descrizione: '', foto: '' }]);
  };

  const updateAccessory = (id: string, updates: Partial<AccessoryFormType>) => {
    setAccessori(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
  };

  const removeAccessory = (id: string) => {
    setAccessori(prev => prev.filter(a => a.id !== id));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) { setError('Il nome è obbligatorio.'); return; }
    if (allGalleryPhotos.length === 0) { setError('Aggiungi almeno una foto galleria.'); return; }
    if (newLocalPhotos.some((p) => p.compressing)) { setError('Attendi il completamento della compressione foto galleria.'); return; }
    if (heroLocalPhoto?.compressing) { setError('Attendi la compressione dell\'immagine hero.'); return; }
    if (accessori.some(a => a.localPhoto?.compressing)) { setError('Attendi la compressione di tutte le foto degli accessori.'); return; }

    setSaving(true);
    setError('');

    try {
      const vehicleId = initialData?.id || doc(collection(db, 'veicoli')).id;

      // 1. CARICA FOTO GALLERIA
      const newUploadedUrls: string[] = [];
      for (const lp of newLocalPhotos) {
        const path = `veicoli/${vehicleId}/gallery-${lp.id}.webp`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, lp.file);
        newUploadedUrls.push(await getDownloadURL(storageRef));
      }
      const newUrlMap = new Map(newLocalPhotos.map((lp, i) => [lp.id, newUploadedUrls[i]]));
      const finalFotoUrls = allGalleryPhotos.map((p) => {
        if (newUrlMap.has(p.id)) return newUrlMap.get(p.id)!;
        return p.url;
      });

      // 2. CARICA HERO IMMAGINE (Se C'è Nuova)
      let finalHeroUrl = heroSavedUrl;
      if (heroLocalPhoto && !heroLocalPhoto.compressing) {
        const path = `veicoli/${vehicleId}/hero-${heroLocalPhoto.id}.webp`;
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, heroLocalPhoto.file);
        finalHeroUrl = await getDownloadURL(storageRef);
      }

      // 3. CARICA FOTOGRAFIE ACCESSORI
      const finalAccessori: VeicoloAccessorio[] = [];
      for (const a of accessori) {
        let finalAccUrl = a.foto;
        if (a.localPhoto && !a.localPhoto.compressing) {
          const path = `veicoli/${vehicleId}/acc-${a.localPhoto.id}.webp`;
          const storageRef = ref(storage, path);
          await uploadBytes(storageRef, a.localPhoto.file);
          finalAccUrl = await getDownloadURL(storageRef);
        }
        finalAccessori.push({
          id: a.id,
          titolo: a.titolo,
          descrizione: a.descrizione,
          foto: finalAccUrl,
        });
      }

      // 4. Salva Firestore
      const specsObj: Record<string, string> = {};
      specs.forEach((s) => { if (s.chiave) specsObj[s.chiave] = s.valore; });

      // Costruiamo galleriaFoto finale con URL aggiornati
      const finalGalleriaFoto: FotoGalleria[] = finalFotoUrls.map((url, i) => ({
        url,
        titolo: galleriaFoto[i]?.titolo || '',
        sottotitolo: galleriaFoto[i]?.sottotitolo || '',
      }));

      const payload = {
        nome,
        categoria,
        prezzo,
        specs: specsObj,
        foto: finalFotoUrls,
        landing: {
          heroTitolo: landingHeroTitolo,
          heroDescrizione: landingHeroDescrizione,
          heroImmagine: finalHeroUrl,
          citazione: landingCitazione,
          specificheHtml: landingSpecificheHtml,
          accessori: finalAccessori,
          galleriaFoto: finalGalleriaFoto,
        },
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
    <form onSubmit={handleSave} className="max-w-4xl mx-auto p-4 md:p-8 space-y-12">
      <div className="flex justify-between items-center bg-surface sticky top-0 py-4 z-10 border-b border-outline-variant/20">
        <h1 className="font-montserrat text-2xl font-bold text-primary uppercase tracking-tight">
          {isEdit ? `Modifica: ${initialData.nome}` : 'Nuovo Veicolo / Landing'}
        </h1>
        <div className="flex gap-2 text-xs">
          <button type="button" onClick={() => router.push('/admin/dashboard')} className="px-4 py-2 border border-outline-variant hover:bg-surface-container-low font-bold uppercase transition">
            Annulla
          </button>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-primary text-white font-bold uppercase hover:bg-primary-container disabled:opacity-50 flex items-center gap-2 transition">
            {saving ? 'Salvataggio...' : 'Salva Pubblica'}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-error-container text-on-error-container text-sm font-lato px-4 py-3 shadow-md">
          {error}
        </div>
      )}

      {/* INFO BASE (Usato per listing/cards) */}
      <section className="space-y-4 bg-white p-6 shadow-sm border border-outline-variant/10">
        <h2 className="text-xs font-montserrat font-bold uppercase tracking-widest text-primary border-b border-outline-variant/20 pb-2">1. Dati Catalogo Base</h2>
        <div>
          <label className="block text-xs font-montserrat font-bold uppercase text-on-surface-variant mb-1">Nome Veicolo *</label>
          <input value={nome} onChange={(e) => setNome(e.target.value)} required className="w-full border border-outline-variant bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded-none" placeholder="es. Sardinia Luxury Edition" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-montserrat font-bold uppercase text-on-surface-variant mb-1">Categoria</label>
            <select value={categoria} onChange={(e) => setCategoria(e.target.value)} className="w-full border border-outline-variant bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded-none">
              {CATEGORIE.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-montserrat font-bold uppercase text-on-surface-variant mb-1">Prezzo Visivo (opzionale)</label>
            <input type="number" value={prezzo} onChange={(e) => setPrezzo(Number(e.target.value))} min={0} className="w-full border border-outline-variant bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary rounded-none" placeholder="0 = Prezzo su richiesta" />
          </div>
        </div>
        <div>
          <label className="block text-xs font-montserrat font-bold uppercase text-on-surface-variant mb-1">Specs per Card (Brevi)</label>
          <SpecEditor specs={specs} onChange={setSpecs} />
        </div>
      </section>

      {/* SEZIONE 1: HERO LANDING */}
      <section className="space-y-4 bg-white p-6 shadow-sm border border-outline-variant/10 border-l-4 border-l-secondary">
        <h2 className="text-xs font-montserrat font-bold uppercase tracking-widest text-primary border-b border-outline-variant/20 pb-2">2. Landing Page: Hero Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-montserrat font-bold uppercase text-on-surface-variant mb-1">Hero Titolo Principale</label>
              <input value={landingHeroTitolo} onChange={(e) => setLandingHeroTitolo(e.target.value)} className="w-full border border-outline-variant bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="es. PRESTAZIONI SENZA LIMITI" />
            </div>
            <div>
              <label className="block text-xs font-montserrat font-bold uppercase text-on-surface-variant mb-1">Hero Descrizione Sottotitolo</label>
              <textarea value={landingHeroDescrizione} onChange={(e) => setLandingHeroDescrizione(e.target.value)} rows={4} className="w-full border border-outline-variant bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Sperimenta la libertà di guida con il modello superiore..." />
            </div>
          </div>
          <div>
            <label className="block text-xs font-montserrat font-bold uppercase text-on-surface-variant mb-1">Hero Immagine Background</label>
            <SinglePhotoUploader onFileReady={setHeroLocalPhoto} label="Carica Immagine Hero" />
            {(heroLocalPhoto?.preview || heroSavedUrl) && (
              <div className="mt-2 aspect-video bg-surface-container border border-outline-variant relative">
                <img src={heroLocalPhoto?.preview || heroSavedUrl} alt="Hero" className="absolute inset-0 w-full h-full object-cover" />
                {heroLocalPhoto?.compressing && <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-bold">Compressione...</div>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SEZIONE 2 E 3: CITAZIONE & CAROSELLO */}
      <section className="space-y-4 bg-white p-6 shadow-sm border border-outline-variant/10 border-l-4 border-l-secondary">
        <h2 className="text-xs font-montserrat font-bold uppercase tracking-widest text-primary border-b border-outline-variant/20 pb-2">3. Landing Page: Frase ad Effetto & Galleria</h2>
        <div>
          <label className="block text-xs font-montserrat font-bold uppercase text-on-surface-variant mb-1">Slogan Centrale / Citazione</label>
          <input value={landingCitazione} onChange={(e) => setLandingCitazione(e.target.value)} className="w-full border border-outline-variant bg-surface px-4 py-3 text-sm font-medium text-center focus:outline-none focus:ring-1 focus:ring-primary text-xl" placeholder='"Lussuoso, silenzioso, inarrestabile."' />
        </div>
        <div className="mt-8">
          <label className="block text-xs font-montserrat font-bold uppercase text-on-surface-variant mb-2">Galleria Fotografica Carosello (2 per view desktop)</label>
          <PhotoUploader onFilesReady={handleNewPhotos} />
          {allGalleryPhotos.length > 0 && (
            <div className="mt-4 space-y-3">
              <PhotoGallery photos={allGalleryPhotos} onChange={handleGalleryChange} />
              {/* Titolo / Sottotitolo per ogni foto */}
              <div className="pt-4 border-t border-outline-variant/10">
                <p className="text-[10px] font-montserrat font-bold uppercase text-on-surface-variant mb-3">Etichette per ogni foto (opzionale — sovrimpresse in basso a sinistra)</p>
                <div className="space-y-3">
                  {allGalleryPhotos.map((photo, index) => (
                    <div key={photo.id} className="flex gap-3 items-start p-3 bg-surface-container-low border border-outline-variant/20">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo.url || photo.preview} alt="" className="w-16 h-12 object-cover flex-none" />
                      <div className="flex-1 grid grid-cols-2 gap-2">
                        <input
                          value={galleriaFoto[index]?.titolo || ''}
                          onChange={(e) => updateGalleriaFotoMeta(index, 'titolo', e.target.value)}
                          placeholder={`Titolo foto ${index + 1} (es. "Wherever Your Path Leads")`}
                          className="w-full border border-outline-variant bg-white px-3 py-2 text-xs font-bold focus:outline-none focus:border-primary"
                        />
                        <input
                          value={galleriaFoto[index]?.sottotitolo || ''}
                          onChange={(e) => updateGalleriaFotoMeta(index, 'sottotitolo', e.target.value)}
                          placeholder="Sottotitolo (es. "Guida rilassante, ogni giorno.")"
                          className="w-full border border-outline-variant bg-white px-3 py-2 text-xs focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SEZIONE 4 E 5: SPECIFICHE & ACCESSORI */}
      <section className="space-y-4 bg-white p-6 shadow-sm border border-outline-variant/10 border-l-4 border-l-secondary">
        <h2 className="text-xs font-montserrat font-bold uppercase tracking-widest text-primary border-b border-outline-variant/20 pb-2">4. Specifiche Tabulari & Accessori</h2>
        
        <div>
          <label className="block text-xs font-montserrat font-bold uppercase text-on-surface-variant mb-2 pt-2">Codice HTML Specifiche Tecniche (Sezione 4)</label>
          <p className="text-[10px] text-on-surface-variant mb-2 opacity-80">Incolla qui direttamente il codice HTML delle specifiche tabella avanzata per la landing page.</p>
          <textarea value={landingSpecificheHtml} onChange={(e) => setLandingSpecificheHtml(e.target.value)} rows={6} className="w-full border-2 border-dashed border-outline-variant bg-surface px-4 py-3 text-sm font-mono focus:outline-none focus:border-primary" placeholder="<table>...</table>" />
        </div>

        <div className="pt-6 border-t border-outline-variant/10">
          <label className="block text-xs font-montserrat font-bold uppercase text-on-surface-variant mb-4">5. Accessori (&quot;Accessorize Your Car&quot;)</label>
          
          <div className="space-y-6">
            {accessori.map((acc, index) => (
              <div key={acc.id} className="p-4 border border-outline-variant/30 flex gap-4 bg-surface relative group">
                <button type="button" onClick={() => removeAccessory(acc.id)} className="absolute top-2 right-2 text-error hover:bg-error/10 p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="material-symbols-outlined text-sm">delete</span>
                </button>
                <div className="w-1/3">
                  <SinglePhotoUploader onFileReady={(photo) => updateAccessory(acc.id, { localPhoto: photo })} label="Foto" />
                  {(acc.localPhoto?.preview || acc.foto) && (
                    <div className="mt-2 aspect-video relative bg-surface-container-high border border-outline-variant/20">
                      <img src={acc.localPhoto?.preview || acc.foto} alt="Accessorio" className="absolute inset-0 w-full h-full object-cover" />
                      {acc.localPhoto?.compressing && <div className="absolute inset-0 bg-black/50 text-white text-[10px] flex items-center justify-center">Elab...</div>}
                    </div>
                  )}
                </div>
                <div className="w-2/3 space-y-3">
                  <input value={acc.titolo} onChange={(e) => updateAccessory(acc.id, { titolo: e.target.value })} placeholder={`Titolo accessorio ${index + 1} (es. Sedili Premium)`} className="w-full border-b border-outline-variant bg-transparent px-0 py-2 text-sm focus:outline-none focus:border-primary font-bold" />
                  <textarea value={acc.descrizione} onChange={(e) => updateAccessory(acc.id, { descrizione: e.target.value })} placeholder="Breve descrizione o caratteristiche dell'accessorio..." rows={3} className="w-full border border-outline-variant bg-white px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                </div>
              </div>
            ))}
          </div>
          
          <button type="button" onClick={addAccessory} className="mt-4 text-xs font-montserrat font-bold uppercase text-primary border border-primary px-4 py-2 hover:bg-primary/5 transition">
            + Aggiungi Accessorio
          </button>
        </div>
      </section>

    </form>
  );
}
