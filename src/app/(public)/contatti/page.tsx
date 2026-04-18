'use client';

import { motion } from 'framer-motion';

export default function ContattiPage() {
  const contactInfo = [
    { icon: 'location_on', label: 'Sede Principale', value: 'Olbia / Aglientu, Sardegna', link: 'https://maps.google.com' },
    { icon: 'phone', label: 'Telefono', value: '+39 333 123 4567', link: 'tel:+393331234567' },
    { icon: 'mail', label: 'Email', value: 'info@solarisgolfcar.it', link: 'mailto:info@solarisgolfcar.it' },
    { icon: 'schedule', label: 'Orari', value: 'Lun - Sab: 09:00 - 19:00', link: null },
    { icon: 'business_center', label: 'Dati Aziendali', value: 'Sardinya golf car By Solaris • P.IVA 02659430900 • REA SS 193996', link: null },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-surface-container-lowest overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <h1 className="font-montserrat font-extrabold text-5xl text-primary tracking-tight uppercase mb-4">
            <h2 className="font-montserrat font-bold text-xl text-secondary mt-2">Assistenza ufficiale Club Car</h2>
          </h1>
          <div className="h-1.5 w-32 bg-secondary"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Colonna Sinistra: Form & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {contactInfo.map((info) => (
                <div key={info.label} className="group">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="material-symbols-outlined text-secondary text-2xl group-hover:scale-110 transition-transform">
                      {info.icon}
                    </span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">
                      {info.label}
                    </span>
                  </div>
                  {info.link ? (
                    <a href={info.link} className="text-lg font-montserrat font-bold text-primary hover:text-secondary transition-colors underline decoration-outline-variant decoration-1 underline-offset-4">
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-lg font-montserrat font-bold text-primary">
                      {info.value}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Support Form Placeholder */}
            <div className="bg-surface-container-low p-10 shadow-xl space-y-6">
              <h3 className="font-montserrat font-bold text-primary uppercase tracking-widest text-sm mb-4">
                Inviaci un Messaggio
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input type="text" placeholder="Nome" className="bg-white border border-outline-variant/30 p-4 text-sm focus:outline-none focus:border-secondary transition-colors" />
                <input type="email" placeholder="Email" className="bg-white border border-outline-variant/30 p-4 text-sm focus:outline-none focus:border-secondary transition-colors" />
              </div>
              <textarea placeholder="Il tuo messaggio..." rows={4} className="w-full bg-white border border-outline-variant/30 p-4 text-sm focus:outline-none focus:border-secondary transition-colors" />
              <button className="w-full bg-primary text-on-primary py-5 text-xs font-montserrat font-bold uppercase tracking-[0.2em] hover:bg-primary-container transition-all active:scale-95">
                Invia Richiesta
              </button>
            </div>
          </motion.div>

          {/* Colonna Destra: Mappa */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative h-[600px] bg-surface-container-low shadow-2xl overflow-hidden group"
          >
            {/* Google Maps Iframe */}
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
            ></iframe>

            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
              <p className="text-white font-montserrat font-bold text-2xl mb-1 shadow-sm">Sardinya golf car</p>
              <p className="text-white/90 text-xs uppercase tracking-widest font-bold drop-shadow-md">By Solaris • Vendita, Noleggio, Assistenza</p>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
