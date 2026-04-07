import React, { useState, useEffect, useCallback, useRef } from 'react'
import { notesStorageKey, formatRange } from '../utils/dateUtils'

const MAX_CHARS = 500

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

  useEffect(() => {
    const saved = localStorage.getItem(storageKey) || ''
    setText(saved)
    setSaveStatus('idle')
  }, [storageKey])

  const saveTimerRef = useRef(null)
  const savedTimerRef = useRef(null)

  const handleChange = useCallback((e) => {
    const val = e.target.value
    if (val.length > MAX_CHARS) return
    setText(val)
    setSaveStatus('saving')
    clearTimeout(saveTimerRef.current)
    clearTimeout(savedTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      localStorage.setItem(storageKey, val)
      setSaveStatus('saved')
      savedTimerRef.current = setTimeout(() => setSaveStatus('idle'), 2200)
    }, 400)
  }, [storageKey])

  useEffect(() => () => {
    clearTimeout(saveTimerRef.current)
    clearTimeout(savedTimerRef.current)
  }, [])

  const rangeLabel = formatRange(startDate, endDate)
  const charsLeft = MAX_CHARS - text.length
  const isNearLimit = charsLeft <= 50

  return (
    <div className="flex flex-col h-full" style={{ gap: '18px' }}>

      {/* Header */}
      <div className="flex items-start justify-between gap-2 min-w-0">
        <div className="min-w-0 flex-1">
          <h3
            className="font-semibold leading-none"
            style={{ fontSize: '0.7rem', letterSpacing: '0.14em', color: '#b8b0a4', textTransform: 'uppercase' }}
          >
            Notes
          </h3>
          {isRangeMode ? (
            <p
              className="flex items-center gap-1 min-w-0 mt-2"
              style={{ fontSize: '0.75rem', color: '#2563eb', fontWeight: 500 }}
            >
              <CalendarRangeIcon />
              <span className="truncate">{rangeLabel}</span>
            </p>
          ) : (
            <p className="mt-2" style={{ fontSize: '0.75rem', color: '#c4bdb7' }}>Monthly note</p>
          )}
        </div>

        {isRangeMode && (
          <button
            onClick={onClearRange}
            className="flex-shrink-0 flex items-center gap-0.5 transition-colors duration-150"
            style={{ fontSize: '0.72rem', color: '#c4bdb7', marginTop: '1px' }}
            aria-label="Clear date range"
            onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
            onMouseLeave={e => e.currentTarget.style.color = '#c4bdb7'}
          >
            <XIcon />
            <span className="whitespace-nowrap">Clear</span>
          </button>
        )}
      </div>

      {/* Writing area */}
      <div className="relative flex-1" style={{ minHeight: '180px' }}>
        {/* Lined paper */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent, transparent calc(1.75rem - 1px), rgba(0,0,0,0.055) calc(1.75rem - 1px), rgba(0,0,0,0.055) 1.75rem)',
            backgroundSize: '100% 1.75rem',
          }}
        />
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder={
            isRangeMode
              ? `Notes for ${rangeLabel}...`
              : 'Write a note for this month...'
          }
          className="absolute inset-0 w-full h-full resize-none bg-transparent outline-none scrollbar-hide"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '0.8125rem',
            lineHeight: '1.75rem',
            paddingTop: '2px',
            color: '#3d3733',
            caretColor: '#2563eb',
          }}
          spellCheck
        />
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-between pt-3"
        style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
      >
        <SaveStatus status={saveStatus} />
        <span
          style={{
            fontSize: '0.7rem',
            fontVariantNumeric: 'tabular-nums',
            color: isNearLimit ? '#f59e0b' : '#c4bdb7',
            fontWeight: isNearLimit ? 500 : 400,
            transition: 'color 200ms',
          }}
        >
          {text.length} / {MAX_CHARS}
        </span>
      </div>
    </div>
  )
}

function SaveStatus({ status }) {
  const base = { fontSize: '0.7rem', transition: 'opacity 300ms, color 300ms' }
  if (status === 'saving') return <span style={{ ...base, color: '#b8b0a4', opacity: 0.7 }}>Saving...</span>
  if (status === 'saved') return <span style={{ ...base, color: '#22c55e' }}>Saved</span>
  return <span style={{ ...base, color: '#d4cdc8' }}>Auto-saved</span>
}

function CalendarRangeIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
      <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}