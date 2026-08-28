import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Reveal from '../ui/Reveal.jsx';
import { wa, BRAND, tel } from '../../lib/brand.js';

/* ============ HERO SLIDER — reference exact: animated text out/in, arrows, JOIN NOW, studio phone ============ */
export function HeroSlider() {
  const slides = [
    { img: '/images/fitx/hero-coaching.jpg', alt: 'FITX coach guiding a client through a barbell session' },
    { img: '/images/fitx/hero-ropes.jpg', alt: 'Conditioning with battle ropes at FITX Sahiwal' },
    { img: '/images/fitx/gen-mixed-group.jpg', alt: 'Members training together at FITX Sahiwal' }
  ];
  const [i, setI] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const go = (next) => {
    setLeaving(true);
    setTimeout(() => { setI((next + slides.length) % slides.length); setLeaving(false); }, 450);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => {
      setLeaving(true);
      setTimeout(() => { setI((v) => (v + 1) % slides.length); setLeaving(false); }, 450);
    }, 6000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="relative h-[100svh] min-h-[620px] overflow-hidden" aria-roledescription="carousel" aria-label="FITX studio">
      {slides.map((sld, idx) => (
        <img
          key={sld.img}
          src={sld.img}
          alt={idx === i ? sld.alt : ''}
          aria-hidden={idx !== i}
          loading={idx === 0 ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1000ms] ${idx === i ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-black/25" aria-hidden="true" />

      {/* side arrows */}
      <button onClick={() => go(i - 1)} aria-label="Previous slide" className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 text-white/90 hover:text-brand text-4xl sm:text-5xl font-light drop-shadow z-10">‹</button>
      <button onClick={() => go(i + 1)} aria-label="Next slide" className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 text-white/90 hover:text-brand text-4xl sm:text-5xl font-light drop-shadow z-10">›</button>

      {/* JOIN NOW pill — right side like reference */}
      <div className="absolute right-[6%] bottom-[26%] hidden md:block z-10">
        <Link to="/book-consultation" className="btn-primary">Join Now</Link>
      </div>

      {/* dynamic text block */}
      <div className="absolute inset-x-0 bottom-0 z-10">
        <div className="shell pb-16 sm:pb-20">
          <div key={i} className={leaving ? 'hero-out' : 'hero-in'}>
            <h1 className="font-display font-extrabold uppercase text-white text-6xl sm:text-8xl lg:text-[7.5rem] leading-none tracking-tight drop-shadow-md">FITX</h1>
            <p className="font-display font-bold uppercase text-white text-lg sm:text-2xl lg:text-3xl mt-2 tracking-wide drop-shadow">Sahiwal’s premier personal training studio</p>
            <p className="text-white/95 text-sm sm:text-lg mt-4 drop-shadow">Sahiwal Studio: {BRAND.phoneDisplay}</p>
          </div>
          <div className="md:hidden mt-6">
            <Link to="/book-consultation" className="btn-primary">Join Now</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ Card with navy title band (reference two-up cards) ============ */
export function BandCard({ to, image, alt, kicker, title, copy }) {
  return (
    <Reveal className="h-full">
      <Link to={to} className="group block h-full">
        <div className="overflow-hidden">
          <img src={image} alt={alt} width={1000} height={620} loading="lazy" decoding="async" className="w-full aspect-[13/8] object-cover" />
        </div>
        <div className="bg-navy px-7 py-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-display font-bold text-brand text-[13px] uppercase tracking-[0.08em]">{kicker}</p>
            <h3 className="font-display text-white text-xl sm:text-2xl uppercase mt-1.5 tracking-wide">{title}</h3>
          </div>
          <span aria-hidden="true" className="text-brand text-2xl transition-transform group-hover:translate-x-2">→</span>
        </div>
        <p className="pt-8 text-[15px] text-silver leading-[1.8]">{copy}</p>
      </Link>
    </Reveal>
  );
}

/* ============ Big uppercase title with orange slash ============ */
export function BigTitle({ children, className = '' }) {
  return (
    <h2 className={`font-display font-extrabold uppercase text-4xl sm:text-5xl text-navy tracking-tight ${className}`}>
      {children} <span className="text-brand" aria-hidden="true">/</span>
    </h2>
  );
}

/* ============ Testimonial carousel — avatar, big quote, square dots ============ */
export function TestimonialCarousel({ items }) {
  const [i, setI] = useState(0);
  const [leaving, setLeaving] = useState(false);
  useEffect(() => {
    if (!items.length) return;
    const t = setInterval(() => {
      setLeaving(true);
      setTimeout(() => { setI((v) => (v + 1) % items.length); setLeaving(false); }, 450);
    }, 7000);
    return () => clearInterval(t);
  }, [items.length]);
  if (!items.length) return null;
  const r = items[i];
  const initials = (r.name || '?').split(' ').map((p) => p[0]).slice(0, 2).join('');

  return (
    <div className="text-center">
      <div key={i} className={leaving ? 'hero-out' : 'hero-in'}>
        <span className="mx-auto h-40 w-40 rounded-full bg-navy text-white font-display font-extrabold text-4xl flex items-center justify-center uppercase" aria-hidden="true">{initials}</span>
        <blockquote className="mt-12 max-w-4xl mx-auto text-lg sm:text-2xl leading-relaxed text-navy/90">
          <span className="text-brand font-display font-extrabold text-2xl align-top" aria-hidden="true">“</span>
          {r.text}
          <span className="text-brand font-display font-extrabold text-2xl align-top" aria-hidden="true">”</span>
        </blockquote>
        <p className="mt-10 text-brand text-sm">{r.name}</p>
      </div>
      <div className="mt-12 flex justify-center gap-2" role="tablist" aria-label="Testimonials">
        {items.map((t, idx) => (
          <button
            key={t._id || idx}
            onClick={() => { setLeaving(true); setTimeout(() => { setI(idx); setLeaving(false); }, 300); }}
            role="tab"
            aria-selected={idx === i}
            aria-label={`Testimonial ${idx + 1}`}
            className={`h-2.5 w-2.5 border ${idx === i ? 'border-brand bg-transparent' : 'border-silver/60 hover:border-brand'}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ============ Floating scroll-top (reference) ============ */
export function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full bg-brand text-white flex items-center justify-center shadow-lift hover:bg-brand-deep transition-colors"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M6 14l6-6 6 6" /></svg>
    </button>
  );
}

/* ============ kept components ============ */
export function SectionHead({ label, title, copy, center = false }) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {label && <p className="font-display text-[12px] font-bold uppercase tracking-[0.28em] text-brand">{label}</p>}
      <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl leading-[1.12] tracking-tight text-navy mt-2">{title}</h2>
      {copy && <p className="mt-4 text-[15px] leading-relaxed text-silver">{copy}</p>}
    </Reveal>
  );
}

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

export function CTABand({ title, copy, cta = 'Book a Consultation', to = '/book-consultation', waText }) {
  return (
    <section className="bg-navy">
      <div className="shell py-16 sm:py-20 text-center">
        <Reveal>
          <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl text-white leading-tight max-w-3xl mx-auto">{title}</h2>
          {copy && <p className="mt-4 text-white/70 max-w-xl mx-auto leading-relaxed">{copy}</p>}
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link to={to} className="btn-primary">{cta}</Link>
            {waText && <a href={wa(waText)} target="_blank" rel="noopener noreferrer" className="btn btn-ghost !border-white/40 !text-white hover:!border-brand hover:!text-brand !rounded-full">Talk to a Coach</a>}
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

export function CallNow() {
  return (
    <section className="py-12 sm:py-16">
      <div className="shell text-center">
        <a href={tel} className="btn-primary">Call Now</a>
      </div>
    </section>
  );
}
