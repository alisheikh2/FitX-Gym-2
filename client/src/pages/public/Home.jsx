import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import { BRAND, wa, tel } from '../../lib/brand.js';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, Tile, CTABand, Quote, SectionHead, TrainerCard } from '../../components/site/blocks.jsx';

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
        image="/images/fitx/facility/fitx-facility-floor-02.webp"
      />

      {/* HERO — one image, one line, one action */}
      <PageHero
        tall
        label="Shadman Town · Sahiwal"
        title="Sahiwal’s most serious training studio."
        copy="Personal training, fat loss, strength & women’s performance — coached session after session."
        image="/images/fitx/facility/fitx-facility-floor-02.webp"
      />
      <div className="bg-brand text-obsidian">
        <div className="shell py-3 flex flex-wrap items-center justify-center gap-x-8 gap-y-1 text-[13px] font-bold tracking-wide">
          <a href={tel} className="hover:underline">{BRAND.phoneDisplay}</a>
          <span aria-hidden="true" className="hidden sm:block h-3 w-px bg-obsidian/30" />
          <span>{BRAND.hoursWeek}</span>
          <span aria-hidden="true" className="hidden sm:block h-3 w-px bg-obsidian/30" />
          <Link to="/book-consultation" className="hover:underline uppercase">Free Consultation</Link>
        </div>
      </div>

      {/* TILES — who we are / women / strength */}
      <section className="py-16 sm:py-24">
        <div className="shell grid md:grid-cols-2 gap-5">
          <Tile
            to="/about"
            image="/images/fitx/trainers/fitx-founder-training-session.webp"
            alt="Coach training with dumbbells on the FITX Sahiwal floor"
            kicker="Who we are"
            title="A studio, not a crowd."
            copy="Every member trains on a written program with a coach watching."
          />
          <Tile
            to="/womens-fitness"
            image="/images/fitx/trainers/fitx-trainer-iqra-zahid.webp"
            alt="Iqra Zahid coaching at FITX Sahiwal"
            kicker="Women’s training"
            title="Dedicated hours. Female coach."
            copy="10:30–1 & 3–6 daily, with coach Iqra Zahid."
          />
        </div>
        <div className="shell mt-5 grid md:grid-cols-2 gap-5">
          <Tile
            to="/weight-loss"
            image="/images/fitx/results/fitx-transformation-01.webp"
            alt="Before and after fat loss result from FITX Sahiwal"
            kicker="Fat loss"
            title="Results you can measure."
            copy="Structured training + practical nutrition, tracked weekly."
          />
          <Tile
            to="/strength-conditioning"
            image="/images/fitx/fitx-conditioning-medicine-ball.webp"
            alt="Conditioning work on the FITX Sahiwal turf"
            kicker="Strength & conditioning"
            title="Earn the load."
            copy="Technique first. Strength that carries into sport and life."
          />
        </div>
      </section>

      {/* PROGRAMS — split with collage */}
      <section className="py-16 sm:py-24 bg-deep border-y border-steel/50">
        <div className="shell grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead
              label="What we do"
              title="Our programs"
              copy="One-to-one coaching built around your goal — assessed, programmed, tracked."
            />
            <Reveal delay={100}>
              <ul className="mt-8 divide-y divide-steel border-y border-steel">
                {[
                  ['One-to-One Personal Training', '/personal-training'],
                  ['Weight Loss & Fat Loss', '/weight-loss'],
                  ['Strength & Conditioning', '/strength-conditioning'],
                  ['Women’s Performance', '/womens-fitness'],
                  ['Group Sessions', '/programs']
                ].map(([name, to]) => (
                  <li key={to}>
                    <Link to={to} className="group flex items-center justify-between py-4 text-paper hover:text-brand transition-colors">
                      <span className="font-display font-bold text-lg">{name}</span>
                      <span aria-hidden="true" className="text-brand text-xl transition-transform group-hover:translate-x-1.5">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/programs" className="btn-ghost btn-sm">Membership & Pricing</Link>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120} className="grid grid-cols-2 gap-4">
            <img src="/images/fitx/trainers/fitx-trainer-zohaib-ali.webp" alt="Zohaib Ali training at FITX Sahiwal" width={900} height={1200} loading="lazy" decoding="async" className="w-full aspect-[3/4] object-cover object-top" />
            <img src="/images/fitx/facility/fitx-strength-squat-rack.webp" alt="Squat rack at FITX Sahiwal" width={1200} height={1066} loading="lazy" decoding="async" className="w-full aspect-[3/4] object-cover mt-8" />
          </Reveal>
        </div>
      </section>

      {/* COACHES */}
      <section className="py-16 sm:py-24">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead label="Personal training" title="Our coaches" copy="Four specialists. One standard: your progress, coached." />
            <Link to="/trainers" className="btn-ghost btn-sm mb-1">Meet the Coaches</Link>
          </div>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-5">
            {(trainers || []).map((t, i) => <TrainerCard key={t.slug} t={t} i={i} />)}
          </div>
        </div>
      </section>

      {/* EVERY STAGE */}
      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-2 gap-10 items-center">
          <Reveal className="overflow-hidden">
            <img src="/images/fitx/community/fitx-senior-member-training.webp" alt="A senior member training on a machine at FITX Sahiwal" width={1200} height={1600} loading="lazy" decoding="async" className="w-full aspect-[4/5] object-cover object-top" />
          </Reveal>
          <div>
            <SectionHead
              label="Every stage"
              title="It’s never too late to start."
              copy="First-timers, athletes, returning members, older adults — everyone trains coached, progressed sensibly and safely."
            />
            <Reveal delay={100}>
              <div className="mt-7">
                <Link to="/book-consultation" className="btn-primary btn-sm">Start With a Consultation</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RESULTS BAND */}
      <CTABand
        image="/images/fitx/results/fitx-transformation-02.webp"
        title={`Rated ${BRAND.rating.value} on Google. Proof over promises.`}
        copy="Real reviews, real transformations — shared with clients’ privacy protected."
        cta="See Results"
        to="/results"
      />

      {/* TESTIMONIALS */}
      <section className="py-16 sm:py-24">
        <div className="shell">
          <SectionHead label="Client testimonials" title="In their words" center />
          <div className="mt-12 grid md:grid-cols-3 gap-10">
            {quotes.map((r, i) => <Quote key={r._id} r={r} i={i} />)}
          </div>
        </div>
      </section>

      {/* ASSESSMENT */}
      <section className="py-16 sm:py-24 bg-deep border-t border-steel/50">
        <div className="shell text-center">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Free tool · no account</p>
            <h2 className="font-display font-bold text-3xl sm:text-5xl text-paper mt-3 leading-tight">Know your body.<br className="hidden sm:block" /> Understand your goal.</h2>
            <p className="mt-4 text-silver max-w-md mx-auto">A 2-minute body composition assessment — BMI, body fat, daily energy needs and your healthy range.</p>
            <div className="mt-8">
              <Link to="/body-assessment" className="btn-primary">Calculate My Results</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        image="/images/fitx/community/fitx-gym-gathering-5.webp"
        title="Start with a conversation."
        copy="Free consultation at the studio. We assess, you decide."
        waText="Hello FITX, I would like to book a consultation."
      />
    </>
  );
}
