import { useState } from 'react';
import { api } from '../../lib/api.js';
import { useFetch } from '../../lib/hooks.js';
import { Modal, Field, Badge, statusTone, useToast, Skeleton, EmptyState } from '../../components/admin/ui.jsx';
const APPOINTMENT_STATUSES = ['Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'No Show'];

const BLANK = { personName: '', date: new Date().toISOString().slice(0, 10), time: '17:00', trainer: '', notes: '', status: 'Scheduled' };

export default function Appointments() {
  const { data: appts, loading, reload } = useFetch('/appointments');
  const { data: trainers } = useFetch('/trainers');
  const toast = useToast();
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const body = { ...editing, trainer: editing.trainer || null };
      if (editing._id) await api.put(`/appointments/${editing._id}`, body); else await api.post('/appointments', body);
      toast('Appointment saved'); setEditing(null); reload();
    } catch (err) { toast(err.message, 'err'); } finally { setBusy(false); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="h-display text-3xl text-paper">Appointments</h1>
        <button className="btn-primary btn-sm" onClick={() => setEditing({ ...BLANK })}>+ New Appointment</button>
      </div>
      {loading ? <Skeleton rows={5} /> : (appts || []).length === 0 ? <EmptyState title="No appointments" hint="Consultation requests from the website and manual bookings appear here." /> : (
        <div className="card overflow-x-auto slim-scroll">
          <table className="table-fitx min-w-[720px]">
            <thead><tr><th>Date</th><th>Time</th><th>Person</th><th>Trainer</th><th>Status</th><th></th></tr></thead>
            <tbody>
              {(appts || []).map((a) => (
                <tr key={a._id}>
                  <td className="text-silver">{a.date}</td>
                  <td className="text-paper font-semibold">{a.time}</td>
                  <td className="text-paper">{a.personName}</td>
                  <td className="text-silver">{a.trainer?.name || '—'}</td>
                  <td>
                    <select className="input !w-auto !py-1 text-xs" value={a.status} onChange={async (e) => { await api.put(`/appointments/${a._id}`, { status: e.target.value }); toast('Status updated'); reload(); }} aria-label={`Status for ${a.personName}`}>
                      {APPOINTMENT_STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="text-right"><button className="text-xs text-brand" onClick={() => setEditing({ ...a, trainer: a.trainer?._id || a.trainer || '' })}>Edit</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?._id ? 'Edit appointment' : 'New appointment'}>
        {editing && (
          <form onSubmit={save} className="grid grid-cols-2 gap-4">
            <Field label="Person name *" className="col-span-2"><input className="input" required value={editing.personName} onChange={(e) => setEditing({ ...editing, personName: e.target.value })} /></Field>
            <Field label="Date *"><input type="date" className="input" required value={editing.date} onChange={(e) => setEditing({ ...editing, date: e.target.value })} /></Field>
            <Field label="Time *"><input type="time" className="input" required value={editing.time} onChange={(e) => setEditing({ ...editing, time: e.target.value })} /></Field>
            <Field label="Trainer" className="col-span-2">
              <select className="input" value={editing.trainer} onChange={(e) => setEditing({ ...editing, trainer: e.target.value })}>
                <option value="">—</option>
                {(trainers || []).map((t) => <option key={t._id} value={t._id}>{t.name}</option>)}
              </select>
            </Field>
            <Field label="Notes" className="col-span-2"><textarea rows={2} className="input" value={editing.notes} onChange={(e) => setEditing({ ...editing, notes: e.target.value })} /></Field>
            <div className="col-span-2 flex justify-end gap-3">
              <button type="button" className="btn-dark btn-sm" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary btn-sm" disabled={busy}>{busy ? 'Saving…' : 'Save'}</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
