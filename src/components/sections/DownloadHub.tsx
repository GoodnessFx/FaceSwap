import { useState } from 'react';
import { Icon, IconTile } from '../ui/Icon';
import { DOWNLOADS, CALL_RECIPES, START_ORDER } from '../../config/setup';

const TONES: Record<string, string> = {
  indigo: 'bg-[#EEF2FF] text-[#4F46E5] border-[#C7D2FE]',
  teal: 'bg-[#F0FDFA] text-[#0D9488] border-[#99F6E4]',
  amber: 'bg-[#FFFBEB] text-[#B45309] border-[#FDE68A]',
  rose: 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]',
  emerald: 'bg-[#F0FDF4] text-[#15803D] border-[#BBF7D0]',
  slate: 'bg-[#F8FAFC] text-[#475569] border-[#E2E8F0]',
};

/**
 * DownloadHub — "where to go" cards for every official source, plus the
 * safe-download checklist and the call-app recipes.
 */
export function DownloadHub() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  async function copyLink(id: string, url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1600);
    } catch {
      setCopiedId(null);
    }
  }

  return (
    <div>
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#99F6E4] bg-[#F0FDFA] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0D9488]">
          <Icon name="download" size={13} />
          Where to go
        </span>
        <h2 className="display-tight mb-4 text-3xl text-[#0B1220] sm:text-4xl lg:text-5xl">
          Every download, and the proof it worked.
        </h2>
        <p className="text-[15px] leading-relaxed text-[#64748B]">
          Twelve official sources. Each card shows what the tool does, the size to expect, and the one
          check that proves it is installed correctly.
        </p>
      </div>

      <div className="mb-8 rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5">
        <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-bold text-[#0B1220]">
          <Icon name="shield" size={15} className="text-[#4F46E5]" />
          Before you click any download
        </h3>
        <ul className="grid gap-2.5 sm:grid-cols-2">
          {[
            'Check the address bar matches the domain on the card, not a search-result ad.',
            'Skip anything that offers a bundled driver updater or downloader.',
            'Prefer the official exe, msi or zip. Avoid third-party mirrors and repacks.',
            'After installing, run the proof command before moving to the next tool.',
          ].map((line) => (
            <li key={line} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-[#374151]">
              <Icon name="checkCircle" size={14} className="mt-0.5 shrink-0 text-[#10B981]" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="stagger grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {DOWNLOADS.map((item) => (
          <article
            key={item.id}
            className="group flex flex-col rounded-2xl border border-[#E2E8F0] bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-[#C7C4FE] hover:shadow-lg hover:shadow-indigo-100/60"
          >
            <div className="mb-3 flex items-start justify-between gap-2">
              <span
                className={[
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border',
                  TONES[item.tone],
                ].join(' ')}
              >
                <Icon name={item.icon} size={18} />
              </span>
              <span className="rounded-full bg-[#F8FAFC] px-2 py-0.5 font-mono text-[10px] font-semibold text-[#94A3B8]">
                {item.size}
              </span>
            </div>

            <h3 className="mb-1 font-display text-[15px] font-bold leading-snug text-[#0B1220]">
              {item.name}
            </h3>
            <p className="mb-3 flex-1 text-[12.5px] leading-relaxed text-[#64748B]">{item.what}</p>

            <p className="mb-3 flex items-start gap-2 rounded-lg bg-[#F0FDF4] px-2.5 py-2 text-[11.5px] leading-relaxed text-[#166534]">
              <Icon name="check" size={12} className="mt-0.5 shrink-0" />
              <span>{item.proof}</span>
            </p>

            <div className="flex items-center gap-2">
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0B1220] px-3 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-[#1E2A40]"
              >
                Open official page
                <Icon name="external" size={12} />
              </a>
              <button
                type="button"
                onClick={() => copyLink(item.id, item.url)}
                aria-label={`Copy the ${item.name} link`}
                className="touch-target inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E2E8F0] text-[#64748B] transition-colors hover:border-[#C7C4FE] hover:text-[#4F46E5]"
              >
                <Icon name={copiedId === item.id ? 'check' : 'link'} size={15} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}


/**
 * CallRecipes — where to click inside every call app, plus the start order
 * that keeps the webcam and the virtual microphone from fighting.
 */
export function CallRecipes() {
  return (
    <div>
      <div className="mx-auto mb-8 max-w-2xl text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#4F46E5]">
          <Icon name="video" size={13} />
          Room recipes
        </span>
        <h2 className="display-tight mb-4 text-3xl text-[#0B1220] sm:text-4xl">
          Where to click inside every call app.
        </h2>
        <p className="text-[15px] leading-relaxed text-[#64748B]">
          The exact menu path for the camera and the microphone, plus the one habit each app has that
          breaks a working persona.
        </p>
      </div>

      <div className="grid gap-3 lg:grid-cols-2">
        {CALL_RECIPES.map((recipe) => (
          <article key={recipe.app} className="rounded-2xl border border-[#E2E8F0] bg-white p-4 sm:p-5">
            <h4 className="mb-3 flex items-center gap-2 font-display text-[15px] font-bold text-[#0B1220]">
              <IconTile name="monitor" size="sm" tone="slate" />
              {recipe.app}
            </h4>
            <dl className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <dt className="w-[70px] shrink-0 pt-0.5 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  Camera
                </dt>
                <dd className="text-[12.5px] leading-relaxed text-[#374151]">{recipe.camera}</dd>
              </div>
              <div className="flex items-start gap-2.5">
                <dt className="w-[70px] shrink-0 pt-0.5 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">
                  Mic
                </dt>
                <dd className="text-[12.5px] leading-relaxed text-[#374151]">{recipe.microphone}</dd>
              </div>
              <div className="flex items-start gap-2.5">
                <dt className="w-[70px] shrink-0 pt-0.5 text-[10px] font-bold uppercase tracking-wider text-[#B45309]">
                  Gotcha
                </dt>
                <dd className="text-[12.5px] leading-relaxed text-[#78350F]">{recipe.gotcha}</dd>
              </div>
            </dl>
          </article>
        ))}

        <article className="rounded-2xl border border-[#4F46E5]/30 bg-[#0B1220] p-4 sm:p-5">
          <h4 className="mb-3 flex items-center gap-2 font-display text-[15px] font-bold text-white">
            <IconTile name="bolt" size="sm" tone="onDark" />
            The start order that never fails
          </h4>
          <ol className="space-y-2.5">
            {START_ORDER.map((line, i) => (
              <li key={line} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 font-mono text-[10px] font-bold text-white/70">
                  {i + 1}
                </span>
                <span className="text-[12.5px] leading-relaxed text-white/70">{line}</span>
              </li>
            ))}
          </ol>
        </article>
      </div>
    </div>
  );
}
