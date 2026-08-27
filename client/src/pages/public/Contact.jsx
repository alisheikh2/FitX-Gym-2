import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { BRAND, wa, tel } from '../../lib/brand.js';
import { PageHero, SectionHead } from '../../components/site/blocks.jsx';

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact FITX — Gym in Shadman Town, Sahiwal | Phone, Hours & Map"
        description={`Contact FITX Personal Fitness Training Studio: ${BRAND.address}. Call ${BRAND.phoneDisplay}, WhatsApp, or visit Sat–Thu 11 AM – 10 PM. Get directions on Google Maps.`}
        path="/contact"
        jsonLd={{ '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact FITX Sahiwal', url: BRAND.siteUrl + '/contact' }}
      />
      <PageHero
        label="Contact"
        title="Talk to a human at FITX."
        copy="Call, WhatsApp or walk in. If you prefer to start online, the consultation form reaches our team directly."
        crumbs={[['Contact', null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-[1fr_1.1fr] gap-10">
          <div className="space-y-5">
            <Reveal className="card p-6">
              <h2 className="label">Visit</h2>
              <p className="mt-3 text-paper font-semibold leading-relaxed">{BRAND.address}</p>
              <p className="text-xs text-muted mt-2">Wheelchair-accessible entrance & parking.</p>
              <a href={BRAND.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm mt-4">Get Directions</a>
            </Reveal>
            <Reveal delay={60} className="card p-6">
              <h2 className="label">Call / WhatsApp</h2>
              <p className="mt-3 text-paper font-semibold"><a href={tel} className="hover:text-brand">{BRAND.phoneDisplay}</a> <span className="text-muted font-normal">· {BRAND.phone2Display}</span></p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={wa('Hello FITX, I would like to book a consultation.')} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">Book via WhatsApp</a>
                <a href={wa('Hello FITX, I have a question about training.')} target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm">Ask a Question</a>
              </div>
            </Reveal>
            <Reveal delay={120} className="card p-6">
              <h2 className="label">Hours</h2>
              <p className="mt-3 text-sm text-silver leading-relaxed">{BRAND.hoursWeek}<br />{BRAND.hoursFriday}</p>
              <p className="mt-3 text-sm text-silver"><span className="text-paper font-semibold">Female hours:</span> {BRAND.femaleHours.join(' & ')}</p>
            </Reveal>
            <Reveal delay={180} className="card p-6">
              <h2 className="label">Email & Social</h2>
              <p className="mt-3 text-sm text-silver"><a className="hover:text-brand" href={`mailto:${BRAND.email}`}>{BRAND.email}</a></p>
              <p className="mt-2 text-sm">
                <a className="text-silver hover:text-brand" href={BRAND.instagram} target="_blank" rel="noopener noreferrer">Instagram @fitxfitnessstudio</a>
                <span className="text-muted"> · </span>
                <a className="text-silver hover:text-brand" href={BRAND.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
              </p>
            </Reveal>
          </div>
          <Reveal delay={100} className="min-h-[420px]">
            <iframe
              title="FITX Fitness Studio on Google Maps — Shadman Town, Sahiwal"
              src={BRAND.mapEmbed}
              className="w-full h-full min-h-[420px] border border-steel grayscale-[30%] contrast-[1.05] bg-graphite"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <p className="mt-3 text-xs text-muted">Prefer a form? <Link to="/book-consultation" className="link-underline text-brand">Book a consultation online</Link> — it lands straight in our team’s lead list.</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
