'use client';

import { motion } from 'framer-motion';

export default function NoleggioPage() {
  const services = [
    { 
      title: 'Breve Termine', 
      desc: 'Per vacanze, eventi speciali o necessità temporanee. Consegna rapida ovunque in Costa Smeralda.',
      icon: 'timer'
    },
    { 
      title: 'Lungo Termine', 
      desc: 'Soluzioni personalizzate per hotel, resort e grandi tenute. Manutenzione inclusa nel canone.',
      icon: 'calendar_month'
    },
    { 
      title: 'Flotte Eventi', 
      desc: 'Supporto logistico per matrimoni, tornei di golf e manifestazioni con coordinamento dedicato.',
      icon: 'groups'
    }
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-surface-container-lowest overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="font-montserrat font-extrabold text-5xl text-primary tracking-tight uppercase mb-4">
                Servizio Noleggio
              </h1>
              <div className="h-1.5 w-32 bg-secondary"></div>
            </div>
            
            <p className="text-xl text-on-surface-variant font-medium leading-relaxed">
              La libertà di muoversi in totale silenzio e stile. Solaris offre soluzioni di noleggio flessibili per ogni esigenza, garantendo veicoli sempre nuovi e perfettamente manutenuti.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary p-12 text-on-primary shadow-2xl relative overflow-hidden group"
          >
            <div className="relative z-10 space-y-6">
              <h3 className="font-montserrat font-extrabold text-2xl uppercase tracking-tight">Perché scegliere il noleggio?</h3>
              <ul className="space-y-4">
                {[
                  'Nessun costo di manutenzione',
                  'Flessibilità stagionale',
                  'Veicoli di ultima generazione',
                  'Consegna e ritiro a domicilio'
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm font-medium">
                    <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000">
              <span className="material-symbols-outlined text-[12rem]">electric_car</span>
            </div>
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="group bg-surface-container-low p-10 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-xl"
            >
              <span className="material-symbols-outlined text-4xl text-secondary mb-6 block group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {s.icon}
              </span>
              <h3 className="font-montserrat font-extrabold text-2xl text-primary uppercase tracking-tight mb-4">
                {s.title}
              </h3>
              <p className="text-on-surface-variant/70 text-sm leading-relaxed mb-8">
                {s.desc}
              </p>
              <button className="text-[10px] font-montserrat font-bold uppercase tracking-widest text-primary border-b-2 border-primary/20 hover:border-primary pb-1 transition-all">
                Scopri di più
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
