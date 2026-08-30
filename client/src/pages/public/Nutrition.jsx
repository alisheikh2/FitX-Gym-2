import Seo from '../../lib/Seo.jsx';
import Reveal from '../../components/ui/Reveal.jsx';
import { PageHero, CallNow } from '../../components/site/blocks.jsx';

export default function Nutrition() {
  return (
    <>
      <Seo
        title="Nutrition Guidance, Personalized Nutrition Plans | FITX Sahiwal"
        description="Personalized nutrition guidance at FITX Sahiwal: plans built around your goals, lifestyle, food preferences and the food available to you, practical, sustainable, and easy to follow."
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
              Nutrition is an essential part of achieving your fitness and wellness goals. Our nutrition plans are designed around you, not a one-size-fits-all approach.
            </p>
            <p className="mt-5 text-[15px] sm:text-base text-silver leading-[1.9]">
              We first understand your individual goals, lifestyle, daily routine, food preferences, and nutritional needs. Your plan is then created according to the foods that are easily available to you, making it practical, realistic, and easier to follow in your everyday life.
            </p>
            <p className="mt-5 text-[15px] sm:text-base text-silver leading-[1.9]">
              Whether your goal is weight management, fat loss, muscle building, improved energy, better fitness, or overall healthy living, your nutrition plan is tailored specifically to support your desired outcome.
            </p>
            <p className="mt-5 text-[15px] sm:text-base text-silver leading-[1.9]">
              We also consider your daily schedule and lifestyle so that your plan can fit naturally into your routine without making healthy eating feel complicated or restrictive. The focus is on creating sustainable eating habits that you can maintain consistently.
            </p>
            <p className="mt-5 text-[15px] sm:text-base text-silver leading-[1.9]">
              Your nutrition journey works alongside your training plan, helping you make better food choices, support your physical performance, and move steadily toward your goals.
            </p>
            <p className="mt-7 font-display font-bold text-navy text-lg sm:text-xl uppercase tracking-wide">Your lifestyle. Your food. Your goals. Your personalized nutrition plan.</p>
          </Reveal>
        </div>
      </section>

      <CallNow />
    </>
  );
}
