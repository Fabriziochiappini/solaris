'use client';

import SiteAnalytics, { trackClick } from './SiteAnalytics';

export default function Footer() {
  return (
    <footer className="w-full mt-20 pt-16 pb-8 bg-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto px-8">
        <div className="space-y-6">
          <div className="text-xl font-bold text-sky-900 uppercase">Sardinya Golf Car</div>
          <p className="font-lato text-sm tracking-normal text-slate-600 max-w-xs">
            by Solaris • Assistenza ufficiale Club Car<br />
            Vendita, Noleggio, Assistenza<br />
            Olbia - Aglientu, Sardegna
          </p>
          <div className="space-y-2">
            <a
              href="tel:+393421073857"
              onClick={() => trackClick('clickTelefono')}
              className="flex items-center gap-2 text-sm font-bold text-sky-900 hover:text-sky-600 transition-colors"
            >
              <span className="material-symbols-outlined text-base">phone</span>
              +39 342 107 3857
            </a>
            <a
              href="https://wa.me/393421073857"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackClick('clickWhatsApp')}
              className="flex items-center gap-2 text-sm font-bold text-[#25D366] hover:opacity-80 transition-opacity"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.855L.057 23.57a.5.5 0 00.614.614l5.823-1.516A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.812 9.812 0 01-5.026-1.383l-.36-.214-3.733.972.999-3.647-.234-.374A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <nav aria-label="Navigazione Principale">
            <h4 className="font-montserrat text-xs font-bold uppercase tracking-widest text-sky-900 mb-6">Esplora Sardinya Golf Car</h4>
            <ul className="space-y-4 font-lato text-sm">
              <li><a title="Scopri la nostra flotta di golf car in vendita e noleggio in Sardegna" className="text-slate-600 hover:text-sky-600 transition-colors" href="/veicoli">Veicoli e Flotta</a></li>
              <li><a title="Servizi di noleggio e assistenza Club Car" className="text-slate-600 hover:text-sky-600 transition-colors" href="/servizi">Noleggio e Assistenza</a></li>
              <li><a title="Scopri chi siamo, il rivenditore ufficiale Club Car" className="text-slate-600 hover:text-sky-600 transition-colors" href="/chi-siamo">L&apos;Azienda</a></li>
              <li><a title="Contattaci per preventivi e assistenza golf car" className="text-slate-600 hover:text-sky-600 transition-colors" href="/contatti">Contatti</a></li>
            </ul>
          </nav>
          <nav aria-label="Link Legali">
            <h4 className="font-montserrat text-xs font-bold uppercase tracking-widest text-sky-900 mb-6">Info Legali</h4>
            <ul className="space-y-4 font-lato text-sm">
              <li><a title="Leggi la Privacy Policy per la gestione dei dati" className="text-slate-600 hover:text-sky-600 transition-colors" href="/privacy-policy">Privacy Policy</a></li>
              <li><a title="Consulta i Condizioni d'uso e Termini di servizio" className="text-slate-600 hover:text-sky-600 transition-colors" href="/termini">Termini di Servizio</a></li>
              <li><a className="text-slate-600 hover:text-sky-600 transition-colors italic" href="/admin" rel="nofollow">Area Riservata</a></li>
              <li className="text-slate-500 mt-2">P.IVA: 02659430900<br/>REA: SS 193996</li>
            </ul>
          </nav>
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

      {/* ── Barra Inferiore con Copyright + Analytics ── */}
      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-lato text-sm tracking-normal text-slate-600">© {new Date().getFullYear()} Sardinya Golf Car by Solaris. Noleggio e Vendita in Sardegna. Tutti i diritti riservati.</p>
          <nav aria-label="Navigazione Footer Estesa" className="flex gap-4 md:gap-8 flex-wrap justify-center">
            <a title="Home Sardinya Golf Car" className="font-lato text-sm text-slate-600 hover:text-sky-600 transition-colors" href="/">Home</a>
            <a title="Flotta golf car e veicoli utility" className="font-lato text-sm text-slate-600 hover:text-sky-600 transition-colors" href="/veicoli">Veicoli</a>
            <a title="Soluzioni di assistenza e noleggio a lungo/breve termine" className="font-lato text-sm text-slate-600 hover:text-sky-600 transition-colors" href="/servizi">Servizi</a>
            <a title="Mettiti in contatto con noi a Olbia" className="font-lato text-sm text-slate-600 hover:text-sky-600 transition-colors" href="/contatti">Contatti</a>
          </nav>
        </div>

        {/* ── Contatore Visite & Click ── */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 flex justify-center">
          <SiteAnalytics />
        </div>
      </div>
    </footer>
  );
}
