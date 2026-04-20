import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contatti | Vendita e Noleggio Golf Car Olbia Sardegna',
  description: 'Contatta Sardinya Golf Car per assistenza, preventivi di vendita o noleggio golf car. Siamo a Olbia e Aglientu, a tua disposizione per ogni necessità.',
  keywords: ['contatti golf car sardegna', 'preventivo golf car', 'noleggio golf car olbia', 'dove comprare golf car', 'assistenza club car sardegna', 'numero telefono golf car sardegna'],
  alternates: {
    canonical: 'https://sardinyagolfcar.com/contatti',
  }
};

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
