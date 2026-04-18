'use client';

import { useState, useRef, useEffect } from 'react';
import { Veicolo } from '@/lib/types';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const PhotoViewer = dynamic(() => import('@/components/PhotoViewer'), { ssr: false });

interface Props {
  veicolo: Veicolo;
}

export default function VehicleDetailViewer({ veicolo }: Props) {
  const landing = veicolo.landing;
  const foto = veicolo.foto || [];
  const accessori = landing?.accessori || [];

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  // Carousel state
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Accessory carousel state
  const accCarouselRef = useRef<HTMLDivElement>(null);
  const [accCanLeft, setAccCanLeft] = useState(false);
  const [accCanRight, setAccCanRight] = useState(true);

  const whatsAppLink = `https://wa.me/393331234567?text=Ciao,%20vorrei%20informazioni%20sul%20veicolo%20${encodeURIComponent(veicolo.nome)}`;

  const updateScrollState = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const updateAccScrollState = () => {
    const el = accCarouselRef.current;
    if (!el) return;
    setAccCanLeft(el.scrollLeft > 10);
    setAccCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    updateScrollState();
    updateAccScrollState();
  }, []);

  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.85;
    el.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    setTimeout(updateScrollState, 400);
  };

  const scrollAccCarousel = (direction: 'left' | 'right') => {
    const el = accCarouselRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.7;
    el.scrollBy({ left: direction === 'right' ? scrollAmount : -scrollAmount, behavior: 'smooth' });
    setTimeout(updateAccScrollState, 400);
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest">

      {/* ========== SEZIONE 1: HERO 2 COLONNE ========== */}
      <section className="relative min-h-screen flex items-center">
        {/* Background sfumato */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-8 py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Colonna Sinistra: Testo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <p className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-4">
                {veicolo.categoria}
              </p>
              <h1 className="font-montserrat font-extrabold text-4xl md:text-6xl lg:text-7xl text-white tracking-tight leading-[0.95] mb-6">
                {landing?.heroTitolo || veicolo.nome}
              </h1>
              <div className="h-1.5 w-28 bg-secondary mb-8" />
            </div>
            <p className="text-white/85 text-lg md:text-xl font-light leading-relaxed max-w-xl">
              {landing?.heroDescrizione || `Scopri le caratteristiche uniche di ${veicolo.nome}. Progettato per offrire prestazioni ed eleganza senza compromessi.`}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-primary px-10 py-5 text-xs font-montserrat font-bold uppercase tracking-[0.2em] hover:bg-secondary/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                Richiedi Preventivo
              </a>
              <a
                href="/contatti"
                className="border-2 border-white/40 text-white px-10 py-5 text-xs font-montserrat font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
              >
                Contattaci
              </a>
            </div>
            {veicolo.prezzo > 0 && (
              <p className="text-white/50 text-sm pt-2">
                A partire da <span className="text-white font-bold text-2xl">€{veicolo.prezzo.toLocaleString('it-IT')}</span>
              </p>
            )}
          </motion.div>

          {/* Colonna Destra: Immagine Hero */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] overflow-hidden shadow-2xl bg-surface-container-low">
              {(landing?.heroImmagine || foto[0]) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={landing?.heroImmagine || foto[0]}
                  alt={veicolo.nome}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/20">
                  <span className="material-symbols-outlined text-6xl text-white/40">directions_car</span>
                </div>
              )}
            </div>
            {/* Badge decorativo */}
            <div className="absolute -bottom-4 -left-4 bg-secondary text-primary px-6 py-3 font-montserrat font-bold text-xs uppercase tracking-widest shadow-lg">
              {veicolo.categoria}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== SEZIONE 2: CITAZIONE / FRASE D'EFFETTO ========== */}
      {landing?.citazione && (
        <section className="py-24 md:py-32 bg-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto px-8 text-center"
          >
            <span className="material-symbols-outlined text-secondary text-5xl mb-8 block opacity-40">format_quote</span>
            <blockquote className="font-montserrat font-bold text-3xl md:text-5xl text-primary tracking-tight leading-tight italic">
              {landing.citazione}
            </blockquote>
            <div className="h-1 w-20 bg-secondary mx-auto mt-10" />
          </motion.div>
        </section>
      )}

      {/* ========== SEZIONE 3: GALLERIA CAROSELLO ========== */}
      {foto.length > 0 && (
        <section className="py-20 md:py-28 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl text-primary uppercase tracking-tight mb-3">
                Galleria
              </h2>
              <div className="h-1.5 w-24 bg-secondary" />
            </motion.div>
          </div>

          <div className="relative group">
            {/* Frecce navigazione */}
            {canScrollLeft && (
              <button
                onClick={() => scrollCarousel('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all"
              >
                <span className="material-symbols-outlined text-2xl">chevron_left</span>
              </button>
            )}
            {canScrollRight && (
              <button
                onClick={() => scrollCarousel('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all"
              >
                <span className="material-symbols-outlined text-2xl">chevron_right</span>
              </button>
            )}

            {/* Contenitore scorrevole */}
            <div
              ref={carouselRef}
              onScroll={updateScrollState}
              className="flex gap-6 overflow-x-auto scroll-smooth px-6 lg:px-8 pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {foto.map((f, i) => (
                <div
                  key={i}
                  onClick={() => { setViewerIndex(i); setIsViewerOpen(true); }}
                  className="flex-none w-[85vw] md:w-[calc(50%-12px)] aspect-[16/10] overflow-hidden cursor-zoom-in group/img snap-start relative shadow-lg"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={f}
                    alt={`${veicolo.nome} - foto ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity" />
                  <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 text-[9px] font-bold tracking-widest uppercase text-primary opacity-0 group-hover/img:opacity-100 transition-opacity shadow-md">
                    Ingrandisci
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== SEZIONE 4: SPECIFICHE TECNICHE ========== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl text-primary uppercase tracking-tight mb-3">
              Specifiche Tecniche
            </h2>
            <div className="h-1.5 w-24 bg-secondary" />
          </motion.div>

          {/* Se c'è l'HTML avanzato delle specifiche, mostralo */}
          {landing?.specificheHtml ? (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="specs-html-container prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: landing.specificheHtml }}
            />
          ) : (
            /* Altrimenti fallback sulle specs base chiave/valore */
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {Object.entries(veicolo.specs || {}).map(([key, val]) => (
                <div key={key} className="flex flex-col border-l-4 border-secondary/30 pl-6 py-4 bg-surface-container-lowest">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60 mb-2">
                    {key}
                  </span>
                  <span className="font-montserrat font-bold text-primary text-2xl">
                    {val}
                  </span>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ========== SEZIONE 5: ACCESSORIZE YOUR CAR ========== */}
      {accessori.length > 0 && (
        <section className="py-20 md:py-28 bg-surface-container-lowest">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-3">Personalizza</p>
              <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl text-primary uppercase tracking-tight mb-3">
                Accessorize Your Car
              </h2>
              <div className="h-1.5 w-24 bg-secondary" />
            </motion.div>
          </div>

          <div className="relative group">
            {accCanLeft && (
              <button
                onClick={() => scrollAccCarousel('left')}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all"
              >
                <span className="material-symbols-outlined text-2xl">chevron_left</span>
              </button>
            )}
            {accCanRight && (
              <button
                onClick={() => scrollAccCarousel('right')}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all"
              >
                <span className="material-symbols-outlined text-2xl">chevron_right</span>
              </button>
            )}

            <div
              ref={accCarouselRef}
              onScroll={updateAccScrollState}
              className="flex gap-8 overflow-x-auto scroll-smooth px-6 lg:px-8 pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {accessori.map((acc) => (
                <div key={acc.id} className="flex-none w-[80vw] md:w-[350px] snap-start bg-white shadow-lg overflow-hidden group/acc hover:shadow-2xl transition-shadow">
                  {acc.foto && (
                    <div className="aspect-[4/3] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={acc.foto}
                        alt={acc.titolo}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/acc:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="font-montserrat font-bold text-primary text-lg uppercase tracking-tight mb-2">
                      {acc.titolo}
                    </h3>
                    {acc.descrizione && (
                      <p className="text-on-surface-variant text-sm leading-relaxed">
                        {acc.descrizione}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ========== SEZIONE 6: CONTATTI E MAPPA ========== */}
      <section className="py-20 md:py-28 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* CTA Testo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <p className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-4">Pronto a partire?</p>
                <h2 className="font-montserrat font-extrabold text-3xl md:text-5xl text-white tracking-tight leading-tight mb-6">
                  Contattaci per un preventivo personalizzato
                </h2>
                <div className="h-1.5 w-24 bg-secondary mb-8" />
              </div>
              
              <div className="space-y-4 text-white/80">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary">location_on</span>
                  <span className="font-medium">Olbia / Aglientu, Sardegna</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary">phone</span>
                  <a href="tel:+393331234567" className="font-medium hover:text-white transition-colors">+39 333 123 4567</a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary">mail</span>
                  <a href="mailto:info@solarisgolfcar.it" className="font-medium hover:text-white transition-colors">info@solarisgolfcar.it</a>
                </div>
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-secondary">schedule</span>
                  <span className="font-medium">Lun - Sab: 09:00 - 19:00</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-secondary text-primary px-10 py-5 text-xs font-montserrat font-bold uppercase tracking-[0.2em] hover:bg-secondary/90 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  Scrivici su WhatsApp
                </a>
                <a
                  href="/contatti"
                  className="border-2 border-white/30 text-white px-10 py-5 text-xs font-montserrat font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
                >
                  Tutti i Contatti
                </a>
              </div>
            </motion.div>

            {/* Mappa */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[450px] md:h-[500px] shadow-2xl overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193309.52467575454!2d9.359265146747976!3d40.92055620956488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d94b05a6396865%3A0xd62f1c84cb1f41e0!2sOlbia%20SS!5e0!3m2!1sit!2sit!4v1711465200000!5m2!1sit!2sit"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 z-0"
                title="Mappa Sardinya Golf Car Olbia"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent pointer-events-none z-10" />
              <div className="absolute bottom-6 left-6 z-20 pointer-events-none">
                <p className="text-white font-montserrat font-bold text-xl mb-1">Sardinya Golf Car</p>
                <p className="text-white/80 text-[10px] uppercase tracking-widest font-bold">By Solaris • Vendita, Noleggio, Assistenza</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Lightbox */}
      {isViewerOpen && foto.length > 0 && (
        <PhotoViewer
          photos={foto}
          initialIndex={viewerIndex}
          open={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </div>
  );
}
