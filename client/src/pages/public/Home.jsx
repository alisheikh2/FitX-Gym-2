import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import { BRAND, wa } from '../../lib/brand.js';
import Reveal from '../../components/ui/Reveal.jsx';
import { SectionHead, CTASection, TrainerCard, ReviewCard } from '../../components/site/blocks.jsx';

export default function Home() {
  const { data: trainers } = useFetch('/trainers');
  const { data: programs } = useFetch('/programs');
  const { data: testimonials } = useFetch('/testimonials');
  const { data: settings } = useFetch('/settings');
  const heroHeadline = settings?.brand?.heroHeadline || 'Training that is built around you.';
  const heroSub = settings?.brand?.heroSub || 'One-to-one coaching, structured fat-loss and strength programs, and dedicated women’s hours — in a studio where a coach knows your name, your plan and your progress.';

  const quotes = (testimonials || []).filter((t) => t.kind === 'quote').slice(0, 3);
  const transforms = (testimonials || []).filter((t) => t.kind === 'transformation').slice(0, 2);

  return (
    <>
      <Seo
        title="FITX Personal Fitness Training Studio — Personal Trainer in Sahiwal"
        description="FITX is Sahiwal's dedicated personal training studio in Shadman Town, Faisalabad Road. One-to-one coaching, fat loss, strength & conditioning and dedicated women's hours. Book a consultation."
        path="/"
        image="/images/fitx/fitx-conditioning-medicine-ball.webp"
      />

      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-end lg:items-stretch overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[46%]">
          <img
            src="/images/fitx/trainers/fitx-trainer-zohaib-ali.webp"
            alt="Zohaib Ali, founder of FITX Sahiwal, coaching in the studio"
            width={900} height={1200}
            fetchpriority="high" decoding="async"
            className="h-full w-full object-cover object-[50%_20%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/25 to-obsidian/40 lg:bg-gradient-to-r lg:from-obsidian lg:via-obsidian/10 lg:to-transparent" aria-hidden="true" />
        </div>
        <div className="shell relative w-full py-32 lg:py-0 lg:flex lg:items-center">
          <div className="max-w-2xl lg:pr-10">
            <Reveal>
              <p className="label flex items-center gap-3"><span className="divider-x" aria-hidden="true" />Personal Fitness Training Studio · Sahiwal</p>
            </Reveal>
            <Reveal delay={90}>
              <h1 className="h-display text-[2.6rem] sm:text-6xl lg:text-[4.2rem] mt-5 text-paper">
                {heroHeadline.includes('built around you') ? (
                  <>{heroHeadline.replace('built around you', '').trimEnd()} <span className="text-brand">built around you.</span></>
                ) : (
                  heroHeadline
                )}
              </h1>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 max-w-xl text-base sm:text-lg text-silver leading-relaxed">{heroSub}</p>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/book-consultation" className="btn-primary">Book a Consultation</Link>
                <Link to="/personal-training" className="btn-ghost">Explore Personal Training</Link>
              </div>
            </Reveal>
            <Reveal delay={340}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-muted">
                <span className="flex items-center gap-2">
                  <span className="text-brand font-bold">{BRAND.rating.value}★</span> {BRAND.rating.count} {BRAND.rating.source}
                </span>
                <span aria-hidden="true" className="h-3 w-px bg-steel" />
                <span>Shadman Town, Faisalabad Road</span>
                <span aria-hidden="true" className="h-3 w-px bg-steel" />
                <span>Women’s hours daily</span>
              </div>
            </Reveal>
          </div>
        </div>
        <a href="#story" aria-label="Scroll to learn more" className="absolute bottom-5 left-1/2 -translate-x-1/2 text-silver/70 hover:text-brand animate-bounce">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
        </a>
      </section>

      {/* BRAND STORY */}
      <section id="story" className="py-20 sm:py-28 bg-deep border-y border-steel/50">
        <div className="shell grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <Reveal className="img-zoom relative">
            <div className="aspect-[4/5] max-h-[560px] overflow-hidden">
              <img src="/images/fitx/facility/fitx-facility-floor-02.webp" alt="The FITX Sahiwal training floor — free weights, cable stations, conditioning turf and boxing zone" width={1280} height={960} loading="lazy" decoding="async" className="h-full w-full object-cover object-center" />
            </div>
            <div className="absolute -bottom-4 -right-4 h-24 w-24 border-b-2 border-r-2 border-brand" aria-hidden="true" />
          </Reveal>
          <div>
            <SectionHead
              label="Why FITX"
              title="A studio, not a crowd."
              copy="Most gyms sell you access and leave you alone. FITX was built the other way around: a personal training studio where every member starts with a consultation, trains on a written program, and is coached session after session."
            />
            <Reveal delay={120}>
              <ul className="mt-8 space-y-4">
                {[
                  ['Coached, not self-served', 'Your technique is watched and corrected — that is what you pay for.'],
                  ['Programs with a paper trail', 'Loads, measurements and attendance are recorded so progress is visible.'],
                  ['Built for Sahiwal’s routines', 'Eating guidance and schedules that respect real homes, jobs and families.'],
                  ['A respectful floor for women', 'Dedicated female hours with a female coach, described by members as safe and secure.']
                ].map(([h, p]) => (
                  <li key={h} className="flex gap-4">
                    <span className="mt-1 h-5 w-5 shrink-0 border border-brand text-brand flex items-center justify-center text-[10px] font-bold">✓</span>
                    <p className="text-sm sm:text-base text-silver leading-relaxed"><strong className="text-paper font-semibold">{h}.</strong> {p}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-9 grid grid-cols-3 divide-x divide-steel border-y border-steel">
                {[['8+', 'years coaching in Sahiwal'], ['4', 'dedicated coaches'], ['2', 'daily women’s slots']].map(([v, l]) => (
                  <div key={l} className="py-5 px-3 text-center sm:text-left">
                    <p className="font-display font-bold text-3xl text-brand">{v}</p>
                    <p className="text-[11px] sm:text-xs text-muted mt-1">{l}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROGRAMS — editorial rows */}
      <section className="py-20 sm:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead label="Programs" title="Choose the work. We’ll coach it." />
            <Link to="/programs" className="btn-ghost btn-sm mb-1">Membership & Pricing</Link>
          </div>
          <div className="mt-12 border-t border-steel">
            {(programs || []).map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link to={`/${['personal-training', 'weight-loss-fat-loss', 'strength-conditioning', 'womens-performance', 'group-sessions'].includes(p.slug) ? programRoute(p.slug) : 'programs'}`} className="group grid sm:grid-cols-[3rem_1fr_auto] gap-4 sm:gap-8 items-center py-6 border-b border-steel hover:bg-graphite/60 transition-colors px-2 sm:px-4">
                  <span className="font-display text-sm text-muted">0{i + 1}</span>
                  <span>
                    <span className="font-display font-bold text-xl sm:text-2xl text-paper group-hover:text-brand transition-colors">{p.name}</span>
                    <span className="block text-sm text-muted mt-1 max-w-xl">{p.tagline}</span>
                  </span>
                  <span aria-hidden="true" className="hidden sm:block text-brand text-2xl transition-transform group-hover:translate-x-2">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TRAINERS */}
      <section className="py-20 sm:py-28 bg-deep border-y border-steel/50">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead label="The Coaches" title="Who you’ll train with" copy="Four coaches, four specialisms. Every profile is a real person on our floor — meet them before you visit." />
            <Link to="/trainers" className="btn-ghost btn-sm mb-1">All Trainers</Link>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(trainers || []).map((t, i) => <TrainerCard key={t.slug} t={t} i={i} />)}
          </div>
        </div>
      </section>

      {/* RESULTS PREVIEW */}
      <section className="py-20 sm:py-28">
        <div className="shell grid lg:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div>
            <SectionHead label="Results" title="Proof over promises" copy="We publish real reviews and real member results — with clients’ privacy protected. No stock transformations, no invented statistics." />
            <Reveal delay={140}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {transforms.map((t) => (
                  <div key={t._id} className="img-zoom overflow-hidden border border-steel">
                    <img src={t.image} alt={t.imageAlt} width={800} height={800} loading="lazy" decoding="async" className="h-full w-full object-cover aspect-square" />
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={200}><Link to="/results" className="btn-ghost btn-sm mt-8">See Results & Reviews</Link></Reveal>
          </div>
          <div className="grid sm:grid-cols-1 gap-5">
            {quotes.map((r, i) => <ReviewCard key={r._id} r={r} i={i} />)}
          </div>
        </div>
      </section>

      {/* WOMEN SPLIT */}
      <section className="relative overflow-hidden border-y border-steel/50">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            <img src="/images/fitx/trainers/fitx-trainer-iqra-zahid.webp" alt="Iqra Zahid coaching at FITX Sahiwal" width={800} height={1200} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover object-[60%_20%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" aria-hidden="true" />
          </div>
          <div className="bg-graphite py-16 sm:py-20 px-6 sm:px-12 lg:px-16">
            <Reveal>
              <p className="label flex items-center gap-3"><span className="divider-x" aria-hidden="true" />Women’s Training</p>
              <h2 className="h-display text-3xl sm:text-4xl mt-4 text-paper">Serious coaching. Dedicated hours. A floor of your own.</h2>
              <p className="mt-4 text-silver leading-relaxed">Women train with Iqra Zahid — seven years of experience coaching women in Sahiwal — during dedicated female hours: 10:30 AM – 1:00 PM and 3:00 PM – 6:00 PM.</p>
              <div className="mt-7 flex flex-wrap gap-4">
                <Link to="/womens-fitness" className="btn-primary btn-sm">Women’s Fitness at FITX</Link>
                <a href={wa('Hello FITX, I would like to ask about women’s training hours.')} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">Ask on WhatsApp</a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FACILITIES TEASER */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <img src="/images/fitx/fitx-conditioning-medicine-ball.webp" alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
        <div className="absolute inset-0 bg-obsidian/80" aria-hidden="true" />
        <div className="shell relative text-center max-w-3xl mx-auto">
          <Reveal>
            <p className="label justify-center flex items-center gap-3"><span className="divider-x" aria-hidden="true" />The Studio</p>
            <h2 className="h-display text-3xl sm:text-5xl mt-4 text-paper">Strength floor, conditioning turf, machines and free weights — kept clean, kept working.</h2>
            <Link to="/facilities" className="btn-ghost mt-9">Tour the Facilities</Link>
          </Reveal>
        </div>
      </section>

      {/* BODY ASSESSMENT CTA */}
      <section className="py-16 sm:py-24 bg-deep border-t border-steel/50">
        <div className="shell">
          <Reveal>
            <div className="relative overflow-hidden border border-steel bg-graphite p-8 sm:p-14 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
              <div aria-hidden="true" className="absolute -right-16 -top-16 h-64 w-64 rounded-full border-[22px] border-brand/10" />
              <div aria-hidden="true" className="absolute -right-6 -top-6 h-40 w-40 rounded-full border-[14px] border-brand/20" />
              <div>
                <p className="label flex items-center gap-3"><span className="divider-x" aria-hidden="true" />Free tool · No account needed</p>
                <h2 className="h-display text-3xl sm:text-4xl lg:text-[2.6rem] mt-4 text-paper">Know your body. Understand your goal.</h2>
                <p className="mt-4 text-silver leading-relaxed max-w-lg">Take your quick FITX Body Composition Assessment and discover where to start — BMI, estimated body fat, daily energy needs and a healthy target range, in about two minutes.</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/body-assessment" className="btn-primary">Calculate My Results</Link>
                  <Link to="/book-consultation" className="btn-ghost">Prefer an in-studio assessment?</Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <svg viewBox="0 0 200 110" className="w-full" aria-hidden="true">
                  <path d="M16 100 A84 84 0 0 1 184 100" fill="none" stroke="#202020" strokeWidth="14" strokeLinecap="round" />
                  <path d="M16 100 A84 84 0 0 1 70 24" fill="none" stroke="#777777" strokeWidth="14" strokeLinecap="round" opacity="0.45" />
                  <path d="M70 24 A84 84 0 0 1 136 26" fill="none" stroke="#F59A00" strokeWidth="14" strokeLinecap="round" />
                  <path d="M136 26 A84 84 0 0 1 184 100" fill="none" stroke="#D97700" strokeWidth="14" strokeLinecap="round" opacity="0.55" />
                  <circle cx="100" cy="16" r="9" fill="#fff" />
                  <text x="100" y="78" textAnchor="middle" fill="#F5F5F3" fontSize="17" fontWeight="700" fontFamily="Space Grotesk, sans-serif">WHERE DO I START?</text>
                </svg>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}

function programRoute(slug) {
  return {
    'personal-training': 'personal-training',
    'weight-loss-fat-loss': 'weight-loss',
    'strength-conditioning': 'strength-conditioning',
    'womens-performance': 'womens-fitness',
    'group-sessions': 'programs'
  }[slug];
}
