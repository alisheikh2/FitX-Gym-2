import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { wa } from '../../lib/brand.js';
import { PageHero, CallNow, SectionHead } from '../../components/site/blocks.jsx';

export default function StrengthConditioning() {
  return (
    <>
      <Seo
        title="Strength & Conditioning Coaching in Sahiwal | FITX"
        description="Learn the barbell lifts properly and build real conditioning at FITX Sahiwal. Strength & conditioning coaching with Trainer Muazam. Book a consultation."
        path="/strength-conditioning"
        image="/images/fitx/gen-squat.jpg"
      />
      <PageHero title="Strength & Conditioning" crumbs={[['What We Do', '/training'], ['Strength & Conditioning', null]]} />

      {/* intro centered */}
      <section className="py-14 sm:py-20">
        <div className="shell max-w-3xl mx-auto text-center px-2">
          <Reveal>
            <p className="text-[15px] sm:text-base text-silver leading-[1.9]">
              Strength is a skill before it is a number. At FITX, coach Muazam teaches the fundamentals done well, squat, hinge, press, pull and carry, progressed carefully so members add load without borrowing from their technique.
            </p>
          </Reveal>
        </div>
      </section>

      {/* alternating rows */}
      <section className="pb-16 sm:pb-24">
        <div className="shell max-w-5xl space-y-16">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="overflow-hidden">
                <img src="/images/fitx/gen-squat.jpg" alt="Coach teaching the barbell deadlift at FITX Sahiwal" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-lg">Barbell Fundamentals</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Technique taught and corrected from the ground up. Your first weeks focus on the five movement patterns with light loads, clean reps first, load second.</p>
                <h3 className="font-display font-bold text-navy text-lg mt-6">Progressive Loading</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">A written record of loads, small honest jumps, session after session. Earn the load with clean reps, and the number takes care of itself.</p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="md:order-2 overflow-hidden">
                <img src="/images/fitx/hero-ropes.jpg" alt="Conditioning work beside sunlit windows at FITX" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="md:order-1">
                <h3 className="font-display font-bold text-navy text-lg">Conditioning</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Sleds, medicine balls, bikes, ropes and intervals build the engine to go with the strength, for cricket and other sports, and for members who simply want to feel capable.</p>
                <h3 className="font-display font-bold text-navy text-lg mt-6">Sport Prep</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Strength that transfers to the field, cricket, football, martial arts. Programmed around your season, not against it.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-deep border-y border-steel">
        <div className="shell max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHead label="The coach" title="Trainer Muazam" copy="Strength & conditioning coach at FITX. If your form is breaking, Muazam will see it, stop it and fix it, that is the point of coaching." />
              <Reveal delay={80}>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link to="/trainers/muazam" className="btn-primary">Meet Trainer Muazam</Link>
                  <a href={wa('Hello FITX, I want to ask about strength & conditioning coaching.')} target="_blank" rel="noopener noreferrer" className="btn-ghost">Ask on WhatsApp</a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={60} className="overflow-hidden">
              <img src="/images/fitx/trainers/fitx-trainer-muazam.webp" alt="Trainer Muazam, strength & conditioning coach at FITX Sahiwal" width={1536} height={1024} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover object-top" />
            </Reveal>
          </div>
        </div>
      </section>

      <CallNow />
    </>
  );
}
