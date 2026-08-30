import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import { featuredBoys } from '../../lib/testimonials.js';
import Reveal from '../../components/ui/Reveal.jsx';
import { HeroSlider, BandCard, BigTitle, TestimonialCarousel } from '../../components/site/blocks.jsx';

export default function Home() {
  const { data: testimonials } = useFetch('/testimonials');
  // Show only the 5 featured male client testimonials (with photos), de-duplicated.
  const quotes = featuredBoys(testimonials);

  return (
    <>
      <Seo
        title="FITX Personal Fitness Training Studio, Personal Trainer in Sahiwal"
        description="FITX is Sahiwal's dedicated personal training studio in Shadman Town, Faisalabad Road. One-to-one coaching, boxing sessions, nutrition guidance and fat loss. Book a consultation."
        path="/"
        image="/images/fitx/hero-coaching.jpg"
      />

      {/* 1, HERO SLIDER */}
      <HeroSlider />

      {/* 2, TWO BAND CARDS */}
      <section className="py-14 sm:py-20">
        <div className="shell grid md:grid-cols-2 gap-10 lg:gap-14">
          <BandCard
            to="/about"
            image="/images/fitx/hero-coaching.jpg"
            alt="FITX coach guiding a client through a barbell session"
            kicker="Who we are"
            title="Boutique Training"
            copy={<> <strong className="text-navy">FITX Personal Studio</strong> is one of Sahiwal’s most sophisticated and serious personal training studios, dedicated to revolutionizing the way society approaches health and wellness. Through personalized training, expert guidance, and purposeful programs, FITX empowers individuals to build strength, confidence, and a healthier lifestyle.</>}
          />
          <BandCard
            to="/boxing-session"
            image="/images/fitx/boxing/fitx-boxing-pads.jpg"
            alt="FITX coach holding focus mitts during a boxing session at FITX Sahiwal"
            kicker="Combat training"
            title="Boxing Session"
            copy="FITX offers personalized boxing sessions designed to improve your fitness, strength, stamina, coordination, and confidence. Our expert trainers guide you through proper boxing techniques, combinations, pad work, and conditioning drills. Each session is tailored to your fitness level and individual goals, making your workout both challenging and rewarding. Sign up now!"
          />
        </div>
      </section>

      {/* 3, STAGGERED: OUR PROGRAMS / OUR COACHES */}
      <section className="pb-14 sm:pb-20">
        <div className="shell grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* left column */}
          <div>
            <Reveal className="overflow-hidden">
              <img src="/images/fitx/gen-whiteboard.jpg" alt="FITX coach walking a client through their written program" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
            </Reveal>
            <Reveal delay={60}>
              <p className="font-display font-bold text-brand text-[13px] uppercase tracking-[0.08em] mt-10">What we do</p>
              <BigTitle className="mt-3">Our Programs</BigTitle>
              <p className="mt-6 text-[15px] sm:text-base font-bold text-navy/90 leading-[1.8]">Our personal training programs have revolutionized fitness in Sahiwal!</p>
              <p className="mt-6 text-[15px] text-silver leading-[1.8]">
                Our workouts are designed following a full-body assessment which allows us to determine the client’s fitness level and quality of movement. This system works with the dynamic and ever changing nature of the human body to nurture it through controlled cycles of <strong className="text-navy">stress</strong>, <strong className="text-navy">disruption</strong> and <strong className="text-navy">adaptation</strong>, taking each body to its <strong className="text-navy">unique potential</strong>.
              </p>
              <p className="mt-5 text-[15px] text-silver leading-[1.8]">
                Our rigorous routines combine cardio and resistance training in coached, supervised sessions that are aimed to develop your form, function and stamina, while guaranteeing your goals!
              </p>
              <div className="mt-9">
                <Link to="/training" className="btn-primary">Choose a Program</Link>
              </div>
            </Reveal>
            <Reveal delay={80} className="overflow-hidden mt-12">
              <img src="/images/fitx/gen-squat.jpg" alt="Barbell training at FITX Sahiwal" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] object-cover" />
            </Reveal>
          </div>

          {/* right column */}
          <div>
            <Reveal className="overflow-hidden">
              <img src="/images/fitx/gen-medball-coach.jpg" alt="Coach guiding a member through medicine ball training at FITX" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-[4/3] lg:aspect-[3/4] object-cover object-center" />
            </Reveal>
            <div className="border-t border-steel mt-10 pt-10">
              <Reveal>
                <p className="font-display font-bold text-brand text-[13px] uppercase tracking-[0.08em]">Personal training</p>
                <BigTitle className="mt-3">Our Coaches</BigTitle>
                <p className="mt-6 text-base sm:text-lg text-navy leading-relaxed">FITX programs combined with excellent coaching <span className="uppercase">guarantee results</span>.</p>
                <p className="mt-5 text-[15px] text-silver leading-[1.8]">
                  Our team of coaches is an exceptional mix of talent, knowledge, experience, and most importantly, passion. When you join FITX, rest assured that you are not the only one investing in YOU.
                </p>
                <p className="mt-5 text-[15px] text-silver leading-[1.8]">
                  Each one of our experts is constantly redefining fitness ideals. They don’t just challenge you, but persistently push their own physical boundaries as well. Each of them has a fitness story and journey to share…
                </p>
                <div className="mt-9">
                  <Link to="/trainers" className="btn-primary">Meet Our Coaches</Link>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 4, CLIENT TESTIMONIALS carousel */}
      <section className="py-14 sm:py-20">
        <div className="shell">
          <BigTitle>Client Testimonials</BigTitle>
          <div className="mt-12">
            <TestimonialCarousel items={quotes} />
          </div>
        </div>
      </section>
    </>
  );
}
