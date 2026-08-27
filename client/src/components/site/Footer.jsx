import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { BRAND, wa, tel } from '../../lib/brand.js';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="shell py-16 grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <Logo onDark />
          <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-xs">{BRAND.tagline}</p>
          <div className="mt-6 flex gap-3">
            <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" aria-label="FITX on Facebook" className="h-10 w-10 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-brand hover:bg-brand transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 22v-8h3l.5-4H13V7.5c0-1.1.3-1.5 1.7-1.5H16.6V2.2C15.9 2.1 14.7 2 13.6 2 10.6 2 9 3.7 9 7v3H6v4h3v8h4z"/></svg>
            </a>
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="FITX on Instagram" className="h-10 w-10 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-brand hover:bg-brand transition-colors">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c2.7 0 3 .01 4.1.06 1.1.05 1.8.22 2.5.49.7.26 1.3.62 1.9 1.2.6.6.95 1.2 1.2 1.9.27.7.44 1.4.49 2.5.05 1.1.06 1.4.06 4.1s-.01 3-.06 4.1c-.05 1.1-.22 1.8-.49 2.5-.26.7-.62 1.3-1.2 1.9-.6.6-1.2.95-1.9 1.2-.7.27-1.4.44-2.5.49-1.1.05-1.4.06-4.1.06s-3-.01-4.1-.06c-1.1-.05-1.8-.22-2.5-.49-.7-.26-1.3-.62-1.9-1.2-.6-.6-.95-1.2-1.2-1.9-.27-.7-.44-1.4-.49-2.5C2.01 15 2 14.7 2 12s.01-3 .06-4.1c.05-1.1.22-1.8.49-2.5.26-.7.62-1.3 1.2-1.9.6-.6 1.2-.95 1.9-1.2.7-.27 1.4-.44 2.5-.49C9 2.01 9.3 2 12 2zm0 4.9a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 2a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2zm5.3-3.1a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>
            </a>
          </div>
        </div>
        <nav aria-label="Footer explore">
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.22em] text-white/50 mb-5">Explore</h3>
          <ul className="space-y-2.5 text-sm">
            {[['About', '/about'], ['Personal Training', '/personal-training'], ['Weight Loss', '/weight-loss'], ['Strength & Conditioning', '/strength-conditioning'], ["Women's Fitness", '/womens-fitness'], ['Coaches', '/trainers'], ['Results', '/results'], ['Facilities', '/facilities'], ['Body Assessment', '/body-assessment'], ['Resources', '/blog']].map(([l, to]) => (
              <li key={to}><Link to={to} className="text-white/80 hover:text-brand transition-colors">{l}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <h3 className="font-display text-xs font-bold uppercase tracking-[0.22em] text-white/50 mb-5">Studio</h3>
          <address className="not-italic text-sm text-white/80 leading-relaxed">{BRAND.address}</address>
          <p className="mt-3 text-sm text-white/80">{BRAND.hoursWeek}<br />{BRAND.hoursFriday}</p>
          <p className="mt-3 text-sm"><a href={tel} className="font-display font-bold text-white hover:text-brand">{BRAND.phoneDisplay}</a></p>
          <div className="mt-6 flex justify-center">
            <a href={wa('Hello FITX, I would like to book a consultation.')} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm w-full" aria-label="Chat with FITX on WhatsApp">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.5-.3-3 .8.8-2.9-.3-.5A8 8 0 0 1 12 4zm-3.1 4.2c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.9 4.5 3.9 2.2.9 2.7.7 3.2.7.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.2-.2-.5-.3l-1.7-.8c-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.1-.2 0-.4.1-.5l.6-.7c.2-.2.2-.4.1-.6l-.8-1.9c-.2-.4-.4-.5-.6-.5h-.2z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell py-5 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-white/50">
          <p>© {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.</p>
          <p className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white">Terms</Link>
            <Link to="/admin" className="hover:text-white">Staff</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
