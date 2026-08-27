import Payment from '../models/Payment.js';
import Member from '../models/Member.js';
import Setting from '../models/Setting.js';
import { ok, created, fail } from '../utils/response.js';

export async function list(req, res, next) {
  try {
    const payments = await Payment.find().sort({ date: -1 }).limit(300).populate('member', 'name phone').populate('plan', 'name').populate('recordedBy', 'name').lean();
    ok(res, payments);
  } catch (e) { next(e); }
}

export async function create(req, res, next) {
  try {
    const { member: memberId, plan: planId, extendMembership } = req.body;
    const payment = await Payment.create({ ...req.body, recordedBy: req.user._id });
    // Optionally extend the member's expiry when a plan payment is recorded
    if (planId && extendMembership) {
      const member = await Member.findById(memberId);
      const plan = payment.plan;
      if (member) {
        const base = member.expiryDate && member.expiryDate > new Date() ? member.expiryDate : new Date();
        const months = plan?.durationMonths ?? planId?.durationMonths ?? 1;
        member.expiryDate = new Date(new Date(base).setMonth(new Date(base).getMonth() + months));
        member.plan = planId;
        member.status = 'active';
        await member.save();
      }
    }
    created(res, await Payment.findById(payment._id).populate('member', 'name phone').populate('plan', 'name'));
  } catch (e) { next(e); }
}

export async function receipt(req, res, next) {
  try {
    const payment = await Payment.findById(req.params.id).populate('member').populate('plan').populate('recordedBy', 'name');
    if (!payment) return fail(res, 404, 'Payment not found');
    const settings = await Setting.getSite();
    ok(res, { payment, settings });
  } catch (e) { next(e); }
}
