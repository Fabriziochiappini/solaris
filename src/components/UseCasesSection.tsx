'use client';

import { motion } from 'framer-motion';

const USI = [
  {
    titolo: 'Vita di quartiere',
    descrizione:
      'Perfetti per brevi spostamenti e uso quotidiano, i nostri veicoli rendono la vita di tutti i giorni più facile, riducendo consumi e tempi di spostamento.',
  },
  {
    titolo: 'Avventure all\'aria aperta',
    descrizione:
      'Progettati per il tempo libero e l\'avventura, ti permettono di esplorare di più portando tutto il necessario per una giornata perfetta all\'aperto.',
  },
  {
    titolo: 'Famiglia, commissioni e lavoro',
    descrizione:
      'Veicoli pensati per il comfort, la sicurezza e la praticità: che tu sia in famiglia, in giro per commissioni o stia gestendo la tua proprietà.',
  },
];

const FOTO = [
  {
    src: 'https://res.cloudinary.com/dn96krsq7/image/upload/v1776628608/20260113_ClubCar-Lifestyle_StrongShotStudio-35_1_fhyooa.webp',
    caption: 'Per il quartiere — Trova il modello perfetto per te',
    span: 'lg:col-span-2',
    aspect: 'aspect-[16/9]',
  },
  {
    src: 'https://res.cloudinary.com/dn96krsq7/image/upload/v1776628607/Errands_j0jtfp.webp',
    caption: 'Per le commissioni quotidiane — Praticità e spazio',
    span: 'lg:col-span-1',
    aspect: 'aspect-[4/3]',
  },
  {
    src: 'https://res.cloudinary.com/dn96krsq7/image/upload/v1776758536/RB-20220526-0540-Edit_vell0j.jpg',
    caption: 'Golf Car di Eccellenza — Massimo Comfort sul Green',
    span: 'lg:col-span-1',
    aspect: 'aspect-[4/3]',
  },
];

export default function UseCasesSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-outline-variant/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">Per ogni stile di vita</p>
          <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-primary tracking-tight mb-4">
            Un veicolo per ogni esigenza
          </h2>
          <div className="h-1.5 w-24 bg-secondary" />
        </motion.div>

        {/* Grid principale: testo sx, foto dx */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16 items-center">

          {/* Colonna testi */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            {USI.map((uso, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="border-l-4 border-secondary/30 pl-6"
              >
                <h3 className="font-montserrat font-bold text-xl text-primary mb-2">{uso.titolo}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{uso.descrizione}</p>
              </motion.div>
            ))}
          </div>

          {/* Colonna foto */}
          <div className="lg:col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {FOTO.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative overflow-hidden group ${f.span} ${f.aspect}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={f.src}
                  alt={f.caption}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent px-5 py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <p className="text-white text-xs font-bold uppercase tracking-wider">{f.caption}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
