import ezekiel from '../assets/sil-ezekiel.webp';
import miriam from '../assets/sil-miriam.webp';
import jebediah from '../assets/sil-jebediah.webp';
import hannah from '../assets/sil-hannah.webp';
import amos from '../assets/sil-amos.webp';
import ruth from '../assets/sil-ruth.webp';
import levi from '../assets/sil-levi.webp';
import type { QuiltPattern } from '../components/QuiltBlock/QuiltBlock';

export interface Profile {
  id: string;
  name: string;
  age: number;
  distance: string;
  /** Cut-paper silhouette portrait (transparent, facing right). */
  portrait: string;
  quilt: QuiltPattern;
  /** Quilt cloth, outermost first. */
  colors: [string, string, string];
  bio: string;
  interests: string[];
  /** Whether swiping right produces a match. */
  likesYouBack: boolean;
  matchLine: string;
}

export const profiles: Profile[] = [
  {
    id: 'ezekiel',
    portrait: ezekiel,
    name: 'Ezekiel',
    age: 24,
    distance: '2 fields over',
    quilt: 'center-diamond',
    colors: ['var(--quilt-cobalt)', 'var(--quilt-wine)', 'var(--quilt-teal)'],
    bio: 'Raised 3 barns this summer. Can tell a Belgian from a Percheron at 200 yards. Looking for someone to sit with at the singing.',
    interests: ['Barn raising', 'Draft horses', 'Pie'],
    likesYouBack: true,
    matchLine: 'Ezekiel would like to drive you home from Sunday singing.',
  },
  {
    id: 'miriam',
    portrait: miriam,
    name: 'Miriam',
    age: 22,
    distance: '11 mi · about 2 hrs by buggy',
    quilt: 'bars',
    colors: ['var(--quilt-plum)', 'var(--quilt-rose)', 'var(--quilt-violet)'],
    bio: 'I churn 40 lbs of butter a week and I still have time for you. No zippers, no drama.',
    interests: ['Butter', 'Canning', 'Volleyball'],
    likesYouBack: true,
    matchLine: 'Miriam has set aside a jar of apple butter with your name on it.',
  },
  {
    id: 'jebediah',
    portrait: jebediah,
    name: 'Jebediah',
    age: 27,
    distance: 'Next district',
    quilt: 'nine-patch',
    colors: ['var(--quilt-moss)', 'var(--quilt-ground-raised)', 'var(--quilt-wine)'],
    bio: 'Looking for a wife so the beard can finally come in. Serious inquiries only.',
    interests: ['Woodworking', 'Long sermons', 'Beards (aspiring)'],
    likesYouBack: false,
    matchLine: '',
  },
  {
    id: 'hannah',
    portrait: hannah,
    name: 'Hannah',
    age: 23,
    distance: '4 mi · past the covered bridge',
    quilt: 'sunshine',
    colors: ['var(--quilt-teal)', 'var(--quilt-plum)', 'var(--churn-butter-deep)'],
    bio: 'Quilter. Canner. Will judge your jam. Rumspringa survivor: I saw a Walmart once and I did not care for it.',
    interests: ['Quilting bees', 'Jam', 'Gardening'],
    likesYouBack: true,
    matchLine: 'Hannah is already sketching a wedding quilt. No pressure.',
  },
  {
    id: 'amos',
    portrait: amos,
    name: 'Amos',
    age: 25,
    distance: '6 mi · down the gravel road',
    quilt: 'bars',
    colors: ['var(--quilt-wine)', 'var(--quilt-moss)', 'var(--quilt-cobalt)'],
    bio: 'I own my own horse (Doug). Doug comes first. I need you to be okay with that.',
    interests: ['Doug', 'Hay', 'Doug again'],
    likesYouBack: true,
    matchLine: 'Amos and Doug would like to take you for a ride. Doug is driving.',
  },
  {
    id: 'ruth',
    portrait: ruth,
    name: 'Ruth',
    age: 21,
    distance: '1 mi · across the creek',
    quilt: 'center-diamond',
    colors: ['var(--quilt-violet)', 'var(--quilt-teal)', 'var(--quilt-rose)'],
    bio: 'Looking for someone to sit across from at a very long table for a very long time. Must love shoofly pie.',
    interests: ['Baking', 'Hymns', 'Sunday dinner'],
    likesYouBack: false,
    matchLine: '',
  },
  {
    id: 'levi',
    portrait: levi,
    name: 'Levi',
    age: 26,
    distance: '3 mi · near the mill',
    quilt: 'sunshine',
    colors: ['var(--quilt-cobalt)', 'var(--quilt-rose)', 'var(--quilt-moss)'],
    bio: 'Hook-and-eye guy. Strong opinions on buttons. The beard is a long story, ask me about it.',
    interests: ['Furniture', 'Fasteners', 'Auctions'],
    likesYouBack: true,
    matchLine: 'Levi wants to tell you the beard story. Bring a lantern, it’s long.',
  },
];
