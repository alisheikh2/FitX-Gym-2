import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { BRAND, wa } from '../../lib/brand.js';
import { PageHero, SectionHead, CallNow } from '../../components/site/blocks.jsx';

export default function WomensFitness() {
  return (
    <>
      <Seo
        title="Women's Fitness & Fat Loss Training in Sahiwal | FITX"
        description="Dedicated women's training hours at FITX Sahiwal with female coach Iqra Zahid (7 years experience). Fat loss, strength and performance coaching in a safe, respectful studio."
        path="/womens-fitness"
        image="/images/fitx/trainers/fitx-trainer-iqra-zahid.webp"
      />
      <PageHero
        title="Women’s Fitness"
        copy="Proper coaching, dedicated hours, a floor of your own. Women train with coach Iqra Zahid, seven years of experience coaching women in Sahiwal."
        crumbs={[["Women's Fitness", null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid md:grid-cols-[1fr_380px] gap-10 lg:gap-14 items-start max-w-5xl mx-auto">
          <Reveal>
            <p className="text-[15px] sm:text-base text-silver leading-[1.9]">
              Iqra Zahid coaches the women who train at FITX during the studio’s dedicated female hours. Over seven years she has coached students, brides-to-be, new mothers and women in their fifties, most of them starting from zero.
            </p>
            <p className="mt-5 text-[15px] sm:text-base text-silver leading-[1.9]">
              Her programming treats women’s training seriously: progressive strength work, structured fat-loss phases and honest nutrition guidance, not a lighter version of training, and never stretched-out aerobics.
            </p>
            <h3 className="font-display font-bold text-navy text-lg mt-8">What your first month looks like</h3>
            <ul className="mt-4 space-y-2.5 text-[15px] text-silver leading-relaxed">
              {[
                'Consultation, your goal, schedule and health considerations, discussed privately.',
                'Technique first, the core movements taught from zero, at your pace.',
                'A structured program matched to your starting point, not copied from someone else.',
                'Weekly check-ins, measurements and adjustments, so progress is visible.'
              ].map((t) => (
                <li key={t} className="flex gap-3"><span className="text-brand font-bold shrink-0">•</span>{t}</li>
              ))}
            </ul>
            <div className="mt-8 border-l-4 border-brand bg-deep pl-5 py-4">
              <p className="font-display text-[12px] font-bold uppercase tracking-[0.2em] text-brand">Dedicated female hours</p>
              <p className="font-display font-extrabold uppercase text-navy text-lg mt-2">10:30 AM – 1:00 PM <span className="text-silver font-body font-normal normal-case">&</span> 3:00 PM – 6:00 PM</p>
              <p className="text-[13px] text-silver mt-1">Daily, with coach Iqra Zahid. A floor of your own.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/trainers/iqra-zahid" className="btn-primary">Meet Iqra Zahid</Link>
              <a href={wa('Hello FITX, I would like to ask about women’s training hours with Iqra.')} target="_blank" rel="noopener noreferrer" className="btn-ghost">Ask About Women’s Hours</a>
            </div>
          </Reveal>
          <Reveal delay={60} className="overflow-hidden">
            <img src="/images/fitx/trainers/fitx-trainer-iqra-zahid.webp" alt="Iqra Zahid coaching at FITX Sahiwal" width={1023} height={1537} loading="lazy" decoding="async" className="w-full aspect-[3/4] object-cover object-top" />
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-deep border-y border-steel">
        <div className="shell grid lg:grid-cols-2 gap-12 items-center">
          <Reveal className="overflow-hidden">
            <img src="/images/fitx/gen-women-cable.jpg" alt="Women's strength training at FITX Sahiwal" width={1600} height={900} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
          </Reveal>
          <div>
            <SectionHead label="The studio" title="Dedicated female hours" />
            <Reveal delay={60}>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                {BRAND.femaleHours.map((h) => (
                  <p key={h} className="font-display font-extrabold uppercase text-xl text-navy border-l-4 border-brand pl-4">{h}</p>
                ))}
              </div>
              <ul className="mt-6 space-y-2.5 text-sm sm:text-base text-silver">
                {['Progressive strength & fat-loss programming', 'Beginners started from zero, technique first', 'Safe, secure, respectful, members say so'].map((t) => (
                  <li key={t} className="flex gap-3"><span className="text-brand font-bold shrink-0">•</span>{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CallNow />
    </>
  );
}
