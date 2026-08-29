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
  { to: '/weight-loss', label: 'Weight Loss & Fat Loss' },
  { to: '/strength-conditioning', label: 'Strength & Conditioning' },
  { to: '/womens-fitness', label: 'Women’s Performance' },
  { to: '/programs', label: 'Group Sessions' },
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

  const linkCls = (active) =>
    `font-display text-[14px] font-light uppercase tracking-[0.12em] transition-colors ${active ? 'text-brand' : 'text-white hover:text-brand'}`;

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-brand focus:text-white focus:px-4 focus:py-2 focus:font-bold">
        Skip to content
      </a>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${transparent ? 'bg-transparent' : 'bg-black shadow-card'}`}>
        <div className={`shell flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-14' : 'h-16 md:h-20'}`}>
          <Logo compact={scrolled} onDark />
          <nav aria-label="Primary" className="hidden lg:flex items-center gap-8">
            <NavLink to="/" end className={({ isActive }) => linkCls(isActive)}>
              {({ isActive }) => <>Home{isActive && <span className="text-brand ml-1" aria-hidden="true">/</span>}</>}
            </NavLink>

            {/* Who We Are dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setDropdown('who')}
              onMouseLeave={() => setDropdown((d) => (d === 'who' ? null : d))}
            >
              <button
                className={linkCls(whoActive)}
                aria-haspopup="true"
                aria-expanded={dropdown === 'who'}
                onClick={() => setDropdown((d) => (d === 'who' ? null : 'who'))}
              >
                Who We Are{whoActive && <span className="text-brand ml-1" aria-hidden="true">/</span>}
                <span aria-hidden="true" className="ml-1 text-[9px] align-middle">▼</span>
              </button>
              <div className={`absolute left-0 top-full pt-3 transition-all duration-300 ease-out ${dropdown === 'who' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <ul className="relative bg-black/95 backdrop-blur-md border border-white/10 py-2 min-w-[180px] shadow-lift">
                  <li className="absolute inset-x-0 top-0 h-px bg-brand" aria-hidden="true" />
                  {WHO.map((w) => (
                    <li key={w.to}>
                      <Link to={w.to} onClick={() => setDropdown(null)} className="group/item relative block pl-5 pr-6 py-2.5 font-display text-[13px] font-light uppercase tracking-[0.12em] text-white/80 hover:text-brand hover:bg-white/5 transition-all duration-200">
                        <span className="absolute left-0 top-0 h-full w-0.5 bg-brand scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200 origin-center" aria-hidden="true" />
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
                className={linkCls(wwdActive)}
                aria-haspopup="true"
                aria-expanded={dropdown === 'wwd'}
                onClick={() => setDropdown((d) => (d === 'wwd' ? null : 'wwd'))}
              >
                What We Do{wwdActive && <span className="text-brand ml-1" aria-hidden="true">/</span>}
                <span aria-hidden="true" className="ml-1 text-[9px] align-middle">▼</span>
              </button>
              <div className={`absolute left-0 top-full pt-3 transition-all duration-300 ease-out ${dropdown === 'wwd' ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-2'}`}>
                <ul className="relative bg-black/95 backdrop-blur-md border border-white/10 py-2 min-w-[220px] shadow-lift">
                  <li className="absolute inset-x-0 top-0 h-px bg-brand" aria-hidden="true" />
                  {WWD.map((w) => (
                    <li key={w.to}>
                      <Link to={w.to} onClick={() => setDropdown(null)} className="group/item relative block pl-5 pr-6 py-2.5 font-display text-[13px] font-light uppercase tracking-[0.12em] text-white/80 hover:text-brand hover:bg-white/5 transition-all duration-200">
                        <span className="absolute left-0 top-0 h-full w-0.5 bg-brand scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200 origin-center" aria-hidden="true" />
                        {w.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => linkCls(isActive)}>
                {({ isActive }) => <>{n.label}{isActive && <span className="text-brand ml-1" aria-hidden="true">/</span>}</>}
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
