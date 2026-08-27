import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { wa } from '../../lib/brand.js';

/** Reference-style kicker + uppercase heading */
export function SectionHead({ label, title, copy, center = false }) {
  return (
    <Reveal className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      {label && (
        <p className={`font-display text-[12px] font-bold uppercase tracking-[0.28em] text-silver ${center ? '' : ''}`}>
          <span className="text-brand mr-2" aria-hidden="true">#####</span>{label}
        </p>
      )}
      <h2 className="font-display font-extrabold uppercase text-3xl sm:text-4xl leading-[1.12] tracking-tight text-navy mt-2">{title}</h2>
      {copy && <p className="mt-4 text-[15px] leading-relaxed text-silver">{copy}</p>}
    </Reveal>
  );
}

export function PageHero({ label, title, copy, image, cta, ctaTo, crumbs, tall = false }) {
  return (
    <section className={`relative flex items-end overflow-hidden ${tall ? 'min-h-[92svh]' : 'min-h-[46svh] sm:min-h-[52svh]'}`}>
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />
      <div className={`shell relative w-full ${tall ? 'pb-16 sm:pb-24 pt-44 md:pt-52' : 'pb-10 sm:pb-14 pt-36 md:pt-44'}`}>
        <Reveal>
          {label && <p className="font-display text-[12px] font-bold uppercase tracking-[0.28em] text-white/80">{label}</p>}
          <h1 className={`font-display font-extrabold uppercase text-white mt-2 max-w-4xl ${tall ? 'text-4xl sm:text-6xl lg:text-7xl leading-[1.04]' : 'text-3xl sm:text-5xl leading-[1.08]'} tracking-tight`}>{title}</h1>
          {copy && <p className={`mt-4 max-w-xl text-white/85 leading-relaxed ${tall ? 'text-base sm:text-lg' : 'text-[15px]'}`}>{copy}</p>}
          {tall && (
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/book-consultation" className="btn-primary">Book a Consultation</Link>
              <Link to="/personal-training" className="btn btn-ghost !border-white/50 !text-white hover:!border-brand hover:!text-brand">Explore Training</Link>
            </div>
          )}
          {cta && ctaTo && !tall && (
            <div className="mt-6 flex flex-wrap gap-4">
              <Link to={ctaTo} className="btn-primary">{cta}</Link>
            </div>
          )}
        </Reveal>
      </div>
      {crumbs && (
        <div className="absolute top-0 inset-x-0 pt-32 md:pt-40">
          <div className="shell"><Breadcrumbs items={crumbs} dark /></div>
        </div>
      )}
    </section>
  );
}

/** Reference’s two-up image card: title bar over image + paragraph + read more */
export function ImageCard({ to, image, alt, kicker, title, copy }) {
  return (
    <Reveal className="h-full">
      <Link to={to} className="group block h-full">
        <div className="relative overflow-hidden">
          <img src={image} alt={alt} width={1200} height={600} loading="lazy" decoding="async" className="w-full aspect-[2/1] object-cover transition-transform duration-[1.4s] group-hover:scale-[1.05]" />
          <div className="absolute inset-x-0 bottom-0 bg-navy/85 px-5 sm:px-6 py-3.5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            {kicker && <span className="font-display text-[11px] font-bold uppercase tracking-[0.2em] text-brand">{kicker}</span>}
            <span className="font-display font-extrabold uppercase text-white text-lg sm:text-xl">{title}</span>
          </div>
        </div>
        <div className="pt-5">
          <p className="text-[15px] text-silver leading-relaxed">{copy}</p>
          <span className="mt-3 inline-flex items-center gap-2 font-display text-[12px] font-bold uppercase tracking-[0.14em] text-navy group-hover:text-brand transition-colors">
            Read more <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function CTABand({ image, title, copy, cta = 'Book a Consultation', to = '/book-consultation', waText }) {
  return (
    <section className="relative overflow-hidden">
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-black/70" aria-hidden="true" />
      <div className="shell relative py-20 sm:py-24 text-center">
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

export function Breadcrumbs({ items, dark = false }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={`flex flex-wrap items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.18em] ${dark ? 'text-white/70' : 'text-muted'}`}>
        <li><Link to="/" className="hover:text-brand">Home</Link></li>
        {items.map(([label, to]) => (
          <li key={to || label} className="flex items-center gap-2">
            <span aria-hidden="true" className="text-brand">/</span>
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
        <div className="overflow-hidden">
          <img src={t.photo} alt={t.photoAlt || `${t.name}, ${t.role} at FITX Sahiwal`} width={800} height={1066} loading="lazy" decoding="async" className="w-full aspect-[3/4] object-cover object-top transition-transform duration-[1.4s] group-hover:scale-[1.05]" />
        </div>
        <div className="pt-4 text-center">
          <h3 className="font-display font-extrabold uppercase text-lg text-navy group-hover:text-brand transition-colors">{t.name}</h3>
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-brand mt-1">{t.role}</p>
          <p className="text-[13px] text-silver mt-2 leading-relaxed line-clamp-2">{t.shortBio}</p>
          <span className="mt-3 inline-flex items-center gap-2 font-display text-[11px] font-bold uppercase tracking-[0.14em] text-navy group-hover:text-brand">
            Meet coach <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </span>
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
