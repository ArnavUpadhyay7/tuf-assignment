import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DayCell from './DayCell'
import { DAYS_OF_WEEK } from '../utils/dateUtils'

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
    <div className="flex flex-col gap-5" style={{ paddingTop: '36px' }}>

      {/* ── Nav row ── */}
      <div className="flex items-center justify-end gap-1">
        <button
          onClick={goToToday}
          className="px-3 py-1 text-xs font-semibold rounded-full transition-all duration-150"
          style={{
            color: '#2563eb',
            background: 'rgba(37,99,235,0.08)',
            letterSpacing: '0.02em',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(37,99,235,0.15)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(37,99,235,0.08)'}
        >
          Today
        </button>
        <button
          onClick={goToPrevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150"
          style={{ color: '#9a9390' }}
          aria-label="Previous month"
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; e.currentTarget.style.color = '#3d3733' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9a9390' }}
        >
          <ChevronLeftIcon />
        </button>
        <button
          onClick={goToNextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-full transition-all duration-150"
          style={{ color: '#9a9390' }}
          aria-label="Next month"
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.06)'; e.currentTarget.style.color = '#3d3733' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#9a9390' }}
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* ── Day headers ── */}
      <div className="grid grid-cols-7">
        {DAYS_OF_WEEK.map((day) => (
          <div
            key={day}
            className="flex items-center justify-center h-7 font-semibold uppercase tracking-widest"
            style={{ color: '#c4bdb7', fontSize: '0.62rem' }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* ── Animated day grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={monthKey}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -32 }}
          transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
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
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
      <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}