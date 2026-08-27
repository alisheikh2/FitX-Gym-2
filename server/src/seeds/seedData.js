import 'dotenv/config';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Trainer from '../models/Trainer.js';
import Program from '../models/Program.js';
import MembershipPlan from '../models/MembershipPlan.js';
import FAQ from '../models/FAQ.js';
import Testimonial from '../models/Testimonial.js';
import BlogPost from '../models/BlogPost.js';
import Setting from '../models/Setting.js';

export async function syncTestimonials() {
  const { default: Testimonial } = await import('../models/Testimonial.js');
  // Remove legacy duplicate transformation entries (old filenames) so journeys never repeat
  await Testimonial.deleteMany({ image: { $regex: 'fitx-transformation-' } });
  // ---- Testimonials: real reviews & client results only (idempotent upserts) ----
  const quotes = [
    { kind: 'quote', name: 'Muhammad F.', source: 'Google Review', text: 'No doubt, FITX is one of the best personal training studios in the city. The staff is not only expert in their field but they also guide you how to be your own expert when it comes to health and fitness. They are always there to motivate you and answer any question regarding fitness.', sortOrder: 0 },
    { kind: 'quote', name: 'Hassan F.', source: 'Google Review', text: 'FITX is one of the best gyms in Sahiwal for those who are struggling to lose weight. They have the best trainers, best environment — all trainers are very friendly and give you the best advice.', sortOrder: 1 },
    { kind: 'quote', name: 'Mehwish A.', source: 'Google Review', text: 'It’s been a great experience for me. Highly recommend, as Zohaib Bhai is very sincere with every trainee — even with people like me who left FITX due to a transfer from Sahiwal.', sortOrder: 2 },
    { kind: 'quote', name: 'Sarwat M.', source: 'Google Review', text: 'One of the best gyms in the city. Trainers are very cooperative and calm. Safe and secure for ladies.', sortOrder: 3 },
    { kind: 'quote', name: 'A R J.', source: 'Google Review', text: 'The gym is spacious, clean and well-equipped, with a wide variety of machines and free weights suitable for all fitness levels. The trainers are knowledgeable and provide personalized workout plans that cater to individual goals.', sortOrder: 4 }
  ];
  const pad = (n) => String(n).padStart(2, '0');
  const featured = { 1: { name: 'FITX member', result: 'Fat-loss transformation, shared with the client’s privacy protected' }, 23: { name: 'FITX member', result: 'Fat-loss transformation, shared with the client’s privacy protected' }, 24: { name: 'FITX member', result: 'Training transformation, shared with the client’s privacy protected' } };
  const gallery = [];
  for (let i = 1; i <= 25; i++) {
    const img = `/images/fitx/results/fitx-testimonial-${pad(i)}.webp`;
    gallery.push({
      kind: 'transformation',
      name: featured[i]?.name || 'FITX client',
      source: 'Shared by FITX',
      image: img,
      imageAlt: `Client testimonial ${i} shared by FITX Personal Fitness Training Studio Sahiwal`,
      result: featured[i]?.result || 'Client testimonial shared by FITX',
      sortOrder: 5 + i
    });
  }
  gallery.push({ kind: 'transformation', name: 'Syed Zeeshan Hassan Bukhari', source: 'FITX Client of the Month', text: '“Fitness is not a destination, it’s a journey.”', image: '/images/fitx/results/fitx-client-of-the-month.webp', imageAlt: 'FITX client of the month Syed Zeeshan Hassan Bukhari', result: 'FITX Client of the Month', sortOrder: 40 });
  gallery.push({ kind: 'transformation', name: 'FITX client', source: 'Shared by FITX', image: '/images/fitx/results/fitx-testimonial-26.webp', imageAlt: 'Client testimonial shared by FITX Personal Fitness Training Studio Sahiwal', result: 'Client testimonial shared by FITX', sortOrder: 60 });
  for (const t of [...quotes, ...gallery]) {
    const key = t.image ? { image: t.image } : { name: t.name, source: t.source };
    await Testimonial.updateOne(key, { $set: t }, { upsert: true });
  }
}

