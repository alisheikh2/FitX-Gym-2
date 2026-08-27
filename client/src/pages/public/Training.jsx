import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, CallNow } from '../../components/site/blocks.jsx';

const ITEMS = [
  ['Personal Training', '/personal-training', 'One-to-one coaching — assessed, programmed, tracked.'],
  ['Weight Loss & Fat Loss', '/weight-loss', 'Movement-based fat loss over four phases, all levels.'],
  ['Strength & Conditioning', '/strength-conditioning', 'Barbell fundamentals, progressive loading, sport prep.'],
  ['Women’s Performance', '/womens-fitness', 'Dedicated female hours with coach Iqra Zahid.'],
  ['Group Sessions', '/programs', 'Coach-led group training — structure with energy.'],
  ['Nutrition Guidance', '/nutrition', 'Practical nutrition that fits Pakistani homes.']
];

export default function Training() {
  return (
    <>
      <Seo
        title="What We Do — Personal Training, Fat Loss, Strength | FITX Sahiwal"
        description="FITX Sahiwal programs: one-to-one personal training, weight loss & fat loss, strength & conditioning, women's performance, group sessions and nutrition guidance."
        path="/training"
      />
      <PageHero title="What We Do" copy="Every program starts with an assessment and ends with results you can measure." crumbs={[['What We Do', null]]} />

      <section className="py-16 sm:py-20">
        <div className="shell max-w-4xl">
          <ul className="divide-y divide-steel border-y border-steel">
            {ITEMS.map(([name, to, sub], i) => (
              <Reveal key={to} as="li" delay={i * 40}>
                <Link to={to} className="group flex flex-wrap items-baseline justify-between gap-2 py-6">
                  <span className="font-display font-extrabold uppercase text-xl sm:text-2xl text-navy group-hover:text-brand transition-colors">{name}</span>
                  <span className="text-sm text-silver">{sub}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CallNow />
    </>
  );
}
