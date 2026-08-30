import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { wa } from '../../lib/brand.js';
import { PageHero, CallNow, SectionHead } from '../../components/site/blocks.jsx';

export default function BoxingSession() {
  return (
    <>
      <Seo
        title="Boxing Session Training in Sahiwal | FITX"
        description="Structured boxing sessions at FITX Sahiwal: stance, footwork, punching technique, combinations, pad work and conditioning - coached one-on-one, tailored to your level. Book a consultation."
        path="/boxing-session"
        image="/images/fitx/boxing/fitx-boxing-bag.jpg"
      />
      <PageHero title="Boxing Session" crumbs={[['What We Do', '/training'], ['Boxing Session', null]]} />

      {/* intro centered */}
      <section className="py-14 sm:py-20">
        <div className="shell max-w-3xl mx-auto text-center px-2">
          <Reveal>
            <p className="text-[15px] sm:text-base text-silver leading-[1.9]">
              Our Boxing Training sessions are designed to provide a complete, structured, and engaging workout in a personal training studio environment. Each session is tailored according to your fitness level, goals, and physical ability.
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
                <img src="/images/fitx/boxing/fitx-boxing-bag.jpg" alt="Member working on the heavy bag with coach support at FITX Sahiwal" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div>
                <p className="text-[15px] text-silver leading-[1.9]">
                  During your boxing session, you will work on the fundamentals of boxing, including stance, footwork, balance, punching techniques, combinations, defensive movements, and coordination. Sessions may also include pad work, shadow boxing, conditioning drills, and functional movements to improve overall performance.
                </p>
                <p className="text-[15px] text-silver leading-[1.9] mt-5">
                  Boxing is not only about learning punches, it is a full-body workout that can help improve strength, stamina, agility, coordination, speed, balance, and cardiovascular fitness. It also provides an effective way to release stress, build confidence, and stay mentally focused.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="md:order-2 overflow-hidden">
                <img src="/images/fitx/boxing/fitx-boxing-conditioning.jpg" alt="Skipping rope and conditioning work at FITX Sahiwal" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="md:order-1">
                <p className="text-[15px] text-silver leading-[1.9]">
                  Our trainers guide you throughout the session, ensuring that techniques are performed correctly and exercises are adapted to your individual fitness level. Whether your goal is weight management, improved fitness, strength and conditioning, learning boxing skills, or simply becoming more active, your sessions will be structured around your personal goals.
                </p>
                <p className="text-[15px] text-silver leading-[1.9] mt-5">
                  With focused one-on-one attention and a professional training environment, every boxing session is designed to be challenging, safe, purposeful, and enjoyable.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-deep border-y border-steel">
        <div className="shell max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHead label="The coaches" title="FITX coaching team" copy="Boxing sessions are run by the same coaching team that runs the FITX personal training floor, your technique watched, corrected and adapted to your level, every single session." />
              <Reveal delay={80}>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link to="/trainers" className="btn-primary">Meet Our Coaches</Link>
                  <a href={wa('Hello FITX, I want to ask about the boxing session.')} target="_blank" rel="noopener noreferrer" className="btn-ghost">Ask on WhatsApp</a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={60} className="overflow-hidden">
              <img src="/images/fitx/boxing/fitx-boxing-pads.jpg" alt="Coach holding focus mitts during a boxing session at FITX Sahiwal" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover object-center" />
            </Reveal>
          </div>
        </div>
      </section>

      <CallNow />
    </>
  );
}
