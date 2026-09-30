export interface PricingTier {
  id: string;
  name: string;
  price: number;
  launchPrice?: number;
  launchDeadline?: string;
  currency: string;
  badge?: string;
  description: string;
  features: string[];
  notIncluded?: string[];
  cta: string;
  highlighted?: boolean;
  selarUrl?: string;
}

export interface PaymentOption {
  id: 'once' | 'split';
  label: string;
  /** Short helper line shown under the label. */
  note: string;
  /** Charged today. */
  dueToday: number;
  /** Charged 30 days later (0 for a one-time payment). */
  dueLater: number;
  badge?: string;
}

export interface FeatureGroup {
  id: string;
  title: string;
  icon: 'route' | 'video' | 'mic' | 'shield';
  items: string[];
}

export interface Coupon {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  expiresAt?: string;
  maxUses?: number;
}

export const PRICING_TIERS: PricingTier[] = [
  {
    id: 'all-access',
    name: 'All-Access Lifetime',
    price: 159000,
    currency: 'NGN',
    badge: 'Everything included',
    description:
      'One payment unlocks every module, every screenshot, every command, every update and every bonus. No tiers, no upsells, no expiry.',
    features: [
      'All 7 modules and every lesson, unlocked at once',
      'The full Setup Roadmap: 13 guided install steps',
      'Every screenshot from the real CPU-only test machine',
      'Verified download links and where-to-go instructions',
      'The Mistake Vault: 18 errors decoded with exact fixes',
      'Copy-paste Command Center for every terminal step',
      'OBS virtual-camera and call-app recipes',
      'RVC voice conversion pipeline, start to finish',
      'Commercial workflow, model release and consent templates',
      'Lifetime access plus every future version of the course',
      'Priority email support for 12 months',
      '7-day fix-it-first refund guarantee',
    ],
    cta: 'Unlock Everything',
    highlighted: true,
    selarUrl: 'https://selar.co/faceswapcourse',
  },
];
export const COUPONS: Coupon[] = [
  { code: 'LAUNCH25', type: 'percentage', value: 25 },
  { code: 'EARLYBIRD', type: 'fixed', value: 5000 },
];

export function formatNGN(amount: number): string {
  return `₦${amount.toLocaleString('en-NG')}`;
}

/**
 * Resolves a tier id. Unknown and legacy ids (starter, complete,
 * done-with-you, business) fall back to the single all-access product so old
 * links and old order rows never dead-end.
 */
export function getTierById(id: string): PricingTier | undefined {
  return PRICING_TIERS.find((t) => t.id === id) ?? PRIMARY_TIER;
}

export function getPaymentOption(id: string): PaymentOption {
  return PAYMENT_OPTIONS.find((o) => o.id === id) ?? PAYMENT_OPTIONS[0];
}

export function applyCoupon(price: number, coupon: Coupon): number {
  if (coupon.type === 'percentage') {
    return Math.round(price * (1 - coupon.value / 100));
  }
  return Math.max(0, price - coupon.value);
}

/** The headline product used by the hero, pricing page and checkout. */
export const PRIMARY_TIER: PricingTier = PRICING_TIERS[0];

/** Pay once, or split across two payments. Both options total ₦159,000. */
export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'once',
    label: 'Pay once',
    note: 'One payment, lifetime access',
    dueToday: 159000,
    dueLater: 0,
    badge: 'Most popular',
  },
  {
    id: 'split',
    label: '2 payments',
    note: '₦85,000 now, ₦74,000 in 30 days',
    dueToday: 85000,
    dueLater: 74000,
  },
];

/** How the ₦159,000 is justified, grouped so the page can breathe. */
export const ALL_ACCESS_GROUPS: FeatureGroup[] = [
  {
    id: 'build',
    title: 'The guided build',
    icon: 'route',
    items: [
      '13-step Setup Roadmap with a screenshot for every decision',
      'Python 3.10.11, Git and C++ Build Tools installed the right way',
      'Deep-Live-Cam cloned, patched and running on CPU',
      'inswapper_128, GFPGAN and ffmpeg placed in exactly the right folders',
    ],
  },
  {
    id: 'studio',
    title: 'The live studio',
    icon: 'video',
    items: [
      'OBS window capture tuned for a machine without a GPU',
      'Virtual camera tested in Zoom, Meet, Discord and Teams',
      'Start-order checklist so nothing fights for your webcam',
      'Low-spec performance presets that keep the picture stable',
    ],
  },
  {
    id: 'voice',
    title: 'The voice pipeline',
    icon: 'mic',
    items: [
      'VB-Cable installed and verified in Sound Settings',
      'RVC on Python 3.12, running beside Python 3.10',
      'hubert and rmvpe downloads that actually finish',
      'Realtime GUI settings and microphone routing into calls',
    ],
  },
  {
    id: 'safety',
    title: 'Consent, safety and money',
    icon: 'shield',
    items: [
      'Consent-first workflow you can show a client',
      'Model release and AI-disclosure templates',
      'Platform-by-platform labelling rules',
      'How to price your own persona service as a freelance offer',
    ],
  },
];

