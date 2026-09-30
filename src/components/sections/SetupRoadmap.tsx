import { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from '../ui/Icon';
import { CommandBlock, InlineCommand } from '../ui/CommandBlock';
import { SETUP_STEPS, SETUP_PHASES, type SetupStep } from '../../config/setup';
import { getTotalMistakes, getTotalSetupMinutes } from '../../config/setup';

const STORAGE_KEY = 'faceswap.setup.progress.v1';

function DifficultyDots({ level }: { level: 1 | 2 | 3 }) {
  const labels = { 1: 'Easy', 2: 'Medium', 3: 'Involved' } as const;
  return (
    <span className="inline-flex items-center gap-1.5" title={`Difficulty: ${labels[level]}`}>
      <span className="flex gap-1" aria-hidden="true">
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={[
              'h-1.5 w-1.5 rounded-full',
              i <= level ? 'bg-[#4F46E5]' : 'bg-[#E2E8F0]',
            ].join(' ')}
          />
        ))}
      </span>
      <span className="text-[11px] font-medium text-[#94A3B8]">{labels[level]}</span>
    </span>
  );
}

function PhaseChips({
  active,
  onChange,
  counts,
}: {
  active: 'all' | (typeof SETUP_PHASES)[number];
  onChange: (p: 'all' | (typeof SETUP_PHASES)[number]) => void;
  counts: Record<string, number>;
}) {
  const options: Array<'all' | (typeof SETUP_PHASES)[number]> = ['all', ...SETUP_PHASES];
  return (
    <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
      {options.map((opt) => {
        const isActive = active === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={[
              'touch-target flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors',
              isActive
                ? 'border-[#4F46E5] bg-[#4F46E5] text-white'
                : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#C7C4FE] hover:text-[#0B1220]',
            ].join(' ')}
          >
            {opt === 'all' ? 'All 13 steps' : opt}
            <span
              className={[
                'rounded-full px-1.5 py-0.5 text-[10px]',
                isActive ? 'bg-white/20 text-white' : 'bg-[#F1F5F9] text-[#94A3B8]',
              ].join(' ')}
            >
              {counts[opt] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}

function StatPill({
  icon,
  value,
  label,
}: {
  icon: 'route' | 'clock' | 'bug' | 'checkCircle';
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-[#E2E8F0] bg-white px-3.5 py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#4F46E5]">
        <Icon name={icon} size={16} />
      </span>
      <span className="min-w-0">
        <span className="block font-display text-lg font-black leading-none text-[#0B1220]">
          {value}
        </span>
        <span className="block truncate text-[11px] text-[#94A3B8]">{label}</span>
      </span>
    </div>
  );
}

function StepCard({
  step,
  open,
  done,
  onToggleOpen,
  onToggleDone,
}: {
  step: SetupStep;
  open: boolean;
  done: boolean;
  onToggleOpen: () => void;
  onToggleDone: () => void;
}) {
  const panelId = `setup-panel-${step.id}`;
  const buttonId = `setup-button-${step.id}`;

  return (
    <article
      className={[
        'overflow-hidden rounded-2xl border bg-white transition-shadow',
        done ? 'border-[#BBF7D0] shadow-[0_1px_0_0_#BBF7D0]' : 'border-[#E2E8F0]',
        open ? 'shadow-lg shadow-slate-200/60' : '',
      ].join(' ')}
    >
      <div className="flex items-start gap-3 p-4 sm:gap-4 sm:p-5">
        <button
          type="button"
          onClick={onToggleDone}
          aria-label={done ? `Mark step ${step.order} as not done` : `Mark step ${step.order} as done`}
          className={[
            'touch-target mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-black transition-colors',
            done
              ? 'border-[#10B981] bg-[#10B981] text-white'
              : 'border-[#E2E8F0] bg-[#F8FAFC] text-[#64748B] hover:border-[#4F46E5] hover:text-[#4F46E5]',
          ].join(' ')}
        >
          {done ? <Icon name="check" size={16} /> : step.order}
        </button>

        <button
          id={buttonId}
          type="button"
          onClick={onToggleOpen}
          aria-expanded={open}
          aria-controls={panelId}
          className="min-w-0 flex-1 text-left"
        >
          <span className="mb-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="rounded-full bg-[#EEF2FF] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#4F46E5]">
              {step.phase}
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] text-[#94A3B8]">
              <Icon name="clock" size={12} />
              {step.minutes} min
            </span>
            <DifficultyDots level={step.difficulty} />
          </span>
          <span
            className={[
              'block font-display text-[15px] font-bold leading-snug sm:text-base',
              done ? 'text-[#94A3B8] line-through decoration-[#BBF7D0]' : 'text-[#0B1220]',
            ].join(' ')}
          >
            {step.title}
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-[#64748B] sm:text-[13px]">
            {step.outcome}
          </span>
        </button>

        <span
          className={[
            'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#94A3B8] transition-transform',
            open ? 'rotate-180 bg-[#F1F5F9]' : '',
          ].join(' ')}
          aria-hidden="true"
        >
          <Icon name="chevronDown" size={15} />
        </span>
      </div>

      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={[
          'grid transition-all duration-300 ease-out',
          open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        ].join(' ')}
      >
        <div className="overflow-hidden">
          <div className="space-y-5 border-t border-[#F1F5F9] p-4 sm:p-5">
            {step.links.length > 0 && (
              <section>
                <h4 className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  <Icon name="link" size={12} />
                  Where to go
                </h4>
                <ul className="space-y-2">
                  {step.links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-start gap-3 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 transition-colors hover:border-[#C7C4FE] hover:bg-[#EEF2FF]"
                      >
                        <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white text-[#4F46E5] ring-1 ring-[#E2E8F0]">
                          <Icon name="external" size={13} />
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-1.5 text-[13px] font-semibold text-[#0B1220] group-hover:text-[#4F46E5]">
                            {link.label}
                            <Icon name="arrowRight" size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
                          </span>
                          <span className="mt-0.5 block break-anywhere font-mono text-[10.5px] text-[#94A3B8]">
                            {link.url.replace(/^https?:\/\//, '')}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-[#64748B]">
                            {link.note}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section>
              <h4 className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                <Icon name="clipboard" size={12} />
                What to do, in order
              </h4>
              <ol className="space-y-2.5">
                {step.actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-[10px] font-bold text-[#4F46E5]">
                      {i + 1}
                    </span>
                    <span className="text-[13px] leading-relaxed text-[#374151]">{action}</span>
                  </li>
                ))}
              </ol>
            </section>

            {step.verify && (
              <section>
                <h4 className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  <Icon name="terminal" size={12} />
                  Prove it worked
                </h4>
                {step.verify.command.includes('\n') ? (
                  <CommandBlock code={step.verify.command} label="Command Prompt" />
                ) : (
                  <InlineCommand code={step.verify.command} />
                )}
                <p className="mt-2 flex items-start gap-2 rounded-xl bg-[#F0FDF4] px-3 py-2 text-xs leading-relaxed text-[#15803D]">
                  <Icon name="checkCircle" size={13} className="mt-0.5 shrink-0" />
                  <span>{step.verify.expect}</span>
                </p>
              </section>
            )}

            <section>
              <h4 className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#B45309]">
                <Icon name="warning" size={12} />
                Mistakes to avoid here
              </h4>
              <ul className="space-y-2">
                {step.mistakes.map((m, i) => (
                  <li key={i} className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] p-3">
                    <p className="flex items-start gap-2 text-[13px] font-semibold leading-snug text-[#92400E]">
                      <Icon name="xCircle" size={14} className="mt-0.5 shrink-0 text-[#D97706]" />
                      <span>{m.trap}</span>
                    </p>
                    <p className="mt-1.5 flex items-start gap-2 pl-5 text-xs leading-relaxed text-[#78350F]">
                      <Icon name="arrowRight" size={13} className="mt-0.5 shrink-0 text-[#15803D]" />
                      <span>{m.fix}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {step.screenshot && (
              <figure className="overflow-hidden rounded-xl border border-[#E2E8F0] bg-[#F8FAFC]">
                <img
                  src={step.screenshot.src}
                  alt={step.screenshot.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-cover"
                />
                <figcaption className="border-t border-[#E2E8F0] px-3 py-2 text-[11px] leading-relaxed text-[#64748B]">
                  {step.screenshot.caption}
                </figcaption>
              </figure>
            )}

            {step.tip && (
              <p className="flex items-start gap-2 rounded-xl border border-[#C7D2FE] bg-[#EEF2FF] px-3 py-2.5 text-xs leading-relaxed text-[#3730A3]">
                <Icon name="spark" size={13} className="mt-0.5 shrink-0" />
                <span>
                  <strong className="font-bold">Pro tip: </strong>
                  {step.tip}
                </span>
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                type="button"
                onClick={onToggleDone}
                className={[
                  'touch-target inline-flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold transition-colors',
                  done
                    ? 'border border-[#E2E8F0] bg-white text-[#64748B] hover:bg-[#F8FAFC]'
                    : 'bg-[#0B1220] text-white hover:bg-[#1E2A40]',
                ].join(' ')}
              >
                <Icon name={done ? 'refresh' : 'check'} size={14} />
                {done ? 'Mark as not done' : 'Mark this step done'}
              </button>
              <span className="text-[11px] text-[#94A3B8]">
                Progress is saved in this browser only.
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}



export interface SetupRoadmapProps {
  /** Starts with every card collapsed instead of opening the first one. */
  collapseAll?: boolean;
  /** Hides the section heading — used when embedded inside an existing page header. */
  hideHeading?: boolean;
}

export function SetupRoadmap({ collapseAll = false, hideHeading = false }: SetupRoadmapProps) {
  const [done, setDone] = useState<Set<string>>(new Set());
  const [openIds, setOpenIds] = useState<Set<string>>(
    collapseAll ? new Set() : new Set([SETUP_STEPS[0].id])
  );
  const [phase, setPhase] = useState<'all' | (typeof SETUP_PHASES)[number]>('all');
  const [hydrated, setHydrated] = useState(false);

  // Restore progress from the browser so a returning visitor keeps their place.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as string[];
        if (Array.isArray(parsed)) setDone(new Set(parsed));
      }
    } catch {
      /* storage unavailable — progress simply starts empty */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...done]));
    } catch {
      /* ignore quota or privacy-mode failures */
    }
  }, [done, hydrated]);

  const toggleDone = useCallback((id: string) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleOpen = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: SETUP_STEPS.length };
    for (const p of SETUP_PHASES) {
      map[p] = SETUP_STEPS.filter((s) => s.phase === p).length;
    }
    return map;
  }, []);

  const visible = phase === 'all' ? SETUP_STEPS : SETUP_STEPS.filter((s) => s.phase === phase);
  const percent = Math.round((done.size / SETUP_STEPS.length) * 100);

  return (
    <div>
      {!hideHeading && (
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
            <Icon name="route" size={13} />
            The Setup Roadmap
          </span>
          <h2 className="display-tight mb-4 text-3xl text-[#0B1220] sm:text-4xl lg:text-5xl">
            Thirteen steps. Every tab, every click, every error.
          </h2>
          <p className="text-[15px] leading-relaxed text-[#64748B]">
            This is not a list of topics. It is the actual sequence that produced a working persona on
            a CPU-only laptop, including the parts that broke. Tick each step as you finish it and the
            page remembers where you stopped.
          </p>
        </div>
      )}

      {/* Progress + stats */}
      <div className="mb-6 rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="font-display text-lg font-black text-[#0B1220]">
              {done.size} of {SETUP_STEPS.length} steps complete
            </p>
            <p className="text-xs text-[#94A3B8]">
              {percent === 100
                ? 'Every step ticked. You have a working persona pipeline.'
                : `${percent}% of the build. Keep going — nothing here is reversible or risky.`}
            </p>
          </div>
          <span className="rounded-full bg-[#F1F5F9] px-3 py-1 font-mono text-xs font-bold text-[#4F46E5]">
            {percent}%
          </span>
        </div>
        <div
          className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#F1F0FE]"
          role="progressbar"
          aria-valuenow={done.size}
          aria-valuemin={0}
          aria-valuemax={SETUP_STEPS.length}
          aria-label="Setup progress"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#4F46E5] to-[#14B8A6] transition-all duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatPill icon="route" value={String(SETUP_STEPS.length)} label="Guided steps" />
        <StatPill
          icon="clock"
          value={`${Math.round(getTotalSetupMinutes() / 60)}h ${getTotalSetupMinutes() % 60}m`}
          label="Realistic total time"
        />
        <StatPill icon="bug" value={String(getTotalMistakes())} label="Documented traps" />
        <StatPill icon="checkCircle" value="CPU" label="GPU required: no" />
      </div>

      <div className="mb-5">
        <PhaseChips active={phase} onChange={setPhase} counts={counts} />
      </div>

      <div className="space-y-3">
        {visible.map((step) => (
          <StepCard
            key={step.id}
            step={step}
            open={openIds.has(step.id)}
            done={done.has(step.id)}
            onToggleOpen={() => toggleOpen(step.id)}
            onToggleDone={() => toggleDone(step.id)}
          />
        ))}
      </div>

      <p className="mt-5 flex items-start gap-2 rounded-xl border border-[#E2E8F0] bg-white px-3.5 py-3 text-xs leading-relaxed text-[#64748B]">
        <Icon name="info" size={13} className="mt-0.5 shrink-0 text-[#4F46E5]" />
        <span>
          The roadmap tracks your progress locally, so you can close the tab and come back. Links open
          the official pages for each tool — always check the publisher name in the address bar before
          you download anything.
        </span>
      </p>
    </div>
  );
}

