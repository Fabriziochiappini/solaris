'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// ── Immagini ────────────────────────────────────────────────────────────────
const IMG = {
  villasimius:  'https://res.cloudinary.com/dn96krsq7/image/upload/v1776630204/20210309115828-villasimius_fgtmbv.webp',
  maddalena:    'https://res.cloudinary.com/dn96krsq7/image/upload/v1776630204/la-maddalena-7804471_1280_avmyet.jpg',
  onward2:      'https://res.cloudinary.com/dn96krsq7/image/upload/v1776630204/club-car-onward-2-passenger-dual-golf-bag-mounts_1_uf0q6f.webp',
  logo:         'https://res.cloudinary.com/dn96krsq7/image/upload/v1776630213/Solaris_Golf_car_Sardegna_wjsvgh.png',
  airender:     'https://res.cloudinary.com/dn96krsq7/image/upload/v1776630243/ChatGPT_Image_19_apr_2026_22_23_41_rwaiaw.png',
  // Firebase — foto NON usate in Servizi
  gallery3:     'https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2FA10BfuaSW7cTn6ipSmrR%2Fgallery-502891a2-338d-4191-9dd8-3faa80bd768d.webp?alt=media&token=7b2fcbbe-d789-4d2b-85a2-4d786b4cb913',
  gallery4:     'https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2FA10BfuaSW7cTn6ipSmrR%2Fgallery-3cf3df0c-e422-4dca-a1a3-c830c5e1c5f5.webp?alt=media&token=33e3deac-c81f-419a-ad45-786bd38f070e',
  feat2:        'https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2F8vJFXVSQjL7Pq3HrZPil%2Ffeat-cd430286-0b6e-4d17-8e74-bdf12fdad576.webp?alt=media&token=4d4c95a5-2d97-42d2-917d-048fb872545a',
  feat3:        'https://firebasestorage.googleapis.com/v0/b/solarisgolfcar.firebasestorage.app/o/veicoli%2F8vJFXVSQjL7Pq3HrZPil%2Ffeat-a7ac33a1-340e-4246-9350-fa0912ec8b62.webp?alt=media&token=f2696a18-3f35-4056-b97e-25d69d0680a3',
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.55, delay },
});

const VALORI = [
  {
    icon: 'eco',
    titolo: 'Zero Emissioni',
    desc: 'Ogni veicolo che vendiamo è 100% elettrico. Perché la Sardegna è un patrimonio da preservare, non da consumare.',
  },
  {
    icon: 'diamond',
    titolo: 'Lusso Accessibile',
    desc: 'Design premium, finiture di qualità e tecnologia d\'avanguardia. Il comfort che ti aspetti, senza compromessi.',
  },
  {
    icon: 'handshake',
    titolo: 'Consulenza Personale',
    desc: 'Ogni cliente è unico. Ti affianchiamo dalla scelta del modello alla consegna, con un servizio su misura.',
  },
  {
    icon: 'build_circle',
    titolo: 'Assistenza Continua',
    desc: 'Post-vendita, manutenzione e ricambi originali. Siamo qui anche dopo l\'acquisto, sempre.',
  },
];

const NUMERI = [
  { valore: '15+', label: 'Anni di esperienza' },
  { valore: '200+', label: 'Veicoli consegnati' },
  { valore: '50+', label: 'Partner hotel & resort' },
  { valore: '100%', label: 'Elettrico — zero emissioni' },
];