export async function runSeed() {
  // ---- Users (staff accounts) ----
  const users = [
    { name: 'Zohaib Ali', email: 'admin@fitx.pk', role: 'admin', password: 'Admin@123' },
    { name: 'FITX Front Desk', email: 'staff@fitx.pk', role: 'staff', password: 'Staff@123' },
    { name: 'Trainer Muazam', email: 'trainer@fitx.pk', role: 'trainer', password: 'Trainer@123' }
  ];
  for (const u of users) {
    const exists = await User.findOne({ email: u.email });
    if (!exists) {
      await User.create({ name: u.name, email: u.email, role: u.role, passwordHash: await bcrypt.hash(u.password, 10) });
      console.log('[seed] user', u.email);
    }
  }

  await syncTestimonials();
  console.log('[seed] testimonials synced');

  if ((await Trainer.countDocuments()) > 0) {
    console.log('[seed] content already present — skipping content seed');
    await Setting.getSite();

    return;
  }

  // ---- Trainers (verified identities & experience only) ----
  await Trainer.create([
    {
      name: 'Zohaib Ali',
      slug: 'zohaib-ali',
      role: 'Founder & Head Coach',
      specialization: 'Personal Training & Program Design',
      photo: '/images/fitx/trainers/fitx-trainer-zohaib-ali.webp',
      photoAlt: 'Zohaib Ali, founder and head coach of FITX Personal Fitness Training Studio Sahiwal, training in the studio',
      shortBio: 'Founder of FITX and head coach. Zohaib built the studio around one idea: every member trains with a plan, a coach and a record of progress — not guesswork.',
      bio: 'Zohaib Ali founded FITX Personal Fitness Training Studio in Shadman Town, Sahiwal to change how the city trains. Instead of a crowded hall where members figure things out alone, FITX runs on structured personal training: an initial consultation, a program built around your goal, and a coach who watches your technique session after session. Zohaib was invited as a guest speaker at the University of Sahiwal during the HEC-funded NRPU project on youth-led entrepreneurship (December 2025), where he received a token of appreciation for his contribution. He still takes personal clients and oversees every program written at FITX.',
      philosophy: 'A program only works if someone is accountable to it. My job is to make sure you never train without a reason, and never leave a session without knowing what it was for.',
      focus: ['One-to-one personal training', 'Program design & periodisation', 'Technique correction', 'Member accountability & progress tracking'],
      suitableFor: ['Beginners who want a correct start', 'Busy professionals who need structured, efficient sessions', 'Anyone returning to training after a long break'],
      programs: ['personal-training', 'strength-conditioning'],
      sortOrder: 0
    },
    {
      name: 'Arslan Ahmad',
      slug: 'arslan-ahmad',
      role: 'Weight Loss & Fat Loss Expert',
      experienceYears: 7,
      specialization: 'Fat Loss, Weight Management & Habit Coaching',
      photo: '/images/fitx/trainers/fitx-trainer-arslan-ahmad.webp',
      photoAlt: 'Arslan Ahmad, weight loss and fat loss expert at FITX Sahiwal, standing on the training floor',
      shortBio: 'Seven years of coaching fat-loss clients in Sahiwal. Arslan combines structured training with realistic eating guidance that fits Pakistani homes and routines.',
      bio: 'Arslan Ahmad has spent seven years coaching people through fat loss — students, professionals, parents and people whose doctors told them it was time to change. His approach is deliberately unglamorous: a training plan you can repeat, eating guidance that works with the food your household actually cooks, and weekly check-ins that catch problems before they become dropouts. Most of FITX’s fat-loss clients start with Arslan’s consultation, where he maps your starting point, your schedule and a realistic timeline before you ever pick up a weight.',
      philosophy: 'Fat loss fails when the plan is perfect on paper and impossible at home. I build plans around your real week — then we measure, and we adjust.',
      focus: ['Sustainable fat loss programs', 'Nutrition guidance for Pakistani diets', 'Weekly progress tracking', 'Training for complete beginners'],
      suitableFor: ['People whose main goal is losing fat, not just “exercise”', 'First-time gym members', 'Anyone who has lost weight before and regained it'],
      programs: ['weight-loss-fat-loss', 'personal-training'],
      sortOrder: 1
    },
    {
      name: 'Trainer Muazam',
      slug: 'muazam',
      role: 'Strength & Conditioning Coach',
      specialization: 'Strength, Conditioning & Athletic Performance',
      photo: '/images/fitx/trainers/fitx-trainer-muazam.webp',
      photoAlt: 'Trainer Muazam, strength and conditioning coach at FITX Sahiwal, arms crossed on the training floor',
      shortBio: 'FITX’s strength and conditioning coach. Muazam teaches the barbell lifts properly — squat, press and hinge first, load second — and builds conditioning that carries into sport and daily life.',
      bio: 'Muazam leads strength and conditioning at FITX. His sessions are built on the fundamentals done well: squat, hinge, press, pull and carry, progressed carefully so members add load without borrowing from their technique. He also runs the conditioning side of the studio — sleds, medicine ball work, bikes and intervals — for members who play cricket or other sports, and for those who simply want to feel capable. If your form is breaking, Muazam will see it, stop it and fix it. That is the point of coaching.',
      philosophy: 'Strength is a skill before it is a number. Earn the load with clean reps, and the number takes care of itself.',
      focus: ['Barbell & dumbbell strength fundamentals', 'Conditioning & work capacity', 'Sport preparation (cricket, football, martial arts)', 'Mobility and movement quality'],
      suitableFor: ['Members who want to get genuinely stronger', 'Young athletes preparing for sport', 'Anyone stuck at the same weights for months'],
      programs: ['strength-conditioning', 'personal-training'],
      sortOrder: 2
    },
    {
      name: 'Iqra Zahid',
      slug: 'iqra-zahid',
      role: 'Women Fat Loss & Performance Coach',
      experienceYears: 7,
      specialization: 'Women’s Fat Loss, Strength & Performance',
      photo: '/images/fitx/trainers/fitx-trainer-iqra-zahid.webp',
      photoAlt: 'Iqra Zahid, women’s fat loss and performance coach at FITX Sahiwal, coaching on the cable station',
      shortBio: 'Seven years coaching women in Sahiwal. Iqra leads FITX’s women’s training during dedicated female hours, focusing on fat loss, strength and confidence under the bar.',
      bio: 'Iqra Zahid coaches the women who train at FITX, during the studio’s dedicated female hours (10:30 AM – 1:00 PM and 3:00 PM – 6:00 PM). Over seven years she has coached students, brides-to-be, new mothers and women in their fifties — most of them starting from zero. Her programming treats women’s training seriously: progressive strength work, structured fat-loss phases and honest nutrition guidance, in an environment members describe as safe and respectful. Reviews from women at FITX consistently mention feeling secure and properly guided — that is the standard Iqra holds.',
      philosophy: 'Women don’t need a lighter version of training. They need a proper program, a coach who takes them seriously, and a space where they can focus.',
      focus: ['Women’s fat loss programs', 'Strength training for women', 'Postpartum-appropriate programming (with clearance)', 'Confidence with technique and equipment'],
      suitableFor: ['Women starting fitness for the first time', 'Women who want structured fat loss with a female coach', 'Women who tried home workouts and plateaued'],
      programs: ['womens-performance', 'weight-loss-fat-loss'],
      sortOrder: 3
    }
  ]);

  // ---- Programs ----
  await Program.create([
    {
      name: 'One-to-One Personal Training',
      slug: 'personal-training',
      tagline: 'A coach, a plan and a record of your progress — every session.',
      description: 'Personal training at FITX starts with a consultation, not a sales pitch. We assess your starting point, agree a realistic goal and timeline, and build your program around them. Every session is coached one-to-one: your technique is watched, your loads are progressed and your progress is recorded so you always know where you stand.',
      bullets: ['Initial consultation and goal mapping before you start', 'Individual program written for your goal and schedule', 'One-to-one coaching with continuous technique correction', 'Progress tracked session to session, reviewed regularly'],
      audience: 'Members who want the fastest, safest route to their goal with full accountability.',
      trainerSlug: 'zohaib-ali',
      image: '/images/fitx/trainers/fitx-founder-training-session.webp',
      icon: 'target',
      sortOrder: 0
    },
    {
      name: 'Weight Loss & Fat Loss',
      slug: 'weight-loss-fat-loss',
      tagline: 'Structured fat loss that survives contact with real life.',
      description: 'A fat-loss program built on training you can repeat and eating guidance that fits Pakistani households — roti, salan, daal and all. You train on a structured plan, get realistic nutrition direction, and check progress weekly so small slips never become silent months.',
      bullets: ['Training program matched to your starting fitness', 'Practical nutrition guidance, not punishment diets', 'Weekly measurement and check-in', 'Coached by FITX’s fat-loss specialists'],
      audience: 'Anyone whose primary goal is losing fat and keeping it off.',
      trainerSlug: 'arslan-ahmad',
      image: '/images/fitx/trainers/fitx-trainer-arslan-ahmad.webp',
      icon: 'flame',
      sortOrder: 1
    },
    {
      name: 'Strength & Conditioning',
      slug: 'strength-conditioning',
      tagline: 'Learn the lifts properly. Add load honestly. Get capable.',
      description: 'Strength work built on the fundamentals — squat, hinge, press, pull and carry — coached with an eye on your form before your load. Conditioning work with sleds, bikes, medicine balls and intervals builds the engine to go with the strength, for sport or for life.',
      bullets: ['Barbell and dumbbell technique taught from the ground up', 'Progressive loading with form as the gatekeeper', 'Conditioning blocks for sport and work capacity', 'Ideal for cricket and other sport preparation'],
      audience: 'Members who want measurable strength, and athletes preparing for sport.',
      trainerSlug: 'muazam',
      image: '/images/fitx/fitx-conditioning-medicine-ball.webp',
      icon: 'barbell',
      sortOrder: 2
    },
    {
      name: 'Women’s Fat Loss & Performance',
      slug: 'womens-performance',
      tagline: 'Serious training for women, in dedicated hours, with a female coach.',
      description: 'Women train at FITX during dedicated female hours with Iqra Zahid, a coach with seven years of experience coaching women in Sahiwal. Programs cover fat loss, strength and performance — progressive, properly coached, and delivered in an environment members describe as safe, secure and respectful.',
      bullets: ['Dedicated female hours: 10:30 AM – 1:00 PM & 3:00 PM – 6:00 PM', 'Female coach with 7 years of experience', 'Strength and fat-loss programming, not token workouts', 'A private, respectful training environment'],
      audience: 'Women who want real coaching in a space built for their focus.',
      trainerSlug: 'iqra-zahid',
      image: '/images/fitx/trainers/fitx-trainer-iqra-zahid.webp',
      icon: 'shield',
      sortOrder: 3
    },
    {
      name: 'Group Sessions',
      slug: 'group-sessions',
      tagline: 'Train in a small coached group on the FITX floor.',
      description: 'Group sessions give you structured, coach-led training on the studio floor at a lighter price point than one-to-one coaching. You still train on a plan and under a coach’s eye — with the energy of training alongside other members.',
      bullets: ['Coach-led sessions on the studio floor', 'Structured programming, not random workouts', 'A more accessible price point', 'Community of members training at the same time'],
      audience: 'Members who want structure and coaching with group energy.',
      trainerSlug: 'zohaib-ali',
      image: '/images/fitx/fitx-coaching-education-session.webp',
      icon: 'users',
      sortOrder: 4
    }
  ]);

  // ---- Membership plans (from FITX's published fee pattern) ----
  await MembershipPlan.create([
    { name: 'Group Session — 1 Month', durationMonths: 1, price: 8500, description: 'Coach-led group training on the FITX floor, one month.', includedServices: ['Group training sessions', 'Floor access during session times', 'Coach supervision'] },
    { name: 'Group Session — 3 Months', durationMonths: 3, price: 23000, description: 'Three months of group training (10% off).', includedServices: ['Group training sessions', 'Floor access during session times', 'Coach supervision', '10% saving vs monthly'] },
    { name: 'One-to-One Session — 1 Month', durationMonths: 1, price: 16000, description: 'Personal training, one month, coached one-to-one.', includedServices: ['One-to-one coached sessions', 'Individual program', 'Progress tracking', 'Nutrition direction'] },
    { name: 'One-to-One Session — 3 Months', durationMonths: 3, price: 43200, description: 'Three months of one-to-one personal training (10% off).', includedServices: ['One-to-one coached sessions', 'Individual program', 'Progress tracking', 'Nutrition direction', '10% saving vs monthly'] }
  ]);

  // ---- FAQs (answers only from verified facts) ----
  await FAQ.create([
    { category: 'General', question: 'What does FITX offer?', answer: 'FITX is a personal fitness training studio in Shadman Town, Sahiwal. We run one-to-one personal training, group sessions, fat-loss programs, strength & conditioning coaching and dedicated women’s training hours with a female coach.', sortOrder: 0 },
    { category: 'General', question: 'Where is FITX located?', answer: 'Shadman Town, Faisalabad Road, Sahiwal 57000, Punjab. The entrance and parking are wheelchair accessible. Use the “Get Directions” button on our contact page for the exact map location.', sortOrder: 1 },
    { category: 'General', question: 'What are the opening hours?', answer: 'The studio is open Saturday to Thursday, 11:00 AM to 10:00 PM, and closed on Friday. Dedicated female hours are 10:30 AM – 1:00 PM and 3:00 PM – 6:00 PM.', sortOrder: 2 },
    { category: 'General', question: 'How do I book a consultation?', answer: 'Use the “Book a Consultation” form on this website, call or WhatsApp us on 0300 6900206, or walk in during opening hours. The consultation is where we understand your goal before recommending anything.', sortOrder: 3 },
    { category: 'Training', question: 'Is FITX suitable for complete beginners?', answer: 'Yes — most members start with little or no gym experience. Your first sessions focus on technique and a plan you can actually follow, and a coach supervises your training.', sortOrder: 4 },
    { category: 'Training', question: 'How does personal training work at FITX?', answer: 'It starts with a consultation and assessment. You then train on an individual program, coached one-to-one, with your technique corrected and your progress recorded session to session.', sortOrder: 5 },
    { category: 'Training', question: 'What should I bring to my first session?', answer: 'Comfortable training clothes, closed shoes, a water bottle and a towel. If you have any medical conditions or injuries, tell your coach before you start.', sortOrder: 6 },
    { category: 'Weight Loss', question: 'How does the fat-loss program work?', answer: 'You train on a structured program with a fat-loss coach, follow practical eating guidance that fits Pakistani home cooking, and check progress weekly. No crash diets, no punishment plans.', sortOrder: 7 },
    { category: 'Weight Loss', question: 'Is nutrition guidance included?', answer: 'Yes. Fat-loss and personal training members receive practical nutrition direction — portion and habit guidance built around the food you already eat at home.', sortOrder: 8 },
    { category: 'Women’s Fitness', question: 'What training options are available for women?', answer: 'Women train during dedicated female hours (10:30 AM – 1:00 PM and 3:00 PM – 6:00 PM) with Iqra Zahid, a women’s fat loss & performance coach with seven years of experience. Programs cover fat loss, strength and performance.', sortOrder: 9 },
    { category: 'Women’s Fitness', question: 'Is the environment safe and comfortable for women?', answer: 'Women members consistently describe FITX as safe, secure and respectful. Dedicated female hours and a female coach mean you can train with full focus.', sortOrder: 10 },
    { category: 'Membership', question: 'What does membership cost?', answer: 'Current published rates: Group Session Rs 8,500/month or Rs 23,000 for 3 months; One-to-One Session Rs 16,000/month or Rs 43,200 for 3 months (10% off). Contact the studio to confirm current availability and any seasonal offers.', sortOrder: 11 },
    { category: 'Location', question: 'Can I visit before joining?', answer: 'Yes. Book a free consultation or walk in during opening hours — see the studio, meet a coach and ask questions before you decide anything.', sortOrder: 12 }
  ]);

  // ---- Blog (locally relevant, genuinely useful) ----
  await BlogPost.create([
    {
      title: 'How to Choose a Personal Trainer in Sahiwal',
      slug: 'how-to-choose-a-personal-trainer-in-sahiwal',
      excerpt: 'Sahiwal has plenty of gyms and plenty of people calling themselves trainers. Here is how to tell the difference before you pay for a single session.',
      cover: '/images/fitx/fitx-coaching-education-session.webp',
      tags: ['personal training', 'sahiwal'],
      content: [
        { type: 'p', text: 'Search “personal trainer in Sahiwal” and you will find dozens of gyms and hundreds of claims. What you will not find easily is a simple way to judge whether a trainer is actually worth your money. After years of meeting members who arrived at FITX burned by bad experiences, these are the questions we tell people to ask — even if they never train with us.' },
        { type: 'h2', text: '1. Do they ask about you before talking about themselves?' },
        { type: 'p', text: 'A good trainer starts with a consultation: your goal, your schedule, your injuries, your experience, your eating routine. If someone quotes you a price and a workout within two minutes of meeting you, they are selling a product, not coaching a person.' },
        { type: 'h2', text: '2. Do they watch you train, or just sit nearby?' },
        { type: 'p', text: 'The core value of personal training is feedback. Your trainer should be correcting your technique, adjusting your loads and noticing when something is off. If the “trainer” spends your paid session on his phone, you are paying for a spectator.' },
        { type: 'h2', text: '3. Can they explain why you are doing each exercise?' },
        { type: 'p', text: 'You do not need a lecture every session, but when you ask “why this exercise?”, the answer should make sense. Coaches who understand programming can explain it simply. Coaches who copy workouts from Instagram cannot.' },
        { type: 'h2', text: '4. Do they track anything?' },
        { type: 'p', text: 'Progress you cannot see is progress you cannot trust. Weights used, measurements, body weight, photos, attendance — something should be recorded. At FITX, progress tracking is part of the program, because accountability is the whole point of hiring a coach.' },
        { type: 'h2', text: '5. Do their clients stay?' },
        { type: 'p', text: 'Ask to see real reviews, real results and real clients. Long-term members are the strongest signal a trainer can have. Anyone can motivate you for two weeks; keeping members progressing for months is the craft.' },
        { type: 'p', text: 'If you are comparing options in Sahiwal, visit two or three studios before deciding. See the environment, meet the coach, ask these questions. And if you visit FITX, the consultation is free — we would rather earn your training than talk you into it.' }
      ]
    },
    {
      title: 'Weight Loss vs Fat Loss: Why the Scale Lies to You',
      slug: 'weight-loss-vs-fat-loss',
      excerpt: 'Losing weight and losing fat are not the same thing. Understanding the difference changes how you train, eat and measure progress.',
      cover: '/images/fitx/trainers/fitx-trainer-arslan-ahmad.webp',
      tags: ['fat loss', 'nutrition'],
      content: [
        { type: 'p', text: 'Most people who walk into a gym say they want to “lose weight.” What they actually mean is lose fat. The difference matters, because the scale alone cannot tell them apart — and chasing the scale is one of the fastest ways to quit.' },
        { type: 'h2', text: 'What the scale actually measures' },
        { type: 'p', text: 'Your body weight includes fat, muscle, water, glycogen and the food in your stomach. Skip meals for a day and the scale drops — mostly water and glycogen, not fat. Start training and eat properly and the scale may not move for weeks, even while fat is leaving and muscle is arriving.' },
        { type: 'h2', text: 'Why fat loss is the real goal' },
        { type: 'p', text: 'Fat loss changes how your clothes fit, how your energy feels and how your health markers move. Pure “weight loss” can simply mean losing muscle and water, which leaves you lighter but softer, weaker and more likely to regain everything.' },
        { type: 'h2', text: 'How to actually lose fat' },
        { type: 'ul', items: ['Eat in a modest calorie deficit — enough to lose fat, not so much that you lose muscle and motivation', 'Train with resistance 3–4 times a week so your body keeps muscle while losing fat', 'Keep protein adequate at every meal — daal, chicken, eggs, yoghurt, milk', 'Walk more; daily steps are the most underrated fat-loss tool in Pakistan', 'Measure weekly, not daily: weight trend, waist measurement, photos and how clothes fit'] },
        { type: 'p', text: 'At FITX, fat-loss members are measured weekly and coached on both training and eating. That combination — not a crash diet, not a detox tea — is what produces the before/after results we share. If your current plan has no measurements and no coaching, you are not on a plan; you are on a hope.' }
      ]
    },
    {
      title: 'How Beginners Should Start Strength Training',
      slug: 'how-beginners-should-start-strength-training',
      excerpt: 'Your first months in the gym decide everything. A practical beginner’s approach to strength training, from FITX’s strength & conditioning coach.',
      cover: '/images/fitx/facility/fitx-strength-squat-rack.webp',
      tags: ['strength', 'beginners'],
      content: [
        { type: 'p', text: 'Every strong member at FITX started with an empty bar or a light dumbbell. The beginners who do well are not the strongest ones — they are the ones who follow a simple structure instead of copying advanced members.' },
        { type: 'h2', text: 'Learn five movements first' },
        { type: 'p', text: 'Almost all strength training reduces to five movement patterns: squat, hinge (like picking something heavy off the floor), push, pull and carry. Master these with light weight and good technique and every machine in the gym becomes easy to understand.' },
        { type: 'h2', text: 'Technique before load, always' },
        { type: 'p', text: 'Adding weight to a bad movement pattern is how beginners get injured and quit. A coach watching your form is the fastest shortcut in strength training — it is exactly what one-to-one coaching at FITX is for.' },
        { type: 'h2', text: 'A simple beginner week' },
        { type: 'ul', items: ['Day 1: full-body strength — squat pattern, push, pull', 'Day 2: rest or a 30–40 minute walk', 'Day 3: full-body strength — hinge pattern, push, pull', 'Day 4: rest or walk', 'Day 5: full-body strength + light conditioning (bike, sled, intervals)', 'Days 6–7: rest, family time, walking'] },
        { type: 'p', text: 'Three sessions a week, the same core exercises, a little more weight or one more rep when the last session felt controlled. That is not exciting. It is also exactly how people get strong. Write every session down — or train somewhere that does.' },
        { type: 'p', text: 'If you are in Sahiwal and want your first months done properly, book a consultation at FITX. Learning the lifts correctly once saves you years of correcting them later.' }
      ]
    },
    {
      title: 'Nutrition Basics for Fat Loss — Eating Like a Pakistani, Not Like a Diet Ad',
      slug: 'nutrition-basics-for-fat-loss-pakistan',
      excerpt: 'You do not need imported superfoods to lose fat in Pakistan. You need portions, protein and a plan that survives daal chawal at home.',
      cover: '/images/fitx/fitx-coaching-education-session.webp',
      tags: ['nutrition', 'fat loss'],
      content: [
        { type: 'p', text: 'Most nutrition advice online assumes a Western kitchen: salads, salmon, protein shakes. A Pakistani household cooks roti, rice, daal, sabzi, chicken and milk — and that is completely fine for fat loss, if you understand portions and structure.' },
        { type: 'h2', text: 'The plate, not the diet' },
        { type: 'p', text: 'Instead of banning foods, rebuild the plate: half vegetables or salad, a quarter protein (daal, chicken, eggs, keema, fish), a quarter roti or rice. Most home meals are the reverse — a mountain of roti, a spoon of salan. Flip the ratio and you have changed everything without changing your cuisine.' },
        { type: 'h2', text: 'Protein at every meal' },
        { type: 'ul', items: ['Eggs, milk, dahi and daal are affordable, everyday proteins', 'Protein keeps you full and protects muscle while you lose fat', 'Aim for a palm-sized portion of protein at each main meal'] },
        { type: 'h2', text: 'The real saboteurs' },
        { type: 'ul', items: ['Sweet chai, multiple cups a day, with sugar', 'Cold drinks and juices — liquid calories that never fill you', 'Fried snacks “just one” that are never one', 'Restaurant dinners that stretch for hours'] },
        { type: 'p', text: 'None of these must disappear forever. They just need a frequency. A member who fixes chai sugar and cold drinks often loses their first two or three kilograms without touching their meals.' },
        { type: 'h2', text: 'Consistency beats perfection' },
        { type: 'p', text: 'One wedding, one eid, one bad weekend does not ruin fat loss — three quiet months of untracked eating does. That is why FITX programs include weekly check-ins: we catch the drift early and adjust, instead of letting you discover it in month four.' },
        { type: 'p', text: 'Nutrition guidance is included with fat-loss and personal training programs at FITX. Bring your real routine to the consultation — we will build from there, not from a foreign meal plan.' }
      ]
    },
    {
      title: 'The 6 Gym Mistakes That Keep You at the Same Weight',
      slug: 'common-gym-mistakes',
      excerpt: 'Training hard but changing nothing? These are the mistakes we see most often in new members — and the fixes that actually work.',
      cover: '/images/fitx/fitx-conditioning-medicine-ball.webp',
      tags: ['training', 'beginners'],
      content: [
        { type: 'p', text: 'Most people who quit the gym are not lazy. They are working hard at the wrong things. These six mistakes cover most of what we see when new members join FITX after a year of no progress elsewhere.' },
        { type: 'h2', text: '1. No plan, no record' },
        { type: 'p', text: 'Walking in and “seeing what’s free” is exercise, not training. Without a plan and a log, you cannot progress — you can only repeat.' },
        { type: 'h2', text: '2. Training to exhaustion, not to progression' },
        { type: 'p', text: 'Sweat and soreness are not the goal; they are side effects. The goal is doing slightly more than last time — a little more weight, reps or quality — consistently.' },
        { type: 'h2', text: '3. Ignoring technique' },
        { type: 'p', text: 'Half-reps and borrowed form steal the benefit from the target muscle and load your joints instead. A coach’s eye fixes this in weeks; alone it can take years.' },
        { type: 'h2', text: '4. Eating back the workout' },
        { type: 'p', text: 'An hour in the gym burns a few hundred calories. One “reward” meal can return all of it. Training earns your diet some flexibility — it does not cancel it out.' },
        { type: 'h2', text: '5. Program-hopping' },
        { type: 'p', text: 'A new workout every week from YouTube means your body never adapts to anything. Boring consistency beats exciting variety for results.' },
        { type: 'h2', text: '6. All cardio, no weights (or all weights, no plan for life)' },
        { type: 'p', text: 'Cardio-only training loses muscle along with fat and leaves you hungry and tired. Resistance training protects muscle, shapes the body and keeps the weight off.' },
        { type: 'p', text: 'The fix for all six is the same: a written program, a coach who watches you, and weekly measurement. That is the structure FITX was built around — because motivation is common and structure is rare.' }
      ]
    },
    {
      title: 'Women’s Training at FITX: Hours, Coaching and What to Expect',
      slug: 'women-training-at-fitx-sahiwal',
      excerpt: 'Dedicated female hours, a female coach with seven years of experience, and programs built for strength and fat loss — how women train at FITX.',
      cover: '/images/fitx/trainers/fitx-trainer-iqra-zahid.webp',
      tags: ['women', 'sahiwal'],
      content: [
        { type: 'p', text: 'Most women in Sahiwal who want to train have been blocked by one question: where can I train properly, and comfortably? This page answers exactly how women’s training works at FITX, so you know what to expect before you walk in.' },
        { type: 'h2', text: 'Dedicated female hours' },
        { type: 'p', text: 'Women train at FITX during dedicated hours: 10:30 AM – 1:00 PM and 3:00 PM – 6:00 PM. During these hours the floor belongs to women members, so you can train with complete focus and privacy.' },
        { type: 'h2', text: 'A female coach who takes training seriously' },
        { type: 'p', text: 'Iqra Zahid leads women’s training at FITX with seven years of coaching experience. Her programs are not stretched-out aerobics — they are structured strength and fat-loss training: progressive loads, proper technique coaching and honest nutrition guidance.' },
        { type: 'h2', text: 'What your first month looks like' },
        { type: 'ul', items: ['A consultation to understand your goal, schedule and any health considerations', 'Technique coaching on the core movements, from zero if needed', 'A structured program matched to your starting point', 'Weekly check-ins and measurements so progress is visible'] },
        { type: 'h2', text: 'What members say' },
        { type: 'p', text: 'Women members describe FITX in reviews as safe, secure and respectful, with cooperative and calm trainers. That is the standard we protect — and the reason many of our women members started as beginners and now train with real confidence under the bar.' },
        { type: 'p', text: 'If you have been waiting for the right place to start, this is it. Book a consultation, or come during female hours and see the studio yourself before deciding anything.' }
      ]
    }
  ]);

  await Setting.getSite();
  console.log('[seed] content seeded');
  
}

