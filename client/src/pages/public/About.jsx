import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, Tile, CTABand, SectionHead } from '../../components/site/blocks.jsx';

export default function About() {
  return (
    <>
      <Seo
        title="About FITX — Personal Fitness Training Studio in Sahiwal"
        description="The story of FITX Personal Fitness Training Studio: Sahiwal's boutique personal training studio built around coaching, accountability and respect. Shadman Town, Faisalabad Road."
        path="/about"
        image="/images/fitx/community/fitx-gym-gathering-5.webp"
      />
      <PageHero
        label="About FITX"
        title="Coaching is the product. The floor serves it."
        image="/images/fitx/community/fitx-gym-gathering-5.webp"
        crumbs={[['About', null]]}
      />

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24">
        <div className="shell">
          <Reveal>
            <blockquote className="border-l-2 border-brand pl-6 sm:pl-10 max-w-4xl">
              <p className="font-display font-bold text-2xl sm:text-4xl leading-tight text-paper">
                “Revolutionise the society by providing the values of <span className="text-brand">Health &amp; Wellness</span>.”
              </p>
            </blockquote>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-10">
            <Reveal>
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Our mission</h2>
              <p className="mt-3 text-silver leading-relaxed">Personalized, trainer-led fitness that helps you understand your body, define meaningful goals and build sustainable results — through structured training, practical nutrition and continuous tracking.</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-brand">Our vision</h2>
              <p className="mt-3 text-silver leading-relaxed">A leading personal training studio where fitness is approached with precision, personalization and purpose — a stronger body, greater confidence, a healthier lifestyle that lasts.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="pb-16 sm:pb-24">
        <div className="shell grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <SectionHead
              label="Recognition"
              title="Respected beyond the floor."
              copy="FITX founder Zohaib Ali was invited as guest speaker at the University of Sahiwal during the HEC-funded NRPU project on youth-led entrepreneurship (December 2025), receiving a token of appreciation."
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Reveal className="overflow-hidden">
              <img src="/images/fitx/community/fitx-award-plaque.webp" alt="Token of appreciation plaque for Zohaib Ali, guest speaker at University of Sahiwal" width={900} height={1600} loading="lazy" decoding="async" className="w-full aspect-[3/4] object-cover" />
            </Reveal>
            <Reveal delay={60} className="overflow-hidden">
              <img src="/images/fitx/community/fitx-award-ceremony.webp" alt="Zohaib Ali receiving the token of appreciation at the University of Sahiwal" width={1200} height={900} loading="lazy" decoding="async" className="w-full aspect-[3/4] object-cover" />
            </Reveal>
            <Reveal delay={120} className="overflow-hidden">
              <img src="/images/fitx/community/fitx-founder-university-talk.webp" alt="Zohaib Ali speaking at the University of Sahiwal seminar" width={1200} height={960} loading="lazy" decoding="async" className="w-full aspect-[3/4] object-cover" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story tiles */}
      <section className="pb-16 sm:pb-24">
        <div className="shell grid md:grid-cols-2 gap-5">
          <Tile
            to="/trainers/zohaib-ali"
            image="/images/fitx/trainers/fitx-trainer-zohaib-ali.webp"
            alt="Zohaib Ali, founder of FITX Sahiwal, training in the studio"
            kicker="Founder & head coach"
            title="Zohaib Ali"
            copy="Built FITX so no member trains alone. Guest speaker, University of Sahiwal."
          />
          <Tile
            to="/facilities"
            image="/images/fitx/facility/fitx-facility-floor-02.webp"
            alt="The FITX Sahiwal training floor"
            kicker="The studio"
            title="One floor. Every tool."
            copy="Free weights, racks, machines, turf and boxing zone — kept clean, kept working."
          />
        </div>
      </section>

      {/* Community strip */}
      <section className="py-16 sm:py-24 bg-deep border-y border-steel/50">
        <div className="shell">
          <SectionHead label="Beyond the floor" title="A studio that gathers." copy="Members train, eat and play together — real moments from the FITX community." />
          <Reveal className="mt-10 overflow-hidden">
            <img src="/images/fitx/community/fitx-gym-gathering-banner.webp" alt="FITX Sahiwal members together at a community gathering" width={1600} height={372} loading="lazy" decoding="async" className="w-full object-cover" />
          </Reveal>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Reveal className="overflow-hidden">
              <img src="/images/fitx/community/fitx-senior-member-training.webp" alt="A senior member training on a machine at FITX Sahiwal" width={1200} height={1600} loading="lazy" decoding="async" className="w-full aspect-square object-cover object-top" />
            </Reveal>
            {[1, 2, 4, 5, 26, 24].map((n, i) => (
              <Reveal key={n} delay={i * 60} className="overflow-hidden">
                <img src={n >= 20 ? `/images/fitx/community/${n === 26 ? 'fitx-hoodies' : 'fitx-motivation-quote'}.webp` : `/images/fitx/community/fitx-gym-gathering-${n}.webp`} alt={`FITX Sahiwal community moment`} width={1000} height={1333} loading="lazy" decoding="async" className="w-full aspect-square object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        image="/images/fitx/community/fitx-cricket-team.webp"
        title="Serious training. Human community."
        copy="Meet the coaches, see the floor, then decide."
        cta="Meet the Coaches"
        to="/trainers"
      />
    </>
  );
}
