import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import { wa } from '../../lib/brand.js';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, CTABand, SectionHead } from '../../components/site/blocks.jsx';

export default function Programs() {
  const { data: plans } = useFetch('/plans');
  const group = (plans || []).filter((p) => /group/i.test(p.name));
  const one = (plans || []).filter((p) => /one/i.test(p.name));

  return (
    <>
      <Seo
        title="Membership & Personal Training Pricing in Sahiwal | FITX"
        description="FITX Sahiwal programs and published rates: Group Session Rs 8,500/month, One-to-One Rs 16,000/month, 3-month plans with 10% off. Book a consultation."
        path="/programs"
        image="/images/fitx/facility/fitx-facility-floor-02.webp"
      />
      <PageHero
        label="Membership"
        title="Clear programs. Published rates."
        copy="Coached group training or one-to-one personal training."
        image="/images/fitx/facility/fitx-facility-floor-02.webp"
        crumbs={[['Membership', null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            ['Group Sessions', group, 'Coach-led training on the floor — structure and supervision with group energy.', false],
            ['One-to-One Sessions', one, 'An individual program, coached one-to-one, tracked session to session.', true]
          ].map(([title, items, desc, featured], idx) => (
            <Reveal key={title} delay={idx * 90}>
              <div className={`h-full p-8 sm:p-10 border ${featured ? 'border-brand/70 bg-graphite' : 'border-steel bg-deep'}`}>
                {featured && <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand mb-3">Most chosen</p>}
                <h2 className="font-display font-bold text-2xl text-paper">{title}</h2>
                <p className="text-sm text-silver mt-2">{desc}</p>
                <div className="mt-8 space-y-5">
                  {(items.length ? items : [{ price: null, durationMonths: 1 }]).map((p) => (
                    <div key={p._id || p.name} className="flex items-end justify-between gap-4 border-b border-steel pb-4">
                      <div>
                        <p className="font-semibold text-paper">{p.durationMonths === 3 ? '3 Months' : '1 Month'}</p>
                        {p.durationMonths === 3 && <p className="text-xs text-brand mt-0.5">10% off</p>}
                      </div>
                      <p className="font-display font-bold text-3xl text-paper">
                        {p.price != null ? <>Rs {p.price.toLocaleString()}</> : '—'}
                      </p>
                    </div>
                  ))}
                </div>
                <Link to="/book-consultation" className={`${featured ? 'btn-primary' : 'btn-ghost'} w-full mt-8`}>Start With a Consultation</Link>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="shell mt-6 max-w-3xl mx-auto">
          <p className="text-xs text-muted text-center">Published fee pattern. Confirm current availability: <a className="underline" href={wa('Hello FITX, please share current program availability and pricing.')} target="_blank" rel="noopener noreferrer">ask on WhatsApp</a>.</p>
        </Reveal>
      </section>

      <section className="py-16 bg-deep border-y border-steel/50">
        <div className="shell grid md:grid-cols-2 gap-5">
          
          
          <Reveal delay={100} className="overflow-hidden md:col-span-2">
            <figure className="grid sm:grid-cols-2 gap-5">
              <div>
                <img src="/images/fitx/programs/fitx-fee-pattern-female.webp" alt="Official FITX fee pattern with female timings" width={900} height={1273} loading="lazy" decoding="async" className="w-full object-cover" />
                <figcaption className="mt-2.5 text-xs text-silver">Official fee pattern — female timings.</figcaption>
              </div>
              <div>
                <img src="/images/fitx/programs/fitx-fee-pattern-male.webp" alt="Official FITX fee pattern with male slots" width={900} height={1273} loading="lazy" decoding="async" className="w-full object-cover" />
                <figcaption className="mt-2.5 text-xs text-silver">Official fee pattern — male slots.</figcaption>
              </div>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="py-16 bg-deep">
        <div className="shell">
          <SectionHead label="All programs" title="Five ways to train." />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              ['Personal Training', '/personal-training'],
              ['Weight Loss', '/weight-loss'],
              ['Strength', '/strength-conditioning'],
              ['Women’s', '/womens-fitness'],
              ['Group', '/book-consultation']
            ].map(([l, to], i) => (
              <Reveal key={l} delay={i * 50}>
                <Link to={to} className="block border border-steel p-5 text-center font-display font-bold text-paper hover:border-brand hover:text-brand transition-colors">{l}</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand image="/images/fitx/programs/fitx-group-session-class.webp" title="Not sure which one?" copy="The consultation decides it — free." />
    </>
  );
}
