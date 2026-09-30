import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Accordion } from '../components/ui/Accordion';
import { Icon, IconTile } from '../components/ui/Icon';
import { WebGLCanvas } from '../components/WebGLCanvas';
import { PRIMARY_TIER, PAYMENT_OPTIONS, ALL_ACCESS_GROUPS, formatNGN } from '../config/pricing';
import { SETUP_STEPS, MISTAKE_VAULT, getTotalSetupMinutes } from '../config/setup';

const PRICING_FAQ = [
  {
    id: 'payment',
    question: 'What payment methods do you accept?',
    answer:
      'Card payments run through Paystack (Visa, Mastercard, Verve) and there is a Selar fallback if Paystack does not work for you. All prices are in Nigerian Naira. Your bank converts other currencies at its own rate.',
  },
  {
    id: 'access',
    question: 'How long do I have access?',
    answer:
      'Lifetime. There is no expiry and no renewal. You keep the content and every future update to it — the roadmap is rewritten whenever Deep-Live-Cam or RVC changes its install steps.',
  },
  {
    id: 'split',
    question: 'How does the 2-payment plan work?',
    answer:
      'You pay ₦85,000 today and ₦74,000 in 30 days, totalling the same ₦159,000. Access opens immediately after the first payment. If the second payment fails, email us and we pause rather than lock you out.',
  },
  {
    id: 'upgrade',
    question: 'Is there a cheaper tier or a downgrade?',
    answer:
      'No. There is one product at one price, because splitting the roadmap into tiers would mean locking the error table or the download links behind another payment. Everything opens together.',
  },
  {
    id: 'refund',
    question: 'What is the refund policy?',
    answer:
      'If you followed every step and the tools genuinely do not run on your machine, contact us within 7 days with your error log and system specs. We help you fix it first; if we cannot, we refund in full.',
  },
  {
    id: 'hardware',
    question: 'Will it work on my laptop?',
    answer:
      'Windows 10 or 11 with an Intel i5 or Ryzen 5 from generation 8 onwards will run the whole pipeline. Without a GPU expect 2 to 5 frames per second — excellent for recorded content, choppy for live calls.',
  },
];

const INCLUDED = [
  { icon: 'route', title: 'The Setup Roadmap', body: `${SETUP_STEPS.length} guided steps with where-to-go links, exact clicks, a verify command and the trap at each step.` },
  { icon: 'bug', title: 'The Mistake Vault', body: `${MISTAKE_VAULT.length} decoded errors with the plain-English cause and the command that fixes it.` },
  { icon: 'terminal', title: 'The Command Center', body: 'Every terminal command in the course, grouped by phase and copy-ready.' },
  { icon: 'download', title: 'The Download Hub', body: 'Twelve official sources with the size to expect and the proof it installed correctly.' },
  { icon: 'video', title: 'The studio recipes', body: 'OBS virtual camera plus menu-level camera and microphone paths for five call apps.' },
  { icon: 'shield', title: 'Consent and safety', body: 'Model-release templates, AI-disclosure rules per platform, and the consent-first workflow.' },
] as const;

