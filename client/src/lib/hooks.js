import { useEffect, useState, useCallback } from 'react';
import { api } from './api.js';
import fb from '../data/fallback.json';

/**
 * Verified-content safety net.
 * IMPORTANT: the fallback is used ONLY when the API is unreachable (network/500).
 * Whenever the API responds, even with empty data, the live database wins,
 * so admin/POS edits always show on the public site.
 */
const FALLBACK = [
  [/^\/trainers\/(.+)$/, (m) => fb.trainers.find((t) => t.slug === m[1]) || null],
  [/^\/blog\/(.+)$/, (m) => fb.posts.find((p) => p.slug === m[1]) || null],
  [/^\/trainers/, () => fb.trainers],
  [/^\/programs/, () => fb.programs],
  [/^\/plans/, () => fb.plans],
  [/^\/faqs/, () => fb.faqs],
  [/^\/testimonials/, () => fb.testimonials],
  [/^\/blog/, () => fb.posts],
  [/^\/settings/, () => fb.settings]
];

function fallbackFor(path) {
  for (const [re, fn] of FALLBACK) {
    const m = path.match(re);
    if (m) return fn(m);
  }
  return null;
}

export function useFetch(path, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const load = useCallback(() => {
    setLoading(true);
    api
      .get(path)
      .then(setData) // live DB always wins
      .catch((e) => {
        setError(e);
        const f = fallbackFor(path);
        if (f !== null) setData(f); // API down only → verified snapshot
      })
      .finally(() => setLoading(false));
  }, [path]);
  useEffect(() => { load(); }, [load, ...deps]);
  return { data, loading, error, reload: load };
}
