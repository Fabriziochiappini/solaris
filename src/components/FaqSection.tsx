'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
  {
    domanda: 'Qual è l\'autonomia dei veicoli elettrici Sardinya Golf Car?',
    risposta:
      'L\'autonomia dipende dal tipo di batteria e dalle condizioni di utilizzo. Con le batterie al Litio (HP Lithium-Ion) si ottengono prestazioni superiori e più costanti nel tempo: da 40 a 100 km per carica, a seconda del modello e dell\'allestimento. Il terreno pianeggiante e il numero di passeggeri influenzano significativamente il risultato. Le stime inferiori si riferiscono al carico massimo su percorsi in salita, quelle superiori alla guida solo conducente su terreno piano.',
  },
  {
    domanda: 'Qual è la differenza tra batteria al Piombo e batteria al Litio?',
    risposta:
      'La batteria al Litio (HP Lithium-Ion) offre vantaggi significativi rispetto alla tradizionale batteria al piombo acido:\n\n• Durata maggiore: dopo 4 anni conserva ~90% della capacità originale (contro ~35% del piombo)\n• Zero manutenzione: nessuna necessità di rabboccare l\'acqua o pulire i terminali\n• Ricarica più rapida: fino al 40% più veloce rispetto al piombo\n• Sicurezza avanzata: sistema BMS integrato che protegge da sovraccarico, surriscaldamento e scarica profonda\n• Involucro stagno in metallo per utilizzo in ogni condizione',
  },
  {
    domanda: 'Quanto tempo ci vuole per ricaricare completamente il veicolo?',
    risposta:
      'Con il caricabatterie di bordo integrato, una ricarica completa richiede circa 7 ore per le batterie al litio. Le batterie al litio si ricaricano fino al 40% più velocemente rispetto alle versioni al piombo acido. Il veicolo può essere collegato comodamente a una presa domestica standard durante la notte.',
  },
  {
    domanda: 'Quanti passeggeri possono trasportare i vostri veicoli?',
    risposta:
      'La gamma comprende modelli da 2 e da 4 passeggeri. Il modello a 4 posti dispone di due sedili anteriori e un sedile posteriore ribaltabile, che si converte facilmente in un piano cargo per trasportare attrezzatura, borse della spesa o altro materiale. Il payload massimo per tutti i modelli è di 350 kg.',
  },
  {
    domanda: 'Dove possono circolare i veicoli Sardinya Golf Car?',
    risposta:
      'I nostri veicoli sono classificati come Personal Transportation Vehicle (PTV) con velocità massima di 24–30 km/h. Sono progettati per l\'utilizzo su campi da golf, all\'interno di resort, ville, tenute agricole, porti turistici e comunità residenziali dove la circolazione di questo tipo di veicoli è localmente consentita. Si consiglia sempre di verificare le normative locali per la circolazione su strada pubblica.',
  },
  {
    domanda: 'Quali dimensioni dei pneumatici sono disponibili?',
    risposta:
      'I veicoli sono disponibili con cerchi da 10" (25,4 cm) e 12" (30,5 cm) nella versione standard, e da 14" (35,6 cm) per i modelli con assetto rialzato (OFF-X/Lifted). La misura dei pneumatici è 205/50-10 o 205/30-12 nella versione standard, e 205/50-15 per i modelli OFF-X. La disponibilità può variare in base al modello e alla configurazione scelta.',
  },
  {
    domanda: 'Offrite servizio di noleggio oltre alla vendita?',
    risposta:
      'Sì, offriamo noleggio a breve e lungo termine in tutta la Sardegna, con consegna e ritiro direttamente a destinazione: hotel, porto, villa o campo da golf. Organizziamo anche la fornitura di flotte per eventi, strutture ricettive e proprietà private. Contattaci per ricevere un preventivo personalizzato senza impegno.',
  },
  {
    domanda: 'È prevista una garanzia sui veicoli?',
    risposta:
      'Sì. Tutti i veicoli Club Car sono coperti da una garanzia standard limitata di 3 anni. Il team Sardinya Golf Car by Solaris garantisce assistenza tecnica in tutta la Sardegna, con interventi rapidi e ricambi originali. Le specifiche di garanzia possono variare in base al modello e all\'allestimento scelto.',
  },
];

function FaqItem({ domanda, risposta, isOpen, toggle }: {
  domanda: string;
  risposta: string;
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div className="border-b border-outline-variant/20 last:border-0">
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between gap-6 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="font-montserrat font-bold text-primary text-base group-hover:text-secondary transition-colors">
          {domanda}
        </span>
        <span
          className={`material-symbols-outlined text-secondary flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        >
          expand_more
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-on-surface-variant text-sm leading-relaxed whitespace-pre-line">
              {risposta}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(prev => (prev === i ? null : i));

  return (
    <section className="py-20 md:py-28 bg-white border-t border-outline-variant/10">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">
            Hai domande?
          </p>
          <h2 className="font-montserrat font-extrabold text-4xl md:text-5xl text-primary tracking-tight mb-4">
            Domande Frequenti
          </h2>
          <div className="h-1.5 w-24 bg-secondary" />
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-surface-container-lowest shadow-lg px-6 md:px-10 divide-y divide-outline-variant/10"
        >
          {FAQS.map((faq, i) => (
            <FaqItem
              key={i}
              domanda={faq.domanda}
              risposta={faq.risposta}
              isOpen={openIndex === i}
              toggle={() => toggle(i)}
            />
          ))}
        </motion.div>

        {/* Note */}
        <p className="mt-8 text-xs text-on-surface-variant/60 italic text-center">
          Le specifiche tecniche sono indicative e soggette a variazioni. Per informazioni dettagliate consulta i nostri esperti.
        </p>

      </div>
    </section>
  );
}
