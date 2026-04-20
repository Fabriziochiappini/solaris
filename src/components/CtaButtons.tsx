'use client';

import { trackPreventivoClick, trackWhatsAppClick } from '@/lib/gtag';

interface Props {
  whatsAppLink?: string;
  location?: string;
  preventivoText?: string;
  whatsAppText?: string;
}

export default function CtaButtons({ 
  whatsAppLink = 'https://wa.me/393421073857', 
  location = 'generico',
  preventivoText = 'Richiedi Preventivo',
  whatsAppText = 'WhatsApp'
}: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <a
        href="/contatti"
        onClick={() => trackPreventivoClick(location)}
        className="inline-flex items-center justify-center gap-2 bg-secondary text-primary font-montserrat font-bold text-sm uppercase tracking-widest px-10 py-5 hover:bg-secondary/90 transition-all shadow-xl hover:-translate-y-1"
      >
        <span className="material-symbols-outlined text-base">chat</span>
        {preventivoText}
      </a>
      <a
        href={whatsAppLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick(location)}
        className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-montserrat font-bold text-sm uppercase tracking-widest px-10 py-5 hover:bg-white/10 transition-all"
      >
        {whatsAppText}
      </a>
    </div>
  );
}
