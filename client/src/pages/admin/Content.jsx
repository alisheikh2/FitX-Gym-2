import { useState } from 'react';
import { api } from '../../lib/api.js';
import { useFetch } from '../../lib/hooks.js';
import { Modal, Field, Badge, Confirm, useToast, Skeleton } from '../../components/admin/ui.jsx';

const TABS = [
  ['programs', 'Programs'],
  ['faqs', 'FAQs'],
  ['testimonials', 'Testimonials']
];

export default function Content() {
  const [tab, setTab] = useState('programs');
  return (
    <div className="space-y-6">
      <h1 className="h-display text-3xl text-paper">Website Content</h1>
      <div className="flex gap-2 flex-wrap">
        {TABS.map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} className={`btn-sm ${tab === id ? 'btn-primary' : 'btn-dark'}`}>{label}</button>
        ))}
      </div>
      {tab === 'programs' && <ProgramsTab />}
      {tab === 'faqs' && <FaqsTab />}
      {tab === 'testimonials' && <TestimonialsTab />}
    </div>
  );
}

function ProgramsTab() {
  const { data, loading, reload } = useFetch('/programs');
  const toast = useToast();
  const [editing, setEditing] = useState(null);
  const BLANK = { name: '', slug: '', tagline: '', description: '', bullets: '', audience: '', trainerSlug: '', image: '', active: true, sortOrder: 0 };

  async function save(e) {
    e.preventDefault();
    try {
      const body = { ...editing, bullets: editing.bullets.split('\n').filter(Boolean), slug: editing.slug || editing.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') };
      if (editing._id) await api.put(`/programs/${editing._id}`, body); else await api.post('/programs', body);
      toast('Program saved'); setEditing(null); reload();
    } catch (err) { toast(err.message, 'err'); }
  }

  return (
    <>
      {loading ? <Skeleton rows={4} /> : (
        <div className="space-y-3">
          {(data || []).map((p) => (
            <div key={p._id} className="card p-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-paper">{p.name} <Badge tone={p.active ? 'ok' : 'neutral'}>{p.active ? 'live' : 'hidden'}</Badge></p>
                <p className="text-xs text-muted mt-1">{p.tagline}</p>
              </div>
              <button className="text-xs text-brand shrink-0" onClick={() => setEditing({ ...p, bullets: (p.bullets || []).join('\n') })}>Edit</button>
            </div>
          ))}
        </div>
      )}
      <button className="btn-dark btn-sm" onClick={() => setEditing({ ...BLANK })}>+ New Program</button>
      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?._id ? 'Edit program' : 'New program'} wide>
        {editing && (
          <form onSubmit={save} className="grid sm:grid-cols-2 gap-4">
            <Field label="Name *"><input className="input" required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="Slug"><input className="input" value={editing.slug} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} /></Field>
            <Field label="Tagline" className="sm:col-span-2"><input className="input" value={editing.tagline} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} /></Field>
            <Field label="Description" className="sm:col-span-2"><textarea rows={3} className="input" value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} /></Field>
            <Field label="Bullets (one per line)" className="sm:col-span-2"><textarea rows={3} className="input" value={editing.bullets} onChange={(e) => setEditing({ ...editing, bullets: e.target.value })} /></Field>
            <Field label="Trainer slug"><input className="input" value={editing.trainerSlug} onChange={(e) => setEditing({ ...editing, trainerSlug: e.target.value })} /></Field>
            <Field label="Image path"><input className="input" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} /></Field>
            <label className="flex items-center gap-2 text-sm text-silver sm:col-span-2"><input type="checkbox" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} /> Live on website</label>
            <div className="sm:col-span-2 flex justify-end gap-3">
              <button type="button" className="btn-dark btn-sm" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary btn-sm">Save</button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
}

