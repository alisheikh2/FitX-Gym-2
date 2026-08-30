import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { wa } from '../../lib/brand.js';
import { PageHero, CallNow, SectionHead } from '../../components/site/blocks.jsx';

export default function YogaSession() {
  return (
    <>
      <Seo
        title="Yoga Sessions in Sahiwal | FITX"
        description="Yoga sessions at FITX Sahiwal: mindful movement, guided breathing, stretching and controlled flows to improve flexibility, mobility, balance, strength and stress relief. Book a session."
        path="/yoga-sessions"
        image="/images/fitx/yoga/fitx-yoga-flow.jpg"
      />
      <PageHero title="Yoga Sessions" crumbs={[['What We Do', '/training'], ['Yoga Sessions', null]]} />

      {/* intro centered */}
      <section className="py-14 sm:py-20">
        <div className="shell max-w-3xl mx-auto text-center px-2">
          <Reveal>
            <p className="font-display font-bold text-navy text-lg sm:text-xl leading-relaxed">Move Better. Breathe Deeper. Feel Your Best.</p>
            <p className="mt-5 text-[15px] sm:text-base text-silver leading-[1.9]">
              At FITX, our yoga sessions are designed to help you reconnect with your body and create a stronger sense of balance, both physically and mentally. Through mindful movement, guided breathing, stretching, and controlled flows, you’ll improve flexibility, mobility, balance, and strength while releasing everyday tension.
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
                <img src="/images/fitx/yoga/fitx-yoga-flow.jpg" alt="Guided yoga flow session at FITX Sahiwal" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-lg">Mindful Movement</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Every session moves with intention. Controlled flows and guided breathing bring your attention back to your body, so each posture is held with awareness rather than habit.</p>
                <h3 className="font-display font-bold text-navy text-lg mt-6">Flexibility & Mobility</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Progressive stretching and full-range movements open up tight hips, shoulders and back, improving how you move, in training and in everyday life.</p>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div className="md:order-2 overflow-hidden">
                <img src="/images/fitx/yoga/fitx-yoga-stretch.jpg" alt="Guided stretch and breathing session at FITX Sahiwal" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div className="md:order-1">
                <h3 className="font-display font-bold text-navy text-lg">Balance & Strength</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">The practice builds balanced strength, stability through the core, steady posture and controlled control, a foundation that supports every other program at FITX.</p>
                <h3 className="font-display font-bold text-navy text-lg mt-6">Release Everyday Tension</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Long working hours, stress and screen time tighten the body. These sessions are a regular reset, a space to slow down, breathe deeper and leave feeling renewed.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-deep border-y border-steel">
        <div className="shell max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <SectionHead label="The studio" title="A space to reset" copy="Whether you're looking to enhance your fitness, improve movement, manage stress, or simply take a moment to slow down, our yoga sessions offer the perfect space to move, breathe, reset, and feel renewed." />
              <Reveal delay={80}>
                <div className="mt-7 flex flex-wrap gap-4">
                  <Link to="/book-consultation" className="btn-primary">Book a Session</Link>
                  <a href={wa('Hello FITX, I want to ask about the yoga sessions.')} target="_blank" rel="noopener noreferrer" className="btn-ghost">Ask on WhatsApp</a>
                </div>
              </Reveal>
            </div>
            <Reveal delay={60} className="overflow-hidden">
              <img src="/images/fitx/yoga/fitx-yoga-calm.jpg" alt="Mindful breathing and meditation at FITX Sahiwal" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover object-center" />
            </Reveal>
          </div>
        </div>
      </section>

      <CallNow />
    </>
  );
}
