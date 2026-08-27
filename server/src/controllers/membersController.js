import Member from '../models/Member.js';
import { ok, created, fail } from '../utils/response.js';

export async function list(req, res, next) {
  try {
    const { q, status, trainer } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (trainer) filter.trainer = trainer;
    if (q) filter.$or = [{ name: new RegExp(q, 'i') }, { phone: new RegExp(q, 'i') }, { email: new RegExp(q, 'i') }];
    const members = await Member.find(filter).sort({ createdAt: -1 }).populate('trainer', 'name slug').populate('plan', 'name').limit(500).lean();
    ok(res, members);
  } catch (e) { next(e); }
}

export async function get(req, res, next) {
  try {
    const m = await Member.findById(req.params.id).populate('trainer').populate('plan');
    if (!m) return fail(res, 404, 'Member not found');
    ok(res, m);
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try { created(res, await Member.create(req.body)); } catch (e) { next(e); }
}

export async function update(req, res, next) {
  try {
    const m = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!m) return fail(res, 404, 'Member not found');
    ok(res, m);
  } catch (e) { next(e); }
}

export async function remove(req, res, next) {
  try {
    const m = await Member.findByIdAndUpdate(req.params.id, { status: 'cancelled' }, { new: true });
    if (!m) return fail(res, 404, 'Member not found');
    ok(res, m);
  } catch (e) { next(e); }
}
