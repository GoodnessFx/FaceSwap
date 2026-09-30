interface ProgressBarProps {
  value: number;
  max?: number;
  label?: string;
  showPercent?: boolean;
  color?: 'primary' | 'accent' | 'success';
  size?: 'sm' | 'md';
}

const colorClasses = {
  primary: 'bg-[#4F46E5]',
  accent: 'bg-[#14B8A6]',
  success: 'bg-[#10B981]',
};

export function ProgressBar({
  value,
  max = 100,
  label,
  showPercent = true,
  color = 'primary',
  size = 'md',
}: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const trackH = size === 'sm' ? 'h-1.5' : 'h-2.5';
  return (
    <div>
      {(label || showPercent) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs font-medium text-[#64748B]">{label}</span>}
          {showPercent && <span className="text-xs font-semibold text-[#0B1220]">{pct}%</span>}
        </div>
      )}
      <div className={['w-full bg-[#F1F0FE] rounded-full overflow-hidden', trackH].join(' ')}>
        <div
          className={['h-full rounded-full transition-all duration-500', colorClasses[color]].join(' ')}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
