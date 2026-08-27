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
        image="/images/fitx/facility/fitx-facility-floor-02.webp"
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
              <div className="mt-3 flex gap-3">
                <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" aria-label="FITX on Facebook" className="h-11 w-11 border border-steel flex items-center justify-center text-silver hover:text-brand hover:border-brand transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 22v-8h3l.5-4H13V7.5c0-1.1.3-1.5 1.7-1.5H16.6V2.2C15.9 2.1 14.7 2 13.6 2 10.6 2 9 3.7 9 7v3H6v4h3v8h4z"/></svg>
                </a>
                <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="FITX on Instagram" className="h-11 w-11 border border-steel flex items-center justify-center text-silver hover:text-brand hover:border-brand transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c2.7 0 3 .01 4.1.06 1.1.05 1.8.22 2.5.49.7.26 1.3.62 1.9 1.2.6.6.95 1.2 1.2 1.9.27.7.44 1.4.49 2.5.05 1.1.06 1.4.06 4.1s-.01 3-.06 4.1c-.05 1.1-.22 1.8-.49 2.5-.26.7-.62 1.3-1.2 1.9-.6.6-1.2.95-1.9 1.2-.7.27-1.4.44-2.5.49-1.1.05-1.4.06-4.1.06s-3-.01-4.1-.06c-1.1-.05-1.8-.22-2.5-.49-.7-.26-1.3-.62-1.9-1.2-.6-.6-.95-1.2-1.2-1.9-.27-.7-.44-1.4-.49-2.5C2.01 15 2 14.7 2 12s.01-3 .06-4.1c.05-1.1.22-1.8.49-2.5.26-.7.62-1.3 1.2-1.9.6-.6 1.2-.95 1.9-1.2.7-.27 1.4-.44 2.5-.49C9 2.01 9.3 2 12 2zm0 4.9a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 2a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2zm5.3-3.1a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>
                </a>
              </div>
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
