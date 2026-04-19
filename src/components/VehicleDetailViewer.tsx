'use client';

import { useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Veicolo } from '@/lib/types';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import SimilarVehicles from '@/components/SimilarVehicles';

const PhotoViewer = dynamic(() => import('@/components/PhotoViewer'), { ssr: false });

interface Props {
  veicolo: Veicolo;
}

export default function VehicleDetailViewer({ veicolo }: Props) {
  const landing = veicolo.landing;
  const foto = veicolo.foto || [];
  const accessori = landing?.accessori || [];
  const featuresSource = landing?.features || [];

  // foto[0] is the homepage card cover — exclude it from the gallery
  const galleryFoto = foto.slice(1);
  const displayFeatures = featuresSource;
  const displayAccessori = accessori;

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'landing' | 'specs'>('landing');
  const [galRef, galApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [featRef, featApi] = useEmblaCarousel({ loop: true, align: 'center' });
  const [accRef, accApi] = useEmblaCarousel({ loop: true, align: 'center' });

  // Perché Sardynia: sezione statica (no carousel)

  const whatsAppLink = `https://wa.me/393331234567?text=Ciao,%20vorrei%20informazioni%20sul%20veicolo%20${encodeURIComponent(veicolo.nome)}`;


  return (
    <div className="min-h-screen bg-surface-container-lowest">

      {/* ========== SEZIONE 1: HERO 2 COLONNE (Elementor-style) ========== */}
      <section className="pt-28 pb-20 md:pt-36 md:pb-28 bg-white border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* COLONNA SINISTRA: Testo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="space-y-8 order-2 lg:order-1"
            >
              {/* Breadcrumb categoria */}
              <div className="flex items-center gap-3">
                <div className="h-px w-12 bg-secondary" />
                <p className="text-secondary font-bold text-xs uppercase tracking-[0.3em]">
                  {veicolo.categoria}
                </p>
              </div>

              {/* Titolo principale */}
              <div>
                <h1 className="font-montserrat font-extrabold text-4xl md:text-5xl lg:text-6xl text-primary tracking-tight leading-[1.0] mb-6">
                  {landing?.heroTitolo || veicolo.nome}
                </h1>
                <div className="h-1.5 w-20 bg-secondary" />
              </div>

              {/* Descrizione */}
              <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg">
                {landing?.heroDescrizione || `Scopri le caratteristiche uniche di ${veicolo.nome}. Progettato per offrire prestazioni ed eleganza senza compromessi in ogni percorso.`}
              </p>

              {/* Prezzo */}
              {veicolo.prezzo > 0 && (
                <div className="inline-block border-l-4 border-secondary pl-5 py-2">
                  <p className="text-xs uppercase tracking-widest font-bold text-on-surface-variant/60 mb-1">A partire da</p>
                  <p className="font-montserrat font-extrabold text-3xl text-primary">
                    €{veicolo.prezzo.toLocaleString('it-IT')}
                    <span className="text-sm font-normal text-on-surface-variant ml-2">IVA inclusa</span>
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href={whatsAppLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary text-white px-10 py-5 text-xs font-montserrat font-bold uppercase tracking-[0.2em] hover:bg-primary-container transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center gap-3"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  Richiedi Preventivo
                </a>
              </div>
            </motion.div>

            {/* COLONNA DESTRA: Immagine */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative order-1 lg:order-2"
            >
              {/* Decorazione di sfondo */}
              <div className="absolute inset-0 translate-x-4 translate-y-4 bg-secondary/15 -z-10" />

              <div className="aspect-[4/3] shadow-2xl bg-white relative overflow-hidden">
                {(landing?.heroImmagine || foto[0]) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={landing?.heroImmagine || foto[0]}
                    alt={veicolo.nome}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-container">
                    <span className="material-symbols-outlined text-6xl text-on-surface-variant/30">directions_car</span>
                  </div>
                )}
                {/* Badge categoria sull'immagine */}
                <div className="absolute top-5 left-5 bg-primary text-white px-4 py-2 font-montserrat font-bold text-[10px] uppercase tracking-widest shadow-lg">
                  {veicolo.categoria}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ========== MACRO TAB BAR ========== */}
      <div className="sticky top-16 z-30 bg-white border-b-2 border-outline-variant/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-center">
            <button
              onClick={() => setActiveTab('landing')}
              className={`relative px-8 py-5 font-montserrat font-bold text-sm uppercase tracking-widest transition-all ${
                activeTab === 'landing'
                  ? 'text-primary'
                  : 'text-on-surface-variant/50 hover:text-primary'
              }`}
            >
              {veicolo.nome}
              {activeTab === 'landing' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`relative px-8 py-5 font-montserrat font-bold text-sm uppercase tracking-widest transition-all ${
                activeTab === 'specs'
                  ? 'text-primary'
                  : 'text-on-surface-variant/50 hover:text-primary'
              }`}
            >
              Specifiche Tecniche
              {activeTab === 'specs' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========== TAB: LANDING ========== */}
      {activeTab === 'landing' && (
        <>
          {/* ===== SCHEDA TECNICA VISIVA (text left, image right) ===== */}
          {(landing?.schedaTecnicaDettagli || landing?.schedaTecnicaFoto) && (
            <section className="py-10 md:py-14 bg-white border-b border-outline-variant/10">
              <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                  {/* Colonna sinistra: dettagli */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-1"
                  >
                    {(landing.schedaTecnicaDettagli || '').split('\n').map((line, i) => {
                      const t = line.trim();
                      if (!t) return <div key={i} className="h-3" />;
                      if (t.startsWith('#')) return (
                        <p key={i} className="font-montserrat font-bold text-primary text-base pt-4 pb-1 border-b border-outline-variant/20">
                          {t.slice(1).trim()}
                        </p>
                      );
                      if (t.startsWith('-') || t.startsWith('•')) return (
                        <div key={i} className="flex items-start gap-3 py-1">
                          <span className="material-symbols-outlined text-secondary text-base mt-0.5 flex-none">check_small</span>
                          <span className="text-on-surface-variant text-sm leading-relaxed">{t.replace(/^[-•]\s*/, '')}</span>
                        </div>
                      );
                      return <p key={i} className="text-on-surface-variant/70 text-sm pt-1">{t}</p>;
                    })}
                  </motion.div>

                  {/* Colonna destra: immagine */}
                  {landing.schedaTecnicaFoto && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="relative"
                    >
                      <div className="absolute inset-0 -translate-x-4 translate-y-4 bg-secondary/10 -z-10" />
                      <div className="aspect-[4/3] bg-white shadow-xl overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={landing.schedaTecnicaFoto} alt={veicolo.nome} className="w-full h-full object-contain" />
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ===== CITAZIONE / FRASE D'EFFETTO ===== */}
          {landing?.citazione && (
            <section className="py-6 md:py-8 bg-white">
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


          {galleryFoto.length > 0 && (
            <section className="py-10 md:py-14 bg-surface-container-lowest">
              <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl text-primary uppercase tracking-tight mb-3">
                    Galleria
                  </h2>
                  <div className="h-1.5 w-24 bg-secondary mb-4" />
                  <p className="text-sm md:text-base text-on-surface-variant/80 italic">
                    Clicca per guardare le foto
                  </p>
                </motion.div>
              </div>

              <div className="relative group">
                {/* Il loop è infinito quindi le frecce sono sempre attive */}
                <button
                  onClick={() => galApi?.scrollPrev()}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all rounded-sm"
                >
                  <span className="material-symbols-outlined text-xl md:text-2xl">chevron_left</span>
                </button>
                <button
                  onClick={() => galApi?.scrollNext()}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all rounded-sm"
                >
                  <span className="material-symbols-outlined text-xl md:text-2xl">chevron_right</span>
                </button>

                <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing pb-4" ref={galRef}>
                  <div className="flex -ml-6" style={{ backfaceVisibility: 'hidden' }}>
                    {galleryFoto.map((f, i) => {
                      const originalIndex = i % galleryFoto.length;
                      const meta = landing?.galleriaFoto?.[originalIndex];
                      const hasMeta = meta?.titolo || meta?.sottotitolo;
                      return (
                        <div
                          key={i}
                          className="flex-[0_0_85vw] md:flex-[0_0_50%] min-w-0 pl-6"
                        >
                          <div
                            onClick={() => { setViewerIndex(originalIndex); setIsViewerOpen(true); }}
                            className="w-full aspect-[16/10] overflow-hidden cursor-zoom-in group/img relative shadow-lg"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={f} alt={meta?.titolo || `${veicolo.nome} - foto ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105" />

                            {/* Gradiente sempre visibile se c'è testo, altrimenti solo su hover */}
                            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity ${hasMeta ? 'opacity-100' : 'opacity-0 group-hover/img:opacity-60'}`} />

                            {/* Overlay titolo/sottotitolo — stile Club Car, bottom-left */}
                            {hasMeta && (
                              <div className="absolute bottom-0 left-0 p-6 z-10">
                                {meta.titolo && (
                                  <p className="font-montserrat font-bold text-white text-lg leading-tight drop-shadow-sm">
                                    {meta.titolo}
                                  </p>
                                )}
                                {meta.sottotitolo && (
                                  <p className="text-white/85 text-sm leading-snug mt-1 max-w-xs drop-shadow-sm">
                                    {meta.sottotitolo}
                                  </p>
                                )}
                              </div>
                            )}

                            {/* Badge ingrandisci */}
                            <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 text-[9px] font-bold tracking-widest uppercase text-primary opacity-0 group-hover/img:opacity-100 transition-opacity shadow-md z-10">Ingrandisci</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* ========== TAB: SPECIFICHE TECNICHE ========== */}
      {activeTab === 'specs' && (
        <section className="py-10 md:py-14 bg-white min-h-[60vh]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl text-primary uppercase tracking-tight mb-3">
                Specifiche Tecniche
              </h2>
              <div className="h-1.5 w-24 bg-secondary" />
            </motion.div>

            {landing?.specificheHtml ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="specs-html-container max-w-none"
                dangerouslySetInnerHTML={{ __html: landing.specificheHtml }}
              />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {Object.entries(veicolo.specs || {}).map(([key, val]) => (
                  <div key={key} className="flex flex-col border-l-4 border-secondary/30 pl-6 py-4 bg-surface-container-lowest">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60 mb-2">{key}</span>
                    <span className="font-montserrat font-bold text-primary text-2xl">{val}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </section>
      )}

      {/* ========== FEATURES CAROUSEL: "Discover NomeAuto" ========== */}
      {activeTab === 'landing' && featuresSource.length > 0 && (
        <section className="py-10 md:py-14 bg-white border-b border-outline-variant/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <p className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-3">Features That Stand Out</p>
              <h2 className="font-montserrat font-extrabold text-3xl md:text-4xl text-primary uppercase tracking-tight mb-3">
                Discover {veicolo.nome}
              </h2>
              <div className="h-1.5 w-24 bg-secondary" />
            </motion.div>
          </div>

          <div className="relative group">
            <button
              onClick={() => featApi?.scrollPrev()}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all rounded-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl md:text-2xl">chevron_left</span>
            </button>
            <button
              onClick={() => featApi?.scrollNext()}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all rounded-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl md:text-2xl">chevron_right</span>
            </button>

            <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing pb-8 pt-4" ref={featRef}>
              <div className="flex -ml-6" style={{ backfaceVisibility: 'hidden' }}>
              {displayFeatures.map((feat, i) => (
                <div key={i} className="flex-[0_0_80vw] md:flex-[0_0_475px] min-w-0 pl-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="group h-full"
                  >
                    {feat.url && (
                      <div className="aspect-[4/3] overflow-hidden mb-5 bg-surface-container-low shadow-md">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={feat.url}
                          alt={feat.titolo || ''}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    {feat.titolo && (
                      <h3 className="font-montserrat font-bold text-primary text-xl mb-3 pr-4">{feat.titolo}</h3>
                    )}
                    {feat.sottotitolo && (
                      <p className="text-on-surface-variant text-sm leading-relaxed pr-4">{feat.sottotitolo}</p>
                    )}
                  </motion.div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========== SEZIONE 5: ACCESSORIZE YOUR CAR (solo tab landing) ========== */}
      {activeTab === 'landing' && accessori.length > 0 && (

        <section className="py-10 md:py-14 bg-surface-container-lowest">
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
            <button
              onClick={() => accApi?.scrollPrev()}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all rounded-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl md:text-2xl">chevron_left</span>
            </button>
            <button
              onClick={() => accApi?.scrollNext()}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center hover:bg-primary hover:text-white text-primary transition-all rounded-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl md:text-2xl">chevron_right</span>
            </button>

            <div className="overflow-hidden w-full cursor-grab active:cursor-grabbing pb-8 pt-4" ref={accRef}>
              <div className="flex -ml-6" style={{ backfaceVisibility: 'hidden' }}>
              {displayAccessori.map((acc, i) => (
                <div key={`${acc.id}-${i}`} className="flex-[0_0_80vw] md:flex-[0_0_350px] min-w-0 pl-6">
                  <div className="bg-white shadow-lg overflow-hidden group/acc hover:shadow-2xl transition-shadow h-full flex flex-col">
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
                    <div className="p-6 flex-1">
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
                </div>
              ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========== SEZIONE: PERCHÉ SARDYNIA GOLF CARS (STATICA CENTRATA) ========== */}
      {activeTab === 'landing' && (
        <section className="py-10 md:py-14 bg-white border-b border-outline-variant/10">
          <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center mb-16">
            <h2 className="font-montserrat font-extrabold text-3xl md:text-5xl text-primary tracking-tight mb-4">
              Perché Sardynia <span className="text-secondary">Golf Cars</span>
            </h2>
            <div className="h-1.5 w-24 bg-secondary mx-auto" />
          </div>

          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

              {/* Qualità */}
              <div className="bg-surface-container-lowest p-10 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <span className="material-symbols-outlined text-6xl mb-8 text-secondary">verified_user</span>
                <h3 className="font-montserrat font-bold text-xl text-primary mb-4">Qualità Ineguagliabile</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Costruiti con telaio in alluminio inossidabile, finiture resistenti e componenti di sicurezza testati. Progettati per durare nel tempo, garantendo affidabilità e divertimento senza pensieri in Costa Smeralda.
                </p>
              </div>

              {/* Prestazioni */}
              <div className="bg-surface-container-lowest p-10 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <span className="material-symbols-outlined text-6xl mb-8 text-secondary">battery_charging_full</span>
                <h3 className="font-montserrat font-bold text-xl text-primary mb-4">Prestazioni Inarrestabili</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Potenza al litio di lunga durata, accelerazione fluida, frenata rigenerativa e precisione anche a pieno carico. Ogni guida offre controllo, sicurezza e autonomia per nuove avventure.
                </p>
              </div>

              {/* Comfort */}
              <div className="bg-surface-container-lowest p-10 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                <span className="material-symbols-outlined text-6xl mb-8 text-secondary">event_seat</span>
                <h3 className="font-montserrat font-bold text-xl text-primary mb-4">Comfort Senza Pari</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">
                  Sospensioni testate per affrontare con sicurezza anche i terreni più difficili, con sedili premium progettati per ore di utilizzo. L&apos;ergonomia raffinata garantisce una posizione di guida sempre perfetta.
                </p>
              </div>

            </div>
          </div>

          <div className="text-center mt-14 px-6">
            <a
              href="/chi-siamo"
              className="inline-block bg-primary text-secondary px-8 py-4 font-montserrat font-bold text-sm uppercase tracking-widest hover:bg-primary/90 shadow-xl hover:-translate-y-1 transition-all"
            >
              Scopri la differenza Sardynia Golf Cars
            </a>
          </div>
        </section>
      )}

      {/* ========== SEZIONE 7: CONTATTI E MAPPA (sempre visibile) ========== */}
      <section className="py-10 md:py-14 bg-primary">
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

      {/* ===== VEICOLI SIMILI ===== */}
      <SimilarVehicles currentId={veicolo.id} />

      {/* Lightbox */}
      {isViewerOpen && galleryFoto.length > 0 && (
        <PhotoViewer
          photos={galleryFoto}
          initialIndex={viewerIndex}
          open={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
        />
      )}
    </div>
  );
}
