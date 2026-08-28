import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { useFetch } from '../../lib/hooks.js';
import { PageHero, CallNow } from '../../components/site/blocks.jsx';

const TITLES = {
  'zohaib-ali': 'Founder & Head Coach',
  'arslan-ahmad': 'Weight Loss & Fat Loss Expert',
  'iqra-zahid': 'Women Fat Loss & Performance Coach',
  'muazam': 'Strength & Conditioning Coach'
};

export default function CoreTeam() {
  const { data: trainers } = useFetch('/trainers');
  const team = trainers || [];

  return (
    <>
      <Seo
        title="Core Team — FITX Personal Fitness Training Studio Sahiwal"
        description="The people behind FITX Sahiwal: founder & head coach Zohaib Ali, fat-loss expert Arslan Ahmad, women's performance coach Iqra Zahid and strength & conditioning coach Muazam."
        path="/core-team"
      />
      <PageHero title="Core Team" crumbs={[['Core Team', null]]} />

      <section className="py-16 sm:py-24">
        <div className="shell max-w-5xl space-y-20">
          {team.map((t, i) => (
            <Reveal key={t.slug}>
              <div className="grid md:grid-cols-2 gap-10 items-start">
                <div className={i % 2 === 1 ? 'md:order-2' : ''}>
                  <h2 className="font-display font-bold text-navy text-lg sm:text-xl">{t.name} – {TITLES[t.slug] || t.role}</h2>
                  <div className="mt-5 space-y-4 text-[15px] text-silver leading-[1.8]">
                    {(t.bio || t.shortBio || '').split('. ').reduce((paras, sentence, idx, arr) => {
                      // group sentences into paragraphs of ~3
                      if (idx % 3 === 0) paras.push(arr.slice(idx, idx + 3).join('. '));
                      return paras;
                    }, []).map((p, idx) => (
                      <p key={idx}>{p.endsWith('.') ? p : p + '.'}</p>
                    ))}
                  </div>
                  <div className="mt-6">
                    <Link to={`/trainers/${t.slug}`} className="font-display text-[12px] font-bold uppercase tracking-[0.14em] text-brand hover:text-brand-deep">View Coach Profile →</Link>
                  </div>
                </div>
                <div className={i % 2 === 1 ? 'md:order-1' : ''}>
                  <img src={t.photo} alt={t.photoAlt || `${t.name} — FITX Sahiwal`} width={800} height={1066} loading="lazy" decoding="async" className="w-full max-w-[420px] aspect-[3/4] object-cover object-top mx-auto md:mx-0" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CallNow />
    </>
  );
}
