/* Shared helper: returns the 5 featured male client testimonials (with photos),
   de-duplicated by name, in a fixed order. Every page that shows these
   testimonials should use this so the same 5 appear everywhere. */
export const FEATURED_BOY_NAMES = ['Muhammad F.', 'Hassan F.', 'A R J.', 'Sami S.', 'Ali B.'];

export function featuredBoys(testimonials) {
  return (testimonials || [])
    .filter((t) => t.kind === 'quote' && FEATURED_BOY_NAMES.includes(t.name) && t.image)
    .filter((t, i, arr) => arr.findIndex((x) => x.name === t.name) === i)
    .sort((a, b) => FEATURED_BOY_NAMES.indexOf(a.name) - FEATURED_BOY_NAMES.indexOf(b.name));
}
