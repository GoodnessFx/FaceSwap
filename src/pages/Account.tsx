import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Callout } from '../components/ui/Callout';
import { Icon } from '../components/ui/Icon';
import { formatNGN, getTierById } from '../config/pricing';

const MOCK_PURCHASES = [
  {
    id: 'purch_001',
    tierId: 'complete',
    amount: 15000,
    status: 'paid',
    date: '2024-11-15',
    reference: 'pay_abc123',
  },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 mb-4">
      <h2 className="font-bold font-display text-[#0B1220] mb-4 pb-3 border-b border-[#F1F5F9]">{title}</h2>
      {children}
    </div>
  );
}

export function Account() {
  const [name, setName] = useState('Ada Okafor');
  const [email] = useState('ada@example.com');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => { setSaving(false); setSaved(true); setTimeout(() => setSaved(false), 2000); }, 800);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="pt-28 pb-16 max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-2xl font-black font-display text-[#0B1220] mb-8">Account settings</h1>

        <Section title="Profile">
          <form onSubmit={saveProfile} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-[#374151] block mb-1.5">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#374151] block mb-1.5">Email address</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm bg-[#F8FAFC] text-[#94A3B8] cursor-not-allowed"
              />
              <p className="text-xs text-[#94A3B8] mt-1">Email cannot be changed. Contact support if needed.</p>
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" size="sm" loading={saving}>Save changes</Button>
              {saved && (
                <span className="flex items-center gap-1.5 text-sm font-medium text-[#10B981]">
                  <Icon name="checkCircle" size={14} />
                  Saved
                </span>
              )}
            </div>
          </form>
        </Section>

        <Section title="Purchases">
          {MOCK_PURCHASES.length === 0 ? (
            <p className="text-sm text-[#94A3B8]">No purchases yet.</p>
          ) : (
            <div className="space-y-3">
              {MOCK_PURCHASES.map((p) => {
                const tier = getTierById(p.tierId);
                return (
                  <div key={p.id} className="flex items-center justify-between gap-4 py-3 border-b border-[#F1F5F9] last:border-0">
                    <div>
                      <p className="font-semibold text-[#0B1220] text-sm">{tier?.name}</p>
                      <p className="text-xs text-[#94A3B8]">
                        {new Date(p.date).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })}
                        {' · '}Ref: {p.reference}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className="text-sm font-bold text-[#0B1220]">{formatNGN(p.amount)}</span>
                      <Badge variant="success">Paid</Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Section>

        <Section title="Change password">
          <ChangePasswordForm />
        </Section>

        <Section title="Delete account">
          <Callout type="danger" title="This action is permanent">
            Deleting your account removes all your data including purchases and progress. Access to paid content will be revoked immediately.
          </Callout>
          <div className="mt-4">
            <Button variant="danger" size="sm">Delete my account</Button>
          </div>
        </Section>
      </div>
    </div>
  );
}

function ChangePasswordForm() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handle(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setDone(true); }, 800);
  }

  if (done) return <Callout type="success">Password updated successfully.</Callout>;

  return (
    <form onSubmit={handle} className="space-y-3">
      {[
        { label: 'Current password', val: current, set: setCurrent },
        { label: 'New password', val: next, set: setNext },
        { label: 'Confirm new password', val: confirm, set: setConfirm },
      ].map((f) => (
        <div key={f.label}>
          <label className="text-sm font-semibold text-[#374151] block mb-1.5">{f.label}</label>
          <input
            type="password"
            value={f.val}
            onChange={(e) => f.set(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5]"
          />
        </div>
      ))}
      <Button type="submit" size="sm" loading={loading}>Update password</Button>
    </form>
  );
}
