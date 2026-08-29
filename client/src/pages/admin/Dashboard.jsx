import { Link } from 'react-router-dom';
import { useFetch } from '../../lib/hooks.js';
import { StatCard, BarChart, Badge, statusTone, Skeleton } from '../../components/admin/ui.jsx';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function Dashboard() {
  const { data, loading } = useFetch('/dashboard');

  if (loading || !data) return <div className="space-y-6"><Skeleton rows={2} /><Skeleton rows={5} /></div>;

  const now = new Date();
  const revData = Array.from({ length: 6 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1);
    const hit = (data.revenueSeries || []).find((r) => r._id.y === d.getFullYear() && r._id.m === d.getMonth() + 1);
    return { label: MONTHS[d.getMonth()], value: hit?.total ?? 0 };
  });

  const attData = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(now.getTime() - (6 - i) * 864e5);
    const key = d.toISOString().slice(0, 10);
    const hit = (data.attendanceSeries || []).find((r) => r._id === key);
    return { label: d.toLocaleDateString('en', { weekday: 'short' }), value: hit?.count ?? 0 };
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="h-display text-3xl text-paper">Dashboard</h1>
          <p className="text-sm text-muted mt-1">{now.toLocaleDateString('en-PK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <Link to="/admin/pos" className="btn-primary btn-sm">New Payment</Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Active members" value={data.activeMembers} accent />
        <StatCard label="New this week" value={data.newMembersWeek} />
        <StatCard label="Today’s attendance" value={data.todayAttendance} />
        <StatCard label="Pending leads" value={data.pendingLeads} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <h2 className="font-display font-bold text-paper">Revenue, last 6 months</h2>
          <p className="text-xs text-muted mb-4">This month: Rs {(data.monthRevenue || 0).toLocaleString()} ({data.monthPayments} payments)</p>
          <BarChart data={revData} format={(v) => `Rs ${v.toLocaleString()}`} />
        </div>
        <div className="card p-6">
          <h2 className="font-display font-bold text-paper">Attendance, last 7 days</h2>
          <p className="text-xs text-muted mb-4">Check-ins recorded by staff</p>
          <BarChart data={attData} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="card p-6">
          <h2 className="font-display font-bold text-paper mb-4">Today’s appointments</h2>
          {data.todayAppointments.length === 0 && <p className="text-sm text-muted">Nothing scheduled today.</p>}
          <ul className="space-y-3">
            {data.todayAppointments.map((a) => (
              <li key={a._id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-silver">{a.time}, <strong className="text-paper">{a.personName}</strong></span>
                <Badge tone={statusTone(a.status)}>{a.status}</Badge>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="font-display font-bold text-paper mb-4">Expiring within 7 days</h2>
          {data.expiringSoon.length === 0 && <p className="text-sm text-muted">No memberships expiring this week.</p>}
          <ul className="space-y-3">
            {data.expiringSoon.map((m) => (
              <li key={m._id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-silver"><strong className="text-paper">{m.name}</strong><br /><span className="text-xs text-muted">{m.phone}</span></span>
                <span className="text-xs text-amber-300">{new Date(m.expiryDate).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-6">
          <h2 className="font-display font-bold text-paper mb-4">Recent activity</h2>
          <ul className="space-y-3 text-sm">
            {data.recentPayments.map((p) => (
              <li key={p._id} className="flex justify-between gap-2">
                <span className="text-silver truncate">{p.member?.name} <span className="text-muted">· {p.method}</span></span>
                <span className="text-brand font-semibold shrink-0">Rs {p.amount.toLocaleString()}</span>
              </li>
            ))}
            {data.recentMembers.map((m) => (
              <li key={m._id} className="flex justify-between gap-2 text-muted">
                <span className="truncate">New member: {m.name}</span>
                <span className="shrink-0">{new Date(m.createdAt).toLocaleDateString('en-PK', { day: 'numeric', month: 'short' })}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
