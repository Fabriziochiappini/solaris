'use client';

import { motion } from 'framer-motion';

export default function ChiSiamoPage() {
  const values = [
    { title: 'Eccellenza', desc: 'Ogni veicolo è selezionato per offrire il massimo del comfort e dello stile.' },
    { title: 'Sostenibilità', desc: 'Tecnologia 100% elettrica per preservare la bellezza naturale della Sardegna.' },
    { title: 'Servizio', desc: 'Assistenza dedicata in tutta la Gallura e oltre, per una mobilità senza pensieri.' },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-surface-container-lowest overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h1 className="font-montserrat font-extrabold text-5xl text-primary tracking-tight uppercase mb-4">
                La Nostra Storia
              </h1>
              <div className="h-1.5 w-32 bg-secondary"></div>
            </div>
            
            <p className="text-xl text-on-surface-variant/80 leading-relaxed font-light italic border-l-4 border-secondary/20 pl-8">
              "Nati nel cuore della Gallura, abbiamo trasformato la mobilità elettrica in un'esperienza di lusso per chi vive e ama la Sardegna."
            </p>

            <p className="text-on-surface-variant font-medium text-lg leading-relaxed">
              Solaris non è solo un rivenditore di golf car, ma un partner strategico per hotel, resort e residenti che cercano il massimo dell'efficienza senza rinunciare all'eleganza. Da anni selezioniamo i migliori brand internazionali per portarli tra i paesaggi unici della Costa Smeralda.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-square md:aspect-video lg:aspect-square group rounded-2xl overflow-hidden shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1541443131876-44b03de101c5?auto=format&fit=crop&q=80&w=1200" 
              className="absolute inset-0 w-full h-full object-cover transition-all duration-[5s] group-hover:scale-110"
              alt="L'essenza di Solaris"
            />
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay" />
          </motion.div>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="bg-surface-container-low p-12 text-center shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-b-4 border-secondary/0 hover:border-secondary"
            >
              <h3 className="font-montserrat font-extrabold text-2xl text-primary uppercase tracking-tight mb-4">
                {v.title}
              </h3>
              <p className="text-on-surface-variant/70 leading-relaxed">
                {v.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </main>
  );
}
