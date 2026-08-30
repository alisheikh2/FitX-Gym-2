import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { wa } from '../../lib/brand.js';
import { PageHero, CallNow, SectionHead } from '../../components/site/blocks.jsx';

export default function FamilySessions() {
  return (
    <>
      <Seo
        title="Family Fitness Sessions in Sahiwal | FITX"
        description="Family fitness sessions at FITX Sahiwal: train together, stay active, build strength and spend quality time as a family, with exercises adapted to every age and fitness level. Book a session."
        path="/family-sessions"
        image="/images/fitx/family/fitx-family-training.jpg"
      />
      <PageHero title="Family Sessions" crumbs={[['What We Do', '/training'], ['Family Sessions', null]]} />

      {/* intro centered */}
      <section className="py-14 sm:py-20">
        <div className="shell max-w-3xl mx-auto text-center px-2">
          <Reveal>
            <p className="font-display font-bold text-navy text-lg sm:text-xl leading-relaxed">Train Together. Grow Stronger Together.</p>
            <p className="mt-5 text-[15px] sm:text-base text-silver leading-[1.9]">
              Our Family Sessions are designed to make fitness a shared and enjoyable experience for the whole family. Whether you’re looking to stay active, build strength, improve fitness, or simply spend quality time together, these sessions create a positive environment where everyone can participate and motivate one another.
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
                <img src="/images/fitx/family/fitx-family-training.jpg" alt="Family training together at FITX Sahiwal" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-lg">Fitness For Everyone</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">From parents to young kids, every session keeps the whole family moving, built around play, teamwork and shared effort rather than solo grind.</p>
                <h3 className="font-display font-bold text-navy text-lg mt-6">Motivation That's Shared</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Training together makes the journey more motivating, engaging and rewarding. When one family member pushes, everyone rises with them.</p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="md:order-2 overflow-hidden">
                <img src="/images/fitx/family/fitx-family-coach.jpg" alt="Coach guiding a family through a session at FITX Sahiwal" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="md:order-1">
                <h3 className="font-display font-bold text-navy text-lg">Adapted To Every Level</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">With exercises adapted to different fitness levels and abilities, our trainers ensure that each family member gets the right level of challenge and guidance.</p>
                <h3 className="font-display font-bold text-navy text-lg mt-6">One Family. One Team. One Healthier Journey.</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">From building healthy habits to achieving fitness goals, training together makes the journey more motivating, engaging, and rewarding for the whole family.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-deep border-y border-steel">
        <div className="shell max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHead label="The coaches" title="Guided by FITX trainers" copy="Sessions are coached by the FITX training team, who adapt every exercise to each family member's level, safe, positive and properly structured from start to finish." />
              <Reveal delay={80}>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link to="/book-consultation" className="btn-primary">Book a Session</Link>
                  <a href={wa('Hello FITX, I want to ask about the family sessions.')} target="_blank" rel="noopener noreferrer" className="btn-ghost">Ask on WhatsApp</a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={60} className="overflow-hidden">
              <img src="/images/fitx/family/fitx-family-fun.jpg" alt="Family enjoying a coached session together at FITX Sahiwal" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover object-center" />
            </Reveal>
          </div>
        </div>
      </section>

      <CallNow />
    </>
  );
}
