import { useState } from 'react';
import { Eye, EyeOff, Cake, Lock } from 'lucide-react';

interface AdminLoginProps {
  onLogin: (email: string, password: string) => Promise<void>;
  onClose: () => void;
}

export default function AdminLogin({ onLogin, onClose }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onLogin(email, password);
    } catch {
      setError('Credenciales incorrectas. Verificá tu email y contraseña.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center modal-backdrop bg-navy-900/70"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm mx-4 overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="bg-navy-gradient px-8 py-8 text-center">
          <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Cake className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-white">Administración</h2>
          <p className="text-silver-300 text-sm font-body mt-1">Blue Velvet Pastry House</p>
        </div>

        {/* Form */}
        <div className="px-8 py-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-body font-medium text-navy-700 mb-1.5 tracking-wide">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoFocus
                placeholder="admin@bluevelvet.com"
                className="w-full px-4 py-3 rounded-xl border border-silver-200 text-navy-800 font-body text-sm focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100 transition-all placeholder-silver-300"
              />
            </div>
            <div>
              <label className="block text-xs font-body font-medium text-navy-700 mb-1.5 tracking-wide">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-silver-200 text-navy-800 font-body text-sm focus:outline-none focus:border-navy-600 focus:ring-2 focus:ring-navy-100 transition-all placeholder-silver-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-silver-400 hover:text-navy-600 transition-colors"
                >
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                <Lock className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <p className="text-red-600 text-xs font-body">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-navy-800 hover:bg-navy-700 disabled:opacity-60 text-white py-3 rounded-xl font-body font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg mt-2"
            >
              {loading ? 'Ingresando...' : 'Ingresar'}
            </button>
          </form>

          <button
            onClick={onClose}
            className="w-full text-center text-silver-400 hover:text-silver-600 text-xs font-body mt-4 transition-colors"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    </div>
  );
}
