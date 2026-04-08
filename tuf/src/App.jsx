import { useCalendar } from './components/calendar/useCalendar'
import { useRangeSelection } from './components/calendar/useRangeSelection'
import { motion, AnimatePresence } from 'framer-motion'
import CalendarGrid from './components/calendar/CalendarGrid'
import NotesPanel from './components/notes/NotesPanel'
import HeroImage from './components/layout/HeroImage'

const cardVariants = {
  initial: (dir) => ({
    rotateX: dir >= 0 ? 82 : -82,
    opacity: 0,
    translateZ: -20,
    transformOrigin: 'top center',
  }),
  animate: {
    rotateX: 0,
    opacity: 1,
    translateZ: 0,
    transformOrigin: 'top center',
    transition: {
      rotateX:    { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
      opacity:    { duration: 0.18, ease: 'easeIn' },
      translateZ: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
    },
  },
  exit: (dir) => ({
    rotateX: dir >= 0 ? -75 : 75,
    opacity: 0,
    translateZ: -30,
    transformOrigin: 'top center',
    transition: {
      rotateX:    { duration: 0.52, ease: [0.4, 0, 0.8, 0] },
      opacity:    { duration: 0.25, ease: 'easeOut', delay: 0.2 },
      translateZ: { duration: 0.52, ease: [0.4, 0, 0.8, 0] },
    },
  }),
}

function SelectionHint({ hasSelection, hasRange, startDate, endDate }) {
  const fmt = (d) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  if (!hasSelection) {
    return (
      // Slightly warmer/darker than before — stone-400 reads clearly over white
      <p className="mt-5 text-xs text-center text-stone-400">
        Click a day to start selecting a range
      </p>
    )
  }
  if (!hasRange) {
    return (
      // Blue-500 ensures this pulsing prompt is unmissable
      <p className="mt-5 text-xs text-center text-blue-500 animate-pulse">
        Click another day to complete the range
      </p>
    )
  }
  return (
    <p className="mt-5 text-xs text-center text-stone-500">
      {fmt(startDate)}
      <span className="mx-1.5 text-stone-400">→</span>
      {fmt(endDate)}
      <span className="text-stone-400"> · Click any day to reset</span>
    </p>
  )
}

export default function App() {
  const calendar = useCalendar()
  const range    = useRangeSelection()

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-linear-to-br from-stone-200 to-stone-300">

      <div
        className="w-full max-w-3xl relative"
        style={{
          perspective:       '1600px',
          perspectiveOrigin: '50% 22%',
        }}
      >
        {/* Stacked-pages shadow layer */}
        <div
          className="absolute inset-0 rounded-[28px] bg-[#e8e3de] ring-1 ring-black/5"
          style={{
            transform:  'scaleX(0.968) translateY(5px)',
            boxShadow:  '0 28px 70px rgba(0,0,0,0.26), 0 8px 20px rgba(0,0,0,0.14)',
            zIndex:      0,
          }}
          aria-hidden
        >
          <div
            className="absolute left-[7%] right-[7%] top-0 h-px opacity-40"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6) 30%, rgba(255,255,255,0.6) 70%, transparent)' }}
          />
        </div>

        <AnimatePresence mode="popLayout" custom={calendar.direction}>
          <motion.div
            key={`${calendar.currentYear}-${calendar.currentMonth}`}
            custom={calendar.direction}
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              transformStyle: 'preserve-3d',
              willChange:     'transform, opacity',
              position:       'relative',
              zIndex:          10,
            }}
            className="w-full rounded-[28px] overflow-hidden bg-[#faf9f7]"
          >
            {/* Inner shadow ring */}
            <div
              className="absolute inset-0 rounded-[28px] pointer-events-none z-50"
              style={{
                boxShadow: '0 24px 60px rgba(0,0,0,0.22), 0 6px 18px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.85)',
              }}
              aria-hidden
            />

            <HeroImage
              currentMonth={calendar.currentMonth}
              currentYear={calendar.currentYear}
              monthName={calendar.monthName}
            />

            <div className="flex flex-col md:flex-row">

              {/* Notes column */}
              <div className="md:w-56 lg:w-64 shrink-0 px-7 pb-7 pt-12 border-b md:border-b-0 md:border-r border-black/6">
                <NotesPanel
                  currentYear={calendar.currentYear}
                  currentMonth={calendar.currentMonth}
                  startDate={range.startDate}
                  endDate={range.endDate}
                  rangeKey={range.rangeKey}
                  onClearRange={range.reset}
                />
              </div>

              {/* Calendar column */}
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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}