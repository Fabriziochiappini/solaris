import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased overflow-x-hidden font-display">
      {/* Header / Navigation */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/40 z-10"></div>
          {/* Video Placeholder Background */}
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover" alt="Premium electric golf cart on a lush green fairway of a world-class golf course" src="/images/hero.png" />
          </div>
          <div className="relative z-20 text-center px-6 max-w-5xl">
            <h1 className="text-4xl md:text-7xl font-bold text-white leading-tight mb-6">
              SOLARIS: L'Eccellenza della Mobilità Elettrica nell'Incanto della Sardegna.
            </h1>
            <p className="text-lg md:text-2xl text-white/90 font-light mb-10 max-w-3xl mx-auto">
              Soluzioni di mobilità sostenibile e di alto profilo per i campi da golf più prestigiosi, i resort d'élite e il vivere esclusivo.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/flotta" className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-lg text-lg font-bold hover:scale-105 transition-transform">
                Scopri la Flotta
              </Link>
              <Link to="/noleggio" className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-lg text-lg font-bold hover:bg-white/20 transition-all backdrop-blur-xl">
                Richiedi un Noleggio
              </Link>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce">
            <span className="material-symbols-outlined text-white text-3xl">keyboard_double_arrow_down</span>
          </div>
        </section>

        {/* Featured Fleet Section */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="mb-16">
            <span className="text-primary font-bold tracking-widest uppercase text-xs">Esperienza Elettrica Superiore</span>
            <h2 className="text-4xl font-bold mt-2">La Nostra Flotta</h2>
            <div className="h-0.5 w-16 bg-primary mt-4"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 relative group overflow-hidden rounded-3xl bg-slate-200 min-h-[400px] md:min-h-[600px]">
              <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Sophisticated electric vehicle parked in front of an elegant Mediterranean-style clubhouse" src="/images/golf_luxury.png" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/90 to-transparent">
                <h3 className="text-3xl font-bold text-white mb-2">Golf</h3>
                <p className="text-white/80 max-w-md italic">L'eleganza silenziosa per i green più prestigiosi e il vivere di lusso.</p>
                <Link className="mt-4 flex items-center gap-2 text-white font-bold hover:gap-4 transition-all" to="/flotta">
                  Esplora i modelli <span className="material-symbols-outlined">arrow_right_alt</span>
                </Link>
              </div>
            </div>
            <div className="md:col-span-5 grid grid-rows-2 gap-8">
              <div className="relative group overflow-hidden rounded-3xl bg-slate-200 min-h-[250px] md:min-h-0">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Industrial electric utility vehicle carrying maintenance supplies" src="/images/utility.png" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-1">Veicoli Utility</h3>
                  <p className="text-sm text-white/80">Affidabilità e efficienza per ogni esigenza logistica.</p>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-3xl bg-slate-200 min-h-[250px] md:min-h-0">
                <img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Multi-passenger electric shuttle waiting for guests" src="/images/people_mover.png" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-6 flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-1">Trasporto Ospiti</h3>
                  <p className="text-sm text-white/80">Accoglienza di classe con il massimo comfort acustico.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="bg-primary/5 py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Soluzioni Tailor-Made</h2>
              <p className="text-slate-600 dark:text-slate-400">Dalla vendita al noleggio a breve e lungo termine.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="relative min-h-[500px] md:h-auto md:aspect-[4/5] group rounded-3xl overflow-hidden shadow-lg shadow-black/5">
                <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Modern high-end vehicle showroom interior" src="/images/showroom.png" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>
                <div className="relative h-full flex flex-col items-start justify-end p-12 text-white">
                  <span className="material-symbols-outlined text-4xl mb-4 bg-white/20 p-3 rounded-full backdrop-blur-md">storefront</span>
                  <h3 className="text-3xl font-bold mb-4">Vendita & Personalizzazione</h3>
                  <p className="max-w-md mb-8 text-white/90 leading-relaxed">
                    Configuriamo il tuo veicolo ideale con dotazioni su misura, garantendo un'estetica impeccabile e prestazioni ottimali.
                  </p>
                  <Link to="/contatti" className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all">Richiedi Consulenza</Link>
                </div>
              </div>
              <div className="relative min-h-[500px] md:h-auto md:aspect-[4/5] group rounded-3xl overflow-hidden shadow-lg shadow-black/5">
                <img className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Professional fleet management paperwork on a desk" src="/images/rental_management.png" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-500"></div>
                <div className="relative h-full flex flex-col items-start justify-end p-12 text-white">
                  <span className="material-symbols-outlined text-4xl mb-4 bg-white/20 p-3 rounded-full backdrop-blur-md">key</span>
                  <h3 className="text-3xl font-bold mb-4">Noleggio & Gestione Flotte</h3>
                  <p className="max-w-md mb-8 text-white/90 leading-relaxed">
                    Soluzioni di noleggio flessibili e assistite per resort di prestigio, garantendo ai tuoi ospiti un'esperienza di mobilità senza pari.
                  </p>
                  <Link to="/noleggio" className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:shadow-xl hover:-translate-y-1 transition-all">Servizi di Noleggio</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="relative py-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover opacity-20 dark:opacity-10 grayscale" alt="Scenic view of the Sardinian coast with crystal clear water and granite rocks" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCI9zuZICZzaG-7tolc3-yX78SSBiP_6l5uaDA4xudLvsqFkmzLRs0Kb0vJni66y8pPHjLxFamOnjYKLd5b6PUelhGBBx11_zDt3gPlN0o3YLfAM0pYYh87jjtmtmJVhrPxzUIdewnD6HAKP3WwcQE9N7g9YgJTmVWNfWxBs4PJXRtyHYQuX7NvSxTyQ-tJxEmCLQnYZPO5p099SnLMnrBqr9rQ8LNZViXyGWkN_O-HdoHAVno5PzVRZcTAWjh2S8bH3s3H9ojBU0o" />
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-primary font-bold tracking-widest uppercase text-xs">I Nostri Valori</span>
                <h2 className="text-5xl font-bold mt-4 mb-8 leading-tight">Sostenibilità & Design d'Autore.</h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed italic">
                  Preservare l'incanto naturale della Sardegna è la nostra missione. Selezioniamo esclusivamente veicoli che coniugano il minimo impatto ambientale con l'eleganza senza tempo del design d'eccellenza.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="material-symbols-outlined text-primary text-4xl">eco</span>
                    <h4 className="font-bold text-lg">Efficienza Silenziosa</h4>
                    <p className="text-sm text-slate-500">Rispetto assoluto per i panorami sardi.</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="material-symbols-outlined text-primary text-4xl">verified</span>
                    <h4 className="font-bold text-lg">Standard Premium</h4>
                    <p className="text-sm text-slate-500">Solo brand di riferimento globale.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                <img className="w-full h-auto" alt="Luxury yacht and electric vehicles at a private port" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7hSkc425MGFAgWiIOUULsQGsE4wJuDa42jfVMP2YxU7gsSBF5lkrkEsn--IYjPVfM8FH-iGwBYwhfxZ-ZVMTXFJSIDbbWqCC0H_Y-tLqMRf7JHrNpK2tJ-45ep0oGR10sDnmhppb2roIlvNfB7pLmDX9JHhO_11NXBrbVqak3kaI9p3z55gqybXmiZ8kvABD-OUE44e9q9NkqDSpec9HIwuSUP-Q56zkqLrUex5btoEpaz3nddqMaH1645xVJc20pIQZ94LOFirk" />
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Slider */}
        <section className="bg-background-light dark:bg-background-dark py-24 border-y border-primary/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="material-symbols-outlined text-primary text-6xl mb-8">format_quote</span>
            <div className="mb-12">
              <p className="text-2xl md:text-3xl font-medium leading-relaxed italic mb-8">
                "Solaris ha ridefinito gli standard di mobilità per i nostri ospiti. La versatilità e l'eleganza dei veicoli, unite a un'assistenza impeccabile, riflettono perfettamente l'esclusività del nostro resort."
              </p>
              <div>
                <h5 className="font-bold text-lg">Marco Rossi</h5>
                <p className="text-slate-500 text-sm">Responsabile Operations, Luxury Resort Costa Smeralda</p>
              </div>
            </div>
            <div className="flex justify-center gap-2">
              <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">Pronti a Elevare la Vostra Mobilità?</h2>
              <p className="text-white/80 text-lg">Contattateci per una consulenza dedicata o per un preventivo personalizzato.</p>
            </div>
            <div className="flex gap-4">
              <Link to="/contatti" className="px-8 py-4 bg-white text-primary font-bold rounded-full hover:shadow-2xl transition-all shadow-lg shadow-black/20">Parla con un Nostro Esperto</Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-background-light dark:bg-background-dark pt-20 pb-10 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-primary">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    <path clipRule="evenodd" d="M39.475 21.6262C40.358 21.4363 40.6863 21.5589 40.7581 21.5934C40.7876 21.655 40.8547 21.857 40.8082 22.3336C40.7408 23.0255 40.4502 24.0046 39.8572 25.2301C38.6799 27.6631 36.5085 30.6631 33.5858 33.5858C30.6631 36.5085 27.6632 38.6799 25.2301 39.8572C24.0046 40.4502 23.0255 40.7407 22.3336 40.8082C21.8571 40.8547 21.6551 40.7875 21.5934 40.7581C21.5589 40.6863 21.4363 40.358 21.6262 39.475C21.8562 38.4054 22.4689 36.9657 23.5038 35.2817C24.7575 33.2417 26.5497 30.9744 28.7621 28.762C30.9744 26.5497 33.2417 24.7574 35.2817 23.5037C36.9657 22.4689 38.4054 21.8562 39.475 21.6262ZM4.41189 29.2403L18.7597 43.5881C19.8813 44.7097 21.4027 44.9179 22.7217 44.7893C24.0585 44.659 25.5148 44.1631 26.9723 43.4579C29.9052 42.0387 33.2618 39.5667 36.4142 36.4142C39.5667 33.2618 42.0387 29.9052 43.4579 26.9723C44.1631 25.5148 44.659 24.0585 44.7893 22.7217C44.9179 21.4027 44.7097 19.8813 43.5881 18.7597L29.2403 4.41187C27.8527 3.02428 25.8765 3.02573 24.2861 3.36776C22.6081 3.72863 20.7334 4.58419 18.8396 5.74801C16.4978 7.18716 13.9881 9.18353 11.5858 11.5858C9.18354 13.988 7.18717 16.4978 5.74802 18.8396C4.58421 20.7334 3.72865 22.6081 3.36778 24.2861C3.02574 25.8765 3.02429 27.8527 4.41189 29.2403Z" fill="currentColor" fillRule="evenodd"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold tracking-tighter">SOLARIS</h2>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Mobilità elettrica premium in Sardegna. Forniamo i migliori veicoli elettrici per professionisti e privati che cercano efficienza e stile.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">Flotta</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link className="hover:text-primary transition-colors" to="/flotta">Golf Carts</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/flotta">Veicoli Utility</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/flotta">People Mover</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/flotta">Off-Road Elettrici</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">Azienda</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><Link className="hover:text-primary transition-colors" to="/chi-siamo">Chi Siamo</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/noleggio">Servizi</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/noleggio">Noleggio</Link></li>
                <li><Link className="hover:text-primary transition-colors" to="/contatti">Contatti</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-6 uppercase text-xs tracking-widest text-primary">Contatti</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  Olbia, Sardegna, Italia
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">mail</span>
                  info@solaris-electric.it
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">call</span>
                  +39 0789 123456
                </li>
              </ul>
              <div className="flex gap-4 mt-8">
                <a className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.599 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                </a>
                <a className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-primary/5 pt-10 flex flex-col md:flex-row justify-between text-xs text-slate-400">
            <p>© 2024 SOLARIS S.r.l. - Tutti i diritti riservati. P.IVA 0123456789</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a className="hover:underline" href="#">Privacy Policy</a>
              <a className="hover:underline" href="#">Cookie Policy</a>
              <a className="hover:underline" href="#">Termini e Condizioni</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
