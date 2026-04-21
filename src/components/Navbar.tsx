'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Chiudi il menu quando cambia pagina
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  // Blocca lo scroll quando il menu è aperto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const links = [
    { href: '/',          label: 'Home' },
    { href: '/veicoli',   label: 'Veicoli' },
    { href: '/servizi',   label: 'Servizi' },
    { href: '/chi-siamo', label: 'Chi Siamo' },
    { href: '/contatti',  label: 'Contatti' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-[0px_20px_40px_rgba(21,28,38,0.06)]">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-6 md:px-8 py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dn96krsq7/image/upload/v1776759247/WhatsApp_Image_2026-04-21_at_10.13.27-removebg-preview_n3mjcf.png"
              alt="Sardinya Golf Car by Solaris"
              className="h-28 w-auto object-contain group-hover:opacity-80 transition-opacity"
            />
          </Link>

          {/* Link desktop */}
          <div className="hidden md:flex items-center space-x-10">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-montserrat tracking-tight text-sm uppercase font-semibold transition-colors ${
                    isActive
                      ? 'text-primary border-b-2 border-primary pb-1'
                      : 'text-on-surface-variant/70 hover:text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Destra: CTA desktop + hamburger mobile */}
          <div className="flex items-center gap-3">
            <Link
              href="/contatti"
              className="hidden md:inline-block bg-primary text-white px-6 py-2 text-xs font-montserrat font-bold uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-95 duration-150 text-center"
            >
              Richiedi Preventivo
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Apri menu"
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 focus:outline-none"
            >
              <span className={`block h-0.5 w-6 bg-primary transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-0.5 w-6 bg-primary transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
              <span className={`block h-0.5 w-6 bg-primary transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>

        </div>
      </nav>

      {/* ── MENU MOBILE OVERLAY ───────────────────────────── */}
      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/40 md:hidden transition-opacity duration-300 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Pannello — sfondo BIANCO solido, niente trasparenza */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-4/5 max-w-xs bg-white shadow-2xl md:hidden flex flex-col transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header pannello */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/15">
          <span className="font-montserrat font-extrabold text-base text-primary uppercase tracking-tight">Menu</span>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Chiudi menu"
            className="w-9 h-9 flex items-center justify-center text-primary hover:bg-surface-container rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 px-6 py-8 flex flex-col gap-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-montserrat font-bold text-sm uppercase tracking-widest px-4 py-4 border-b border-outline-variant/10 transition-colors ${
                  isActive
                    ? 'text-primary border-l-4 border-l-secondary pl-3'
                    : 'text-on-surface-variant hover:text-primary hover:bg-surface-container'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA in fondo */}
        <div className="px-6 py-6 border-t border-outline-variant/15">
          <Link
            href="/contatti"
            className="block w-full text-center bg-primary text-white font-montserrat font-bold text-xs uppercase tracking-widest px-6 py-4 hover:bg-primary/90 transition-all"
          >
            Richiedi Preventivo
          </Link>
        </div>
      </div>
    </>
  );
}
