import { useCalendar } from './components/calendar/useCalendar'
import { useRangeSelection } from './components/calendar/useRangeSelection'
import CalendarGrid from './components/calendar/CalendarGrid'
import NotesPanel from './components/notes/NotesPanel'
import HeroImage from './components/layout/HeroImage'

// ── Sub-components ─────────────────────────────────────────────────────────────

function SelectionHint({ hasSelection, hasRange, startDate, endDate }) {
  if (!hasSelection) {
    return (
      <p className="mt-5 text-xs text-center text-stone-300">
        Click a day to start selecting a range
      </p>
    )
  }

  if (!hasRange) {
    return (
      <p className="mt-5 text-xs text-center text-blue-300 animate-pulse">
        Click another day to complete the range
      </p>
    )
  }

  const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  return (
    <p className="mt-5 text-xs text-center text-stone-400">
      {fmt(startDate)} → {fmt(endDate)}
      <span className="text-stone-300"> · Click any day to reset</span>
    </p>
  )
}

// ── App ────────────────────────────────────────────────────────────────────────

export default function App() {
  const calendar = useCalendar()
  const range = useRangeSelection()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-stone-200 to-stone-300">

      {/* Main card */}
      <div className="w-full max-w-3xl rounded-[28px] overflow-hidden bg-[#faf9f7] shadow-2xl shadow-black/20 ring-1 ring-white/70">

        {/* Hero image with month badge */}
        <HeroImage
          currentMonth={calendar.currentMonth}
          currentYear={calendar.currentYear}
          monthName={calendar.monthName}
        />

        {/* Body: Notes | Calendar */}
        <div className="flex flex-col md:flex-row">

          {/* Notes — left column */}
          <div className="md:w-56 lg:w-64 shrink-0 px-7 pb-7 pt-12 border-b md:border-b-0 md:border-r border-black/[0.06]">
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
          <div className="flex-1 flex flex-col px-6 md:px-7 pb-7">
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