import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Rental() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
      {/* Header */}
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-24 px-6 relative overflow-hidden">
          <div className="absolute inset-0 opacity-40">
            <img className="w-full h-full object-cover" alt="Fleet of electric vehicles lined up" src="/images/rental_management.png" />
          </div>
          <div className="max-w-7xl mx-auto relative z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Noleggio Sartoriale di Alto Livello.</h1>
            <p className="text-xl text-slate-100 max-w-3xl mx-auto mb-10 leading-relaxed">
              Dalle soluzioni a breve termine per eventi esclusivi, alle gestioni stagionali per le strutture ricettive d'élite: mobilità silenziosa, ovunque in Sardegna.
            </p>
          </div>
        </section>

        {/* Rental Types */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Card 1 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">calendar_today</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Breve Termine</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Ideale per eventi, matrimoni o necessità temporanee. Noleggia da 1 giorno a 1 mese con consegna inclusa.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check</span> Consegna in location</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check</span> Assitenza 24/7</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check</span> Ricarica inclusa</li>
              </ul>
              <button className="w-full py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all">Richiedi Preventivo</button>
            </div>

            {/* Card 2 */}
            <div className="bg-primary text-white p-8 rounded-2xl shadow-xl transform md:-translate-y-4 border border-primary">
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center text-white mb-6">
                <span className="material-symbols-outlined text-3xl">date_range</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Lungo Termine</h3>
              <p className="text-white/80 mb-6">
                La soluzione perfetta per Resort, Hotel e Golf Club. Noleggio stagionale o annuale con manutenzione full-service.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-white/90">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-white text-sm">check</span> Manutenzione programmata</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-white text-sm">check</span> Veicolo sostitutivo</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-white text-sm">check</span> Branding personalizzato</li>
              </ul>
              <button className="w-full py-3 bg-white text-primary font-bold rounded-lg hover:bg-slate-100 transition-all">Contatta Commerciale</button>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl">celebration</span>
              </div>
              <h3 className="text-2xl font-bold mb-4">Eventi Speciali</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6">
                Flotte personalizzate per grandi eventi, conferenze e VIP transport. Logistica completa gestita da noi.
              </p>
              <ul className="space-y-3 mb-8 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check</span> Coordinatore dedicato</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check</span> Allestimenti custom</li>
                <li className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-sm">check</span> Driver opzionali</li>
              </ul>
              <button className="w-full py-3 border border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all">Pianifica Evento</button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-background-light dark:bg-background-dark py-24 border-t border-primary/5">
          <div className="max-w-3xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">Domande Frequenti</h2>
            <div className="space-y-4">
              <details className="group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-lg list-none">
                  Quali documenti servono per il noleggio?
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <p className="mt-4 text-slate-500 dark:text-slate-400">
                  Per i privati è necessaria la patente di guida B in corso di validità e una carta di credito. Per le aziende richiediamo visura camerale e documenti del legale rappresentante.
                </p>
              </details>
              <details className="group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-lg list-none">
                  L'assicurazione è inclusa?
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <p className="mt-4 text-slate-500 dark:text-slate-400">
                  Sì, tutti i nostri veicoli sono coperti da assicurazione RCA. Sono disponibili coperture aggiuntive Kasko e Furto/Incendio su richiesta.
                </p>
              </details>
              <details className="group bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm cursor-pointer">
                <summary className="flex items-center justify-between font-bold text-lg list-none">
                  Effettuate consegne in tutta la Sardegna?
                  <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                </summary>
                <p className="mt-4 text-slate-500 dark:text-slate-400">
                  Assolutamente sì. Consegniamo direttamente presso la vostra struttura, porto o aeroporto in tutta l'isola.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <div className="bg-primary rounded-3xl p-10 md:p-16 text-white flex flex-col md:flex-row gap-16 shadow-2xl">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Consulenza Personalizzata</h2>
              <p className="text-white/80 mb-8">
                I nostri esperti sono a vostra disposizione per definire la soluzione più adatta alle vostre necessità operative o di rappresentanza.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined">call</span>
                  </div>
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wider">Telefono</p>
                    <p className="font-bold">+39 0789 123456</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined">mail</span>
                  </div>
                  <div>
                    <p className="text-xs text-white/60 uppercase tracking-wider">Email</p>
                    <p className="font-bold">booking@solaris.it</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 bg-white text-slate-900 rounded-2xl p-8">
              <form className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Nominativo / Referente</label>
                  <input type="text" className="w-full bg-slate-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary" placeholder="Mario Rossi" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Indirizzo Email</label>
                  <input type="email" className="w-full bg-slate-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary" placeholder="mario@email.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Dettagli della Richiesta</label>
                  <textarea className="w-full bg-slate-100 border-none rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary h-32" placeholder="Desidero ricevere informazioni su..."></textarea>
                </div>
                <button className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20">Invia Richiesta</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer (Simplified for brevity, usually shared component) */}
      <footer className="bg-background-light dark:bg-background-dark py-10 border-t border-primary/10 text-center text-slate-500 text-sm">
        <p>© 2024 SOLARIS S.r.l. - Tutti i diritti riservati.</p>
      </footer>
    </div>
  );
}