export default function ChiSiamoPage() {
  return (
    <main className="bg-white overflow-hidden">

      {/* ── HERO ─────────────────────────────────────────── */}
      <header className="relative min-h-[85vh] flex items-end overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={IMG.villasimius}
          alt="Villasimius, Sardegna"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pb-20 w-full">
          <motion.div {...fadeUp()}>
            <p className="text-secondary font-bold text-xs uppercase tracking-[0.4em] mb-4">Sardinya Golf Car — by Solaris</p>
            <h1 className="font-montserrat font-extrabold text-5xl md:text-7xl text-white tracking-tight leading-tight mb-6">
              Chi Siamo
            </h1>
            <p className="text-white/70 text-xl max-w-2xl leading-relaxed">
              Nati nel cuore della Sardegna per portare una nuova idea di mobilità: elegante, silenziosa, sostenibile.
            </p>
          </motion.div>
        </div>
      </header>

      {/* ── LA NOSTRA STORIA ─────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp()} className="space-y-7">
              <div>
                <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">La nostra storia</p>
                <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-primary tracking-tight mb-4">
                  Nati in Sardegna.<br />Costruiti per la Sardegna.
                </h2>
                <div className="h-1.5 w-24 bg-secondary" />
              </div>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Solaris nasce dalla passione per questo territorio e dalla convinzione che muoversi tra i paesaggi più belli del Mediterraneo debba essere un&apos;esperienza, non solo uno spostamento.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Siamo distributori ufficiali <strong className="text-primary">Club Car</strong> — il marchio leader mondiale nei veicoli elettrici di qualità — e serviamo privati, hotel di lusso, resort esclusivi e strutture ricettive di tutta la Sardegna.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Ogni veicolo che consegniamo è il risultato di una selezione accurata: non vendiamo semplicemente un mezzo, costruiamo un&apos;esperienza di mobilità su misura per chi ama il bello e rispetta l&apos;ambiente.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full bg-secondary/10 -z-10" />
              <div className="aspect-[4/3] overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.onward2} alt="Club Car Onward" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              {/* Badge sovrapposto */}
              <div className="absolute -bottom-6 -left-6 bg-primary text-white p-6 shadow-xl">
                <p className="font-montserrat font-black text-3xl text-secondary">Club Car</p>
                <p className="text-xs uppercase tracking-widest text-white/70 mt-1">Distributore Ufficiale</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NUMERI ───────────────────────────────────────── */}
      <section className="py-16 bg-primary">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {NUMERI.map((n, i) => (
              <motion.div key={n.label} {...fadeUp(i * 0.08)}>
                <p className="font-montserrat font-black text-5xl md:text-6xl text-secondary mb-2">{n.valore}</p>
                <p className="text-white/60 text-xs uppercase tracking-widest">{n.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-surface-container-lowest border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Foto griglia sx */}
            <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 gap-3 order-2 lg:order-1">
              <div className="aspect-[4/3] overflow-hidden col-span-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.airender} alt="Golf car in Sardegna" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.gallery3} alt="Veicolo dettaglio" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.feat2} alt="Golf car premium" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>

            {/* Testo dx */}
            <motion.div {...fadeUp()} className="order-1 lg:order-2 space-y-7">
              <div>
                <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">La nostra missione</p>
                <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-primary tracking-tight mb-4">
                  La nostra Mission
                </h2>
                <div className="h-1.5 w-24 bg-secondary mb-6" />
              </div>
              <blockquote className="border-l-4 border-secondary pl-6 italic text-xl text-primary/80 font-light leading-relaxed">
                &ldquo;Rendere la mobilità elettrica di lusso accessibile a chiunque voglia vivere la Sardegna nel modo più autentico, silenzioso ed elegante possibile.&rdquo;
              </blockquote>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Crediamo che il futuro della mobilità in Sardegna debba essere sostenibile senza sacrificare lo stile. Le nostre golf car non sono semplici mezzi di trasporto: sono un&apos;estensione del proprio lifestyle, capaci di integrarsi perfettamente con ville esclusive, resort a 5 stelle e le strade bianche della macchia mediterranea.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Ogni anno il turismo di lusso in Sardegna cresce. Noi siamo qui per rispondere a questa domanda con prodotti all&apos;altezza: tecnologia americana, design internazionale, assistenza locale.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── I NOSTRI VALORI ──────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">Cosa ci guida</p>
            <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-primary tracking-tight mb-4">I Nostri Valori</h2>
            <div className="h-1.5 w-24 bg-secondary mx-auto" />
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALORI.map((v, i) => (
              <motion.div
                key={v.titolo}
                {...fadeUp(i * 0.1)}
                className="group border border-outline-variant/15 p-8 hover:border-secondary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-400"
              >
                <span className="material-symbols-outlined text-4xl text-secondary mb-5 block group-hover:scale-110 transition-transform">{v.icon}</span>
                <h3 className="font-montserrat font-extrabold text-xl text-primary uppercase tracking-tight mb-3">{v.titolo}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IL TERRITORIO ────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp()} className="space-y-6">
              <div>
                <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">La nostra casa</p>
                <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl tracking-tight mb-4">
                  Il meglio per i nostri clienti
                </h2>
                <div className="h-1.5 w-24 bg-secondary mb-6" />
              </div>
              <p className="text-white/70 text-lg leading-relaxed">
                Operiamo su tutta la Sardegna: dalla Costa Smeralda all&apos;Arcipelago della Maddalena, da Villasimius alle colline del Gennargentu. Ogni angolo di questa isola ha una storia unica — e i nostri veicoli sono il modo perfetto per viverla.
              </p>
              <p className="text-white/70 text-lg leading-relaxed">
                Silenzio. Zero emissioni. Nessuna fretta. Ecco come si deve vivere la Sardegna.
              </p>
              <ul className="space-y-3 mt-4">
                {['Costa Smeralda & Porto Cervo', 'Arcipelago della Maddalena', 'Villasimius & Costa Rei', 'Alghero & Nurra', 'Consegna su tutto il territorio'].map((l) => (
                  <li key={l} className="flex items-center gap-3 text-sm text-white/80">
                    <span className="material-symbols-outlined text-secondary text-base">place</span>
                    {l}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeUp(0.15)} className="grid grid-cols-2 gap-3">
              <div className="aspect-[4/3] col-span-2 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.maddalena} alt="Arcipelago della Maddalena" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.gallery4} alt="Golf car in natura" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="aspect-square overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG.feat3} alt="Veicolo elettrico Sardegna" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── LOGO / IDENTITÀ ──────────────────────────────── */}
      <section className="py-20 bg-surface-container-lowest border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeUp(0.1)} className="flex justify-center lg:justify-start">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG.logo} alt="Solaris Golf Car Sardegna" className="max-w-sm w-full object-contain drop-shadow-xl" />
            </motion.div>
            <motion.div {...fadeUp()} className="space-y-6">
              <div>
                <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">Il nostro impegno</p>
                <h2 className="font-montserrat font-extrabold text-4xl text-primary tracking-tight mb-4">
                  Un brand costruito sulla fiducia
                </h2>
                <div className="h-1.5 w-24 bg-secondary mb-6" />
              </div>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Solaris è il punto di riferimento in Sardegna per chi cerca un veicolo elettrico di qualità. Il nostro nome è sinonimo di affidabilità, stile e rispetto per il territorio — valori che condividiamo con ogni cliente.
              </p>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Non siamo un call center. Siamo persone reali, appassionate, che conoscono ogni veicolo del nostro catalogo e parlano con te direttamente, senza intermediari.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {['Distributore Club Car', 'Garanzia ufficiale', 'Assistenza post-vendita', 'Ricambi originali'].map((tag) => (
                  <span key={tag} className="text-xs font-bold uppercase tracking-wider text-primary border border-primary/20 px-4 py-2">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA FINALE ───────────────────────────────────── */}
      <section className="py-24 bg-primary text-center">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div {...fadeUp()}>
            <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-4">Inizia oggi</p>
            <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-white mb-6 tracking-tight">
              Vieni a trovarci.<br />Parliamo di mobilità.
            </h2>
            <p className="text-white/70 text-lg mb-10 leading-relaxed">
              Che tu stia cercando il veicolo perfetto per la tua villa, il tuo hotel o per un semplice giro nella natura — siamo qui per te.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contatti"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-primary font-montserrat font-bold text-sm uppercase tracking-widest px-10 py-5 hover:bg-secondary/90 transition-all shadow-xl hover:-translate-y-1"
              >
                <span className="material-symbols-outlined text-base">chat</span>
                Contattaci
              </Link>
              <Link
                href="/veicoli"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-montserrat font-bold text-sm uppercase tracking-widest px-10 py-5 hover:bg-white/10 transition-all"
              >
                Scopri i Veicoli
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}
