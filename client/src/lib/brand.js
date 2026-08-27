/** Verified FITX business facts — researched from Google Maps listing, official
 *  Facebook/Instagram profiles and the studio's published fee pattern.
 *  Admin-editable equivalents live in Settings; these are the build-time defaults. */
export const BRAND = {
  name: 'FITX',
  fullName: 'FITX Personal Fitness Training Studio',
  mapsName: 'FITX Fitness Studio',
  tagline: 'The most serious & sophisticated personal fitness training in Sahiwal.',
  city: 'Sahiwal',
  address: 'Shadman Town, Faisalabad Road, Sahiwal 57000, Punjab, Pakistan',
  phoneDisplay: '0300 6900206',
  phoneIntl: '+923006900206',
  phone2Display: '0322 6900206',
  whatsapp: '923006900206',
  email: 'ranazohaib997@yahoo.com',
  hoursWeek: 'Saturday – Thursday: 11:00 AM – 10:00 PM',
  hoursFriday: 'Friday: Closed',
  femaleHours: ['10:30 AM – 1:00 PM', '3:00 PM – 6:00 PM'],
  mapUrl: 'https://maps.app.goo.gl/kXSr4rSQns6w5spi9',
  mapEmbed: 'https://www.google.com/maps?q=FITX+Fitness+Studio+Shadman+Town+Sahiwal&output=embed',
  lat: 30.6898631,
  lng: 73.0878971,
  facebook: 'https://www.facebook.com/fitxbootcamp/',
  instagram: 'https://www.instagram.com/fitxfitnessstudio/',
  rating: { value: 4.4, count: 97, source: 'Google Reviews' },
  siteUrl: 'https://fitx.pk'
};

export const wa = (message) =>
  `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;

export const tel = `tel:${BRAND.phoneIntl}`;
