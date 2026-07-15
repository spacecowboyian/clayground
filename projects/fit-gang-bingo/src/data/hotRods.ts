import hotRodBlue from '../assets/hot-rod-blue.png';
import hotRodOrange from '../assets/hot-rod-orange.png';
import hotRodPurple from '../assets/hot-rod-purple.png';
import hotRodLightBlue from '../assets/hot-rod-lightblue.png';

/**
 * One Hot Rod car per card, so the four cards on a sheet don't repeat the same
 * artwork. Cycled by card index rather than shuffled: a player should be able to
 * find their own card at a glance, and that only works if the car is stable.
 */
export const HOT_ROD_ART: string[] = [hotRodBlue, hotRodOrange, hotRodPurple, hotRodLightBlue];
