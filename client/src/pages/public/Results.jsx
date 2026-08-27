import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import { BRAND } from '../../lib/brand.js';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, SectionHead, ReviewCard, CTASection, StatBlock } from '../../components/site/blocks.jsx';

export default function Results() {
  const { data: testimonials } = useFetch('/testimonials');
  const quotes = (testimonials || []).filter((t) => t.kind === 'quote');
  const transforms = (testimonials || []).filter((t) => t.kind === 'transformation');
  const journeys = transforms.filter((t) => t.result !== 'Client testimonial shared by FITX');

  return (
    <>
      <Seo
        title="Results & Reviews — FITX Personal Training Studio Sahiwal"
        description={`Real member reviews and transformations from FITX Sahiwal. Rated ${BRAND.rating.value} on ${BRAND.rating.source}. Honest results, privacy protected, no fabricated claims.`}
        path="/results"
        image="/images/fitx/results/fitx-client-of-the-month.webp"
      />
      <PageHero
        label="Results"
        title="Proof, not promises."
        copy="Everything on this page is real: verified reviews, member transformations shared with privacy protected, and FITX’s own client recognitions. We do not publish invented statistics — ever."
        crumbs={[['Results', null]]}
      />

      <section className="py-14 border-b border-steel/50">
        <div className="shell grid grid-cols-3 divide-x divide-steel">
          <StatBlock value={`${BRAND.rating.value}★`} label="Google rating" sub={`${BRAND.rating.count} public reviews`} />
          <StatBlock value="100%" label="Real reviews" sub="quoted verbatim from Google" />
          <StatBlock value="0" label="Fabricated results" sub="a rule we will never break" />
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="shell">
          <SectionHead label="Transformations" title="Member journeys" />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {journeys.map((t, i) => (
              <Reveal key={t._id} delay={i * 80}>
                <figure className="card">
                  <div className="img-zoom overflow-hidden">
                    <img src={t.image} alt={t.imageAlt} width={800} height={900} loading="lazy" decoding="async" className="w-full object-cover" />
                  </div>
                  <figcaption className="p-5">
                    <p className="font-display font-bold text-sm text-paper">{t.name}</p>
                    <p className="text-xs text-muted mt-1">{t.result}</p>
                    {t.text && <p className="text-sm text-silver mt-2 italic">{t.text}</p>}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6"><p className="text-xs text-muted">Transformations shared by FITX with clients’ identities protected. Results vary with consistency, training and nutrition — no outcome is guaranteed.</p></Reveal>
        </div>
      </section>

      {/* FULL TESTIMONIAL GALLERY */}
      <section className="py-16 sm:py-24 bg-deep border-y border-steel/50">
        <div className="shell">
          <SectionHead
            label="Client testimonials"
            title="The wall of proof — every testimonial FITX shares"
            copy="Real messages, real before/afters and real client recognitions shared by the studio — published with clients’ privacy protected."
          />
          <div className="mt-10 columns-2 sm:columns-3 lg:columns-4 gap-4 [column-fill:_balance]">
            {transforms.map((t, i) => (
              <Reveal key={t._id} delay={(i % 4) * 50} className="mb-4 break-inside-avoid">
                <figure className="card">
                  <div className="img-zoom overflow-hidden">
                    <img src={t.image} alt={t.imageAlt || `${t.name} — FITX client testimonial`} width={800} height={800} loading="lazy" decoding="async" className="w-full object-cover" />
                  </div>
                  <figcaption className="px-3.5 py-3">
                    <p className="font-semibold text-xs text-paper">{t.name}</p>
                    <p className="text-[10px] text-muted mt-0.5">{t.result || t.source}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-deep border-y border-steel/50">
        <div className="shell">
          <SectionHead label="Reviews" title="What members say on Google" />
          <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {quotes.map((r, i) => <ReviewCard key={r._id} r={r} i={i} />)}
          </div>
          <Reveal className="mt-8">
            <a href={BRAND.mapUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-brand text-sm">Read all reviews on Google Maps →</a>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="shell max-w-3xl">
          <SectionHead label="Our philosophy" title="Progress you can audit" />
          <Reveal delay={100}>
            <p className="mt-6 text-silver leading-relaxed text-base">We track weights, measurements and attendance because accountable coaching should survive inspection. When you train at FITX, your progress belongs to you — on paper, not in promises. <Link to="/book-consultation" className="link-underline text-brand">Start your own record</Link>.</p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
