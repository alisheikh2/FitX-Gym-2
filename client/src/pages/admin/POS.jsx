import { useState } from 'react';
import { api } from '../../lib/api.js';
import { useFetch } from '../../lib/hooks.js';
import { Modal, Field, useToast, Skeleton, EmptyState } from '../../components/admin/ui.jsx';
import { LogoMark } from '../../components/site/Logo.jsx';
import { BRAND } from '../../lib/brand.js';

const METHODS = ['Cash', 'Bank Transfer', 'Card', 'Other'];

export default function POS() {
  const { data: payments, loading, reload } = useFetch('/payments');
  const { data: members } = useFetch('/members');
  const { data: plans } = useFetch('/plans');
  const toast = useToast();

  const [q, setQ] = useState('');
  const [form, setForm] = useState({ member: '', plan: '', amount: '', method: 'Cash', notes: '', extendMembership: true });
  const [busy, setBusy] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const matches = (members || []).filter((m) => m.status !== 'cancelled' && (m.name.toLowerCase().includes(q.toLowerCase()) || (m.phone || '').includes(q))).slice(0, 6);

  function pickPlan(p) {
    setForm((f) => ({ ...f, plan: p._id, amount: p.price }));
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const payment = await api.post('/payments', { ...form, amount: +form.amount });
      toast('Payment recorded');
      setForm({ member: '', plan: '', amount: '', method: 'Cash', notes: '', extendMembership: true });
      setQ('');
      reload();
      setReceipt(payment);
    } catch (err) { toast(err.message, 'err'); } finally { setBusy(false); }
  }

  async function openReceipt(id) {
    try {
      const r = await api.get(`/payments/${id}/receipt`);
      setReceipt(r.payment);
    } catch (err) { toast(err.message, 'err'); }
  }

  return (
    <div className="space-y-8">
      <h1 className="h-display text-3xl text-paper">POS / Payments</h1>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 items-start">
        <form onSubmit={submit} className="card p-6 space-y-4">
          <h2 className="font-display font-bold text-paper">Record a payment</h2>
          <Field label="Member *">
            {form.member ? (
              <p className="input flex items-center justify-between">{(members || []).find((m) => m._id === form.member)?.name}
                <button type="button" className="text-xs text-red-400" onClick={() => setForm({ ...form, member: '' })}>change</button>
              </p>
            ) : (
              <>
                <input className="input" placeholder="Search member by name or phone…" value={q} onChange={(e) => setQ(e.target.value)} required={!form.member} />
                {q && (
                  <ul className="border border-steel border-t-0 max-h-44 overflow-y-auto">
                    {matches.map((m) => (
                      <li key={m._id}>
                        <button type="button" className="w-full text-left px-4 py-2.5 text-sm text-silver hover:bg-charcoal" onClick={() => { setForm({ ...form, member: m._id }); setQ(''); }}>
                          {m.name} <span className="text-muted">· {m.phone}</span>
                        </button>
                      </li>
                    ))}
                    {matches.length === 0 && <li className="px-4 py-2.5 text-sm text-muted">No match, add the member first.</li>}
                  </ul>
                )}
              </>
            )}
          </Field>
          <Field label="Plan / service">
            <div className="grid grid-cols-2 gap-2">
              {(plans || []).map((p) => (
                <button type="button" key={p._id} onClick={() => pickPlan(p)} className={`text-left px-3 py-2 text-xs border transition-colors ${form.plan === p._id ? 'border-brand text-brand bg-brand/10' : 'border-steel text-silver hover:border-silver'}`}>
                  {p.name}<br /><span className="text-muted">Rs {p.price.toLocaleString()}</span>
                </button>
              ))}
            </div>
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Amount (Rs) *"><input type="number" min="0" className="input" required value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></Field>
            <Field label="Method">
              <select className="input" value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })}>{METHODS.map((m) => <option key={m}>{m}</option>)}</select>
            </Field>
          </div>
          <Field label="Notes"><input className="input" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></Field>
          <label className="flex items-center gap-2 text-sm text-silver"><input type="checkbox" checked={form.extendMembership} onChange={(e) => setForm({ ...form, extendMembership: e.target.checked })} /> Extend membership expiry by plan duration</label>
          <button className="btn-primary w-full" disabled={busy || !form.member}>{busy ? 'Recording…' : 'Record Payment & Generate Receipt'}</button>
        </form>

        <div className="card p-6">
          <h2 className="font-display font-bold text-paper mb-4">Payment history</h2>
          {loading ? <Skeleton rows={5} /> : (payments || []).length === 0 ? <EmptyState title="No payments yet" hint="Recorded payments appear here with receipts." /> : (
            <div className="overflow-x-auto slim-scroll">
              <table className="table-fitx min-w-[560px]">
                <thead><tr><th>Date</th><th>Member</th><th>Method</th><th>Amount</th><th></th></tr></thead>
                <tbody>
                  {(payments || []).slice(0, 30).map((p) => (
                    <tr key={p._id}>
                      <td className="text-muted">{new Date(p.date).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}</td>
                      <td className="text-paper font-semibold">{p.member?.name}</td>
                      <td className="text-silver">{p.method}</td>
                      <td className="text-brand font-semibold">Rs {p.amount.toLocaleString()}</td>
                      <td className="text-right"><button className="text-xs text-brand" onClick={() => openReceipt(p._id)}>Receipt</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* RECEIPT */}
      <Modal open={!!receipt} onClose={() => setReceipt(null)} title="Receipt" wide>
        {receipt && (
          <>
            <div className="print-area bg-white text-neutral-900 p-6">
              <div className="flex items-center justify-between border-b-2 border-neutral-800 pb-4">
                <div className="flex items-center gap-3">
                  <LogoMark size={44} onLight />
                  <div>
                    <p className="font-display font-bold text-lg leading-none">FIT<span className="text-brand-deep">X</span></p>
                    <p className="text-[10px] uppercase tracking-widest">Personal Fitness Training Studio</p>
                  </div>
                </div>
                <div className="text-right text-xs">
                  <p className="font-bold">PAYMENT RECEIPT</p>
                  <p>{receipt.txnId}</p>
                  <p>{new Date(receipt.date).toLocaleString('en-PK')}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 py-5 text-sm">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500">Received from</p>
                  <p className="font-bold">{receipt.member?.name}</p>
                  <p>{receipt.member?.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-500">For</p>
                  <p className="font-bold">{receipt.plan?.name || receipt.serviceLabel || 'Training payment'}</p>
                  <p>Payment method: {receipt.method}</p>
                </div>
              </div>
              <div className="border-t border-neutral-300 pt-4 flex items-center justify-between">
                <p className="text-sm">Total paid</p>
                <p className="font-display font-bold text-2xl">Rs {receipt.amount.toLocaleString()}</p>
              </div>
              {receipt.notes && <p className="text-xs text-neutral-600 mt-2">Note: {receipt.notes}</p>}
              <div className="mt-6 pt-4 border-t border-neutral-300 flex justify-between text-[10px] text-neutral-600">
                <p>{BRAND.address}</p>
                <p>{BRAND.phoneDisplay} · Served by: {receipt.recordedBy?.name || 'FITX Staff'}</p>
              </div>
              <p className="text-center text-[10px] mt-3 text-neutral-500">Thank you for training with FITX. Fitness is not a destination, it’s a journey.</p>
            </div>
            <div className="flex justify-end gap-3 mt-5 no-print">
              <button className="btn-dark btn-sm" onClick={() => setReceipt(null)}>Close</button>
              <button className="btn-primary btn-sm" onClick={() => window.print()}>Print / Save PDF</button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
