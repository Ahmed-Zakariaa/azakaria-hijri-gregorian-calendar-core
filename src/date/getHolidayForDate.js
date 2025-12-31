// src/date/getHolidayForDate.js
import { normalizeDate } from "./normalizeDate.js";

export function getHolidayForDate(date, holidays) {
  const target = normalizeDate(date);

  return holidays.find(h => {
    const start = normalizeDate(h.start);
    const end = normalizeDate(h.end, true);
    return target >= start && target <= end;
  });
}
