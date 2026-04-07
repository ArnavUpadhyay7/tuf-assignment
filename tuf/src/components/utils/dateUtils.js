export const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/**
 * Returns the grid of day objects for a given month.
 * Includes leading days from the previous month and
 * trailing days from the next month to fill complete weeks.
 */
export function buildCalendarGrid(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  const startOffset = firstDay.getDay() // 0 = Sunday
  const totalDays = lastDay.getDate()

  const cells = []

  // Leading days from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate()
  for (let i = startOffset - 1; i >= 0; i--) {
    cells.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false,
    })
  }

  // Current month days
  for (let d = 1; d <= totalDays; d++) {
    cells.push({
      date: new Date(year, month, d),
      isCurrentMonth: true,
    })
  }

  // Trailing days to complete last row
  const remaining = 7 - (cells.length % 7)
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      cells.push({
        date: new Date(year, month + 1, d),
        isCurrentMonth: false,
      })
    }
  }

  return cells
}

/**
 * Returns a stable string key for a date: "YYYY-MM-DD"
 */
export function dateKey(date) {
  if (!date) return null
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

/**
 * Returns true if two dates represent the same calendar day
 */
export function isSameDay(a, b) {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/**
 * Returns true if date is today
 */
export function isToday(date) {
  return isSameDay(date, new Date())
}

/**
 * Returns true if date is strictly between start and end (exclusive)
 */
export function isBetween(date, start, end) {
  if (!start || !end) return false
  const [from, to] = start <= end ? [start, end] : [end, start]
  return date > from && date < to
}

/**
 * Returns a formatted range label like "Jan 3 – Jan 17, 2026"
 */
export function formatRange(start, end) {
  if (!start) return null
  const opts = { month: 'short', day: 'numeric' }
  const startStr = start.toLocaleDateString('en-US', opts)
  if (!end || isSameDay(start, end)) return startStr
  const endStr = end.toLocaleDateString('en-US', { ...opts, year: 'numeric' })
  return `${startStr} – ${endStr}`
}

/**
 * Generates a localStorage key for notes tied to a year-month
 */
export function notesStorageKey(year, month, rangeKey = null) {
  if (rangeKey) return `wall-cal-note-range-${rangeKey}`
  return `wall-cal-note-${year}-${month}`
}
