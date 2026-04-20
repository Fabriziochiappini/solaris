import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Assistenza e Noleggio Golf Car Sardegna | Club Car',
  description: 'Scopri i nostri servizi: noleggio golf car a lungo termine e breve termine in Sardegna. Offriamo assistenza autorizzata Club Car a Olbia e in Costa Smeralda.',
  keywords: ['assistenza golf car sardegna', 'noleggio golf car lungo termine', 'noleggio golf car breve termine', 'assistenza club car', 'riparazione golf car', 'manutenzione golf car', 'veicoli elettrici sardegna'],
  alternates: {
    canonical: 'https://sardinyagolfcar.com/servizi',
  }
};

export default function ServiziLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
