export default function Footer() {
  return (
    <footer className="w-full mt-20 pt-16 pb-8 bg-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-8">
        <div className="space-y-6">
          <div className="text-xl font-bold text-sky-900 uppercase">SOLARIS</div>
          <p className="font-lato text-sm tracking-normal text-slate-600 max-w-xs">
            Creiamo soluzioni di trasporto elettrico premium ispirate alla bellezza senza tempo della costa sarda.
          </p>
          <div className="flex gap-4">
            <a className="text-sky-900 hover:opacity-100 opacity-80 duration-200" href="#"><span className="material-symbols-outlined">public</span></a>
            <a className="text-sky-900 hover:opacity-100 opacity-80 duration-200" href="#"><span className="material-symbols-outlined">share</span></a>
            <a className="text-sky-900 hover:opacity-100 opacity-80 duration-200" href="#"><span className="material-symbols-outlined">alternate_email</span></a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h4 className="font-montserrat text-xs font-bold uppercase tracking-widest text-sky-900 mb-6">Esplora</h4>
            <ul className="space-y-4 font-lato text-sm">
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="/flotta">Flotta</a></li>
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="#">Sostenibilità</a></li>
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="#">Tecnologia</a></li>
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="#">Heritage Sarda</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-montserrat text-xs font-bold uppercase tracking-widest text-sky-900 mb-6">Legale</h4>
            <ul className="space-y-4 font-lato text-sm">
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="#">Privacy Policy</a></li>
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="#">Termini di Servizio</a></li>
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors" href="#">Conformità</a></li>
            </ul>
          </div>
        </div>
        <div>
          <h4 className="font-montserrat text-xs font-bold uppercase tracking-widest text-sky-900 mb-6">La Newsletter della Costa</h4>
          <p className="font-lato text-xs text-slate-600 mb-4">Iscriviti per ricevere aggiornamenti sulle nuove edizioni della flotta e notizie dal mondo del lusso costiero.</p>
          <div className="flex">
            <input className="bg-white border-none text-xs w-full focus:ring-1 focus:ring-sky-900 py-3 px-4" placeholder="Il tuo indirizzo email" type="email" />
            <button className="bg-sky-900 text-white px-4 py-3"><span className="material-symbols-outlined text-sm">mail</span></button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-lato text-sm tracking-normal text-slate-600">© 2024 SOLARIS Premium PTV. Ispirato dalla Costa Sarda.</p>
        <div className="flex gap-8">
          <a className="font-lato text-sm text-slate-600 hover:text-sky-600 transition-colors" href="/flotta">Flotta</a>
          <a className="font-lato text-sm text-slate-600 hover:text-sky-600 transition-colors" href="#">Sostenibilità</a>
          <a className="font-lato text-sm text-slate-600 hover:text-sky-600 transition-colors" href="/contatti">Contatti</a>
        </div>
      </div>
    </footer>
  );
}
