import { useEffect, useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';
import MobileMenu from './MobileMenu.jsx';

const WHO = [
  { to: '/about', label: 'About Us' },
  { to: '/core-team', label: 'Core Team' },
  { to: '/trainers', label: 'Our Coaches' }
];
const WWD = [
  { to: '/personal-training', label: 'Personal Training' },
  { to: '/boxing-session', label: 'Boxing Session' },
  { to: '/yoga-sessions', label: 'Yoga Sessions' },
  { to: '/family-sessions', label: 'Family Sessions' },
  { to: '/nutrition', label: 'Nutrition Guidance' }
];
const NAV = [
  { to: '/facilities', label: 'Gallery' },
  { to: '/results', label: 'Success Stories' },
  { to: '/contact', label: 'Contact Us' }
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null); // 'who' | 'wwd' | null
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const whoActive = WHO.some((w) => pathname.startsWith(w.to));
  const wwdActive = WWD.some((w) => pathname.startsWith(w.to));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  // Close the mobile menu AND any open dropdown whenever the route changes
  useEffect(() => { setOpen(false); setDropdown(null); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);
  // Clicking anywhere outside closes an open dropdown
  useEffect(() => {
    if (!dropdown) return;
    const close = () => setDropdown(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [dropdown]);

  // On the homepage the nav bar is transparent (over the hero) until you scroll;
  // on every other page it keeps the solid black background. Always pinned to top.
  const transparent = isHome && !scrolled;

  const linkCls = () =>
    `font-display text-[14px] font-light hover:font-normal uppercase tracking-[0.12em] transition-colors text-white hover:text-brand`;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:font-bold">
        Skip to content
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${transparent ? 'bg-transparent' : 'bg-black shadow-card'}`}>
        <div className={`shell flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-16 md:h-20'}`}>
          <Logo compact={scrolled} onDark />
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-6">
            <NavLink to="/" end className={() => linkCls()}>
              {({ isActive }) => <>Home{isActive && <span className="text-brand ml-1 font-bold text-base" aria-hidden="true">/</span>}</>}
            </NavLink>

            {/* Who We Are dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDropdown('who')}
              onMouseLeave={() => setDropdown((d) => (d === 'who' ? null : d))}
            >
              <button
                className={linkCls()}
                aria-haspopup="true"
                aria-expanded={dropdown === 'who'}
                onClick={() => setDropdown((d) => (d === 'who' ? null : 'who'))}
              >
                Who We Are{whoActive && <span className="text-brand ml-1 font-bold text-base" aria-hidden="true">/</span>}
                <span aria-hidden="true" className={`ml-2 text-[9px] align-middle ${whoActive ? 'text-brand' : ''}`}>▼</span>
              </button>
              <div className={`absolute left-0 top-full pt-3 transition-all duration-300 ease-out ${dropdown === 'who' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <ul className="bg-black border border-white/10 border-b-2 border-b-brand divide-y divide-white/10 py-2 min-w-[180px] shadow-lift">
                  {WHO.map((w) => (
                    <li key={w.to}>
                      <Link to={w.to} onClick={() => setDropdown(null)} className="block px-5 py-2.5 font-display text-[13px] font-light hover:font-normal uppercase tracking-[0.12em] text-white/80 hover:text-brand hover:underline decoration-brand underline-offset-4 transition-colors duration-200">
                        {w.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* What We Do dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDropdown('wwd')}
              onMouseLeave={() => setDropdown((d) => (d === 'wwd' ? null : d))}
            >
              <button
                className={linkCls()}
                aria-haspopup="true"
                aria-expanded={dropdown === 'wwd'}
                onClick={() => setDropdown((d) => (d === 'wwd' ? null : 'wwd'))}
              >
                What We Do{wwdActive && <span className="text-brand ml-1 font-bold text-base" aria-hidden="true">/</span>}
                <span aria-hidden="true" className={`ml-2 text-[9px] align-middle ${wwdActive ? 'text-brand' : ''}`}>▼</span>
              </button>
              <div className={`absolute left-0 top-full pt-3 transition-all duration-300 ease-out ${dropdown === 'wwd' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <ul className="bg-black border border-white/10 border-b-2 border-b-brand divide-y divide-white/10 py-2 min-w-[220px] shadow-lift">
                  {WWD.map((w) => (
                    <li key={w.to}>
                      <Link to={w.to} onClick={() => setDropdown(null)} className="block px-5 py-2.5 font-display text-[13px] font-light hover:font-normal uppercase tracking-[0.12em] text-white/80 hover:text-brand hover:underline decoration-brand underline-offset-4 transition-colors duration-200">
                        {w.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={() => linkCls()}>
                {({ isActive }) => <>{n.label}{isActive && <span className="text-brand ml-1 font-bold text-base" aria-hidden="true">/</span>}</>}
              </NavLink>
            ))}
          </nav>
          <button
            className="lg:hidden flex flex-col justify-center items-end gap-1.5 h-11 w-11"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <span className="block h-0.5 w-7 bg-white" />
            <span className="block h-0.5 w-5 bg-brand" />
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
