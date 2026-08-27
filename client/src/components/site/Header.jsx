import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import MobileMenu from './MobileMenu.jsx';

const NAV = [
  { to: '/about', label: 'About' },
  { to: '/personal-training', label: 'Training' },
  { to: '/trainers', label: 'Trainers' },
  { to: '/results', label: 'Results' },
  { to: '/facilities', label: 'Facilities' },
  { to: '/body-assessment', label: 'Body Assessment' },
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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-brand focus:text-obsidian focus:px-4 focus:py-2 focus:font-bold">
        Skip to content
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-obsidian/95 backdrop-blur border-b border-steel/60' : 'bg-gradient-to-b from-obsidian/85 to-transparent'}`}>
        <div className={`shell flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-16' : 'h-20'}`}>
          <Logo compact={scrolled} />
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-7">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive ? 'text-brand' : 'text-silver hover:text-white'}`
                }
              >
                {n.label}
              </NavLink>
            ))}
            <Link to="/book-consultation" className="btn-primary btn-sm">Book Consultation</Link>
          </nav>
          <button
            className="lg:hidden flex flex-col justify-center items-end gap-1.5 h-11 w-11"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="block h-0.5 w-7 bg-white" />
            <span className="block h-0.5 w-5 bg-brand" />
            <span className="block h-0.5 w-7 bg-white" />
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
