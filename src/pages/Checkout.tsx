import { useState } from 'react';
import { Link, useParams, Navigate, useSearchParams } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Callout } from '../components/ui/Callout';
import { Icon } from '../components/ui/Icon';
import { EduWarning } from '../components/EduWarning';
import {
  getTierById,
  getPaymentOption,
  formatNGN,
  applyCoupon,
  COUPONS,
} from '../config/pricing';

export function Checkout() {
  const { tier: tierId } = useParams<{ tier: string }>();
  const tier = getTierById(tierId || '');
  const [searchParams] = useSearchParams();
  const plan = getPaymentOption(searchParams.get('plan') ?? 'once');
  const [consent, setConsent] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState<typeof COUPONS[0] | null>(null);
  const [couponError, setCouponError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!tier) return <Navigate to="/pricing" replace />;

  const basePrice = plan.dueToday;
  const finalPrice = couponApplied ? applyCoupon(basePrice, couponApplied) : basePrice;
  const discount = basePrice - finalPrice;


  function applyCode() {
    const found = COUPONS.find((c) => c.code === couponCode.toUpperCase());
    if (!found) { setCouponError('Invalid coupon code.'); setCouponApplied(null); return; }
    if (found.expiresAt && new Date(found.expiresAt) < new Date()) {
      setCouponError('This coupon has expired.');
      setCouponApplied(null);
      return;
    }
    setCouponApplied(found);
    setCouponError('');
  }

  function handlePay() {
    if (!consent) return;
    setLoading(true);
    // In production: call the Edge Function create-checkout, then redirect to Paystack
    setTimeout(() => {
      setLoading(false);
      window.location.href = '/checkout/success';
    }, 2000);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="pt-28 pb-16 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link
            to="/pricing"
            className="inline-flex items-center gap-1.5 text-sm text-[#94A3B8] transition-colors hover:text-[#4F46E5]"
          >
            <Icon name="arrowLeft" size={14} />
            Back to pricing
          </Link>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Order summary */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6">
              <h1 className="text-xl font-black font-display text-[#0B1220] mb-5">Order summary</h1>

              <div className="flex items-start gap-4 pb-5 border-b border-[#F1F5F9]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]">
                  <Icon name="route" size={22} />
                </div>
                <div>
                  <p className="font-bold text-[#0B1220]">{tier.name}</p>
                  <p className="text-sm text-[#64748B] mt-0.5">{tier.description}</p>
                  {tier.badge && <Badge variant="primary" className="mt-2">{tier.badge}</Badge>}
                </div>
              </div>

              <ul className="py-4 space-y-2 border-b border-[#F1F5F9]">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <svg className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.854 5.146a.5.5 0 010 .708l-4 4a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L7.5 9.793l3.646-3.647a.5.5 0 01.708 0z" />
                    </svg>
                    <span className="text-[#374151]">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#64748B]">Subtotal</span>
                  <span className="text-[#0B1220]">{formatNGN(basePrice)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-[#10B981]">Coupon ({couponApplied?.code})</span>
                    <span className="text-[#10B981]">-{formatNGN(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[#F1F5F9] pt-3 mt-2 text-base font-bold">
                  <span className="text-[#0B1220]">{plan.id === 'once' ? 'Total' : 'Due today'}</span>
                  <span className="text-[#0B1220]">{formatNGN(finalPrice)}</span>
                </div>
                {plan.dueLater > 0 && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#64748B]">Second payment in 30 days</span>
                      <span className="text-[#64748B]">{formatNGN(plan.dueLater)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#94A3B8]">Plan total</span>
                      <span className="text-[#94A3B8]">
                        {formatNGN(plan.dueToday + plan.dueLater)}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Coupon */}
              <div className="mt-5">
                <label className="text-xs font-semibold text-[#64748B] block mb-1.5">Coupon code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="LAUNCH25"
                    className="flex-1 px-3 py-2 rounded-xl border border-[#E2E8F0] text-sm focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                  />
                  <Button size="sm" variant="secondary" onClick={applyCode}>Apply</Button>
                </div>
                {couponError && <p className="text-xs text-[#EF4444] mt-1">{couponError}</p>}
                {couponApplied && (
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#10B981]">
                    <Icon name="checkCircle" size={13} />
                    Coupon applied:{' '}
                    {couponApplied.type === 'percentage'
                      ? `${couponApplied.value}% off`
                      : `₦${couponApplied.value} off`}
                  </p>
                )}
              </div>
            </div>

            <EduWarning compact />
          </div>

          {/* Payment */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl border border-[#E2E8F0] p-6">
              <h2 className="font-bold font-display text-[#0B1220] mb-5">Payment</h2>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer group mb-6">
                <div className={[
                  'w-5 h-5 rounded-md border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors',
                  consent ? 'bg-[#4F46E5] border-[#4F46E5]' : 'border-[#CBD5E1] group-hover:border-[#4F46E5]',
                ].join(' ')}>
                  {consent && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <input type="checkbox" className="sr-only" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span className="text-xs text-[#374151] leading-relaxed">
                  I will only use faces and voices I own, have licensed, or that are synthetic. I will not use these tools to impersonate real people or deceive others.{' '}
                  <Link to="/legal/acceptable-use" className="text-[#4F46E5] underline">
                    Full policy
                  </Link>
                </span>
              </label>

              <Button
                size="lg"
                loading={loading}
                disabled={!consent}
                onClick={handlePay}
                className="w-full justify-center"
              >
                {plan.id === 'once'
                  ? `Pay ${formatNGN(finalPrice)} with Paystack`
                  : `Pay ${formatNGN(finalPrice)} today with Paystack`}
              </Button>

              {plan.dueLater > 0 && (
                <p className="text-center text-xs text-[#94A3B8]">
                  Second payment of {formatNGN(plan.dueLater)} in 30 days. Total{' '}
                  {formatNGN(plan.dueToday + plan.dueLater)}.
                </p>
              )}

              {tier.selarUrl && (
                <a
                  href={tier.selarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-center w-full px-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm font-medium text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
                >
                  Or pay via Selar
                  <Icon name="external" size={13} />
                </a>
              )}

              <div className="mt-4 flex items-center gap-2 justify-center">
                <svg className="w-3.5 h-3.5 text-[#94A3B8]" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11 7V5a3 3 0 00-6 0v2H4a1 1 0 00-1 1v6a1 1 0 001 1h8a1 1 0 001-1V8a1 1 0 00-1-1h-1zm-5-2a2 2 0 014 0v2H6V5z" />
                </svg>
                <span className="text-xs text-[#94A3B8]">Secured by Paystack · SSL encrypted</span>
              </div>
            </div>

            <Callout type="success" title="7-day refund guarantee">
              If the tools genuinely don't work after following every step, contact us for a full refund.
            </Callout>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E2E8F0] p-10 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F0FDF4] text-[#10B981]">
          <Icon name="checkCircle" size={34} />
        </div>
        <h1 className="text-2xl font-black font-display text-[#0B1220] mb-3">Payment confirmed!</h1>
        <p className="text-[#64748B] mb-6 leading-relaxed">
          Thank you for your purchase. A receipt has been sent to your email. Your course access is now active.
        </p>
        <Link to="/dashboard">
          <Button size="lg" className="w-full justify-center">
            Go to dashboard
            <Icon name="arrowRight" size={15} />
          </Button>
        </Link>
      </div>
    </div>
  );
}

export function CheckoutFailed() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#E2E8F0] p-10 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FEF2F2] text-[#EF4444]">
          <Icon name="xCircle" size={34} />
        </div>
        <h1 className="text-2xl font-black font-display text-[#0B1220] mb-3">Payment failed</h1>
        <p className="text-[#64748B] mb-6">
          Your payment could not be processed. No charge was made. Please try again or use the Selar fallback.
        </p>
        <div className="flex flex-col gap-3">
          <Link to="/pricing"><Button size="lg" className="w-full justify-center">Try again</Button></Link>
          <Link to="/pricing"><Button size="lg" variant="ghost" className="w-full justify-center">Back to pricing</Button></Link>
        </div>
      </div>
    </div>
  );
}
