import { useEffect } from 'react';
import { BRAND } from './brand.js';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Per-page SEO: title, description, canonical, OpenGraph, Twitter and JSON-LD. */
export default function Seo({ title, description, path = '/', image, jsonLd, type = 'website' }) {
  useEffect(() => {
    document.title = title;
    if (description) setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    if (description) setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:url', BRAND.siteUrl + path);
    if (image) {
      setMeta('property', 'og:image', image.startsWith('http') ? image : BRAND.siteUrl + image);
      setMeta('name', 'twitter:image', image.startsWith('http') ? image : BRAND.siteUrl + image);
    }
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    if (description) setMeta('name', 'twitter:description', description);

    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = BRAND.siteUrl + path;

    let ld = document.getElementById('page-jsonld');
    if (!ld) {
      ld = document.createElement('script');
      ld.type = 'application/ld+json';
      ld.id = 'page-jsonld';
      document.head.appendChild(ld);
    }
    ld.textContent = JSON.stringify(jsonLd || { '@context': 'https://schema.org', '@type': 'WebPage', name: title, url: BRAND.siteUrl + path });
  }, [title, description, path, image, jsonLd, type]);
  return null;
}
