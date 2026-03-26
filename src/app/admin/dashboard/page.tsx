'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { collection, getDocs, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';

interface Veicolo {
  id: string;
  nome: string;
  categoria: string;
  prezzo: number;
  foto: string[];
}

export default function DashboardPage() {
  const [veicoli, setVeicoli] = useState<Veicolo[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchVeicoli = async () => {
    const q = query(collection(db, 'veicoli'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    setVeicoli(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Veicolo)));
    setLoading(false);
  };

  useEffect(() => { fetchVeicoli(); }, []);

  const handleDelete = async (v: Veicolo) => {
    if (!confirm(`Eliminare "${v.nome}"? Questa azione non può essere annullata.`)) return;
    setDeleting(v.id);
    try {
      // Elimina tutte le foto da Storage
      await Promise.allSettled(
        (v.foto || []).map((url) => deleteObject(ref(storage, url)))
      );
      // Elimina il documento Firestore
      await deleteDoc(doc(db, 'veicoli', v.id));
      setVeicoli((prev) => prev.filter((x) => x.id !== v.id));
    } catch (err) {
      console.error(err);
      alert('Errore durante l\'eliminazione. Riprova.');
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-montserrat text-2xl font-bold text-primary uppercase tracking-tight">Gestione Veicoli</h1>
          <p className="text-sm font-lato text-on-surface-variant mt-1">{veicoli.length} veicolo{veicoli.length !== 1 ? 'i' : ''} in catalogo</p>
        </div>
        <Link
          href="/admin/veicoli/nuovo"
          className="flex items-center gap-2 bg-primary text-white px-6 py-3 font-montserrat font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-colors"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          Nuovo Veicolo
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : veicoli.length === 0 ? (
        <div className="text-center py-20 bg-white shadow-sm">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant mb-4 block">directions_car</span>
          <p className="font-montserrat font-bold text-primary mb-2">Nessun veicolo ancora</p>
          <p className="text-sm font-lato text-on-surface-variant mb-6">Inizia aggiungendo il primo veicolo alla flotta.</p>
          <Link href="/admin/veicoli/nuovo" className="bg-primary text-white px-8 py-3 font-montserrat font-bold uppercase tracking-widest text-xs hover:bg-primary-container transition-colors">
            Aggiungi Veicolo
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline-variant/20">
                <th className="text-left px-6 py-4 text-xs font-montserrat font-bold uppercase tracking-widest text-on-surface-variant">Foto</th>
                <th className="text-left px-6 py-4 text-xs font-montserrat font-bold uppercase tracking-widest text-on-surface-variant">Nome</th>
                <th className="text-left px-6 py-4 text-xs font-montserrat font-bold uppercase tracking-widest text-on-surface-variant hidden md:table-cell">Categoria</th>
                <th className="text-right px-6 py-4 text-xs font-montserrat font-bold uppercase tracking-widest text-on-surface-variant">Prezzo</th>
                <th className="text-right px-6 py-4 text-xs font-montserrat font-bold uppercase tracking-widest text-on-surface-variant hidden md:table-cell">Foto</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {veicoli.map((v) => (
                <tr key={v.id} className="border-b border-outline-variant/10 hover:bg-surface-container-low transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-16 h-12 bg-surface-container overflow-hidden">
                      {v.foto?.[0] ? (
                        <img src={v.foto[0]} alt={v.nome} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                          <span className="material-symbols-outlined text-sm">image_not_supported</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-montserrat font-bold text-primary">{v.nome}</td>
                  <td className="px-6 py-4 text-on-surface-variant font-lato hidden md:table-cell">{v.categoria}</td>
                  <td className="px-6 py-4 text-right font-montserrat font-bold text-primary">
                    €{v.prezzo?.toLocaleString('it-IT')}
                  </td>
                  <td className="px-6 py-4 text-right text-on-surface-variant font-lato hidden md:table-cell">
                    {v.foto?.length || 0}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/veicoli/${v.id}`}
                        className="w-8 h-8 flex items-center justify-center text-primary hover:bg-surface-container transition-colors"
                        title="Modifica"
                      >
                        <span className="material-symbols-outlined text-sm">edit</span>
                      </Link>
                      <button
                        onClick={() => handleDelete(v)}
                        disabled={deleting === v.id}
                        className="w-8 h-8 flex items-center justify-center text-error hover:bg-error-container transition-colors disabled:opacity-50"
                        title="Elimina"
                      >
                        {deleting === v.id ? (
                          <span className="w-3 h-3 border-2 border-error border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <span className="material-symbols-outlined text-sm">delete</span>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
