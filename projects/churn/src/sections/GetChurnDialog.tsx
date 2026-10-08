import { Button, Dialog, cn } from '@gearhead/ui';

interface GetChurnDialogProps {
  children?: React.ReactNode;
  className?: string;
}

export const pillClass =
  'rounded-full bg-[var(--churn-butter)] px-7 py-3.5 text-base font-semibold text-[var(--churn-ink)] hover:bg-[var(--churn-butter-deep)] focus-visible:ring-offset-[var(--quilt-ground)]';

export function GetChurnDialog({ children = 'Get Churn', className }: GetChurnDialogProps) {
  return (
    <Dialog title="How to get Churn" trigger={<Button className={cn(pillClass, className)}>{children}</Button>}>
      <div className="space-y-3 text-[15px] leading-relaxed">
        <p>Churn is not available on the App Store, Google Play, or anywhere electricity is involved.</p>
        <p>
          To download, write your name on a slip of paper and pin it to the bulletin board at the dry goods store. A boy
          on a bicycle will be by within the fortnight.
        </p>
        <p className="text-sm">The phone shanty at the end of the lane is for emergencies and match notifications only.</p>
      </div>
    </Dialog>
  );
}
