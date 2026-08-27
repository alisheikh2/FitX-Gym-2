import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { wa } from '../../lib/brand.js';

export function SectionHead({ label, title, copy, center = false }) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {label && <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-brand">{label}</p>}
      <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl leading-[1.1] tracking-tight text-navy mt-3">{title}</h2>
      {copy && <p className="mt-4 text-base leading-relaxed text-silver">{copy}</p>}
    </Reveal>
  );
}

/** Full-bleed hero — one image, one line, one action (reference style). */
export function PageHero({ label, title, copy, image, cta, ctaTo, crumbs, tall = false }) {
  return (
    <section className={`relative flex items-end overflow-hidden ${tall ? 'min-h-[88svh]' : 'min-h-[62svh] sm:min-h-[70svh]'}`}>
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
      <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" aria-hidden="true" />
      <div className="shell relative w-full pb-14 sm:pb-20 pt-40">
        {crumbs && <Breadcrumbs items={crumbs} dark />}
        <Reveal>
          {label && <p className="font-display text-xs font-bold uppercase tracking-[0.22em] text-brand">{label}</p>}
          <h1 className="font-display font-extrabold uppercase text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-white mt-3 max-w-4xl">{title}</h1>
          {copy && <p className="mt-5 max-w-xl text-base sm:text-lg text-white/85 leading-relaxed">{copy}</p>}
          {cta && ctaTo && (
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to={ctaTo} className="btn-primary">{cta}</Link>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/** Big image tile with overlay title. */
export function Tile({ to, image, alt, kicker, title, copy }) {
  return (
    <Reveal className="h-full">
      <Link to={to} className="group relative block overflow-hidden h-full min-h-[320px] sm:min-h-[420px]">
        <img src={image} alt={alt} width={1200} height={800} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          {kicker && <p className="font-display text-[11px] font-bold uppercase tracking-[0.22em] text-brand">{kicker}</p>}
          <h3 className="font-display font-extrabold uppercase text-2xl sm:text-3xl text-white mt-2 leading-tight">{title}</h3>
          {copy && <p className="mt-2 text-sm text-white/80 leading-relaxed max-w-md">{copy}</p>}
          <span className="inline-flex items-center gap-2 mt-4 font-display text-sm font-bold uppercase tracking-wider text-white group-hover:text-brand transition-colors">
            Explore <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

/** Full-width image band with a single message + CTA. */
export function CTABand({ image, title, copy, cta = 'Book a Consultation', to = '/book-consultation', waText }) {
  return (
    <section className="relative overflow-hidden">
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
      <div className="shell relative py-20 sm:py-28 text-center">
        <Reveal>
          <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl text-white leading-tight max-w-3xl mx-auto">{title}</h2>
          {copy && <p className="mt-4 text-white/80 max-w-xl mx-auto leading-relaxed">{copy}</p>}
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
  return (
    <Reveal delay={i * 80} className="h-full">
      <figure className="h-full flex flex-col border-l-2 border-brand pl-6 py-1">
        <blockquote className="text-sm sm:text-base leading-relaxed text-silver flex-1">{r.text}</blockquote>
        <figcaption className="mt-5">
          <p className="font-display font-bold text-sm uppercase tracking-wide text-navy">{r.name}</p>
          <p className="text-[11px] uppercase tracking-wider text-muted mt-0.5">{r.source}</p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Breadcrumbs({ items, dark = false }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className={`flex flex-wrap items-center gap-2 text-xs ${dark ? 'text-white/60' : 'text-muted'}`}>
        <li><Link to="/" className="hover:text-brand">Home</Link></li>
        {items.map(([label, to]) => (
          <li key={to || label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {to ? <Link to={to} className="hover:text-brand">{label}</Link> : <span className={dark ? 'text-white' : 'text-navy'} aria-current="page">{label}</span>}
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
        <div className="relative overflow-hidden aspect-[3/4]">
          <img src={t.photo} alt={t.photoAlt || `${t.name}, ${t.role} at FITX Sahiwal`} width={800} height={1066} loading="lazy" decoding="async" className="h-full w-full object-cover object-top transition-transform duration-[1.4s] group-hover:scale-[1.05]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-display font-extrabold uppercase text-xl text-white">{t.name}</h3>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-brand mt-1">{t.role}</p>
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
