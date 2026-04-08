import DayCell from './DayCell'
import { DAYS_OF_WEEK } from '../utils/dateUtils'

const GRID_HEIGHT = 216

// ── Holidays ──────────────────────────────────────────────────────────────────
const HOLIDAYS = {
  '01-01': "New Year's Day",
  '01-13': 'Lohri',
  '01-14': 'Makar Sankranti / Pongal',
  '01-23': 'Netaji Subhas Chandra Bose Jayanti',
  '01-26': 'Republic Day',
  '02-05': 'Basant Panchami',
  '02-14': 'Valentine\u2019s Day',
  '02-18': 'Maha Shivaratri',
  '03-08': 'Holi',
  '03-22': 'Ugadi / Gudi Padwa',
  '03-30': 'Ram Navami',
  '04-03': 'Good Friday',
  '04-04': 'Mahavir Jayanti',
  '04-14': 'Ambedkar Jayanti / Baisakhi',
  '04-21': 'Eid al-Fitr',
  '05-01': 'Labour Day / Maharashtra Day',
  '05-05': 'Buddha Purnima',
  '06-19': 'Eid al-Adha (Bakrid)',
  '07-29': 'Muharram',
  '08-15': 'Independence Day',
  '08-19': 'Raksha Bandhan',
  '08-26': 'Janmashtami',
  '09-07': 'Ganesh Chaturthi',
  '09-16': 'Onam',
  '10-02': 'Gandhi Jayanti',
  '10-12': 'Durga Puja / Maha Ashtami',
  '10-24': 'Dussehra',
  '11-01': 'Karva Chauth',
  '11-12': 'Diwali',
  '11-15': 'Bhai Dooj',
  '11-19': 'Chhath Puja',
  '11-27': 'Guru Nanak Jayanti',
  '12-25': 'Christmas Day',
  '12-31': 'New Year\u2019s Eve',
}

function getHolidayName(date) {
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return HOLIDAYS[`${mm}-${dd}`] ?? null
}

// ── Nav components ────────────────────────────────────────────────────────────

function NavButton({ onClick, children, pill = false, 'aria-label': ariaLabel }) {
  if (pill) {
    return (
      <button
        onClick={onClick}
        className="px-3 py-1 text-[11px] font-semibold tracking-wide rounded-full
          text-blue-600 bg-blue-50 hover:bg-blue-100
          transition-colors duration-150"
      >
        {children}
      </button>
    )
  }
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-8 h-8 flex items-center justify-center rounded-full
        text-stone-400 hover:bg-black/6 hover:text-stone-600
        transition-all duration-150"
    >
      {children}
    </button>
  )
}

function ChevronLeft() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRight() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── CalendarGrid ──────────────────────────────────────────────────────────────

export default function CalendarGrid({
  currentYear,
  currentMonth,
  calendarGrid,
  goToPrevMonth,
  goToNextMonth,
  goToToday,
  getDayState,
  handleDayClick,
  setHoverDate,
}) {
  return (
    <div className="flex flex-col gap-5 pt-9">

      {/* Navigation row */}
      <div className="flex items-center justify-end gap-1">
        <NavButton onClick={goToToday} pill>Today</NavButton>
        <NavButton onClick={goToPrevMonth} aria-label="Previous month"><ChevronLeft /></NavButton>
        <NavButton onClick={goToNextMonth} aria-label="Next month"><ChevronRight /></NavButton>
      </div>

      {/*
       * Day-of-week headers
       * Bumped from text-stone-300 → text-stone-400 for readable contrast
       * while keeping the soft premium tone.
       */}
      <div className="grid grid-cols-7">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center h-7
              text-[10px] font-semibold uppercase tracking-widest text-stone-400"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day grid */}
      <div
        className="grid grid-cols-7 content-start"
        style={{ height: GRID_HEIGHT }}
      >
        {calendarGrid.map(({ date, isCurrentMonth }) => {
          const state = getDayState(date)
          return (
            <DayCell
              key={date.toISOString()}
              date={date}
              isCurrentMonth={isCurrentMonth}
              isStart={state.isStart}
              isEnd={state.isEnd}
              inRange={state.inRange}
              isRangeStart={state.isRangeStart}
              isRangeEnd={state.isRangeEnd}
              isInPreviewRange={state.isInPreviewRange}
              isPreviewStart={state.isPreviewStart}
              isPreviewEnd={state.isPreviewEnd}
              holidayName={getHolidayName(date)}
              onClick={handleDayClick}
              onMouseEnter={(d) => setHoverDate(d)}
              onMouseLeave={() => setHoverDate(null)}
            />
          )
        })}
      </div>

    </div>
  )
}