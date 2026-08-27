import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, CTABand, SectionHead } from '../../components/site/blocks.jsx';

export default function Nutrition() {
  return (
    <>
      <Seo
        title="Nutrition & Fitness Guidance for Sahiwal | FITX"
        description="Practical nutrition guidance from FITX Sahiwal's coaches: portions for Pakistani homes, protein on a budget, and the habits that move the scale."
        path="/nutrition"
        image="/images/fitx/fitx-coaching-education-session.webp"
      />
      <PageHero
        label="Nutrition"
        title="Guidance you can eat at home."
        copy="No superfoods. No detox teas. Just structure."
        image="/images/fitx/fitx-coaching-education-session.webp"
        crumbs={[['Nutrition', null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid md:grid-cols-3 gap-10">
          {[
            ['Rebuild the plate', 'Half vegetables, a quarter protein, a quarter roti or rice. Flip the ratio, change everything.'],
            ['Protein at every meal', 'Eggs, milk, dahi, daal, chicken — affordable, everyday, filling.'],
            ['Fix the silent calories', 'Sweet chai, cold drinks, “just one” snacks. Fix their frequency first.']
          ].map(([h, p], i) => (
            <Reveal key={h} delay={i * 80} className="border-t-2 border-brand/70 pt-5">
              <h2 className="font-display font-bold text-xl text-paper">{h}</h2>
              <p className="mt-2.5 text-sm text-silver leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="shell mt-14">
          <div className="border-l-2 border-brand pl-6 sm:pl-10 py-1">
            <p className="font-display font-bold text-xl sm:text-2xl text-paper leading-snug max-w-3xl">“Best nutrition is the balance of both.” — from our own education sessions.</p>
          </div>
        </Reveal>
      </section>

      <section className="py-16 bg-deep border-y border-steel/50">
        <div className="shell">
          <SectionHead label="Read deeper" title="Guides from our coaches." />
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {[
              ['/blog/nutrition-basics-for-fat-loss-pakistan', 'Nutrition basics for fat loss — eating like a Pakistani'],
              ['/blog/weight-loss-vs-fat-loss', 'Weight loss vs fat loss — why the scale lies'],
              ['/blog/common-gym-mistakes', '6 gym mistakes that stall progress'],
              ['/blog/how-to-choose-a-personal-trainer-in-sahiwal', 'How to choose a personal trainer in Sahiwal']
            ].map(([to, label]) => (
              <Reveal key={to}>
                <Link to={to} className="block border border-steel p-5 text-sm font-semibold text-silver hover:text-paper hover:border-brand transition-colors">→ {label}</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand image="/images/fitx/fitx-coaching-education-session.webp" title="Guidance works when it’s personal." copy="Nutrition direction is included with fat-loss and personal training." />
    </>
  );
}
