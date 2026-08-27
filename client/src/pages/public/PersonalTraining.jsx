import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { useFetch } from '../../lib/hooks.js';
import { PageHero, SectionHead, CTASection, FAQAccordion } from '../../components/site/blocks.jsx';

const STEPS = [
  ['Consultation', 'We sit down first. Your goal, your schedule, injuries, history — before any recommendation or price.'],
  ['Assessment & plan', 'Your starting point is measured and a program is written for your goal — not copied from another member.'],
  ['Coached sessions', 'You train one-to-one. Technique corrected every session, loads progressed when form earns it.'],
  ['Review & adjust', 'Weekly and monthly check-ins on measurements and performance. The plan changes when your body does.']
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
        label="Personal Training"
        title="A coach who knows your plan. Every session."
        copy="Personal training at FITX is a system: consult, plan, coach, measure, adjust. It is how members in Sahiwal stop guessing and start progressing."
        crumbs={[['Personal Training', null]]}
        image="/images/fitx/fitx-coaching-education-session.webp"
      />

      <section className="py-16 sm:py-24">
        <div className="shell">
          <SectionHead label="How it works" title="Four steps, no guesswork" />
          <ol className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map(([h, p], i) => (
              <Reveal key={h} delay={i * 80} as="li" className="relative border-l-2 border-steel pl-6 py-1">
                <span className="absolute -left-[13px] top-0 h-6 w-6 bg-obsidian border-2 border-brand text-brand font-display font-bold text-[11px] flex items-center justify-center">{i + 1}</span>
                <h3 className="font-display font-bold text-lg text-paper">{h}</h3>
                <p className="text-sm text-silver mt-2 leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-deep border-y border-steel/50">
        <div className="shell grid lg:grid-cols-2 gap-12 items-center">
          <Reveal className="img-zoom overflow-hidden order-2 lg:order-1">
            <img src="/images/fitx/fitx-coaching-education-session.webp" alt="FITX coach running an education session for members in the studio" width={1400} height={1050} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHead
              label="Coaching culture"
              title="We teach you to be your own expert"
              copy="A review of FITX says our staff “guide you how to be your own expert when it comes to health and fitness.” That is the standard: you should understand why you train, what you eat and how to progress — with or without us."
            />
            <Reveal delay={120}>
              <p className="mt-6 text-sm text-silver leading-relaxed">Education sessions run inside the studio — nutrition, motivation and technique — because an informed member makes better decisions for life, not just for a 12-week phase.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/trainers/zohaib-ali" className="btn-primary btn-sm">Meet Head Coach Zohaib Ali</Link>
                <Link to="/programs" className="btn-ghost btn-sm">See Pricing</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="shell max-w-4xl">
          <SectionHead label="Questions" title="What members ask first" />
          <div className="mt-10">
            <FAQAccordion items={trainingFaqs} />
          </div>
          <p className="mt-6 text-sm text-muted">More questions? <Link className="link-underline text-silver" to="/faq">Read the full FAQ</Link> or <Link className="link-underline text-brand" to="/book-consultation">book a consultation</Link>.</p>
        </div>
      </section>

      <CTASection image="/images/fitx/fitx-coaching-education-session.webp" title="Your first session starts with a conversation." copy="Book a free consultation. We’ll assess your starting point and recommend the right program — personal training, group sessions, or a specialty track." />
    </>
  );
}
