import freeSpaceArt from '../assets/free-space.png';
// Fallback only — the sheet gives each card its own car via HOT_ROD_ART.
import hotRodArt from '../assets/hot-rod-blue.png';
import gd3Art from '../assets/gen-gd3.png';
import ge8Art from '../assets/gen-ge8.png';
import gk5Art from '../assets/gen-gk5.png';

export type SquareKind = 'color' | 'generation' | 'utility';

export interface Square {
  id: string;
  label: string;
  kind: SquareKind;
  /** Paint chip fill. `color` squares only. */
  swatch?: string;
  /** Year range. `generation` squares only. */
  years?: string;
  /** Artwork. `utility` squares only. */
  art?: string;
  alt?: string;
  /** Caption rendered under the artwork. `utility` squares only. */
  note?: string;
}

/**
 * Honda shipped six blues on the US Fit — Tidewater, Celestial, Blue Sensation,
 * Vortex, Aegean, Reflection — which nobody can tell apart from a moving car.
 * They collapse into Light Blue and Dark Blue. Blue Raspberry (BG59M, 2012-13)
 * survives on its own because it isn't actually blue: it's a teal, and it reads
 * as one at 70mph.
 *
 * Hues are sampled from photographs of real cars (ImportArchive), then given
 * the saturation a paint chip needs to survive a laser printer. Common families
 * get generic labels: any visible shade in the family counts.
 *
 * There is no green or brown US-market Fit. Don't add one.
 */
const COLORS: Square[] = [
  { id: 'white', label: 'White', kind: 'color', swatch: '#FFFFFF' },
  { id: 'black', label: 'Black', kind: 'color', swatch: '#1A1B1D' },
  { id: 'silver', label: 'Silver', kind: 'color', swatch: '#C4C8CB' },
  { id: 'dark-gray', label: 'Dark Gray', kind: 'color', swatch: '#53585D' },
  { id: 'red', label: 'Red', kind: 'color', swatch: '#C41230' },
  { id: 'orange', label: 'Orange', kind: 'color', swatch: '#E4551F' },
  { id: 'yellow', label: 'Yellow', kind: 'color', swatch: '#E3C445' },
  // The three survivors are pulled apart on lightness AND saturation, not just
  // hue: pale / vivid teal / dark. Two chips at the same value read as the same
  // colour from a car window no matter how far apart their hues are.
  { id: 'light-blue', label: 'Light Blue', kind: 'color', swatch: '#9BBAD3' },
  { id: 'dark-blue', label: 'Dark Blue', kind: 'color', swatch: '#38548C' },
  { id: 'blue-raspberry', label: 'Blue Raspberry', kind: 'color', swatch: '#35A5BC' },
  { id: 'purple', label: 'Purple', kind: 'color', swatch: '#6B3654' },
];

/**
 * Spotting the generation is the Fit-gang skill. Shapes differ enough to call from
 * a moving car, so the square shows the car, not just the code. The artwork is
 * greyscale by design: a generation square must not read as a colour square.
 * Years are live text — baked in at this cell size they print as a smudge.
 */
const GENERATIONS: Square[] = [
  { id: 'gd3', label: 'GD3', kind: 'generation', years: '2007–08', art: gd3Art, alt: 'GD3 Honda Fit' },
  { id: 'ge8', label: 'GE8', kind: 'generation', years: '2009–13', art: ge8Art, alt: 'GE8 Honda Fit' },
  { id: 'gk5', label: 'GK5', kind: 'generation', years: '2015–20', art: gk5Art, alt: 'GK5 Honda Fit' },
];

const UTILITY: Square[] = [
  { id: 'free-space', label: 'Free Space', kind: 'utility', art: freeSpaceArt, alt: 'Free Space' },
  {
    id: 'hot-rod',
    label: 'Hot Rod',
    kind: 'utility',
    art: hotRodArt,
    note: 'Any modification applies',
    alt: 'Hot Rod — a modified Honda Fit',
  },
];

/** 11 colors + 3 generations + 2 utility = 16, which fills a 4x4 exactly. */
export const SQUARES: Square[] = [...COLORS, ...GENERATIONS, ...UTILITY];
