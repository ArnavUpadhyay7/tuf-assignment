import { useCalendar } from './components/calendar/useCalendar'
import { useRangeSelection } from './components/calendar/useRangeSelection'
import CalendarGrid from './components/calendar/CalendarGrid'
import NotesPanel from './components/notes/NotesPanel'
import HeroImage from './components/layout/HeroImage'

export default function App() {
  const calendar = useCalendar()
  const range = useRangeSelection()

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 md:p-8"
      style={{ background: 'linear-gradient(135deg, #e8e4dc 0%, #d6d0c8 100%)' }}
    >
      {/* ── Main Card ── */}
      <div
        className="w-full max-w-3xl rounded-[2rem] overflow-hidden"
        style={{
          background: '#faf9f7',
          boxShadow:
            '0 4px 6px -1px rgba(0,0,0,0.04), 0 20px 60px -10px rgba(0,0,0,0.18), 0 0 0 1px rgba(255,255,255,0.8) inset',
        }}
      >
        {/* ── Top: Hero Image ── */}
        <HeroImage
          currentMonth={calendar.currentMonth}
          currentYear={calendar.currentYear}
          monthName={calendar.monthName}
        />

        {/* ── Bottom: Notes | Calendar ── */}
        <div className="flex flex-col md:flex-row">

          {/* Notes — left column */}
          <div
            className="md:w-56 lg:w-64 flex-shrink-0 p-7 md:border-r"
            style={{ borderColor: 'rgba(0,0,0,0.06)' }}
          >
            <NotesPanel
              currentYear={calendar.currentYear}
              currentMonth={calendar.currentMonth}
              startDate={range.startDate}
              endDate={range.endDate}
              rangeKey={range.rangeKey}
              onClearRange={range.reset}
            />
          </div>

          {/* Calendar — right column */}
          <div className="flex-1 p-6 md:p-7 flex flex-col">
            <CalendarGrid
              currentYear={calendar.currentYear}
              currentMonth={calendar.currentMonth}
              monthName={calendar.monthName}
              calendarGrid={calendar.calendarGrid}
              goToPrevMonth={calendar.goToPrevMonth}
              goToNextMonth={calendar.goToNextMonth}
              goToToday={calendar.goToToday}
              getDayState={range.getDayState}
              handleDayClick={range.handleDayClick}
              setHoverDate={range.setHoverDate}
            />

            <SelectionHint
              hasSelection={range.hasSelection}
              hasRange={range.hasRange}
              startDate={range.startDate}
              endDate={range.endDate}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function SelectionHint({ hasSelection, hasRange, startDate, endDate }) {
  if (!hasSelection) {
    return (
      <p className="mt-5 text-xs text-center" style={{ color: '#b8b0a4' }}>
        Click a day to start selecting a range
      </p>
    )
  }
  if (hasSelection && !hasRange) {
    return (
      <p className="mt-5 text-xs text-center animate-pulse" style={{ color: '#7c9fc9' }}>
        Click another day to complete the range
      </p>
    )
  }
  return (
    <p className="mt-5 text-xs text-center" style={{ color: '#9a9390' }}>
      {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      {' → '}
      {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      {' · Click any day to reset'}
    </p>
  )
}