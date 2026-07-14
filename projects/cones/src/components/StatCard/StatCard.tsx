import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '../../utils/cn';

type TrendDirection = 'up' | 'down' | 'neutral';

interface StatTrend {
  direction: TrendDirection;
  value: string;
  label?: string;
}

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: StatTrend;
  icon?: React.ReactNode;
  color?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
}

const colorMap = {
  orange: {
    icon: 'text-[var(--accent-orange)]',
    iconBg: 'bg-[var(--accent-orange-light)]',
    trend: { up: 'text-[var(--accent-orange)]', down: 'text-[var(--accent-red)]', neutral: 'text-muted-foreground' },
  },
  blue: {
    icon: 'text-[var(--accent-blue)]',
    iconBg: 'bg-[var(--accent-blue-light)]',
    trend: { up: 'text-[var(--accent-green)]', down: 'text-[var(--accent-red)]', neutral: 'text-muted-foreground' },
  },
  green: {
    icon: 'text-[var(--accent-green)]',
    iconBg: 'bg-[var(--accent-green-light)]',
    trend: { up: 'text-[var(--accent-green)]', down: 'text-[var(--accent-red)]', neutral: 'text-muted-foreground' },
  },
  purple: {
    icon: 'text-[var(--accent-purple)]',
    iconBg: 'bg-[var(--accent-purple-light)]',
    trend: { up: 'text-[var(--accent-green)]', down: 'text-[var(--accent-red)]', neutral: 'text-muted-foreground' },
  },
};

const trendIcons: Record<TrendDirection, React.ReactNode> = {
  up: <TrendingUp className="w-3.5 h-3.5" />,
  down: <TrendingDown className="w-3.5 h-3.5" />,
  neutral: <Minus className="w-3.5 h-3.5" />,
};

export function StatCard({
  title,
  value,
  description,
  trend,
  icon,
  color = 'blue',
  className,
}: StatCardProps) {
  const colors = colorMap[color];

  return (
    <div
      className={cn(
        'p-5 bg-card rounded-xl border border-border flex flex-col gap-3',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-sm text-muted-foreground">{title}</span>
        {icon && (
          <div className={cn('p-2 rounded-lg', colors.iconBg)}>
            <div className={cn('w-5 h-5', colors.icon)}>{icon}</div>
          </div>
        )}
      </div>

      <div className="flex items-end justify-between gap-2">
        <span className="text-3xl font-medium text-foreground leading-none">{value}</span>
        {trend && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium',
              colors.trend[trend.direction]
            )}
          >
            {trendIcons[trend.direction]}
            <span>{trend.value}</span>
          </div>
        )}
      </div>

      {(description || trend?.label) && (
        <p className="text-xs text-muted-foreground">
          {trend?.label ?? description}
        </p>
      )}
    </div>
  );
}
