import { Link } from 'react-router-dom';

export function LogoMark({ size = 40, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="fitx-silver" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f2f2f2" />
          <stop offset="0.5" stopColor="#8f8f8f" />
          <stop offset="1" stopColor="#e8e8e8" />
        </linearGradient>
      </defs>
      <path d="M6.6 27.6 A 26 26 0 0 1 57.4 27.6" stroke="url(#fitx-silver)" strokeWidth="6.5" strokeLinecap="round" />
      <path d="M6.6 36.4 A 26 26 0 0 0 57.4 36.4" stroke="url(#fitx-silver)" strokeWidth="6.5" strokeLinecap="round" />
      <g fill="#F59A00">
        <rect x="27" y="29.6" width="10" height="4.8" rx="2" />
        <rect x="21.5" y="24.6" width="4.6" height="14.8" rx="2.2" />
        <rect x="37.9" y="24.6" width="4.6" height="14.8" rx="2.2" />
        <rect x="15.6" y="27.4" width="3.6" height="9.2" rx="1.8" />
        <rect x="44.8" y="27.4" width="3.6" height="9.2" rx="1.8" />
      </g>
    </svg>
  );
}

export default function Logo({ to = '/', dark = false, compact = false }) {
  return (
    <Link to={to} className="flex items-center gap-2.5 group" aria-label="FITX — home">
      <LogoMark size={compact ? 34 : 40} />
      <span className={`font-display font-bold tracking-tight leading-none ${compact ? 'text-xl' : 'text-2xl'} ${dark ? 'text-obsidian' : 'text-white'}`}>
        FIT<span className="text-brand">X</span>
      </span>
      {!compact && (
        <span className={`hidden md:block text-[10px] uppercase tracking-label leading-tight border-l pl-2.5 ${dark ? 'border-obsidian/20 text-obsidian/60' : 'border-silver/30 text-silver'}`}>
          Personal Fitness<br />Training Studio
        </span>
      )}
    </Link>
  );
}
