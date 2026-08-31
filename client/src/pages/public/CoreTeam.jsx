import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, CallNow } from '../../components/site/blocks.jsx';

const TEAM = [
  {
    slug: 'zohaib-ali',
    name: 'Zohaib Ali',
    title: 'Founder & Head Coach',
    photo: '/images/fitx/trainers/fitx-coreteam-zohaib-ali.jpeg',
    photoAlt: 'Zohaib Ali, founder and head coach of FITX Personal Fitness Training Studio Sahiwal',
    paragraphs: [
      { lead: 'Zohaib Ali founded FITX Personal Fitness Training Studio in Shadman Town, Sahiwal, with a vision to redefine how the city approaches fitness.', text: 'Rather than a crowded gym where members are left to figure things out on their own, FITX is built around structured personal training, from an initial consultation and goal-focused programming to consistent coaching and technique guidance.' },
      'In December 2025, Zohaib was invited as a guest speaker at the University of Sahiwal for an HEC-funded NRPU project on youth-led entrepreneurship, where he was presented with a token of appreciation for his contribution.',
      'He continues to train personal clients while overseeing the training programs developed at FITX.'
    ],
    profileTo: '/trainers/zohaib-ali'
  },
  {
    slug: 'rana-usman-munir',
    name: 'Rana Usman Munir',
    title: 'Co-Owner & Executive Director',
    photo: '/images/fitx/trainers/fitx-trainer-rana-usman-munir.jpeg',
    photoAlt: 'Rana Usman Munir, Co-Owner & Executive Director of FITX Personal Fitness Training Studio Sahiwal',
    paragraphs: [
      'Rana Usman Munir is the Co-Owner & Executive Director of FITX Personal Fitness Training Studio. Working alongside founder Zohaib Ali, he oversees the studio’s operations, member experience and long-term growth, making sure the standard that FITX is known for holds true every single day: serious coaching, a professional floor, and honest service.',
      'With a strong background in business and operations, Usman works as much behind the scenes as on the floor, managing members, trainers, timings and the small details that make a training studio feel truly professional. He believes a fitness journey should never be complicated by poor service; your program, your schedule and your goals always come first.',
      'Under his direction, FITX continues to grow into one of Sahiwal’s most respected personal training studios, one member, one result, one session at a time.'
    ]
  }
];

export default function CoreTeam() {
  return (
    <>
      <Seo
        title="Core Team, FITX Personal Fitness Training Studio Sahiwal"
        description="The people behind FITX Sahiwal: founder & head coach Zohaib Ali and co-owner & executive director Rana Usman Munir."
        path="/core-team"
      />
      <PageHero title="Core Team" crumbs={[['Core Team', null]]} />

      <section className="py-16 sm:py-24">
        <div className="shell max-w-5xl space-y-16 sm:space-y-20">
          {TEAM.map((t, i) => {
            const imageRight = i % 2 === 0;
            return (
              <Reveal key={t.slug}>
                {/* Float based layout: image sits beside the text on every screen size
                    (mobile included) and the paragraphs wrap around it. */}
                <article className="after:block after:clear-both after:content-['']">
                  <h2 className="font-display font-bold text-navy text-lg sm:text-xl">{t.name} – {t.title}</h2>

                  <div className="mt-5 text-[15px] text-silver leading-[1.8]">
                    <img
                      src={t.photo}
                      alt={t.photoAlt}
                      width={800}
                      height={1066}
                      loading="lazy"
                      decoding="async"
                      className={[
                        'aspect-[3/4] object-cover object-top',
                        'w-[46%] max-w-[300px] sm:w-[42%] sm:max-w-[360px] md:w-[40%] md:max-w-[420px]',
                        'mb-4 sm:mb-5',
                        imageRight
                          ? 'float-right ml-4 sm:ml-6 md:ml-10'
                          : 'float-left mr-4 sm:mr-6 md:mr-10'
                      ].join(' ')}
                    />

                    {t.paragraphs.map((p, idx) => (
                      <p key={idx} className={idx === 0 ? '' : 'mt-4'}>
                        {typeof p === 'string' ? p : (<><strong className="text-navy">{p.lead}</strong> {p.text}</>)}
                      </p>
                    ))}

                    {t.profileTo && (
                      <div className="mt-6">
                        <Link to={t.profileTo} className="font-display text-[12px] font-bold uppercase tracking-[0.14em] text-brand hover:text-brand-deep">View Coach Profile →</Link>
                      </div>
                    )}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CallNow />
    </>
  );
}
