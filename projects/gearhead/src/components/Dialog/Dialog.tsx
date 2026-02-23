import {
  DialogTrigger,
  Modal,
  ModalOverlay,
  Dialog as AriaDialog,
  Heading,
  Button,
  type DialogProps,
} from 'react-aria-components';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface DialogComponentProps {
  trigger: React.ReactNode;
  title?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function Dialog({
  trigger,
  title,
  isOpen,
  onOpenChange,
  children,
  footer,
  className,
}: DialogComponentProps) {
  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={onOpenChange}>
      {trigger}
      <ModalOverlay className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Modal className="bg-card rounded-lg border border-border shadow-xl max-w-md w-full">
          <AriaDialog className={cn('p-6 space-y-4 outline-none', className)}>
            {({ close }) => (
              <>
                <div className="flex items-start justify-between">
                  {title && <Heading className="text-xl text-foreground">{title}</Heading>}
                  <Button
                    className="p-1 rounded hover:bg-secondary transition-colors ml-auto"
                    onPress={close}
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </Button>
                </div>
                <div className="text-sm text-muted-foreground">{children}</div>
                {footer && <div className="flex justify-end gap-3 pt-4">{footer}</div>}
              </>
            )}
          </AriaDialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
