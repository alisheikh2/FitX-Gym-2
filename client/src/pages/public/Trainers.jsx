import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import { PageHero, TrainerCard, CTASection } from '../../components/site/blocks.jsx';
import Reveal from '../../components/ui/Reveal.jsx';

export default function Trainers() {
  const { data: trainers, loading } = useFetch('/trainers');

  return (
    <>
      <Seo
        title="Personal Trainers in Sahiwal — Meet the FITX Coaches"
        description="Meet the coaches of FITX Sahiwal: founder & head coach Zohaib Ali, fat-loss expert Arslan Ahmad, strength & conditioning coach Muazam, and women's performance coach Iqra Zahid."
        path="/trainers"
        image="/images/fitx/trainers/fitx-trainer-muazam.webp"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'FITX Trainers',
          itemListElement: (trainers || []).map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name }))
        }}
      />
      <PageHero
        label="The Coaches"
        title="Four coaches. Four specialisms. One standard."
        copy="Every coach at FITX is on the floor daily, coaching real members. Read their philosophy and focus before you choose who to train with."
        crumbs={[['Trainers', null]]}
      />
      <section className="py-16 sm:py-24">
        <div className="shell grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading && [1, 2, 3, 4].map((i) => <div key={i} className="card aspect-[3/4] animate-pulse" />)}
          {(trainers || []).map((t, i) => <TrainerCard key={t.slug} t={t} i={i} />)}
        </div>
        {!loading && !(trainers || []).length && (
          <Reveal className="shell mt-10 card p-10 text-center text-silver">Trainer profiles are being updated. Please check back shortly.</Reveal>
        )}
      </section>
      <CTASection />
    </>
  );
}
