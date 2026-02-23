import {
  TooltipTrigger,
  Tooltip as AriaTooltip,
  type TooltipProps,
  type ButtonProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

interface TooltipComponentProps {
  trigger: React.ReactNode;
  content: React.ReactNode;
  delay?: number;
  placement?: TooltipProps['placement'];
  className?: string;
}

export function Tooltip({
  trigger,
  content,
  delay = 500,
  placement = 'top',
  className,
}: TooltipComponentProps) {
  return (
    <TooltipTrigger delay={delay}>
      {trigger}
      <AriaTooltip
        placement={placement}
        className={cn(
          'bg-popover text-popover-foreground text-sm px-3 py-2 rounded-lg border border-border shadow-lg',
          'animate-in fade-in-0 zoom-in-95',
          className
        )}
      >
        {content}
      </AriaTooltip>
    </TooltipTrigger>
  );
}