function FaqsTab() {
  const { data, loading, reload } = useFetch('/faqs');
  const toast = useToast();
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const BLANK = { category: 'General', question: '', answer: '', active: true, sortOrder: 0 };

  async function save(e) {
    e.preventDefault();
    try {
      if (editing._id) await api.put(`/faqs/${editing._id}`, editing); else await api.post('/faqs', editing);
      toast('FAQ saved'); setEditing(null); reload();
    } catch (err) { toast(err.message, 'err'); }
  }

  return (
    <>
      {loading ? <Skeleton rows={4} /> : (
        <div className="space-y-3">
          {(data || []).map((f) => (
            <div key={f._id} className="card p-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-brand">{f.category}</p>
                <p className="font-semibold text-paper mt-0.5">{f.question}</p>
                <p className="text-xs text-muted mt-1 line-clamp-2">{f.answer}</p>
              </div>
              <div className="flex gap-3 shrink-0">
                <button className="text-xs text-brand" onClick={() => setEditing(f)}>Edit</button>
                <button className="text-xs text-red-400" onClick={() => setConfirm(f)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="btn-dark btn-sm" onClick={() => setEditing({ ...BLANK })}>+ New FAQ</button>
      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?._id ? 'Edit FAQ' : 'New FAQ'}>
        {editing && (
          <form onSubmit={save} className="space-y-4">
            <Field label="Category"><input className="input" value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} /></Field>
            <Field label="Question *"><input className="input" required value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} /></Field>
            <Field label="Answer *"><textarea rows={4} className="input" required value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} /></Field>
            <div className="flex justify-end gap-3">
              <button type="button" className="btn-dark btn-sm" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary btn-sm">Save</button>
            </div>
          </form>
        )}
      </Modal>
      <Confirm open={!!confirm} onClose={() => setConfirm(null)} onYes={async () => { await api.del(`/faqs/${confirm._id}`); toast('FAQ deleted'); reload(); }} title="Delete FAQ?" body={confirm?.question} />
    </>
  );
}

function TestimonialsTab() {
  const { data, loading, reload } = useFetch('/testimonials');
  const toast = useToast();
  const [editing, setEditing] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const BLANK = { kind: 'quote', name: '', source: 'Google Review', text: '', image: '', result: '', active: true, sortOrder: 0 };

  async function save(e) {
    e.preventDefault();
    try {
      if (editing._id) await api.put(`/testimonials/${editing._id}`, editing); else await api.post('/testimonials', editing);
      toast('Testimonial saved'); setEditing(null); reload();
    } catch (err) { toast(err.message, 'err'); }
  }

  return (
    <>
      {loading ? <Skeleton rows={4} /> : (
        <div className="space-y-3">
          {(data || []).map((t) => (
            <div key={t._id} className="card p-4 flex items-start justify-between gap-4">
              <div className="flex gap-3">
                {t.image && <img src={t.image} alt="" className="h-14 w-14 object-cover border border-steel" loading="lazy" />}
                <div>
                  <p className="font-semibold text-paper">{t.name} <Badge tone={t.kind === 'quote' ? 'brand' : 'warn'}>{t.kind}</Badge></p>
                  <p className="text-xs text-muted mt-1 line-clamp-2">{t.text || t.result}</p>
                </div>
              </div>
              <div className="flex gap-3 shrink-0">
                <button className="text-xs text-brand" onClick={() => setEditing(t)}>Edit</button>
                <button className="text-xs text-red-400" onClick={() => setConfirm(t)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button className="btn-dark btn-sm" onClick={() => setEditing({ ...BLANK })}>+ New Testimonial</button>
      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?._id ? 'Edit testimonial' : 'New testimonial'}>
        {editing && (
          <form onSubmit={save} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Kind">
                <select className="input" value={editing.kind} onChange={(e) => setEditing({ ...editing, kind: e.target.value })}><option value="quote">quote</option><option value="transformation">transformation</option></select>
              </Field>
              <Field label="Source"><input className="input" value={editing.source} onChange={(e) => setEditing({ ...editing, source: e.target.value })} /></Field>
            </div>
            <Field label="Name *"><input className="input" required value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></Field>
            <Field label="Text / quote"><textarea rows={3} className="input" value={editing.text} onChange={(e) => setEditing({ ...editing, text: e.target.value })} /></Field>
            <Field label="Image path (transformations)"><input className="input" value={editing.image} onChange={(e) => setEditing({ ...editing, image: e.target.value })} /></Field>
            <Field label="Result label"><input className="input" value={editing.result} onChange={(e) => setEditing({ ...editing, result: e.target.value })} /></Field>
            <label className="flex items-center gap-2 text-sm text-silver"><input type="checkbox" checked={editing.active} onChange={(e) => setEditing({ ...editing, active: e.target.checked })} /> Published</label>
            <div className="flex justify-end gap-3">
              <button type="button" className="btn-dark btn-sm" onClick={() => setEditing(null)}>Cancel</button>
              <button className="btn-primary btn-sm">Save</button>
            </div>
          </form>
        )}
      </Modal>
      <Confirm open={!!confirm} onClose={() => setConfirm(null)} onYes={async () => { await api.del(`/testimonials/${confirm._id}`); toast('Deleted'); reload(); }} title="Delete testimonial?" body={`${confirm?.name}, this only removes it from the site.`} />
    </>
  );
}
