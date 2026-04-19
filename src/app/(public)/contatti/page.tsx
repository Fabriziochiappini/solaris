'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

// ── Componente form ───────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({
    nome: '', cognome: '', citta: '', email: '', tel: '', messaggio: '',
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    // Simulazione invio (da collegare al proprio backend/email)
    await new Promise(r => setTimeout(r, 1400));
    setSending(false);
    setSent(true);
  };

  const inputCls =
    'w-full bg-white border border-outline-variant/30 px-4 py-3.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all';

  if (sent) {
    return (
      <div className="bg-surface-container-low p-10 shadow-xl text-center space-y-4">
        <span className="material-symbols-outlined text-5xl text-secondary">check_circle</span>
        <p className="font-montserrat font-bold text-xl text-primary">Messaggio inviato!</p>
        <p className="text-on-surface-variant text-sm">Ti risponderemo al più presto. Grazie per averci contattato.</p>
        <button onClick={() => { setSent(false); setForm({ nome:'', cognome:'', citta:'', email:'', tel:'', messaggio:'' }); }}
          className="mt-4 text-xs font-bold uppercase tracking-widest text-secondary underline">
          Invia un altro messaggio
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-surface-container-low p-8 md:p-10 shadow-xl space-y-5">
      {/* Header form */}
      <div className="mb-2">
        <h3 className="font-montserrat font-extrabold text-primary uppercase tracking-widest text-sm">
          Inviaci un Messaggio
        </h3>
        <div className="h-0.5 w-10 bg-secondary mt-2" />
      </div>

      {/* Nome + Cognome */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">Nome *</label>
          <input
            type="text" required value={form.nome} onChange={set('nome')}
            placeholder="es. Marco"
            className={inputCls}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">Cognome *</label>
          <input
            type="text" required value={form.cognome} onChange={set('cognome')}
            placeholder="es. Rossi"
            className={inputCls}
          />
        </div>
      </div>

      {/* Città */}
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">Città</label>
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-[18px]">location_on</span>
          <input
            type="text" value={form.citta} onChange={set('citta')}
            placeholder="es. Olbia"
            className={`${inputCls} pl-10`}
          />
        </div>
      </div>

      {/* Email + Telefono */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">Email *</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-[18px]">mail</span>
            <input
              type="email" required value={form.email} onChange={set('email')}
              placeholder="mario@email.it"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">Telefono</label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-[18px]">phone</span>
            <input
              type="tel" value={form.tel} onChange={set('tel')}
              placeholder="+39 333 000 0000"
              className={`${inputCls} pl-10`}
            />
          </div>
        </div>
      </div>

      {/* Messaggio */}
      <div className="space-y-1.5">
        <label className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">Messaggio *</label>
        <textarea
          required rows={5} value={form.messaggio} onChange={set('messaggio')}
          placeholder="Descrivi la tua richiesta o il veicolo che ti interessa..."
          className={`${inputCls} resize-none`}
        />
      </div>

      {/* Privacy */}
      <p className="text-[10px] text-on-surface-variant/50 leading-relaxed">
        Inviando questo modulo accetti il trattamento dei tuoi dati personali in conformità alla nostra Privacy Policy.
      </p>

      {/* Submit */}
      <button
        type="submit"
        disabled={sending}
        className="w-full bg-primary text-white py-5 text-xs font-montserrat font-bold uppercase tracking-[0.2em] hover:bg-primary/90 transition-all active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {sending ? (
          <>
            <span className="material-symbols-outlined text-base animate-spin">progress_activity</span>
            Invio in corso...
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-base">send</span>
            Invia Richiesta
          </>
        )}
      </button>
    </form>
  );
}

// ── Pagina ────────────────────────────────────────────────────────────────────
export default function ContattiPage() {
  const contactInfo = [
    { icon: 'location_on',    label: 'Sede Principale', value: 'Olbia / Aglientu, Sardegna', link: 'https://maps.google.com' },
    { icon: 'phone',          label: 'Telefono',        value: '+39 333 123 4567',           link: 'tel:+393331234567' },
    { icon: 'mail',           label: 'Email',           value: 'info@solarisgolfcar.it',     link: 'mailto:info@solarisgolfcar.it' },
    { icon: 'schedule',       label: 'Orari',           value: 'Lun - Sab: 09:00 - 19:00',  link: null },
    { icon: 'business_center',label: 'Dati Aziendali',  value: 'Sardinya Golf Car By Solaris • P.IVA 02659430900 • REA SS 193996', link: null },
  ];

  return (
    <main className="min-h-screen pt-32 pb-24 bg-surface-container-lowest overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
          <p className="text-secondary font-bold text-xs uppercase tracking-[0.35em] mb-3">Siamo qui per te</p>
          <h1 className="font-montserrat font-extrabold text-5xl text-primary tracking-tight uppercase mb-4">
            Contatti
          </h1>
          <div className="h-1.5 w-32 bg-secondary" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-20">

          {/* Colonna Sinistra: Info + Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-12">
            {/* Info rapide */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {contactInfo.map((info) => (
                <div key={info.label} className="group">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-secondary text-xl group-hover:scale-110 transition-transform">{info.icon}</span>
                    <span className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/60">{info.label}</span>
                  </div>
                  {info.link ? (
                    <a href={info.link} className="font-montserrat font-bold text-primary hover:text-secondary transition-colors underline decoration-outline-variant decoration-1 underline-offset-4 text-sm">
                      {info.value}
                    </a>
                  ) : (
                    <span className="font-montserrat font-bold text-primary text-sm">{info.value}</span>
                  )}
                </div>
              ))}
            </div>

            {/* Form */}
            <ContactForm />
          </motion.div>

          {/* Colonna Destra: Mappa */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="relative h-[600px] lg:h-auto bg-surface-container-low shadow-2xl overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193309.52467575454!2d9.359265146747976!3d40.92055620956488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12d94b05a6396865%3A0xd62f1c84cb1f41e0!2sOlbia%20SS!5e0!3m2!1sit!2sit!4v1711465200000!5m2!1sit!2sit"
              width="100%" height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 z-0"
              title="Mappa Sardinya Golf Car Olbia"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent pointer-events-none z-10" />
            <div className="absolute bottom-8 left-8 z-20 pointer-events-none">
              <p className="text-white font-montserrat font-bold text-2xl mb-1 shadow-sm">Sardinya Golf Car</p>
              <p className="text-white/80 text-xs uppercase tracking-widest font-bold">by Solaris • Vendita, Noleggio, Assistenza</p>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  );
}
