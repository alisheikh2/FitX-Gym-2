import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { useFetch } from '../../lib/hooks.js';
import { BRAND, wa } from '../../lib/brand.js';
import { PageHero, CTABand, SectionHead, Quote } from '../../components/site/blocks.jsx';

export default function WomensFitness() {
  const { data: testimonials } = useFetch('/testimonials');
  const womenReview = (testimonials || []).filter((t) => /ladies|women|safe/i.test(t.text)).slice(0, 2);

  return (
    <>
      <Seo
        title="Women's Fitness & Fat Loss Training in Sahiwal | FITX"
        description="Dedicated women's training hours at FITX Sahiwal with female coach Iqra Zahid (7 years experience). Fat loss, strength and performance coaching in a safe, respectful studio."
        path="/womens-fitness"
        image="/images/fitx/trainers/fitx-trainer-iqra-zahid.webp"
      />
      <PageHero
        label="Women’s fitness"
        title="Proper coaching. A floor of your own."
        copy="Dedicated female hours with coach Iqra Zahid — 7 years of experience coaching women in Sahiwal."
        image="/images/fitx/trainers/fitx-trainer-iqra-zahid.webp"
        crumbs={[["Women's Fitness", null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead label="How women train at FITX" title="Real training. Not a lighter version." />
            <Reveal delay={80}>
              <div className="mt-7 border-l-2 border-brand pl-6 py-1">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted">Dedicated female hours</p>
                <div className="mt-3 grid sm:grid-cols-2 gap-4">
                  {BRAND.femaleHours.map((h) => <p key={h} className="font-display font-bold text-2xl text-paper">{h}</p>)}
                </div>
              </div>
              <ul className="mt-7 space-y-3 text-sm sm:text-base text-silver">
                {['Progressive strength & fat-loss programming', 'Beginners started from zero — technique first', 'Safe, secure, respectful — members say so'].map((t) => (
                  <li key={t} className="flex gap-3"><span className="text-brand font-bold shrink-0">—</span>{t}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/trainers/iqra-zahid" className="btn-primary btn-sm">Meet Iqra Zahid</Link>
                <a href={wa('Hello FITX, I would like to ask about women’s training hours with Iqra.')} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">Ask About Women’s Hours</a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={100} className="overflow-hidden">
            <img src="/images/fitx/hero-women.jpg" alt="Education session at FITX with women members attending" width={1400} height={1050} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
          </Reveal>
        </div>
      </section>

      {womenReview.length > 0 && (
        <section className="py-16 bg-deep border-y border-steel/50">
          <div className="shell grid md:grid-cols-2 gap-10">{womenReview.map((r, i) => <Quote key={r._id} r={r} i={i} />)}</div>
        </section>
      )}

      <CTABand image="/images/fitx/trainers/fitx-trainer-iqra-zahid.webp" title="The right place to start already exists in Sahiwal." copy="Visit during female hours and see the studio yourself." />
    </>
  );
}
