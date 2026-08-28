import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { wa } from '../../lib/brand.js';
import { PageHero, SectionHead, CallNow } from '../../components/site/blocks.jsx';

export default function StrengthConditioning() {
  return (
    <>
      <Seo
        title="Strength & Conditioning Coaching in Sahiwal | FITX"
        description="Learn the barbell lifts properly and build real conditioning at FITX Sahiwal. Strength & conditioning coaching with Trainer Muazam. Book a consultation."
        path="/strength-conditioning"
        image="/images/fitx/gen-squat.jpg"
      />
      <PageHero
        title="Strength & Conditioning"
        copy="Strength is a skill before it is a number. Earn the load with clean reps — the number takes care of itself."
        crumbs={[['What We Do', '/training'], ['Strength & Conditioning', null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell">
          <Reveal>
            <div className="md:float-left md:mr-8 mb-6 md:mb-4 max-w-md overflow-hidden">
              <img src="/images/fitx/gen-squat.jpg" alt="Barbell back squat in the racks at FITX Sahiwal" width={1600} height={900} loading="lazy" decoding="async" className="w-full aspect-[4/3] sm:aspect-[3/2] object-cover" />
            </div>
            <p className="text-[15px] sm:text-base text-silver leading-relaxed max-w-3xl">
              Coach Muazam leads strength and conditioning at FITX. Sessions are built on the fundamentals done well — squat, hinge, press, pull and carry — progressed carefully so members add load without borrowing from their technique.
            </p>
            <p className="mt-4 text-[15px] sm:text-base text-silver leading-relaxed max-w-3xl">
              The conditioning side — sleds, medicine balls, bikes, ropes and intervals — builds the engine to go with the strength: for cricket and other sports, and for members who simply want to feel capable.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 clear-both">
              <Link to="/trainers/muazam" className="btn-primary">Meet Trainer Muazam</Link>
              <a href={wa('Hello FITX, I want to ask about strength & conditioning coaching.')} target="_blank" rel="noopener noreferrer" className="btn-ghost">Ask on WhatsApp</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-deep border-y border-steel">
        <div className="shell max-w-4xl">
          <SectionHead label="The coaching" title="What you'll train" />
          <div className="mt-10 grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {[
              ['Barbell fundamentals', 'Technique taught and corrected from the ground up.'],
              ['Progressive loading', 'A written record of loads — small honest jumps, session after session.'],
              ['Conditioning', 'Sleds, bikes, ropes and intervals that build work capacity.'],
              ['Sport prep', 'Strength that transfers to the field — cricket, football, martial arts.']
            ].map(([h, p], i) => (
              <Reveal key={h} delay={i * 50} className="border-l-4 border-brand pl-5">
                <h3 className="font-display font-extrabold uppercase text-[15px] text-navy">{h}</h3>
                <p className="mt-1.5 text-sm text-silver leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CallNow />
    </>
  );
}
