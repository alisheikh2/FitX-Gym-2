import { createContext, useContext, useState, useCallback } from 'react';

/* ---------- Toasts ---------- */
const ToastCtx = createContext(null);
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, kind = 'ok') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, kind }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  }, []);
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div className="fixed bottom-4 right-4 z-[90] space-y-2 no-print" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`px-4 py-3 text-sm font-semibold shadow-lift border animate-fade-up ${t.kind === 'err' ? 'bg-red-950 border-red-700 text-red-200' : 'bg-graphite border-brand/50 text-paper'}`}>
            {t.msg}
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}
export const useToast = () => useContext(ToastCtx);

/* ---------- Modal ---------- */
export function Modal({ open, onClose, title, children, wide = false }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto p-4 sm:p-8 no-print" role="dialog" aria-modal="true" aria-label={title}>
      <div className="fixed inset-0 bg-obsidian/80" onClick={onClose} aria-hidden="true" />
      <div className={`relative card w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} p-6 sm:p-8 shadow-lift my-4`}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-lg text-paper">{title}</h2>
          <button onClick={onClose} aria-label="Close dialog" className="text-silver hover:text-brand text-2xl leading-none">×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function Confirm({ open, onClose, onYes, title, body }) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-silver leading-relaxed">{body}</p>
      <div className="mt-6 flex gap-3 justify-end">
        <button className="btn-dark btn-sm" onClick={onClose}>Cancel</button>
        <button className="btn-primary btn-sm" onClick={() => { onYes(); onClose(); }}>Confirm</button>
      </div>
    </Modal>
  );
}

/* ---------- Form bits ---------- */
export function Field({ label, error, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="field-label">{label}</span>
      {children}
      {error && <span className="text-xs text-red-400 mt-1 block">{error}</span>}
    </label>
  );
}

/* ---------- Data display ---------- */
export function StatCard({ label, value, sub, accent = false }) {
  return (
    <div className={`card p-5 ${accent ? 'border-brand/50' : ''}`}>
      <p className="text-[11px] uppercase tracking-wider text-muted font-semibold">{label}</p>
      <p className="font-display font-bold text-3xl mt-2 text-paper">{value}</p>
      {sub && <p className="text-xs text-muted mt-1">{sub}</p>}
    </div>
  );
}

export function EmptyState({ title, hint, action }) {
  return (
    <div className="card p-10 text-center">
      <p className="font-display font-bold text-paper">{title}</p>
      {hint && <p className="text-sm text-muted mt-2">{hint}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Badge({ tone = 'neutral', children }) {
  const tones = {
    ok: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    warn: 'bg-amber-950 text-amber-300 border-amber-700',
    err: 'bg-red-950 text-red-300 border-red-800',
    brand: 'bg-brand/10 text-brand border-brand/40',
    neutral: 'bg-charcoal text-silver border-steel'
  };
  return <span className={`inline-block px-2.5 py-1 text-[11px] font-semibold border ${tones[tone]}`}>{children}</span>;
}

export function statusTone(s) {
  if (/active|confirmed|completed|converted/i.test(s)) return 'ok';
  if (/expir|follow|scheduled|booked|contacted/i.test(s)) return 'warn';
  if (/cancel|lost|not interested|paused|no show/i.test(s)) return 'err';
  return 'neutral';
}

/* ---------- Tiny SVG bar chart ---------- */
export function BarChart({ data, label = '', format = (v) => v }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div>
      <div className="flex items-end gap-2 h-36">
        {data.map((d, i) => (
          <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1.5 group" title={`${d.label}: ${format(d.value)}`}>
            <div className="w-full bg-brand/80 group-hover:bg-brand transition-colors" style={{ height: `${Math.max((d.value / max) * 100, 2)}%` }} />
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        {data.map((d, i) => <p key={i} className="flex-1 text-center text-[10px] text-muted truncate">{d.label}</p>)}
      </div>
      {label && <p className="text-xs text-muted mt-2">{label}</p>}
    </div>
  );
}

export function Skeleton({ rows = 4 }) {
  return <div className="space-y-3">{Array.from({ length: rows }).map((_, i) => <div key={i} className="h-10 bg-charcoal animate-pulse" />)}</div>;
}
