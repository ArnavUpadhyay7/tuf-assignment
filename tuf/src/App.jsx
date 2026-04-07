import { useCalendar } from './components/calendar/useCalendar'
import { useRangeSelection } from './components/calendar/useRangeSelection'
import CalendarGrid from './components/calendar/CalendarGrid'
import NotesPanel from './components/notes/NotesPanel'
import HeroImage from './components/layout/HeroImage'

/**
 * Root application component.
 *
 * Layout (desktop):
 *   ┌─────────────┬─────────────────────┐
 *   │  Hero Image │  Calendar   | Notes │
 *   └─────────────┴─────────────────────┘
 *
 * Layout (mobile):
 *   ┌──────────────────────────┐
 *   │        Hero Image        │
 *   ├──────────────────────────┤
 *   │       Calendar Grid      │
 *   ├──────────────────────────┤
 *   │        Notes Panel       │
 *   └──────────────────────────┘
 */
export default function App() {
  const calendar = useCalendar()
  const range = useRangeSelection()

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 md:p-8">
      {/* Calendar Card */}
      <div
        className="w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl shadow-gray-200"
        style={{ minHeight: '560px' }}
      >
        {/* Two-column on md+, stacked on mobile */}
        <div className="flex flex-col md:flex-row h-full">

          {/* ── Column 1: Hero Image ── */}
          <div className="md:w-[42%] flex-shrink-0">
            <HeroImage
              currentMonth={calendar.currentMonth}
              currentYear={calendar.currentYear}
              monthName={calendar.monthName}
            />
          </div>

          {/* ── Column 2: Calendar + Notes ── */}
          <div className="flex-1 flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">

            {/* Calendar Grid */}
            <div className="flex-1 p-6 md:p-7">
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

              {/* Range selection hint */}
              <SelectionHint
                hasSelection={range.hasSelection}
                hasRange={range.hasRange}
                startDate={range.startDate}
                endDate={range.endDate}
              />
            </div>

            {/* Notes Panel */}
            <div className="w-full md:w-52 lg:w-60 p-6 md:p-7 flex flex-col bg-gray-50/50">
              <NotesPanel
                currentYear={calendar.currentYear}
                currentMonth={calendar.currentMonth}
                startDate={range.startDate}
                endDate={range.endDate}
                rangeKey={range.rangeKey}
                onClearRange={range.reset}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** Small hint shown below the calendar to guide range selection */
function SelectionHint({ hasSelection, hasRange, startDate, endDate }) {
  if (!hasSelection) {
    return (
      <p className="mt-4 text-xs text-gray-300 text-center">
        Click a day to start selecting a range
      </p>
    )
  }

  if (hasSelection && !hasRange) {
    return (
      <p className="mt-4 text-xs text-blue-400 text-center animate-pulse">
        Click another day to complete the range
      </p>
    )
  }

  return (
    <p className="mt-4 text-xs text-gray-400 text-center">
      {startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      {' → '}
      {endDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      {' · Click any day to reset'}
    </p>
  )
}
