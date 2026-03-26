import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Solaris | Noleggio Golf Car Esclusivo',
  description: 'Scopri la flotta di golf car per il tuo evento, resort o spostamento privato. Comfort, eleganza e sostenibilità in un solo veicolo.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} antialiased font-sans flex flex-col min-h-screen bg-white text-slate-900`}>
        {/* Navbar */}
        <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              <div className="flex-shrink-0 flex items-center space-x-2">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center font-outfit font-black text-white text-xl shadow-lg">
                  S
                </div>
                <span className="font-outfit font-bold text-2xl tracking-tight text-slate-900">SOLARIS</span>
              </div>
              <nav className="hidden md:flex space-x-8">
               <a href="#" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</a>
               <a href="#flotta" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">La Flotta</a>
               <a href="#servizi" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">Servizi</a>
               <a href="#contatti" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">Contatti</a>
              </nav>
              <div className="hidden md:flex">
                <a href="/admin/login" className="inline-flex items-center px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 hover:text-blue-600 transition-all shadow-sm">
                  Area Admin
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-grow pt-20">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-950 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="font-outfit font-bold text-2xl tracking-tight">SOLARIS</span>
              <p className="mt-4 text-slate-400 max-w-xs">Noleggio e vendita di golf car premium per resort, eventi e privati. Muoviti con stile.</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Link Utili</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="#flotta" className="hover:text-blue-400 transition-colors">I nostri veicoli</a></li>
                <li><a href="#servizi" className="hover:text-blue-400 transition-colors">Noleggio lungo termine</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-4">Contatti</h4>
              <ul className="space-y-2 text-slate-400">
                <li>info@solarisgolfcar.it</li>
                <li>+39 012 345 6789</li>
                <li>Via Roma 1, Milano (MI)</li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} Solaris Golf Car. Tutti i diritti riservati.
          </div>
        </footer>
      </body>
    </html>
  );
}
