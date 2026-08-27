import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import MobileMenu from './MobileMenu.jsx';
import { BRAND, tel } from '../../lib/brand.js';

const NAV = [
  { to: '/about', label: 'About' },
  { to: '/personal-training', label: 'Training' },
  { to: '/trainers', label: 'Coaches' },
  { to: '/results', label: 'Results' },
  { to: '/programs', label: 'Membership' },
  { to: '/body-assessment', label: 'Assessment' },
  { to: '/contact', label: 'Contact' }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:font-bold">
        Skip to content
      </a>
      {/* top bar — reference style */}
      <div className="fixed inset-x-0 top-0 z-40 bg-navy text-white/80 hidden md:block">
        <div className="shell flex items-center justify-between h-9 text-[11px] font-semibold tracking-wide">
          <p className="uppercase">Shadman Town, Faisalabad Road, Sahiwal · Sat–Thu 11am–10pm</p>
          <div className="flex items-center gap-4">
            <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-brand">FB</a>
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-brand">IG</a>
            <a href={tel} className="hover:text-brand">SAHIWAL STUDIO: {BRAND.phoneDisplay}</a>
          </div>
        </div>
      </div>

      <header className={`fixed inset-x-0 z-50 transition-all duration-300 md:top-9 top-0 ${scrolled ? 'bg-white shadow-card' : 'bg-white'}`}>
        <div className={`shell flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-16 md:h-20'}`}>
          <Logo compact={scrolled} />
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `font-display text-[12px] font-bold uppercase tracking-[0.14em] transition-colors ${isActive ? 'text-brand' : 'text-navy hover:text-brand'}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link to="/book-consultation" className="btn-primary btn-sm">Join Now</Link>
          </nav>
          <button
            className="lg:hidden flex flex-col justify-center items-end gap-1.5 h-11 w-11"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="block h-0.5 w-7 bg-navy" />
            <span className="block h-0.5 w-5 bg-brand" />
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
