import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, SectionHead, CTASection, Breadcrumbs } from '../../components/site/blocks.jsx';

export default function About() {
  return (
    <>
      <Seo
        title="About FITX — Personal Fitness Training Studio in Sahiwal"
        description="The story of FITX Personal Fitness Training Studio: why Sahiwal's most serious training studio was built around coaching, accountability and respect. Shadman Town, Faisalabad Road."
        path="/about"
        image="/images/fitx/community/fitx-community-gathering.webp"
      />
      <PageHero
        label="About FITX"
        title="Sahiwal’s most serious training studio — built on coaching, not equipment counts."
        copy="FITX Personal Fitness Training Studio exists because buying a gym membership and being left alone doesn’t work. Here is what we built instead."
        crumbs={[['About', null]]}
        image="/images/fitx/community/fitx-community-gathering.webp"
      />

      {/* MISSION & VISION */}
      <section className="py-16 sm:py-24 bg-graphite/50 border-b border-steel/50">
        <div className="shell">
          <Reveal>
            <p className="label flex items-center gap-3"><span className="divider-x" aria-hidden="true" />Our Mission</p>
            <blockquote className="mt-5 max-w-4xl border-l-2 border-brand pl-6 sm:pl-10">
              <p className="font-display font-bold text-2xl sm:text-4xl lg:text-[2.75rem] leading-tight text-paper">
                “Revolutionise the society by providing the values of <span className="text-brand">Health &amp; Wellness</span>.”
              </p>
            </blockquote>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-px bg-steel border border-steel">
            <Reveal className="bg-deep p-8 sm:p-10">
              <h2 className="label">Our Mission</h2>
              <p className="mt-4 text-silver leading-relaxed text-base">
                To provide personalized, trainer-led fitness experiences that help individuals understand their bodies, define meaningful goals, and build sustainable results through structured training, practical nutrition guidance, and continuous progress tracking.
              </p>
            </Reveal>
            <Reveal delay={90} className="bg-deep p-8 sm:p-10">
              <h2 className="label">Our Vision</h2>
              <p className="mt-4 text-silver leading-relaxed text-base">
                To become a leading personal training studio where fitness is approached with precision, personalization, and purpose — helping every client build a stronger body, greater confidence, and a healthier lifestyle that lasts.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="shell grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20">
          <div className="space-y-6 text-silver leading-relaxed text-base sm:text-lg">
            <Reveal><p>
              Walk into most gyms and you get a tour of machines, a price, and silence. Members train alone, guess at technique, plateau, and quietly quit. FITX was founded in Shadman Town, Sahiwal to run the opposite model: a <strong className="text-paper">personal fitness training studio</strong> where coaching is the product and the floor exists to serve it.
            </p></Reveal>
            <Reveal><p>
              Every member starts with a consultation. We ask what you actually want — fat loss, strength, confidence, a doctor’s warning taken seriously — and we map a realistic timeline. Then you train on a written program, with a coach watching your form, recording your loads and checking your progress week after week.
            </p></Reveal>
            <Reveal><p>
              That accountability is the difference members feel. It is also why our Google reviews repeatedly mention trainers who “guide you how to be your own expert”, who are “sincere with every trainee”, and a floor that women describe as safe and secure.
            </p></Reveal>
            <Reveal><p>
              FITX is also part of Sahiwal beyond the gym floor. Our founder has been recognized as a guest speaker at the University of Sahiwal, and the studio’s members train together, eat together and even take the field together as a cricket team. Serious training, human community.
            </p></Reveal>
          </div>
          <div className="space-y-6">
            <Reveal className="img-zoom overflow-hidden"><img src="/images/fitx/trainers/fitx-founder-training-session.webp" alt="Founder coaching on the FITX floor" width={800} height={1600} loading="lazy" decoding="async" className="w-full aspect-[4/5] object-cover" /></Reveal>
            <Reveal delay={100} className="card p-6">
              <p className="label">Recognition</p>
              <p className="mt-3 text-sm text-silver leading-relaxed">Zohaib Ali, FITX founder, received a token of appreciation as a guest speaker at the University of Sahiwal during the HEC-funded NRPU project “Promoting Youth-led Entrepreneurship in Underserved Areas of Pakistan” (December 2025).</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-deep border-y border-steel/50">
        <div className="shell">
          <SectionHead label="How we coach" title="Four commitments, kept daily" />
          <div className="mt-12 grid sm:grid-cols-2 gap-px bg-steel border border-steel">
            {[
              ['Technique first', 'A rep that looks wrong is a rep we stop. Load is earned, never assumed.'],
              ['Measured progress', 'Weights, measurements, attendance — recorded, reviewed, adjusted.'],
              ['Respect for real life', 'Programs and eating guidance built around Pakistani homes, jobs and families.'],
              ['A floor for everyone', 'Beginners, athletes, women in dedicated hours — coached with equal seriousness.']
            ].map(([h, p], i) => (
              <Reveal key={h} delay={i * 70} className="bg-deep p-8">
                <p className="font-display text-brand font-bold text-sm">0{i + 1}</p>
                <h3 className="font-display font-bold text-xl text-paper mt-2">{h}</h3>
                <p className="text-sm text-silver mt-3 leading-relaxed">{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="shell grid md:grid-cols-2 gap-6">
          <Reveal className="img-zoom overflow-hidden relative">
            <img src="/images/fitx/community/fitx-award-university-sahiwal.webp" alt="Zohaib Ali receiving a token of appreciation at the University of Sahiwal" width={1200} height={900} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
            <p className="absolute bottom-0 inset-x-0 bg-obsidian/85 text-xs text-silver px-4 py-2.5">Guest speaker recognition, University of Sahiwal — Dec 2025</p>
          </Reveal>
          <Reveal delay={90} className="img-zoom overflow-hidden relative">
            <img src="/images/fitx/community/fitx-cricket-team.webp" alt="FITX members with their cricket team after a match in Lahore" width={1000} height={1000} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
            <p className="absolute bottom-0 inset-x-0 bg-obsidian/85 text-xs text-silver px-4 py-2.5">FITX members after a cricket match at Askari 11, Lahore</p>
          </Reveal>
        </div>
        <div className="shell mt-10 flex flex-wrap gap-4">
          <Link to="/trainers" className="btn-primary">Meet the Coaches</Link>
          <Link to="/results" className="btn-ghost">Member Results</Link>
        </div>
      </section>

      {/* COMMUNITY / GATHERINGS */}
      <section className="py-16 sm:py-24 bg-deep border-y border-steel/50">
        <div className="shell">
          <SectionHead
            label="Beyond the floor"
            title="A studio that gathers, celebrates and takes the field together"
            copy="Training is the core — but FITX members also sit together, celebrate together and play together. These are real moments from the FITX community."
          />
          <Reveal className="mt-10 img-zoom overflow-hidden">
            <img src="/images/fitx/community/fitx-gym-gathering-banner.webp" alt="FITX Sahiwal members together at a community gathering" width={1600} height={372} loading="lazy" decoding="async" className="w-full object-cover" />
          </Reveal>
          <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 4, 5].map((n, i) => (
              <Reveal key={n} delay={i * 60} className="img-zoom overflow-hidden border border-steel">
                <img src={`/images/fitx/community/fitx-gym-gathering-${n}.webp`} alt={`FITX Sahiwal gym gathering moment ${n}`} width={1000} height={n % 2 ? 1333 : 750} loading="lazy" decoding="async" className="w-full aspect-square object-cover" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
