'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import CtaButtons from '@/components/CtaButtons';

// ── Immagini reali dal progetto Solaris ──────────────────────────────────────
const IMG = {
  hero:      'https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2FA10BfuaSW7cTn6ipSmrR%2Fcopertina-6326dc09-e6a4-41c7-a2aa-40bd58b4ff58.webp?alt=media&token=1e240a07-9749-45b5-906a-15d77358119d',
  gallery1:  'https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2FA10BfuaSW7cTn6ipSmrR%2Fgallery-4d3ed4ab-650e-46ba-a836-310a6dd90c17.webp?alt=media&token=2df312f4-eb16-4fb1-9e34-69add41fa418',
  gallery2:  'https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2FA10BfuaSW7cTn6ipSmrR%2Fgallery-26ec963e-17b9-4240-9cc4-416428cd4864.webp?alt=media&token=2b7c7470-0657-442e-ad75-6d7a2d267c6e',
  gallery3:  'https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2FA10BfuaSW7cTn6ipSmrR%2Fgallery-502891a2-338d-4191-9dd8-3faa80bd768d.webp?alt=media&token=7b2fcbbe-d789-4d2b-85a2-4d786b4cb913',
  feat1:     'https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2F8vJFXVSQjL7Pq3HrZPil%2Ffeat-7f0253c1-01f5-4e55-8355-7ac53d8dfd66.webp?alt=media&token=05ac8b6e-f315-4cf9-bc3f-377f0b805dfe',
  feat2:     'https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2F8vJFXVSQjL7Pq3HrZPil%2Ffeat-cd430286-0b6e-4d17-8e74-bdf12fdad576.webp?alt=media&token=4d4c95a5-2d97-42d2-917d-048fb872545a',
  acc1:      'https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2Fe0eYOtkknKuHwRGOvftS%2Facc-e2d7740e-4b32-4fe1-a60f-e4f6e9aae54d.webp?alt=media&token=440374db-db90-44b7-bf0c-91e5ebdec02e',
  acc2:      'https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2F8vJFXVSQjL7Pq3HrZPil%2Ffeat-b6183649-9ffc-46dd-a72f-f1fa96df010f.webp?alt=media&token=84d54c25-3516-4e18-ae25-28f34ecf8f0a',
  lifestyle1:'https://res.cloudinary.com/dn96krsq7/image/upload/v1776628608/20260113_ClubCar-Lifestyle_StrongShotStudio-35_1_fhyooa.webp',
  lifestyle2:'https://res.cloudinary.com/dn96krsq7/image/upload/v1776628607/Errands_j0jtfp.webp',
  lifestyle3:'https://res.cloudinary.com/dn96krsq7/image/upload/v1776758536/RB-20220526-0540-Edit_vell0j.jpg',
};

