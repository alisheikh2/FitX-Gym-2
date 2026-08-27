import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { wa } from '../../lib/brand.js';
import { PageHero, CTABand, SectionHead } from '../../components/site/blocks.jsx';

export default function StrengthConditioning() {
  return (
    <>
      <Seo
        title="Strength & Conditioning Coaching in Sahiwal | FITX"
        description="Learn the barbell lifts properly and build real conditioning at FITX Sahiwal. Strength & conditioning coaching with Trainer Muazam. Book a consultation."
        path="/strength-conditioning"
        image="/images/fitx/fitx-conditioning-medicine-ball.webp"
      />
      <PageHero
        label="Strength & conditioning"
        title="Earn the load. Build the engine."
        copy="Squat, hinge, press, pull, carry — form as the gatekeeper."
        image="/images/fitx/fitx-conditioning-medicine-ball.webp"
        crumbs={[['Strength & Conditioning', null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead label="The coaching" title="Strength is a skill before it is a number." copy="Coach Muazam teaches the fundamentals from the ground up — load arrives when reps are clean." />
            <Reveal delay={80}>
              <div className="mt-8 grid sm:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  ['Barbell fundamentals', 'Technique taught and corrected.'],
                  ['Progressive loading', 'Small honest jumps, recorded.'],
                  ['Conditioning', 'Sleds, bikes, intervals, turf work.'],
                  ['Sport prep', 'Strength that transfers to the field.']
                ].map(([h, p]) => (
                  <div key={h} className="border-t-2 border-brand/70 pt-4">
                    <h3 className="font-display font-bold text-paper">{h}</h3>
                    <p className="text-sm text-silver mt-1.5">{p}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/trainers/muazam" className="btn-primary btn-sm">Meet Trainer Muazam</Link>
                <a href={wa('Hello FITX, I want to ask about strength & conditioning coaching.')} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">Ask on WhatsApp</a>
              </div>
            </Reveal>
          </div>
          <div className="grid gap-4">
            <Reveal className="overflow-hidden">
              <img src="/images/fitx/fitx-conditioning-medicine-ball.webp" alt="Conditioning work with a medicine ball on the FITX turf" width={1400} height={820} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
            </Reveal>
            <Reveal delay={80} className="overflow-hidden">
              <img src="/images/fitx/facility/fitx-strength-squat-rack.webp" alt="Member training at the squat rack at FITX Sahiwal" width={1200} height={1066} loading="lazy" decoding="async" className="w-full aspect-[16/9] object-cover" />
            </Reveal>
          </div>
        </div>
      </section>

      <CTABand image="/images/fitx/facility/fitx-strength-squat-rack.webp" title="Stronger is a plan, not a mood." copy="Coached form from day one." />
    </>
  );
}
