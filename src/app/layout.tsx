import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth-context';
import GoogleAnalytics from '@/components/GoogleAnalytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://sardinyagolfcar.com'),
  title: {
    default: 'Sardinya Golf Car | Vendita e Noleggio Golf Car in Sardegna',
    template: '%s | Sardinya Golf Car'
  },
  description: 'Concessionario ufficiale e assistenza Club Car in Sardegna. Offriamo vendita, noleggio a lungo e breve termine, e assistenza specializzata per golf car a Olbia e in Costa Smeralda.',
  keywords: ['vendita golf car', 'noleggio golf car sardegna', 'golf car sardegna', 'club car sardegna', 'assistenza golf car sardegna', 'noleggio golf car lungo termine', 'noleggio golf car breve termine', 'olbia', 'costa smeralda', 'veicoli elettrici'],
  authors: [{ name: 'Solaris' }],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://sardinyagolfcar.com',
    siteName: 'Sardinya Golf Car',
    title: 'Sardinya Golf Car | Vendita, Noleggio e Assistenza in Sardegna',
    description: 'Scopri i nostri veicoli premium. Concessionario ufficiale Club Car: vendita, noleggio a lungo/breve termine e assistenza tecnica in tutta la Sardegna.',
    images: [
      {
        url: '/hero-bg.webp',
        width: 1200,
        height: 630,
        alt: 'Sardinya Golf Car - Veicoli Premium',
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sardinya Golf Car | Vendita e Noleggio Golf Car Sardegna',
    description: 'Concessionario ufficiale Club Car: vendita, noleggio a lungo/breve termine e assistenza tecnica in tutta la Sardegna.',
    images: ['/hero-bg.webp'],
  },
  alternates: {
    canonical: 'https://sardinyagolfcar.com',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Lato:wght@300;400;700&family=Plus+Jakarta+Sans:wght@400;700&family=Inter:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
        <GoogleAnalytics />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
