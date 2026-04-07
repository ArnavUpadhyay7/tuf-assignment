import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DayCell from './DayCell'
import { DAYS_OF_WEEK } from '../utils/dateUtils'

/**
 * Renders the full calendar month grid including:
 *  - Month/year header with prev/next/today navigation
 *  - Day-of-week header row
 *  - Full grid of DayCell components
 */
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
    <div className="flex flex-col gap-4">
      {/* Header: Month + Navigation
          min-w-0 on the row enables the text child to truncate correctly.
          flex-shrink-0 on controls keeps them from ever being squeezed. */}
      <div className="flex items-center justify-between gap-2 min-w-0">
        {/* Text side — takes remaining space, clips on overflow */}
        <div className="min-w-0 flex-1">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight leading-tight truncate">
            {monthName}
          </h2>
          <span className="text-xs text-gray-400 font-medium mt-0.5 block">
            {currentYear}
          </span>
        </div>

        {/* Controls — fixed size, never shrink */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={goToToday}
            className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors duration-150 whitespace-nowrap"
          >
            Today
          </button>
          <button
            onClick={goToPrevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors duration-150"
            aria-label="Previous month"
          >
            <ChevronLeftIcon />
          </button>
          <button
            onClick={goToNextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 hover:text-gray-800 transition-colors duration-150"
            aria-label="Next month"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </div>

      {/* Day of week headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center h-8 text-xs font-semibold text-gray-400 uppercase tracking-wider"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Day cells grid — animated on month change */}
      <AnimatePresence mode="wait">
        <motion.div
          key={monthKey}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-7 gap-y-0.5"
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

function ChevronLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}