import { cn } from '@gearhead/ui';
import type { Profile } from '../../data/profiles';
import { QuiltBlock } from '../QuiltBlock/QuiltBlock';

interface ProfileArtProps {
  profile: Profile;
  className?: string;
}

/**
 * A profile's "photo": their whole quilt, hung above the bio, with a
 * cut-paper silhouette in a cameo.
 * Graven images are frowned upon; silhouettes have a long folk-art pedigree.
 */
export function ProfileArt({ profile, className }: ProfileArtProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div className="absolute inset-x-3 top-3 h-[57%] shadow-[0_8px_20px_rgb(0_0_0/0.45)]">
        <QuiltBlock pattern={profile.quilt} colors={profile.colors} width={240} height={220} className="h-full w-full" />
        <Cameo profile={profile} className="absolute left-1/2 top-1/2 w-[34%] -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}

export function Cameo({ profile, className }: ProfileArtProps) {
  return (
    <div
      className={cn(
        'aspect-[4/5] overflow-hidden rounded-[50%] border-[3px] border-[var(--churn-ink)] bg-[var(--churn-paper)] shadow-[0_10px_24px_rgb(0_0_0/0.35)] ring-4 ring-[var(--churn-paper)]/80',
        className,
      )}
    >
      <img src={profile.portrait} alt="" draggable={false} className="h-full w-full object-cover" />
    </div>
  );
}
