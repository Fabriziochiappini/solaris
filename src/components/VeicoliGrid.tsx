'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Veicolo } from '@/lib/types';

type Filtro = 'TUTTI' | 'GOLF' | 'PERSONAL USE' | 'LAVORO';

const FILTRI: { key: Filtro; label: string }[] = [
  { key: 'TUTTI',        label: 'Tutti' },
  { key: 'GOLF',         label: 'Golf Car' },
  { key: 'PERSONAL USE', label: 'Personal Use' },
  { key: 'LAVORO',       label: 'Lavoro' },
];

export default function VeicoliGrid({ veicoli }: { veicoli: Veicolo[] }) {
  const [filtro, setFiltro] = useState<Filtro>('TUTTI');

  const filtered = veicoli.filter((v) => {
    if (filtro === 'TUTTI') return true;
    return v.categoria?.toUpperCase() === filtro;
  });

  return (
    <>
      {/* ── SWITCH FILTRI ── */}
      <div className="flex justify-center py-10 border-b border-outline-variant/10 bg-white sticky top-[64px] z-30">
        <div className="inline-flex bg-surface-container-lowest border border-outline-variant/20 p-1 gap-1">
          {FILTRI.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFiltro(key)}
              className={`
                font-montserrat font-bold text-xs uppercase tracking-[0.2em] px-6 py-2.5 transition-all duration-200
                ${filtro === key
                  ? 'bg-primary text-white shadow'
                  : 'text-on-surface-variant hover:bg-surface-container'
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── LISTA VEICOLI ── */}
      {filtered.length === 0 ? (
        <section className="py-40 text-center">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/20 mb-6 block">directions_car</span>
          <p className="text-on-surface-variant text-lg">Nessun veicolo in questa categoria.</p>
        </section>
      ) : (
        filtered.map((v, i) => {
          const imageRight = i % 2 === 0;
          const foto = v.landing?.heroImmagine || v.foto?.[0] || null;
          const desc = v.landing?.heroDescrizione || '';

          return (
            <section
              key={v.id}
              className={`py-14 md:py-28 ${i % 2 === 0 ? 'bg-white' : 'bg-surface-container-lowest'} border-b border-outline-variant/10`}
            >
              <div className="max-w-7xl mx-auto px-5 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20 items-center">

                  {/* ── IMMAGINE ── */}
                  <div className={`relative order-1 ${imageRight ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className={`absolute inset-0 bg-secondary/8 -z-10 ${imageRight
                      ? 'translate-x-3 translate-y-3 lg:translate-x-4 lg:translate-y-4'
                      : '-translate-x-3 translate-y-3 lg:-translate-x-4 lg:translate-y-4'
                    }`} />
                    <div className="aspect-[16/10] md:aspect-[4/3] bg-white overflow-hidden shadow-xl">
                      {foto ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={foto} alt={v.nome} className="w-full h-full object-contain" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-surface-container">
                          <span className="material-symbols-outlined text-8xl text-on-surface-variant/15">directions_car</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── TESTO ── */}
                  <div className={`order-2 ${imageRight ? 'lg:order-1' : 'lg:order-2'}`}>

                    <div className="hidden lg:flex items-center gap-4 mb-6">
                      <span className="font-montserrat font-black text-7xl text-primary/8 leading-none select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="h-px flex-1 bg-outline-variant/30" />
                    </div>

                    {v.categoria && (
                      <p className="text-secondary font-bold text-[10px] uppercase tracking-[0.35em] mb-2 lg:mb-3">
                        {v.categoria}
                      </p>
                    )}
                    <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl lg:text-5xl text-primary tracking-tight leading-tight mb-4 lg:mb-5">
                      {v.nome}
                    </h2>

                    {desc && (
                      <p className="text-on-surface-variant text-sm md:text-base lg:text-lg leading-relaxed mb-5 lg:mb-8 max-w-lg">
                        {desc}
                      </p>
                    )}

                    {Object.keys(v.specs || {}).length > 0 && (
                      <div className="space-y-2 mb-6 lg:mb-8">
                        {Object.entries(v.specs || {}).slice(0, 4).map(([k, val]) => (
                          <div key={k} className="flex items-center justify-between border-b border-outline-variant/15 pb-2">
                            <span className="text-on-surface-variant text-sm">{k}</span>
                            <span className="font-montserrat font-bold text-primary text-sm">{val}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4">
                      {v.prezzo > 0 && (
                        <span className="font-montserrat font-black text-xl md:text-2xl text-secondary">
                          Da €{v.prezzo.toLocaleString('it-IT')}
                        </span>
                      )}
                      <Link
                        href={`/veicoli/${v.slug || v.id}`}
                        className="inline-flex items-center gap-2 bg-primary text-white font-montserrat font-bold text-[11px] uppercase tracking-[0.2em] px-6 py-3.5 lg:px-7 lg:py-4 hover:bg-primary/90 shadow-lg hover:-translate-y-0.5 transition-all"
                      >
                        Scopri di più
                        <span className="material-symbols-outlined text-sm">north_east</span>
                      </Link>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          );
        })
      )}
    </>
  );
}
