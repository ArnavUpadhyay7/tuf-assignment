import { useState, useCallback, useMemo } from 'react'
import { buildCalendarGrid, MONTHS } from '../utils/dateUtils'

export function useCalendar() {
  const now = new Date()

  const [year, setYear]         = useState(now.getFullYear())
  const [month, setMonth]       = useState(now.getMonth())
  const [direction, setDirection] = useState(0)

  const calendarGrid = useMemo(() => buildCalendarGrid(year, month), [year, month])

  const goToPrevMonth = useCallback(() => {
    setDirection(-1)
    setYear((y) => (month === 0 ? y - 1 : y))
    setMonth((m) => (m === 0 ? 11 : m - 1))
  }, [month])

  const goToNextMonth = useCallback(() => {
    setDirection(1)
    setYear((y) => (month === 11 ? y + 1 : y))
    setMonth((m) => (m === 11 ? 0 : m + 1))
  }, [month])

  const goToToday = useCallback(() => {
    const todayYear  = now.getFullYear()
    const todayMonth = now.getMonth()
    const isAhead = year > todayYear || (year === todayYear && month > todayMonth)
    setDirection(isAhead ? -1 : 1)
    setYear(todayYear)
    setMonth(todayMonth)
  }, [year, month])

  return {
    currentYear:  year,
    currentMonth: month,
    monthName:    MONTHS[month],
    calendarGrid,
    direction,
    goToPrevMonth,
    goToNextMonth,
    goToToday,
  }
}