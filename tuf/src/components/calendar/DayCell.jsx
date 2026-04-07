import React, { useState } from 'react'
import { isToday } from '../utils/dateUtils'

export default function DayCell({
  date,
  isCurrentMonth,
  isStart,
  isEnd,
  inRange,
  isRangeStart,
  isRangeEnd,
  isInPreviewRange,
  isPreviewStart,
  isPreviewEnd,
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  const [hovered, setHovered] = useState(false)
  const today = isToday(date)
  const dayNumber = date.getDate()
  const isEndpoint = isStart || isEnd
  const isPreviewEndpoint = (isPreviewStart || isPreviewEnd) && !isEndpoint

  // ── Strip (range fill band) ──────────────────────────────────────────────
  const stripBase = 'relative flex items-center justify-center h-9 select-none transition-colors duration-100'

  const stripRange = (() => {
    if (inRange) {
      if (isRangeStart) return 'bg-blue-50 rounded-l-full'
      if (isRangeEnd)   return 'bg-blue-50 rounded-r-full'
      return 'bg-blue-50'
    }
    if (isInPreviewRange) {
      if (isPreviewStart) return 'bg-blue-50/60 rounded-l-full'
      if (isPreviewEnd)   return 'bg-blue-50/60 rounded-r-full'
      return 'bg-blue-50/60'
    }
    return ''
  })()

  const stripCursor = isCurrentMonth ? 'cursor-pointer' : 'cursor-default'

  // ── Circle (day number bubble) ───────────────────────────────────────────
  const circleBase = 'relative z-10 flex items-center justify-center w-[34px] h-[34px] rounded-full text-[13px] transition-all duration-150'

  const circleVariant = (() => {
    if (isEndpoint)      return 'bg-gradient-to-br from-blue-500 to-blue-700 text-white font-semibold shadow-lg shadow-blue-500/40 scale-105'
    if (isPreviewEndpoint) return 'bg-blue-100 text-blue-600 font-medium'
    if (today)           return 'text-blue-600 font-bold'
    if (!isCurrentMonth) return 'text-stone-300 font-light'
    if (hovered)         return 'bg-black/5 text-stone-700 scale-105'
    return 'text-stone-600 font-normal'
  })()

  return (
    <div
      className={`${stripBase} ${stripRange} ${stripCursor}`}
      onClick={() => isCurrentMonth && onClick(date)}
      onMouseEnter={() => { setHovered(true); onMouseEnter?.(date) }}
      onMouseLeave={() => { setHovered(false); onMouseLeave?.() }}
      role="button"
      tabIndex={isCurrentMonth ? 0 : -1}
      aria-label={date.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      })}
      aria-pressed={isEndpoint}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          isCurrentMonth && onClick(date)
        }
      }}
    >
      {/* Today indicator dot */}
      {today && !isEndpoint && (
        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500 z-20" />
      )}

      <span className={`${circleBase} ${circleVariant}`}>
        {dayNumber}
      </span>
    </div>
  )
}