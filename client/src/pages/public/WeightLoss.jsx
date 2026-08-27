import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { useFetch } from '../../lib/hooks.js';
import { wa } from '../../lib/brand.js';
import { PageHero, CTABand, SectionHead, Quote } from '../../components/site/blocks.jsx';

export default function WeightLoss() {
  const { data: testimonials } = useFetch('/testimonials');
  const quotes = (testimonials || []).filter((t) => t.kind === 'quote' && /weight|fat/i.test(t.text)).slice(0, 2);

  return (
    <>
      <Seo
        title="Weight Loss & Fat Loss Trainer in Sahiwal | FITX"
        description="Structured fat loss in Sahiwal with coach Arslan Ahmad (7 years experience): training plans, practical nutrition guidance and weekly tracking. Book a consultation at FITX."
        path="/weight-loss"
        image="/images/fitx/trainers/fitx-trainer-arslan-ahmad.webp"
      />
      <PageHero
        label="Weight loss & fat loss"
        title="Lose fat. Keep the muscle. Keep it off."
        copy="Structured training + eating guidance that fits Pakistani homes, measured weekly."
        image="/images/fitx/trainers/fitx-trainer-arslan-ahmad.webp"
        crumbs={[['Weight Loss', null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead label="The program" title="Built by a fat-loss specialist." copy="Arslan Ahmad — seven years coaching fat loss in Sahiwal." />
            <Reveal delay={80}>
              <ul className="mt-7 space-y-3 text-sm sm:text-base text-silver">
                {['Training matched to your starting fitness', 'Nutrition around roti, salan, daal — not imported plans', 'Weekly measurements: trend, not daily noise'].map((t) => (
                  <li key={t} className="flex gap-3"><span className="text-brand font-bold shrink-0">—</span>{t}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/trainers/arslan-ahmad" className="btn-primary btn-sm">Meet Arslan Ahmad</Link>
                <a href={wa('Hello FITX, I want to ask about the fat loss program.')} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">Ask About Fat Loss</a>
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Reveal className="col-span-2 overflow-hidden">
              <img src="/images/fitx/results/fitx-transformation-01.webp" alt="Before and after fat loss transformation of a FITX member, privacy protected" width={900} height={980} loading="lazy" decoding="async" className="w-full object-cover" />
            </Reveal>
            <Reveal delay={60} className="overflow-hidden">
              <img src="/images/fitx/results/fitx-transformation-02.webp" alt="FITX member transformation result" width={800} height={800} loading="lazy" decoding="async" className="w-full aspect-square object-cover" />
            </Reveal>
            <Reveal delay={120} className="overflow-hidden">
              <img src="/images/fitx/results/fitx-transformation-03.webp" alt="FITX member fat loss before and after" width={800} height={800} loading="lazy" decoding="async" className="w-full aspect-square object-cover" />
            </Reveal>
          </div>
        </div>
        <Reveal className="shell mt-6"><p className="text-xs text-muted">Shared with clients’ privacy protected. Results vary with consistency.</p></Reveal>
      </section>

      {quotes.length > 0 && (
        <section className="py-16 bg-deep border-y border-steel/50">
          <div className="shell grid md:grid-cols-2 gap-10">{quotes.map((r, i) => <Quote key={r._id} r={r} i={i} />)}</div>
        </section>
      )}

      <CTABand image="/images/fitx/facility/fitx-ropes-red.webp" title="The consultation costs nothing. Guessing costs months." copy="Get measured, get a realistic timeline, then decide." />
    </>
  );
}
