// ── Google Analytics / gtag.js helper ──────────────────────────────────────
// Vedi: https://developers.google.com/analytics/devguides/collection/gtagjs

export const GA_MEASUREMENT_ID = 'G-YV0VD4L7ZF';

// Dichiarazioni TypeScript per window.gtag
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

/** Traccia una pageview (usato dal router Next.js) */
export function pageview(url: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

/** Traccia un evento personalizzato */
export function gtagEvent(action: string, params?: Record<string, string | number | boolean>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', action, params);
}

// ── Eventi pre-configurati per le CTA del sito ──

/** Click su numero di telefono */
export function trackPhoneClick(location: string = 'footer') {
  gtagEvent('click_telefono', {
    event_category: 'contatto',
    event_label: location,
    value: 1,
  });
}

/** Click su WhatsApp */
export function trackWhatsAppClick(location: string = 'footer') {
  gtagEvent('click_whatsapp', {
    event_category: 'contatto',
    event_label: location,
    value: 1,
  });
}

/** Click su "Richiedi Preventivo" o CTA contatti */
export function trackPreventivoClick(location: string) {
  gtagEvent('click_preventivo', {
    event_category: 'conversione',
    event_label: location,
  });
}

/** Invio form contatti */
export function trackFormSubmit() {
  gtagEvent('form_submit', {
    event_category: 'conversione',
    event_label: 'form_contatti',
    value: 1,
  });
}

/** Visualizzazione dettaglio veicolo */
export function trackVehicleView(vehicleName: string) {
  gtagEvent('view_vehicle', {
    event_category: 'engagement',
    event_label: vehicleName,
  });
}

/** Click su email */
export function trackEmailClick(location: string = 'footer') {
  gtagEvent('click_email', {
    event_category: 'contatto',
    event_label: location,
  });
}
