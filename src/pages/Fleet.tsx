import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Fleet() {
  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 antialiased font-display">
      {/* Header */}
      <Navbar />

      <main className="pt-20">
        {/* Hero */}
        <section className="bg-background-light dark:bg-background-dark py-16 px-6 border-b border-primary/5">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tight">La Flotta d'Élite Solaris</h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Esplora la nostra selezione esclusiva di veicoli elettrici. Progettati per prestazioni superiori, massimo comfort e totale sostenibilità.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky top-20 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-primary/5 py-4 px-6">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-4">
            <button className="px-6 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-lg shadow-primary/20">Tutti i Modelli</button>
            <button className="px-6 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700 transition-all">Golf Carts</button>
            <button className="px-6 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700 transition-all">Veicoli Utility</button>
            <button className="px-6 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700 transition-all">Trasporto Ospiti</button>
            <button className="px-6 py-2 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-full text-sm font-medium border border-slate-200 dark:border-slate-700 transition-all">Off-Road</button>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Item 1 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/images/golf_luxury.png" alt="Model S1" />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Premium
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Solaris Elite S1</h3>
                    <p className="text-sm text-slate-500 italic">Lusso a 2 Posti</p>
                  </div>
                  <span className="text-primary font-bold">€45<span className="text-xs text-slate-400 font-normal">/giorno</span></span>
                </div>
                <div className="flex gap-4 mb-6 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">battery_charging_full</span> Autonomia 80km</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">speed</span> 25km/h</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">airline_seat_recline_normal</span> 2 Sedili</span>
                </div>
                <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity">Prenota Ora</button>
              </div>
            </div>

            {/* Item 2 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/images/golf_4_seater.png" alt="Model S2" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Solaris Grand S4</h3>
                    <p className="text-sm text-slate-500 italic">4 Posti, Comfort Familiare</p>
                  </div>
                  <span className="text-primary font-bold">€65<span className="text-xs text-slate-400 font-normal">/giorno</span></span>
                </div>
                <div className="flex gap-4 mb-6 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">battery_charging_full</span> Autonomia 70km</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">speed</span> 25km/h</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">airline_seat_recline_normal</span> 4 Sedili</span>
                </div>
                <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity">Prenota Ora</button>
              </div>
            </div>

            {/* Item 3 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/images/utility.png" alt="Utility Pro" />
                <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Work
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Utility Pro XL</h3>
                    <p className="text-sm text-slate-500 italic">Cargo, Uso Intensivo</p>
                  </div>
                  <span className="text-primary font-bold">€80<span className="text-xs text-slate-400 font-normal">/giorno</span></span>
                </div>
                <div className="flex gap-4 mb-6 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">battery_charging_full</span> Autonomia 60km</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">weight</span> Portata 500kg</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">airline_seat_recline_normal</span> 2 Sedili</span>
                </div>
                <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity">Prenota Ora</button>
              </div>
            </div>

            {/* Item 4 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/images/people_mover.png" alt="Shuttle" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Resort Shuttle 6</h3>
                    <p className="text-sm text-slate-500 italic">6 Posti, Massimo Comfort</p>
                  </div>
                  <span className="text-primary font-bold">€90<span className="text-xs text-slate-400 font-normal">/giorno</span></span>
                </div>
                <div className="flex gap-4 mb-6 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">battery_charging_full</span> Autonomia 60km</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">speed</span> 20km/h</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">airline_seat_recline_normal</span> 6 Sedili</span>
                </div>
                <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity">Prenota Ora</button>
              </div>
            </div>

            {/* Item 5 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/images/offroad.png" alt="Offroad" />
                <div className="absolute top-4 right-4 bg-slate-900 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Adventure
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Terra Cross X</h3>
                    <p className="text-sm text-slate-500 italic">Capacità Off-Road</p>
                  </div>
                  <span className="text-primary font-bold">€75<span className="text-xs text-slate-400 font-normal">/giorno</span></span>
                </div>
                <div className="flex gap-4 mb-6 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">battery_charging_full</span> Autonomia 50km</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">terrain</span> Trazione 4x4</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">airline_seat_recline_normal</span> 2 Sedili</span>
                </div>
                <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity">Prenota Ora</button>
              </div>
            </div>

            {/* Item 6 */}
            <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 dark:border-slate-700">
              <div className="relative h-64 overflow-hidden bg-slate-100">
                <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" src="/images/hero.png" alt="Model S2" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">Solaris Golf S2+</h3>
                    <p className="text-sm text-slate-500 italic">Autonomia Estesa</p>
                  </div>
                  <span className="text-primary font-bold">€55<span className="text-xs text-slate-400 font-normal">/giorno</span></span>
                </div>
                <div className="flex gap-4 mb-6 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">battery_charging_full</span> Autonomia 100km</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">speed</span> 25km/h</span>
                  <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">airline_seat_recline_normal</span> 2 Sedili</span>
                </div>
                <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity">Prenota Ora</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
