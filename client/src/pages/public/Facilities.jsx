import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { BRAND } from '../../lib/brand.js';
import { PageHero, CTABand, SectionHead } from '../../components/site/blocks.jsx';

const GALLERY = [
  ['/images/fitx/facility/fitx-strength-squat-rack.webp', 'Racks and barbells for squat, press and hinge work.'],
  ['/images/fitx/fitx-conditioning-medicine-ball.webp', 'Conditioning turf — medicine balls, sleds, intervals.'],
  ['/images/fitx/facility/fitx-floor-turf-wide.webp', 'The turf strip running the length of the studio.'],
  ['/images/fitx/facility/fitx-battle-ropes.webp', 'Battle-rope finishers.'],
  ['/images/fitx/facility/fitx-dumbbell-rdl.webp', 'Hinge patterns, coached on form.']
];

export default function Facilities() {
  return (
    <>
      <Seo
        title="Gym Facilities in Sahiwal — Tour the FITX Studio"
        description="Tour FITX Personal Fitness Training Studio, Shadman Town Sahiwal: free weights, racks, machines, conditioning turf. Wheelchair-accessible entrance and parking."
        path="/facilities"
        image="/images/fitx/facility/fitx-facility-floor-02.webp"
      />
      <PageHero
        label="Facilities"
        title="Gallery"
        copy="Real photos from our floor — cleaned daily, maintained always."
        image="/images/fitx/facility/fitx-facility-floor-02.webp"
        crumbs={[['Gallery', null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY.map(([src, cap], i) => (
            <Reveal key={src} delay={(i % 3) * 60} className="overflow-hidden">
              <a href={src} target="_blank" rel="noopener noreferrer" className="block group">
                <img src={src} alt={cap} width={1200} height={800} loading="lazy" decoding="async" className="w-full aspect-[4/3] sm:aspect-[3/2] object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]" />
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-14 bg-deep border-y border-steel/50">
        <div className="shell grid md:grid-cols-3 gap-8 text-center md:text-left">
          {[
            ['Accessible', 'Wheelchair-accessible entrance and parking.'],
            ['Hygiene-first', 'Members consistently note the clean floor.'],
            ['Hours that fit life', `${BRAND.hoursWeek}. Women: ${BRAND.femaleHours.join(' & ')}.`]
          ].map(([h, p], i) => (
            <Reveal key={h} delay={i * 70}>
              <h3 className="font-display font-bold text-lg text-paper">{h}</h3>
              <p className="mt-2 text-sm text-silver leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand image="/images/fitx/facility/fitx-facility-floor-05.webp" title="See the floor yourself." copy="Walk the zones, meet a coach, then decide." />
    </>
  );
}
