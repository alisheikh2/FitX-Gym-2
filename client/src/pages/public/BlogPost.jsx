import { Link, useParams } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import { useFetch } from '../../lib/hooks.js';
import { BRAND } from '../../lib/brand.js';
import Reveal from '../../components/ui/Reveal.jsx';
import { Breadcrumbs, CTASection } from '../../components/site/blocks.jsx';

export default function BlogPost() {
  const { slug } = useParams();
  const { data: post, loading } = useFetch(`/blog/${slug}`);

  if (loading) return <div className="pt-40 shell max-w-3xl"><div className="card h-[50vh] animate-pulse" /></div>;
  if (!post) {
    return (
      <div className="pt-40 pb-24 shell">
        <h1 className="h-display text-4xl">Article not found</h1>
        <Link to="/blog" className="btn-primary mt-8">All Guides</Link>
      </div>
    );
  }

  return (
    <>
      <Seo
        title={`${post.title} | FITX Sahiwal`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={post.cover}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.title,
          description: post.excerpt,
          author: { '@type': 'Organization', name: 'FITX Personal Fitness Training Studio' },
          publisher: { '@type': 'Organization', name: 'FITX Personal Fitness Training Studio', url: BRAND.siteUrl },
          datePublished: post.publishedAt,
          image: post.cover
        }}
      />
      <article className="pt-28 sm:pt-36 pb-16">
        <div className="shell max-w-3xl">
          <Breadcrumbs items={[['Resources', '/blog'], [post.title, null]]} />
          <Reveal>
            <h1 className="h-display text-3xl sm:text-5xl text-paper leading-tight">{post.title}</h1>
            <p className="mt-5 text-sm text-muted">{post.authorName} · {new Date(post.publishedAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
          </Reveal>
          {post.cover && (
            <Reveal delay={100} className="mt-10 overflow-hidden border border-steel">
              <img src={post.cover} alt={post.title} width={1400} height={1050} loading="eager" decoding="async" className="w-full aspect-[16/9] object-cover" />
            </Reveal>
          )}
          <Reveal delay={140}>
            <div className="mt-10 space-y-6">
              {(post.content || []).map((b, i) => {
                if (b.type === 'h2') return <h2 key={i} className="font-display font-bold text-2xl text-paper pt-4">{b.text}</h2>;
                if (b.type === 'ul') return <ul key={i} className="space-y-2.5">{b.items.map((it) => <li key={it} className="text-silver leading-relaxed flex gap-3"><span className="text-brand font-bold shrink-0">—</span>{it}</li>)}</ul>;
                return <p key={i} className="text-silver leading-relaxed text-base sm:text-lg">{b.text}</p>;
              })}
            </div>
          </Reveal>
          <Reveal className="mt-12 card p-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-silver">Questions about your own situation? Ask a coach — it’s free.</p>
            <Link to="/book-consultation" className="btn-primary btn-sm">Book a Consultation</Link>
          </Reveal>
        </div>
      </article>
      <CTASection />
    </>
  );
}
