import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema(
  {
    key: { type: String, unique: true, default: 'site' },
    brand: {
      name: { type: String, default: 'FITX Personal Fitness Training Studio' },
      tagline: { type: String, default: 'The most serious & sophisticated personal fitness training in Sahiwal.' },
      heroHeadline: { type: String, default: 'Training that is built around you.' },
      heroSub: {
        type: String,
        default: 'FITX is a personal training studio in Shadman Town, Sahiwal — one-to-one coaching, structured fat-loss and strength programs, and dedicated women’s hours, guided by coaches who track your progress session after session.'
      }
    },
    contact: {
      phone: { type: String, default: '+92 300 6900206' },
      phone2: { type: String, default: '+92 322 6900206' },
      whatsapp: { type: String, default: '923006900206' },
      email: { type: String, default: 'ranazohaib997@yahoo.com' },
      address: { type: String, default: 'Shadman Town, Faisalabad Road, Sahiwal 57000, Punjab, Pakistan' },
      mapUrl: { type: String, default: 'https://maps.app.goo.gl/kXSr4rSQns6w5spi9' },
      lat: { type: Number, default: 30.6898631 },
      lng: { type: Number, default: 73.0878971 }
    },
    hours: {
      weekdays: { type: String, default: 'Saturday – Thursday: 11:00 AM – 10:00 PM' },
      friday: { type: String, default: 'Friday: Closed' },
      female: [{ type: String }],
      note: String
    },
    socials: {
      facebook: { type: String, default: 'https://www.facebook.com/fitxbootcamp/' },
      instagram: { type: String, default: 'https://www.instagram.com/fitxfitnessstudio/' }
    },
    rating: { value: Number, count: Number, source: { type: String, default: 'Google Reviews' } }
  },
  { timestamps: true }
);

settingSchema.statics.getSite = async function () {
  let s = await this.findOne({ key: 'site' });
  if (!s) s = await this.create({ key: 'site', hours: { female: ['10:30 AM – 1:00 PM', '3:00 PM – 6:00 PM'] } });
  return s;
};

export default mongoose.model('Setting', settingSchema);
