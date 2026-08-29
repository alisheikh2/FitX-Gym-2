import { Link } from 'react-router-dom';

// Original client logo colours (sampled 1:1 from the brand file)
const LOGO_ORANGE = '#eb880e';

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

// "FITX" wordmark = client's exact artwork, extracted from the brand PNG
// (client/public/images/fitx/logo/fitx-wordmark.png — 279 x 89)
export default function Logo({ to = '/', compact = false, onDark = false }) {
  const h = compact ? 17 : 20;
  return (
    <Link to={to} className="flex items-center gap-2.5 group" aria-label="FITX — home">
      <LogoMark size={compact ? 34 : 40} />
      <img
        src="/images/fitx/logo/fitx-wordmark.png"
        alt=""
        aria-hidden="true"
        width={Math.round((h * 279) / 89)}
        height={h}
        className="select-none"
        style={{ transform: 'translateY(1px)' }}
      />
    </Link>
  );
}
