'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

function LoginForm() {
  const { login, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const redirect = searchParams.get('redirect') || '/admin/dashboard';
      router.push(redirect);
    }
  }, [user, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      document.cookie = `__session=1; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Strict`;
      const redirect = searchParams.get('redirect') || '/admin/dashboard';
      router.push(redirect);
    } catch {
      setError('Email o password non corretti. Riprova.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="text-3xl font-montserrat font-bold tracking-tighter text-primary uppercase mb-2">SOLARIS</div>
          <div className="text-xs font-lato uppercase tracking-[0.3em] text-on-surface-variant">Accesso Riservato</div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-[0px_20px_60px_rgba(21,28,38,0.08)] p-10 space-y-6">
          <div>
            <label className="block text-xs font-montserrat font-bold uppercase tracking-widest text-primary mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-outline-variant bg-surface text-on-surface px-4 py-3 text-sm font-lato focus:outline-none focus:ring-2 focus:ring-primary rounded-none"
              placeholder="admin@solaris.it"
            />
          </div>
          <div>
            <label className="block text-xs font-montserrat font-bold uppercase tracking-widest text-primary mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-outline-variant bg-surface text-on-surface px-4 py-3 text-sm font-lato focus:outline-none focus:ring-2 focus:ring-primary rounded-none"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 text-sm font-lato px-4 py-3 border border-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-4 font-montserrat font-bold uppercase tracking-widest text-sm hover:bg-primary-container transition-colors disabled:opacity-60 flex items-center justify-center gap-3"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="material-symbols-outlined text-sm">lock_open</span>
                Accedi
              </>
            )}
          </button>
        </form>

        <p className="text-center text-xs font-lato text-on-surface-variant mt-8 opacity-60">
          © 2024 SOLARIS Premium PTV
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
