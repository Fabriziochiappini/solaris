import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md shadow-[0px_20px_40px_rgba(21,28,38,0.06)]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-8 py-4">
        <div className="text-2xl font-bold tracking-tighter text-sky-900">SOLARIS</div>
        <div className="hidden md:flex items-center space-x-10">
          <Link className="font-montserrat tracking-tight leading-tight text-sm uppercase font-semibold text-sky-900 border-b-2 border-sky-900 pb-1" href="/">Home</Link>
          <Link className="font-montserrat tracking-tight leading-tight text-sm uppercase font-semibold text-slate-500 hover:text-sky-800 transition-colors" href="/flotta">Fleet</Link>
          <Link className="font-montserrat tracking-tight leading-tight text-sm uppercase font-semibold text-slate-500 hover:text-sky-800 transition-colors" href="/noleggio">Rent</Link>
          <Link className="font-montserrat tracking-tight leading-tight text-sm uppercase font-semibold text-slate-500 hover:text-sky-800 transition-colors" href="/chi-siamo">About</Link>
          <Link className="font-montserrat tracking-tight leading-tight text-sm uppercase font-semibold text-slate-500 hover:text-sky-800 transition-colors" href="/contatti">Contact</Link>
        </div>
        <button className="bg-primary text-on-primary px-6 py-2 text-xs font-montserrat font-bold uppercase tracking-widest hover:bg-primary-container transition-all active:scale-95 duration-150">
          Request Quote
        </button>
      </div>
    </nav>
  );
}
