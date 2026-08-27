import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { BRAND } from '../../lib/brand.js';
import { PageHero, CTABand, SectionHead } from '../../components/site/blocks.jsx';

const GALLERY = [
  ['/images/fitx/facility/fitx-facility-floor-02.webp', 'The main floor — free weights, cables, turf strip and boxing zone.'],
  ['/images/fitx/facility/fitx-strength-squat-rack.webp', 'Racks and barbells for squat, press and hinge work.'],
  ['/images/fitx/fitx-conditioning-medicine-ball.webp', 'Conditioning turf — sleds, medicine balls, intervals.'],
  ['/images/fitx/facility/fitx-floor-turf-wide.webp', 'The turf strip running the length of the studio.'],
  ['/images/fitx/facility/fitx-machine-line.webp', 'Machine line covering every movement pattern.'],
  ['/images/fitx/facility/fitx-member-machine.webp', 'Members on the machine line — coached, never crowded.'],
  ['/images/fitx/facility/fitx-turf-dumbbell-row.webp', 'Dumbbell work out on the turf.'],
  ['/images/fitx/facility/fitx-dumbbell-rdl.webp', 'Hinge patterns, coached on form.'],
  ['/images/fitx/facility/fitx-battle-ropes.webp', 'Battle-rope finishers.'],
  ['/images/fitx/facility/fitx-ropes-red.webp', 'High-intensity conditioning sessions.'],
  ['/images/fitx/facility/fitx-facility-floor-01.webp', 'Functional corner — medicine balls and accessories.'],
  ['/images/fitx/facility/fitx-facility-floor-06.webp', 'Cable crossover station.']
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
        title="A working studio, kept working."
        copy="Real photos from our floor — cleaned daily, maintained always."
        image="/images/fitx/facility/fitx-facility-floor-02.webp"
        crumbs={[['Facilities', null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {GALLERY.map(([src, cap], i) => (
            <Reveal key={src} delay={(i % 3) * 60} className="mb-5 break-inside-avoid">
              <figure>
                <div className="overflow-hidden">
                  <img src={src} alt={cap} width={1000} height={750} loading="lazy" decoding="async" className="w-full object-cover" />
                </div>
                <figcaption className="mt-2.5 text-xs text-silver leading-relaxed">{cap}</figcaption>
              </figure>
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
