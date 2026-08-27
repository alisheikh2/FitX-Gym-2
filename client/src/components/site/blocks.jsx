import { Link } from 'react-router-dom';
import Reveal from '../ui/Reveal.jsx';
import { wa } from '../../lib/brand.js';

export function SectionHead({ label, title, copy, align = 'left', dark = false }) {
  return (
    <Reveal className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      {label && (
        <p className={`label flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="divider-x" aria-hidden="true" />{label}
        </p>
      )}
      <h2 className={`h-display text-3xl sm:text-4xl lg:text-[2.75rem] mt-4 ${dark ? 'text-obsidian' : 'text-paper'}`}>{title}</h2>
      {copy && <p className={`mt-4 text-base leading-relaxed ${dark ? 'text-obsidian/70' : 'text-silver'}`}>{copy}</p>}
    </Reveal>
  );
}

export function CTASection({
  title = 'Start with a conversation, not a contract.',
  copy = 'Book a free consultation at the studio. We will look at your goal, your schedule and your starting point — then recommend the right way to train. No pressure, no hard sell.',
  image = '/images/fitx/trainers/fitx-founder-training-session.webp'
}) {
  return (
    <section className="relative overflow-hidden">
      <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover object-center" loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-obsidian/85" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/60 to-transparent" aria-hidden="true" />
      <div className="shell relative py-20 sm:py-24">
        <Reveal className="max-w-xl">
          <p className="label flex items-center gap-3"><span className="divider-x" aria-hidden="true" />Ready when you are</p>
          <h2 className="h-display text-3xl sm:text-4xl mt-4 text-paper">{title}</h2>
          <p className="mt-4 text-silver leading-relaxed">{copy}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/book-consultation" className="btn-primary">Book a Consultation</Link>
            <a href={wa('Hello FITX, I would like to talk to a coach about training.')} target="_blank" rel="noopener noreferrer" className="btn-ghost">Talk to a Coach on WhatsApp</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function PageHero({ label, title, copy, image, crumbs }) {
  return (
    <section className="relative pt-32 sm:pt-40 pb-14 sm:pb-20 overflow-hidden">
      {image && (
        <>
          <img src={image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="eager" decoding="async" />
          <div className="absolute inset-0 bg-obsidian/80" aria-hidden="true" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/70" aria-hidden="true" />
        </>
      )}
      <div className="shell relative">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <Reveal>
          {label && <p className="label flex items-center gap-3"><span className="divider-x" aria-hidden="true" />{label}</p>}
          <h1 className="h-display text-4xl sm:text-5xl lg:text-6xl mt-4 max-w-3xl text-paper">{title}</h1>
          {copy && <p className="mt-5 max-w-2xl text-base sm:text-lg text-silver leading-relaxed">{copy}</p>}
        </Reveal>
      </div>
    </section>
  );
}

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-5">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-muted">
        <li><Link to="/" className="hover:text-brand">Home</Link></li>
        {items.map(([label, to]) => (
          <li key={to || label} className="flex items-center gap-2">
            <span aria-hidden="true">/</span>
            {to ? <Link to={to} className="hover:text-brand">{label}</Link> : <span className="text-silver" aria-current="page">{label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function TrainerCard({ t, i = 0 }) {
  return (
    <Reveal delay={i * 90}>
      <Link to={`/trainers/${t.slug}`} className="group block card hover:border-brand/60 transition-colors">
        <div className="img-zoom aspect-[3/4] overflow-hidden">
          <img src={t.photo} alt={t.photoAlt || `${t.name}, ${t.role} at FITX Sahiwal`} width={800} height={1066} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
        </div>
        <div className="p-5 sm:p-6">
          <p className="label">{t.specialization}</p>
          <h3 className="font-display font-bold text-xl mt-2 text-paper group-hover:text-brand transition-colors">{t.name}</h3>
          <p className="text-sm text-silver mt-0.5">{t.role}{t.experienceYears ? ` · ${t.experienceYears} years experience` : ''}</p>
          <p className="text-sm text-muted mt-3 leading-relaxed line-clamp-3">{t.shortBio}</p>
          <span className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-brand">
            View Profile <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function ReviewCard({ r, i = 0 }) {
  return (
    <Reveal delay={i * 80} className="h-full">
      <figure className="card h-full p-6 sm:p-7 flex flex-col">
        <svg width="26" height="20" viewBox="0 0 26 20" fill="#F59A00" aria-hidden="true" className="opacity-90"><path d="M0 20V11.6C0 4.9 3.7 1 10.4 0l1.2 3.2c-3.6 1-5.5 3-5.7 6H11V20H0zm15 0V11.6C15 4.9 18.7 1 25.4 0l.6 3.2c-3.6 1-5.5 3-5.7 6H26V20H15z" /></svg>
        <blockquote className="mt-4 text-sm leading-relaxed text-silver flex-1">{r.text}</blockquote>
        <figcaption className="mt-5 pt-4 border-t border-steel flex items-center justify-between">
          <span className="font-display font-bold text-sm text-paper">{r.name}</span>
          <span className="text-[11px] uppercase tracking-wider text-muted">{r.source}</span>
        </figcaption>
      </figure>
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

export function StatBlock({ value, label, sub }) {
  return (
    <Reveal className="py-6">
      <p className="font-display font-bold text-4xl sm:text-5xl text-brand">{value}</p>
      <p className="mt-2 font-semibold text-sm text-paper">{label}</p>
      {sub && <p className="text-xs text-muted mt-1">{sub}</p>}
    </Reveal>
  );
}
