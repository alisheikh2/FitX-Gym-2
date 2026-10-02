import { useState } from 'react';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { BRAND } from '../../lib/brand.js';
import Lightbox from '../../components/site/Lightbox.jsx';
import PhotoFrame from '../../components/site/PhotoFrame.jsx';
import { PageHero, CTABand, SectionHead } from '../../components/site/blocks.jsx';

const GALLERY = [
  ['/images/fitx/gallery/fitx-gallery-01.jpg', 'Member training with a barbell at FITX.'],
  ['/images/fitx/gallery/fitx-gallery-02.jpg', 'Member carrying dumbbells across the training floor.'],
  ['/images/fitx/gallery/fitx-gallery-03.jpg', 'Member performing the leg press at FITX.'],
  ['/images/fitx/gallery/fitx-gallery-04.jpg', 'Member building conditioning on an air bike.', '50% 30%'],
  ['/images/fitx/gallery/fitx-gallery-05.jpg', 'Member performing a dumbbell lunge at FITX.', '50% 18%'],
  ['/images/fitx/gallery/fitx-gallery-06.jpg', 'Member training with battle ropes at FITX.'],
  ['/images/fitx/facility/fitx-strength-squat-rack.webp', 'Racks and barbells for squat, press and hinge work.'],
  ['/images/fitx/fitx-conditioning-medicine-ball.webp', 'Conditioning turf, medicine balls, sleds, intervals.'],
  ['/images/fitx/facility/fitx-battle-ropes.webp', 'Battle-rope finishers.'],
  ['/images/fitx/facility/fitx-dumbbell-rdl.webp', 'Hinge patterns, coached on form.'],
  ['/images/fitx/programs/fitx-group-session-class.webp', 'Group sessions on the mats.'],
  ['/images/fitx/community/fitx-trainer-neon-sign.webp', 'Under the FITX sign.']
];

export default function Facilities() {
  const [lightbox, setLightbox] = useState(null); // index or null
  const open = (i) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = () => setLightbox((i) => (i === null ? i : (i - 1 + GALLERY.length) % GALLERY.length));
  const next = () => setLightbox((i) => (i === null ? i : (i + 1) % GALLERY.length));

  return (
    <>
      <Seo
        title="Gym Facilities in Sahiwal, Tour the FITX Studio"
        description="Tour FITX Personal Fitness Training Studio, Shadman Town Sahiwal: free weights, racks, machines, conditioning turf. Wheelchair-accessible entrance and parking."
        path="/facilities"
        image="/images/fitx/facility/fitx-facility-floor-02.webp"
      />
      <PageHero
        label="Facilities"
        title="Gallery"
        copy="Real photos from our floor, cleaned daily, maintained always."
        image="/images/fitx/facility/fitx-facility-floor-02.webp"
        crumbs={[['Gallery', null]]}
      />

      <section className="py-16 sm:py-24">
        <div className="shell grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {GALLERY.map(([src, cap, objectPosition], i) => (
            <Reveal key={src} delay={(i % 3) * 60} className="overflow-hidden">
              <button type="button" onClick={() => open(i)} className="block group relative w-full overflow-hidden cursor-pointer text-left">
                <PhotoFrame src={src} alt={cap} objectPosition={objectPosition} className="w-full aspect-[4/3] sm:aspect-[3/2]" />
                <span className="absolute inset-0 bg-brand/0 group-hover:bg-brand/60 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white text-4xl font-light opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true">+</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {lightbox !== null && (
          <Lightbox items={GALLERY} index={lightbox} onClose={close} onPrev={prev} onNext={next} />
        )}
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
