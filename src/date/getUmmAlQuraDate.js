import { getHijriDate } from "./hijriConverter.js";

/**
 * @deprecated Use getHijriDate from hijriConverter.js instead
 * This function is kept for backward compatibility
 *
 * Get Hijri date using Umm Al-Qura calculations
 * Uses native Intl.DateTimeFormat API (zero dependencies)
 */
export function getUmmAlQuraDate(date) {
  return getHijriDate(date);
}
