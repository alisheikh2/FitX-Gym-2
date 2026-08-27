import { useState } from 'react';
import { api } from '../../lib/api.js';
import { useFetch } from '../../lib/hooks.js';
import { Modal, Confirm, Field, Badge, statusTone, EmptyState, useToast, Skeleton } from '../../components/admin/ui.jsx';

const BLANK = { name: '', phone: '', email: '', gender: '', goals: '', trainer: '', plan: '', joiningDate: new Date().toISOString().slice(0, 10), expiryDate: '', notes: '', status: 'active' };

export default function Members() {
  const { data: members, loading, reload } = useFetch('/members');
  const { data: trainers } = useFetch('/trainers');
  const { data: plans } = useFetch('/plans');
  const toast = useToast();
  const [q, setQ] = useState('');
  const [status, setStatus] = useState('');
  const [editing, setEditing] = useState(null); // object or BLANK
  const [confirm, setConfirm] = useState(null);
  const [busy, setBusy] = useState(false);

  const list = (members || []).filter((m) =>
    (!q || m.name.toLowerCase().includes(q.toLowerCase()) || (m.phone || '').includes(q)) &&
    (!status || m.status === status)
  );

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const body = { ...editing, trainer: editing.trainer || null, plan: editing.plan || null, expiryDate: editing.expiryDate || null };
      if (editing._id) await api.put(`/members/${editing._id}`, body);
      else await api.post('/members', body);
      toast(editing._id ? 'Member updated' : 'Member created');
      setEditing(null);
      reload();
    } catch (err) { toast(err.message, 'err'); } finally { setBusy(false); }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="h-display text-3xl text-paper">Members</h1>
        <button className="btn-primary btn-sm" onClick={() => setEditing({ ...BLANK })}>+ Add Member</button>
      </div>

      <div className="flex flex-wrap gap-3">
        <input className="input max-w-xs" placeholder="Search name or phone…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search members" />
        <select className="input !w-auto" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
          <option value="">All statuses</option>
          {['active', 'paused', 'expired', 'cancelled'].map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      {loading ? <Skeleton rows={6} /> : list.length === 0 ? (
        <EmptyState title="No members found" hint="Add your first member to start tracking memberships and attendance." action={<button className="btn-primary btn-sm" onClick={() => setEditing({ ...BLANK })}>+ Add Member</button>} />
      ) : (
        <div className="card overflow-x-auto slim-scroll">
          <table className="table-fitx min-w-[760px]">
            <thead><tr><th>Name</th><th>Phone</th><th>Trainer</th><th>Expiry</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {list.map((m) => (
                <tr key={m._id} className="hover:bg-charcoal/50">
                  <td className="font-semibold text-paper">{m.name}</td>
                  <td className="text-silver">{m.phone}</td>
                  <td className="text-silver">{m.trainer?.name || '—'}</td>
                  <td className="text-silver">{m.expiryDate ? new Date(m.expiryDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'}</td>
                  <td><Badge tone={statusTone(m.status)}>{m.status}</Badge></td>
                  <td className="text-right whitespace-nowrap">
                    <button className="text-xs text-brand mr-3" onClick={() => setEditing({ ...m, trainer: m.trainer?._id || m.trainer || '', plan: m.plan?._id || m.plan || '', joiningDate: (m.joiningDate || '').slice(0, 10), expiryDate: (m.expiryDate || '').slice(0, 10) })}>Edit</button>
                    {m.status !== 'cancelled' && <button className="text-xs text-red-400" onClick={() => setConfirm(m)}>Deactivate</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?._id ? 'Edit member' : 'New member'} wide>
        {editing && (
          <form onSubmit={save} className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name *"><input className="input" required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="Phone *"><input className="input" required value={editing.phone} onChange={(e) => setEditing({ ...editing, phone: e.target.value })} /></Field>
            <Field label="Email"><input className="input" type="email" value={editing.email} onChange={(e) => setEditing({ ...editing, email: e.target.value })} /></Field>
            <Field label="Gender">
              <select className="input" value={editing.gender} onChange={(e) => setEditing({ ...editing, gender: e.target.value })}>
                <option value="">—</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
              </select>
            </Field>
            <Field label="Trainer">
              <select className="input" value={editing.trainer} onChange={(e) => setEditing({ ...editing, trainer: e.target.value })}>
                <option value="">—</option>
                {(trainers || []).map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </Field>
            <Field label="Membership plan">
              <select className="input" value={editing.plan} onChange={(e) => setEditing({ ...editing, plan: e.target.value })}>
                <option value="">—</option>
                {(plans || []).map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
              </select>
            </Field>
            <Field label="Joining date"><input type="date" className="input" value={editing.joiningDate} onChange={(e) => setEditing({ ...editing, joiningDate: e.target.value })} /></Field>
            <Field label="Expiry date"><input type="date" className="input" value={editing.expiryDate} onChange={(e) => setEditing({ ...editing, expiryDate: e.target.value })} /></Field>
            <Field label="Goals" className="sm:col-span-2"><input className="input" value={editing.goals} onChange={(e) => setEditing({ ...editing, goals: e.target.value })} placeholder="e.g. fat loss, strength…" /></Field>
            <Field label="Emergency contact"><input className="input" value={editing.emergencyContact} onChange={(e) => setEditing({ ...editing, emergencyContact: e.target.value })} /></Field>
            <Field label="Status">
              <select className="input" value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value })}>
                {['active', 'paused', 'expired', 'cancelled'].map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Notes" className="sm:col-span-2"><textarea rows={2} className="input" value={editing.notes} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} /></Field>
            <div className="sm:col-span-2 flex justify-end gap-3">
              <button type="button" className="btn-dark btn-sm" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary btn-sm" disabled={busy}>{busy ? 'Saving…' : 'Save Member'}</button>
            </div>
          </form>
        )}
      </Modal>

      <Confirm
        open={!!confirm}
        onClose={() => setConfirm(null)}
        onYes={async () => { await api.del(`/members/${confirm._id}`); toast('Member deactivated'); reload(); }}
        title="Deactivate member?"
        body={`${confirm?.name} will be marked as cancelled. Their history (payments, attendance) is kept.`}
      />
    </div>
  );
}
