import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, SectionHead, CTASection } from '../../components/site/blocks.jsx';

export default function Nutrition() {
  return (
    <>
      <Seo
        title="Nutrition & Fitness Guidance for Sahiwal | FITX"
        description="Practical nutrition and training guidance from FITX Sahiwal's coaches: portions for Pakistani homes, protein on a budget, and the habits that actually move the scale."
        path="/nutrition"
        image="/images/fitx/fitx-coaching-education-session.webp"
      />
      <PageHero
        label="Nutrition & Guidance"
        title="Guidance you can eat at home."
        copy="No imported superfoods, no detox teas. The nutrition principles our coaches use with members — built around Pakistani kitchens."
        crumbs={[['Nutrition', null]]}
        image="/images/fitx/fitx-coaching-education-session.webp"
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-3 gap-8">
          {[
            ['Rebuild the plate', 'Half vegetables or salad, a quarter protein, a quarter roti or rice. Most home meals are the reverse — flipping the ratio changes everything without changing your cuisine.'],
            ['Protein at every meal', 'Eggs, milk, dahi, daal, chicken — affordable everyday proteins that keep you full and protect muscle while fat leaves.'],
            ['Fix the silent calories', 'Sweet chai, cold drinks and “just one” fried snacks stall more fat loss than any meal. Fix their frequency first.']
          ].map(([h, p], i) => (
            <Reveal key={h} delay={i * 80} className="border-t-2 border-brand pt-5">
              <h2 className="font-display font-bold text-xl text-paper">{h}</h2>
              <p className="mt-3 text-sm text-silver leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="shell mt-12">
          <div className="card p-7 sm:p-9">
            <p className="label">Our rule</p>
            <p className="mt-3 font-display text-lg sm:text-2xl text-paper leading-snug max-w-3xl">“Best nutrition is the balance of both” — the slide from our own education sessions. Restriction that ignores your life fails; structure that respects it works.</p>
          </div>
        </Reveal>
      </section>

      <section className="py-16 bg-deep border-y border-steel/50">
        <div className="shell">
          <SectionHead label="Read deeper" title="Guides from our coaches" />
          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {[
              ['/blog/nutrition-basics-for-fat-loss-pakistan', 'Nutrition Basics for Fat Loss — eating like a Pakistani, not like a diet ad'],
              ['/blog/weight-loss-vs-fat-loss', 'Weight Loss vs Fat Loss — why the scale lies to you'],
              ['/blog/common-gym-mistakes', 'The 6 gym mistakes that keep you at the same weight'],
              ['/blog/how-to-stay-consistent', 'Coming soon: how to stay consistent with training']
            ].map(([to, label]) => (
              <Reveal key={to}>
                {to.startsWith('/blog/') && !to.includes('stay-consistent') ? (
                  <Link to={to} className="card block p-6 hover:border-brand/60 transition-colors text-silver hover:text-paper text-sm font-semibold">→ {label}</Link>
                ) : (
                  <div className="card p-6 text-muted text-sm">{label}</div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection title="Guidance works when it’s personal." copy="Nutrition direction is included with fat-loss and personal training programs. Bring your real routine to a consultation — we build from there." />
    </>
  );
}
