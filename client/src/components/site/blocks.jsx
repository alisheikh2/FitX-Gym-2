import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Reveal from '../ui/Reveal.jsx';
import { wa, BRAND } from '../../lib/brand.js';

/** Clean full-bleed slider like the reference: bright image, side arrows, square dots,
 *  studio phone bottom-left, JOIN NOW pill right. Headline lives in the section below. */
export function HeroSlider() {
  const slides = [
    { img: '/images/fitx/hero-ropes.jpg', alt: 'Client training on a cable machine in the bright FITX studio' },
    { img: '/images/fitx/hero-coaching.jpg', alt: 'FITX coach guiding a client through a dumbbell session' },
    { img: '/images/fitx/gen-mixed-group.jpg', alt: 'Members training together at FITX Sahiwal' }
  ];
  const [i, setI] = useState(0);
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="relative min-h-[88svh] overflow-hidden" aria-roledescription="carousel" aria-label="FITX studio">
      {slides.map((sld, idx) => (
        <img
          key={sld.img}
          src={sld.img}
          alt={idx === i ? sld.alt : ''}
          aria-hidden={idx !== i}
          loading={idx === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${idx === i ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/45 to-transparent" aria-hidden="true" />

      {/* side arrows */}
      <button onClick={() => setI((i - 1 + slides.length) % slides.length)} aria-label="Previous slide" className="absolute left-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-brand text-4xl font-light drop-shadow">‹</button>
      <button onClick={() => setI((i + 1) % slides.length)} aria-label="Next slide" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/90 hover:text-brand text-4xl font-light drop-shadow">›</button>

      {/* bottom bar: studio phone + join now */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="shell flex items-center justify-between pb-6">
          <p className="font-display text-[13px] sm:text-sm font-bold uppercase tracking-[0.14em] text-white drop-shadow">Sahiwal Studio: {BRAND.phoneDisplay}</p>
          <Link to="/book-consultation" className="btn-primary !rounded-full btn-sm">Join Now</Link>
        </div>
        <div className="shell flex justify-center pb-5" role="tablist" aria-label="Slides">
          <div className="flex gap-2 bg-white/90 px-3 py-2">
            {slides.map((sld, idx) => (
              <button
                key={sld.img}
                onClick={() => setI(idx)}
                role="tab"
                aria-selected={idx === i}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2.5 w-2.5 border ${idx === i ? 'border-brand bg-brand' : 'border-silver/70 bg-transparent hover:border-brand'}`}
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
        <p className="font-display text-[12px] font-bold uppercase tracking-[0.28em] text-brand">{label}</p>
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
          <div className="mt-3 flex gap-2">
            <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" aria-label={`${t.name} on Facebook`} onClick={(e) => e.stopPropagation()} className="h-8 w-8 border border-steel flex items-center justify-center text-navy/70 hover:bg-brand hover:border-brand hover:text-white transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 22v-8h3l.5-4H13V7.5c0-1.1.3-1.5 1.7-1.5H16.6V2.2C15.9 2.1 14.7 2 13.6 2 10.6 2 9 3.7 9 7v3H6v4h3v8h4z"/></svg>
            </a>
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label={`${t.name} on Instagram`} onClick={(e) => e.stopPropagation()} className="h-8 w-8 border border-steel flex items-center justify-center text-navy/70 hover:bg-brand hover:border-brand hover:text-white transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c2.7 0 3 .01 4.1.06 1.1.05 1.8.22 2.5.49.7.26 1.3.62 1.9 1.2.6.6.95 1.2 1.2 1.9.27.7.44 1.4.49 2.5.05 1.1.06 1.4.06 4.1s-.01 3-.06 4.1c-.05 1.1-.22 1.8-.49 2.5-.26.7-.62 1.3-1.2 1.9-.6.6-1.2.95-1.9 1.2-.7.27-1.4.44-2.5.49-1.1.05-1.4.06-4.1.06s-3-.01-4.1-.06c-1.1-.05-1.8-.22-2.5-.49-.7-.26-1.3-.62-1.9-1.2-.6-.6-.95-1.2-1.2-1.9-.27-.7-.44-1.4-.49-2.5C2.01 15 2 14.7 2 12s.01-3 .06-4.1c.05-1.1.22-1.8.49-2.5.26-.7.62-1.3 1.2-1.9.6-.6 1.2-.95 1.9-1.2.7-.27 1.4-.44 2.5-.49C9 2.01 9.3 2 12 2zm0 4.9a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 2a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2z"/></svg>
            </a>
          </div>
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

/** Reference signature: centered orange Call Now pill at the end of every inner page. */
export function CallNow() {
  return (
    <section className="py-12 sm:py-16">
      <div className="shell text-center">
        <a href={`tel:${BRAND.phoneIntl}`} className="btn-primary">Call Now</a>
      </div>
    </section>
  );
}
