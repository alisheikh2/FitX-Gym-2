import Appointment from '../models/Appointment.js';
import { ok, created, fail } from '../utils/response.js';

export async function list(req, res, next) {
  try {
    const filter = {};
    if (req.query.date) filter.date = req.query.date;
    if (req.query.status) filter.status = req.query.status;
    const rows = await Appointment.find(filter).sort({ date: -1, time: 1 }).populate('trainer', 'name slug').populate('member', 'name').limit(300).lean();
    ok(res, rows);
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try { created(res, await Appointment.create(req.body)); } catch (e) { next(e); }
}

export async function update(req, res, next) {
  try {
    const a = await Appointment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!a) return fail(res, 404, 'Appointment not found');
    ok(res, a);
  } catch (e) { next(e); }
}

export async function remove(req, res, next) {
  try {
    const a = await Appointment.findByIdAndDelete(req.params.id);
    if (!a) return fail(res, 404, 'Appointment not found');
    ok(res, { deleted: true });
  } catch (e) { next(e); }
}
