import {
  DialogTrigger,
  Modal,
  ModalOverlay,
  Dialog as AriaDialog,
  Button,
  Heading,
  type DialogProps,
} from 'react-aria-components';
import { X } from 'lucide-react';
import { cn } from '../../utils/cn';

interface BpsDialogProps extends DialogProps {
  title?: string;
  triggerLabel?: string;
  className?: string;
  children: React.ReactNode;
}

export function Dialog({ title, triggerLabel = 'Open', className, children, ...props }: BpsDialogProps) {
  return (
    <DialogTrigger>
      <Button className="inline-flex items-center justify-center gap-2 px-4 py-2 font-medium text-sm rounded uppercase tracking-wide bg-[var(--bps-green-dark)] text-white hover:bg-[var(--bps-green-hover)] cursor-default outline-none focus-visible:ring-2 focus-visible:ring-[var(--bps-green)]">
        {triggerLabel}
      </Button>
      <ModalOverlay className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-out">
        <Modal className="relative bg-white rounded-lg shadow-[var(--shadow-lg)] w-full max-w-lg max-h-[90vh] overflow-auto entering:animate-in entering:zoom-in-95 exiting:animate-out exiting:zoom-out-95">
          <AriaDialog
            className={cn('flex flex-col outline-none', className)}
            {...props}
          >
            {({ close }) => (
              <>
                <div className="flex items-center justify-between p-4 border-b border-[var(--bps-gray-200)]">
                  {title && (
                    <Heading className="text-lg font-bold text-[var(--bps-gray-800)]" slot="title">
                      {title}
                    </Heading>
                  )}
                  <Button
                    onPress={close}
                    aria-label="Close dialog"
                    className="ml-auto p-1.5 rounded hover:bg-[var(--bps-gray-100)] text-[var(--bps-gray-500)] cursor-default outline-none focus-visible:ring-2 focus-visible:ring-[var(--bps-green)]"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="p-4">{typeof children === 'function' ? (children as (opts: { close: () => void }) => React.ReactNode)({ close }) : children}</div>
              </>
            )}
          </AriaDialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
