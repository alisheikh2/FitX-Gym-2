import Lead from '../models/Lead.js';
import Appointment from '../models/Appointment.js';
import { ok, created, fail } from '../utils/response.js';

export async function createPublic(req, res, next) {
  try {
    const lead = await Lead.create({ ...req.body, source: req.body.source || 'Website' });
    // If the visitor requested a consultation slot, create a scheduled appointment
    if (req.body.preferredDate && req.body.preferredTime) {
      await Appointment.create({
        lead: lead._id,
        personName: lead.name,
        date: req.body.preferredDate,
        time: req.body.preferredTime,
        notes: 'Consultation requested via website',
        status: 'Scheduled'
      });
    }
    created(res, lead);
  } catch (e) { next(e); }
}

export async function list(req, res, next) {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const leads = await Lead.find(filter).sort({ createdAt: -1 }).populate('assignedTo', 'name').limit(300).lean();
    ok(res, leads);
  } catch (e) { next(e); }
}

export async function update(req, res, next) {
  try {
    const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!lead) return fail(res, 404, 'Lead not found');
    ok(res, lead);
  } catch (e) { next(e); }
}
