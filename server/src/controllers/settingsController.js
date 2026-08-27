import Setting from '../models/Setting.js';
import { ok } from '../utils/response.js';

export async function getPublic(req, res, next) {
  try {
    const s = await Setting.getSite();
    ok(res, s);
  } catch (e) { next(e); }
}

export async function update(req, res, next) {
  try {
    const s = await Setting.getSite();
    Object.assign(s, req.body);
    await s.save();
    ok(res, s);
  } catch (e) { next(e); }
}
