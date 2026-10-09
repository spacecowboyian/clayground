import { cn } from '@gearhead/ui';
import type { Profile } from '../../data/profiles';
import { QuiltBlock } from '../QuiltBlock/QuiltBlock';

interface ProfileArtProps {
  profile: Profile;
  className?: string;
}

/**
 * A profile's "photo": their quilt, with a cut-paper silhouette in a cameo.
 * Graven images are frowned upon; silhouettes have a long folk-art pedigree.
 */
export function ProfileArt({ profile, className }: ProfileArtProps) {
  return (
    <div className={cn('relative overflow-hidden', className)}>
      <QuiltBlock pattern={profile.quilt} colors={profile.colors} className="absolute inset-0 h-full w-full" />
      <Cameo profile={profile} className="absolute left-1/2 top-[9%] w-[58%] -translate-x-1/2" />
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
