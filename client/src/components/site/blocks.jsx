import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { wa } from '../../lib/brand.js';

export function SectionHead({ label, title, copy, center = false, light = false }) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {label && <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">{label}</p>}
      <h2 className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-[1.08] tracking-tight mt-3 ${light ? 'text-obsidian' : 'text-paper'}`}>{title}</h2>
      {copy && <p className={`mt-4 text-base leading-relaxed ${light ? 'text-obsidian/70' : 'text-silver'}`}>{copy}</p>}
    </Reveal>
  );
}

/** Full-bleed hero like the reference: one image, one line, one action. */
export function PageHero({ label, title, copy, image, cta, ctaTo, crumbs, tall = false }) {
  return (
    <section className={`relative flex items-end overflow-hidden ${tall ? 'min-h-[86svh]' : 'min-h-[62svh] sm:min-h-[70svh]'}`}>
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
      <div className="absolute inset-0 bg-obsidian/55" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-obsidian/30" aria-hidden="true" />
      <div className="shell relative w-full pb-14 sm:pb-20 pt-40">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <Reveal>
          {label && <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">{label}</p>}
          <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl leading-[1.03] tracking-tight text-paper mt-3 max-w-4xl">{title}</h1>
          {copy && <p className="mt-5 max-w-xl text-base sm:text-lg text-silver/90 leading-relaxed">{copy}</p>}
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

/** Big image tile with overlay title — the reference’s signature block. */
export function Tile({ to, image, alt, kicker, title, copy, tall = false }) {
  return (
    <Reveal className="h-full">
      <Link to={to} className="group relative block overflow-hidden h-full min-h-[320px] sm:min-h-[420px]">
        <img src={image} alt={alt} width={1200} height={800} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]" />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/25 to-transparent" aria-hidden="true" />
        <div className={`absolute inset-x-0 bottom-0 p-6 sm:p-8 ${tall ? '' : ''}`}>
          {kicker && <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">{kicker}</p>}
          <h3 className="font-display font-bold text-2xl sm:text-3xl text-paper mt-2 leading-tight">{title}</h3>
          {copy && <p className="mt-2 text-sm text-silver/90 leading-relaxed max-w-md">{copy}</p>}
          <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-brand">
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
      <div className="absolute inset-0 bg-obsidian/75" aria-hidden="true" />
      <div className="shell relative py-20 sm:py-28 text-center">
        <Reveal>
          <h2 className="font-display font-bold text-3xl sm:text-5xl text-paper leading-tight max-w-3xl mx-auto">{title}</h2>
          {copy && <p className="mt-4 text-silver max-w-xl mx-auto leading-relaxed">{copy}</p>}
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link to={to} className="btn-primary">{cta}</Link>
            {waText && <a href={wa(waText)} target="_blank" rel="noopener noreferrer" className="btn-ghost">Talk to a Coach</a>}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Quote({ r, i = 0 }) {
  return (
    <Reveal delay={i * 80} className="h-full">
      <figure className="h-full flex flex-col border-l-2 border-brand/60 pl-6 py-1">
        <blockquote className="text-sm sm:text-base leading-relaxed text-silver flex-1">{r.text}</blockquote>
        <figcaption className="mt-5">
          <p className="font-display font-bold text-sm text-paper">{r.name}</p>
          <p className="text-[11px] uppercase tracking-wider text-muted mt-0.5">{r.source}</p>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-silver/70">
        <li><Link to="/" className="hover:text-brand">Home</Link></li>
        {items.map(([label, to]) => (
          <li key={to || label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {to ? <Link to={to} className="hover:text-brand">{label}</Link> : <span className="text-paper" aria-current="page">{label}</span>}
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
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/85 via-transparent to-transparent" aria-hidden="true" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="font-display font-bold text-xl text-paper">{t.name}</h3>
            <p className="text-xs uppercase tracking-[0.18em] text-brand mt-1">{t.role}</p>
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
            <h3 className="font-display font-bold text-base sm:text-lg text-paper group-open:text-brand">{f.question}</h3>
            <span aria-hidden="true" className="text-brand text-xl transition-transform group-open:rotate-45 shrink-0">+</span>
          </summary>
          <p className="pb-5 text-sm sm:text-base text-silver leading-relaxed max-w-3xl">{f.answer}</p>
        </details>
      ))}
    </div>
  );
}
