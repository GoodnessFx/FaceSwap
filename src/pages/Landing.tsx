import { useState } from 'react';
import { Link } from 'react-router-dom';
import { WebGLCanvas } from '../components/WebGLCanvas';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { Accordion } from '../components/ui/Accordion';
import { Callout } from '../components/ui/Callout';
import { Icon, IconTile, type IconName } from '../components/ui/Icon';
import { PhoneMockup, FloatingChip } from '../components/ui/PhoneMockup';
import { ToolMarquee } from '../components/sections/ToolMarquee';
import { ProductShowcase } from '../components/sections/ProductShowcase';
import { SetupRoadmap } from '../components/sections/SetupRoadmap';
import { DownloadHub, CallRecipes } from '../components/sections/DownloadHub';
import { ErrorDecoder } from '../components/sections/ErrorDecoder';
import { CommandCenter } from '../components/sections/CommandCenter';
import { PRICING_TIERS, PAYMENT_OPTIONS, ALL_ACCESS_GROUPS, formatNGN } from '../config/pricing';
import { MODULES } from '../config/courses';
import { SETUP_STEPS, MISTAKE_VAULT, getTotalSetupMinutes } from '../config/setup';

const PROBLEMS: { icon: IconName; tone: 'indigo' | 'amber' | 'teal'; title: string; body: string }[] = [
  {
    icon: 'bug',
    tone: 'amber',
    title: 'Tutorials that skip the errors',
    body: 'Every guide online assumes it works first try. This one documents every real error — the onnxruntime crash, the C++ build failure, the 9-byte model file — and gives you the exact fix.',
  },
  {
    icon: 'cpu',
    tone: 'indigo',
    title: 'Everything requires a GPU',
    body: 'All the YouTube demos show a powerful gaming PC. This course was tested on a CPU-only Windows laptop, so you know exactly what works and what does not.',
  },
  {
    icon: 'refresh',
    tone: 'teal',
    title: 'Tools that break with updates',
    body: 'Deep-Live-Cam and RVC change often. Every purchase includes lifetime access to updated steps, so the roadmap you follow today still matches the repo tomorrow.',
  },
];

const OUTCOMES: { icon: IconName; title: string; body: string }[] = [
  { icon: 'face', title: 'Run a live face swap on a CPU', body: 'Get Deep-Live-Cam running with the right model files and the performance settings a non-GPU machine actually needs.' },
  { icon: 'video', title: 'Stream your persona through OBS', body: 'Capture the face-swap preview, crop it cleanly, and output it as a virtual camera to any call app.' },
  { icon: 'mic', title: 'Convert your voice in real time', body: 'Install RVC beside Python 3.10, load a model, and route the converted voice through VB-Cable.' },
  { icon: 'sliders', title: 'Fix every common error', body: 'Know what the onnxruntime error, the C++ build error and the 9-byte model file each mean, and clear them fast.' },
  { icon: 'monitor', title: 'Use it in Zoom, Meet and Discord', body: 'Menu-level recipes for setting OBS Virtual Camera and CABLE Output as your camera and microphone.' },
  { icon: 'shield', title: 'Build with consent and safety', body: 'Understand the legal and ethical boundaries so your content is defensible and stays platform-safe.' },
  { icon: 'book', title: 'Create content-ready recordings', body: 'On a CPU, short recorded clips look great. Learn the workflow that makes them look intentional.' },
  { icon: 'wallet', title: 'Turn it into paid work', body: 'Model-release templates, disclosure rules and a pricing frame for selling persona video as a service.' },
];


const STEPS: { n: string; title: string; body: string; icon: IconName }[] = [
  { n: '01', icon: 'key', title: 'Install the tools', body: 'Python 3.10.11, Git and Microsoft C++ Build Tools — in the right order, with the right settings.' },
  { n: '02', icon: 'face', title: 'Set up Deep-Live-Cam', body: 'Clone the repo, fix the two known install errors, download the AI models, and run it for the first time.' },
  { n: '03', icon: 'video', title: 'Connect OBS', body: 'Capture the face-swap window, add it as a virtual camera, and test it in Zoom and Google Meet.' },
  { n: '04', icon: 'mic', title: 'Add voice conversion', body: 'Install VB-Cable and RVC, load or train a voice model, and route your converted voice into any call.' },
];

