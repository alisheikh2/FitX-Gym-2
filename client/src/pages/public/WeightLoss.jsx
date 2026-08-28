import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { useFetch } from '../../lib/hooks.js';
import { wa } from '../../lib/brand.js';
import { PageHero, SectionHead, Quote, CallNow } from '../../components/site/blocks.jsx';

export default function WeightLoss() {
  const { data: testimonials } = useFetch('/testimonials');
  const quotes = (testimonials || []).filter((t) => t.kind === 'quote' && /weight|fat/i.test(t.text)).slice(0, 2);

  return (
    <>
      <Seo
        title="Weight Loss & Fat Loss Trainer in Sahiwal | FITX"
        description="Structured fat loss in Sahiwal with coach Arslan Ahmad (7 years experience): training plans, practical nutrition guidance and weekly tracking. Book a consultation at FITX."
        path="/weight-loss"
        image="/images/fitx/gen-progress-review.jpg"
      />
      <PageHero
        title="Weight Loss & Fat Loss"
        copy="Movement-based fat loss, divided over phases to cater to all levels — beginners to regular gym-goers looking for a shred."
        crumbs={[['What We Do', '/training'], ['Weight Loss', null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell">
          <Reveal>
            <div className="md:float-right md:ml-8 mb-6 md:mb-4 max-w-md overflow-hidden">
              <img src="/images/fitx/gen-progress-review.jpg" alt="FITX coach reviewing a client's progress" width={1600} height={900} loading="lazy" decoding="async" className="w-full aspect-[4/3] sm:aspect-[3/2] object-cover" />
            </div>
            <p className="text-[15px] sm:text-base text-silver leading-relaxed max-w-3xl">
              Fat loss at FITX is coached by Arslan Ahmad — seven years of experience in Sahiwal. Training is structured, nutrition is practical (built around the food your household actually cooks), and progress is measured weekly: weight trend, waist, photos, how clothes fit.
            </p>
            <p className="mt-4 text-[15px] sm:text-base text-silver leading-relaxed max-w-3xl">
              No crash diets. No punishment plans. A realistic rate of loss that protects muscle — and a coach who notices when you drift, before you quit.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 clear-both">
              <Link to="/trainers/arslan-ahmad" className="btn-primary">Meet Arslan Ahmad</Link>
              <a href={wa('Hello FITX, I want to ask about the fat loss program.')} target="_blank" rel="noopener noreferrer" className="btn-ghost">Ask About Fat Loss</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-deep border-y border-steel">
        <div className="shell max-w-4xl">
          <SectionHead label="How it works" title="Four phases. One direction." />
          <div className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {[
              ['Phase 1 — Assess', 'Starting point, movement quality, habits, schedule.'],
              ['Phase 2 — Build', 'Training you can repeat + nutrition that fits home food.'],
              ['Phase 3 — Accelerate', 'Progressive overload, weekly measurement, small corrections.'],
              ['Phase 4 — Keep', 'The habits that keep the weight off for good.']
            ].map(([h, p], i) => (
              <Reveal key={h} delay={i * 50} className="border-l-4 border-brand pl-5">
                <h3 className="font-display font-extrabold uppercase text-[15px] text-navy">{h}</h3>
                <p className="mt-1.5 text-sm text-silver leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {quotes.length > 0 && (
        <section className="py-16 sm:py-24">
          <div className="shell">
            <SectionHead center label="Client testimonials" title="In their words" />
            <div className="mt-12 grid md:grid-cols-2 gap-10">{quotes.map((r, i) => <Quote key={r._id} r={r} i={i} />)}</div>
          </div>
        </section>
      )}

      <CallNow />
    </>
  );
}
