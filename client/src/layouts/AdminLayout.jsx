import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext.jsx';
import { ToastProvider } from '../components/admin/ui.jsx';
import { LogoMark } from '../components/site/Logo.jsx';

const NAV = [
  ['/', 'Dashboard'],
  ['/admin/members', 'Members'],
  ['/admin/plans', 'Plans'],
  ['/admin/pos', 'POS / Payments'],
  ['/admin/attendance', 'Attendance'],
  ['/admin/appointments', 'Appointments'],
  ['/admin/leads', 'Leads / CRM'],
  ['/admin/trainers', 'Trainers'],
  ['/admin/content', 'Programs & FAQs'],
  ['/admin/blog', 'Blog'],
  ['/admin/settings', 'Settings']
];

export default function AdminLayout() {
  const { user, loading, logout } = useAuth();
  const nav = useNavigate();

  if (loading) return <div className="min-h-screen bg-obsidian" />;
  if (!user) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center p-6">
        <div className="card p-10 max-w-md w-full text-center">
          <LogoMark size={52} className="mx-auto" />
          <h1 className="font-display font-bold text-2xl text-paper mt-4">Staff area</h1>
          <p className="text-sm text-muted mt-2">Sign in to manage FITX operations.</p>
          <Link to="/admin/login" className="btn-primary w-full mt-6">Sign In</Link>
          <Link to="/" className="block text-xs text-muted mt-4 hover:text-silver">← Back to website</Link>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="min-h-screen bg-obsidian lg:grid lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:flex flex-col border-r border-steel/60 bg-deep min-h-screen sticky top-0 h-screen">
          <div className="h-16 flex items-center gap-2.5 px-5 border-b border-steel/60">
            <LogoMark size={30} />
            <span className="font-display font-bold text-paper">FIT<span className="text-brand">X</span> <span className="text-muted text-xs font-body">Admin</span></span>
          </div>
          <nav aria-label="Admin" className="flex-1 overflow-y-auto slim-scroll py-4 px-3 space-y-0.5">
            {NAV.map(([to, label]) => (
              <NavLink key={to} to={to === '/' ? '/admin' : to} end={to === '/'} className={({ isActive }) => `block px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-brand/10 text-brand border-l-2 border-brand' : 'text-silver hover:text-paper hover:bg-charcoal'}`}>
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="p-4 border-t border-steel/60 text-xs text-muted">
            <p className="text-silver font-semibold">{user.name}</p>
            <p className="capitalize">{user.role}</p>
          </div>
        </aside>

        <div className="flex flex-col min-h-screen">
          <header className="h-16 border-b border-steel/60 bg-deep flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
            <div className="lg:hidden flex items-center gap-2">
              <LogoMark size={26} />
              <span className="font-display font-bold text-paper">FIT<span className="text-brand">X</span></span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/" className="text-xs text-muted hover:text-silver hidden sm:block">View website ↗</Link>
              <select aria-label="Admin navigation" className="lg:hidden input !w-auto !py-1.5 text-xs" onChange={(e) => e.target.value && nav(e.target.value)} value="">
                <option value="">Menu…</option>
                {NAV.map(([to, label]) => <option key={to} value={to === '/' ? '/admin' : to}>{label}</option>)}
              </select>
              <button onClick={async () => { await logout(); nav('/admin/login'); }} className="btn-dark btn-sm">Sign out</button>
            </div>
          </header>
          <main className="flex-1 p-4 sm:p-8 max-w-[1200px] w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
