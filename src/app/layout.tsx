import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';

export const metadata: Metadata = {
  title: 'SOLARIS | Veicoli Elettrici di Lusso',
  description: 'Veicoli di trasporto personale premium ispirati alla Costa Smeralda. Silenziosi, sostenibili e puramente lussuosi.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="light">
      <head>
        {/* Font richiesti dal design del cliente */}
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Lato:wght@300;400;700&family=Plus+Jakarta+Sans:wght@400;700&family=Inter:wght@400;500;600&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-surface text-on-surface font-body selection:bg-secondary-container selection:text-on-secondary-container">
        <Navbar />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
