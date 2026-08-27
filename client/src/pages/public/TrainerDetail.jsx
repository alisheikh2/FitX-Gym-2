import { Link, useParams } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import { wa } from '../../lib/brand.js';
import Reveal from '../../components/ui/Reveal.jsx';
import { Breadcrumbs, CallNow } from '../../components/site/blocks.jsx';

export default function TrainerDetail() {
  const { slug } = useParams();
  const { data: t, loading } = useFetch(`/trainers/${slug}`);

  if (loading) return <div className="pt-40 shell"><div className="card h-[60vh] animate-pulse" /></div>;
  if (!t) {
    return (
      <div className="pt-40 pb-24 shell">
        <h1 className="h-display text-4xl">Trainer not found</h1>
        <p className="mt-4 text-silver">This profile doesn’t exist or has been unpublished.</p>
        <Link to="/trainers" className="btn-primary mt-8">All Trainers</Link>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={`${t.name} — ${t.role} | FITX Sahiwal`}
        description={`${t.name}, ${t.role} at FITX Personal Fitness Training Studio Sahiwal. ${t.shortBio || ''}`}
        path={`/trainers/${t.slug}`}
        image={t.photo}
        jsonLd={{ '@context': 'https://schema.org', '@type': 'Person', name: t.name, jobTitle: t.role, image: t.photo, worksFor: { '@type': 'Organization', name: 'FITX Personal Fitness Training Studio' } }}
      />
      <section className="pt-28 sm:pt-36 pb-16 sm:pb-24">
        <div className="shell">
          <Breadcrumbs items={[['Trainers', '/trainers'], [t.name, null]]} />
          <div className="grid lg:grid-cols-[minmax(0,440px)_1fr] gap-10 lg:gap-16 items-start">
            <Reveal className="relative">
              <div className="img-zoom overflow-hidden border border-steel">
                <img src={t.photo} alt={t.photoAlt || `${t.name} at FITX Sahiwal`} width={800} height={1066} loading="eager" decoding="async" className="w-full aspect-[3/4] object-cover object-top" />
              </div>
              <div className="absolute -bottom-5 left-5 bg-brand text-obsidian px-5 py-3">
                <p className="font-display font-bold text-sm uppercase tracking-wider">{t.role}</p>
              </div>
            </Reveal>
            <div className="pt-4">
              <Reveal>
                <p className="label">{t.specialization}</p>
                <h1 className="h-display text-4xl sm:text-5xl mt-3 text-paper">{t.name}</h1>
                {t.experienceYears && <p className="mt-3 text-brand font-semibold">{t.experienceYears} years of coaching experience</p>}
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-6 text-silver leading-relaxed text-base sm:text-lg">{t.bio}</p>
              </Reveal>
              <Reveal delay={160}>
                <blockquote className="mt-8 border-l-2 border-brand pl-6 py-1">
                  <p className="font-display text-lg sm:text-xl text-paper italic leading-relaxed">“{t.philosophy}”</p>
                </blockquote>
              </Reveal>
              <Reveal delay={220}>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/book-consultation" className="btn-primary btn-sm">Book With {t.name.split(' ')[0]}</Link>
                  <a href={wa(`Hello FITX, I would like to train with ${t.name}.`)} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">WhatsApp About Training</a>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-20">
            <Reveal className="card p-7">
              <h2 className="font-display font-bold text-xl text-paper">Training focus</h2>
              <ul className="mt-4 space-y-2.5">
                {(t.focus || []).map((f) => <li key={f} className="text-sm text-silver flex gap-3"><span className="text-brand font-bold">—</span>{f}</li>)}
              </ul>
            </Reveal>
            <Reveal delay={80} className="card p-7">
              <h2 className="font-display font-bold text-xl text-paper">Who this coach is right for</h2>
              <ul className="mt-4 space-y-2.5">
                {(t.suitableFor || []).map((f) => <li key={f} className="text-sm text-silver flex gap-3"><span className="text-brand font-bold">—</span>{f}</li>)}
              </ul>
            </Reveal>
          </div>

          {(t.programs || []).length > 0 && (
            <Reveal className="mt-10">
              <h2 className="label">Related programs</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {t.programs.map((p) => (
                  <Link key={p} to={routeFor(p)} className="btn-dark btn-sm">{p.replace(/-/g, ' ')}</Link>
                ))}
              </div>
            </Reveal>
          )}
        </div>
      </section>
      <CallNow />
    </>
  );
}

function routeFor(slug) {
  return {
    'personal-training': '/personal-training',
    'weight-loss-fat-loss': '/weight-loss',
    'strength-conditioning': '/strength-conditioning',
    'womens-performance': '/womens-fitness'
  }[slug] || '/programs';
}
