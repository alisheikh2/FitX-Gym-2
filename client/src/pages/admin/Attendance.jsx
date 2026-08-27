import { useState } from 'react';
import { api } from '../../lib/api.js';
import { useFetch } from '../../lib/hooks.js';
import { Field, useToast, Skeleton, EmptyState } from '../../components/admin/ui.jsx';

export default function Attendance() {
  const { data: today, loading, reload } = useFetch('/attendance');
  const { data: members } = useFetch('/members');
  const toast = useToast();
  const [q, setQ] = useState('');
  const [history, setHistory] = useState(null);

  const matches = (members || []).filter((m) => m.status === 'active' && (m.name.toLowerCase().includes(q.toLowerCase()) || (m.phone || '').includes(q))).slice(0, 6);

  async function mark(memberId, name) {
    try {
      await api.post('/attendance', { member: memberId });
      toast(`Checked in: ${name}`);
      setQ('');
      reload();
    } catch (err) { toast(err.message, 'err'); }
  }

  async function showHistory(m) {
    const rows = await api.get(`/attendance/member/${m._id}`);
    setHistory({ member: m, rows });
  }

  return (
    <div className="space-y-6">
      <h1 className="h-display text-3xl text-paper">Attendance</h1>
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6 items-start">
        <div className="card p-6">
          <h2 className="font-display font-bold text-paper mb-4">Mark check-in</h2>
          <Field label="Search member">
            <input className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Name or phone…" />
          </Field>
          {q && (
            <ul className="mt-2 border border-steel max-h-56 overflow-y-auto">
              {matches.map((m) => (
                <li key={m._id} className="flex items-center justify-between px-4 py-2.5 text-sm text-silver hover:bg-charcoal">
                  <span>{m.name} <span className="text-muted">· {m.phone}</span></span>
                  <span className="flex gap-2">
                    <button className="text-xs text-brand" onClick={() => mark(m._id, m.name)}>Check in</button>
                    <button className="text-xs text-muted" onClick={() => showHistory(m)}>History</button>
                  </span>
                </li>
              ))}
              {matches.length === 0 && <li className="px-4 py-2.5 text-sm text-muted">No active member matches.</li>}
            </ul>
          )}
          {history && (
            <div className="mt-5 border-t border-steel pt-4">
              <h3 className="text-sm font-semibold text-paper">{history.member.name} — last {history.rows.length} check-ins</h3>
              <p className="text-xs text-muted mt-2 leading-relaxed">{history.rows.length ? history.rows.slice(0, 14).map((r) => r.date).join(' · ') : 'No attendance recorded yet.'}</p>
            </div>
          )}
        </div>
        <div className="card p-6">
          <h2 className="font-display font-bold text-paper mb-4">Today — {new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'long' })}</h2>
          {loading ? <Skeleton rows={5} /> : (today || []).length === 0 ? <EmptyState title="No check-ins yet today" hint="Search a member on the left and mark their check-in." /> : (
            <ul className="divide-y divide-steel/60">
              {(today || []).map((r) => (
                <li key={r._id} className="py-3 flex items-center justify-between text-sm">
                  <span className="text-paper font-semibold">{r.member?.name}</span>
                  <span className="text-muted">{new Date(r.checkedInAt).toLocaleTimeString('en-PK', { hour: 'numeric', minute: '2-digit' })}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
