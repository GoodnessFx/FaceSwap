import { Icon } from './Icon';

/**
 * PhoneMockup — a CSS-only device frame showing the FaceSwap Studio companion.
 *
 * Deliberately no images: every pixel is markup so it stays crisp, themeable,
 * and honest about being a mockup of the product UI.
 */
export function PhoneMockup({ className = '' }: { className?: string }) {
  return (
    <div
      className={['relative mx-auto w-full max-w-[290px] sm:max-w-[310px]', className].join(' ')}
      aria-hidden="true"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-10 rounded-[60px] bg-[radial-gradient(circle_at_50%_30%,rgba(79,70,229,0.35),transparent_65%)] blur-2xl" />

      {/* Device */}
      <div className="relative rounded-[42px] border border-white/15 bg-[#0B1220] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)] ring-1 ring-black/40">
        <div className="relative overflow-hidden rounded-[34px] bg-[#080D18]">
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-3 pb-1 text-[10px] font-semibold text-white/60">
            <span>9:41</span>
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-4 rounded-sm bg-white/50" />
              <span className="h-1.5 w-2.5 rounded-sm bg-white/30" />
            </span>
          </div>

          {/* Notch */}
          <div className="mx-auto -mt-1 mb-1 h-4 w-20 rounded-full bg-black/70" />

          {/* Persona preview */}
          <div className="mx-3 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#1E2A40] via-[#131C2E] to-[#0B1220]">
            <div className="relative flex h-40 items-center justify-center">
              <span className="absolute h-24 w-24 rounded-full border border-white/10" />
              <span className="absolute h-24 w-24 rounded-full border border-[#4F46E5]/50 animate-ring" />
              <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80">
                <Icon name="face" size={30} />
              </span>
              <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[#10B981]/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#4ADE80]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
                Live
              </span>
              <span className="absolute right-2 top-2 rounded-full bg-black/40 px-2 py-0.5 font-mono text-[9px] text-white/60">
                480p / 4 fps
              </span>
              <span className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 rounded-lg bg-black/40 px-2 py-1 text-[9px] text-white/60">
                <Icon name="cpu" size={11} />
                CPUExecutionProvider
              </span>
            </div>
          </div>

          {/* Pipeline rows */}
          <div className="mt-3 space-y-1.5 px-3">
            {[
              { icon: 'face' as const, label: 'Deep-Live-Cam', value: 'Running', tone: 'ok' as const },
              { icon: 'video' as const, label: 'OBS Virtual Camera', value: 'On air', tone: 'ok' as const },
              { icon: 'mic' as const, label: 'RVC realtime_gui', value: 'Buffering', tone: 'warn' as const },
              { icon: 'plug' as const, label: 'CABLE Output', value: 'Idle', tone: 'idle' as const },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-2.5 py-2"
              >
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/10 text-white/70">
                  <Icon name={row.icon} size={13} />
                </span>
                <span className="min-w-0 flex-1 truncate text-[10.5px] font-medium text-white/75">
                  {row.label}
                </span>
                <span
                  className={[
                    'shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-bold',
                    row.tone === 'ok'
                      ? 'bg-[#10B981]/15 text-[#4ADE80]'
                      : row.tone === 'warn'
                        ? 'bg-[#F59E0B]/15 text-[#FBBF24]'
                        : 'bg-white/10 text-white/45',
                  ].join(' ')}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Step progress */}
          <div className="mx-3 mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="flex items-center justify-between text-[10px] text-white/55">
              <span>Setup Roadmap</span>
              <span className="font-mono text-white/80">step 9 / 13</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div className="h-full w-[69%] rounded-full bg-gradient-to-r from-[#6366F1] to-[#2DD4BF]" />
            </div>
            <p className="mt-2 text-[10px] leading-snug text-white/45">
              Next: turn your persona into a camera any app can use.
            </p>
          </div>

          {/* Bottom nav */}
          <div className="mt-3 flex items-center justify-around border-t border-white/10 bg-black/30 px-2 py-2.5">
            {(['route', 'book', 'video', 'shield'] as const).map((n, i) => (
              <span
                key={n}
                className={[
                  'flex h-7 w-7 items-center justify-center rounded-lg',
                  i === 0 ? 'bg-[#4F46E5] text-white' : 'text-white/35',
                ].join(' ')}
              >
                <Icon name={n} size={14} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


/** The small floating status chips that orbit the phone in the hero. */
export function FloatingChip({
  icon,
  title,
  value,
  className = '',
}: {
  icon: 'checkCircle' | 'bolt' | 'shield' | 'cpu' | 'clock' | 'mic';
  title: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={[
        'flex items-center gap-2.5 rounded-2xl border border-white/15 bg-white/[0.07] px-3 py-2.5 backdrop-blur-md',
        'shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)]',
        className,
      ].join(' ')}
    >
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#4F46E5]/25 text-[#A5B4FC]">
        <Icon name={icon} size={14} />
      </span>
      <span className="min-w-0">
        <span className="block text-[10px] uppercase tracking-wider text-white/40">{title}</span>
        <span className="block truncate text-xs font-semibold text-white/90">{value}</span>
      </span>
    </div>
  );
}
