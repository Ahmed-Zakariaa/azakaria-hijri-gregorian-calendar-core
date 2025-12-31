// src/date/normalizeDate.js
export function normalizeDate(input, endOfDay = false) {
  const d = input instanceof Date ? new Date(input) : new Date(input);
  if (endOfDay) {
    d.setHours(23, 59, 59, 999);
  } else {
    d.setHours(0, 0, 0, 0);
  }
  return d;
}
