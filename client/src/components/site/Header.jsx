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
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur shadow-card' : 'bg-gradient-to-b from-black/50 to-transparent'}`}>
        <div className={`shell flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-[4.5rem]'}`}>
          <Logo compact={scrolled} onDark={!scrolled} />
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-6">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `font-display text-[12px] font-bold uppercase tracking-wider transition-colors ${isActive ? 'text-brand' : scrolled ? 'text-navy hover:text-brand' : 'text-white hover:text-brand'}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <a href={tel} className={`font-display text-[12px] font-bold uppercase tracking-wider ${scrolled ? 'text-navy hover:text-brand' : 'text-white hover:text-brand'}`}>{BRAND.phoneDisplay}</a>
            <Link to="/book-consultation" className="btn-primary btn-sm">Join Now</Link>
          </nav>
          <button
            className={`lg:hidden flex flex-col justify-center items-end gap-1.5 h-11 w-11 ${scrolled ? '' : ''}`}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className={`block h-0.5 w-7 ${scrolled ? 'bg-navy' : 'bg-white'}`} />
            <span className="block h-0.5 w-5 bg-brand" />
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
