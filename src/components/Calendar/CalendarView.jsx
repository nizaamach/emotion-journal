import { useState, useMemo } from 'react'
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns'
import { id } from 'date-fns/locale'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getEmotionColor } from '../../lib/emotions'

export default function CalendarView({ journals, onDateClick }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)

  const monthDays = useMemo(() => {
    const start = startOfMonth(currentMonth)
    const end = endOfMonth(currentMonth)
    const days = eachDayOfInterval({ start, end })

    // Pad the beginning with empty cells
    const startDay = start.getDay()
    const paddedDays = Array(startDay).fill(null).concat(days)

    return paddedDays
  }, [currentMonth])

  const getJournalsForDate = (date) => {
    if (!date) return []
    return journals.filter((j) => isSameDay(new Date(j.entry_date), date))
  }

  const getDayEmotionColors = (date) => {
    const dayJournals = getJournalsForDate(date)
    if (dayJournals.length === 0) return []
    
    // Get unique emotions from all journals on this day
    const emotions = new Set()
    dayJournals.forEach((j) => {
      j.emotions.forEach((e) => emotions.add(e))
    })
    return Array.from(emotions).map((e) => getEmotionColor(e))
  }

  const handleDateClick = (date) => {
    if (!date) return
    setSelectedDate(date)
    const dayJournals = getJournalsForDate(date)
    if (dayJournals.length > 0) {
      onDateClick(date, dayJournals)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-100">
        <button
          onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
          className="p-2 hover:bg-slate-100 rounded-lg transition"
        >
          <ChevronLeft size={20} className="text-slate-600" />
        </button>
        <h3 className="text-lg font-semibold text-slate-800">
          {format(currentMonth, 'MMMM yyyy', { locale: id })}
        </h3>
        <button
          onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
          className="p-2 hover:bg-slate-100 rounded-lg transition"
        >
          <ChevronRight size={20} className="text-slate-600" />
        </button>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 border-b border-slate-100">
        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
          <div
            key={day}
            className="p-3 text-center text-sm font-medium text-slate-500"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7">
        {monthDays.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="p-2 min-h-[80px]" />
          }

          const isToday = isSameDay(date, new Date())
          const isSelected = selectedDate && isSameDay(date, selectedDate)
          const emotionColors = getDayEmotionColors(date)
          const hasJournal = emotionColors.length > 0

          return (
            <button
              key={date.toISOString()}
              onClick={() => handleDateClick(date)}
              className={`p-2 min-h-[80px] border-b border-r border-slate-100 hover:bg-slate-50 transition ${
                !isSameMonth(date, currentMonth) ? 'bg-slate-50' : ''
              } ${isSelected ? 'bg-indigo-50' : ''}`}
            >
              <div className="flex flex-col items-center">
                <span
                  className={`w-7 h-7 flex items-center justify-center rounded-full text-sm ${
                    isToday
                      ? 'bg-indigo-600 text-white font-bold'
                      : 'text-slate-700'
                  }`}
                >
                  {format(date, 'd')}
                </span>

                {/* Emotion indicators */}
                {hasJournal && (
                  <div className="flex gap-1 mt-1 flex-wrap justify-center">
                    {emotionColors.slice(0, 3).map((color, i) => (
                      <div
                        key={i}
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                )}

                {hasJournal && emotionColors.length > 3 && (
                  <span className="text-xs text-slate-500 mt-1">
                    +{emotionColors.length - 3}
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Legend */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <p className="text-xs text-slate-500 text-center">
          Klik tanggal untuk melihat journal. Titik warna menunjukkan emosi yang tercatat.
        </p>
      </div>
    </div>
  )
}
