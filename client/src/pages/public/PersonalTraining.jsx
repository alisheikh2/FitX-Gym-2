import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { useFetch } from '../../lib/hooks.js';
import { PageHero, CallNow, FAQAccordion, SectionHead } from '../../components/site/blocks.jsx';

export default function PersonalTraining() {
  const { data: faqs } = useFetch('/faqs');
  const trainingFaqs = (faqs || []).filter((f) => f.category === 'Training');

  return (
    <>
      <Seo
        title="Personal Training in Sahiwal, One-to-One Coaching | FITX"
        description="One complete, personalized fitness system built around you. Consultation, assessment, goal alignment, customized training, nutrition guidance and progress tracking. Book a consultation at FITX Sahiwal."
        path="/personal-training"
        image="/images/fitx/hero-coaching.jpg"
      />
      <PageHero title="Personal Training" crumbs={[['What We Do', '/training'], ['Personal Training', null]]} />

      {/* intro centered */}
      <section className="py-14 sm:py-20">
        <div className="shell max-w-3xl mx-auto text-center px-2">
          <Reveal>
            <p className="font-display font-bold text-navy text-lg sm:text-xl leading-relaxed">One complete, personalized fitness system built around you.</p>
            <p className="mt-5 text-[15px] sm:text-base text-silver leading-[1.9]">
              Every individual starts with a different body, lifestyle, experience, and goal. Our Personal Training program brings everything together in one structured, one-on-one approach, from understanding where you are today to building a strategy that moves you towards where you want to be.
            </p>
          </Reveal>
        </div>
      </section>

      {/* alternating blocks, reference structure */}
      <section className="pb-16 sm:pb-24">
        <div className="shell max-w-5xl space-y-16">
          {/* row 1: image left, text right — steps 01 & 02 */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="overflow-hidden">
                <img src="/images/fitx/hero-coaching.jpg" alt="FITX coach spotting a client’s barbell squat" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-lg">01 — One-on-One Consultation</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Your journey begins with a personal consultation with your trainer. We understand your goals, lifestyle, training background, challenges, and expectations.</p>
                <h3 className="font-display font-bold text-navy text-lg mt-7">02 — Assessment &amp; Analysis</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">We assess your current physical condition through body composition, measurements, weight, fitness level, and other relevant indicators using our body composition scanner.</p>
              </div>
            </div>
          </Reveal>

          {/* row 2: text left, image right — steps 03 & 04 */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="font-display font-bold text-navy text-lg">03 — Goal Alignment</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Your goals are evaluated against your current condition and lifestyle. We identify what is realistic, set clear objectives, and define the right direction for your training.</p>
                <h3 className="font-display font-bold text-navy text-lg mt-7">04 — Customized Training</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Your training program is built specifically around you and your goals, whether you’re looking to manage your weight, reduce body fat, build strength, improve conditioning, enhance sports performance, or simply become fitter and healthier.</p>
              </div>
              <div className="overflow-hidden">
                <img src="/images/fitx/gen-squat.jpg" alt="Coach teaching a client the barbell deadlift at FITX" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
            </div>
          </Reveal>

          {/* row 3: image left, stacked text right — steps 05 & 06 */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="overflow-hidden">
                <img src="/images/fitx/gen-medball-coach.jpg" alt="Coach guiding a member through medicine ball conditioning" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-lg">05 — Nutrition Guidance</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Your training is supported with personalized nutrition guidance based on your assessment, goals, lifestyle, food availability, and daily routine.</p>
                <h3 className="font-display font-bold text-navy text-lg mt-7">06 — Progress Tracking</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Your progress is regularly monitored through reassessments and body composition scans. This allows us to understand what is working, measure your progress, and adjust your strategy when needed.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-deep border-y border-steel">
        <div className="shell max-w-4xl">
          <SectionHead label="Questions" title="Asked often" />
          <div className="mt-8"><FAQAccordion items={trainingFaqs} /></div>
          <p className="mt-6 text-sm text-muted">More? <Link className="link-underline text-silver" to="/faq">Full FAQ</Link></p>
        </div>
      </section>

      <CallNow />
    </>
  );
}
