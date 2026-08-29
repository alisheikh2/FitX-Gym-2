import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { wa } from '../../lib/brand.js';

const GOALS = ['Lose Fat', 'Build Muscle', 'Gain Healthy Weight', 'Improve Fitness', 'Body Recomposition', 'Maintain Current Shape'];
const ACTIVITY = [
  ['sedentary', 'Mostly desk / little exercise', 1.2],
  ['light', 'Light activity 1–3 days/week', 1.375],
  ['moderate', 'Training 3–5 days/week', 1.55],
  ['active', 'Hard training 6–7 days/week', 1.725],
  ['athlete', 'Physical job + daily training', 1.9]
];

const cm2ftin = (cm) => {
  const totalIn = cm / 2.54;
  return { ft: Math.floor(totalIn / 12), inch: Math.round(totalIn % 12) };
};

export default function BodyAssessment() {
  const [step, setStep] = useState(0);
  const [units, setUnits] = useState('metric');
  const [f, setF] = useState({
    age: '', gender: '', activity: 'light', goal: 'Lose Fat',
    height: '', weight: '', waist: '', neck: '', hip: ''
  });
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const female = f.gender === 'female';

  function validateStep(s) {
    const e = {};
    const num = (v) => parseFloat(v);
    if (s === 0) {
      const age = num(f.age);
      if (!f.age || isNaN(age) || age < 12 || age > 90) e.age = 'Enter an age between 12 and 90';
      if (!f.gender) e.gender = 'Select an option, it changes the formulas used';
    }
    if (s === 1) {
      const h = num(f.height), w = num(f.weight), waist = num(f.waist), neck = num(f.neck), hip = num(f.hip);
      if (units === 'metric') {
        if (!h || h < 120 || h > 220) e.height = 'Height in cm (120–220)';
        if (!w || w < 30 || w > 250) e.weight = 'Weight in kg (30–250)';
        if (!waist || waist < 40 || waist > 200) e.waist = 'Waist in cm';
        if (!neck || neck < 20 || neck < 15 || neck > 70) e.neck = 'Neck in cm';
        if (female && (!hip || hip < 40 || hip > 200)) e.hip = 'Hip in cm (needed for the female formula)';
      } else {
        if (!h || h < 48 || h > 87) e.height = 'Height in inches (4’0"–7’3")';
        if (!w || w < 66 || w > 550) e.weight = 'Weight in lb';
        if (!waist || waist < 16 || waist > 79) e.waist = 'Waist in inches';
        if (!neck || neck < 6 || neck > 28) e.neck = 'Neck in inches';
        if (female && (!hip || hip < 16 || hip > 79)) e.hip = 'Hip in inches';
      }
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function toMetric() {
    const n = (v) => parseFloat(v) || 0;
    return {
      height: units === 'metric' ? n(f.height) : n(f.height) * 2.54,
      weight: units === 'metric' ? n(f.weight) : n(f.weight) * 0.453592,
      waist: units === 'metric' ? n(f.waist) : n(f.waist) * 2.54,
      neck: units === 'metric' ? n(f.neck) : n(f.neck) * 2.54,
      hip: units === 'metric' ? n(f.hip) : n(f.hip) * 2.54
    };
  }

  function calculate() {
    if (!validateStep(0) ) { setStep(0); return; }
    if (!validateStep(1)) return;
    const age = parseFloat(f.age);
    const { height, weight, waist, neck, hip } = toMetric();
    const m = height / 100;
    const bmi = weight / (m * m);
    const bmiCat = bmi < 18.5 ? 'Underweight range' : bmi < 25 ? 'Healthy range' : bmi < 30 ? 'Overweight range' : 'Obese range';
    const bmr = female ? 10 * weight + 6.25 * height - 5 * age - 161 : 10 * weight + 6.25 * height - 5 * age + 5;
    const factor = ACTIVITY.find(([k]) => k === f.activity)?.[2] ?? 1.375;
    const tdee = bmr * factor;
    // U.S. Navy circumference method
    let bf = null;
    if (female) {
      if (waist + hip - neck > 0) bf = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
    } else if (waist - neck > 0) {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
    }
    bf = bf === null ? null : Math.min(Math.max(bf, 3), 60);
    const fatMass = bf !== null ? (weight * bf) / 100 : null;
    const leanMass = fatMass !== null ? weight - fatMass : null;
    const water = leanMass !== null ? ((leanMass * 0.73) / weight) * 100 : null;
    const healthyLow = 18.5 * m * m;
    const healthyHigh = 24.9 * m * m;
    setResult({ bmi, bmiCat, bmr, tdee, bf, fatMass, leanMass, water, weight, healthyLow, healthyHigh });
    window.setTimeout(() => {
      const el = document.getElementById('results');
      if (el && typeof el.scrollIntoView === 'function') el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }

  const focusTips = useMemo(() => ({
    'Lose Fat': ['A modest calorie deficit with protein at every meal', 'Resistance training 3–4×/week to protect muscle', 'Weekly measurement, trend, not daily scale noise'],
    'Build Muscle': ['Progressive overload on the core lifts', 'A small calorie surplus with adequate protein', 'Recovery: sleep and rest days are training too'],
    'Gain Healthy Weight': ['Calorie surplus from real meals, not just fried food', 'Strength training so the weight arrives as muscle', 'Consistent meal timing across the week'],
    'Improve Fitness': ['Mix of strength work and conditioning', 'A sustainable weekly rhythm you can keep', 'Technique first, capacity follows'],
    'Body Recomposition': ['Strength training with a slight deficit or maintenance', 'High protein, structured meals', 'Patience: recomp is slower, steadier work'],
    'Maintain Current Shape': ['A repeatable training schedule', 'Habits that survive weddings, eids and travel', 'Monthly check-ins to catch drift early']
  }), []);

  const u = units === 'metric' ? { h: 'cm', w: 'kg', c: 'cm' } : { h: 'inches', w: 'lb', c: 'inches' };

  return (
    <>
      <Seo
        title="Free Body Composition Assessment, BMI, Body Fat & TDEE | FITX Sahiwal"
        description="Take FITX's free body composition assessment: BMI, BMR, TDEE, estimated body fat, lean mass and a healthy target range, then see how FITX coaching gets you there. No account needed."
        path="/body-assessment"
      />
      <section className="pt-32 sm:pt-40 pb-10 sm:pb-14">
        <div className="shell max-w-3xl">
          <Reveal>
            <p className="label flex items-center gap-3"><span className="divider-x" aria-hidden="true" />Free · No account needed</p>
            <h1 className="h-display text-4xl sm:text-5xl mt-4 text-paper">Know your body. Understand your goal.</h1>
            <p className="mt-4 text-silver leading-relaxed">Where am I now? Where should I aim? What should I focus on? Two minutes of inputs, a clear picture of your starting point, and how FITX helps you get where you’re going.</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16 sm:pb-24">
        <div className="shell max-w-3xl">
          <Reveal>
            <div className="card p-6 sm:p-10">
              {/* progress */}
              <div className="flex items-center gap-2 mb-8" aria-label={`Step ${step + 1} of 2`}>
                {['About you', 'Measurements'].map((label, i) => (
                  <div key={label} className="flex-1">
                    <div className={`h-1 ${i <= step ? 'bg-brand' : 'bg-steel'}`} />
                    <p className={`mt-2 text-[11px] uppercase tracking-wider font-semibold ${i <= step ? 'text-brand' : 'text-muted'}`}>{i + 1}. {label}</p>
                  </div>
                ))}
                <div className="flex-1">
                  <div className={`h-1 ${result ? 'bg-brand' : 'bg-steel'}`} />
                  <p className={`mt-2 text-[11px] uppercase tracking-wider font-semibold ${result ? 'text-brand' : 'text-muted'}`}>3. Results</p>
                </div>
              </div>

              {step === 0 && (
                <div className="grid sm:grid-cols-2 gap-5 animate-fade-up">
                  <div>
                    <label className="field-label" htmlFor="ba-age">Age *</label>
                    <input id="ba-age" inputMode="numeric" className={`input ${errors.age ? 'input-err' : ''}`} value={f.age} onChange={set('age')} placeholder="e.g. 27" />
                    {errors.age && <p className="text-xs text-red-400 mt-1">{errors.age}</p>}
                  </div>
                  <div>
                    <span className="field-label">Gender *</span>
                    <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="Gender">
                      {[['male', 'Male'], ['female', 'Female']].map(([v, l]) => (
                        <button key={v} type="button" role="radio" aria-checked={f.gender === v} onClick={() => setF({ ...f, gender: v })} className={`px-4 py-3 text-sm border transition-colors ${f.gender === v ? 'border-brand bg-brand/10 text-brand font-semibold' : 'border-steel text-silver hover:border-silver'}`}>{l}</button>
                      ))}
                    </div>
                    {errors.gender && <p className="text-xs text-red-400 mt-1">{errors.gender}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className="field-label" htmlFor="ba-act">Activity level</label>
                    <select id="ba-act" className="input" value={f.activity} onChange={set('activity')}>
                      {ACTIVITY.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="field-label">Primary goal</span>
                    <div className="flex flex-wrap gap-2">
                      {GOALS.map((g) => (
                        <button key={g} type="button" onClick={() => setF({ ...f, goal: g })} className={`px-4 py-2.5 text-sm border transition-colors ${f.goal === g ? 'border-brand bg-brand/10 text-brand font-semibold' : 'border-steel text-silver hover:border-silver'}`}>{g}</button>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2 flex justify-end">
                    <button className="btn-primary" onClick={() => validateStep(0) && setStep(1)}>Next →</button>
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="animate-fade-up">
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-sm text-muted">Measure at home with a tape measure, relaxed, not sucked in.</p>
                    <div className="grid grid-cols-2 gap-1 border border-steel p-1" role="radiogroup" aria-label="Units">
                      {['metric', 'imperial'].map((un) => (
                        <button key={un} type="button" role="radio" aria-checked={units === un} onClick={() => setUnits(un)} className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider ${units === un ? 'bg-brand text-obsidian' : 'text-muted hover:text-silver'}`}>{un}</button>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FieldErr err={errors.height} label={`Height (${u.h}) *`}>
                      <input className={`input ${errors.height ? 'input-err' : ''}`} id="ba-height" inputMode="decimal" value={f.height} onChange={set('height')} placeholder={units === 'metric' ? 'e.g. 170' : 'e.g. 67'} />
                    </FieldErr>
                    <FieldErr err={errors.weight} label={`Weight (${u.w}) *`}>
                      <input className={`input ${errors.weight ? 'input-err' : ''}`} id="ba-weight" inputMode="decimal" value={f.weight} onChange={set('weight')} placeholder={units === 'metric' ? 'e.g. 72' : 'e.g. 160'} />
                    </FieldErr>
                    <FieldErr err={errors.waist} label={`Waist (${u.c}) *`} hint="At the navel, after breathing out">
                      <input className={`input ${errors.waist ? 'input-err' : ''}`} id="ba-waist" inputMode="decimal" value={f.waist} onChange={set('waist')} placeholder={units === 'metric' ? 'e.g. 86' : 'e.g. 34'} />
                    </FieldErr>
                    <FieldErr err={errors.neck} label={`Neck (${u.c}) *`} hint="Below the larynx, sloping down">
                      <input className={`input ${errors.neck ? 'input-err' : ''}`} id="ba-neck" inputMode="decimal" value={f.neck} onChange={set('neck')} placeholder={units === 'metric' ? 'e.g. 37' : 'e.g. 15'} />
                    </FieldErr>
                    {female && (
                      <FieldErr err={errors.hip} label={`Hip (${u.c}) *`} hint="Widest point">
                        <input className={`input ${errors.hip ? 'input-err' : ''}`} id="ba-hip" inputMode="decimal" value={f.hip} onChange={set('hip')} placeholder={units === 'metric' ? 'e.g. 100' : 'e.g. 40'} />
                      </FieldErr>
                    )}
                  </div>
                  <div className="mt-7 flex justify-between">
                    <button className="btn-ghost" onClick={() => setStep(0)}>← Back</button>
                    <button className="btn-primary" onClick={calculate}>Calculate My Results</button>
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {result && <Results r={result} f={f} female={female} units={units} tips={focusTips[f.goal]} />}
        </div>
      </section>
    </>
  );
}

function FieldErr({ label, err, hint, children }) {
  return (
    <div>
      <span className="field-label">{label}</span>
      {children}
      {hint && !err && <p className="text-[11px] text-muted mt-1">{hint}</p>}
      {err && <p className="text-xs text-red-400 mt-1">{err}</p>}
    </div>
  );
}

/* ---------------- results dashboard ---------------- */

function Results({ r, f, female, units, tips }) {
  const kg = (v) => units === 'metric' ? `${round1(v)} kg` : `${round1(v * 2.20462)} lb`;
  const gaugePos = Math.min(Math.max((r.bmi - 15) / (40 - 15), 0), 1);
  const bfPos = r.bf !== null ? Math.min(Math.max(r.bf / 50, 0), 1) : 0;

  return (
    <div id="results" className="mt-10 space-y-8 animate-fade-up">
      {/* CURRENT -> IDEAL -> FUTURE */}
      <Reveal>
        <div className="grid md:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 items-stretch">
          <div className="card p-6 border-t-2 border-t-steel">
            <p className="label !text-muted">Current</p>
            <p className="font-display font-bold text-3xl text-paper mt-2">{kg(r.weight)}</p>
            <p className="text-sm text-silver mt-1">BMI {round1(r.bmi)} · {r.bmiCat}</p>
            {r.bf !== null && <p className="text-sm text-silver">Est. body fat {round1(r.bf)}%</p>}
          </div>
          <Arrow />
          <div className="card p-6 border-t-2 border-t-brand">
            <p className="label">Ideal direction</p>
            <p className="font-display font-bold text-2xl text-paper mt-2">{kg(r.healthyLow)} – {kg(r.healthyHigh)}</p>
            <p className="text-sm text-silver mt-1">Healthy BMI range for your height, a direction, not a deadline.</p>
          </div>
          <Arrow />
          <div className="card p-6 border-t-2 border-t-brand-soft">
            <p className="label !text-silver">Future</p>
            <ul className="mt-3 space-y-1.5">
              {['Stronger', 'Leaner', 'Fitter', 'More confident'].map((t) => <li key={t} className="font-display font-bold text-lg text-paper">↑ {t}</li>)}
            </ul>
          </div>
        </div>
      </Reveal>

      {/* metric cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card title="BMI" big={round1(r.bmi)} sub={r.bmiCat}>
          <BmiGauge pos={gaugePos} />
        </Card>
        <Card title="Est. body fat" big={r.bf !== null ? `${round1(r.bf)}%` : ','} sub={female ? 'U.S. Navy method (est.)' : 'U.S. Navy method (est.)'}>
          {r.bf !== null && <Ring pos={bfPos} />}
        </Card>
        <Card title="BMR" big={`${Math.round(r.bmr).toLocaleString()}`} sub="kcal/day at rest" />
        <Card title="Est. daily needs (TDEE)" big={`${Math.round(r.tdee).toLocaleString()}`} sub="kcal/day at your activity level" />
        <Card title="Est. fat mass" big={r.fatMass !== null ? kg(r.fatMass) : ','} sub="estimate" />
        <Card title="Est. lean mass" big={r.leanMass !== null ? kg(r.leanMass) : ','} sub="muscle, bone, water" />
        <Card title="Est. body water" big={r.water !== null ? `${round1(r.water)}%` : ','} sub="derived from lean mass" />
        <Card title="Current weight" big={kg(r.weight)} sub={`healthy range ${kg(r.healthyLow)} – ${kg(r.healthyHigh)}`}>
          <RangeBar low={r.healthyLow} high={r.healthyHigh} current={r.weight} />
        </Card>
      </div>

      {/* focus + fitx */}
      <div className="grid md:grid-cols-2 gap-6">
        <Reveal className="card p-7">
          <h2 className="font-display font-bold text-xl text-paper">What to focus on, {f.goal}</h2>
          <ul className="mt-4 space-y-3">
            {tips.map((t) => <li key={t} className="text-sm text-silver flex gap-3"><span className="text-brand font-bold">•</span>{t}</li>)}
          </ul>
        </Reveal>
        <Reveal delay={80} className="card p-7 border-brand/40">
          <h2 className="font-display font-bold text-xl text-paper">How FITX gets you there</h2>
          <p className="mt-3 text-sm text-silver leading-relaxed">Numbers are a starting point, not a program. At the studio we measure properly, write your training plan, and track progress weekly, so the direction becomes a result.</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link to="/book-consultation" className="btn-primary btn-sm">Book a Free Consultation</Link>
            <a href={wa('Hello FITX, I just did the body assessment and want to discuss my results.')} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">Discuss My Results</a>
          </div>
        </Reveal>
      </div>

      <Reveal>
        <p className="text-xs text-muted leading-relaxed border-l-2 border-steel pl-4">
          These results are estimates based on the information provided. BMI is a screening measure, not a complete measurement of health or body composition. An in-studio FITX assessment can provide a more accurate evaluation. This tool does not provide medical advice, consult a physician before beginning any training program if you have a medical condition.
        </p>
      </Reveal>
    </div>
  );
}

function Arrow() {
  return <div className="hidden md:flex items-center text-brand text-2xl" aria-hidden="true">→</div>;
}

function Card({ title, big, sub, children }) {
  return (
    <div className="card p-5">
      <p className="text-[11px] uppercase tracking-wider text-muted font-semibold">{title}</p>
      <p className="font-display font-bold text-2xl text-paper mt-1.5">{big}</p>
      {sub && <p className="text-[11px] text-muted mt-1">{sub}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}

function BmiGauge({ pos }) {
  const angle = Math.PI * (1 - pos);
  const cx = 50 + 42 * Math.cos(angle);
  const cy = 50 - 42 * Math.sin(angle);
  return (
    <svg viewBox="0 0 100 54" className="w-full" aria-hidden="true">
      <path d="M8 50 A42 42 0 0 1 92 50" fill="none" stroke="#202020" strokeWidth="7" strokeLinecap="round" />
      <path d="M8 50 A42 42 0 0 1 35 12" fill="none" stroke="#8a8a8a" strokeWidth="7" strokeLinecap="round" opacity="0.5" />
      <path d="M35 12 A42 42 0 0 1 68 13" fill="none" stroke="#F59A00" strokeWidth="7" strokeLinecap="round" />
      <path d="M68 13 A42 42 0 0 1 92 50" fill="none" stroke="#d97700" strokeWidth="7" strokeLinecap="round" opacity="0.6" />
      <circle cx={cx} cy={cy} r="4.5" fill="#fff" stroke="#080808" strokeWidth="1.5" />
    </svg>
  );
}

function Ring({ pos }) {
  const C = 2 * Math.PI * 16;
  return (
    <svg viewBox="0 0 40 40" className="w-14" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="none" stroke="#202020" strokeWidth="5" />
      <circle cx="20" cy="20" r="16" fill="none" stroke="#F59A00" strokeWidth="5" strokeDasharray={`${pos * C} ${C}`} strokeLinecap="round" transform="rotate(-90 20 20)" />
    </svg>
  );
}

function RangeBar({ low, high, current }) {
  const min = low * 0.85;
  const max = high * 1.2;
  const pos = Math.min(Math.max((current - min) / (max - min), 0), 1) * 100;
  const lo = ((low - min) / (max - min)) * 100;
  const hi = ((high - min) / (max - min)) * 100;
  return (
    <div className="relative h-2 bg-steel w-full" aria-hidden="true">
      <div className="absolute h-2 bg-brand/50" style={{ left: `${lo}%`, width: `${hi - lo}%` }} />
      <div className="absolute -top-1 h-4 w-1 bg-white" style={{ left: `calc(${pos}% - 1px)` }} />
    </div>
  );
}

function round1(v) { return Math.round(v * 10) / 10; }
