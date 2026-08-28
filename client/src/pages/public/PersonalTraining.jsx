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
        description="One-to-one personal training at FITX Sahiwal: assessment, individual program, coached sessions and progress tracking. The most structured personal training in Sahiwal."
        path="/personal-training"
        image="/images/fitx/hero-coaching.jpg"
      />
      <PageHero title="Personal Training" crumbs={[['What We Do', '/training'], ['Personal Training', null]]} />

      {/* intro centered */}
      <section className="py-14 sm:py-20">
        <div className="shell max-w-3xl mx-auto text-center px-2">
          <Reveal>
            <p className="text-[15px] sm:text-base text-silver leading-[1.9]">
              Our workouts are designed following a full-body assessment which allows us to determine the client’s fitness level and quality of movement. This system works with the dynamic and ever changing nature of the human body to nurture it through controlled cycles of <strong className="text-navy">stress</strong>, <strong className="text-navy">disruption</strong> and <strong className="text-navy">adaptation</strong>, taking each body to its <strong className="text-navy">unique potential</strong>.
            </p>
          </Reveal>
        </div>
      </section>

      {/* alternating blocks, reference structure */}
      <section className="pb-16 sm:pb-24">
        <div className="shell max-w-5xl space-y-16">
          {/* row 1: image left, text right */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="overflow-hidden">
                <img src="/images/fitx/hero-coaching.jpg" alt="FITX coach spotting a client’s barbell squat" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div>
                <p className="text-[15px] text-silver leading-[1.9]">Our rigorous routines combine cardio and resistance training in coached, supervised sessions that are aimed to develop your form, function and stamina, while guaranteeing your goals!</p>
                <h3 className="font-display font-bold text-navy text-lg mt-7">Movement-Based Fat Loss</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">This combines multiple movements and muscle-group activation to launch our clients into accelerated fat loss. It is divided over four phases to cater to clients of all levels, beginners to regular gym-goers looking for a shred.</p>
              </div>
            </div>
          </Reveal>

          {/* row 2: text left, image right */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div>
                <h3 className="font-display font-bold text-navy text-lg">Full-Body Fusion Training</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">A fusion-style training approach hitting <strong className="text-navy">every</strong> part of your body <strong className="text-navy">every</strong> session, anterior, posterior, functional kinetic chain emphasis (body angles). You name it, we cover it within your coached session. Divided over varying levels of progression as well.</p>
                <h3 className="font-display font-bold text-navy text-lg mt-7">Plateau-Breaking Blocks</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Devised specifically and used at the right moments to break the plateaus our clients face in meeting their goals.</p>
              </div>
              <div className="overflow-hidden">
                <img src="/images/fitx/gen-squat.jpg" alt="Coach teaching a client the barbell deadlift at FITX" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
            </div>
          </Reveal>

          {/* row 3: image left, stacked text right */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="overflow-hidden">
                <img src="/images/fitx/gen-medball-coach.jpg" alt="Coach guiding a member through medicine ball conditioning" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </div>
              <div>
                <h3 className="font-display font-bold text-navy text-lg">Strength & Hypertrophy</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">Our sculpting and strength track for members who already boast good stamina and functional mobility but want to build their body the way they envision, squat, hinge, press, pull and carry, progressed honestly.</p>
                <h3 className="font-display font-bold text-navy text-lg mt-7">High-Volume Muscle Building</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">A higher-volume, bodybuilding-style track geared to build muscle mass, paired with practical nutrition guidance so you fuel the work.</p>
                <h3 className="font-display font-bold text-navy text-lg mt-7">Women’s Dedicated Hours</h3>
                <p className="text-[15px] text-silver leading-[1.9] mt-3">A focused version of our movement-based programs during dedicated female hours (10:30–1 & 3–6), coached by Iqra Zahid, including pregnancy-appropriate programming with medical clearance.</p>
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
