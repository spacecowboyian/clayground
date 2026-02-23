import {
  TextField as AriaTextField,
  Label,
  Input,
  FieldError,
  Text,
  type TextFieldProps as AriaTextFieldProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

interface TextFieldProps extends AriaTextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  focusColor?: 'orange' | 'blue' | 'green' | 'purple';
  className?: string;
  inputClassName?: string;
}

const focusColors = {
  orange: 'focus:ring-[var(--accent-orange)]',
  blue: 'focus:ring-[var(--accent-blue)]',
  green: 'focus:ring-[var(--accent-green)]',
  purple: 'focus:ring-[var(--accent-purple)]',
};

export function TextField({
  label,
  description,
  errorMessage,
  placeholder,
  focusColor = 'blue',
  className,
  inputClassName,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField className={cn('flex flex-col gap-2', className)} {...props}>
      {label && <Label className="text-sm text-foreground">{label}</Label>}
      <Input
        placeholder={placeholder}
        className={cn(
          'px-3 py-2 bg-input rounded-lg border border-border text-foreground',
          'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-0',
          focusColors[focusColor],
          inputClassName
        )}
      />
      {description && <Text slot="description" className="text-xs text-muted-foreground">{description}</Text>}
      <FieldError className="text-xs text-destructive">{errorMessage}</FieldError>
    </AriaTextField>
  );
}
