import { cn } from '@/lib/utils';

interface AmountDisplayProps {
  amount: number | string;
  currency?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  colorize?: boolean;
  className?: string;
}

export function AmountDisplay({ amount, currency = '৳', size = 'md', colorize = false, className }: AmountDisplayProps) {
  const num = Number(amount) || 0;

  const formatted = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(num));

  const sizeClass = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl font-syne',
    xl: 'text-3xl font-syne font-bold',
  }[size];

  const colorClass = colorize
    ? num > 0 ? 'text-success' : num < 0 ? 'text-danger' : 'text-text-muted'
    : '';

  return (
    <span className={cn('font-mono font-medium', sizeClass, colorClass, className)}>
      {num < 0 && '-'}{currency}{formatted}
    </span>
  );
}
