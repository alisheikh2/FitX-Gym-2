import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { wa } from '../../lib/brand.js';
import { PageHero, SectionHead, CTASection } from '../../components/site/blocks.jsx';

export default function StrengthConditioning() {
  return (
    <>
      <Seo
        title="Strength & Conditioning Coaching in Sahiwal | FITX"
        description="Learn the barbell lifts properly and build real conditioning at FITX Sahiwal. Strength & conditioning coaching with Trainer Muazam — for members and athletes. Book a consultation."
        path="/strength-conditioning"
        image="/images/fitx/fitx-conditioning-medicine-ball.webp"
      />
      <PageHero
        label="Strength & Conditioning"
        title="Earn the load. Build the engine."
        copy="Strength work built on squat, hinge, press, pull and carry — coached with form as the gatekeeper — plus conditioning that carries into sport and daily life."
        crumbs={[['Strength & Conditioning', null]]}
        image="/images/fitx/fitx-conditioning-medicine-ball.webp"
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead
              label="The coaching"
              title="Strength is a skill before it is a number"
              copy="Muazam, FITX’s strength & conditioning coach, teaches the fundamentals from the ground up. You add weight when your reps are clean — not when the ego asks for it."
            />
            <Reveal delay={120}>
              <div className="mt-8 grid sm:grid-cols-2 gap-px bg-steel border border-steel">
                {[
                  ['Barbell fundamentals', 'Squat, hinge, press, pull — technique taught and corrected.'],
                  ['Progressive loading', 'A written record of loads; small honest jumps, session after session.'],
                  ['Conditioning', 'Sleds, bikes, medicine balls and intervals that build work capacity.'],
                  ['Sport prep', 'Cricket, football, martial arts — strength that transfers to the field.']
                ].map(([h, p]) => (
                  <div key={h} className="bg-obsidian p-6">
                    <h3 className="font-display font-bold text-paper">{h}</h3>
                    <p className="text-sm text-silver mt-2 leading-relaxed">{p}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/trainers/muazam" className="btn-primary btn-sm">Meet Trainer Muazam</Link>
                <a href={wa('Hello FITX, I want to ask about strength & conditioning coaching.')} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">Ask on WhatsApp</a>
              </div>
            </Reveal>
          </div>
          <div className="grid gap-4">
            <Reveal className="img-zoom overflow-hidden">
              <img src="/images/fitx/fitx-conditioning-medicine-ball.webp" alt="Conditioning work with a medicine ball on the FITX turf" width={1400} height={1400} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
            </Reveal>
            <Reveal delay={90} className="img-zoom overflow-hidden">
              <img src="/images/fitx/facility/fitx-strength-squat-rack.webp" alt="Member training at the squat rack at FITX Sahiwal" width={1200} height={1066} loading="lazy" decoding="async" className="w-full aspect-[16/9] object-cover" />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-deep border-y border-steel/50">
        <div className="shell max-w-3xl">
          <SectionHead label="For beginners" title="New to the bar? Good." />
          <Reveal delay={100}>
            <p className="mt-6 text-silver leading-relaxed text-base">Beginners are our favourite strength members — no bad habits to unlearn. Your first weeks focus on the five movement patterns with light loads. Read <Link to="/blog/how-beginners-should-start-strength-training" className="link-underline text-brand">how beginners should start strength training</Link>, then come feel the difference coached reps make.</p>
          </Reveal>
        </div>
      </section>

      <CTASection image="/images/fitx/facility/fitx-strength-squat-rack.webp" title="Stronger is a plan, not a mood." copy="Book a consultation and start strength training with a coach watching your form from day one." />
    </>
  );
}
