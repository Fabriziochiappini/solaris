'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { AuthProvider, useAuth } from '@/lib/auth-context';

function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, pathname, router]);

  // Sulla pagina di login mostra solo i children
  if (pathname === '/admin/login') return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    await logout();
    // Rimuovi il cookie di sessione
    document.cookie = '__session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-primary text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-white/10">
          <div className="text-xl font-montserrat font-bold tracking-tighter uppercase">SOLARIS</div>
          <div className="text-xs text-white/50 mt-1 font-lato uppercase tracking-widest">Pannello Admin</div>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-montserrat font-semibold uppercase tracking-wider transition-colors ${
              pathname.startsWith('/admin/dashboard') || pathname.startsWith('/admin/veicoli')
                ? 'bg-white/20 text-white'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <span className="material-symbols-outlined text-lg">directions_car</span>
            Veicoli
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-montserrat font-semibold uppercase tracking-wider text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">open_in_new</span>
            Vedi Sito
          </Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="text-xs font-lato text-white/40 mb-2 px-4 truncate">{user.email}</div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-montserrat font-semibold uppercase tracking-wider text-white/70 hover:bg-red-500/20 hover:text-red-300 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
            Esci
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}
