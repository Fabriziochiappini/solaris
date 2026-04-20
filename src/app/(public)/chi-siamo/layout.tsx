import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chi Siamo | Sardinya Golf Car by Solaris',
  description: 'Scopri chi siamo. Sardinya Golf Car (Solaris) offre eccellenza, passione e competenza nel noleggio, vendita e assistenza di veicoli elettrici premium in Sardegna.',
  keywords: ['chi siamo golf car', 'solaris golf car', 'sardinya golf car', 'concessionario club car sardegna', 'noleggio golf car lusso', 'veicoli elettrici sardegna'],
  alternates: {
    canonical: 'https://sardinyagolfcar.com/chi-siamo',
  }
};

export default function ChiSiamoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
