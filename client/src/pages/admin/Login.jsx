import { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../lib/AuthContext.jsx';
import { LogoMark } from '../../components/site/Logo.jsx';
import { ApiError } from '../../lib/api.js';

export default function Login() {
  const { user, login, loading } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  if (!loading && user) return <Navigate to="/admin" replace />;

  async function submit(e) {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      await login(email, password);
      nav('/admin');
    } catch (error) {
      setErr(error instanceof ApiError ? error.message : 'Sign-in failed');
    } finally { setBusy(false); }
  }

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center p-6">
      <form onSubmit={submit} className="card p-9 max-w-md w-full">
        <div className="flex items-center gap-3">
          <LogoMark size={44} />
          <div>
            <h1 className="font-display font-bold text-xl text-paper leading-none">FIT<span className="text-brand">X</span> Admin</h1>
            <p className="text-xs text-muted mt-1">Gym management & POS</p>
          </div>
        </div>
        <label className="field-label mt-7" htmlFor="email">Email</label>
        <input id="email" className="input" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" required />
        <label className="field-label mt-4" htmlFor="password">Password</label>
        <input id="password" type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        {err && <p className="text-sm text-red-400 mt-3" role="alert">{err}</p>}
        <button disabled={busy} className="btn-primary w-full mt-6 disabled:opacity-60">{busy ? 'Signing in…' : 'Sign In'}</button>
        <p className="text-xs text-muted mt-4 text-center">Demo accounts: admin@fitx.pk / Admin@123 · staff@fitx.pk / Staff@123</p>
        <Link to="/" className="block text-center text-xs text-muted mt-3 hover:text-silver">← Back to website</Link>
      </form>
    </div>
  );
}
