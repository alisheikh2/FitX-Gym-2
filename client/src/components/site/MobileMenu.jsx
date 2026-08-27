import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { BRAND, wa, tel } from '../../lib/brand.js';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/personal-training', label: 'Personal Training' },
  { to: '/weight-loss', label: 'Weight Loss' },
  { to: '/strength-conditioning', label: 'Strength & Conditioning' },
  { to: '/womens-fitness', label: "Women's Fitness" },
  { to: '/trainers', label: 'Trainers' },
  { to: '/results', label: 'Results' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/programs', label: 'Membership' },
  { to: '/body-assessment', label: 'Body Assessment' },
  { to: '/blog', label: 'Resources' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' }
];

export default function MobileMenu({ open, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-obsidian/[0.985] overflow-y-auto slim-scroll" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="shell flex items-center justify-between h-20">
        <Logo compact />
        <button onClick={onClose} aria-label="Close menu" className="h-11 w-11 flex items-center justify-center text-3xl text-silver hover:text-brand">
          ×
        </button>
      </div>
      <nav aria-label="Mobile" className="shell pt-4 pb-10">
        <ul className="space-y-1">
          {LINKS.map((l, i) => (
            <li key={l.to} className="animate-fade-up" style={{ animationDelay: `${i * 40}ms` }}>
              <Link to={l.to} onClick={onClose} className="block py-2 font-display font-bold text-2xl text-paper hover:text-brand transition-colors">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 pt-8 border-t border-steel space-y-4 animate-fade-up" style={{ animationDelay: '560ms' }}>
          <Link to="/book-consultation" onClick={onClose} className="btn-primary w-full">Book a Consultation</Link>
          <div className="flex gap-3">
            <a href={tel} className="btn-ghost btn-sm flex-1">Call</a>
            <a href={wa('Hello FITX, I would like to ask about training.') } target="_blank" rel="noopener noreferrer" className="btn-ghost btn-sm flex-1">WhatsApp</a>
          </div>
          <p className="text-sm text-muted">{BRAND.address}</p>
          <p className="text-sm text-muted">{BRAND.hoursWeek}<br />{BRAND.hoursFriday}</p>
        </div>
      </nav>
    </div>
  );
}
