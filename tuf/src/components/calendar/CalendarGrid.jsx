import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DayCell from './DayCell'
import { DAYS_OF_WEEK } from '../utils/dateUtils'

// ── Sub-components ─────────────────────────────────────────────────────────────

function NavButton({ onClick, children, pill = false, 'aria-label': ariaLabel }) {
  if (pill) {
    return (
      <button
        onClick={onClick}
        className="px-3 py-1 text-[11px] font-semibold tracking-wide rounded-full text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors duration-150"
      >
        {children}
      </button>
    )
  }
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-8 h-8 flex items-center justify-center rounded-full text-stone-400 hover:bg-black/6 hover:text-stone-700 transition-all duration-150"
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
  monthName,
  calendarGrid,
  goToPrevMonth,
  goToNextMonth,
  goToToday,
  getDayState,
  handleDayClick,
  setHoverDate,
}) {
  const monthKey = `${currentYear}-${currentMonth}`

  return (
    <div className="flex flex-col gap-5 pt-9">

      {/* Navigation row */}
      <div className="flex items-center justify-end gap-1">
        <NavButton onClick={goToToday} pill>Today</NavButton>
        <NavButton onClick={goToPrevMonth} aria-label="Previous month"><ChevronLeft /></NavButton>
        <NavButton onClick={goToNextMonth} aria-label="Next month"><ChevronRight /></NavButton>
      </div>

      {/* Day-of-week headers */}
      <div className="grid grid-cols-7">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center h-7 text-[10px] font-semibold uppercase tracking-widest text-stone-300"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Animated day grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={monthKey}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-7"
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
                onClick={handleDayClick}
                onMouseEnter={(d) => setHoverDate(d)}
                onMouseLeave={() => setHoverDate(null)}
              />
            )
          })}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}