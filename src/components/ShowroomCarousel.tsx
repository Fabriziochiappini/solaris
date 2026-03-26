'use client';

import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Veicolo } from '@/lib/types';

const PhotoViewer = dynamic(() => import('@/components/PhotoViewer'), { ssr: false });

const CARD_W = 380;  // larghezza card in px
const SPACING = 330; // distanza tra i centri delle card

interface CardStyle {
  scale: number;
  tx: number;
  tz: number;
  ry: number;
  opacity: number;
  zi: number;
}

function getCardStyle(offset: number): CardStyle | null {
  const abs = Math.abs(offset);
  if (abs > 2) return null;

  const sign = offset === 0 ? 1 : offset > 0 ? 1 : -1;

  const scales =    [1.00, 0.78, 0.60];
  const txOffsets =   [  0,  SPACING, SPACING * 1.75];
  const tzOffsets =   [  0, -110, -220];
  const ryAngles =    [  0,   22,   38];
  const opacities =   [1.0, 0.80, 0.50];
  const zIndexes =    [ 10,    6,    2];

  return {
    scale:   scales[abs],
    tx:      sign * txOffsets[abs],
    tz:      tzOffsets[abs],
    ry:      -sign * ryAngles[abs],
    opacity: opacities[abs],
    zi:      zIndexes[abs],
  };
}

interface Props { veicoli: Veicolo[] }

export default function ShowroomCarousel({ veicoli }: Props) {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState<{ open: boolean; foto: string[]; idx: number }>({
    open: false, foto: [], idx: 0,
  });
  const touchStartX = useRef<number | null>(null);
  const n = veicoli.length;

  const prev = () => setActive((i) => (i - 1 + n) % n);
  const next = () => setActive((i) => (i + 1) % n);
  const goTo = (i: number) => setActive(i);

  const openViewer = (foto: string[], idx = 0) => {
    setViewer({ open: true, foto, idx });
  };

  // Calcola offset con wrap-around (il più breve percorso)
  const getOffset = (i: number) => {
    let offset = i - active;
    if (offset >  Math.floor(n / 2)) offset -= n;
    if (offset < -Math.floor(n / 2)) offset += n;
    return offset;
  };

  return (
    <div
      className="relative select-none"
      style={{ perspective: '1400px', height: '640px', perspectiveOrigin: '50% 40%' }}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchStartX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
        touchStartX.current = null;
      }}
    >
      {veicoli.map((v, i) => {
        const offset = getOffset(i);
        const style = getCardStyle(offset);
        if (!style) return null;

        const foto = v.foto || [];
        const specs = Object.entries(v.specs || {}).slice(0, 3);
        const isCentered = offset === 0;

        return (
          <div
            key={v.id}
            onClick={() => !isCentered && (offset < 0 ? prev() : next())}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              width: `${CARD_W}px`,
              marginLeft: `-${CARD_W / 2}px`,
              transform: `translateX(${style.tx}px) translateZ(${style.tz}px) rotateY(${style.ry}deg) scale(${style.scale})`,
              opacity: style.opacity,
              zIndex: style.zi,
              transition: 'transform 0.65s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.65s ease',
              transformStyle: 'preserve-3d',
              cursor: isCentered ? 'default' : 'pointer',
            }}
          >
            <div className="bg-surface-container-lowest shadow-2xl overflow-hidden">
              {/* Foto copertina */}
              <div
                className="aspect-[4/3] overflow-hidden"
                onClick={(e) => {
                  if (isCentered && foto.length) {
                    e.stopPropagation();
                    openViewer(foto);
                  }
                }}
                style={{ cursor: isCentered && foto.length ? 'zoom-in' : 'pointer' }}
              >
                {foto[0] ? (
                  <img
                    src={foto[0]}
                    alt={v.nome}
                    className={`w-full h-full object-cover transition-transform duration-700 ${isCentered ? 'hover:scale-105' : ''}`}
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
                    <h3 className="font-montserrat font-bold text-2xl text-primary mb-1">{v.nome}</h3>
                    <p className="text-xs uppercase tracking-widest text-secondary font-bold">{v.categoria}</p>
                  </div>
                  <span className="text-xl font-montserrat font-bold text-primary">
                    €{v.prezzo?.toLocaleString('it-IT')}
                  </span>
                </div>
                <div className="space-y-4 mb-8">
                  {specs.map(([k, val]) => (
                    <div key={k} className="flex justify-between text-sm py-2 border-b border-outline-variant/10 last:border-0">
                      <span className="text-on-surface-variant font-medium">{k}</span>
                      <span className="font-bold text-primary">{val}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (foto.length) openViewer(foto);
                    }}
                    className="flex-1 py-4 text-xs font-montserrat font-bold uppercase tracking-widest bg-primary text-on-primary hover:bg-primary-container transition-colors"
                  >
                    Vedi Dettagli
                  </button>
                  {foto.length > 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); openViewer(foto); }}
                      className="px-4 py-4 border border-outline-variant text-on-surface-variant hover:bg-surface-container-low transition-colors"
                      title={`${foto.length} foto`}
                    >
                      <span className="material-symbols-outlined text-sm">photo_library</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Overlay per card non centrali */}
            {!isCentered && (
              <div className="absolute inset-0 bg-transparent" />
            )}
          </div>
        );
      })}

      {/* Frecce navigazione */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 z-20 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:shadow-xl transition-all"
        aria-label="Precedente"
      >
        <span className="material-symbols-outlined text-primary">chevron_left</span>
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 z-20 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white hover:shadow-xl transition-all"
        aria-label="Successivo"
      >
        <span className="material-symbols-outlined text-primary">chevron_right</span>
      </button>

      {/* Dots indicatori */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {veicoli.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? 'w-6 bg-primary' : 'w-2 bg-outline-variant hover:bg-secondary'
            }`}
            aria-label={`Vai al veicolo ${i + 1}`}
          />
        ))}
      </div>

      {/* Lightbox viewer */}
      {viewer.open && viewer.foto.length > 0 && (
        <PhotoViewer
          photos={viewer.foto}
          initialIndex={viewer.idx}
          open={viewer.open}
          onClose={() => setViewer((s) => ({ ...s, open: false }))}
        />
      )}
    </div>
  );
}
