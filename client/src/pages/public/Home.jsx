import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import { BRAND, wa, tel } from '../../lib/brand.js';
import Reveal from '../../components/ui/Reveal.jsx';
import { HeroSlider, ImageCard, CTABand, Quote, SectionHead, TrainerCard } from '../../components/site/blocks.jsx';

export default function Home() {
  const { data: trainers } = useFetch('/trainers');
  const { data: testimonials } = useFetch('/testimonials');
  const quotes = (testimonials || []).filter((t) => t.kind === 'quote').slice(0, 3);

  return (
    <>
      <Seo
        title="FITX Personal Fitness Training Studio — Personal Trainer in Sahiwal"
        description="FITX is Sahiwal's dedicated personal training studio in Shadman Town, Faisalabad Road. One-to-one coaching, fat loss, strength & conditioning and dedicated women's hours. Book a consultation."
        path="/"
        image="/images/fitx/hero-ropes.jpg"
      />

      {/* AUTO-ROTATING HERO */}
      <HeroSlider />

      {/* headline lives below the clean hero — reference style */}
      <section className="py-14 sm:py-20">
        <div className="shell text-center max-w-3xl mx-auto">
          <Reveal>
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.28em] text-brand">Personal Fitness Training Studio · Sahiwal</p>
            <h1 className="font-display font-extrabold uppercase text-3xl sm:text-5xl text-navy leading-[1.08] tracking-tight mt-3">The most serious &amp; sophisticated personal training in Sahiwal</h1>
            <p className="mt-5 text-[15px] sm:text-base text-silver leading-relaxed">One-to-one coaching, fat loss, strength & women’s performance — assessed, programmed and tracked by coaches who invest in you.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/book-consultation" className="btn-primary !rounded-full">Book a Consultation</Link>
              <Link to="/personal-training" className="btn-ghost !rounded-full">Explore Training</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO WE ARE / WOMEN — two premium cards */}
      <section className="py-16 sm:py-24">
        <div className="shell grid md:grid-cols-2 gap-10">
          <ImageCard
            to="/about"
            image="/images/fitx/facility/fitx-facility-floor-02.webp"
            alt="The FITX training floor in Sahiwal — free weights, cables and turf"
            kicker="Who we are"
            title="Boutique studio"
            copy="A personal training studio, not a crowded hall. Assessment first, written programs, coached technique and tracked progress — the FITX standard."
          />
          <ImageCard
            to="/womens-fitness"
            image="/images/fitx/gen-women-group.jpg"
            alt="Women training together in a coached session at FITX Sahiwal"
            kicker="Women’s training"
            title="Dedicated hours"
            copy="Coach Iqra Zahid — seven years of experience — trains women 10:30–1 & 3–6 daily. Strength and fat loss, coached properly, in a safe studio."
          />
        </div>
      </section>

      {/* OUR PROGRAMS */}
      <section className="py-16 sm:py-24 bg-deep border-y border-steel">
        <div className="shell grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead
              label="What we do"
              title="Our programs"
              copy="Built on a full assessment: your starting point measured, your program written, your progress pushed through controlled cycles of stress and adaptation — to your unique potential."
            />
            <Reveal delay={80}>
              <ul className="mt-8 divide-y divide-steel border-y border-steel">
                {[
                  ['One-to-One Personal Training', '/personal-training'],
                  ['Weight Loss & Fat Loss', '/weight-loss'],
                  ['Strength & Conditioning', '/strength-conditioning'],
                  ['Women’s Performance', '/womens-fitness'],
                  ['Group Sessions', '/programs']
                ].map(([name, to]) => (
                  <li key={to}>
                    <Link to={to} className="group flex items-center justify-between py-3.5 font-display font-bold uppercase text-[14px] tracking-[0.1em] text-navy hover:text-brand transition-colors">
                      {name}
                      <span aria-hidden="true" className="text-brand text-lg transition-transform group-hover:translate-x-1.5">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link to="/programs" className="btn-primary">Choose a Program</Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={100} className="grid gap-5">
            <div className="overflow-hidden">
              <img src="/images/fitx/gen-dumbbell-rack.jpg" alt="The dumbbell rack at FITX Sahiwal" width={1600} height={900} loading="lazy" decoding="async" className="w-full aspect-[16/9] object-cover" />
            </div>
            <div className="overflow-hidden">
              <img src="/images/fitx/gen-whiteboard.jpg" alt="FITX coach walking a client through their written program" width={1280} height={960} loading="lazy" decoding="async" className="w-full aspect-[16/9] object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* OUR COACHES */}
      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-2 gap-12 items-center">
          <Reveal className="overflow-hidden order-2 lg:order-1">
            <img src="/images/fitx/community/fitx-trainer-neon-sign.webp" alt="FITX trainer under the studio neon sign" width={1600} height={900} loading="lazy" decoding="async" className="w-full aspect-[4/5] object-cover" />
          </Reveal>
          <div className="order-1 lg:order-2">
            <SectionHead
              label="Personal training"
              title="Our coaches"
              copy="FITX programs combined with excellent coaching guarantee results. Our coaches don’t just challenge you — they invest in you."
            />
            <Reveal delay={80}>
              <div className="mt-8">
                <Link to="/trainers" className="btn-primary">Meet Our Coaches</Link>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="shell mt-14 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {(trainers || []).map((t, i) => <TrainerCard key={t.slug} t={t} i={i} />)}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-24 bg-deep border-y border-steel">
        <div className="shell">
          <SectionHead center label="Client testimonials" title="In their words" />
          <div className="mt-12 grid md:grid-cols-3 gap-10">
            {quotes.map((r, i) => <Quote key={r._id} r={r} i={i} />)}
          </div>
          <Reveal className="mt-10 text-center">
            <Link to="/results" className="font-display text-[12px] font-bold uppercase tracking-[0.18em] text-brand hover:text-brand-deep">See all results →</Link>
          </Reveal>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="py-16 sm:py-24">
        <div className="shell">
          <SectionHead center label="Membership" title="Clear programs. Published rates." copy="Group Session Rs 8,500/month · One-to-One Rs 16,000/month · 3 months with 10% off." />
          <Reveal delay={80} className="mt-10 text-center">
            <Link to="/programs" className="btn-primary">View Membership</Link>
          </Reveal>
        </div>
      </section>

      {/* ASSESSMENT */}
      <section className="py-16 sm:py-24 bg-navy">
        <div className="shell text-center">
          <Reveal>
            <p className="font-display text-[12px] font-bold uppercase tracking-[0.28em] text-white/60"><span className="text-brand mr-2" aria-hidden="true">#####</span>Free tool · no account</p>
            <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl text-white mt-2 leading-tight">Know your body. Understand your goal.</h2>
            <p className="mt-4 text-white/70 max-w-md mx-auto">A 2-minute body composition assessment — BMI, body fat, daily energy needs and your healthy range.</p>
            <div className="mt-8">
              <Link to="/body-assessment" className="btn-primary">Calculate My Results</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        image="/images/fitx/hero-coaching.jpg"
        title="Start with a conversation"
        copy="Free consultation at the studio. We assess, you decide."
        waText="Hello FITX, I would like to book a consultation."
      />
    </>
  );
}
