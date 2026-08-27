import Seo from '../../lib/Seo.jsx';
import { PageHero } from '../../components/site/blocks.jsx';

const S = [
  ['Membership & programs', 'Membership begins on the joining date and runs for the purchased duration. Rates and program availability are as published at the studio and may be updated; confirmed pricing is stated on your receipt.'],
  ['Conduct & safety', 'Members train responsibly, follow coach instructions, and inform their coach of injuries or medical conditions before training. FITX staff may refuse training that is unsafe.'],
  ['Women’s hours', 'During dedicated female hours the studio floor is reserved for women members and female staff.'],
  ['Payments & receipts', 'Payments are recorded in the FITX system and a receipt is issued for each payment. Keep your receipt (printed or transaction ID) as proof of payment.'],
  ['Health disclaimer', 'Fitness information on this website is general guidance, not medical advice. Consult a physician before beginning any training program if you have a medical condition. Results vary with consistency and are not guaranteed.'],
  ['Website content', 'Content, photography and branding on this site belong to FITX Personal Fitness Training Studio. Member transformations are published with consent and privacy protection.']
];

export default function Terms() {
  return (
    <>
      <Seo title="Terms & Conditions — FITX Sahiwal" description="Membership terms, safety, payments and website terms for FITX Personal Fitness Training Studio, Sahiwal." path="/terms-and-conditions" />
      <PageHero label="Legal" title="Terms & Conditions" copy={`Last updated: ${new Date().toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })}`} crumbs={[['Terms & Conditions', null]]} />
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
