import React from 'react'
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
  const today = isToday(date)
  const dayNumber = date.getDate()
  const isEndpoint = isStart || isEnd
  const isPreviewEndpoint = (isPreviewStart || isPreviewEnd) && !isEndpoint

  // ── Container: range strip ──────────────────────────────────────────────────
  const containerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '36px',
    cursor: isCurrentMonth ? 'pointer' : 'default',
    userSelect: 'none',
    transition: 'background-color 100ms ease',
  }

  if (inRange) {
    containerStyle.background = 'rgba(37, 99, 235, 0.07)'
    if (isRangeStart) containerStyle.borderRadius = '50% 0 0 50%'
    else if (isRangeEnd) containerStyle.borderRadius = '0 50% 50% 0'
  } else if (isInPreviewRange) {
    containerStyle.background = 'rgba(37, 99, 235, 0.05)'
    if (isPreviewStart) containerStyle.borderRadius = '50% 0 0 50%'
    else if (isPreviewEnd) containerStyle.borderRadius = '0 50% 50% 0'
  }

  // ── Inner circle ────────────────────────────────────────────────────────────
  const circleStyle = {
    position: 'relative',
    zIndex: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '34px',
    width: '34px',
    borderRadius: '50%',
    fontSize: '0.8125rem',
    fontWeight: '400',
    transition: 'all 140ms cubic-bezier(0.34, 1.56, 0.64, 1)',
    color: '#5c5450',
  }

  if (isEndpoint) {
    circleStyle.background = 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
    circleStyle.color = '#ffffff'
    circleStyle.fontWeight = '600'
    circleStyle.boxShadow = '0 4px 12px rgba(37, 99, 235, 0.4), 0 1px 3px rgba(0,0,0,0.1)'
    circleStyle.transform = 'scale(1.05)'
  } else if (isPreviewEndpoint) {
    circleStyle.background = 'rgba(37, 99, 235, 0.18)'
    circleStyle.color = '#2563eb'
    circleStyle.fontWeight = '500'
  } else if (today) {
    circleStyle.color = '#2563eb'
    circleStyle.fontWeight = '700'
  } else if (!isCurrentMonth) {
    circleStyle.color = '#d4cdc8'
    circleStyle.fontWeight = '300'
  }

  return (
    <div
      style={containerStyle}
      onClick={() => isCurrentMonth && onClick(date)}
      onMouseEnter={() => onMouseEnter?.(date)}
      onMouseLeave={() => onMouseLeave?.()}
      role="button"
      aria-label={date.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      })}
      aria-pressed={isEndpoint}
      tabIndex={isCurrentMonth ? 0 : -1}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          isCurrentMonth && onClick(date)
        }
      }}
      onMouseOver={(e) => {
        if (!isEndpoint && isCurrentMonth) {
          const circle = e.currentTarget.querySelector('[data-circle]')
          if (circle && !isPreviewEndpoint) {
            circle.style.background = 'rgba(0,0,0,0.045)'
          }
        }
      }}
      onMouseOut={(e) => {
        if (!isEndpoint && isCurrentMonth) {
          const circle = e.currentTarget.querySelector('[data-circle]')
          if (circle && !isPreviewEndpoint) {
            circle.style.background = ''
          }
        }
      }}
    >
      {/* Today dot */}
      {today && !isEndpoint && (
        <span
          style={{
            position: 'absolute',
            bottom: '3px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '3px',
            height: '3px',
            borderRadius: '50%',
            background: '#2563eb',
            zIndex: 11,
          }}
        />
      )}

      <span data-circle style={circleStyle}>
        {dayNumber}
      </span>
    </div>
  )
}