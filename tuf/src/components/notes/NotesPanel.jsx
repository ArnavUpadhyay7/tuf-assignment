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
  const [saveStatus, setSaveStatus] = useState('idle') // 'idle' | 'saving' | 'saved'
  const textareaRef = useRef(null)

  // Load saved note whenever the key changes
  useEffect(() => {
    const saved = localStorage.getItem(storageKey) || ''
    setText(saved)
    setSaveStatus('idle')
  }, [storageKey])

  // Debounced save — auto-save 400ms after user stops typing
  const saveTimerRef = useRef(null)
  const savedTimerRef = useRef(null)

  const handleChange = useCallback(
    (e) => {
      const val = e.target.value
      if (val.length > MAX_CHARS) return
      setText(val)
      setSaveStatus('saving')

      clearTimeout(saveTimerRef.current)
      clearTimeout(savedTimerRef.current)

      saveTimerRef.current = setTimeout(() => {
        localStorage.setItem(storageKey, val)
        setSaveStatus('saved')
        savedTimerRef.current = setTimeout(() => setSaveStatus('idle'), 2000)
      }, 400)
    },
    [storageKey]
  )

  // Cleanup timers on unmount
  useEffect(() => () => {
    clearTimeout(saveTimerRef.current)
    clearTimeout(savedTimerRef.current)
  }, [])

  const rangeLabel = formatRange(startDate, endDate)
  const charsLeft = MAX_CHARS - text.length
  const isNearLimit = charsLeft <= 50

  return (
    <div className="flex flex-col gap-4 h-full">

      {/* ── Header ── */}
      <div className="flex items-start justify-between gap-2 min-w-0">
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-700 leading-none">Notes</h3>

          {isRangeMode ? (
            <p className="text-xs text-blue-600 font-medium mt-1.5 flex items-center gap-1 min-w-0">
              <CalendarRangeIcon />
              <span className="truncate">{rangeLabel}</span>
            </p>
          ) : (
            <p className="text-xs text-gray-400 mt-1.5">Monthly note</p>
          )}
        </div>

        {isRangeMode && (
          <button
            onClick={onClearRange}
            className="flex-shrink-0 text-xs text-gray-400 hover:text-red-500 flex items-center gap-0.5 transition-colors duration-150 mt-0.5"
            aria-label="Clear date range"
          >
            <XIcon />
            <span className="whitespace-nowrap">Clear</span>
          </button>
        )}
      </div>

      {/* ── Body ── */}
      {isRangeMode ? (
        <>
          {/* Range context label */}
          <p className="text-xs text-gray-500 -mt-1">
            {rangeLabel}
          </p>

          {/* Ruled lines + textarea overlay */}
          <div className="relative flex-1 min-h-[160px]">
            <RuledLines />
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              placeholder={`Write something for this range…`}
              className="absolute inset-0 w-full h-full resize-none bg-transparent text-sm text-gray-700
                         placeholder-gray-300 leading-[2rem] pt-1 outline-none font-sans z-10
                         scrollbar-hide rounded-sm
                         focus:ring-2 focus:ring-blue-200 focus:ring-inset"
              style={{ fontFamily: 'inherit', lineHeight: '2rem' }}
              spellCheck
            />
          </div>
        </>
      ) : (
        <>
          {/* Ruled lines + textarea overlay for monthly note */}
          <div className="relative flex-1 min-h-[160px]">
            <RuledLines />
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              placeholder="Write a note for this month…"
              className="absolute inset-0 w-full h-full resize-none bg-transparent text-sm text-gray-700
                         placeholder-gray-300 leading-[2rem] pt-1 outline-none font-sans z-10
                         scrollbar-hide rounded-sm
                         focus:ring-2 focus:ring-blue-200 focus:ring-inset"
              style={{ fontFamily: 'inherit', lineHeight: '2rem' }}
              spellCheck
            />
          </div>
        </>
      )}

      {/* ── Footer ── */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">

        {/* Save status */}
        <SaveStatus status={saveStatus} />

        {/* Character counter */}
        <span
          className={`text-xs tabular-nums transition-colors duration-200 ${
            isNearLimit ? 'text-amber-500 font-medium' : 'text-gray-300'
          }`}
        >
          {text.length} / {MAX_CHARS}
        </span>
      </div>
    </div>
  )
}

/** Save status indicator */
function SaveStatus({ status }) {
  if (status === 'saving') {
    return (
      <span className="text-xs text-gray-400 animate-pulse transition-opacity duration-300">
        Saving…
      </span>
    )
  }
  if (status === 'saved') {
    return (
      <span className="text-xs text-green-500 transition-opacity duration-300">
        Saved
      </span>
    )
  }
  // idle
  return (
    <span className="text-xs text-gray-300">
      Auto-saved
    </span>
  )
}

/** Simple ruled lines using a repeating gradient */
function RuledLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage:
          'repeating-linear-gradient(to bottom, transparent, transparent calc(2rem - 1px), #f0f0f0 calc(2rem - 1px), #f0f0f0 2rem)',
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