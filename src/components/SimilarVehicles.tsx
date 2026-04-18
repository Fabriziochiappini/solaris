'use client';

import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { Veicolo } from '@/lib/types';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Props {
  currentId: string;
}

export default function SimilarVehicles({ currentId }: Props) {
  const [vehicles, setVehicles] = useState<Veicolo[]>([]);
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) { setLoading(false); return; }
    getDocs(query(collection(db, 'veicoli'), orderBy('nome')))
      .then(snap => {
        const list = snap.docs
          .map(d => ({ id: d.id, ...d.data() } as Veicolo))
          .filter(v => v.id !== currentId);
        setVehicles(list);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [currentId]);

  const updateScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 10);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === 'right' ? el.clientWidth * 0.75 : -(el.clientWidth * 0.75), behavior: 'smooth' });
    setTimeout(updateScroll, 400);
  };

  if (loading || vehicles.length === 0) return null;

  // ≤4 auto → grid statico, >4 → carosello scrollabile
  const useCarousel = vehicles.length > 4;

  const getPhoto = (v: Veicolo) =>
    v.landing?.heroImmagine || v.foto?.[0] || null;

  const Card = ({ v, i }: { v: Veicolo; i: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      className={useCarousel ? 'flex-none w-72 md:w-80' : ''}
    >
      <Link href={`/veicoli/${v.id}`} className="group block">
        {/* Immagine */}
        <div className="aspect-[4/3] overflow-hidden bg-surface-container-low relative mb-4">
          {getPhoto(v) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={getPhoto(v)!}
              alt={v.nome}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 bg-white"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/20">directions_car</span>
            </div>
          )}
          {/* Categoria badge */}
          <div className="absolute top-3 left-3 bg-primary/90 text-white text-[9px] font-montserrat font-bold uppercase tracking-widest px-3 py-1">
            {v.categoria}
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors" />
        </div>

        {/* Testo */}
        <div>
          <h3 className="font-montserrat font-bold text-primary text-base mb-1 group-hover:underline underline-offset-2 flex items-center gap-1">
            {v.nome}
            <span className="material-symbols-outlined text-sm opacity-50 group-hover:opacity-100 transition-opacity">north_east</span>
          </h3>
          {v.landing?.heroDescrizione ? (
            <p className="text-on-surface-variant text-xs leading-relaxed line-clamp-2">
              {v.landing.heroDescrizione}
            </p>
          ) : v.prezzo > 0 ? (
            <p className="text-secondary text-xs font-bold">
              Da €{v.prezzo.toLocaleString('it-IT')}
            </p>
          ) : null}
        </div>
      </Link>
    </motion.div>
  );

  return (
    <section className="py-20 md:py-28 bg-surface-container-lowest border-t border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-3">Scopri di più</p>
          <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl text-primary tracking-tight">
            There&apos;s More to Discover
          </h2>
          <div className="h-1 w-20 bg-secondary mx-auto mt-5" />
        </motion.div>
      </div>

      {useCarousel ? (
        /* ── CAROSELLO (>4 auto) ── */
        <div className="relative group/section">
          {canLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-outline-variant/20 w-10 h-10 flex items-center justify-center hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-lg">chevron_left</span>
            </button>
          )}
          {canRight && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg border border-outline-variant/20 w-10 h-10 flex items-center justify-center hover:bg-surface-container transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-lg">chevron_right</span>
            </button>
          )}
          <div
            ref={carouselRef}
            onScroll={updateScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory px-6 lg:px-8 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {vehicles.map((v, i) => (
              <div key={v.id} className="snap-start">
                <Card v={v} i={i} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* ── GRID RESPONSIVE (≤4 auto) ── */
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`grid gap-8 ${
            vehicles.length === 1 ? 'grid-cols-1 max-w-sm mx-auto' :
            vehicles.length === 2 ? 'grid-cols-1 md:grid-cols-2 max-w-2xl mx-auto' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {vehicles.map((v, i) => <Card key={v.id} v={v} i={i} />)}
          </div>
        </div>
      )}
    </section>
  );
}
