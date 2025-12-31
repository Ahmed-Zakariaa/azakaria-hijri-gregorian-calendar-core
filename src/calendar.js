import { getHolidayForDate } from "./date/getHolidayForDate.js";
import { isHolidayVisibleInMonth } from "./date/isHolidayVisibleInMonth.js";
import {
  getHijriMonthName,
  getHijriYear,
  getHijriDay,
} from "./date/hijriConverter.js";
import {
  LANG,
  GREGORIAN_COLOR,
  HIJRI_COLOR,
  TODAY_BG,
  SHOW_CARRY_OVER_HOLIDAYS,
  HOLIDAYS,
} from "./config.js";

("use strict");

let currentDate = new Date();
currentDate.setDate(1);

// Detect RTL for Arabic
const isRTL = LANG === "ar";
if (isRTL) {
  document.documentElement.dir = "rtl";
  document.documentElement.lang = "ar";
}

const calendarEl = document.getElementById("calendar");
const monthTitleEl = document.getElementById("monthTitle");
const weekdaysEl = document.getElementById("weekdays");
const legendEl = document.getElementById("legend");

// ====== FORMATTERS ======
function getGregorianMonthFormatter() {
  return new Intl.DateTimeFormat(LANG === "ar" ? "ar-SA" : "en-US", {
    month: "long",
    year: "numeric",
  });
}

function getHijriMonthFormatter() {
  return new Intl.DateTimeFormat(
    LANG === "ar" ? "ar-SA-u-ca-islamic" : "en-US-u-ca-islamic",
    {
      month: "long",
      year: "numeric",
    }
  );
}

function getWeekdayFormatter() {
  return new Intl.DateTimeFormat(LANG === "ar" ? "ar-SA" : "en-US", {
    weekday: "short",
  });
}

// ====== HELPERS ======
function getHijriDayFormatter() {
  return new Intl.DateTimeFormat(
    LANG === "ar" ? "ar-SA-u-ca-islamic" : "en-US-u-ca-islamic",
    {
      day: "numeric",
    }
  );
}

// ====== RENDER WEEKDAYS ======
function renderWeekdays() {
  weekdaysEl.innerHTML = "";
  const weekdayFormatter = getWeekdayFormatter();
  const startDate = new Date(2024, 0, 7); // A Sunday

  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dayName = weekdayFormatter.format(date);
    const weekdayDiv = document.createElement("div");
    weekdayDiv.textContent = dayName.toUpperCase();
    weekdaysEl.appendChild(weekdayDiv);
  }
}

// ====== RENDER HEADER ======
function renderHeader(date) {
  const gregorianFormatter = getGregorianMonthFormatter();

  const gregorianText = gregorianFormatter.format(date);

  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const hijriMonthStart = getHijriMonthName(firstDayOfMonth, LANG);
  const hijriMonthEnd = getHijriMonthName(lastDayOfMonth, LANG);
  const hijriYear = getHijriYear(firstDayOfMonth);

  const hijriHeader =
    hijriMonthStart === hijriMonthEnd
      ? `${hijriMonthStart} ${hijriYear}`
      : `${hijriMonthStart} / ${hijriMonthEnd} ${hijriYear}`;

  monthTitleEl.innerHTML = `
    <span style="color:${GREGORIAN_COLOR}">
      ${gregorianText}
    </span>
    <span style="color:${HIJRI_COLOR}">
      ${hijriHeader}
    </span>
  `;
}

// ====== RENDER CALENDAR ======
function renderCalendar(date) {
  calendarEl.innerHTML = "";
  calendarEl.setAttribute("role", "table");
  renderWeekdays();
  renderHeader(date);

  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const fragment = document.createDocumentFragment();

  // Empty cells
  for (let i = 0; i < firstDayIndex; i++) {
    fragment.appendChild(document.createElement("div"));
  }

  // Days
  for (let day = 1; day <= daysInMonth; day++) {
    const cellDate = new Date(year, month, day);
    const hijriDay = getHijriDay(cellDate);
    const cell = document.createElement("div");
    cell.className = "day-cell";
    cell.setAttribute("role", "cell");

    cell.innerHTML = `
      <div class="date-content">
        <span class="gregorian" style="color:${GREGORIAN_COLOR}">
          ${day}
        </span>
        <span class="hijri" style="color:${HIJRI_COLOR}">
          ${hijriDay}
        </span>
      </div>
    `;

    const isToday =
      cellDate.getDate() === today.getDate() &&
      cellDate.getMonth() === today.getMonth() &&
      cellDate.getFullYear() === today.getFullYear();

    // Holiday background
    const holiday = getHolidayForDate(cellDate, HOLIDAYS);
    if (holiday) {
      const content = cell.querySelector(".date-content");
      content.style.backgroundColor = holiday.color;
      content.querySelector(".hijri").style.color = "#fff";
      content.querySelector(".gregorian").style.color = "#fff";

      cell.title = holiday.name[LANG];
      cell.setAttribute(
        "aria-label",
        `${day} ${LANG === "ar" ? "يوم عطلة" : "Holiday"}: ${
          holiday.name[LANG]
        }`
      );
    } else if (isToday) {
      cell.querySelector(".date-content").style.backgroundColor = TODAY_BG;
      cell.setAttribute(
        "aria-label",
        `${day} ${LANG === "ar" ? "اليوم" : "Today"}`
      );
    }

    fragment.appendChild(cell);
  }

  calendarEl.appendChild(fragment);
  renderLegend();
}

// ====== LEGEND ======
function renderLegend() {
  legendEl.innerHTML = "";

  const visibleHolidays = HOLIDAYS.filter((h) =>
    isHolidayVisibleInMonth(h, currentDate, {
      allowCarryOver: SHOW_CARRY_OVER_HOLIDAYS,
    })
  );

  if (visibleHolidays.length === 0) {
    legendEl.style.display = "none";
    return;
  }

  legendEl.style.display = "flex";

  visibleHolidays.forEach((h) => {
    const item = document.createElement("div");
    item.className = "legend-item";
    item.innerHTML = `
      <span class="legend-color" style="background:${h.color}"></span>
      ${h.name[LANG]}
    `;
    legendEl.appendChild(item);
  });
}

// ====== NAVIGATION ======
document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  } else if (e.key === "ArrowRight") {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  }
});

// ====== INITIAL RENDER ======
renderCalendar(currentDate);
