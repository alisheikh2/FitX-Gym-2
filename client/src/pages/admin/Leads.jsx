import { useState } from 'react';
import { api } from '../../lib/api.js';
import { useFetch } from '../../lib/hooks.js';
import { Badge, statusTone, useToast, Skeleton, EmptyState } from '../../components/admin/ui.jsx';

const LEAD_STATUSES = ['New', 'Contacted', 'Consultation Booked', 'Converted', 'Follow-up', 'Not Interested', 'Lost'];

export default function Leads() {
  const { data: leads, loading, reload } = useFetch('/leads');
  const toast = useToast();
  const [filter, setFilter] = useState('');
  const [open, setOpen] = useState(null);

  const list = (leads || []).filter((l) => !filter || l.status === filter);

  async function setStatus(lead, status) {
    await api.put(`/leads/${lead._id}`, { status });
    toast(`Lead → ${status}`);
    reload();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="h-display text-3xl text-paper">Leads / CRM</h1>
        <select className="input !w-auto" value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter leads">
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>
      {loading ? <Skeleton rows={6} /> : list.length === 0 ? <EmptyState title="No leads" hint="Website consultation submissions land here automatically." /> : (
        <div className="space-y-4">
          {list.map((l) => (
            <div key={l._id} className="card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-paper">{l.name} <span className="text-muted font-normal text-sm">· {l.phone}{l.email ? ` · ${l.email}` : ''}</span></p>
                  <p className="text-sm text-silver mt-1">{l.goal}{l.preferredTraining ? ` · ${l.preferredTraining}` : ''}{l.preferredTime ? ` · ${l.preferredTime}` : ''}</p>
                  {l.message && <p className="text-xs text-muted mt-2 italic">“{l.message}”</p>}
                  <p className="text-[11px] text-muted mt-2">{l.source} · {new Date(l.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge tone={statusTone(l.status)}>{l.status}</Badge>
                  <select className="input !w-auto !py-1.5 text-xs" value={l.status} onChange={(e) => setStatus(l, e.target.value)} aria-label={`Status for ${l.name}`}>
                    {LEAD_STATUSES.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <details className="mt-3">
                <summary className="text-xs text-brand cursor-pointer list-none">Notes & follow-up</summary>
                <textarea
                  rows={2}
                  className="input mt-2"
                  defaultValue={l.notes || ''}
                  placeholder="Internal notes…"
                  onBlur={async (e) => { if (e.target.value !== (l.notes || '')) { await api.put(`/leads/${l._id}`, { notes: e.target.value }); toast('Notes saved'); } }}
                />
              </details>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
