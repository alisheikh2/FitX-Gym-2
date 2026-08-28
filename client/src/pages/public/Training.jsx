import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, CallNow } from '../../components/site/blocks.jsx';

const PILLS = [
  ['Personal Training', '/personal-training'],
  ['Weight Loss & Fat Loss', '/weight-loss'],
  ['Strength & Conditioning', '/strength-conditioning'],
  ['Women’s Performance', '/womens-fitness'],
  ['Group Sessions', '/programs'],
  ['Nutrition Guidance', '/nutrition']
];

export default function Training() {
  return (
    <>
      <Seo
        title="What We Do, Personal Training, Fat Loss, Strength | FITX Sahiwal"
        description="FITX Sahiwal programs: one-to-one personal training, weight loss & fat loss, strength & conditioning, women's performance, group sessions and nutrition guidance."
        path="/training"
      />
      <PageHero title="What We Do" crumbs={[['What We Do', null]]} />

      {/* reference: centered stacked pills with thin dividers */}
      <section className="py-16 sm:py-24">
        <div className="shell max-w-5xl">
          <ul>
            {PILLS.map(([label, to], i) => (
              <Reveal key={to} as="li" delay={i * 50}>
                <div className={`flex justify-center py-8 ${i > 0 ? 'border-t border-steel' : ''}`}>
                  <Link to={to} className="btn-primary">{label}</Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CallNow />
    </>
  );
}
