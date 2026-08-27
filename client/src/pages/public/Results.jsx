import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import { BRAND } from '../../lib/brand.js';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, Quote, CTABand, SectionHead } from '../../components/site/blocks.jsx';

export default function Results() {
  const { data: testimonials } = useFetch('/testimonials');
  const quotes = (testimonials || []).filter((t) => t.kind === 'quote');
  const transforms = (testimonials || []).filter((t) => t.kind === 'transformation');
  const journeys = transforms.filter((t) => t.result !== 'Client testimonial shared by FITX');

  return (
    <>
      <Seo
        title="Results & Reviews — FITX Personal Training Studio Sahiwal"
        description={`Real member reviews and transformations from FITX Sahiwal. Rated ${BRAND.rating.value} on ${BRAND.rating.source}. Honest results, privacy protected.`}
        path="/results"
        image="/images/fitx/results/fitx-client-of-the-month.webp"
      />
      <PageHero
        label="Results"
        title="Proof, not promises."
        copy={`Rated ${BRAND.rating.value} on ${BRAND.rating.source} · real reviews, real journeys — nothing fabricated, ever.`}
        image="/images/fitx/results/fitx-client-of-the-month.webp"
        crumbs={[['Results', null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell">
          <SectionHead label="Member journeys" title="Where they started. Where they are." />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {journeys.map((t, i) => (
              <Reveal key={t._id} delay={i * 60}>
                <figure>
                  <div className="overflow-hidden">
                    <img src={t.image} alt={t.imageAlt} width={800} height={900} loading="lazy" decoding="async" className="w-full object-cover" />
                  </div>
                  <figcaption className="mt-3">
                    <p className="font-display font-bold text-sm text-paper">{t.name}</p>
                    <p className="text-xs text-muted mt-0.5">{t.result}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-deep border-y border-steel/50">
        <div className="shell">
          <SectionHead label="The wall of proof" title="Every testimonial FITX shares." />
          <div className="mt-10 columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
            {transforms.filter((t) => t.result === 'Client testimonial shared by FITX').map((t, i) => (
              <Reveal key={t._id} delay={(i % 4) * 50} className="mb-4 break-inside-avoid">
                <figure>
                  <div className="overflow-hidden">
                    <img src={t.image} alt={t.imageAlt || `${t.name} — FITX client testimonial`} width={800} height={800} loading="lazy" decoding="async" className="w-full object-cover" />
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6"><p className="text-xs text-muted">Identities protected. Results vary with consistency, training and nutrition.</p></Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="shell">
          <SectionHead label="Reviews" title="In their words." center />
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {quotes.slice(0, 6).map((r, i) => <Quote key={r._id} r={r} i={i} />)}
          </div>
          <Reveal className="mt-10 text-center">
            <a href={BRAND.mapUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-brand underline decoration-brand/60 underline-offset-4 hover:decoration-brand">Read all reviews on Google Maps →</a>
          </Reveal>
        </div>
      </section>

      <CTABand image="/images/fitx/results/fitx-transformation-03.webp" title="Your record starts here." copy="Progress you can audit — on paper, not in promises." />
    </>
  );
}