const AUDIENCE_YES = [
  'You are a content creator, streamer or YouTuber',
  'You want an AI avatar for privacy or branding',
  'You are a social media manager or video producer',
  'You want to dub or create content in a different voice',
  'You are a freelancer offering video or ad services',
  'You are a student learning how AI media tools work',
  'You only have a standard Windows laptop',
];

const AUDIENCE_NO = [
  'You want to impersonate a real person',
  'You plan to deceive people on calls',
  'You expect smooth live video on a 10-year-old CPU',
  'You are looking for a magic one-click solution',
  'You need a Mac or Linux guide — not covered',
  'You want to bypass identity or age verification',
];


const FAQ_ITEMS = [
  {
    id: 'hardware',
    question: 'Will this work on my laptop?',
    answer: 'If your laptop runs Windows 10 or 11 and has a decent CPU (Intel i5 or Ryzen 5 generation 8 or newer), it will run. Face swap will be 2–5 fps without a GPU, which is good for recording and testing. An NVIDIA GTX 1660 or better gives much smoother live results.',
  },
  {
    id: 'mac',
    question: 'Does it work on Mac or Linux?',
    answer: 'This course specifically covers Windows. Deep-Live-Cam has a macOS path, but the steps are different and the guide does not cover it. For now, the course is Windows-only.',
  },
  {
    id: 'gpu',
    question: 'I don\'t have a dedicated GPU. Will face swap be usable?',
    answer: 'For recorded content, yes — it works well enough at 640×480. For live calls, it will be choppy (a few fps). The course is honest about this; the hardware note on the landing page covers it in detail.',
  },
  {
    id: 'legality',
    question: 'Is this legal?',
    answer: 'The tools themselves are legal open-source software. What you do with them determines legality. This course teaches a consent-first workflow: only use faces and voices you own, have licensed, or that are synthetic. Impersonating real people, deceiving others on calls, or committing fraud is illegal in most countries. You are responsible for your use.',
  },
  {
    id: 'refund',
    question: 'What is the refund policy?',
    answer: 'We offer a 7-day refund if you followed the steps exactly and the tools genuinely don\'t run on your machine. Show us the error, the steps you took, and your system specs. We\'ll help you fix it first; if we can\'t, we refund. See the full Refund Policy for details.',
  },
  {
    id: 'updates',
    question: 'What happens when the tools change?',
    answer: 'The Starter Guide gets 3 months of free updates. The Complete Course, Done-With-You, and Creator & Business tiers get 6 months. When Deep-Live-Cam or RVC make breaking changes to their install process, we update the affected lessons.',
  },
  {
    id: 'real-face',
    question: 'Can I use a celebrity\'s face?',
    answer: 'No. This course explicitly teaches and requires a consent-first workflow. You may only use: your own face, a face you have a signed license to use, or an AI-generated face (no real person behind it). Using a celebrity\'s face without permission is a violation of our Acceptable Use Policy and can be illegal.',
  },
  {
    id: 'commercial',
    question: 'Can I use this for paid client work or ads?',
    answer: 'The Creator & Business tier includes the full commercial workflow: model-release templates, consent documentation, platform disclosure guidelines, and a 90-minute strategy call. The other tiers cover personal and educational use.',
  },
  {
    id: 'streaming',
    question: 'Can I stream live on Twitch or YouTube with this?',
    answer: 'Yes, OBS has native streaming outputs for Twitch, YouTube, and others. You\'d use your face-swap persona as the camera source. On a CPU, keep the resolution low and test the performance before going live.',
  },
  {
    id: 'video',
    question: 'Is there video content or just written guides?',
    answer: 'The Starter Guide is written (text + screenshots). The Complete Course adds a video walkthrough for every major step. The videos are served privately with a watermark — they are not publicly accessible.',
  },
  {
    id: 'support',
    question: 'What if I get stuck?',
    answer: 'The troubleshooting table covers every error we encountered during testing. There\'s also a "Report a problem" link on every lesson page. Done-With-You buyers get a live setup session. Business tier buyers get 90-day priority support.',
  },
  {
    id: 'python',
    question: 'I already have a different Python version installed. Will that cause problems?',
    answer: 'It can. The guide covers managing multiple Python versions: Python 3.10.11 for Deep-Live-Cam, and Python 3.12 for RVC. We show you how to install them side by side without breaking either.',
  },
];

