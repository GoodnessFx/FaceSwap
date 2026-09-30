import { Link } from 'react-router-dom';
import { Icon } from '../ui/Icon';
import { PhoneMockup } from '../ui/PhoneMockup';

function FloatCard({
  icon,
  title,
  value,
  sub,
  className = '',
}: {
  icon: 'checkCircle' | 'bolt' | 'shield' | 'cpu' | 'clock' | 'mic' | 'sliders' | 'route';
  title: string;
  value: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div
      className={[
        'w-[210px] rounded-2xl border border-[#E7E5E4] bg-white p-3 shadow-[0_18px_40px_-24px_rgba(15,23,42,0.35)]',
        className,
      ].join(' ')}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#F5F5F4] text-[#4F46E5]">
          <Icon name={icon} size={15} />
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E]">
            {title}
          </span>
          <span className="block truncate text-[13px] font-bold text-[#0B1220]">{value}</span>
        </span>
      </div>
      {sub && <p className="mt-2 text-[11px] leading-relaxed text-[#78716C]">{sub}</p>}
    </div>
  );
}

/**
 * ProductShowcase — the light, editorial "one pipeline" panel.
 * The left column tells the story, the right column shows the companion app,
 * and the floating cards carry the proof points.
 */
export function ProductShowcase() {
  return (
    <section className="relative overflow-hidden bg-[#F7F6F4]">
      <div className="grid-paper absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-8">
          <div className="animate-rise">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#4F46E5]">
              The pipeline
            </p>
            <h2 className="display-tight mb-5 text-[34px] text-[#0B1220] sm:text-5xl lg:text-[56px]">
              One laptop.
              <br />
              Webcam in,
              <br />
              <span className="text-[#4F46E5]">persona out.</span>
            </h2>
            <p className="mb-7 max-w-md text-[15px] leading-relaxed text-[#57534E]">
              Your camera feeds Deep-Live-Cam. OBS captures the result and publishes it as a virtual
              camera. Your voice goes through RVC and out of a virtual microphone. Every call app sees a
              normal webcam and a normal mic. Nothing here is expensive, and nothing here is hidden from
              you.
            </p>

            <div className="mb-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/pricing"
                className="touch-target inline-flex items-center justify-center gap-2 rounded-full bg-[#0B1220] px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#1E2A40]"
              >
                Unlock the full build
                <Icon name="arrowRight" size={15} />
              </Link>
              <Link
                to="/free-lesson"
                className="touch-target inline-flex items-center justify-center gap-2 rounded-full border border-[#E7E5E4] bg-white px-6 py-3.5 text-sm font-semibold text-[#0B1220] transition-colors hover:border-[#C7C4FE] hover:text-[#4F46E5]"
              >
                Read the free lesson
              </Link>
            </div>

            <dl className="grid grid-cols-3 gap-4 border-t border-[#E7E5E4] pt-6">
              {[
                { k: '0', v: 'paid tools required' },
                { k: '13', v: 'guided install steps' },
                { k: '18', v: 'documented errors' },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-2xl font-black text-[#0B1220] sm:text-3xl">{s.k}</dt>
                  <dd className="mt-0.5 text-[11px] leading-snug text-[#78716C]">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-0 hidden lg:block">
              <FloatCard
                icon="cpu"
                title="Execution provider"
                value="CPU, 4 fps"
                sub="Recorded content stays smooth at 640x480."
                className="absolute -left-16 top-4 animate-float-slow"
              />
              <FloatCard
                icon="route"
                title="Roadmap"
                value="9 of 13 done"
                sub="Progress is remembered on this device."
                className="absolute -left-10 bottom-16 animate-float"
              />
              <FloatCard
                icon="shield"
                title="Consent check"
                value="Synthetic face"
                sub="No real person behind the source image."
                className="absolute -right-14 top-24 animate-float"
              />
              <FloatCard
                icon="clock"
                title="Total build time"
                value="2h 41m"
                sub="Including downloads and the two fixes."
                className="absolute -right-10 bottom-10 animate-float-slow"
              />
            </div>

            <PhoneMockup />

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:hidden">
              <FloatCard icon="cpu" title="Execution provider" value="CPU, 4 fps" sub="Stable at 640x480." />
              <FloatCard icon="route" title="Roadmap" value="9 of 13 done" sub="Saved on this device." />
              <FloatCard icon="shield" title="Consent check" value="Synthetic face" sub="No real person behind it." />
              <FloatCard icon="clock" title="Total build time" value="2h 41m" sub="Downloads included." />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
