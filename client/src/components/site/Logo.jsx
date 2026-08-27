import { Link } from 'react-router-dom';

export function LogoMark({ size = 38, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <path d="M6.6 27.6 A 26 26 0 0 1 57.4 27.6" stroke="#232a35" strokeWidth="6.5" strokeLinecap="round" />
      <path d="M6.6 36.4 A 26 26 0 0 0 57.4 36.4" stroke="#232a35" strokeWidth="6.5" strokeLinecap="round" />
      <g fill="#ff4200">
        <rect x="27" y="29.6" width="10" height="4.8" rx="2" />
        <rect x="21.5" y="24.6" width="4.6" height="14.8" rx="2.2" />
        <rect x="37.9" y="24.6" width="4.6" height="14.8" rx="2.2" />
        <rect x="15.6" y="27.4" width="3.6" height="9.2" rx="1.8" />
        <rect x="44.8" y="27.4" width="3.6" height="9.2" rx="1.8" />
      </g>
    </svg>
  );
}

export default function Logo({ to = '/', compact = false, onDark = false }) {
  return (
    <Link to={to} className="flex items-center gap-2.5" aria-label="FITX — home">
      {onDark ? (
        <svg width={compact ? 32 : 38} height={compact ? 32 : 38} viewBox="0 0 64 64" fill="none" aria-hidden="true">
          <path d="M6.6 27.6 A 26 26 0 0 1 57.4 27.6" stroke="#ffffff" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M6.6 36.4 A 26 26 0 0 0 57.4 36.4" stroke="#ffffff" strokeWidth="6.5" strokeLinecap="round" />
          <g fill="#ff4200">
            <rect x="27" y="29.6" width="10" height="4.8" rx="2" />
            <rect x="21.5" y="24.6" width="4.6" height="14.8" rx="2.2" />
            <rect x="37.9" y="24.6" width="4.6" height="14.8" rx="2.2" />
            <rect x="15.6" y="27.4" width="3.6" height="9.2" rx="1.8" />
            <rect x="44.8" y="27.4" width="3.6" height="9.2" rx="1.8" />
          </g>
        </svg>
      ) : (
        <LogoMark size={compact ? 32 : 38} />
      )}
      <span className={`font-display font-extrabold tracking-tight leading-none ${compact ? 'text-xl' : 'text-2xl'} ${onDark ? 'text-white' : 'text-navy'}`}>
        FIT<span className="text-brand">X</span>
      </span>
    </Link>
  );
}
