import Attendance from '../models/Attendance.js';
import { ok, created, fail } from '../utils/response.js';

const today = () => new Date().toISOString().slice(0, 10);

export async function mark(req, res, next) {
  try {
    const { member } = req.body;
    const existing = await Attendance.findOne({ member, date: req.body.date || today() });
    if (existing) return fail(res, 409, 'Attendance already marked for this date');
    created(res, await Attendance.create({ member, date: req.body.date || today(), markedBy: req.user._id }));
  } catch (e) { next(e); }
}

export async function todayList(req, res, next) {
  try {
    const rows = await Attendance.find({ date: req.query.date || today() }).sort({ checkedInAt: -1 }).populate('member', 'name phone').lean();
    ok(res, rows);
  } catch (e) { next(e); }
}

export async function history(req, res, next) {
  try {
    const rows = await Attendance.find({ member: req.params.memberId }).sort({ date: -1 }).limit(90).lean();
    ok(res, rows);
  } catch (e) { next(e); }
}