export function Pricing() {
  const [planId, setPlanId] = useState<'once' | 'split'>(PAYMENT_OPTIONS[0].id);
  const selected = PAYMENT_OPTIONS.find((o) => o.id === planId) ?? PAYMENT_OPTIONS[0];
  const tier = PRIMARY_TIER;

  return (
    <div className="min-h-screen bg-[#0B1220]">
      {/* Header */}
      <section className="relative overflow-hidden pb-10 pt-32 sm:pt-40">
        <div className="absolute inset-0 opacity-40">
          <WebGLCanvas />
        </div>
        <div className="grid-paper-dark absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B1220]/70 to-[#0B1220]" />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1.5 text-xs font-semibold text-white/70 backdrop-blur-sm">
            <Icon name="bolt" size={13} className="text-[#FBBF24]" />
            One product, one price
          </span>

          <h1 className="display-tight mb-5 text-[38px] text-white sm:text-6xl">
            Simple pricing.
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#818CF8] to-[#2DD4BF]">
              No hidden tiers.
            </span>
          </h1>

          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-white/55 sm:text-base">
            Everything from the free lesson to the commercial templates unlocks in one payment of{' '}
            {formatNGN(tier.price)}. Split it across two if you prefer, but you are never asked to
            upgrade later.
          </p>

          {/* Plan toggle */}
          <div className="mt-8 flex justify-center">
            <div className="inline-flex rounded-full border border-white/12 bg-white/5 p-1 backdrop-blur-sm">
              {PAYMENT_OPTIONS.map((option) => {
                const active = option.id === planId;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setPlanId(option.id)}
                    aria-pressed={active}
                    className={[
                      'touch-target flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors sm:px-5',
                      active ? 'bg-white text-[#0B1220]' : 'text-white/55 hover:text-white',
                    ].join(' ')}
                  >
                    {option.label}
                    {option.badge && (
                      <span
                        className={[
                          'rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider',
                          active ? 'bg-[#4F46E5] text-white' : 'bg-white/10 text-white/60',
                        ].join(' ')}
                      >
                        {option.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* Plan card */}
      <section className="relative z-10 px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-md">
          <div className="overflow-hidden rounded-3xl border border-[#4F46E5]/40 bg-[#101828] shadow-[0_40px_80px_-40px_rgba(79,70,229,0.6)]">
            <div className="border-b border-white/10 bg-gradient-to-br from-[#4F46E5]/25 via-transparent to-[#14B8A6]/10 p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="rounded-full bg-[#4F46E5] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  {tier.badge}
                </span>
                <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">
                  Lifetime
                </span>
              </div>

              <p className="font-display text-sm font-semibold text-[#A5B4FC]">{tier.name}</p>
              <div className="mt-1 flex flex-wrap items-end gap-3">
                <span className="font-display text-4xl font-black text-white sm:text-5xl">
                  {formatNGN(selected.dueToday)}
                </span>
                <span className="pb-1.5 text-sm text-white/40">
                  {selected.id === 'once' ? 'one time' : 'today'}
                </span>
              </div>
              <p className="mt-2 text-xs text-white/45">
                {selected.id === 'once'
                  ? 'No renewal, no expiry, no upsell.'
                  : `then ${formatNGN(selected.dueLater)} in 30 days. Total ${formatNGN(tier.price)}.`}
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-white/60">{tier.description}</p>
            </div>

            <ul className="grid gap-x-5 gap-y-3 p-6 sm:grid-cols-2 sm:p-8">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <Icon name="check" size={15} className="mt-0.5 shrink-0 text-[#2DD4BF]" />
                  <span className="text-[13px] leading-relaxed text-white/70">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="p-6 pt-0 sm:p-8 sm:pt-0">
              <Link to={`/checkout/${tier.id}?plan=${selected.id}`}>
                <Button size="lg" className="w-full justify-center">
                  {tier.cta}
                  <Icon name="arrowRight" size={16} />
                </Button>
              </Link>

              {tier.selarUrl && (
                <a
                  href={tier.selarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/12 px-4 py-3 text-[13px] font-medium text-white/55 transition-colors hover:bg-white/5 hover:text-white"
                >
                  Or pay via Selar
                  <Icon name="external" size={13} />
                </a>
              )}

              <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 border-t border-white/10 pt-4">
                {[
                  { icon: 'lock' as const, label: 'Paystack SSL' },
                  { icon: 'shield' as const, label: '7-day refund' },
                  { icon: 'clock' as const, label: `${getTotalSetupMinutes()} min setup` },
                ].map((badge) => (
                  <span key={badge.label} className="flex items-center gap-1.5 text-[11px] text-white/45">
                    <Icon name={badge.icon} size={12} className="text-[#10B981]" />
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* What the single price unlocks */}
      <section className="relative overflow-hidden border-t border-white/8 py-16 sm:py-20">
        <div className="grid-paper-dark absolute inset-0 opacity-60" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#A5B4FC]">
              <Icon name="layers" size={13} />
              Everything included
            </span>
            <h2 className="display-tight mb-4 text-3xl text-white sm:text-4xl">
              What one payment actually opens.
            </h2>
            <p className="text-[15px] leading-relaxed text-white/55">
              Not a sample, not the "basics". The whole system, in four groups.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ALL_ACCESS_GROUPS.map((group) => (
              <div
                key={group.id}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-[#4F46E5]/50"
              >
                <IconTile name={group.icon} size="md" tone="onDark" className="mb-3" />
                <h3 className="mb-3 font-display text-sm font-bold text-white">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-white/55">
                      <Icon name="check" size={12} className="mt-0.5 shrink-0 text-[#2DD4BF]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {INCLUDED.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <IconTile name={item.icon} size="sm" tone="onDark" className="mb-3" />
                <h3 className="mb-1.5 font-display text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs leading-relaxed text-white/50">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment FAQ */}
      <section className="border-t border-white/8 bg-[#0B1220] py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="display-tight mb-8 text-center text-3xl text-white sm:text-4xl">
            Payment questions
          </h2>
          <div className="rounded-2xl border border-white/10 [&_button]:bg-transparent [&_button]:text-white [&_span]:text-white">
            <Accordion items={PRICING_FAQ} allowMultiple />
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to={`/checkout/${tier.id}?plan=${selected.id}`} className="sm:w-auto">
              <Button size="lg" className="w-full justify-center sm:w-auto">
                Pay {formatNGN(selected.dueToday)} now
                <Icon name="arrowRight" size={16} />
              </Button>
            </Link>
            <Link to="/free-lesson" className="sm:w-auto">
              <Button
                size="lg"
                variant="ghost"
                className="w-full justify-center border-white/20 text-white hover:bg-white/10 sm:w-auto"
              >
                Read the free lesson first
              </Button>
            </Link>
          </div>
        </div>
      </section>


    </div>
  );
}

