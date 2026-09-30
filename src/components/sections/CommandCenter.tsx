import { useState } from 'react';
import { Icon } from '../ui/Icon';
import { CommandBlock } from '../ui/CommandBlock';
import { COMMAND_PHASES } from '../../config/setup';

/**
 * CommandCenter — every terminal command in the course, grouped by phase and
 * copy-ready. Designed to be used with the terminal open beside the browser.
 */
export function CommandCenter() {
  const [active, setActive] = useState(COMMAND_PHASES[0].id);
  const phase = COMMAND_PHASES.find((p) => p.id === active) ?? COMMAND_PHASES[0];

  return (
    <div>
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#A5B4FC]">
          <Icon name="terminal" size={13} />
          The Command Center
        </span>
        <h2 className="display-tight mb-4 text-3xl text-white sm:text-4xl lg:text-5xl">
          Copy once. Paste once. Move on.
        </h2>
        <p className="text-[15px] leading-relaxed text-white/55">
          Every command in the course, in the order you need it, with a plain-English note about what
          success looks like. No retyping long paths at 1am.
        </p>
      </div>

      {/* Phase tabs — horizontal rail on mobile */}
      <div className="no-scrollbar mb-6 flex gap-2 overflow-x-auto pb-1">
        {COMMAND_PHASES.map((p, i) => {
          const isActive = p.id === active;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActive(p.id)}
              aria-current={isActive ? 'true' : undefined}
              className={[
                'touch-target flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-left text-xs font-semibold transition-colors',
                isActive
                  ? 'border-[#6366F1] bg-[#4F46E5] text-white'
                  : 'border-white/12 bg-white/[0.04] text-white/60 hover:bg-white/[0.08] hover:text-white',
              ].join(' ')}
            >
              <span
                className={[
                  'flex h-5 w-5 items-center justify-center rounded-md font-mono text-[10px]',
                  isActive ? 'bg-white/20' : 'bg-white/10',
                ].join(' ')}
              >
                {i + 1}
              </span>
              <span className="hidden sm:inline">{p.title.replace(/^\d+\.\s*/, '')}</span>
              <span className="sm:hidden">{p.title.split(' ')[0]}</span>
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 sm:p-6">
        <div className="mb-4 flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-[#A5B4FC]">
            <Icon name={phase.icon} size={18} />
          </span>
          <div className="min-w-0">
            <h3 className="font-display text-base font-bold text-white sm:text-lg">{phase.title}</h3>
            <p className="text-[13px] leading-relaxed text-white/50">{phase.summary}</p>
          </div>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          {phase.commands.map((cmd) => (
            <CommandBlock key={cmd.label} label={cmd.label} code={cmd.code} note={cmd.note} />
          ))}
        </div>
      </div>

      <p className="mt-5 flex items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-3 text-xs leading-relaxed text-white/50">
        <Icon name="info" size={13} className="mt-0.5 shrink-0 text-[#818CF8]" />
        <span>
          These are Windows Command Prompt commands. On PowerShell, chain them with a semicolon instead
          of an ampersand. Always paste into a freshly opened terminal so PATH changes are picked up.
        </span>
      </p>
    </div>
  );
}
