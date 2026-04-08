import { useState, useCallback } from 'react'
import { isSameDay, isBetween, dateKey } from '../utils/dateUtils'

/** Returns [earlier, later] regardless of argument order */
function sortDates(a, b) {
  return a <= b ? [a, b] : [b, a]
}

export function useRangeSelection() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [hoverDate, setHoverDate] = useState(null)

  const handleDayClick = useCallback(
    (date) => {
      // Both already selected → reset and start new selection
      if (startDate && endDate) {
        setStartDate(date)
        setEndDate(null)
        setHoverDate(null)
        return
      }

      // Nothing selected yet → set start
      if (!startDate) {
        setStartDate(date)
        return
      }

      // Clicked the same start date → clear selection
      if (isSameDay(date, startDate)) {
        setStartDate(null)
        return
      }

      // Normalise so startDate is always the earlier date
      const [early, late] = sortDates(startDate, date)
      setStartDate(early)
      setEndDate(late)
    },
    [startDate, endDate]
  )

  const reset = useCallback(() => {
    setStartDate(null)
    setEndDate(null)
    setHoverDate(null)
  }, [])


  function getDayState(date) {
    const isStart = !!(startDate && isSameDay(date, startDate))
    const isEnd = !!(endDate && isSameDay(date, endDate))

    // ── Confirmed selection ──────────────────────────────────────────────────
    const inRange = !!(
      startDate &&
      endDate &&
      isBetween(date, startDate, endDate)
    )
    const isRangeStart = isStart && !!endDate
    const isRangeEnd = isEnd

    // ── Hover preview (only when no endDate yet) ─────────────────────────────
    const showPreview = !!(startDate && !endDate && hoverDate)
    let isInPreviewRange = false
    let isPreviewStart = false
    let isPreviewEnd = false

    if (showPreview && !isSameDay(hoverDate, startDate)) {
      const [previewFrom, previewTo] = sortDates(startDate, hoverDate)
      isInPreviewRange = isBetween(date, previewFrom, previewTo)
      isPreviewStart = isSameDay(date, previewFrom)
      isPreviewEnd = isSameDay(date, previewTo)
    }

    return {
      isStart,
      isEnd,
      inRange,
      isRangeStart,
      isRangeEnd,
      isInPreviewRange,
      isPreviewStart,
      isPreviewEnd,
    }
  }

  const rangeKey =
    startDate && endDate
      ? `${dateKey(startDate)}_${dateKey(endDate)}`
      : null

  return {
    startDate,
    endDate,
    hoverDate,
    setHoverDate,
    handleDayClick,
    getDayState,
    reset,
    rangeKey,
    hasSelection: !!startDate,
    hasRange: !!(startDate && endDate),
  }
}