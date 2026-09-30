import React from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  as?: 'button' | 'a';
  href?: string;
  target?: string;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[#4F46E5] text-white hover:bg-[#4338CA] active:bg-[#3730A3] shadow-sm shadow-indigo-200',
  secondary:
    'bg-[#F1F0FE] text-[#4F46E5] hover:bg-[#E0DEFF] active:bg-[#C7C4FE] border border-[#4F46E5]/20',
  ghost:
    'bg-transparent text-[#0B1220] hover:bg-[#F8FAFC] active:bg-[#F1F0FE] border border-[#E2E8F0]',
  danger:
    'bg-[#EF4444] text-white hover:bg-[#DC2626] active:bg-[#B91C1C]',
  accent:
    'bg-[#14B8A6] text-white hover:bg-[#0D9488] active:bg-[#0F766E]',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3.5 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-7 py-3.5 text-base rounded-xl gap-2.5',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  as: Tag = 'button',
  href,
  target,
  ...props
}: ButtonProps) {
  const classes = [
    'inline-flex items-center justify-center font-semibold font-sans transition-all duration-150 cursor-pointer select-none',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4F46E5] focus-visible:ring-offset-2',
    variantClasses[variant],
    sizeClasses[size],
    (disabled || loading) ? 'opacity-60 cursor-not-allowed pointer-events-none' : '',
    className,
  ].join(' ');

  if (Tag === 'a') {
    return (
      <a href={href} target={target} className={classes}>
        {loading && <Spinner />}
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <Spinner />}
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}
