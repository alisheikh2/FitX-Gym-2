import { Link } from 'react-router-dom';

// Logo mark (chrome ring + dumbbell) = client's exact artwork, extracted from the brand PNG
// (client/public/images/fitx/logo/fitx-mark.png — 229 x 220, transparent)
export function LogoMark({ size = 40, className = '' }) {
  return (
    <img
      src="/images/fitx/logo/fitx-mark.png"
      alt=""
      aria-hidden="true"
      width={size}
      height={Math.round((size * 220) / 229)}
      className={className}
      style={{ display: 'block' }}
    />
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
