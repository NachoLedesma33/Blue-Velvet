import { useState, useEffect } from 'react';
import type { Profile } from '@/types';
import { ADMIN_CREDENTIALS, ADMIN_PROFILE } from '@/data/auth';

const AUTH_KEY = 'bluevelvet_auth';

interface AuthState {
  user: { email: string } | null;
  profile: Profile | null;
}

function loadAuth(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { user: null, profile: null };
}

export function useAuth() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = loadAuth();
    setUser(saved.user);
    setProfile(saved.profile);
    setLoading(false);
  }, []);

  async function signIn(email: string, password: string) {
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const auth: AuthState = { user: { email }, profile: ADMIN_PROFILE };
      localStorage.setItem(AUTH_KEY, JSON.stringify(auth));
      setUser(auth.user);
      setProfile(auth.profile);
    } else {
      throw new Error('Credenciales incorrectas');
    }
  }

  async function signOut() {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
    setProfile(null);
  }

  const isAdmin = profile?.role === 'admin' || profile?.role === 'super_admin';
  const isSuperAdmin = profile?.role === 'super_admin';

  return { user, profile, loading, isAdmin, isSuperAdmin, signIn, signOut };
}
