// src/date/isHolidayVisibleInMonth.js
import { normalizeDate } from "./normalizeDate.js";
import { isRangeOverlapping } from "./isRangeOverlapping.js";
import { isCarryOverHoliday } from "./isCarryOverHoliday.js";

export function isHolidayVisibleInMonth(holiday, currentDate, options = {}) {
  const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59);

  const holidayStart = normalizeDate(holiday.start);
  const holidayEnd = normalizeDate(holiday.end, true);

  const overlaps = isRangeOverlapping(holidayStart, holidayEnd, monthStart, monthEnd);

  if (options.allowCarryOver) {
    return overlaps || isCarryOverHoliday(holidayEnd, monthStart);
  }

  return overlaps;
}
