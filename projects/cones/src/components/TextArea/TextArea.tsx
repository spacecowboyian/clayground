import {
  TextField as AriaTextField,
  Label,
  TextArea as AriaTextArea,
  FieldError,
  Text,
  type TextFieldProps,
} from 'react-aria-components';
import { cn } from '../../utils/cn';

interface TextAreaProps extends TextFieldProps {
  label?: string;
  description?: string;
  errorMessage?: string;
  placeholder?: string;
  focusColor?: 'orange' | 'blue' | 'green' | 'purple';
  rows?: number;
  className?: string;
  textareaClassName?: string;
}

const focusColors = {
  orange: 'focus:ring-[var(--accent-orange)]',
  blue: 'focus:ring-[var(--accent-blue)]',
  green: 'focus:ring-[var(--accent-green)]',
  purple: 'focus:ring-[var(--accent-purple)]',
};

export function TextArea({
  label,
  description,
  errorMessage,
  placeholder,
  focusColor = 'blue',
  rows = 4,
  className,
  textareaClassName,
  ...props
}: TextAreaProps) {
  return (
    <AriaTextField className={cn('flex flex-col gap-2', className)} {...props}>
      {label && <Label className="text-sm text-foreground">{label}</Label>}
      <AriaTextArea
        placeholder={placeholder}
        rows={rows}
        className={cn(
          'px-3 py-2 bg-input rounded-lg border border-border text-foreground resize-y',
          'placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-offset-0',
          focusColors[focusColor],
          textareaClassName
        )}
      />
      {description && <Text slot="description" className="text-xs text-muted-foreground">{description}</Text>}
      <FieldError className="text-xs text-destructive">{errorMessage}</FieldError>
    </AriaTextField>
  );
}
