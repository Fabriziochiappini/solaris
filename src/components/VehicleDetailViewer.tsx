'use client';

import { useState } from 'react';
import { Veicolo } from '@/lib/types';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const PhotoViewer = dynamic(() => import('@/components/PhotoViewer'), { ssr: false });

interface Props {
  veicolo: Veicolo;
}

export default function VehicleDetailViewer({ veicolo }: Props) {
  const [activePhoto, setActivePhoto] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const foto = veicolo.foto || [];

  const whatsAppLink = `https://wa.me/393331234567?text=Ciao,%20vorrei%20informazioni%20sul%20veicolo%20${encodeURIComponent(veicolo.nome)}`;

  return (
    <div className="min-h-screen pt-32 pb-20 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Colonna Sinistra: Gallery */}
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="aspect-[4/3] bg-surface-container-low overflow-hidden cursor-zoom-in group relative shadow-2xl"
              onClick={() => setIsViewerOpen(true)}
            >
              {foto[activePhoto] ? (
                <img 
                  src={foto[activePhoto]} 
                  alt={veicolo.nome} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-6xl text-on-surface-variant">image_not_supported</span>
                </div>
              )}
              <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 text-[10px] font-bold tracking-widest uppercase text-primary shadow-lg group-hover:bg-primary group-hover:text-on-primary transition-all">
                Ingrandisci Foto
              </div>
            </motion.div>

            {/* Thumbnails */}
            {foto.length > 1 && (
              <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                {foto.map((f, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    className={`aspect-square overflow-hidden border-2 transition-all duration-300 ${
                      activePhoto === i ? 'border-secondary scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={f} className="w-full h-full object-cover" alt={`${veicolo.nome} - ${i + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Colonna Destra: Dettagli */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-40 space-y-10"
          >
            <div>
              <p className="text-secondary font-bold text-xs uppercase tracking-[0.25em] mb-4">
                {veicolo.categoria}
              </p>
              <h1 className="font-montserrat font-extrabold text-5xl text-primary tracking-tight mb-4">
                {veicolo.nome}
              </h1>
              <div className="h-1.5 w-24 bg-secondary mb-8"></div>
              <p className="text-3xl font-montserrat font-bold text-primary">
                €{veicolo.prezzo?.toLocaleString('it-IT')}
                <span className="text-sm font-normal text-on-surface-variant ml-2">IVA Inclusa</span>
              </p>
            </div>

            <div className="space-y-4 bg-surface-container-low p-8 shadow-sm">
              <h3 className="font-montserrat font-bold text-primary uppercase tracking-widest text-sm mb-6 pb-4 border-b border-outline-variant/30">
                Specifiche Tecniche
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                {Object.entries(veicolo.specs || {}).map(([key, val]) => (
                  <div key={key} className="flex flex-col border-l-2 border-secondary/30 pl-4 py-1">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60 mb-1">
                      {key}
                    </span>
                    <span className="font-bold text-primary text-lg">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-primary text-on-primary px-8 py-5 text-center text-xs font-montserrat font-bold uppercase tracking-[0.2em] hover:bg-primary-container transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Richiedi Preventivo WhatsApp
              </a>
              <button className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-on-primary px-8 py-5 text-center text-xs font-montserrat font-bold uppercase tracking-[0.2em] transition-all">
                Configura Veicolo
              </button>
            </div>

            <div className="flex items-center gap-4 text-on-surface-variant/50 pt-8 border-t border-outline-variant/20 italic text-sm">
              <span className="material-symbols-outlined text-sm">verified_user</span>
              Prezzo garantito e assistenza post-vendita in tutta la Sardegna.
            </div>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      {isViewerOpen && foto.length > 0 && (
        <PhotoViewer
          photos={foto}
          initialIndex={activePhoto}
          open={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </div>
  );
}
