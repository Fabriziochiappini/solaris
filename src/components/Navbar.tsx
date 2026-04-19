'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/veicoli', label: 'Veicoli' },
    { href: '/servizi', label: 'Servizi' },
    { href: '/chi-siamo', label: 'Chi Siamo' },
    { href: '/contatti', label: 'Contatti' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-[0px_20px_40px_rgba(21,28,38,0.06)]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
        <Link href="/" className="flex flex-col leading-tight group">
          <span className="font-montserrat font-extrabold text-xl tracking-tight text-primary uppercase group-hover:text-primary/80 transition-colors">
            Sardinya Golf Car
          </span>
          <span className="font-serif italic text-[11px] text-secondary tracking-wide">
            by Solaris
          </span>
        </Link>
        <div className="hidden md:flex items-center space-x-10">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href}
                className={`font-montserrat tracking-tight leading-tight text-sm uppercase font-semibold transition-colors ${
                  isActive 
                    ? 'text-primary border-b-2 border-primary pb-1' 
                    : 'text-on-surface-variant/70 hover:text-primary'
                }`} 
                href={link.href}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
        <Link href="/contatti" className="bg-primary text-on-primary px-6 py-2 text-xs font-montserrat font-bold uppercase tracking-widest hover:bg-primary-container transition-all active:scale-95 duration-150 inline-block text-center">
          Richiedi Preventivo
        </Link>
      </div>
    </nav>
  );
}
