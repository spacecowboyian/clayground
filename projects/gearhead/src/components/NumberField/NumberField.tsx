import {
  NumberField as AriaNumberField,
  Label,
  Input,
  Button,
  Group,
  FieldError,
  Text,
  type NumberFieldProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

interface NumberFieldComponentProps extends NumberFieldProps {
  label?: string;
  description?: string;
  focusColor?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
}

const focusColors = {
  orange: 'focus:ring-[var(--accent-orange)]',
  blue: 'focus:ring-[var(--accent-blue)]',
  green: 'focus:ring-[var(--accent-green)]',
  purple: 'focus:ring-[var(--accent-purple)]',
};

export function NumberField({
  label,
  description,
  focusColor = 'orange',
  className,
  ...props
}: NumberFieldComponentProps) {
  return (
    <AriaNumberField className={cn('flex flex-col gap-2', className)} {...props}>
      {label && <Label className="text-sm text-foreground">{label}</Label>}
      <Group className="flex">
        <Input
          className={cn(
            'flex-1 px-3 py-2 bg-input rounded-l-lg border border-border text-foreground',
            'focus:outline-none focus:ring-2 focus:ring-offset-0 focus:z-10',
            focusColors[focusColor]
          )}
        />
        <div className="flex flex-col border-y border-r border-border rounded-r-lg overflow-hidden">
          <Button slot="increment" className="px-2 py-1 bg-secondary hover:bg-muted text-foreground text-xs transition-colors">+</Button>
          <Button slot="decrement" className="px-2 py-1 bg-secondary hover:bg-muted text-foreground text-xs border-t border-border transition-colors">-</Button>
        </div>
      </Group>
      {description && <Text slot="description" className="text-xs text-muted-foreground">{description}</Text>}
      <FieldError className="text-xs text-destructive" />
    </AriaNumberField>
  );
}
