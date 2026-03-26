'use client';

import { useState, useMemo } from 'react';
import { Veicolo } from '@/lib/types';
import VehicleGridCard from '@/components/VehicleGridCard';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  veicoli: Veicolo[];
}

export default function FlottaFullCatalog({ veicoli }: Props) {
  const [activeTab, setActiveTab] = useState('TUTTE');

  const categorie = useMemo(() => {
    const cats = new Set(veicoli.map(v => v.categoria).filter(Boolean));
    return ['TUTTE', ...Array.from(cats)];
  }, [veicoli]);

  const filtered = useMemo(() => {
    if (activeTab === 'TUTTE') return veicoli;
    return veicoli.filter(v => v.categoria === activeTab);
  }, [veicoli, activeTab]);

  return (
    <div className="min-h-screen bg-surface-container-lowest pt-32 pb-24">
      {/* Header Pagina */}
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <h1 className="font-montserrat font-extrabold text-5xl text-primary tracking-tight uppercase mb-4">
          La Nostra Flotta
        </h1>
        <div className="h-1.5 w-32 bg-secondary mb-8"></div>
        <p className="max-w-2xl text-on-surface-variant font-medium text-lg leading-relaxed">
          Esplora la nostra selezione premium di golf car ed utility vehicle. 
          Dal lusso di Porto Cervo alla robustezza della Maremma, abbiamo il veicolo perfetto per ogni esigenza.
        </p>
      </div>

      {/* Filtri */}
      <div className="max-w-7xl mx-auto px-8 mb-12 flex flex-wrap gap-3">
        {categorie.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveTab(cat)}
            className={`px-8 py-3 text-[10px] font-montserrat font-bold uppercase tracking-widest transition-all duration-300 ${
              activeTab === cat 
                ? 'bg-primary text-on-primary shadow-lg scale-105' 
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Griglia */}
      <div className="max-w-7xl mx-auto px-8">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((v, i) => (
              <VehicleGridCard key={v.id} veicolo={v} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-outline-variant/20">
            <span className="material-symbols-outlined text-6xl text-outline-variant mb-4 animate-pulse">
              search_off
            </span>
            <p className="text-on-surface-variant/60 font-medium">
              Nessun veicolo trovato in questa categoria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
