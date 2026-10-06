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
 * Thermostat opens ~82C/180F, normal running 85-96C/185-205F, fans pull it
 * back from ~102C/215F. Past 110C/230F you are cooking the head gasket.
 */
export const COOLANT_MIN_C = 38;
export const COOLANT_MAX_C = 121;
export const COOLANT_COLD_C = 71;
export const COOLANT_NOMINAL_C = 88;
export const COOLANT_HOT_C = 102;
export const COOLANT_CRITICAL_C = 110;
