import { useState } from 'react';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { formatNGN, getTierById } from '../config/pricing';

const MOCK_BUYERS = [
  { id: '1', name: 'Ada Okafor', email: 'ada@example.com', tier: 'complete', amount: 15000, date: '2024-11-15', status: 'active' },
  { id: '2', name: 'Emeka Nwosu', email: 'emeka@example.com', tier: 'starter', amount: 7500, date: '2024-11-20', status: 'active' },
  { id: '3', name: 'Fatima Bello', email: 'fatima@example.com', tier: 'business', amount: 100000, date: '2024-11-22', status: 'active' },
  { id: '4', name: 'Chidi Obi', email: 'chidi@example.com', tier: 'done-with-you', amount: 40000, date: '2024-11-25', status: 'refunded' },
];

const TABS = ['Buyers', 'Coupons', 'Lessons'];

export function Admin() {
  const [activeTab, setActiveTab] = useState('Buyers');
  const [search, setSearch] = useState('');

  const filtered = MOCK_BUYERS.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = MOCK_BUYERS.filter((b) => b.status === 'active').reduce((s, b) => s + b.amount, 0);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="pt-28 pb-16 max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <Badge variant="danger" className="mb-2">Admin</Badge>
            <h1 className="text-2xl font-black font-display text-[#0B1220]">Admin Dashboard</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total buyers', value: MOCK_BUYERS.filter((b) => b.status === 'active').length.toString() },
            { label: 'Revenue (active)', value: formatNGN(totalRevenue) },
            { label: 'Refunds', value: MOCK_BUYERS.filter((b) => b.status === 'refunded').length.toString() },
            { label: 'Avg. order', value: formatNGN(Math.round(totalRevenue / MOCK_BUYERS.filter((b) => b.status === 'active').length)) },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-[#E2E8F0] p-5">
              <p className="text-xs font-semibold text-[#94A3B8] uppercase tracking-wider mb-1">{s.label}</p>
              <p className="text-2xl font-black font-display text-[#0B1220]">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="no-scrollbar mb-6 flex w-full gap-1 overflow-x-auto rounded-2xl border border-[#E2E8F0] bg-white p-1.5 sm:w-fit">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={[
                'px-4 py-2 text-sm font-semibold rounded-xl transition-colors',
                activeTab === t ? 'bg-[#4F46E5] text-white' : 'text-[#64748B] hover:bg-[#F8FAFC]',
              ].join(' ')}
            >
              {t}
            </button>
          ))}
        </div>

        {activeTab === 'Buyers' && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
            <div className="px-5 py-4 border-b border-[#F1F5F9] flex items-center gap-3">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search buyers..."
                className="flex-1 px-3 py-2 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px]">
                <thead>
                  <tr className="border-b border-[#F1F5F9]">
                    {['Name', 'Email', 'Tier', 'Amount', 'Date', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-[#94A3B8] uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {filtered.map((buyer) => {
                    const tier = getTierById(buyer.tier);
                    return (
                      <tr key={buyer.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="px-5 py-3.5 text-sm font-semibold text-[#0B1220] whitespace-nowrap">{buyer.name}</td>
                        <td className="px-5 py-3.5 text-sm text-[#64748B] whitespace-nowrap">{buyer.email}</td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <Badge variant={buyer.tier === 'business' ? 'warning' : 'primary'}>
                            {tier?.name}
                          </Badge>
                        </td>
                        <td className="px-5 py-3.5 text-sm font-semibold text-[#0B1220] whitespace-nowrap">{formatNGN(buyer.amount)}</td>
                        <td className="px-5 py-3.5 text-sm text-[#64748B] whitespace-nowrap">
                          {new Date(buyer.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          <Badge variant={buyer.status === 'active' ? 'success' : 'danger'}>
                            {buyer.status}
                          </Badge>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-2">
                            {buyer.status === 'active' ? (
                              <Button size="sm" variant="ghost" className="text-xs py-1">Revoke</Button>
                            ) : (
                              <Button size="sm" variant="secondary" className="text-xs py-1">Grant</Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'Coupons' && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold font-display text-[#0B1220]">Active coupons</h2>
              <Button size="sm">+ New coupon</Button>
            </div>
            <div className="space-y-3">
              {[
                { code: 'LAUNCH25', type: '25% off', expires: 'Dec 31, 2024', uses: '12/100' },
                { code: 'EARLYBIRD', type: '₦2,000 off', expires: 'Dec 15, 2024', uses: '5/∞' },
              ].map((c) => (
                <div key={c.code} className="flex items-center justify-between gap-4 py-3 border-b border-[#F1F5F9] last:border-0">
                  <div>
                    <code className="font-mono font-bold text-[#4F46E5] text-sm">{c.code}</code>
                    <p className="text-xs text-[#94A3B8] mt-0.5">{c.type} · Expires {c.expires}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#64748B]">{c.uses} used</span>
                    <Badge variant="success">Active</Badge>
                    <Button size="sm" variant="ghost" className="text-xs">Disable</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'Lessons' && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6">
            <p className="text-sm text-[#64748B]">
              Lesson management is handled via Supabase Storage. Upload lesson markdown files and screenshots
              to the <code className="font-mono bg-[#F8FAFC] px-1.5 py-0.5 rounded text-[#4F46E5] text-xs">lessons/</code> bucket.
              RLS policies ensure only admin users can write; buyers get signed-URL access to their entitled content.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
