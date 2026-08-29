import { useEffect, useCallback } from 'react';

/* In-page gallery lightbox. Opens the clicked photo in the same tab with
   prev/next arrows, a close button and keyboard navigation. */
export default function Lightbox({ items, index, onClose, onPrev, onNext }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    else if (e.key === 'ArrowLeft') onPrev();
    else if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  const item = items[index];
  if (!item) return null;
  const [src, cap] = item;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-label={cap}
      onClick={onClose}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close gallery"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 h-11 w-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand text-white text-2xl transition-colors z-10"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label="Previous image"
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand text-white text-3xl transition-colors z-10"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M15 6l-6 6 6 6" /></svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label="Next image"
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-brand text-white text-3xl transition-colors z-10"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
      </button>

      {/* Image */}
      <figure className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-center min-h-[60vh]">
          <img src={src} alt={cap} className="max-h-[78vh] max-w-full object-contain rounded shadow-2xl" />
        </div>
        <figcaption className="mt-4 text-center">
          <span className="inline-block font-display text-[12px] font-bold uppercase tracking-[0.14em] text-brand">
            {index + 1} / {items.length}
          </span>
          <p className="mt-1 text-white/90 text-sm sm:text-base">{cap}</p>
        </figcaption>
      </figure>
    </div>
  );
}
