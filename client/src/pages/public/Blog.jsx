import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, SectionHead, CTASection } from '../../components/site/blocks.jsx';

export default function Blog() {
  const { data: posts, loading } = useFetch('/blog');

  return (
    <>
      <Seo
        title="Fitness Guides & Blog — FITX Sahiwal"
        description="Practical fitness reading from Sahiwal's coaches: choosing a personal trainer, fat loss vs weight loss, beginner strength training, Pakistani nutrition basics and more."
        path="/blog"
        image="/images/fitx/fitx-coaching-education-session.webp"
      />
      <PageHero
        label="Resources"
        title="Reading that respects your time."
        copy="Guides written by FITX coaches for real questions asked in Sahiwal — no filler, no fake science, no motivation porn."
        crumbs={[['Resources', null]]}
      />
      <section className="py-16 sm:py-24">
        <div className="shell space-y-10 max-w-5xl">
          {loading && [1, 2, 3].map((i) => <div key={i} className="card h-40 animate-pulse" />)}
          {(posts || []).map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <Link to={`/blog/${p.slug}`} className="group grid md:grid-cols-[280px_1fr] gap-6 items-center card hover:border-brand/60 transition-colors overflow-hidden">
                <div className="img-zoom overflow-hidden aspect-[16/10] md:aspect-auto md:h-full">
                  <img src={p.cover} alt="" width={1400} height={1050} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                </div>
                <div className="p-6 md:py-8 md:pr-10">
                  <p className="text-xs text-muted">{new Date(p.publishedAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })} · {p.authorName}</p>
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-paper mt-2 group-hover:text-brand transition-colors">{p.title}</h2>
                  <p className="text-sm text-silver mt-3 leading-relaxed line-clamp-2">{p.excerpt}</p>
                  <span className="inline-block mt-4 text-sm font-semibold text-brand">Read the guide →</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection />
    </>
  );
}
