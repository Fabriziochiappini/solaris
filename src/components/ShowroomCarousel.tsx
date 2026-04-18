'use client';

import { useState, useEffect, useCallback } from 'react';
import { Veicolo } from '@/lib/types';
import Link from 'next/link';

interface Props {
  veicoli: Veicolo[];
}

// Numero di card visibili ai lati del centro
const VISIBLE_SIDES = 2;

export default function ShowroomCarousel({ veicoli }: Props) {
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const count = veicoli.length;

  // Auto-advance
  useEffect(() => {
    if (count <= 1) return;
    const t = setTimeout(() => setActive(a => (a + 1) % count), 4500);
    return () => clearTimeout(t);
  }, [active, count]);

  const prev = useCallback(() => setActive(a => (a - 1 + count) % count), [count]);
  const next = useCallback(() => setActive(a => (a + 1) % count), [count]);

  // Keyboard
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [prev, next]);

  // Drag / swipe
  const onPointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setDragStart(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragging) return;
    setDragging(false);
    const delta = e.clientX - dragStart;
    if (Math.abs(delta) > 50) delta < 0 ? next() : prev();
  };

  if (!count) return null;

  const getPhoto = (v: Veicolo) =>
    v.landing?.heroImmagine || v.foto?.[0] || null;

  // Calcola offset relativo normalizzato (-VISIBLE_SIDES ... 0 ... +VISIBLE_SIDES)
  const getOffset = (i: number): number => {
    let d = i - active;
    // wrap circolare
    if (d > count / 2) d -= count;
    if (d < -count / 2) d += count;
    return d;
  };

  return (
    <div className="relative w-full select-none" style={{ minHeight: 560 }}>
      {/* Stage prospettico */}
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: 520, perspective: '1200px', perspectiveOrigin: '50% 55%' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => setDragging(false)}
      >
        {veicoli.map((v, i) => {
          const offset = getOffset(i);
          const absOff = Math.abs(offset);

          // Nascondi card oltre il range visibile
          if (absOff > VISIBLE_SIDES + 0.5) return null;

          // Effetto coverflow
          const scale   = Math.max(0.55, 1 - absOff * 0.18);
          const rotY    = offset * -42;          // ruota verso centro
          const transX  = offset * 310;          // spaziatura orizzontale
          const transZ  = -absOff * 160;         // spinge in profondità
          const opacity = absOff > VISIBLE_SIDES ? 0 : Math.max(0.35, 1 - absOff * 0.3);
          const zIndex  = 100 - Math.round(absOff * 10);

          const isCenter = offset === 0;

          return (
            <div
              key={v.id}
              onClick={() => { if (offset !== 0) { offset < 0 ? prev() : next(); } }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: 340,
                marginLeft: -170,
                marginTop: -240,
                transform: `translateX(${transX}px) translateZ(${transZ}px) rotateY(${rotY}deg) scale(${scale})`,
                opacity,
                zIndex,
                transition: dragging
                  ? 'none'
                  : 'transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s ease',
                cursor: isCenter ? 'default' : 'pointer',
                willChange: 'transform',
              }}
            >
              <div
                className={`h-full flex flex-col bg-white shadow-2xl overflow-hidden ${
                  isCenter ? 'ring-2 ring-secondary/60 shadow-secondary/10' : ''
                }`}
                style={{ height: 480, borderRadius: 0 }}
              >
                {/* Immagine */}
                <div className="relative flex-none bg-surface-container-low" style={{ height: 260 }}>
                  {getPhoto(v) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={getPhoto(v)!}
                      alt={v.nome}
                      className="w-full h-full object-contain bg-white"
                      draggable={false}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-7xl text-on-surface-variant/20">directions_car</span>
                    </div>
                  )}
                  {/* Categoria */}
                  <div className="absolute top-4 left-4 bg-primary text-white text-[9px] font-montserrat font-bold uppercase tracking-widest px-3 py-1.5 shadow">
                    {v.categoria}
                  </div>
                  {/* Riflesso luce */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/8 to-transparent pointer-events-none" />
                  )}
                </div>

                {/* Testo */}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="font-montserrat font-extrabold text-primary text-xl leading-tight mb-1">
                    {v.nome}
                  </h3>
                  {v.prezzo > 0 && (
                    <p className="text-secondary font-bold text-sm mb-3">
                      Da €{v.prezzo.toLocaleString('it-IT')}
                    </p>
                  )}

                  {/* Specs pillole */}
                  {Object.keys(v.specs || {}).length > 0 && (
                    <div className="flex-1 space-y-1.5 mb-4">
                      {Object.entries(v.specs || {}).slice(0, 3).map(([k, val]) => (
                        <div key={k} className="flex justify-between items-center text-xs border-b border-outline-variant/15 pb-1">
                          <span className="text-on-surface-variant">{k}</span>
                          <span className="font-bold text-on-surface text-right">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  {isCenter && (
                    <Link
                      href={`/veicoli/${v.id}`}
                      className="block w-full bg-primary text-white text-center text-[11px] font-montserrat font-bold uppercase tracking-[0.18em] py-4 hover:bg-primary/90 transition-colors mt-auto"
                      onClick={e => e.stopPropagation()}
                    >
                      Vedi Dettagli
                    </Link>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Frecce navigazione */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <button
          onClick={prev}
          aria-label="Precedente"
          className="w-12 h-12 flex items-center justify-center border-2 border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all"
        >
          <span className="material-symbols-outlined text-xl">chevron_left</span>
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {veicoli.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 ${
                i === active
                  ? 'w-8 h-2 bg-primary'
                  : 'w-2 h-2 bg-primary/25 hover:bg-primary/50'
              }`}
              aria-label={`Vai al veicolo ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          aria-label="Successivo"
          className="w-12 h-12 flex items-center justify-center border-2 border-primary/20 text-primary hover:bg-primary hover:text-white hover:border-primary transition-all"
        >
          <span className="material-symbols-outlined text-xl">chevron_right</span>
        </button>
      </div>
    </div>
  );
}
