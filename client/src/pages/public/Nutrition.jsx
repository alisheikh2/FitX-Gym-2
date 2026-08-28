import { Link } from 'react-router-dom';
import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, CallNow } from '../../components/site/blocks.jsx';

export default function Nutrition() {
  return (
    <>
      <Seo
        title="Nutrition Guidance, Practical Fat Loss Nutrition | FITX Sahiwal"
        description="FITX Sahiwal nutrition guidance: real, natural, wholesome food plans tailored to your goals, taste and program, built around Pakistani homes."
        path="/nutrition"
        image="/images/fitx/nutrition-meal.jpg"
      />
      <PageHero title="Nutrition Guidance" crumbs={[['What We Do', '/training'], ['Nutrition Guidance', null]]} />

      {/* reference: collage left + paragraphs right */}
      <section className="py-16 sm:py-24">
        <div className="shell grid md:grid-cols-[420px_1fr] gap-10 lg:gap-16 items-start max-w-5xl mx-auto">
          <Reveal>
            <div className="grid grid-cols-2 gap-1">
              <img src="/images/fitx/nutrition-berries.jpg" alt="Fresh berries bowl" width={1408} height={768} loading="lazy" decoding="async" className="col-span-2 w-full aspect-[2/1] object-cover" />
              <img src="/images/fitx/nutrition-salad.jpg" alt="Fresh tomato mozzarella salad" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-square object-cover" />
              <img src="/images/fitx/nutrition-meal.jpg" alt="Healthy Pakistani meal, grilled chicken, daal, salad, roti" width={1408} height={768} loading="lazy" decoding="async" className="w-full aspect-square object-cover" />
            </div>
          </Reveal>
          <Reveal delay={60}>
            <p className="text-[15px] sm:text-base text-silver leading-[1.9]">
              A rigorous physical program, such as ours, relies heavily on proper nutrition. We aggressively advocate eating real, natural, wholesome foods to fuel effective transformations. In our commitment to you over all well-being, we tailor the nutrition guidelines according to your goals, taste palate, and current physical program.
            </p>
            <p className="mt-5 text-[15px] sm:text-base text-silver leading-[1.9]">
              Our coaches develop customized and comprehensive eating plans that will not leave you feeling starved, built around the food your household actually cooks: roti, salan, daal, chawal, with portions and habits that work.
            </p>
            <p className="mt-5 text-[15px] sm:text-base text-silver leading-[1.9]">
              Nutrition direction is included with fat-loss and personal training programs, weekly check-ins keep the plan honest. Read our guide: <Link to="/blog/nutrition-basics-for-fat-loss-pakistan" className="link-underline text-brand">Nutrition basics for fat loss</Link>.
            </p>
          </Reveal>
        </div>
      </section>

      <CallNow />
    </>
  );
}
