import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { BRAND, wa, tel } from '../../lib/brand.js';

export default function Footer() {
  return (
    <footer className="bg-[#0a0508] text-white">
      <div className="shell py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
        {/* brand */}
        <div>
          <Logo onDark />
          <p className="mt-6 text-sm text-white/60 leading-relaxed">{BRAND.tagline}</p>
        </div>

        {/* instagram */}
        <div>
          <h3 className="font-display font-extrabold uppercase text-lg tracking-wide">Instagram</h3>
          <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" className="block mt-6 max-w-[220px] overflow-hidden group" aria-label="FITX on Instagram">
            <img src="/images/fitx/results/fitx-client-of-the-month.webp" alt="FITX client of the month on Instagram" width={908} height={1280} loading="lazy" decoding="async" className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </a>
        </div>

        {/* contact */}
        <div>
          <h3 className="font-display font-extrabold uppercase text-lg tracking-wide">Contact Us</h3>
          <ul className="mt-6 space-y-4 text-sm text-white/80">
            <li className="flex gap-3">
              <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/></svg>
              <span>{BRAND.address}</span>
            </li>
            <li className="flex gap-3">
              <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.7.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.7.1.3 0 .7-.2 1l-2.3 2.1z"/></svg>
              <a href={tel} className="hover:text-brand">+{BRAND.phoneIntl.slice(1)}</a>
            </li>
            <li className="flex gap-3">
              <svg className="mt-0.5 shrink-0" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 5h20v14H2V5zm2 2v.4l8 5 8-5V7l-8 5-8-5z"/></svg>
              <a href={`mailto:${BRAND.email}`} className="hover:text-brand">{BRAND.email}</a>
            </li>
          </ul>
        </div>

        {/* follow */}
        <div>
          <h3 className="font-display font-extrabold uppercase text-lg tracking-wide">Follow Us</h3>
          <div className="mt-6 flex gap-3">
            <a href={BRAND.facebook} target="_blank" rel="noopener noreferrer" aria-label="FITX on Facebook" className="h-11 w-11 border border-white/25 flex items-center justify-center text-white/80 hover:bg-brand hover:border-brand hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13 22v-8h3l.5-4H13V7.5c0-1.1.3-1.5 1.7-1.5H16.6V2.2C15.9 2.1 14.7 2 13.6 2 10.6 2 9 3.7 9 7v3H6v4h3v8h4z"/></svg>
            </a>
            <a href={BRAND.instagram} target="_blank" rel="noopener noreferrer" aria-label="FITX on Instagram" className="h-11 w-11 border border-white/25 flex items-center justify-center text-white/80 hover:bg-brand hover:border-brand hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c2.7 0 3 .01 4.1.06 1.1.05 1.8.22 2.5.49.7.26 1.3.62 1.9 1.2.6.6.95 1.2 1.2 1.9.27.7.44 1.4.49 2.5.05 1.1.06 1.4.06 4.1s-.01 3-.06 4.1c-.05 1.1-.22 1.8-.49 2.5-.26.7-.62 1.3-1.2 1.9-.6.6-1.2.95-1.9 1.2-.7.27-1.4.44-2.5.49-1.1.05-1.4.06-4.1.06s-3-.01-4.1-.06c-1.1-.05-1.8-.22-2.5-.49-.7-.26-1.3-.62-1.9-1.2-.6-.6-.95-1.2-1.2-1.9-.27-.7-.44-1.4-.49-2.5C2.01 15 2 14.7 2 12s.01-3 .06-4.1c.05-1.1.22-1.8.49-2.5.26-.7.62-1.3 1.2-1.9.6-.6 1.2-.95 1.9-1.2.7-.27 1.4-.44 2.5-.49C9 2.01 9.3 2 12 2zm0 4.9a5.1 5.1 0 1 0 0 10.2 5.1 5.1 0 0 0 0-10.2zm0 2a3.1 3.1 0 1 1 0 6.2 3.1 3.1 0 0 1 0-6.2zm5.3-3.1a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>
            </a>
            <a href={wa('Hello FITX!')} target="_blank" rel="noopener noreferrer" aria-label="FITX on WhatsApp" className="h-11 w-11 border border-white/25 flex items-center justify-center text-white/80 hover:bg-brand hover:border-brand hover:text-white transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.1 14.9l-.5-.3-3 .8.8-2.9-.3-.5A8 8 0 0 1 12 4z"/></svg>
            </a>
          </div>
          <div className="mt-8 space-y-1 text-sm text-white/60">
            <p>{BRAND.hoursWeek}</p>
            <p>{BRAND.hoursFriday}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="shell py-5 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs text-white/40">
          <p>© {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.</p>
          <p className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-white">Privacy</Link>
            <Link to="/terms-and-conditions" className="hover:text-white">Terms</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
