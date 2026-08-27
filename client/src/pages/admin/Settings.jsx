import { useState, useEffect } from 'react';
import { api } from '../../lib/api.js';
import { Field, useToast, Skeleton } from '../../components/admin/ui.jsx';

export default function AdminSettings() {
  const toast = useToast();
  const [s, setS] = useState(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => { api.get('/settings').then(setS); }, []);

  if (!s) return <Skeleton rows={6} />;

  const set = (path, value) => {
    setS((prev) => {
      const next = structuredClone(prev);
      let node = next;
      const parts = path.split('.');
      parts.slice(0, -1).forEach((p) => { node = node[p]; });
      node[parts.at(-1)] = value;
      return next;
    });
  };

  async function save(e) {
    e.preventDefault();
    setBusy(true);
    try {
      const { brand, contact, hours, socials, rating } = s;
      await api.put('/settings', { brand, contact, hours: { ...hours, female: typeof hours.female === 'string' ? hours.female.split('\n').filter(Boolean) : hours.female }, socials, rating });
      toast('Settings saved — website updated');
      api.get('/settings').then(setS);
    } catch (err) { toast(err.message, 'err'); } finally { setBusy(false); }
  }

  return (
    <form onSubmit={save} className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="h-display text-3xl text-paper">Site Settings</h1>
        <button className="btn-primary btn-sm" disabled={busy}>{busy ? 'Saving…' : 'Save Settings'}</button>
      </div>

      <section className="card p-6 space-y-4">
        <h2 className="font-display font-bold text-paper">Brand & homepage</h2>
        <Field label="Hero headline"><input className="input" value={s.brand.heroHeadline} onChange={(e) => set('brand.heroHeadline', e.target.value)} /></Field>
        <Field label="Hero subcopy"><textarea rows={3} className="input" value={s.brand.heroSub} onChange={(e) => set('brand.heroSub', e.target.value)} /></Field>
        <Field label="Tagline"><input className="input" value={s.brand.tagline} onChange={(e) => set('brand.tagline', e.target.value)} /></Field>
      </section>

      <section className="card p-6 space-y-4">
        <h2 className="font-display font-bold text-paper">Contact</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Phone"><input className="input" value={s.contact.phone} onChange={(e) => set('contact.phone', e.target.value)} /></Field>
          <Field label="Second phone"><input className="input" value={s.contact.phone2} onChange={(e) => set('contact.phone2', e.target.value)} /></Field>
          <Field label="WhatsApp number (intl format)"><input className="input" value={s.contact.whatsapp} onChange={(e) => set('contact.whatsapp', e.target.value)} /></Field>
          <Field label="Email"><input className="input" value={s.contact.email} onChange={(e) => set('contact.email', e.target.value)} /></Field>
        </div>
        <Field label="Address"><input className="input" value={s.contact.address} onChange={(e) => set('contact.address', e.target.value)} /></Field>
        <Field label="Google Maps link"><input className="input" value={s.contact.mapUrl} onChange={(e) => set('contact.mapUrl', e.target.value)} /></Field>
      </section>

      <section className="card p-6 space-y-4">
        <h2 className="font-display font-bold text-paper">Hours & socials</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Week hours"><input className="input" value={s.hours.weekdays} onChange={(e) => set('hours.weekdays', e.target.value)} /></Field>
          <Field label="Friday"><input className="input" value={s.hours.friday} onChange={(e) => set('hours.friday', e.target.value)} /></Field>
        </div>
        <Field label="Female hours (one per line)">
          <textarea rows={2} className="input" value={(s.hours.female || []).join('\n')} onChange={(e) => set('hours.female', e.target.value)} />
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Facebook"><input className="input" value={s.socials.facebook} onChange={(e) => set('socials.facebook', e.target.value)} /></Field>
          <Field label="Instagram"><input className="input" value={s.socials.instagram} onChange={(e) => set('socials.instagram', e.target.value)} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Google rating value"><input type="number" step="0.1" className="input" value={s.rating?.value ?? ''} onChange={(e) => set('rating.value', +e.target.value)} /></Field>
          <Field label="Review count"><input type="number" className="input" value={s.rating?.count ?? ''} onChange={(e) => set('rating.count', +e.target.value)} /></Field>
        </div>
      </section>

      <button className="btn-primary" disabled={busy}>{busy ? 'Saving…' : 'Save Settings'}</button>
    </form>
  );
}
