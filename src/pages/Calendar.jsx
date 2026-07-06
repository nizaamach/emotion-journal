import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { id } from 'date-fns/locale'
import { X, Download } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Layout/Navbar'
import CalendarView from '../components/Calendar/CalendarView'
import JournalList from '../components/Journal/JournalList'
import { exportJournalToPDF } from '../components/Export/PDFExport'

export default function CalendarPage() {
  const user = useAuth()
  const [journals, setJournals] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedJournals, setSelectedJournals] = useState([])

  useEffect(() => {
    fetchJournals()
  }, [])

  const fetchJournals = async () => {
    try {
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .eq('user_id', user.id)
        .order('entry_date', { ascending: false })

      if (error) throw error
      setJournals(data || [])
    } catch (error) {
      console.error('Error fetching journals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDateClick = (date, dayJournals) => {
    setSelectedDate(date)
    setSelectedJournals(dayJournals)
  }

  const handleDelete = async (id) => {
    if (!confirm('Hapus journal ini?')) return

    try {
      const { error } = await supabase.from('journals').delete().eq('id', id)
      if (error) throw error
      
      setJournals(journals.filter((j) => j.id !== id))
      setSelectedJournals(selectedJournals.filter((j) => j.id !== id))
    } catch (error) {
      console.error('Error deleting journal:', error)
    }
  }

  const handleExport = (journal) => {
    exportJournalToPDF(journal)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Kalender</h1>
          <p className="text-slate-600 mt-2">
            Lihat pattern emosi Anda sepanjang waktu
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white rounded-2xl p-12 text-center">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
              </div>
            ) : (
              <CalendarView journals={journals} onDateClick={handleDateClick} />
            )}
          </div>

          {/* Selected Day Info */}
          <div>
            {selectedDate ? (
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <div className="p-4 bg-indigo-500 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">
                        {format(selectedDate, 'EEEE', { locale: id })}
                      </p>
                      <p className="text-indigo-100 text-sm">
                        {format(selectedDate, 'd MMMM yyyy', { locale: id })}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedDate(null)
                        setSelectedJournals([])
                      }}
                      className="p-2 hover:bg-indigo-600 rounded-lg transition"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-slate-500">
                      {selectedJournals.length} journal
                    </p>
                    <button
                      onClick={() => {
                        selectedJournals.forEach((j) => exportJournalToPDF(j))
                      }}
                      className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700"
                    >
                      <Download size={16} />
                      Export All
                    </button>
                  </div>
                  <JournalList
                    journals={selectedJournals}
                    onDelete={handleDelete}
                    onEdit={() => {}}
                    onExport={handleExport}
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">📅</span>
                </div>
                <h3 className="font-semibold text-slate-800">Pilih Tanggal</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Klik tanggal di kalender untuk melihat journal pada hari tersebut
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
