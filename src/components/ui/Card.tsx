import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

export function Card({ children, className = '', hover = false, padding = 'md' }: CardProps) {
  const paddingClass = { sm: 'p-4', md: 'p-6', lg: 'p-8' }[padding];
  return (
    <div
      className={[
        'bg-white rounded-2xl border border-[#E2E8F0]',
        hover ? 'transition-all duration-200 hover:shadow-lg hover:shadow-indigo-100/50 hover:-translate-y-0.5 cursor-pointer' : 'shadow-sm',
        paddingClass,
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={['mb-4', className].join(' ')}>{children}</div>;
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={['text-lg font-bold font-display text-[#0B1220] leading-snug', className].join(' ')}>
      {children}
    </h3>
  );
}

export function CardBody({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={['text-[#64748B] text-sm leading-relaxed', className].join(' ')}>{children}</div>;
}
