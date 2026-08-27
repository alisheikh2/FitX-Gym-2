import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Reveal from '../ui/Reveal.jsx';
import { wa } from '../../lib/brand.js';

/** Revolution-slider style hero (home only): text over slider is the reference’s own pattern. */
export function HeroSlider() {
  const slides = [
    {
      img: '/images/fitx/hero-ropes.jpg',
      kicker: 'Shadman Town · Sahiwal',
      title: 'The most serious training studio in Sahiwal',
      sub: 'Strength, conditioning and fat loss — coached with precision, session after session.'
    },
    {
      img: '/images/fitx/hero-coaching.jpg',
      kicker: 'Personal training',
      title: 'One coach. One plan. Your results.',
      sub: 'Every session coached one-to-one — from your first consultation to your final rep.'
    },
    {
      img: '/images/fitx/hero-women.jpg',
      kicker: 'Women’s performance',
      title: 'Dedicated hours. Dedicated coach.',
      sub: 'Women train 10:30–1 & 3–6 daily with coach Iqra Zahid — strength, fat loss, confidence.'
    }
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="relative min-h-[92svh] flex items-end overflow-hidden" aria-roledescription="carousel" aria-label="FITX highlights">
      {slides.map((s, idx) => (
        <img
          key={s.img}
          src={s.img}
          alt=""
          aria-hidden="true"
          loading={idx === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${idx === i ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" aria-hidden="true" />

      <div className="shell relative w-full pb-20 sm:pb-24 pt-44 md:pt-52">
        <div key={i} className="animate-fade-up max-w-3xl">
          <p className="font-display text-[12px] font-bold uppercase tracking-[0.28em] text-white/80">{slides[i].kicker}</p>
          <h1 className="font-display font-extrabold uppercase text-white text-4xl sm:text-6xl lg:text-7xl leading-[1.04] tracking-tight mt-3">{slides[i].title}</h1>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed">{slides[i].sub}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link to="/book-consultation" className="btn-primary">Book a Consultation</Link>
            <Link to="/personal-training" className="btn btn-ghost !border-white/50 !text-white hover:!border-brand hover:!text-brand">Explore Training</Link>
          </div>
        </div>
        <div className="mt-12 flex items-center gap-5">
          <button onClick={() => setI((i - 1 + slides.length) % slides.length)} aria-label="Previous slide" className="h-11 w-11 border border-white/30 text-white hover:border-brand hover:text-brand transition-colors font-display">←</button>
          <button onClick={() => setI((i + 1) % slides.length)} aria-label="Next slide" className="h-11 w-11 border border-white/30 text-white hover:border-brand hover:text-brand transition-colors font-display">→</button>
          <div className="flex gap-2" role="tablist" aria-label="Slides">
            {slides.map((s, idx) => (
              <button
                key={s.img}
                onClick={() => setI(idx)}
                role="tab"
                aria-selected={idx === i}
                aria-label={`Slide ${idx + 1}`}
                className={`h-1 transition-all duration-500 ${idx === i ? 'w-10 bg-brand' : 'w-5 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SectionHead({ label, title, copy, center = false }) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {label && (
        <p className="font-display text-[12px] font-bold uppercase tracking-[0.28em] text-silver">
          <span className="text-brand mr-2" aria-hidden="true">#####</span>{label}
        </p>
      )}
      <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl leading-[1.12] tracking-tight text-navy mt-2">{title}</h2>
      {copy && <p className="mt-4 text-[15px] leading-relaxed text-silver">{copy}</p>}
    </Reveal>
  );
}

/** Inner-page banner — reference style: plain dark banner, numbered breadcrumb, NO photo. */
export function PageHero({ title, copy, crumbs, cta, ctaTo }) {
  return (
    <section className="bg-navy">
      <div className="shell pt-32 md:pt-36 pb-12 sm:pb-16">
        <Reveal>
          <h1 className="font-display font-extrabold uppercase text-white text-3xl sm:text-5xl tracking-tight">{title}</h1>
          {crumbs && (
            <nav aria-label="Breadcrumb" className="mt-4">
              <ol className="flex flex-wrap items-center gap-3 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-white/50">
                <li><span className="text-brand">1.</span> <Link to="/" className="hover:text-brand">Home</Link></li>
                {crumbs.map(([label], idx) => (
                  <li key={label}><span className="text-brand">{idx + 2}.</span> <span className="text-white/80" aria-current="page">{label}</span></li>
                ))}
              </ol>
            </nav>
          )}
          {copy && <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70">{copy}</p>}
          {cta && ctaTo && (
            <div className="mt-7 flex flex-wrap gap-4">
              <Link to={ctaTo} className="btn-primary">{cta}</Link>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** Reference two-up card: clean image, title row + paragraph BELOW — never on top. */
export function ImageCard({ to, image, alt, kicker, title, copy }) {
  return (
    <Reveal className="h-full">
      <Link to={to} className="group block h-full">
        <div className="overflow-hidden">
          <img src={image} alt={alt} width={1200} height={600} loading="lazy" decoding="async" className="w-full aspect-[2/1] object-cover transition-transform duration-[1.4s] group-hover:scale-[1.05]" />
        </div>
        <div className="pt-5">
          <h3 className="font-display font-extrabold uppercase text-lg sm:text-xl text-navy group-hover:text-brand transition-colors leading-snug">
            <span className="text-brand">{kicker}</span> <span className="mx-1 text-steel" aria-hidden="true">/</span> {title}
          </h3>
          <p className="mt-3 text-[15px] text-silver leading-relaxed">{copy}</p>
        </div>
      </Link>
    </Reveal>
  );
}

/** Clean CTA band — navy section, no image, centered (reference has no text-over-image bands). */
export function CTABand({ title, copy, cta = 'Book a Consultation', to = '/book-consultation', waText }) {
  return (
    <section className="bg-navy">
      <div className="shell py-16 sm:py-20 text-center">
        <Reveal>
          <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl text-white leading-tight max-w-3xl mx-auto">{title}</h2>
          {copy && <p className="mt-4 text-white/70 max-w-xl mx-auto leading-relaxed">{copy}</p>}
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link to={to} className="btn-primary">{cta}</Link>
            {waText && <a href={wa(waText)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !border-white/40 !text-white hover:!border-brand hover:!text-brand">Talk to a Coach</a>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Quote({ r, i = 0 }) {
  const initials = (r.name || '?').split(' ').map((p) => p[0]).slice(0, 2).join('');
  return (
    <Reveal delay={i * 80} className="h-full">
      <figure className="h-full flex flex-col items-center text-center px-2">
        <span className="h-14 w-14 rounded-full bg-brand text-white font-display font-extrabold uppercase flex items-center justify-center text-lg" aria-hidden="true">{initials}</span>
        <blockquote className="mt-5 text-sm leading-relaxed text-silver flex-1">{r.text}</blockquote>
        <figcaption className="mt-5">
          <p className="font-display font-bold text-[13px] uppercase tracking-[0.14em] text-navy">{r.name}</p>
          <p className="text-[11px] uppercase tracking-wider text-muted mt-0.5">{r.source}</p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
        <li><Link to="/" className="hover:text-brand">Home</Link></li>
        {items.map(([label, to]) => (
          <li key={to || label} className="flex items-center gap-2">
            <span aria-hidden="true" className="text-brand">/</span>
            {to ? <Link to={to} className="hover:text-brand">{label}</Link> : <span className="text-navy" aria-current="page">{label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Reference coach card: photo, then COACH label + name + bio below. */
export function TrainerCard({ t, i = 0 }) {
  return (
    <Reveal delay={i * 70} className="h-full">
      <Link to={`/trainers/${t.slug}`} className="group block h-full">
        <div className="overflow-hidden bg-deep">
          <img src={t.photo} alt={t.photoAlt || `${t.name}, ${t.role} at FITX Sahiwal`} width={800} height={1066} loading="lazy" decoding="async" className="w-full aspect-[3/4] object-cover object-top transition-transform duration-[1.4s] group-hover:scale-[1.05]" />
        </div>
        <div className="pt-4">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-brand">Coach</p>
          <h3 className="font-display font-extrabold uppercase text-lg text-navy group-hover:text-brand transition-colors mt-1">{t.name}</h3>
          <p className="text-[13px] text-silver mt-2 leading-relaxed">{t.role}{t.experienceYears ? ` · ${t.experienceYears} yrs` : ''}. {t.shortBio}</p>
        </div>
      </Link>
    </Reveal>
  );
}

export function FAQAccordion({ items }) {
  return (
    <div className="divide-y divide-steel border-y border-steel">
      {items.map((f, i) => (
        <details key={f._id || i} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
            <h3 className="font-display font-bold text-base sm:text-lg text-navy group-open:text-brand">{f.question}</h3>
            <span aria-hidden="true" className="text-brand text-xl transition-transform group-open:rotate-45 shrink-0">+</span>
          </summary>
          <p className="pb-5 text-sm sm:text-base text-silver leading-relaxed max-w-3xl">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
