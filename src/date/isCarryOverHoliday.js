// src/date/isCarryOverHoliday.js
export function isCarryOverHoliday(holidayEnd, monthStart) {
  return (
    holidayEnd.getFullYear() === monthStart.getFullYear() &&
    holidayEnd.getMonth() === monthStart.getMonth() - 1 &&
    holidayEnd.getDate() === new Date(holidayEnd.getFullYear(), holidayEnd.getMonth() + 1, 0).getDate()
  );
}
