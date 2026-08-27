import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { BRAND } from '../../lib/brand.js';
import { PageHero, SectionHead, CTASection } from '../../components/site/blocks.jsx';

const GALLERY = [
  ['/images/fitx/facility/fitx-facility-floor-01.webp', 'Free-weight zone — dumbbells run light to heavy so progress never waits for equipment.'],
  ['/images/fitx/facility/fitx-strength-squat-rack.webp', 'Rack and barbell area for squat, press and hinge work, coached on form.'],
  ['/images/fitx/fitx-conditioning-medicine-ball.webp', 'Conditioning turf for sleds, medicine balls, intervals and athletic work.'],
  ['/images/fitx/facility/fitx-facility-floor-02.webp', 'The main floor — free weights, cable stations, the turf strip and boxing zone.'],
  ['/images/fitx/facility/fitx-facility-floor-03.webp', 'Plate-loaded strength machines for controlled, progressive loading.'],
  ['/images/fitx/fitx-coaching-education-session.webp', 'Education corner — the studio runs nutrition and technique sessions on the big screen.'],
  ['/images/fitx/facility/fitx-facility-floor-04.webp', 'Cable stations for accessory and rehabilitation-friendly work.'],
  ['/images/fitx/facility/fitx-facility-floor-05.webp', 'Cardio and air-bike row for conditioning blocks.'],
  ['/images/fitx/facility/fitx-facility-floor-06.webp', 'Open floor space for functional training and guided group sessions.']
];

export default function Facilities() {
  return (
    <>
      <Seo
        title="Gym Facilities in Sahiwal — Tour the FITX Studio"
        description="Tour FITX Personal Fitness Training Studio, Shadman Town Sahiwal: free weights, racks, machines, conditioning turf and an education corner. Wheelchair-accessible entrance and parking."
        path="/facilities"
        image="/images/fitx/facility/fitx-facility-floor-01.webp"
      />
      <PageHero
        label="Facilities"
        title="A working studio, kept working."
        copy="Real photos from our floor — the zones you’ll train in, cleaned daily and maintained so your program never waits on broken equipment."
        crumbs={[['Facilities', null]]}
        image="/images/fitx/facility/fitx-facility-floor-01.webp"
      />

      <section className="py-16 sm:py-24">
        <div className="shell">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {GALLERY.map(([src, cap], i) => (
              <Reveal key={src} delay={(i % 3) * 70} className="mb-5 break-inside-avoid">
                <figure className="card">
                  <div className="img-zoom overflow-hidden">
                    <img src={src} alt={cap} width={1000} height={i % 2 ? 1000 : 750} loading="lazy" decoding="async" className="w-full object-cover" />
                  </div>
                  <figcaption className="px-4 py-3 text-xs text-silver leading-relaxed">{cap}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-deep border-y border-steel/50">
        <div className="shell grid md:grid-cols-3 gap-8">
          {[
            ['Accessible', 'Wheelchair-accessible entrance and parking at the studio.'],
            ['Hygiene-first', 'Members and reviews consistently note the clean, maintained floor.'],
            ['Hours that fit life', `${BRAND.hoursWeek}. Women’s hours: ${BRAND.femaleHours.join(' & ')}.`]
          ].map(([h, p], i) => (
            <Reveal key={h} delay={i * 80}>
              <h3 className="font-display font-bold text-lg text-paper flex items-center gap-3"><span className="h-2 w-2 bg-brand" aria-hidden="true" />{h}</h3>
              <p className="mt-3 text-sm text-silver leading-relaxed">{p}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection title="See the floor yourself." copy="Photos only say so much. Visit during opening hours, walk the zones, and meet a coach before you decide." image="/images/fitx/facility/fitx-facility-floor-05.webp" />
    </>
  );
}
