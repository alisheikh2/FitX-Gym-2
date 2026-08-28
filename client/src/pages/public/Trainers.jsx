import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import { BigBanner, TrainerCard, CallNow } from '../../components/site/blocks.jsx';
import Reveal from '../../components/ui/Reveal.jsx';

export default function Trainers() {
  const { data: trainers, loading } = useFetch('/trainers');

  return (
    <>
      <Seo
        title="Our Coaches — Personal Trainers in Sahiwal | FITX"
        description="Meet the coaches of FITX Sahiwal: founder & head coach Zohaib Ali, fat-loss expert Arslan Ahmad, strength & conditioning coach Muazam, and women's performance coach Iqra Zahid."
        path="/trainers"
        image="/images/fitx/trainers/fitx-trainer-muazam.webp"
      />
      <BigBanner title="Coaches" crumbs={[['Coaches', null]]} />

      <section className="py-16 sm:py-24">
        <div className="shell grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading && [1, 2, 3].map((i) => <div key={i} className="aspect-[3/4] bg-deep animate-pulse" />)}
          {(trainers || []).map((t, i) => <TrainerCard key={t.slug} t={t} i={i} />)}
        </div>
        {!loading && !(trainers || []).length && (
          <Reveal className="shell mt-10 card p-10 text-center text-silver">Coach profiles are being updated. Please check back shortly.</Reveal>
        )}
      </section>

      <CallNow />
    </>
  );
}