const NOLEGGIO = [
  {
    icon: 'timer',
    titolo: 'Noleggio Breve Termine',
    desc: 'Perfetto per vacanze, eventi speciali o esigenze stagionali in Costa Smeralda e Nord Sardegna. Consegna e ritiro direttamente a domicilio, in hotel o in porto.',
    punti: ['Minimo 1 giorno', 'Consegna ovunque in Sardegna', 'Veicoli sempre revisionati'],
  },
  {
    icon: 'calendar_month',
    titolo: 'Noleggio Lungo Termine',
    desc: 'Soluzioni mensili e stagionali su misura per hotel, resort, agriturismi e ville private. Manutenzione e assistenza incluse nel canone.',
    punti: ['Flotte dedicate per strutture ricettive', 'Manutenzione inclusa', 'Rinnovo veicoli garantito'],
  },
  {
    icon: 'groups',
    titolo: 'Flotte per Eventi',
    desc: 'Coordinamento logistico completo per matrimoni, tornei di golf, manifestazioni sportive e fiere. Forniamo veicoli brandizzati per la tua comunicazione.',
    punti: ['Brandizzazione su richiesta', 'Staff di supporto', 'Coordinamento logistico'],
  },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

export default function ServiziPage() {
  return (
    <main className="bg-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <header className="relative pt-40 pb-0 bg-primary overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(255,255,255,.05) 40px, rgba(255,255,255,.05) 41px)' }}
        />
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-end">
            <motion.div {...fadeUp()} className="pb-16">
              <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-4">Sardinya Golf Car</p>
              <h1 className="font-montserrat font-extrabold text-5xl md:text-6xl text-white tracking-tight leading-tight mb-6">
                I Nostri<br />Servizi
              </h1>
              <p className="text-white/70 text-lg leading-relaxed max-w-lg mb-10">
                Vendita, noleggio e personalizzazione di golf car e veicoli elettrici premium. Tutto ciò di cui hai bisogno per muoverti in Sardegna con stile ed efficienza.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contatti"
                  className="inline-flex items-center gap-2 bg-secondary text-white font-montserrat font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-secondary/90 transition-all shadow-xl hover:-translate-y-0.5"
                >
                  <span className="material-symbols-outlined text-sm">chat</span>
                  Richiedi Info
                </Link>
                <Link
                  href="/veicoli"
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-montserrat font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-white/10 transition-all"
                >
                  Vedi i Veicoli
                </Link>
              </div>
            </motion.div>

            {/* Immagine hero tagliata in basso */}
            <motion.div {...fadeUp(0.15)} className="relative h-[400px] lg:h-[460px] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.hero} alt="Golf car Sardinya" className="w-full h-full object-cover object-center" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* ── VENDITA VEICOLI ──────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp()} className="mb-14">
            <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">La nostra gamma</p>
            <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-primary tracking-tight mb-4">Vendita Veicoli</h2>
            <div className="h-1.5 w-24 bg-secondary" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp(0.1)} className="space-y-8">
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Siamo il punto di riferimento in Sardegna per la vendita di golf car Club Car e veicoli elettrici. Lavoriamo con privati, strutture ricettive e aziende che cercano soluzioni di mobilità sostenibile, elegante e duratura.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: 'golf_course', label: 'Golf Car', desc: 'Modelli 2 e 4 passeggeri per il campo e il club' },
                  { icon: 'directions_car', label: 'Personal Use', desc: 'Per il quartiere, la villa e il tempo libero' },
                  { icon: 'construction', label: 'Uso Lavoro', desc: 'Veicoli cargo e utility per ambienti professionali' },
                ].map((cat) => (
                  <div key={cat.label} className="border-l-4 border-secondary/30 pl-5 py-2">
                    <span className="material-symbols-outlined text-secondary text-2xl mb-2 block">{cat.icon}</span>
                    <h3 className="font-montserrat font-bold text-primary text-sm uppercase tracking-wide mb-1">{cat.label}</h3>
                    <p className="text-on-surface-variant text-xs leading-relaxed">{cat.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/veicoli"
                className="inline-flex items-center gap-2 bg-primary text-white font-montserrat font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-0.5"
              >
                Scopri tutti i modelli
                <span className="material-symbols-outlined text-sm">north_east</span>
              </Link>
            </motion.div>

            <motion.div {...fadeUp(0.2)} className="grid grid-cols-2 gap-3">
              <div className="aspect-[4/3] overflow-hidden col-span-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.lifestyle1} alt="Golf car uso quotidiano" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.gallery1} alt="Golf car dettaglio" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.lifestyle3} alt="Veicolo stradale" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ACCESSORI ────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-surface-container-lowest border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Foto sx */}
            <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 gap-3 order-2 lg:order-1">
              <div className="aspect-[4/3] overflow-hidden col-span-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.feat1} alt="Accessori golf car" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.acc1} alt="Accessorio custom" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.acc2} alt="Personalizzazione veicolo" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>

            {/* Testo dx */}
            <motion.div {...fadeUp()} className="order-1 lg:order-2 space-y-6">
              <div>
                <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">Personalizza il tuo veicolo</p>
                <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-primary tracking-tight mb-4">Accessori & Configurazioni</h2>
                <div className="h-1.5 w-24 bg-secondary mb-6" />
              </div>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Ogni veicolo può essere personalizzato con un&apos;ampia selezione di accessori originali Club Car. Dalle capote colorate ai sistemi audio, dai cerchi in lega ai kit cargo: trasformiamo il tuo golf car in qualcosa di unico.
              </p>
              <ul className="space-y-3">
                {[
                  'Capote e parasole personalizzati',
                  'Cerchi in lega e pneumatici speciali',
                  'Kit audio e sistemi multimediali',
                  'Accessori cargo e vani portaoggetti',
                  'Illuminazione LED e kit fanali',
                  'Sedute personalizzate e rivestimenti',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-secondary text-base mt-0.5 flex-shrink-0">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/contatti"
                className="inline-flex items-center gap-2 bg-primary text-white font-montserrat font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-0.5 mt-2"
              >
                Configura il tuo veicolo
                <span className="material-symbols-outlined text-sm">north_east</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── PERCHÉ SCEGLIERCI ────────────────────────────── */}
      <section className="py-20 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">La differenza Solaris</p>
            <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl tracking-tight">Perché sceglierci</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: 'verified', titolo: 'Club Car Ufficiale', desc: 'Veicoli originali con garanzia del produttore e parti genuine.' },
              { icon: 'build_circle', titolo: 'Assistenza Inclusa', desc: 'Manutenzione programmata e interventi rapidi in tutta la Sardegna.' },
              { icon: 'local_shipping', titolo: 'Consegna a Domicilio', desc: 'Portiamo il veicolo dove preferisci: villa, hotel, porto o campo.' },
              { icon: 'eco', titolo: '100% Elettrico', desc: 'Zero emissioni, silenzioso, ideale per i paesaggi protetti della Sardegna.' },
            ].map((item, i) => (
              <motion.div key={item.titolo} {...fadeUp(i * 0.1)} className="text-center">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4 block">{item.icon}</span>
                <h3 className="font-montserrat font-bold text-lg uppercase tracking-tight mb-2">{item.titolo}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NOLEGGIO ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp()} className="mb-14">
            <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">Flessibilità massima</p>
            <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-primary tracking-tight mb-4">Noleggio</h2>
            <div className="h-1.5 w-24 bg-secondary mb-6" />
            <p className="text-on-surface-variant text-lg max-w-2xl leading-relaxed">
              La libertà di muoversi in totale silenzio e stile, senza pensieri. Veicoli sempre nuovi, perfettamente manutenuti e pronti a partire.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {NOLEGGIO.map((s, i) => (
              <motion.div
                key={s.titolo}
                {...fadeUp(i * 0.1)}
                className="group bg-surface-container-lowest border border-outline-variant/15 p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
              >
                <span className="material-symbols-outlined text-4xl text-secondary mb-5 block group-hover:scale-110 transition-transform">{s.icon}</span>
                <h3 className="font-montserrat font-extrabold text-xl text-primary uppercase tracking-tight mb-3">{s.titolo}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed mb-5">{s.desc}</p>
                <ul className="space-y-2">
                  {s.punti.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-secondary text-sm">check</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Banner immagine noleggio */}
          <motion.div {...fadeUp(0.2)} className="relative overflow-hidden h-[300px] md:h-[380px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={IMG.lifestyle2} alt="Noleggio golf car Sardegna" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/20 flex items-center">
              <div className="px-10 md:px-16 max-w-lg">
                <p className="text-white font-bold text-xs uppercase tracking-widest mb-3">Pronto a partire?</p>
                <h3 className="font-montserrat font-extrabold text-3xl md:text-4xl text-white mb-6 leading-tight">
                  Richiedi un preventivo di noleggio personalizzato
                </h3>
                <Link
                  href="/contatti"
                  className="inline-flex items-center gap-2 bg-secondary text-white font-montserrat font-bold text-xs uppercase tracking-widest px-8 py-4 hover:bg-secondary/90 transition-all shadow-xl hover:-translate-y-0.5"
                >
                  Contattaci ora
                  <span className="material-symbols-outlined text-sm">north_east</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── ASSISTENZA & RICAMBI ──────────────────────────── */}
      <section className="py-20 md:py-28 bg-primary text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Header */}
          <motion.div {...fadeUp()} className="mb-16 max-w-2xl">
            <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">Sempre al tuo fianco</p>
            <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
              Assistenza &amp;<br />Ricambi Originali
            </h2>
            <div className="h-1.5 w-24 bg-secondary mb-6" />
            <p className="text-white/70 text-lg leading-relaxed">
              Il nostro team tecnico certificato Club Car garantisce assistenza rapida, ricambi originali
              e manutenzione programmata su tutta la Sardegna. Il tuo veicolo è sempre in perfetta forma.
            </p>
          </motion.div>

          {/* Grid layout: 3 cards + immagine grande */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-16">

            {/* Colonna sx: 3 service cards */}
            <div className="space-y-5">
              {[
                {
                  icon: 'build',
                  titolo: 'Manutenzione Programmata',
                  desc: 'Tagliandi periodici, controllo batterie, freni, pneumatici e sistemi elettronici. Teniamo il tuo veicolo sempre ai massimi livelli di efficienza.',
                },
                {
                  icon: 'construction',
                  titolo: 'Ricambi Originali Club Car',
                  desc: 'Forniamo esclusivamente ricambi originali e certificati Club Car. Batterie, motori, schede di controllo, carrozzeria e molto altro, sempre disponibili.',
                },
                {
                  icon: 'electric_bolt',
                  titolo: 'Interventi Rapidi in Loco',
                  desc: 'Il nostro team si sposta direttamente da te — hotel, villa, porto o campo da golf. Interveniamo entro 24/48 ore in tutta la Sardegna.',
                },
                {
                  icon: 'battery_charging_full',
                  titolo: 'Sostituzione e Upgrade Batterie',
                  desc: 'Passa da piombo a litio oppure aumenta la capacità con le nostre soluzioni di upgrade batteria. Più autonomia, meno costi nel tempo.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.titolo}
                  {...fadeUp(i * 0.08)}
                  className="flex gap-5 p-6 bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                >
                  <span className="material-symbols-outlined text-secondary text-3xl flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <div>
                    <h3 className="font-montserrat font-bold text-base uppercase tracking-tight mb-2">{item.titolo}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Colonna dx: foto impilate */}
            <motion.div {...fadeUp(0.15)} className="grid grid-cols-2 gap-3 h-full">
              <div className="aspect-[3/4] overflow-hidden col-span-1">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.feat2} alt="Tecnico Club Car in assistenza" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex flex-col gap-3">
                <div className="flex-1 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMG.gallery2} alt="Ricambi originali Club Car" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex-1 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={IMG.gallery3} alt="Golf car in manutenzione" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Banner numeri / CTA */}
          <motion.div {...fadeUp(0.2)} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10">
            {[
              { numero: '24/48h', label: 'Tempo medio d\'intervento' },
              { numero: '100%', label: 'Ricambi originali Club Car' },
              { numero: 'Tutta la Sardegna', label: 'Area di copertura assistenza' },
            ].map((s) => (
              <div key={s.label} className="bg-primary px-8 py-8 text-center">
                <p className="font-montserrat font-extrabold text-3xl text-white mb-2">{s.numero}</p>
                <p className="text-white/60 text-sm uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div {...fadeUp(0.25)} className="mt-10 text-center">
            <Link
              href="/contatti"
              className="inline-flex items-center gap-2 bg-secondary text-white font-montserrat font-bold text-xs uppercase tracking-widest px-10 py-4 hover:bg-secondary/90 transition-all shadow-xl hover:-translate-y-0.5"
            >
              <span className="material-symbols-outlined text-sm">handyman</span>
              Richiedi Assistenza
            </Link>
          </motion.div>

        </div>
      </section>

      {/* ── CTA FINALE ───────────────────────────────────── */}

      <section className="py-24 bg-surface-container-lowest text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp()}>
            <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-4">Inizia oggi</p>
            <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-primary mb-6 tracking-tight">
              Parliamo del tuo progetto
            </h2>
            <p className="text-on-surface-variant text-lg mb-10 leading-relaxed">
              Che tu voglia acquistare, noleggiare o personalizzare un veicolo, il team Solaris è a tua disposizione per una consulenza senza impegno.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <CtaButtons location="pagina_servizi_bottom" />
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
