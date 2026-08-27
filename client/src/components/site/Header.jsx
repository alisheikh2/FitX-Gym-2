import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import MobileMenu from './MobileMenu.jsx';
import { BRAND } from '../../lib/brand.js';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'Who We Are' },
  { to: '/personal-training', label: 'What We Do' },
  { to: '/results', label: 'Success Stories' },
  { to: '/facilities', label: 'Gallery' },
  { to: '/contact', label: 'Contact Us' }
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
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-card' : 'bg-transparent'}`}>
        <div className={`shell flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-16 md:h-20'}`}>
          <Logo compact={scrolled} onDark={!scrolled} />
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `font-display text-[12px] font-bold uppercase tracking-[0.16em] transition-colors ${isActive ? 'text-brand' : scrolled ? 'text-navy hover:text-brand' : 'text-white hover:text-brand'} drop-shadow-sm`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>
          <button
            className="lg:hidden flex flex-col justify-center items-end gap-1.5 h-11 w-11"
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
