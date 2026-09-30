import { Icon } from './ui/Icon';

interface EduWarningProps {
  compact?: boolean;
}

export function EduWarning({ compact = false }: EduWarningProps) {
  if (compact) {
    return (
      <div className="flex items-start gap-2.5 rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-4 py-3 text-xs leading-relaxed text-[#92400E]">
        <Icon name="warning" size={15} className="mt-0.5 shrink-0 text-[#D97706]" />
        <p>
          <strong className="font-bold">Educational use only.</strong> Use only faces and voices that
          are yours, licensed to you, or fully synthetic. Never impersonate real people or deceive
          others.{' '}
          <a href="/legal/acceptable-use" className="font-medium underline hover:opacity-80">
            Full policy
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className="border-y border-[#FDE68A] bg-[#FFFBEB]">
      <div className="mx-auto flex max-w-6xl items-start gap-4 px-4 py-4 sm:px-6">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FEF3C7] text-[#D97706]">
          <Icon name="warning" size={20} />
        </span>
        <div className="min-w-0">
          <p className="mb-1 text-sm font-bold text-[#92400E]">Educational use only</p>
          <p className="text-sm leading-relaxed text-[#78350F]">
            This course is for educational purposes only. Use only faces and voices that are yours,
            licensed to you, or fully synthetic. Never impersonate real people, deceive others, or
            commit fraud. Misuse can be a crime. You are responsible for following the laws where you
            live.{' '}
            <a
              href="/legal/acceptable-use"
              className="font-medium underline transition-opacity hover:opacity-80"
            >
              Read the Acceptable Use Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

