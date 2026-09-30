import { useMemo, useState } from 'react';
import { Icon } from '../ui/Icon';
import { InlineCommand } from '../ui/CommandBlock';
import { MISTAKE_VAULT, ERROR_LOCATIONS, type ErrorEntry } from '../../config/setup';

const SEVERITY_META: Record<
  ErrorEntry['severity'],
  { label: string; chip: string; dot: string }
> = {
  blocker: {
    label: 'Stops the build',
    chip: 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]',
    dot: 'bg-[#EF4444]',
  },
  annoying: {
    label: 'Slows you down',
    chip: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
    dot: 'bg-[#F59E0B]',
  },
  cosmetic: {
    label: 'Looks broken, is not',
    chip: 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]',
    dot: 'bg-[#94A3B8]',
  },
};

export function ErrorDecoder() {
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState<'all' | (typeof ERROR_LOCATIONS)[number]>('all');
  const [severity, setSeverity] = useState<'all' | ErrorEntry['severity']>('all');
  const [openId, setOpenId] = useState<string | null>(MISTAKE_VAULT[0].id);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MISTAKE_VAULT.filter((entry) => {
      if (location !== 'all' && entry.where !== location) return false;
      if (severity !== 'all' && entry.severity !== severity) return false;
      if (!q) return true;
      return (
        entry.symptom.toLowerCase().includes(q) ||
        entry.cause.toLowerCase().includes(q) ||
        entry.fix.toLowerCase().includes(q) ||
        (entry.command ?? '').toLowerCase().includes(q)
      );
    });
  }, [query, location, severity]);

  const blockerCount = MISTAKE_VAULT.filter((e) => e.severity === 'blocker').length;

  return (
    <div>
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FECACA] bg-[#FEF2F2] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#DC2626]">
          <Icon name="bug" size={13} />
          The Mistake Vault
        </span>
        <h2 className="display-tight mb-4 text-3xl text-[#0B1220] sm:text-4xl lg:text-5xl">
          Every error, decoded before you hit it.
        </h2>
        <p className="text-[15px] leading-relaxed text-[#64748B]">
          {MISTAKE_VAULT.length} failures recorded on the test machine, including {blockerCount} that
          stop the build outright. Search the words you see on screen and the fix appears.
        </p>
      </div>

      <div className="mb-5 rounded-2xl border border-[#E2E8F0] bg-white p-4">
        <label className="relative block">
          <span className="sr-only">Search errors</span>
          <Icon
            name="search"
            size={16}
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Paste the error text, or type a keyword like onnxruntime"
            className="w-full rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] py-3 pl-10 pr-3 text-sm text-[#0B1220] placeholder:text-[#94A3B8] focus:border-[#4F46E5] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5]/20"
          />
        </label>

        <div className="mt-3 space-y-2">
          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-0.5">
            {(['all', ...ERROR_LOCATIONS] as const).map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setLocation(loc)}
                className={[
                  'touch-target shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                  location === loc
                    ? 'border-[#0B1220] bg-[#0B1220] text-white'
                    : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#C7C4FE]',
                ].join(' ')}
              >
                {loc === 'all' ? 'Every stage' : loc}
              </button>
            ))}
          </div>

          <div className="no-scrollbar flex gap-2 overflow-x-auto pb-0.5">
            {(['all', 'blocker', 'annoying', 'cosmetic'] as const).map((sev) => (
              <button
                key={sev}
                type="button"
                onClick={() => setSeverity(sev)}
                className={[
                  'touch-target shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors',
                  severity === sev
                    ? 'border-[#4F46E5] bg-[#EEF2FF] text-[#4F46E5]'
                    : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#C7C4FE]',
                ].join(' ')}
              >
                {sev === 'all' ? 'Any severity' : SEVERITY_META[sev].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
        {results.length} {results.length === 1 ? 'entry' : 'entries'}
      </p>

      {results.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white p-10 text-center">
          <Icon name="search" size={22} className="mx-auto mb-3 text-[#CBD5E1]" />
          <p className="font-display text-base font-bold text-[#0B1220]">No match in the vault yet</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-[#64748B]">
            Try a shorter phrase, clear the filters, or email the exact error text and it gets added in
            the next update.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {results.map((entry) => {
            const open = openId === entry.id;
            const meta = SEVERITY_META[entry.severity];
            return (
              <article
                key={entry.id}
                className={[
                  'overflow-hidden rounded-2xl border bg-white transition-shadow',
                  open ? 'border-[#C7D2FE] shadow-lg shadow-indigo-100/50' : 'border-[#E2E8F0]',
                ].join(' ')}
              >
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : entry.id)}
                  aria-expanded={open}
                  className="flex w-full items-start gap-3 p-4 text-left sm:p-5"
                >
                  <span className={['mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full', meta.dot].join(' ')} />
                  <span className="min-w-0 flex-1">
                    <span className="mb-1 flex flex-wrap items-center gap-2">
                      <span
                        className={[
                          'rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                          meta.chip,
                        ].join(' ')}
                      >
                        {meta.label}
                      </span>
                      <span className="rounded-full bg-[#F8FAFC] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                        {entry.where}
                      </span>
                    </span>
                    <span className="break-anywhere block font-mono text-[12.5px] font-medium leading-snug text-[#0B1220] sm:text-[13px]">
                      {entry.symptom}
                    </span>
                  </span>
                  <span
                    className={[
                      'mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-[#94A3B8] transition-transform',
                      open ? 'rotate-180 bg-[#F1F5F9]' : '',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    <Icon name="chevronDown" size={15} />
                  </span>
                </button>

                {open && (
                  <div className="space-y-3 border-t border-[#F1F5F9] bg-[#F8FAFC] p-4 sm:p-5">
                    <div>
                      <p className="mb-1 text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
                        Why it happens
                      </p>
                      <p className="text-[13px] leading-relaxed text-[#374151]">{entry.cause}</p>
                    </div>
                    <div className="rounded-xl border border-[#BBF7D0] bg-[#F0FDF4] p-3">
                      <p className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#15803D]">
                        <Icon name="checkCircle" size={12} />
                        The fix
                      </p>
                      <p className="text-[13px] leading-relaxed text-[#166534]">{entry.fix}</p>
                    </div>
                    {entry.command && <InlineCommand code={entry.command} />}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
