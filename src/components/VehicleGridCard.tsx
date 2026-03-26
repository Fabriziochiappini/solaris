'use client';

import Link from 'next/link';
import { Veicolo } from '@/lib/types';
import { motion } from 'framer-motion';

interface Props {
  veicolo: Veicolo;
  index: number;
}

export default function VehicleGridCard({ veicolo, index }: Props) {
  const foto = veicolo.foto?.[0] || '';
  const specs = Object.entries(veicolo.specs || {}).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-surface-container-lowest overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-outline-variant/10"
    >
      <Link href={`/veicoli/${veicolo.id}`} className="block relative aspect-[4/3] overflow-hidden">
        {foto ? (
          <img
            src={foto}
            alt={veicolo.nome}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
                   <span className="material-symbols-outlined text-4xl text-on-surface-variant">directions_car</span>
          </div>
        )}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
      </Link>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-montserrat font-bold text-xl text-primary mb-1 group-hover:text-secondary transition-colors">
              {veicolo.nome}
            </h3>
            <p className="text-[10px] uppercase tracking-widest text-secondary font-bold">
              {veicolo.categoria}
            </p>
          </div>
          <span className="text-lg font-montserrat font-bold text-primary">
            €{veicolo.prezzo?.toLocaleString('it-IT')}
          </span>
        </div>

        <div className="space-y-2 mb-6">
          {specs.map(([k, v]) => (
            <div key={k} className="flex justify-between text-xs py-1.5 border-b border-outline-variant/5 last:border-0">
              <span className="text-on-surface-variant/70">{k}</span>
              <span className="font-semibold text-primary/80">{v}</span>
            </div>
          ))}
        </div>

        <Link
          href={`/veicoli/${veicolo.id}`}
          className="block w-full py-3 text-center text-[10px] font-montserrat font-bold uppercase tracking-widest bg-primary text-on-primary hover:bg-primary-container transition-all"
        >
          Dettagli Completi
        </Link>
      </div>
    </motion.div>
  );
}
