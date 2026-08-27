import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import { wa } from '../../lib/brand.js';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, SectionHead, CTASection } from '../../components/site/blocks.jsx';

export default function Programs() {
  const { data: plans, loading } = useFetch('/plans');
  const { data: programs } = useFetch('/programs');

  const group = (plans || []).filter((p) => /group/i.test(p.name));
  const one = (plans || []).filter((p) => /one/i.test(p.name));

  return (
    <>
      <Seo
        title="Membership & Personal Training Pricing in Sahiwal | FITX"
        description="FITX Sahiwal programs and published rates: Group Session Rs 8,500/month, One-to-One Rs 16,000/month, 3-month plans with 10% off. Compare and book a consultation."
        path="/programs"
        image="/images/fitx/trainers/fitx-founder-training-session.webp"
      />
      <PageHero
        label="Membership & Programs"
        title="Clear programs. Published rates. No surprises."
        copy="Choose coached group training or one-to-one personal training. Rates below are FITX’s published fee pattern — confirm current availability at the studio."
        crumbs={[['Membership', null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            ['Group Sessions', group, 'Coach-led group training on the studio floor — structure and supervision with group energy.', '/personal-training'],
            ['One-to-One Sessions', one, 'Personal training: an individual program, coached one-to-one, with progress tracking and nutrition direction.', '/personal-training']
          ].map(([title, items, desc, link], idx) => (
            <Reveal key={title} delay={idx * 100}>
              <div className={`card p-8 sm:p-10 h-full flex flex-col ${idx === 1 ? 'border-brand/60' : ''}`}>
                {idx === 1 && <p className="label mb-3">Most chosen</p>}
                <h2 className="font-display font-bold text-2xl text-paper">{title}</h2>
                <p className="text-sm text-silver mt-3 leading-relaxed">{desc}</p>
                <div className="mt-8 space-y-6 flex-1">
                  {(items.length ? items : [{ name: '—', price: null }]).map((p) => (
                    <div key={p._id || p.name} className="flex items-end justify-between gap-4 border-b border-steel pb-5">
                      <div>
                        <p className="font-semibold text-paper">{p.durationMonths === 3 ? '3 Months' : '1 Month'}</p>
                        {p.durationMonths === 3 && <p className="text-xs text-brand mt-1">10% off</p>}
                      </div>
                      <p className="font-display font-bold text-3xl text-paper">
                        {p.price != null ? <>Rs {p.price.toLocaleString()}</> : '—'}
                        <span className="text-sm text-muted font-body font-normal"> /{p.durationMonths === 3 ? '3 mo' : 'mo'}</span>
                      </p>
                    </div>
                  ))}
                </div>
                <ul className="mt-6 space-y-2 text-sm text-silver">
                  {((items[0] || {}).includedServices || []).map((s) => <li key={s} className="flex gap-2"><span className="text-brand">✓</span>{s}</li>)}
                </ul>
                <Link to="/book-consultation" className={`${idx === 1 ? 'btn-primary' : 'btn-ghost'} w-full mt-8`}>Start With a Consultation</Link>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="shell mt-8 max-w-3xl mx-auto">
          <p className="text-xs text-muted text-center">Rates from FITX’s published fee pattern. Contact the studio to confirm current availability, women’s-hour plans and seasonal offers. <a className="link-underline text-silver" href={wa('Hello FITX, please share current program availability and pricing.')} target="_blank" rel="noopener noreferrer">Ask on WhatsApp</a>.</p>
        </Reveal>
      </section>

      <section className="py-16 bg-deep border-y border-steel/50">
        <div className="shell">
          <SectionHead label="All programs" title="Five ways to train at FITX" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(programs || []).map((p, i) => (
              <Reveal key={p.slug} delay={i * 60} className="h-full">
                <Link to={p.slug === 'personal-training' ? '/personal-training' : p.slug === 'weight-loss-fat-loss' ? '/weight-loss' : p.slug === 'strength-conditioning' ? '/strength-conditioning' : p.slug === 'womens-performance' ? '/womens-fitness' : '/book-consultation'} className="card h-full p-6 block hover:border-brand/60 transition-colors">
                  <h3 className="font-display font-bold text-lg text-paper">{p.name}</h3>
                  <p className="text-sm text-silver mt-2 leading-relaxed">{p.tagline}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
