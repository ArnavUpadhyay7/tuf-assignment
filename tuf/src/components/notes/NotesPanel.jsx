import React, { useState, useEffect, useCallback, useRef } from 'react'
import { notesStorageKey, formatRange } from '../utils/dateUtils'

const MAX_CHARS = 500

// ── Sub-components ─────────────────────────────────────────────────────────────

function CalendarRangeIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 16 16" fill="none" className="shrink-0">
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

function SaveStatus({ status }) {
  const base = 'text-[11px] transition-all duration-300'
  if (status === 'saving') return <span className={`${base} text-stone-400 opacity-70`}>Saving…</span>
  if (status === 'saved')  return <span className={`${base} text-green-500`}>Saved ✓</span>
  return                          <span className={`${base} text-stone-300`}>Auto-saved</span>
}

function ClearButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label="Clear date range"
      className="shrink-0 flex items-center gap-1 text-[11px] text-stone-300 hover:text-red-400 transition-colors duration-150 mt-px"
    >
      <XIcon />
      <span className="whitespace-nowrap">Clear</span>
    </button>
  )
}

// ── NotesPanel ────────────────────────────────────────────────────────────────

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
  const [saveStatus, setSaveStatus] = useState('idle')
  const textareaRef = useRef(null)
  const saveTimerRef = useRef(null)
  const savedTimerRef = useRef(null)

  useEffect(() => {
    setText(localStorage.getItem(storageKey) || '')
    setSaveStatus('idle')
  }, [storageKey])

  useEffect(() => () => {
    clearTimeout(saveTimerRef.current)
    clearTimeout(savedTimerRef.current)
  }, [])

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

  const rangeLabel = formatRange(startDate, endDate)
  const charsLeft = MAX_CHARS - text.length
  const isNearLimit = charsLeft <= 50

  return (
    <div className="flex flex-col h-full gap-[18px]">

      {/* Header */}
      <div className="flex items-start justify-between gap-2 min-w-0">
        <div className="min-w-0 flex-1">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400 leading-none">
            Notes
          </h3>

          {isRangeMode ? (
            <p className="flex items-center gap-1 min-w-0 mt-2 text-[12px] font-medium text-blue-500">
              <CalendarRangeIcon />
              <span className="truncate">{rangeLabel}</span>
            </p>
          ) : (
            <p className="mt-2 text-[12px] text-stone-300">Monthly note</p>
          )}
        </div>

        {isRangeMode && <ClearButton onClick={onClearRange} />}
      </div>

      {/* Lined writing area */}
      <div className="relative flex-1 min-h-[180px]">
        {/* Lined paper background */}
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
          placeholder={isRangeMode ? `Notes for ${rangeLabel}…` : 'Write a note for this month…'}
          className="absolute inset-0 w-full h-full resize-none bg-transparent outline-none scrollbar-hide pt-px text-stone-700 placeholder:text-stone-300 caret-blue-500"
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: '0.8125rem',
            lineHeight: '1.75rem',
          }}
          spellCheck
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-black/[0.06]">
        <SaveStatus status={saveStatus} />
        <span
          className={`text-[11px] tabular-nums transition-colors duration-200 ${
            isNearLimit ? 'text-amber-400 font-medium' : 'text-stone-300'
          }`}
        >
          {text.length} / {MAX_CHARS}
        </span>
      </div>
    </div>
  )
}