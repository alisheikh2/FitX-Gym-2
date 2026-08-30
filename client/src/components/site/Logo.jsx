import { Link } from 'react-router-dom';

// Original client logo colours (sampled 1:1 from the brand file)
const LOGO_ORANGE = '#eb880e';

// The "X" of FITX — the logo's exact custom shape (traced 1:1 from the client's brand PNG,
// 131 x 86 unit grid, re-traced from the client's 800 x 398 brand PNG — includes the small chamfered end-cuts and the clean notch/channel junction). Reused for the hero headline without shrinking the text.
export function LogoX({ height, className = '', style = {}, color = LOGO_ORANGE }) {
  return (
    <svg
      {...(height ? { height, width: (height * 131) / 86 } : {})}
      viewBox="0 0 131 86"
      fill={color}
      aria-hidden="true"
      className={className}
      style={{ display: 'inline-block', ...style }}
    >
      <path fill-rule="evenodd" d="M0,0 L32,0 L45,13 L46,13 L46,15 L47,24 L71,2 L72,0 L103,0 L103,1 L71,29 L71,34 L130,84 L94,83 L71,64 L53,48 L52,48 L29,70 L1,70 L1,69 L46,26 L45,15 L32,27 Z M45,15 L46,15 L47,24 L46,26 Z" />
    </svg>
  );
}

// Logo mark (chrome ring + dumbbell) = client's exact artwork, extracted from the brand PNG
// (client/public/images/fitx/logo/fitx-mark.png — 229 x 220, transparent)
// onLight = light-background variant (darker ring) for admin/receipt screens
export function LogoMark({ size = 40, className = '', onLight = false }) {
  return (
    <img
      src={onLight ? '/images/fitx/logo/fitx-mark-dark.png' : '/images/fitx/logo/fitx-mark.png'}
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
