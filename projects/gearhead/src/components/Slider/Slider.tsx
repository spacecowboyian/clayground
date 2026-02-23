import {
  Slider as AriaSlider,
  SliderTrack,
  SliderThumb,
  Label,
  type SliderProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

interface SliderComponentProps extends SliderProps<number[]> {
  label?: string;
  color?: 'orange' | 'blue' | 'green' | 'purple';
  showValue?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
}

const sliderColors = {
  orange: { track: 'bg-[var(--accent-orange)]', thumb: 'border-[var(--accent-orange)] focus:ring-[var(--accent-orange)]' },
  blue: { track: 'bg-[var(--accent-blue)]', thumb: 'border-[var(--accent-blue)] focus:ring-[var(--accent-blue)]' },
  green: { track: 'bg-[var(--accent-green)]', thumb: 'border-[var(--accent-green)] focus:ring-[var(--accent-green)]' },
  purple: { track: 'bg-[var(--accent-purple)]', thumb: 'border-[var(--accent-purple)] focus:ring-[var(--accent-purple)]' },
};

export function Slider({
  label,
  color = 'orange',
  showValue = true,
  formatValue = (v) => `${v}%`,
  className,
  ...props
}: SliderComponentProps) {
  const colors = sliderColors[color];

  return (
    <AriaSlider className={cn('space-y-2', className)} {...props}>
      {({ state }) => (
        <>
          {(label || showValue) && (
            <div className="flex justify-between items-center">
              {label && <Label className="text-sm text-foreground">{label}</Label>}
              {showValue && (
                <span className="text-sm text-muted-foreground ml-auto">
                  {formatValue(state.values[0])}
                </span>
              )}
            </div>
          )}
          <div className="relative flex items-center w-full h-6">
            <SliderTrack className="relative w-full h-2 bg-secondary rounded-full">
              <div
                className={cn('absolute h-full rounded-full', colors.track)}
                style={{ width: `${state.getThumbPercent(0) * 100}%` }}
              />
            </SliderTrack>
            <SliderThumb
              className={cn(
                'w-5 h-5 bg-white border-2 rounded-full shadow-md',
                'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background',
                colors.thumb
              )}
            />
          </div>
        </>
      )}
    </AriaSlider>
  );
}
