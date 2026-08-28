import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';

const WHO = [
  { to: '/about', label: 'About Us' },
  { to: '/core-team', label: 'Core Team' },
  { to: '/trainers', label: 'Our Coaches' }
];
const WWD = [
  { to: '/personal-training', label: 'Personal Training' },
  { to: '/weight-loss', label: 'Weight Loss & Fat Loss' },
  { to: '/strength-conditioning', label: 'Strength & Conditioning' },
  { to: '/womens-fitness', label: 'Women’s Performance' },
  { to: '/programs', label: 'Group Sessions' },
  { to: '/nutrition', label: 'Nutrition Guidance' }
];

function Sub({ items, open }) {
  if (!open) return null;
  return (
    <ul className="ml-4 border-l border-white/10 pl-4 py-2 space-y-3">
      {items.map((w) => (
        <li key={w.to}>
          <Link to={w.to} className="block font-display text-[13px] font-bold uppercase tracking-[0.06em] text-white/60 hover:text-brand">
            {w.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function MobileMenu({ open, onClose }) {
  const [who, setWho] = useState(false);
  const [wwd, setWwd] = useState(false);
  if (!open) return null;

  const item = 'flex items-center justify-between w-full py-4 font-display text-[14px] font-bold uppercase tracking-[0.06em]';

  return (
    <div className="fixed inset-0 z-[60] bg-black overflow-y-auto slim-scroll" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="shell flex items-center justify-between h-16 md:h-20">
        <Logo compact onDark />
        <button onClick={onClose} aria-label="Close menu" className="h-11 w-11 flex items-center justify-center text-2xl text-white hover:text-brand">
          ×
        </button>
      </div>
      <nav aria-label="Mobile" className="shell pb-14 pt-4">
        <ul className="divide-y divide-white/5">
          <li><Link to="/" onClick={onClose} className={`${item} text-white hover:text-brand`}>Home</Link></li>
          <li>
            <button onClick={() => setWho(!who)} className={`${item} text-white hover:text-brand`} aria-expanded={who}>
              Who We Are
              <span aria-hidden="true" className={`text-brand transition-transform ${who ? 'rotate-180' : ''}`}>⌄</span>
            </button>
            <Sub items={WHO} open={who} />
          </li>
          <li>
            <button onClick={() => setWwd(!wwd)} className={`${item} text-white hover:text-brand`} aria-expanded={wwd}>
              What We Do
              <span aria-hidden="true" className={`text-brand transition-transform ${wwd ? 'rotate-180' : ''}`}>⌄</span>
            </button>
            <Sub items={WWD} open={wwd} />
          </li>
          <li><Link to="/facilities" onClick={onClose} className={`${item} text-white hover:text-brand`}>Gallery</Link></li>
          <li><Link to="/results" onClick={onClose} className={`${item} text-white hover:text-brand`}>Success Stories</Link></li>
          <li><Link to="/contact" onClick={onClose} className={`${item} text-white hover:text-brand`}>Contact Us</Link></li>
        </ul>
        <div className="mt-10 flex justify-center">
          <Link to="/book-consultation" onClick={onClose} className="btn-primary">Join Now</Link>
        </div>
      </nav>
    </div>
  );
}
