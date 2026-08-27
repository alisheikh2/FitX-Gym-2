import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import { BRAND } from '../../lib/brand.js';
import { PageHero, FAQAccordion, CTASection, SectionHead } from '../../components/site/blocks.jsx';
import Reveal from '../../components/ui/Reveal.jsx';

export default function FAQPage() {
  const { data: faqs } = useFetch('/faqs');
  const cats = [...new Set((faqs || []).map((f) => f.category))];

  return (
    <>
      <Seo
        title="FAQ — Personal Training, Hours & Pricing in Sahiwal | FITX"
        description="Answers to common questions about FITX Sahiwal: opening hours, women's training hours, pricing, personal training, beginners and how to book a consultation."
        path="/faq"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: (faqs || []).map((f) => ({
            '@type': 'Question',
            name: f.question,
            acceptedAnswer: { '@type': 'Answer', text: f.answer }
          }))
        }}
      />
      <PageHero
        label="FAQ"
        title="Asked often, answered honestly."
        copy={`Hours, pricing, women’s training, beginners — the questions every new member asks, answered straight. Still unsure? Call ${BRAND.phoneDisplay}.`}
        crumbs={[['FAQ', null]]}
      />
      <section className="py-16 sm:py-24">
        <div className="shell max-w-4xl space-y-14">
          {cats.map((c) => (
            <Reveal key={c}>
              <SectionHead label={c} title="" copy="" />
              <div className="mt-2">
                <FAQAccordion items={(faqs || []).filter((f) => f.category === c)} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
