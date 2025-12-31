/**
 * Hijri Date Converter using native Intl.DateTimeFormat
 *
 * Uses the browser's native Intl API which supports Umm Al-Qura calculations
 * Zero dependencies - works in all modern browsers
 */

/**
 * Convert Arabic numerals to Western numerals
 * @private
 */
function arabicToWestern(value) {
  if (!value) return "0";
  const arabicNumerals = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };

  return value.replace(/[٠-٩]/g, (match) => arabicNumerals[match]);
}

/**
 * Get Hijri date components from a Gregorian date
 * Uses Umm Al-Qura calculations via native Intl.DateTimeFormat
 *
 * @param {Date} date - The Gregorian date
 * @returns {{year: number, month: number, day: number}} Hijri date components
 */
export function getHijriDate(date) {
  // Use ar-SA-u-ca-islamic for Umm Al-Qura (default Islamic calendar in Intl)
  const formatter = new Intl.DateTimeFormat("ar-SA-u-ca-islamic", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  const parts = formatter.formatToParts(date);
  const values = {};

  parts.forEach((part) => {
    if (part.type !== "literal" && part.type !== "era") {
      // Convert Arabic numerals to Western numerals for parsing
      const westernValue = arabicToWestern(part.value);
      values[part.type] = parseInt(westernValue, 10);
    }
  });

  return {
    year: values.year || 0,
    month: values.month || 1,
    day: values.day || 1,
  };
}

/**
 * Get Hijri month name in specified language
 *
 * @param {Date} date - The date to get month name for
 * @param {string} lang - Language code ("ar" or "en")
 * @returns {string} Month name
 */
export function getHijriMonthName(date, lang = "ar") {
  const locale = lang === "ar" ? "ar-SA-u-ca-islamic" : "en-US-u-ca-islamic";
  const formatter = new Intl.DateTimeFormat(locale, {
    month: "long",
  });
  return formatter.format(date);
}

/**
 * Get Hijri year from a date
 *
 * @param {Date} date - The date to get year from
 * @returns {number} Hijri year
 */
export function getHijriYear(date) {
  const { year } = getHijriDate(date);
  return year;
}

/**
 * Get Hijri day number from a date
 *
 * @param {Date} date - The date to get day from
 * @returns {number} Hijri day
 */
export function getHijriDay(date) {
  const { day } = getHijriDate(date);
  return day;
}

/**
 * Format a date with Hijri components
 * Returns object with year, month name, and day
 *
 * @param {Date} date - The date to format
 * @param {string} lang - Language code ("ar" or "en")
 * @returns {Object} Formatted Hijri date info
 */
export function formatHijriDate(date, lang = "ar") {
  const hijri = getHijriDate(date);
  const monthName = getHijriMonthName(date, lang);

  return {
    day: hijri.day,
    month: hijri.month,
    monthName,
    year: hijri.year,
    formatted: `${hijri.day}/${hijri.month}/${hijri.year}`,
  };
}
