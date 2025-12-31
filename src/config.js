// src/config.js
export const LANG = "ar"; // "ar" for Arabic, "en" for English

/**
 * Hijri Calendar System
 * Options: "ummalqura" (default, Umm Al-Qura calculations)
 *          "islamic-civil" (Islamic Civil calendar)
 *
 * Note: This uses native Intl.DateTimeFormat with the islamic calendar
 * Modern browsers support Umm Al-Qura through the Intl API
 */
export const HIJRI_SYSTEM = "ummalqura";

export const GREGORIAN_COLOR = "#444";
export const HIJRI_COLOR = "#2F6F4E";
export const TODAY_BG = "#DEB758";
export const SHOW_CARRY_OVER_HOLIDAYS = true;

export const HOLIDAYS = [
  {
    name: { ar: "يوم التأسيس", en: "Founding Day" },
    start: "2026-02-21",
    end: "2026-02-21",
    color: "#938953",
  },
  {
    name: { ar: "اليوم الوطني للكويت", en: "Kuwait National Day" },
    start: "2026-02-24",
    end: "2026-02-24",
    color: "#006fc0",
  },
  {
    name: { ar: "اليوم الوطني السعودي", en: "Saudi National Day" },
    start: "2026-09-22",
    end: "2026-09-22",
    color: "#00af50",
  },
  {
    name: { ar: "اليوم الوطني للبحرين", en: "Bahrain National Day" },
    start: "2026-12-15",
    end: "2026-12-15",
    color: "#ff0000",
  },
  {
    name: { ar: "اليوم الوطني القطري", en: "Qatar National Day" },
    start: "2026-12-17",
    end: "2026-12-17",
    color: "#c00000",
  },
  {
    name: { ar: "عطلة العيد", en: "Eid Holiday" },
    start: "2026-03-14",
    end: "2026-03-25",
    color: "#cd9364",
  },
  {
    name: { ar: "عطلة العيد", en: "Eid Holiday" },
    start: "2026-05-23",
    end: "2026-05-31",
    color: "#cd9364",
  },
];
