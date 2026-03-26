'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import VehicleForm, { VehicleData } from '@/components/admin/VehicleForm';

export default function ModificaVeicoloPage() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<VehicleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const snap = await getDoc(doc(db, 'veicoli', id));
      if (!snap.exists()) {
        setNotFound(true);
      } else {
        const d = snap.data();
        setData({
          id: snap.id,
          nome: d.nome || '',
          categoria: d.categoria || '',
          prezzo: d.prezzo || 0,
          specs: d.specs
            ? Object.entries(d.specs).map(([chiave, valore]) => ({ chiave, valore: valore as string }))
            : [],
          foto: d.foto || [],
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="p-8 text-center">
        <p className="font-montserrat font-bold text-primary">Veicolo non trovato.</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <VehicleForm initialData={data!} />
    </div>
  );
}
