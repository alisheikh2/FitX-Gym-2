import { Link } from 'react-router-dom';

// Original client logo colours (sampled 1:1 from the brand file)
const LOGO_ORANGE = '#eb880e';

// The "X" of FITX — custom shape traced 1:1 from the client's original logo
// (65 x 44 unit grid: flat tops, V-notch above, open sides, arms overshoot below baseline)
export function LogoX({ height = 20, className = '' }) {
  return (
    <svg
      height={height}
      width={(height * 65) / 44}
      viewBox="0 0 65 44"
      fill={LOGO_ORANGE}
      aria-hidden="true"
      className={className}
    >
      <polygon points="1,0 17,0 26,8 34,0 51,0 51,3 38,15 38,18 64,40 64,43 44,42.5 38,37 26,27 16,36 0,36 0,32 15,18 15,16 1,4" />
    </svg>
  );
}

export function LogoMark({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="fitx-silver" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f5f5f5" />
          <stop offset="0.5" stopColor="#737373" />
          <stop offset="1" stopColor="#e6e6e6" />
        </linearGradient>
      </defs>
      <path d="M6.6 27.6 A 26 26 0 0 1 57.4 27.6" stroke="url(#fitx-silver)" strokeWidth="6.5" strokeLinecap="round" />
      <path d="M6.6 36.4 A 26 26 0 0 0 57.4 36.4" stroke="url(#fitx-silver)" strokeWidth="6.5" strokeLinecap="round" />
      <g fill={LOGO_ORANGE}>
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
  // matches text-xl (20px) / text-2xl (24px); X sized to original proportions (≈0.83 × font size)
  const fs = compact ? 20 : 24;
  return (
    <Link to={to} className="flex items-center gap-2.5 group" aria-label="FITX — home">
      <LogoMark size={compact ? 34 : 40} />
      <span
        className={`flex items-center font-display font-extrabold tracking-tight leading-none ${onDark ? 'text-white' : 'text-navy'}`}
        style={{ fontSize: fs }}
      >
        FIT
        <LogoX height={Math.round(fs * 0.83)} className="ml-[0.02em] translate-y-[0.06em]" />
      </span>
    </Link>
  );
}
