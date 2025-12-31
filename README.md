# Hijri-Gregorian Calendar Component

A lightweight, accessible dual-calendar component that displays both Hijri and Gregorian dates simultaneously. Perfect for applications targeting Arabic-speaking users or organizations requiring Islamic calendar support.

## Features

- 📅 **Dual Calendar Display**: Show both Gregorian and Hijri dates side-by-side
- 🌍 **Multilingual Support**: Built-in support for Arabic (ar) and English (en)
- 🎨 **Customizable Colors**: Define colors for Gregorian dates, Hijri dates, holidays, and today's indicator
- 🏖️ **Holiday Management**: Mark holidays with custom colors and multilingual names
- ♿ **Accessibility**: Full ARIA labels, keyboard navigation (Arrow keys), and RTL support
- 📱 **Responsive**: Clean, modern design that works on all screen sizes
- **Zero Dependencies**: No npm packages required! Uses native browser Intl API
- 🕌 **Hijri System Support**: Configurable Hijri calendar system (Umm Al-Qura, Islamic Civil)

## Installation

```bash
npm install @azakaria/hijri-gregorian-calendar
```

## Quick Start

### Basic HTML Setup

```html
<!DOCTYPE html>
<html lang="ar" dir="auto">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Calendar</title>
    <link
      rel="stylesheet"
      href="./node_modules/@azakaria/hijri-gregorian-calendar/src/calendar.css"
    />
  </head>
  <body>
    <div class="calendar-container">
      <h2 id="monthTitle" class="calendar-header"></h2>
      <div id="controls" class="calendar-controls">
        <button id="prevMonth">← Previous</button>
        <button id="nextMonth">Next →</button>
      </div>
      <div id="weekdays" class="weekdays"></div>
      <div id="calendar" class="calendar"></div>
      <div id="legend" class="legend"></div>
    </div>

    <script type="module">
      import { renderCalendar } from "./node_modules/@azakaria/hijri-gregorian-calendar/src/calendar.js";
    </script>
  </body>
</html>
```

## Configuration

The calendar is configured through `src/config.js`. Here are the available options:

### Language

```javascript
export const LANG = "ar"; // "ar" for Arabic, "en" for English
```

### Hijri Calendar System

```javascript
export const HIJRI_SYSTEM = "ummalqura";
// Options:
// - "ummalqura" (default): Umm Al-Qura calculations (most widely used in Saudi Arabia and Gulf states)
// - "islamic-civil": Islamic Civil calendar system
//
// Note: Uses native Intl.DateTimeFormat API - browser support for Islamic calendars:
// - Modern browsers (Chrome 85+, Firefox 93+, Safari 15+)
// - Mobile browsers fully supported
// - No additional libraries needed!
//
// Technical: The converter automatically handles Arabic numeral conversion (٠-٩ → 0-9)
// This ensures correct date calculations regardless of locale
```

### Colors

```javascript
export const GREGORIAN_COLOR = "#444"; // Gregorian date color
export const HIJRI_COLOR = "#2F6F4E"; // Hijri date color
export const TODAY_BG = "#DEB758"; // Today's date background
```

### Holidays Display

```javascript
export const SHOW_CARRY_OVER_HOLIDAYS = true; // Show holidays from adjacent months
```

### Holiday Definitions

Add holidays to the `HOLIDAYS` array:

```javascript
export const HOLIDAYS = [
  {
    name: { ar: "عيد الفطر", en: "Eid Al-Fitr" },
    start: "2026-03-14",
    end: "2026-03-25",
    color: "#cd9364",
  },
  {
    name: { ar: "عيد الأضحى", en: "Eid Al-Adha" },
    start: "2026-05-23",
    end: "2026-05-31",
    color: "#cd9364",
  },
];
```

## API

### Functions

#### `renderCalendar(date)`

Renders the calendar for a specific date. Called automatically on month navigation.

```javascript
import { renderCalendar } from "./calendar.js";

const date = new Date(2026, 0, 1);
renderCalendar(date);
```

