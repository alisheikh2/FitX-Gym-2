import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { useFetch } from '../../lib/hooks.js';
import { wa } from '../../lib/brand.js';
import { PageHero, SectionHead, CTASection, ReviewCard } from '../../components/site/blocks.jsx';

export default function WeightLoss() {
  const { data: testimonials } = useFetch('/testimonials');
  const quotes = (testimonials || []).filter((t) => t.kind === 'quote' && /weight|fat/i.test(t.text)).slice(0, 2);

  return (
    <>
      <Seo
        title="Weight Loss & Fat Loss Trainer in Sahiwal | FITX"
        description="Structured fat loss in Sahiwal with coach Arslan Ahmad (7 years experience): training plans, practical nutrition guidance and weekly tracking. No crash diets. Book a consultation at FITX."
        path="/weight-loss"
        image="/images/fitx/trainers/fitx-trainer-arslan-ahmad.webp"
      />
      <PageHero
        label="Weight Loss & Fat Loss"
        title="Lose fat. Keep the muscle. Keep it off."
        copy="Fat loss that survives contact with real life — structured training, eating guidance that fits Pakistani homes, and weekly measurement so nothing drifts silently."
        crumbs={[['Weight Loss', null]]}
        image="/images/fitx/trainers/fitx-trainer-arslan-ahmad.webp"
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
          <div>
            <SectionHead
              label="The program"
              title="Built by a fat-loss specialist, not a generic plan"
              copy="Arslan Ahmad has coached fat loss in Sahiwal for seven years. His members train on structured programs, follow practical nutrition direction, and check in weekly — the three things crash diets skip and real results require."
            />
            <Reveal delay={120}>
              <ul className="mt-8 space-y-3 text-sm sm:text-base text-silver">
                {['Training matched to your starting fitness — beginners welcome', 'Nutrition guidance around roti, salan, daal — not imported meal plans', 'Weekly measurements: weight trend, waist, photos, how clothes fit', 'A coach who notices when you drift, before you quit'].map((t) => (
                  <li key={t} className="flex gap-3"><span className="text-brand font-bold shrink-0">—</span>{t}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/trainers/arslan-ahmad" className="btn-primary btn-sm">Meet Arslan Ahmad</Link>
                <a href={wa('Hello FITX, I want to ask about the fat loss program.')} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">Ask About Fat Loss</a>
              </div>
            </Reveal>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Reveal className="img-zoom overflow-hidden border border-steel col-span-2">
              <img src="/images/fitx/results/fitx-transformation-01.webp" alt="Before and after fat loss transformation of a FITX member, privacy protected" width={900} height={980} loading="lazy" decoding="async" className="w-full object-cover" />
            </Reveal>
            <Reveal delay={80} className="img-zoom overflow-hidden border border-steel">
              <img src="/images/fitx/results/fitx-transformation-02.webp" alt="FITX member transformation result" width={800} height={800} loading="lazy" decoding="async" className="w-full aspect-square object-cover" />
            </Reveal>
            <Reveal delay={140} className="img-zoom overflow-hidden border border-steel">
              <img src="/images/fitx/results/fitx-transformation-03.webp" alt="FITX member fat loss before and after" width={800} height={800} loading="lazy" decoding="async" className="w-full aspect-square object-cover" />
            </Reveal>
          </div>
        </div>
        <Reveal className="shell mt-6"><p className="text-xs text-muted">Member results shared with privacy protected. Individual results vary with consistency, training and nutrition.</p></Reveal>
      </section>

      {quotes.length > 0 && (
        <section className="py-16 sm:py-20 bg-deep border-y border-steel/50">
          <div className="shell grid md:grid-cols-2 gap-5">
            {quotes.map((r, i) => <ReviewCard key={r._id} r={r} i={i} />)}
          </div>
        </section>
      )}

      <section className="py-16 sm:py-24">
        <div className="shell max-w-3xl">
          <SectionHead label="Honest expectations" title="What fat loss actually takes" />
          <Reveal delay={100}>
            <div className="mt-8 space-y-5 text-silver leading-relaxed text-base">
              <p>A realistic rate of fat loss is roughly 0.5–1% of body weight per week. Faster usually means muscle and water — and a rebound. We would rather show you a 12-week result you keep than a 4-week result you regain.</p>
              <p>That is why the program includes weekly check-ins: small drifts get corrected in week two, not discovered in month four. And why nutrition guidance is practical — portions and habits around the food your household already cooks.</p>
              <p>Want the deeper version? Read our guide: <Link to="/blog/weight-loss-vs-fat-loss" className="link-underline text-brand">Weight Loss vs Fat Loss — why the scale lies to you</Link>.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection title="The consultation costs nothing. Guessing costs months." copy="Sit down with a fat-loss coach, get your starting point measured and a realistic timeline — then decide." />
    </>
  );
}
