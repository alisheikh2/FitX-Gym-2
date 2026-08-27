import Member from '../models/Member.js';
import Payment from '../models/Payment.js';
import Attendance from '../models/Attendance.js';
import Lead from '../models/Lead.js';
import Appointment from '../models/Appointment.js';
import { ok } from '../utils/response.js';

const dstr = (d) => d.toISOString().slice(0, 10);

export async function overview(req, res, next) {
  try {
    const now = new Date();
    const today = dstr(now);
    const weekAgo = new Date(now.getTime() - 7 * 864e5);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const expiringSoon = new Date(now.getTime() + 7 * 864e5);

    const [activeMembers, newMembersWeek, expiring, todayAppts, todayAttendance, pendingLeads, monthPayments] = await Promise.all([
      Member.countDocuments({ status: 'active' }),
      Member.countDocuments({ createdAt: { $gte: weekAgo } }),
      Member.find({ status: 'active', expiryDate: { $lte: expiringSoon } }).select('name expiryDate phone').limit(20).lean(),
      Appointment.find({ date: today }).populate('trainer', 'name').lean(),
      Attendance.countDocuments({ date: today }),
      Lead.countDocuments({ status: { $in: ['New', 'Follow-up'] } }),
      Payment.aggregate([
        { $match: { date: { $gte: monthStart } } },
        { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
      ])
    ]);

    // Revenue + attendance series for the last 6 months / 7 days
    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const [revenueSeries, attendanceSeries, recentPayments, recentMembers] = await Promise.all([
      Payment.aggregate([
        { $match: { date: { $gte: sixMonthsAgo } } },
        {
          $group: {
            _id: { y: { $year: '$date' }, m: { $month: '$date' } },
            total: { $sum: '$amount' }
          }
        },
        { $sort: { '_id.y': 1, '_id.m': 1 } }
      ]),
      Attendance.aggregate([
        { $match: { date: { $gte: dstr(new Date(now.getTime() - 6 * 864e5)) } } },
        { $group: { _id: '$date', count: { $sum: 1 } } },
        { $sort: { _id: 1 } }
      ]),
      Payment.find().sort({ date: -1 }).limit(6).populate('member', 'name').populate('recordedBy', 'name').lean(),
      Member.find().sort({ createdAt: -1 }).limit(6).select('name phone createdAt status').lean()
    ]);

    ok(res, {
      activeMembers,
      newMembersWeek,
      expiringSoon: expiring,
      todayAppointments: todayAppts,
      todayAttendance,
      pendingLeads,
      monthRevenue: monthPayments[0]?.total ?? 0,
      monthPayments: monthPayments[0]?.count ?? 0,
      revenueSeries,
      attendanceSeries,
      recentPayments,
      recentMembers
    });
  } catch (e) { next(e); }
}
