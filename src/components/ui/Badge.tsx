import React from 'react';

type BadgeVariant = 'default' | 'primary' | 'accent' | 'success' | 'warning' | 'danger' | 'outline';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]',
  primary: 'bg-[#EEF2FF] text-[#4F46E5] border border-[#C7D2FE]',
  accent: 'bg-[#F0FDFA] text-[#0D9488] border border-[#99F6E4]',
  success: 'bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]',
  warning: 'bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A]',
  danger: 'bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]',
  outline: 'bg-transparent text-[#0B1220] border border-[#E2E8F0]',
};

export function Badge({ variant = 'default', children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full',
        variantClasses[variant],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
