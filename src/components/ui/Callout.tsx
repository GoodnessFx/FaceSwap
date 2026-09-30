import React from 'react';

type CalloutType = 'info' | 'warning' | 'danger' | 'success';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const configs: Record<CalloutType, { bg: string; border: string; icon: React.ReactNode; titleColor: string }> = {
  info: {
    bg: 'bg-[#EEF2FF]',
    border: 'border-l-4 border-[#4F46E5]',
    titleColor: 'text-[#4F46E5]',
    icon: (
      <svg className="w-4 h-4 text-[#4F46E5] flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 3a.75.75 0 110 1.5A.75.75 0 018 4zm0 2.5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 018 6.5z" />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-[#FFFBEB]',
    border: 'border-l-4 border-[#F59E0B]',
    titleColor: 'text-[#D97706]',
    icon: (
      <svg className="w-4 h-4 text-[#F59E0B] flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8.982 1.566a1.13 1.13 0 00-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5a.905.905 0 01.9.995l-.35 3.507a.552.552 0 01-1.1 0L7.1 5.995A.905.905 0 018 5zm.002 6a1 1 0 110 2 1 1 0 010-2z" />
      </svg>
    ),
  },
  danger: {
    bg: 'bg-[#FEF2F2]',
    border: 'border-l-4 border-[#EF4444]',
    titleColor: 'text-[#DC2626]',
    icon: (
      <svg className="w-4 h-4 text-[#EF4444] flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zM6.354 5.646a.5.5 0 10-.708.708L7.293 8l-1.647 1.646a.5.5 0 00.708.708L8 8.707l1.646 1.647a.5.5 0 00.708-.708L8.707 8l1.647-1.646a.5.5 0 00-.708-.708L8 7.293 6.354 5.646z" />
      </svg>
    ),
  },
  success: {
    bg: 'bg-[#F0FDF4]',
    border: 'border-l-4 border-[#10B981]',
    titleColor: 'text-[#16A34A]',
    icon: (
      <svg className="w-4 h-4 text-[#10B981] flex-shrink-0 mt-0.5" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm3.854 5.146a.5.5 0 010 .708l-4 4a.5.5 0 01-.708 0l-2-2a.5.5 0 01.708-.708L7.5 9.793l3.646-3.647a.5.5 0 01.708 0z" />
      </svg>
    ),
  },
};

export function Callout({ type = 'info', title, children, className = '' }: CalloutProps) {
  const cfg = configs[type];
  return (
    <div className={['rounded-r-xl px-4 py-3.5', cfg.bg, cfg.border, className].join(' ')}>
      <div className="flex gap-3">
        {cfg.icon}
        <div className="min-w-0">
          {title && <p className={['font-semibold text-sm mb-1', cfg.titleColor].join(' ')}>{title}</p>}
          <div className="text-sm text-[#374151] leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
