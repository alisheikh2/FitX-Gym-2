import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { useFetch } from '../../lib/hooks.js';
import { PageHero, SectionHead, FAQAccordion, CallNow } from '../../components/site/blocks.jsx';

const PROGRAMS = [
  ['One-to-One Personal Training', 'A coach, a written plan, and a record of your progress. Every session coached one-to-one — technique corrected, loads progressed, results tracked.', '/images/fitx/programs/fitx-coaching-one-to-one.webp'],
  ['Movement-Based Fat Loss', 'Multiple movements and muscle-group activation for accelerated fat loss, divided over four phases — beginners to regular gym-goers looking for a shred.', null],
  ['Strength & Hypertrophy', 'A sculpting and strength track for members who boast stamina but want to build their body the way they envision — squat, hinge, press, pull, carry.', null],
  ['Dispersion-Based Programming', 'Devised specifically to break the plateaus members face in meeting their goals — used precisely when progress stalls.', null],
  ['Group Sessions', 'Coach-led training on the floor with structure and supervision — the energy of training together, the discipline of a plan.', null]
];

export default function PersonalTraining() {
  const { data: faqs } = useFetch('/faqs');
  const trainingFaqs = (faqs || []).filter((f) => f.category === 'Training');

  return (
    <>
      <Seo
        title="Personal Training in Sahiwal — One-to-One Coaching | FITX"
        description="One-to-one personal training at FITX Sahiwal: assessment, individual program, coached sessions and progress tracking. The most structured personal training in Sahiwal."
        path="/personal-training"
        image="/images/fitx/gen-assessment.jpg"
      />
      <PageHero
        title="Personal Training"
        copy="Our programs follow a full-body assessment that determines your fitness level and quality of movement — then nurture you through controlled cycles of stress, disruption and adaptation, taking you to your unique potential."
        crumbs={[['Personal Training', null]]}
      />

      {/* intro — reference style: floated image + text */}
      <section className="py-16 sm:py-24">
        <div className="shell">
          <Reveal>
            <div className="md:float-left md:mr-8 mb-6 md:mb-4 max-w-md overflow-hidden">
              <img src="/images/fitx/gen-assessment.jpg" alt="FITX coach conducting a movement assessment on the turf" width={1600} height={900} loading="lazy" decoding="async" className="w-full aspect-[3/2] object-cover" />
            </div>
            <p className="text-[15px] sm:text-base text-silver leading-relaxed max-w-3xl">
              Your first session at FITX is a consultation, not a sales pitch. We assess your starting point — movement quality, strength, history, schedule — and write a program around it. Rigorous routines combine cardio and resistance training in coached sessions aimed to develop your form, function and stamina while guaranteeing your goals.
            </p>
            <p className="mt-4 text-[15px] sm:text-base text-silver leading-relaxed max-w-3xl">
              Though our workouts cater to busy lifestyles, FITX is not a quick and easy fix — being part of our programs requires matching the serious commitment and dedication that we have to offer.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 clear-both">
              <Link to="/book-consultation" className="btn-primary">Book a Consultation</Link>
              <Link to="/programs" className="btn-ghost">Our Programs</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* program blocks — reference style list */}
      <section className="py-16 sm:py-24 bg-deep border-y border-steel">
        <div className="shell max-w-4xl">
          <SectionHead label="What we do" title="The programs" />
          <div className="mt-10 space-y-10">
            {PROGRAMS.map(([title, copy, img], i) => (
              <Reveal key={title} delay={i * 40}>
                <div className="grid sm:grid-cols-[180px_1fr] gap-5 items-start">
                  {img ? (
                    <div className="overflow-hidden">
                      <img src={img} alt={`${title} at FITX Sahiwal`} width={1000} height={750} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
                    </div>
                  ) : (
                    <div className="hidden sm:block h-full w-[180px] border-l-4 border-brand" aria-hidden="true" />
                  )}
                  <div>
                    <h3 className="font-display font-extrabold uppercase text-lg text-navy">{title}</h3>
                    <p className="mt-2 text-[15px] text-silver leading-relaxed">{copy}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="shell max-w-4xl">
          <SectionHead label="Questions" title="Asked often" />
          <div className="mt-8"><FAQAccordion items={trainingFaqs} /></div>
        </div>
      </section>

      <CallNow />
    </>
  );
}
