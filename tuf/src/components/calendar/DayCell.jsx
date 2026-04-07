import React from 'react'
import { isToday } from '../utils/dateUtils'

export default function DayCell({
  date,
  isCurrentMonth,
  // Confirmed selection
  isStart,
  isEnd,
  inRange,
  isRangeStart,
  isRangeEnd,
  // Hover preview
  isInPreviewRange,
  isPreviewStart,
  isPreviewEnd,
  // Handlers
  onClick,
  onMouseEnter,
  onMouseLeave,
}) {
  const today = isToday(date)
  const dayNumber = date.getDate()

  const isEndpoint = isStart || isEnd
  // A preview endpoint that isn't also the confirmed start
  const isPreviewEndpoint = (isPreviewStart || isPreviewEnd) && !isEndpoint

  // ── Container: range / preview strip ───────────────────────────────────────
  let containerClasses =
    'relative flex items-center justify-center h-9 cursor-pointer select-none transition-colors duration-100'

  if (inRange) {
    containerClasses += ' bg-blue-50'
    if (isRangeStart) containerClasses += ' rounded-l-full'
    if (isRangeEnd)   containerClasses += ' rounded-r-full'
  } else if (isInPreviewRange) {
    containerClasses += ' bg-blue-100'
    if (isPreviewStart) containerClasses += ' rounded-l-full'
    if (isPreviewEnd)   containerClasses += ' rounded-r-full'
  }

  // ── Inner circle ────────────────────────────────────────────────────────────
  let circleClasses =
    'relative z-10 flex items-center justify-center h-9 w-9 rounded-full text-sm transition-all duration-100'

  if (isEndpoint) {
    circleClasses += ' bg-blue-500 text-white font-semibold shadow-sm'
  } else if (isPreviewEndpoint) {
    circleClasses += ' bg-blue-300 text-white font-semibold'
  } else if (today) {
    circleClasses += ' font-semibold text-blue-600'
  } else if (!isCurrentMonth) {
    circleClasses += ' text-gray-300 font-normal'
  } else {
    circleClasses += ' text-gray-700 font-normal hover:bg-gray-100'
  }

  return (
    <div
      className={containerClasses}
      onClick={() => isCurrentMonth && onClick(date)}
      onMouseEnter={() => onMouseEnter?.(date)}
      onMouseLeave={() => onMouseLeave?.()}
      role="button"
      aria-label={date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
      aria-pressed={isEndpoint}
      tabIndex={isCurrentMonth ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          isCurrentMonth && onClick(date)
        }
      }}
    >
      {/* Today indicator dot */}
      {today && !isEndpoint && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
      )}

      <span className={circleClasses}>{dayNumber}</span>
    </div>
  )
}