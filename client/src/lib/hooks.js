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
  const initial = fallbackFor(path);
  // Start with the verified fallback snapshot so content renders instantly on
  // first paint (no blank/skeleton wait for the API). Then swap in the live DB
  // response the moment it arrives. Loading only blocks if there is no fallback.
  const [data, setData] = useState(initial);
  const [loading, setLoading] = useState(initial == null);
  const [error, setError] = useState(null);
  const load = useCallback(() => {
    if (initial == null) setLoading(true);
    api
      .get(path)
      .then((live) => setData(live)) // live DB wins once available
      .catch((e) => {
        setError(e);
        // keep the fallback already shown (or fall back to it)
        if (initial == null) {
          const f = fallbackFor(path);
          if (f !== null) setData(f);
        }
      })
      .finally(() => setLoading(false));
  }, [path]);
  useEffect(() => { load(); }, [load, ...deps]);
  return { data, loading, error, reload: load };
}