function PlanCard() {
  const tier = PRICING_TIERS[0];
  const [planId, setPlanId] = useState<'once' | 'split'>(PAYMENT_OPTIONS[0].id);
  const selected = PAYMENT_OPTIONS.find((o) => o.id === planId) ?? PAYMENT_OPTIONS[0];

  return (
    <div className="mx-auto max-w-xl">
      {/* Payment toggle */}
      <div className="mb-6 flex justify-center">
        <div className="inline-flex rounded-full border border-[#E2E8F0] bg-white p-1 shadow-sm">
          {PAYMENT_OPTIONS.map((option) => {
            const active = option.id === planId;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => setPlanId(option.id)}
                aria-pressed={active}
                className={[
                  'touch-target relative rounded-full px-4 py-2.5 text-[13px] font-semibold transition-colors sm:px-5',
                  active ? 'bg-[#0B1220] text-white' : 'text-[#64748B] hover:text-[#0B1220]',
                ].join(' ')}
              >
                {option.label}
                {option.badge && (
                  <span
                    className={[
                      'ml-2 rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider',
                      active ? 'bg-white/15 text-white' : 'bg-[#EEF2FF] text-[#4F46E5]',
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

      <div className="overflow-hidden rounded-3xl border border-[#1E2A40] bg-[#0B1220] shadow-2xl shadow-indigo-500/10">
        <div className="border-b border-white/10 bg-gradient-to-br from-[#4F46E5]/20 via-transparent to-[#14B8A6]/10 p-6 sm:p-8">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A5B4FC]">
              {tier.badge}
            </span>
            <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white/60">
              Lifetime access
            </span>
          </div>

          <p className="font-display text-sm font-semibold text-[#A5B4FC]">{tier.name}</p>
          <div className="mt-1 flex flex-wrap items-end gap-3">
            <span className="font-display text-4xl font-black text-white sm:text-5xl">
              {formatNGN(selected.dueToday)}
            </span>
            {selected.id === 'once' ? (
              <span className="pb-1.5 text-sm text-white/40">one time, no renewal</span>
            ) : (
              <span className="pb-1.5 text-sm text-white/40">
                then {formatNGN(selected.dueLater)} in 30 days
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-white/45">
            {selected.note}. Total {formatNGN(tier.price)} either way.
          </p>

          <p className="mt-4 text-[13px] leading-relaxed text-white/60">{tier.description}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link to={`/checkout/${tier.id}?plan=${selected.id}`} className="sm:flex-1">
              <Button size="lg" className="w-full justify-center">
                {tier.cta}
                <Icon name="arrowRight" size={16} />
              </Button>
            </Link>
            <Link to="/free-lesson" className="sm:flex-1">
              <Button
                size="lg"
                variant="ghost"
                className="w-full justify-center border-white/20 text-white hover:bg-white/10"
              >
                Try the free lesson
              </Button>
            </Link>
          </div>
        </div>

        <ul className="grid gap-x-6 gap-y-3 p-6 sm:grid-cols-2 sm:p-8">
          {tier.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Icon name="check" size={15} className="mt-0.5 shrink-0 text-[#2DD4BF]" />
              <span className="text-[13px] leading-relaxed text-white/70">{feature}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-white/10 px-6 py-4 sm:px-8">
          <span className="flex items-center gap-1.5 text-[11px] text-white/45">
            <Icon name="lock" size={12} className="text-[#10B981]" />
            Secured by Paystack
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-white/45">
            <Icon name="shield" size={12} className="text-[#10B981]" />
            7-day fix-first refund
          </span>
          <span className="flex items-center gap-1.5 text-[11px] text-white/45">
            <Icon name="globe" size={12} className="text-[#10B981]" />
            Pay in NGN or any card
          </span>
        </div>
      </div>
    </div>
  );
}

export function Landing() {
  const [openModules, setOpenModules] = useState<Set<number>>(new Set([0]));

  function toggleModule(i: number) {
    setOpenModules((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }

  return (
    <div>
      {/* HERO — dark, with the companion phone mockup */}
      <section className="relative overflow-hidden bg-[#0B1220] pb-16 pt-28 sm:pb-24 sm:pt-36">
        <div className="absolute inset-0 opacity-90">
          <WebGLCanvas />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1220]/40 via-[#0B1220]/70 to-[#0B1220]" />
        <div className="grid-paper-dark absolute inset-0" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
            <div>
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-white/70 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ring rounded-full bg-[#14B8A6]" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#14B8A6]" />
                </span>
                Tested on a CPU-only Windows laptop
              </span>

              <h1 className="display-tight mb-6 text-[40px] text-white sm:text-6xl lg:text-[68px]">
                Build your own
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#818CF8] via-[#6366F1] to-[#2DD4BF]">
                  AI persona
                </span>{' '}
                on a normal laptop.
              </h1>

              <p className="mb-5 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg">
                No GPU. No paid tools. A 13-step course built on Deep-Live-Cam, OBS, RVC and VB-Cable,
                with every real error documented and fixed on the way.
              </p>

              <p className="mb-8 font-mono text-[11px] uppercase tracking-widest text-white/35">
                Deep-Live-Cam / OBS / RVC / VB-Cable / Windows
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Link to="/pricing" className="sm:w-auto">
                  <Button size="lg" className="w-full justify-center sm:w-auto">
                    Unlock everything for {formatNGN(159000)}
                    <Icon name="arrowRight" size={16} />
                  </Button>
                </Link>
                <Link to="/free-lesson" className="sm:w-auto">
                  <Button
                    size="lg"
                    variant="ghost"
                    className="w-full justify-center border-white/20 text-white hover:bg-white/10 sm:w-auto"
                  >
                    Try the free lesson
                  </Button>
                </Link>
              </div>

              <ul className="mt-8 flex flex-col gap-2.5 text-[13px] text-white/50 sm:flex-row sm:flex-wrap sm:gap-x-5">
                {[
                  `${SETUP_STEPS.length} guided steps`,
                  `${MISTAKE_VAULT.length} documented errors`,
                  'No GPU required',
                  '7-day refund guarantee',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <Icon name="checkCircle" size={14} className="text-[#10B981]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Phone + orbiting status chips */}
            <div className="relative">
              <div className="pointer-events-none absolute inset-0 hidden lg:block">
                <FloatingChip
                  icon="checkCircle"
                  title="Steps complete"
                  value="9 of 13 — saved locally"
                  className="absolute -left-10 top-6 animate-float"
                />
                <FloatingChip
                  icon="bolt"
                  title="Execution provider"
                  value="CPU, 640x480, 4 fps"
                  className="absolute -left-4 bottom-24 animate-float-slow"
                />
                <FloatingChip
                  icon="shield"
                  title="Consent check"
                  value="Synthetic face loaded"
                  className="absolute -right-6 top-40 animate-float-slow"
                />
              </div>

              <PhoneMockup />

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
                <FloatingChip icon="checkCircle" title="Steps complete" value="9 of 13" />
                <FloatingChip icon="bolt" title="Execution provider" value="CPU, 4 fps" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ToolMarquee />
      <ProductShowcase />


      {/* PROBLEM — three editorial cards */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <Badge variant="warning" className="mb-4">The problem</Badge>
            <h2 className="display-tight mb-4 text-3xl text-[#0B1220] sm:text-4xl lg:text-5xl">
              Other guides do not tell you this
            </h2>
            <p className="text-[15px] text-[#64748B]">
              Most tutorials skip the hard parts. Here is what they leave out.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {PROBLEMS.map((p) => (
              <Card key={p.title} className="text-center">
                <IconTile
                  name={p.icon}
                  tone={p.tone}
                  size="lg"
                  className="mb-4"
                />
                <h3 className="mb-2 font-display text-base font-bold text-[#0B1220]">{p.title}</h3>
                <p className="text-sm leading-relaxed text-[#64748B]">{p.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* OUTCOMES — bento grid */}
      <section id="learn" className="bg-[#F8FAFC] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <Badge variant="primary" className="mb-4">What you will learn</Badge>
            <h2 className="display-tight mb-4 text-3xl text-[#0B1220] sm:text-4xl lg:text-5xl">
              Eight outcomes, step by step
            </h2>
            <p className="mx-auto max-w-xl text-[15px] text-[#64748B]">
              Each one maps to a real screen you will see on your own machine — not theory.
            </p>
          </div>

          <div className="stagger grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {OUTCOMES.map((o, i) => (
              <div
                key={o.title}
                className={[
                  'rounded-2xl border border-[#E2E8F0] bg-white p-5 transition-all hover:border-[#C7C4FE] hover:shadow-md',
                  i === 0 ? 'lg:col-span-2 lg:row-span-1' : '',
                ].join(' ')}
              >
                <IconTile name={o.icon} size="md" className="mb-3" />
                <h3 className="mb-1.5 font-display text-sm font-bold leading-tight text-[#0B1220] sm:text-[15px]">
                  {o.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#64748B]">{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — four numbered steps */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <Badge variant="accent" className="mb-4">How it works</Badge>
            <h2 className="display-tight mb-4 text-3xl text-[#0B1220] sm:text-4xl lg:text-5xl">
              Four steps to your AI persona
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {STEPS.map((s) => (
              <div key={s.n} className="flex gap-4 border-t border-[#E2E8F0] pt-5 sm:gap-5">
                <div className="flex shrink-0 flex-col items-center gap-2">
                  <span className="font-mono text-[11px] font-bold text-[#4F46E5]">{s.n}</span>
                  <span className="w-px flex-1 bg-gradient-to-b from-[#C7D2FE] to-transparent" />
                </div>
                <div className="min-w-0">
                  <IconTile name={s.icon} size="sm" className="mb-3" />
                  <h3 className="mb-1 font-display text-[15px] font-bold text-[#0B1220]">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-[#64748B]">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SETUP ROADMAP — interactive, progress-saving step guide */}
      <section id="roadmap" className="border-t border-[#E2E8F0] bg-[#F8FAFC] py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SetupRoadmap />
        </div>
      </section>

      {/* DOWNLOAD HUB — where to go, with proof */}
      <section id="downloads" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <DownloadHub />
        </div>
      </section>

      {/* MISTAKE VAULT — searchable error decoder */}
      <section id="mistakes" className="bg-[#F8FAFC] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <ErrorDecoder />
        </div>
      </section>

      {/* CALL RECIPES — where to click in each app */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <CallRecipes />
        </div>
      </section>

      {/* COMMAND CENTER — copy/paste terminal blocks */}
      <section id="commands" className="relative overflow-hidden bg-[#0B1220] py-16 sm:py-24">
        <div className="grid-paper-dark absolute inset-0" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <CommandCenter />
        </div>
      </section>


      {/* CURRICULUM — accordion of modules and lessons */}
      <section id="curriculum" className="bg-[#F8FAFC] py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <Badge variant="primary" className="mb-4">Curriculum</Badge>
            <h2 className="display-tight mb-4 text-3xl text-[#0B1220] sm:text-4xl lg:text-5xl">
              Every module, every lesson
            </h2>
            <p className="text-[15px] text-[#64748B]">
              The first lesson is free, no account needed. The rest unlock together at one price.
            </p>
          </div>

          <div className="space-y-3">
            {MODULES.map((mod, i) => (
              <div key={mod.slug} className="overflow-hidden rounded-2xl border border-[#E2E8F0] bg-white">
                <button
                  onClick={() => toggleModule(i)}
                  aria-expanded={openModules.has(i)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-[#F8FAFC] sm:px-5"
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#EEF2FF] text-[11px] font-bold text-[#4F46E5]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-sm font-bold text-[#0B1220]">{mod.title}</span>
                      <span className="block truncate text-xs text-[#94A3B8]">
                        {mod.lessons.length} lessons
                      </span>
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    {mod.tier === 'business' && <Badge variant="warning">Business</Badge>}
                    {mod.tier === 'complete' && <Badge variant="primary">Complete+</Badge>}
                    <Icon
                      name="chevronDown"
                      size={15}
                      className={[
                        'text-[#94A3B8] transition-transform',
                        openModules.has(i) ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </span>
                </button>

                {openModules.has(i) && (
                  <div className="border-t border-[#F1F5F9]">
                    {mod.lessons.map((lesson, j) => (
                      <div
                        key={lesson.slug}
                        className="flex items-center gap-3 border-b border-[#F1F5F9] px-4 py-3 last:border-0 sm:px-5"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#E2E8F0] text-[10px] text-[#94A3B8]">
                          {j + 1}
                        </span>
                        <span className="min-w-0 flex-1 break-anywhere text-sm text-[#374151]">
                          {lesson.title}
                        </span>
                        <span className="flex shrink-0 items-center gap-2">
                          <span className="text-xs text-[#94A3B8]">{lesson.estimatedMinutes}m</span>
                          {lesson.isFree ? (
                            <Badge variant="success">Free</Badge>
                          ) : (
                            <Icon name="lock" size={13} className="text-[#CBD5E1]" />
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/free-lesson">
              <Button size="lg" variant="secondary">
                Start the free lesson
                <Icon name="arrowRight" size={15} />
              </Button>
            </Link>
          </div>
        </div>
      </section>


      {/* AUDIENCE — for / not for */}
      <section className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-[#BBF7D0] bg-[#F0FDF4] p-6 sm:p-8">
              <h3 className="mb-5 flex items-center gap-2 font-display text-base font-bold text-[#16A34A] sm:text-lg">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white text-sm">
                  <Icon name="check" size={14} />
                </span>
                This is for you if
              </h3>
              <ul className="space-y-3">
                {AUDIENCE_YES.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#374151]">
                    <Icon name="checkCircle" size={15} className="mt-0.5 shrink-0 text-[#10B981]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-[#FECACA] bg-[#FEF2F2] p-6 sm:p-8">
              <h3 className="mb-5 flex items-center gap-2 font-display text-base font-bold text-[#DC2626] sm:text-lg">
                <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-white text-sm">
                  <Icon name="x" size={14} />
                </span>
                This is not for you if
              </h3>
              <ul className="space-y-3">
                {AUDIENCE_NO.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-[#374151]">
                    <Icon name="xCircle" size={15} className="mt-0.5 shrink-0 text-[#EF4444]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* PRICING — one product, one price */}
      <section id="pricing" className="relative overflow-hidden bg-[#F8FAFC] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-4 text-center">
            <Badge variant="primary" className="mb-4">Pricing</Badge>
            <h2 className="display-tight mb-4 text-3xl text-[#0B1220] sm:text-4xl lg:text-5xl">
              One price. Everything opens.
            </h2>
            <p className="mx-auto max-w-xl text-[15px] text-[#64748B]">
              All prices in Nigerian Naira (₦). One-time payment or two instalments, both totalling{' '}
              {formatNGN(159000)}. No subscription, no renewal, no locked tier.
            </p>
          </div>

          <div className="mt-8">
            <PlanCard />
          </div>

          {/* What the money buys, in four groups */}
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ALL_ACCESS_GROUPS.map((group) => (
              <div key={group.id} className="rounded-2xl border border-[#E2E8F0] bg-white p-5">
                <IconTile name={group.icon} size="md" className="mb-3" />
                <h3 className="mb-3 font-display text-sm font-bold text-[#0B1220]">{group.title}</h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-xs leading-relaxed text-[#64748B]">
                      <Icon name="check" size={12} className="mt-0.5 shrink-0 text-[#4F46E5]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link to="/pricing">
              <Button size="lg">
                Compare on the pricing page
                <Icon name="arrowRight" size={15} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* HARDWARE NOTE */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Callout type="warning" title="Honest hardware note">
            Live video face swap on a PC without a GPU is slow, typically 2 to 5 frames per second. It is
            fine for testing your setup and for recording short clips. For smooth live calls or streams,
            you really do need an NVIDIA GTX 1660 or better. Recording content works very well on a
            CPU-only machine, and that is what this course was recorded on.
          </Callout>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="bg-[#F8FAFC] py-16">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
          <div className="rounded-3xl border border-[#E2E8F0] bg-white p-8 shadow-sm sm:p-10">
            <IconTile name="shield" tone="emerald" size="lg" className="mx-auto mb-5" />
            <h2 className="display-tight mb-3 text-2xl text-[#0B1220] sm:text-3xl">
              7-day fix-first refund
            </h2>
            <p className="mb-4 text-[15px] leading-relaxed text-[#64748B]">
              If you followed every step exactly and the tools genuinely do not run on your machine,
              contact us within 7 days with your error log and system specs. We will help you fix it
              first. If we cannot, we refund you in full.
            </p>
            <p className="text-xs leading-relaxed text-[#94A3B8]">
              Refunds are not available for a change of mind, or for hardware we explicitly warned
              would not work well.
            </p>
          </div>
        </div>
      </section>


      {/* FAQ */}
      <section id="faq" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-12 text-center">
            <Badge variant="outline" className="mb-4">FAQ</Badge>
            <h2 className="display-tight mb-4 text-3xl text-[#0B1220] sm:text-4xl">
              Questions and answers
            </h2>
          </div>
          <Accordion items={FAQ_ITEMS} allowMultiple />
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden bg-[#0B1220] py-20 sm:py-28">
        <div className="absolute inset-0 opacity-30">
          <WebGLCanvas />
        </div>
        <div className="grid-paper-dark absolute inset-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="display-tight mb-5 text-3xl text-white sm:text-5xl">
            Ready to build your persona?
          </h2>
          <p className="mb-8 text-base leading-relaxed text-white/55 sm:text-lg">
            Start with the free lesson, or unlock all 13 roadmap steps, {MISTAKE_VAULT.length} decoded
            errors and every command in one payment.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link to="/pricing" className="sm:w-auto">
              <Button size="lg" className="w-full justify-center sm:w-auto">
                Get everything for {formatNGN(159000)}
                <Icon name="arrowRight" size={16} />
              </Button>
            </Link>
            <Link to="/free-lesson" className="sm:w-auto">
              <Button
                size="lg"
                variant="ghost"
                className="w-full justify-center border-white/20 text-white hover:bg-white/10 sm:w-auto"
              >
                Try free first
              </Button>
            </Link>
          </div>

          <ul className="mt-8 flex flex-col items-center gap-2 text-xs text-white/40 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-5">
            {[
              `${getTotalSetupMinutes()} minutes of guided setup`,
              'Lifetime access',
              'Paid by Paystack or Selar',
            ].map((item) => (
              <li key={item} className="flex items-center gap-1.5">
                <Icon name="check" size={12} className="text-[#10B981]" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
