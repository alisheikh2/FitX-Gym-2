import { useState } from 'react';
import Seo from '../../lib/Seo.jsx';
import { api, ApiError } from '../../lib/api.js';
import { BRAND, wa, tel } from '../../lib/brand.js';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero } from '../../components/site/blocks.jsx';

const GOALS = ['Fat loss / weight loss', 'Strength & muscle', 'General fitness & health', 'Sports performance', "Women's training", 'Not sure yet — need guidance'];
const TYPES = ['One-to-one personal training', 'Group sessions', "Women's dedicated hours", 'Not sure yet'];
const TIMES = ['Morning (11 AM – 2 PM)', 'Afternoon (2 – 6 PM)', 'Evening (6 – 10 PM)'];

export default function BookConsultation() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', goal: GOALS[0], type: TYPES[0], time: TIMES[2], date: '', message: '' });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | done | error

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  async function submit(e) {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = 'Please enter your name';
    if (form.phone.trim().length < 7) errs.phone = 'Please enter a valid phone number';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Please enter a valid email or leave blank';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState('sending');
    try {
      await api.post('/leads', {
        name: form.name, phone: form.phone, email: form.email || undefined,
        goal: form.goal, preferredTraining: form.type, preferredTime: form.time,
        preferredDate: form.date || undefined,
        message: form.message, source: 'Website — Consultation Form'
      });
      setState('done');
    } catch (err) {
      setState('error');
      if (err instanceof ApiError && err.errors) setErrors(Object.fromEntries(err.errors.map((x) => [x.field, x.message])));
    }
  }

  return (
    <>
      <Seo
        title="Book a Free Consultation — FITX Sahiwal Personal Training"
        description="Book a free consultation at FITX Personal Fitness Training Studio, Sahiwal. Tell us your goal and preferred time — a coach will contact you to schedule your visit."
        path="/book-consultation"
      />
      <PageHero
        label="Book a Consultation"
        title="Start with a conversation."
        copy="Tell us your goal and when you can train. Our team will contact you to schedule your consultation at the studio — free, and without obligation."
        crumbs={[['Book a Consultation', null]]}
      />

      <section className="py-14 sm:py-20">
        <div className="shell grid lg:grid-cols-[1.2fr_1fr] gap-10 max-w-6xl mx-auto items-start">
          {state === 'done' ? (
            <Reveal className="card p-10 text-center lg:text-left">
              <div className="mx-auto lg:mx-0 h-14 w-14 bg-brand text-obsidian flex items-center justify-center text-2xl font-bold">✓</div>
              <h2 className="h-display text-3xl mt-6 text-paper">Request received.</h2>
              <p className="mt-4 text-silver leading-relaxed">Thank you, {form.name.split(' ')[0]}. Our team has your details and will contact you on <strong className="text-paper">{form.phone}</strong> to schedule your consultation. Prefer not to wait? <a className="link-underline text-brand" href={wa(`Hello FITX, I just submitted a consultation request (${form.name}).`)} target="_blank" rel="noopener noreferrer">Message us on WhatsApp</a>.</p>
            </Reveal>
          ) : (
            <Reveal>
              <form onSubmit={submit} noValidate className="card p-7 sm:p-10 grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="f-name" className="field-label">Full name *</label>
                  <input id="f-name" className={`input ${errors.name ? 'input-err' : ''}`} value={form.name} onChange={set('name')} autoComplete="name" required />
                  {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="f-phone" className="field-label">Phone / WhatsApp *</label>
                  <input id="f-phone" className={`input ${errors.phone ? 'input-err' : ''}`} value={form.phone} onChange={set('phone')} autoComplete="tel" inputMode="tel" required />
                  {errors.phone && <p className="text-xs text-red-400 mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="f-email" className="field-label">Email (optional)</label>
                  <input id="f-email" type="email" className={`input ${errors.email ? 'input-err' : ''}`} value={form.email} onChange={set('email')} autoComplete="email" />
                  {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="f-goal" className="field-label">Your main goal</label>
                  <select id="f-goal" className="input" value={form.goal} onChange={set('goal')}>{GOALS.map((g) => <option key={g}>{g}</option>)}</select>
                </div>
                <div>
                  <label htmlFor="f-type" className="field-label">Preferred training</label>
                  <select id="f-type" className="input" value={form.type} onChange={set('type')}>{TYPES.map((g) => <option key={g}>{g}</option>)}</select>
                </div>
                <div>
                  <label htmlFor="f-time" className="field-label">Preferred time</label>
                  <select id="f-time" className="input" value={form.time} onChange={set('time')}>{TIMES.map((g) => <option key={g}>{g}</option>)}</select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-date" className="field-label">Preferred consultation date (optional)</label>
                  <input id="f-date" type="date" className="input" value={form.date} onChange={set('date')} min={new Date().toISOString().slice(0, 10)} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-msg" className="field-label">Anything we should know?</label>
                  <textarea id="f-msg" rows={4} className="input" value={form.message} onChange={set('message')} placeholder="Injuries, previous training, questions…" />
                </div>
                {state === 'error' && <p className="sm:col-span-2 text-sm text-red-400" role="alert">Something went wrong sending your request. Please try again, or WhatsApp us directly.</p>}
                <div className="sm:col-span-2">
                  <button type="submit" disabled={state === 'sending'} className="btn-primary w-full disabled:opacity-60 disabled:hover:translate-y-0">
                    {state === 'sending' ? 'Sending…' : 'Request My Consultation'}
                  </button>
                  <p className="text-xs text-muted mt-3 text-center">Your details go only to the FITX team. See our <a href="/privacy-policy" className="underline">privacy policy</a>.</p>
                </div>
              </form>
            </Reveal>
          )}

          <Reveal delay={120} className="space-y-5">
            <div className="card p-6">
              <h2 className="label">Prefer to talk now?</h2>
              <p className="mt-3 text-sm text-silver leading-relaxed">Call <a href={tel} className="text-paper font-semibold hover:text-brand">{BRAND.phoneDisplay}</a> during opening hours, or WhatsApp us any time.</p>
            </div>
            <div className="card p-6">
              <h2 className="label">What happens next</h2>
              <ol className="mt-3 space-y-2 text-sm text-silver list-decimal list-inside">
                <li>We contact you to fix a time.</li>
                <li>You visit, meet a coach, see the floor.</li>
                <li>We assess your goal & starting point.</li>
                <li>You decide — no pressure, no hard sell.</li>
              </ol>
            </div>
            <div className="card p-6">
              <h2 className="label">Studio hours</h2>
              <p className="mt-3 text-sm text-silver">{BRAND.hoursWeek}<br />{BRAND.hoursFriday}<br />Female hours: {BRAND.femaleHours.join(' & ')}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
