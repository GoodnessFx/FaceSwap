import { useCallback, useState } from 'react';
import { Icon } from './Icon';

interface CommandBlockProps {
  code: string;
  label?: string;
  note?: string;
  className?: string;
}

/**
 * CommandBlock — a terminal-styled, copy-to-clipboard code block.
 * Falls back to a hidden textarea when the async clipboard API is unavailable
 * (older browsers, or non-secure origins).
 */
export function CommandBlock({ code, label, note, className = '' }: CommandBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        const area = document.createElement('textarea');
        area.value = code;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        document.execCommand('copy');
        document.body.removeChild(area);
      }
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }, [code]);

  const lines = code.split('\n');

  return (
    <div className={['overflow-hidden rounded-xl border border-[#1E2A40] bg-[#0B1220]', className].join(' ')}>
      <div className="flex items-center justify-between gap-3 border-b border-[#1E2A40] px-3 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex gap-1" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#EF4444]/60" />
            <span className="h-2 w-2 rounded-full bg-[#F59E0B]/60" />
            <span className="h-2 w-2 rounded-full bg-[#10B981]/60" />
          </span>
          <span className="truncate font-mono text-[11px] uppercase tracking-wider text-white/40">
            {label ?? 'Command Prompt'}
          </span>
        </div>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? 'Copied to clipboard' : 'Copy command to clipboard'}
          className={[
            'touch-target inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition-colors',
            copied
              ? 'border-[#10B981]/40 bg-[#10B981]/15 text-[#4ADE80]'
              : 'border-white/10 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white',
          ].join(' ')}
        >
          <Icon name={copied ? 'check' : 'copy'} size={13} />
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div className="overflow-x-auto px-3 py-3">
        <pre className="font-mono text-[12.5px] leading-relaxed text-[#E2E8F0] sm:text-[13px]">
          {lines.map((line, i) => (
            <div key={i} className="flex gap-3">
              <span className="select-none text-white/25" aria-hidden="true">
                {line.trim().startsWith('#') ? '' : '>'}
              </span>
              <span className="break-anywhere">{line}</span>
            </div>
          ))}
        </pre>
      </div>

      {note && (
        <p className="border-t border-[#1E2A40] bg-[#0F1728] px-3 py-2 text-xs leading-relaxed text-white/50">
          {note}
        </p>
      )}
    </div>
  );
}

/** Inline single-line command with a copy affordance, used inside step cards. */
export function InlineCommand({ code, className = '' }: { code: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <div
      className={[
        'flex items-center gap-2 overflow-hidden rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2',
        className,
      ].join(' ')}
    >
      <Icon name="terminal" size={14} className="text-[#4F46E5]" />
      <code className="flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs text-[#0B1220] no-scrollbar">
        {code}
      </code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? 'Copied' : 'Copy command'}
        className="touch-target inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-semibold text-[#4F46E5] transition-colors hover:bg-[#EEF2FF]"
      >
        <Icon name={copied ? 'check' : 'copy'} size={13} />
        <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
      </button>
    </div>
  );
}
