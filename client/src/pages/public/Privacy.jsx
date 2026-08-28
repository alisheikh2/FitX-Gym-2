import Seo from '../../lib/Seo.jsx';
import { PageHero } from '../../components/site/blocks.jsx';
import { BRAND } from '../../lib/brand.js';

const S = [
  ['What we collect', 'When you use our consultation form we collect the details you provide: name, phone number, optional email, your goal and preferred training time. When you become a member we keep the membership record needed to run your training: contact details, program, payments and attendance.'],
  ['How we use it', 'Your details are used only to schedule and deliver your training at FITX, contacting you about your consultation, managing your membership, and recording progress. We do not sell or share your personal information with third parties for marketing.'],
  ['Where it is stored', 'Consultation requests and membership records are stored in FITX’s management system with access limited to authorized staff.'],
  ['Photos & transformations', 'Member photos and transformations are published only with the member’s consent, and identities are protected (faces obscured) unless the member agrees otherwise.'],
  ['Your choices', 'You may ask us at any time to correct or delete your contact details, or to stop contacting you. Contact us at the studio or via ' + BRAND.email + '.'],
  ['Cookies', 'This website uses only the technical cookies needed for staff sign-in. We do not run advertising trackers.']
];

export default function Privacy() {
  return (
    <>
      <Seo title="Privacy Policy, FITX Sahiwal" description="How FITX Personal Fitness Training Studio, Sahiwal collects, uses and protects your personal information." path="/privacy-policy" />
      <PageHero label="Legal" title="Privacy Policy" copy={`Last updated: ${new Date().toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })}`} crumbs={[['Privacy Policy', null]]} />
      <section className="py-14 shell max-w-3xl space-y-8">
        {S.map(([h, p]) => (
          <div key={h}>
            <h2 className="font-display font-bold text-xl text-paper">{h}</h2>
            <p className="mt-2 text-sm text-silver leading-relaxed">{p}</p>
          </div>
        ))}
      </section>
    </>
  );
}
