import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { useFetch } from '../../lib/hooks.js';
import { BRAND, wa } from '../../lib/brand.js';
import { PageHero, SectionHead, CTASection, ReviewCard } from '../../components/site/blocks.jsx';

export default function WomensFitness() {
  const { data: testimonials } = useFetch('/testimonials');
  const womenReview = (testimonials || []).filter((t) => /ladies|women|safe/i.test(t.text)).slice(0, 2);

  return (
    <>
      <Seo
        title="Women's Fitness & Fat Loss Training in Sahiwal | FITX"
        description="Dedicated women's training hours at FITX Sahiwal with female coach Iqra Zahid (7 years experience). Fat loss, strength and performance coaching in a safe, respectful studio. Book now."
        path="/womens-fitness"
        image="/images/fitx/trainers/fitx-trainer-iqra-zahid.webp"
      />
      <PageHero
        label="Women’s Fitness"
        title="Proper coaching. Dedicated hours. A floor of your own."
        copy="Women train at FITX with Iqra Zahid — a women’s fat loss & performance coach with seven years of experience — during dedicated female hours, in an environment members describe as safe and respectful."
        crumbs={[["Women's Fitness", null]]}
        image="/images/fitx/trainers/fitx-trainer-iqra-zahid.webp"
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-2 gap-12 items-center">
          <Reveal className="img-zoom overflow-hidden relative order-2 lg:order-2">
            <img src="/images/fitx/trainers/fitx-trainer-iqra-zahid.webp" alt="Iqra Zahid, women's fat loss and performance coach at FITX Sahiwal" width={800} height={1200} loading="lazy" decoding="async" className="w-full aspect-[4/5] object-cover" />
            <div className="absolute bottom-0 inset-x-0 bg-obsidian/85 px-5 py-3">
              <p className="font-display font-bold text-paper">Iqra Zahid</p>
              <p className="text-xs text-silver">Women Fat Loss & Performance Coach · 7 years experience</p>
            </div>
          </Reveal>
          <div className="order-1">
            <SectionHead
              label="How women train at FITX"
              title="Not a lighter version of training. Real training."
              copy="Programs for women at FITX are structured strength and fat-loss work: progressive loads, technique coaching and honest nutrition guidance — not stretched-out aerobics."
            />
            <Reveal delay={120}>
              <div className="mt-8 card p-6">
                <p className="label">Dedicated female hours</p>
                <div className="mt-4 grid sm:grid-cols-2 gap-4">
                  {BRAND.femaleHours.map((h) => (
                    <p key={h} className="font-display font-bold text-xl text-paper border-l-2 border-brand pl-4">{h}</p>
                  ))}
                </div>
                <p className="text-xs text-muted mt-4">{BRAND.hoursFriday}. Members are encouraged to confirm current timings when booking.</p>
              </div>
            </Reveal>
            <Reveal delay={180}>
              <ul className="mt-8 space-y-3 text-sm sm:text-base text-silver">
                {['A female coach who takes women’s strength seriously', 'Beginners started from zero — technique first', 'Fat-loss phases with weekly measurement', 'Postpartum-appropriate programming with medical clearance'].map((t) => (
                  <li key={t} className="flex gap-3"><span className="text-brand font-bold shrink-0">—</span>{t}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/trainers/iqra-zahid" className="btn-primary btn-sm">Meet Iqra Zahid</Link>
                <a href={wa('Hello FITX, I would like to ask about women’s training hours with Iqra.')} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">Ask About Women’s Hours</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {womenReview.length > 0 && (
        <section className="py-16 bg-deep border-y border-steel/50">
          <div className="shell grid md:grid-cols-2 gap-5">
            {womenReview.map((r, i) => <ReviewCard key={r._id} r={r} i={i} />)}
          </div>
        </section>
      )}

      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHead label="Know before you visit" title="What your first month looks like" />
            <Reveal delay={100}>
              <ol className="mt-8 space-y-4">
                {['Consultation: your goal, schedule and health considerations', 'Technique coaching on the core movements, from zero if needed', 'A structured program matched to your starting point', 'Weekly check-ins so progress is visible, not assumed'].map((t, i) => (
                  <li key={t} className="flex gap-4 items-start">
                    <span className="font-display font-bold text-brand">{i + 1}.</span>
                    <p className="text-silver text-sm sm:text-base leading-relaxed">{t}</p>
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-silver">Read more: <Link to="/blog/women-training-at-fitx-sahiwal" className="link-underline text-brand">Women’s Training at FITX — hours, coaching and what to expect</Link>.</p>
            </Reveal>
          </div>
          <Reveal delay={120} className="img-zoom overflow-hidden">
            <img src="/images/fitx/fitx-coaching-education-session.webp" alt="Education session at FITX with women members attending" width={1400} height={1050} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
          </Reveal>
        </div>
      </section>

      <CTASection title="The right place to start already exists in Sahiwal." copy="Book a consultation or visit during female hours and see the studio yourself before deciding anything." image="/images/fitx/trainers/fitx-trainer-iqra-zahid.webp" />
    </>
  );
}
