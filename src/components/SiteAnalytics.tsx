'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, increment, onSnapshot } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';

/**
 * Componente Analytics leggero:
 * – Conta le visite totali (pageview) in modo permanente su Firestore
 * – Conta i click su telefono e WhatsApp
 * – Mostra i dati in tempo reale nel footer (solo lato visuale, nessun cookie)
 */

const ANALYTICS_DOC = 'siteStats';
const ANALYTICS_COLLECTION = 'analytics';

function getDocRef() {
  return doc(db, ANALYTICS_COLLECTION, ANALYTICS_DOC);
}

export default function SiteAnalytics() {
  const [stats, setStats] = useState<{
    visite: number;
    clickTelefono: number;
    clickWhatsApp: number;
  } | null>(null);

  // ── Registra la visita una sola volta per sessione ──
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const alreadyCounted = sessionStorage.getItem('sgc_visit');
    if (!alreadyCounted) {
      const ref = getDocRef();
      // Usa setDoc con merge + increment per creare il doc se non esiste
      setDoc(ref, { visite: increment(1) }, { merge: true }).then(() => {
        sessionStorage.setItem('sgc_visit', '1');
      }).catch(() => {});
    }
  }, []);

  // ── Ascolta in tempo reale i dati ──
  useEffect(() => {
    if (!isFirebaseConfigured) return;

    const ref = getDocRef();
    const unsub = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        setStats({
          visite: data.visite || 0,
          clickTelefono: data.clickTelefono || 0,
          clickWhatsApp: data.clickWhatsApp || 0,
        });
      } else {
        setStats({ visite: 0, clickTelefono: 0, clickWhatsApp: 0 });
      }
    }, () => {
      // In caso di errore (es. regole Firestore) mostra 0
      setStats({ visite: 0, clickTelefono: 0, clickWhatsApp: 0 });
    });

    return () => unsub();
  }, []);

  if (!stats) return null;

  return (
    <div className="flex items-center gap-6 flex-wrap justify-center md:justify-start">
      <StatBadge icon="visibility" label="Visite" value={stats.visite} />
      <StatBadge icon="phone_in_talk" label="Chiamate" value={stats.clickTelefono} />
      <StatBadge icon="chat" label="WhatsApp" value={stats.clickWhatsApp} />
    </div>
  );
}

function StatBadge({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5 text-slate-400 select-none" title={`${label}: ${value.toLocaleString('it-IT')}`}>
      <span className="material-symbols-outlined text-sm">{icon}</span>
      <span className="font-lato text-xs font-medium tabular-nums">
        {value.toLocaleString('it-IT')}
      </span>
    </div>
  );
}

// ── Funzione per tracciare i click (usata dagli altri componenti) ──
export async function trackClick(type: 'clickTelefono' | 'clickWhatsApp') {
  if (!isFirebaseConfigured) return;
  try {
    const ref = doc(db, ANALYTICS_COLLECTION, ANALYTICS_DOC);
    await setDoc(ref, { [type]: increment(1) }, { merge: true });
  } catch {
    // silently fail
  }
}
