import { useState } from 'react';
import { api } from '../../lib/api.js';
import { useFetch } from '../../lib/hooks.js';
import { Modal, Field, Badge, useToast, Skeleton } from '../../components/admin/ui.jsx';

const BLANK = { name: '', durationMonths: 1, price: '', description: '', includedServices: [], active: true };

export default function Plans() {
  const { data: plans, loading, reload } = useFetch('/plans');
  const toast = useToast();
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const body = { ...editing, includedServices: Array.isArray(editing.includedServices) ? editing.includedServices : editing.includedServices.split('\n').filter(Boolean) };
      if (editing._id) await api.put(`/plans/${editing._id}`, body); else await api.post('/plans', body);
      toast('Plan saved'); setEditing(null); reload();
    } catch (err) { toast(err.message, 'err'); } finally { setBusy(false); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="h-display text-3xl text-paper">Membership Plans</h1>
        <button className="btn-primary btn-sm" onClick={() => setEditing({ ...BLANK })}>+ New Plan</button>
      </div>
      {loading ? <Skeleton rows={4} /> : (
        <div className="card overflow-x-auto">
          <table className="table-fitx min-w-[640px]">
            <thead><tr><th>Plan</th><th>Duration</th><th>Price</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {(plans || []).map((p) => (
                <tr key={p._id}>
                  <td className="font-semibold text-paper">{p.name}<p className="text-xs text-muted font-normal">{p.description}</p></td>
                  <td className="text-silver">{p.durationMonths} month{p.durationMonths > 1 ? 's' : ''}</td>
                  <td className="text-brand font-semibold">Rs {p.price.toLocaleString()}</td>
                  <td><Badge tone={p.active ? 'ok' : 'neutral'}>{p.active ? 'active' : 'inactive'}</Badge></td>
                  <td className="text-right"><button className="text-xs text-brand" onClick={() => setEditing({ ...p, includedServices: (p.includedServices || []).join('\n') })}>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?._id ? 'Edit plan' : 'New plan'}>
        {editing && (
          <form onSubmit={save} className="space-y-4">
            <Field label="Plan name *"><input className="input" required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Duration (months) *"><input type="number" min="1" className="input" required value={editing.durationMonths} onChange={(e) => setEditing({ ...editing, durationMonths: +e.target.value })} /></Field>
              <Field label="Price (Rs) *"><input type="number" min="0" className="input" required value={editing.price} onChange={(e) => setEditing({ ...editing, price: +e.target.value })} /></Field>
            </div>
            <Field label="Description"><input className="input" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></Field>
            <Field label="Included services (one per line)"><textarea rows={3} className="input" value={editing.includedServices} onChange={(e) => setEditing({ ...editing, includedServices: e.target.value })} /></Field>
            <label className="flex items-center gap-2 text-sm text-silver"><input type="checkbox" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} /> Active</label>
            <div className="flex justify-end gap-3">
              <button type="button" className="btn-dark btn-sm" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary btn-sm" disabled={busy}>{busy ? 'Saving…' : 'Save Plan'}</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
