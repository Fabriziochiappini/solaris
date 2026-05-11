import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ADMIN_EMAIL = 'info@sardinyagolfcar.com';
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || 'wpi@automailer.it';
const FROM_NAME = 'Sardinya Golf Car';

const escapeHtml = (str: string) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

type ContactPayload = {
  nome?: string;
  cognome?: string;
  citta?: string;
  email?: string;
  tel?: string;
  messaggio?: string;
};

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload non valido' }, { status: 400 });
  }

  const nome = (body.nome || '').trim();
  const cognome = (body.cognome || '').trim();
  const citta = (body.citta || '').trim();
  const email = (body.email || '').trim();
  const tel = (body.tel || '').trim();
  const messaggio = (body.messaggio || '').trim();

  if (!nome || !cognome || !email || !messaggio) {
    return NextResponse.json({ error: 'Campi obbligatori mancanti' }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Email non valida' }, { status: 400 });
  }
  if (messaggio.length > 5000) {
    return NextResponse.json({ error: 'Messaggio troppo lungo' }, { status: 400 });
  }

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error('SENDGRID_API_KEY missing');
    return NextResponse.json({ error: 'Configurazione server incompleta' }, { status: 500 });
  }
  sgMail.setApiKey(apiKey);

  const fullName = `${nome} ${cognome}`;
  const safe = {
    nome: escapeHtml(nome),
    cognome: escapeHtml(cognome),
    citta: escapeHtml(citta),
    email: escapeHtml(email),
    tel: escapeHtml(tel),
    messaggio: escapeHtml(messaggio).replace(/\n/g, '<br>'),
    fullName: escapeHtml(fullName),
  };

  const adminHtml = `<!DOCTYPE html><html><body style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f6;margin:0;padding:24px;color:#1a1a1a;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:6px;overflow:hidden;border:1px solid #e5e7eb;">
<div style="background:#0f172a;color:#fff;padding:24px;">
<h1 style="margin:0;font-size:18px;letter-spacing:0.1em;text-transform:uppercase;">Sardinya Golf Car</h1>
<p style="margin:6px 0 0;font-size:13px;color:#cbd5e1;">Nuova richiesta dal sito</p>
</div>
<div style="padding:24px;">
<p style="margin:0 0 16px;font-size:14px;">Hai ricevuto una nuova richiesta dal modulo di contatto:</p>
<table style="width:100%;border-collapse:collapse;font-size:14px;">
<tr><td style="padding:8px 0;color:#64748b;width:120px;">Nome</td><td style="padding:8px 0;font-weight:bold;">${safe.fullName}</td></tr>
<tr><td style="padding:8px 0;color:#64748b;">Email</td><td style="padding:8px 0;"><a href="mailto:${safe.email}" style="color:#0f172a;">${safe.email}</a></td></tr>
${tel ? `<tr><td style="padding:8px 0;color:#64748b;">Telefono</td><td style="padding:8px 0;"><a href="tel:${safe.tel}" style="color:#0f172a;">${safe.tel}</a></td></tr>` : ''}
${citta ? `<tr><td style="padding:8px 0;color:#64748b;">Città</td><td style="padding:8px 0;">${safe.citta}</td></tr>` : ''}
</table>
<div style="margin-top:20px;padding:16px;background:#f8fafc;border-left:3px solid #0f172a;">
<p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;font-weight:bold;">Messaggio</p>
<p style="margin:0;font-size:14px;line-height:1.6;">${safe.messaggio}</p>
</div>
<p style="margin:24px 0 0;font-size:12px;color:#64748b;">Rispondi direttamente a questa email per parlare con il cliente.</p>
</div>
</div>
</body></html>`;

  const clientHtml = `<!DOCTYPE html><html><body style="font-family:Arial,Helvetica,sans-serif;background:#f4f4f6;margin:0;padding:24px;color:#1a1a1a;">
<div style="max-width:600px;margin:0 auto;background:#fff;border-radius:6px;overflow:hidden;border:1px solid #e5e7eb;">
<div style="background:#0f172a;color:#fff;padding:32px 24px;text-align:center;">
<h1 style="margin:0;font-size:20px;letter-spacing:0.15em;text-transform:uppercase;">Sardinya Golf Car</h1>
<p style="margin:8px 0 0;font-size:12px;color:#cbd5e1;letter-spacing:0.2em;text-transform:uppercase;">Olbia / Aglientu • Sardegna</p>
</div>
<div style="padding:32px 24px;">
<p style="margin:0 0 16px;font-size:16px;">Ciao <strong>${safe.nome}</strong>,</p>
<p style="margin:0 0 16px;font-size:14px;line-height:1.6;">grazie per averci contattato. Abbiamo ricevuto correttamente la tua richiesta e ti risponderemo al più presto.</p>
<div style="margin:24px 0;padding:16px;background:#f8fafc;border-left:3px solid #0f172a;">
<p style="margin:0 0 8px;font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#64748b;font-weight:bold;">Il tuo messaggio</p>
<p style="margin:0;font-size:14px;line-height:1.6;">${safe.messaggio}</p>
</div>
<p style="margin:0 0 8px;font-size:14px;">Per urgenze puoi scriverci su WhatsApp al <a href="https://wa.me/393421073857" style="color:#0f172a;font-weight:bold;">+39 342 107 3857</a>.</p>
<p style="margin:24px 0 0;font-size:14px;">A presto,<br><strong>Il team di Sardinya Golf Car</strong></p>
</div>
<div style="background:#f8fafc;padding:16px 24px;text-align:center;font-size:11px;color:#64748b;border-top:1px solid #e5e7eb;">
Sardinya Golf Car by Solaris • P.IVA 02659430900<br>
Questa è una notifica automatica — non rispondere a questa email.
</div>
</div>
</body></html>`;

  try {
    await Promise.all([
      sgMail.send({
        to: ADMIN_EMAIL,
        from: { email: FROM_EMAIL, name: FROM_NAME },
        replyTo: { email, name: fullName },
        subject: `Nuova richiesta da ${fullName} — Sito Sardinya Golf Car`,
        html: adminHtml,
        text: `Nuova richiesta dal sito\n\nNome: ${fullName}\nEmail: ${email}\nTelefono: ${tel || '-'}\nCittà: ${citta || '-'}\n\nMessaggio:\n${messaggio}\n\nRispondi direttamente a questa email per parlare con il cliente.`,
      }),
      sgMail.send({
        to: email,
        from: { email: FROM_EMAIL, name: FROM_NAME },
        subject: 'Abbiamo ricevuto la tua richiesta — Sardinya Golf Car',
        html: clientHtml,
        text: `Ciao ${nome},\n\ngrazie per averci contattato. Abbiamo ricevuto correttamente la tua richiesta e ti risponderemo al più presto.\n\nIl tuo messaggio:\n"${messaggio}"\n\nPer urgenze puoi scriverci su WhatsApp al +39 342 107 3857.\n\nA presto,\nIl team di Sardinya Golf Car`,
      }),
    ]);
  } catch (err: unknown) {
    const e = err as { response?: { body?: unknown }; message?: string };
    console.error('SendGrid error:', e?.response?.body || e?.message || err);
    return NextResponse.json({ error: 'Errore invio email' }, { status: 502 });
  }

  try {
    await addDoc(collection(db, 'contact_submissions'), {
      nome, cognome, citta, email, tel, messaggio,
      createdAt: serverTimestamp(),
      source: 'contatti',
    });
  } catch (err) {
    console.error('Firestore save failed (email già inviate):', err);
  }

  return NextResponse.json({ ok: true });
}
