import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, CTABand, SectionHead } from '../../components/site/blocks.jsx';

export default function About() {
  return (
    <>
      <Seo
        title="About FITX — Personal Fitness Training Studio in Sahiwal"
        description="The story of FITX Personal Fitness Training Studio: Sahiwal's boutique personal training studio built around coaching, accountability and respect. Shadman Town, Faisalabad Road."
        path="/about"
        image="/images/fitx/interior-premium.jpg"
      />
      <PageHero
        title="About Us"
        copy="FITX is a boutique personal training studio based in Shadman Town, Sahiwal. Since day one, we have taken fitness seriously — client-centric coaching, rigorous custom programs and practical nutrition advice."
        crumbs={[['About Us', null]]}
      />

      {/* reference-style intro: small image floated beside text */}
      <section className="py-16 sm:py-24">
        <div className="shell">
          <Reveal>
            <div className="md:float-left md:mr-8 mb-6 md:mb-4 max-w-md overflow-hidden">
              <img src="/images/fitx/interior-premium.jpg" alt="The FITX boutique training studio floor in Sahiwal" width={1600} height={900} loading="lazy" decoding="async" className="w-full aspect-[3/2] object-cover" />
            </div>
            <p className="text-[15px] sm:text-base text-silver leading-relaxed max-w-3xl">
              Most gyms sell you access and leave you alone. FITX was built the other way around: a personal training studio where every member starts with a consultation, trains on a written program, and is coached session after session. Technique is watched. Progress is recorded. Nothing is left to guesswork.
            </p>
            <p className="mt-4 text-[15px] sm:text-base text-silver leading-relaxed max-w-3xl">
              Though our programs cater to busy lifestyles, FITX is not a quick and easy fix — being part of our programs requires matching the serious commitment and dedication that we have to offer.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 clear-both">
              <Link to="/programs" className="btn-primary">Our Programs</Link>
              <Link to="/contact" className="btn-ghost">Call Now</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-24 bg-deep border-y border-steel">
        <div className="shell">
          <Reveal>
            <blockquote className="border-l-4 border-brand pl-6 sm:pl-10 max-w-4xl">
              <p className="font-display font-extrabold uppercase text-2xl sm:text-3xl leading-tight text-navy">
                “Revolutionise the society by providing the values of <span className="text-brand">Health &amp; Wellness</span>.”
              </p>
            </blockquote>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-10">
            <Reveal>
              <h2 className="font-display text-[12px] font-bold uppercase tracking-[0.28em] text-silver"><span className="text-brand mr-2" aria-hidden="true">#####</span>Our Mission</h2>
              <p className="mt-3 text-[15px] text-silver leading-relaxed">To provide personalized, trainer-led fitness experiences that help individuals understand their bodies, define meaningful goals, and build sustainable results through structured training, practical nutrition guidance, and continuous progress tracking.</p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="font-display text-[12px] font-bold uppercase tracking-[0.28em] text-silver"><span className="text-brand mr-2" aria-hidden="true">#####</span>Our Vision</h2>
              <p className="mt-3 text-[15px] text-silver leading-relaxed">To become a leading personal training studio where fitness is approached with precision, personalization, and purpose — helping every client build a stronger body, greater confidence, and a healthier lifestyle that lasts.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Recognition */}
      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHead
              label="Recognition"
              title="Respected beyond the floor"
              copy="FITX founder Zohaib Ali was invited as guest speaker at the University of Sahiwal during the HEC-funded NRPU project on youth-led entrepreneurship (December 2025), receiving a token of appreciation."
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              ['/images/fitx/community/fitx-award-plaque.webp', 'Token of appreciation plaque for Zohaib Ali, guest speaker at University of Sahiwal'],
              ['/images/fitx/community/fitx-award-ceremony.webp', 'Zohaib Ali receiving the token of appreciation at the University of Sahiwal'],
              ['/images/fitx/community/fitx-founder-university-talk.webp', 'Zohaib Ali speaking at the University of Sahiwal seminar']
            ].map(([src, alt], i) => (
              <Reveal key={src} delay={i * 60} className="overflow-hidden">
                <img src={src} alt={alt} width={900} height={1200} loading="lazy" decoding="async" className="w-full aspect-[3/4] object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Community — clean image row */}
      <section className="py-16 sm:py-24 bg-deep border-y border-steel">
        <div className="shell">
          <SectionHead label="Beyond the floor" title="A studio that gathers" copy="Members train, eat and play together — real moments from the FITX community." />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              ['/images/fitx/community/fitx-gym-gathering-banner.webp', 'FITX members together at a community gathering'],
              ['/images/fitx/community/fitx-senior-member-training.webp', 'A senior member training at FITX Sahiwal'],
              ['/images/fitx/community/fitx-cricket-team.webp', 'FITX members with their cricket team after a match in Lahore']
            ].map(([src, alt], i) => (
              <Reveal key={src} delay={i * 60} className="overflow-hidden">
                <img src={src} alt={alt} width={1600} height={1000} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Serious training. Human community."
        copy="Meet the coaches, see the floor, then decide."
        cta="Meet the Coaches"
        to="/trainers"
      />
    </>
  );
}