### Hijri Date Utilities (Zero Dependencies)

The `hijriConverter.js` module provides utility functions for working with Hijri dates using native browser APIs:

```javascript
import {
  getHijriDate,
  getHijriMonthName,
  getHijriYear,
  getHijriDay,
  formatHijriDate,
} from "./date/hijriConverter.js";

// Get full Hijri date object
const hijri = getHijriDate(new Date());
// { year: 1447, month: 6, day: 15 }

// Get Hijri month name
const monthName = getHijriMonthName(new Date(), "ar");
// "جمادى الآخرة"

// Get individual components
const year = getHijriYear(new Date()); // 1447
const day = getHijriDay(new Date()); // 15

// Format complete Hijri date
const formatted = formatHijriDate(new Date(), "ar");
// {
//   day: 15,
//   month: 6,
//   monthName: "جمادى الآخرة",
//   year: 1447,
//   formatted: "15/6/1447"
// }
```

**No imports needed for the calendar itself** - it handles date conversion internally!

### Navigation

The calendar includes built-in navigation:

- **Buttons**: Click "Previous" and "Next" buttons
- **Keyboard**: Use Left/Right arrow keys

```html
<button id="prevMonth">Previous</button> <button id="nextMonth">Next</button>
```

## File Structure

```
src/
├── calendar.js              # Main calendar component
├── calendar.css             # Styles
├── config.js                # Configuration & holidays
├── index.js                 # Backward compatibility
└── date/
    ├── getHolidayForDate.js
    ├── isHolidayVisibleInMonth.js
    ├── isCarryOverHoliday.js
    ├── isRangeOverlapping.js
    ├── normalizeDate.js
    └── getUmmAlQuraDate.js
```

## Accessibility

- ✓ Full keyboard navigation (Arrow Left/Right for month navigation)
- ✓ ARIA labels on all calendar cells
- ✓ Automatic RTL (Right-to-Left) support for Arabic
- ✓ High contrast design suitable for screen readers
- ✓ Focus indicators on interactive elements

## Customization

### Custom Styling

Override CSS variables or classes:

```css
.calendar-container {
  width: 500px; /* Make it wider */
}

.day-cell .date-content {
  border-radius: 8px; /* Add rounded corners */
}
```

### Custom Colors

Edit `src/config.js`:

```javascript
export const GREGORIAN_COLOR = "#3498db";
export const HIJRI_COLOR = "#e74c3c";
export const TODAY_BG = "#f39c12";
```

### Add More Holidays

```javascript
export const HOLIDAYS = [
  // ... existing holidays
  {
    name: { ar: "اليوم الوطني", en: "National Day" },
    start: "2026-09-23",
    end: "2026-09-23",
    color: "#27ae60",
  },
];
```

## Browser Support

For Hijri calendar (Islamic calendar) support:

- **Chrome/Edge**: 85+ (full Intl.DateTimeFormat Islamic support)
- **Firefox**: 93+
- **Safari**: 15+
- **Mobile browsers**: Fully supported (iOS Safari 15+, Chrome Mobile 85+)

For basic calendar functionality:

- All modern browsers with ES6 support

Uses native `Intl.DateTimeFormat` with zero external dependencies!

## Dependencies

**Zero runtime dependencies!** This package uses only native browser APIs.

- No npm packages required
- Uses `Intl.DateTimeFormat` with Islamic calendar support
- Significantly smaller bundle size

## Optional: Advanced Hijri Calculations

If you need additional Islamic calendar systems (Astronomical, Saudi Umm Al-Qura alternatives, etc.), you can optionally use:

```bash
npm install hijri-converter  # For advanced conversions
```

But it's not required for basic usage - the default Umm Al-Qura (via Intl API) works great for most cases!

## Development

```bash
# Install dev dependencies (Vite for bundling)
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Changelog

### Version 1.0.0

- Initial release
- Dual calendar display
- Multilingual support
- Holiday management
- Accessibility improvements
- RTL support
- Keyboard navigation
