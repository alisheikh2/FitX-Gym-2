import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { useFetch } from '../../lib/hooks.js';
import { PageHero, CTABand, SectionHead, FAQAccordion } from '../../components/site/blocks.jsx';

const STEPS = [
  ['01', 'Consultation', 'Your goal, schedule and history — before any recommendation.'],
  ['02', 'Assessment & plan', 'A program written for your body, not copied from another member.'],
  ['03', 'Coached sessions', 'One-to-one. Technique corrected, loads progressed.'],
  ['04', 'Review & adjust', 'Measurements and performance checked — the plan evolves with you.']
];

export default function PersonalTraining() {
  const { data: faqs } = useFetch('/faqs');
  const trainingFaqs = (faqs || []).filter((f) => f.category === 'Training');

  return (
    <>
      <Seo
        title="Personal Training in Sahiwal — One-to-One Coaching | FITX"
        description="One-to-one personal training at FITX Sahiwal: consultation, individual program, coached sessions and progress tracking. The most structured personal training in Sahiwal."
        path="/personal-training"
        image="/images/fitx/fitx-coaching-education-session.webp"
      />
      <PageHero
        label="Personal training"
        title="A coach who knows your plan. Every session."
        image="/images/fitx/fitx-coaching-education-session.webp"
        crumbs={[['Personal Training', null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell">
          <SectionHead label="How it works" title="Four steps. No guesswork." />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map(([n, h, p], i) => (
              <Reveal key={n} delay={i * 70} className="border-t-2 border-brand/70 pt-5">
                <p className="font-display font-bold text-brand text-sm">{n}</p>
                <h3 className="font-display font-bold text-xl text-paper mt-1">{h}</h3>
                <p className="text-sm text-silver mt-2 leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-deep border-y border-steel/50">
        <div className="shell grid lg:grid-cols-2 gap-12 items-center">
          <Reveal className="overflow-hidden order-2 lg:order-1">
            <img src="/images/fitx/fitx-coaching-education-session.webp" alt="FITX coach running an education session in the studio" width={1400} height={1050} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHead
              label="Coaching culture"
              title="We teach you to be your own expert."
              copy="Education sessions run inside the studio — nutrition, motivation, technique. An informed member makes better decisions for life."
            />
            <Reveal delay={100}>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link to="/trainers/zohaib-ali" className="btn-primary btn-sm">Meet Head Coach</Link>
                <Link to="/programs" className="btn-ghost btn-sm">Pricing</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="shell max-w-4xl">
          <SectionHead label="Questions" title="Asked often." />
          <div className="mt-8"><FAQAccordion items={trainingFaqs} /></div>
          <p className="mt-6 text-sm text-muted">More? <Link className="underline decoration-brand/60 underline-offset-4 text-silver hover:text-brand" to="/faq">Full FAQ</Link></p>
        </div>
      </section>

      <CTABand image="/images/fitx/trainers/fitx-founder-training-session.webp" title="Your first session starts with a conversation." copy="Free consultation — assessed, then recommended." />
    </>
  );
}
