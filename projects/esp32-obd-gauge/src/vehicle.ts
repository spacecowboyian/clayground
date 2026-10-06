/**
 * Vehicle profile — 2009 Honda Fit Sport (GE8), L15A7 1.5L SOHC i-VTEC.
 *
 * 117 hp @ 6600 rpm, 106 lb-ft @ 4800 rpm, 6800 rpm redline (Honda press kit).
 * Fuel-cut and the VTEC crossover point are NOT published, so SHIFT_RPM is a
 * tunable rather than a measured value — see the note on it below.
 */

/** Top of the tach sweep. A little past redline so the bar never pins. */
export const RPM_MAX = 7000;
export const RPM_REDLINE = 6800;

/**
 * Where the shift flash fires. Deliberately BELOW redline: every reading is a
 * CAN request/response round trip, so the number on screen trails the engine.
 * At ~2000 rpm/sec in 2nd gear a 20 Hz feed is already ~100 rpm behind, and a
 * slower feed is worse. Flashing early buys back reaction time. Re-tune once
 * the real poll rate is known.
 */
export const SHIFT_RPM = 6500;

/** Zone boundaries for the tach fill. Green to VTEC-ish, then it escalates. */
export const RPM_YELLOW = 4400;
export const RPM_RED = 6000;

/* ── Coolant, in Celsius (the PID's native unit); displayed in Fahrenheit ──
 * Five zones. Thermostat opens ~82C/180F, normal running 85-96C/185-205F, fans
 * pull it back from ~104C/219F. Past 110C/230F you are cooking the head gasket.
 */
/*
 * The bottom of the scale is a hard freeze, not the bottom of the operating
 * range: the bar has to be off its stop and climbing the moment the engine
 * fires, and coolant starts at whatever the air outside is. Lower this if you
 * want sub-freezing starts to register off zero too.
 */
export const COOLANT_MIN_C = 0; /* 32F */

/**
 * Where the dash's blue low-coolant-temperature lamp goes out — the cold zone
 * ends exactly there, so the band agrees with the car.
 *
 * UNVERIFIED. Honda does not publish this figure; 50C/122F is the number
 * commonly cited for Hondas. To get the real one: cold-start the car with this
 * gauge running and note the reading at the moment the blue lamp goes out.
 */
export const COOLANT_COLD_C = 50; /* 122F — cold to cool */
export const COOLANT_NOMINAL_C = 85; /* 185F — cool to nominal */
export const COOLANT_WARM_C = 96; /* 205F — nominal to warm */
export const COOLANT_HOT_C = 104; /* 219F — warm to hot */
export const COOLANT_CRITICAL_C = 110; /* 230F */
export const COOLANT_MAX_C = 121; /* 250F */

/**
 * The temperature pinned to the middle of the bar: the centre of the nominal
 * zone, so "where it should be" is "the middle of the screen". The scale is
 * asymmetric around it — 52C of range below, 31C above.
 */
export const COOLANT_SCALE_MID_C = (COOLANT_NOMINAL_C + COOLANT_WARM_C) / 2;

/**
 * Shapes the scale either side of that centre. Above 1 the bar crawls near
 * nominal and lunges toward either extreme: steady while the engine sits where
 * it belongs, dramatic the moment it leaves. Set to 1 for a plain linear
 * scale, or below 1 to invert it into a classic expanded-scale gauge that
 * spends most of its width on the operating range.
 */
export const COOLANT_SCALE_EXP = 1.2;
