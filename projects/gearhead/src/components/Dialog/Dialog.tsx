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
      <ModalOverlay className="fixed inset-0 bg-black/50 flex items-stretch sm:items-center justify-center sm:p-4 z-50">
        <Modal className="bg-card border border-border shadow-xl w-full h-dvh sm:h-auto sm:max-h-[calc(100dvh-2rem)] sm:max-w-md sm:rounded-lg flex flex-col">
          <AriaDialog className={cn('flex flex-col flex-1 outline-none overflow-hidden', className)}>
            {({ close }) => (
              <>
                <div className="flex items-start justify-between flex-none px-6 pt-6 pb-4">
                  {title && <Heading className="text-xl text-foreground">{title}</Heading>}
                  <Button
                    className="p-1 rounded hover:bg-secondary transition-colors ml-auto"
                    onPress={close}
                  >
                    <X className="w-5 h-5 text-muted-foreground" />
                  </Button>
                </div>
                <div className="flex-1 overflow-y-auto px-6 text-sm text-muted-foreground">{children}</div>
                {footer && (
                  <div className="flex-none flex justify-end gap-3 px-6 py-4 border-t border-border">
                    {footer}
                  </div>
                )}
              </>
            )}
          </AriaDialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
