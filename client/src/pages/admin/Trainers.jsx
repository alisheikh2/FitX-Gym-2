import { useState } from 'react';
import { api } from '../../lib/api.js';
import { useFetch } from '../../lib/hooks.js';
import { Modal, Field, Badge, useToast, Skeleton } from '../../components/admin/ui.jsx';

const BLANK = { name: '', slug: '', role: '', specialization: '', experienceYears: '', photo: '', photoAlt: '', shortBio: '', bio: '', philosophy: '', focus: '', suitableFor: '', active: true, sortOrder: 0 };

export default function AdminTrainers() {
  const { data: trainers, loading, reload } = useFetch('/trainers');
  const toast = useToast();
  const [editing, setEditing] = useState(null);
  const [busy, setBusy] = useState(false);

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const body = {
        ...editing,
        experienceYears: editing.experienceYears ? +editing.experienceYears : undefined,
        focus: editing.focus.split('\n').filter(Boolean),
        suitableFor: editing.suitableFor.split('\n').filter(Boolean),
        slug: editing.slug || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
      };
      if (editing._id) await api.put(`/trainers/${editing._id}`, body); else await api.post('/trainers', body);
      toast('Trainer saved — public site updates instantly'); setEditing(null); reload();
    } catch (err) { toast(err.message, 'err'); } finally { setBusy(false); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="h-display text-3xl text-paper">Trainers</h1>
        <button className="btn-primary btn-sm" onClick={() => setEditing({ ...BLANK })}>+ New Trainer</button>
      </div>
      {loading ? <Skeleton rows={4} /> : (
        <div className="grid md:grid-cols-2 gap-5">
          {(trainers || []).map((t) => (
            <div key={t._id} className="card p-5 flex gap-4">
              <img src={t.photo} alt={t.photoAlt || t.name} className="h-20 w-16 object-cover object-top border border-steel" loading="lazy" />
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display font-bold text-paper">{t.name}</p>
                  <Badge tone={t.active ? 'ok' : 'neutral'}>{t.active ? 'published' : 'hidden'}</Badge>
                </div>
                <p className="text-xs text-silver mt-0.5">{t.role}</p>
                <p className="text-xs text-muted mt-1">{t.specialization}</p>
                <button className="text-xs text-brand mt-3" onClick={() => setEditing({ ...t, focus: (t.focus || []).join('\n'), suitableFor: (t.suitableFor || []).join('\n') })}>Edit profile</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?._id ? 'Edit trainer' : 'New trainer'} wide>
        {editing && (
          <form onSubmit={save} className="grid sm:grid-cols-2 gap-4">
            <Field label="Name *"><input className="input" required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="Slug"><input className="input" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto-from-name" /></Field>
            <Field label="Role *"><input className="input" required value={editing.role} onChange={(e) => setEditing({ ...editing, role: e.target.value })} /></Field>
            <Field label="Experience (years)"><input type="number" min="0" className="input" value={editing.experienceYears} onChange={(e) => setEditing({ ...editing, experienceYears: e.target.value })} /></Field>
            <Field label="Specialization" className="sm:col-span-2"><input className="input" value={editing.specialization} onChange={(e) => setEditing({ ...editing, specialization: e.target.value })} /></Field>
            <Field label="Photo path"><input className="input" value={editing.photo} onChange={(e) => setEditing({ ...editing, photo: e.target.value })} placeholder="/images/fitx/trainers/…" /></Field>
            <Field label="Photo alt text"><input className="input" value={editing.photoAlt} onChange={(e) => setEditing({ ...editing, photoAlt: e.target.value })} /></Field>
            <Field label="Short bio" className="sm:col-span-2"><textarea rows={2} className="input" value={editing.shortBio} onChange={(e) => setEditing({ ...editing, shortBio: e.target.value })} /></Field>
            <Field label="Full bio" className="sm:col-span-2"><textarea rows={4} className="input" value={editing.bio} onChange={(e) => setEditing({ ...editing, bio: e.target.value })} /></Field>
            <Field label="Coaching philosophy" className="sm:col-span-2"><textarea rows={2} className="input" value={editing.philosophy} onChange={(e) => setEditing({ ...editing, philosophy: e.target.value })} /></Field>
            <Field label="Training focus (one per line)"><textarea rows={3} className="input" value={editing.focus} onChange={(e) => setEditing({ ...editing, focus: e.target.value })} /></Field>
            <Field label="Suitable for (one per line)"><textarea rows={3} className="input" value={editing.suitableFor} onChange={(e) => setEditing({ ...editing, suitableFor: e.target.value })} /></Field>
            <label className="flex items-center gap-2 text-sm text-silver sm:col-span-2"><input type="checkbox" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} /> Published on website</label>
            <div className="sm:col-span-2 flex justify-end gap-3">
              <button type="button" className="btn-dark btn-sm" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary btn-sm" disabled={busy}>{busy ? 'Saving…' : 'Save Trainer'}</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
