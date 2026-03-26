'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Veicolo } from '@/lib/types';

const PhotoViewer = dynamic(() => import('@/components/PhotoViewer'), { ssr: false });

interface VehicleCardProps {
  veicolo: Veicolo;
}

export default function VehicleCard({ veicolo }: VehicleCardProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const fotoCopertina = veicolo.foto?.[0] || '';
  const tuttefoto = veicolo.foto || [];

  const openViewer = (idx = 0) => {
    if (!tuttefoto.length) return;
    setViewerIndex(idx);
    setViewerOpen(true);
  };

  const specsEntries = Object.entries(veicolo.specs || {}).slice(0, 3);

  return (
    <>
      <div className="bg-surface-container-lowest shadow-sm group">
        {/* Foto copertina cliccabile */}
        <div
          className="aspect-[4/3] overflow-hidden cursor-pointer"
          onClick={() => openViewer(0)}
        >
          {fotoCopertina ? (
            <img
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              alt={veicolo.nome}
              src={fotoCopertina}
            />
          ) : (
            <div className="w-full h-full bg-surface-container-low flex items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">directions_car</span>
            </div>
          )}
        </div>

        {/* Contenuto card */}
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-montserrat font-bold text-2xl text-primary mb-1">{veicolo.nome}</h3>
              <p className="text-xs uppercase tracking-widest text-secondary font-bold">{veicolo.categoria}</p>
            </div>
            <span className="text-xl font-montserrat font-bold text-primary">
              €{veicolo.prezzo?.toLocaleString('it-IT')}
            </span>
          </div>

          {/* Specifiche (max 3) */}
          <div className="space-y-4 mb-8">
            {specsEntries.map(([chiave, valore]) => (
              <div key={chiave} className="flex justify-between text-sm py-2 border-b border-outline-variant/10 last:border-0">
                <span className="text-on-surface-variant font-medium">{chiave}</span>
                <span className="font-bold text-primary">{valore}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => openViewer(0)}
              className="flex-1 py-4 text-xs font-montserrat font-bold uppercase tracking-widest bg-primary text-on-primary hover:bg-primary-container transition-colors"
            >
              Vedi Dettagli
            </button>
            {tuttefoto.length > 1 && (
              <button
                onClick={() => openViewer(0)}
                className="px-4 py-4 border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors"
                title={`${tuttefoto.length} foto`}
              >
                <span className="material-symbols-outlined text-sm">photo_library</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {tuttefoto.length > 0 && (
        <PhotoViewer
          photos={tuttefoto}
          initialIndex={viewerIndex}
          open={viewerOpen}
          onClose={() => setViewerOpen(false)}
        />
      )}
    </>
  );
}
