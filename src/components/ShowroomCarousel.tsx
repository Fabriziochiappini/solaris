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
    <div className="relative w-full select-none" style={{ minHeight: 660 }}>
      {/* Stage prospettico */}
      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: 600, perspective: '1400px', perspectiveOrigin: '50% 52%' }}
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
          const scale   = Math.max(0.52, 1 - absOff * 0.18);
          const rotY    = offset * -40;          // ruota verso centro
          const transX  = offset * 460;          // spaziatura orizzontale
          const transZ  = -absOff * 180;         // spinge in profondità
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
                width: 500,
                height: 500,
                marginLeft: -250,
                marginTop: -280,
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
              {/* Card quadrata: foto piena + striscia info in basso */}
              <div className="relative w-full h-full overflow-hidden shadow-2xl bg-primary/10">
                {/* Foto piena */}
                {getPhoto(v) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={getPhoto(v)!}
                    alt={v.nome}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-container">
                    <span className="material-symbols-outlined text-7xl text-on-surface-variant/20">directions_car</span>
                  </div>
                )}

                {/* Categoria badge */}
                <div className="absolute top-4 left-4 bg-primary text-white text-[9px] font-montserrat font-bold uppercase tracking-widest px-3 py-1.5 shadow-lg">
                  {v.categoria}
                </div>

                {/* Gradiente + striscia info */}
                <div className="absolute bottom-0 left-0 right-0">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="relative px-5 pb-5 pt-10 flex items-end justify-between gap-3">
                    <p className="text-white font-montserrat font-bold text-lg leading-snug">
                      {v.nome}
                    </p>
                    {isCenter && (
                      <Link
                        href={`/veicoli/${v.slug || v.id}`}
                        className="flex-none inline-flex items-center gap-1.5 bg-white text-primary text-[10px] font-montserrat font-bold uppercase tracking-[0.18em] px-4 py-2 hover:bg-secondary transition-colors shadow-lg whitespace-nowrap"
                        onClick={e => e.stopPropagation()}
                      >
                        Scopri
                        <span className="material-symbols-outlined text-sm">north_east</span>
                      </Link>
                    )}
                  </div>
                </div>


                {/* Ring attivo */}
                {isCenter && (
                  <div className="absolute inset-0 ring-2 ring-secondary/70 pointer-events-none" />
                )}
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
