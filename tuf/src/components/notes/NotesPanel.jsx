import React, { useState, useEffect, useCallback, useRef } from 'react'
import { notesStorageKey, formatRange } from '../utils/dateUtils'

const MAX_CHARS = 500

/**
 * Notes panel that persists per-month and per-range notes in localStorage.
 * When a date range is selected, shows a range-specific note.
 * Falls back to a general monthly note when no range is active.
 */
export default function NotesPanel({
  currentYear,
  currentMonth,
  startDate,
  endDate,
  rangeKey,
  onClearRange,
}) {
  const isRangeMode = !!(startDate && endDate)
  const storageKey = notesStorageKey(currentYear, currentMonth, isRangeMode ? rangeKey : null)

  const [text, setText] = useState('')
  const textareaRef = useRef(null)

  // Load saved note whenever the key changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey) || ''
    setText(saved)
  }, [storageKey])

  // Debounced save — auto-save 400ms after user stops typing
  const saveTimerRef = useRef(null)
  const handleChange = useCallback(
    (e) => {
      const val = e.target.value
      if (val.length > MAX_CHARS) return
      setText(val)

      clearTimeout(saveTimerRef.current)
      saveTimerRef.current = setTimeout(() => {
        localStorage.setItem(storageKey, val)
      }, 400)
    },
    [storageKey]
  )

  // Cleanup timer on unmount
  useEffect(() => () => clearTimeout(saveTimerRef.current), [])

  const rangeLabel = formatRange(startDate, endDate)
  const charsLeft = MAX_CHARS - text.length
  const isNearLimit = charsLeft <= 50

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Notes header
          items-center (not items-start) keeps the clear button vertically
          centred with the label text on a single line.
          min-w-0 + truncate on the label prevents range text overflow. */}
      <div className="flex items-center justify-between gap-2 min-w-0">
        <div className="min-w-0 flex-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
            Notes
          </h3>
          {isRangeMode ? (
            <p className="text-xs text-blue-500 font-medium mt-0.5 flex items-center gap-1 min-w-0">
              <CalendarRangeIcon />
              <span className="truncate">{rangeLabel}</span>
            </p>
          ) : (
            <p className="text-xs text-gray-400 mt-0.5">Monthly note</p>
          )}
        </div>

        {isRangeMode && (
          <button
            onClick={onClearRange}
            className="flex-shrink-0 text-xs text-gray-400 hover:text-gray-600 flex items-center gap-0.5 transition-colors"
            aria-label="Clear date range"
          >
            <XIcon />
            <span className="whitespace-nowrap">Clear</span>
          </button>
        )}
      </div>

      {/* Ruled lines + textarea overlay */}
      <div className="relative flex-1 min-h-[160px]">
        {/* Ruled lines background */}
        <RuledLines />

        {/* Actual textarea */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder={
            isRangeMode
              ? `Notes for ${rangeLabel}…`
              : 'Write a note for this month…'
          }
          className="absolute inset-0 w-full h-full resize-none bg-transparent text-sm text-gray-700
                     placeholder-gray-300 leading-[2rem] pt-1 outline-none font-sans z-10
                     scrollbar-hide"
          style={{ fontFamily: 'inherit', lineHeight: '2rem' }}
          spellCheck
        />
      </div>

      {/* Character count */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <span className="text-xs text-gray-300">
          {text.length === 0 ? 'Auto-saved' : 'Saving…'}
        </span>
        <span
          className={`text-xs font-medium tabular-nums ${
            isNearLimit ? 'text-amber-500' : 'text-gray-300'
          }`}
        >
          {charsLeft}
        </span>
      </div>
    </div>
  )
}

/** Simple ruled lines using a repeating gradient */
function RuledLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to bottom, transparent, transparent calc(2rem - 1px), #e5e7eb calc(2rem - 1px), #e5e7eb 2rem)',
        backgroundSize: '100% 2rem',
      }}
    />
  )
}

function CalendarRangeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}