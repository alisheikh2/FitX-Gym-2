import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';

export default function NotFound() {
  return (
    <>
      <Seo title="Page Not Found — FITX Sahiwal" description="This page doesn't exist. Return to FITX Personal Fitness Training Studio, Sahiwal." path="/404" />
      <section className="pt-40 pb-28 shell text-center">
        <p className="label justify-center flex items-center gap-3"><span className="divider-x" aria-hidden="true" />404</p>
        <h1 className="h-display text-5xl sm:text-7xl mt-4 text-paper">This rep doesn’t exist.</h1>
        <p className="mt-5 text-silver max-w-md mx-auto">The page you’re looking for was moved or never written. Let’s get you back to the floor.</p>
        <div className="mt-9 flex justify-center gap-4 flex-wrap">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/contact" className="btn-ghost">Contact Us</Link>
        </div>
      </section>
    </>
  );
}
