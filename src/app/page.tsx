'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, ShieldCheck, Zap, Battery, Briefcase } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center bg-slate-900 overflow-hidden">
        {/* Background Gradient/Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/90 mix-blend-multiply" />
          {/* Abstract blobs */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/20 blur-3xl"
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 10, 0] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
            className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/20 blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-full">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl md:text-7xl font-outfit font-black text-white leading-tight mb-6">
                 Eleva i tuoi <span className="text-blue-400">spostamenti</span> con pura classe.
              </h1>
              <p className="text-xl md:text-2xl text-slate-300 font-light max-w-2xl mb-12">
                Noleggio di Golf Car esclusivi, totalmente elettrici, ideali per resort luxury, green, eventi aziendali e privati.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#flotta" className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-lg transition-all shadow-lg flex items-center justify-center group">
                  Scopri la Flotta
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href="#contatti" className="px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold text-lg transition-all flex items-center justify-center">
                  Richiedi un Preventivo
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Value Prop */}
      <section id="servizi" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm uppercase tracking-widest font-bold text-blue-600 mb-2">Perché Solaris?</h2>
            <h3 className="text-3xl md:text-5xl font-outfit font-extrabold text-slate-900 text-balance">
              Pensati per durare, progettati per stupire
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all duration-300 cursor-default"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-md text-white">
                  {item.icon}
                </div>
                <h4 className="text-xl font-bold font-outfit text-slate-900 mb-3">{item.title}</h4>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaser Flotta */}
      <section id="flotta" className="py-24 bg-slate-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-outfit font-black mb-4">
               Esplora i nostri <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">modelli</span>
              </h2>
              <p className="text-slate-400 text-lg">
                La flotta è costantemente aggiornata con i migliori mezzi sul mercato per garantirti silenziosità ed emissioni zero.
              </p>
            </div>
            <a href="/flotta" className="mt-8 md:mt-0 flex items-center text-blue-400 font-semibold hover:text-blue-300 transition-colors group">
              Vedi tutto il parco auto
              <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {/* Esempio Mock. Successivamente lo legheremo a Firebase! */}
             {[1, 2, 3].map((_, i) => (
                <div key={i} className="group bg-slate-800 rounded-3xl overflow-hidden shadow-2xl border border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                  <div className="relative h-64 bg-slate-700 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                    {/* Placeholder per l'immagine */}
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500 font-medium group-hover:scale-105 transition-transform duration-500">
                      [Foto Veicolo Premium]
                    </div>
                    <div className="absolute bottom-4 left-4 z-20">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">Disponibile</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-2xl font-bold font-outfit mb-2">Modello {i === 0 ? "Executive" : i === 1 ? "Golf-Pro" : "Resort Mover"}</h4>
                    <p className="text-slate-400 mb-6 line-clamp-2">Una vettura elegante e silenziosa a 4 posti, interni in eco-pelle, perfetta per spostamenti nei parchi o sul green.</p>
                    <div className="flex justify-between items-center pt-4 border-t border-slate-700">
                      <div>
                        <span className="block text-sm text-slate-500 uppercase tracking-wider">A partire da</span>
                        <span className="text-xl font-bold text-blue-400">€60<span className="text-sm font-normal text-slate-500">/giorno</span></span>
                      </div>
                      <button className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                        <ArrowRight className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-outfit font-black text-white mb-6">Pronto per muoverti con stile?</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Richiedi la disponibilità per il tuo evento o per un noleggio stagionale. Il nostro team ti risponderà in poche ore.
          </p>
          <a href="#contatti" className="inline-block px-10 py-4 bg-white text-blue-600 hover:bg-slate-50 font-bold rounded-full shadow-lg transition-transform hover:-translate-y-1">
            Contattaci subito
          </a>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: <Battery className="w-6 h-6" />,
    title: "100% Elettrici",
    desc: "Nessun rumore, nessuna emissione. Rispetta la natura del tuo resort o del tuo campo da golf godendo di un'autonomia eccellente."
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    title: "Supporto B2B",
    desc: "Pianifichiamo consegne per eventi e fiere, fornendo flotte multiple e personalizzate con il tuo logo o colorazione preferita."
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Assistenza Sicura",
    desc: "Il noleggio comprende manutenzione rapida e totale supporto 7 giorni su 7 in caso di necessità."
  }
];
