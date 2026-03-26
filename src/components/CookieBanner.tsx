'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Controlla se l'utente ha già accettato i cookie in passato
    const consent = localStorage.getItem('solaris_cookie_consent');
    if (!consent) {
      // Breve ritardo per non essere troppo aggressivi al primo load
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('solaris_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('solaris_cookie_consent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] p-4 pointer-events-none">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className="pointer-events-auto max-w-5xl mx-auto bg-surface-container-high text-on-surface shadow-[0_-10px_40px_rgba(0,0,0,0.1)] rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-outline-variant/20"
      >
        
        <div className="flex-1">
          <h3 className="font-montserrat font-bold text-lg text-primary mb-2">Utilizzo dei Cookie</h3>
          <p className="text-sm font-lato text-on-surface-variant/80 leading-relaxed md:pr-8">
            Utilizziamo cookie essenziali per garantire il funzionamento del sito e cookie analitici per migliorare la tua esperienza. 
            Puoi scegliere di accettare tutti i cookie o gestire le tue preferenze. Leggi la nostra{' '}
            <Link href="/privacy-policy" className="text-primary font-bold underline decoration-primary/30 underline-offset-4 hover:decoration-primary transition-all">
              Privacy Policy
            </Link> 
            {' '}per maggiori dettagli.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 shrink-0">
          <button 
            onClick={handleDecline}
            className="px-6 py-3 border border-outline-variant rounded-full text-xs font-montserrat font-bold uppercase tracking-widest text-on-surface-variant hover:bg-surface-container-low transition-colors text-center"
          >
            Solo Essenziali
          </button>
          <button 
            onClick={handleAccept}
            className="px-8 py-3 bg-primary rounded-full text-xs font-montserrat font-bold uppercase tracking-widest text-on-primary hover:bg-primary-container transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 text-center"
          >
            Accetta Tutti
          </button>
        </div>

      </motion.div>
    </div>
  );
}
