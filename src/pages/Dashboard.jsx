import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Layout/Navbar'
import JournalList from '../components/Journal/JournalList'
import EmotionInfo from '../components/Journal/EmotionInfo'
import { exportJournalToPDF } from '../components/Export/PDFExport'

export default function Dashboard() {
  const user = useAuth()
  const navigate = useNavigate()
  const [journals, setJournals] = useState([])
  const [loading, setLoading] = useState(true)

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

  const handleDelete = async (id) => {
    if (!confirm('Hapus journal ini?')) return

    try {
      const { error } = await supabase.from('journals').delete().eq('id', id)
      if (error) throw error
      setJournals(journals.filter((j) => j.id !== id))
    } catch (error) {
      console.error('Error deleting journal:', error)
    }
  }

  const handleEdit = (journal) => {
    // For simplicity, redirect to journal page with edit mode
    navigate('/journal', { state: { journal } })
  }

  const handleExport = (journal) => {
    exportJournalToPDF(journal)
  }

  // Get emotion stats
  const emotionStats = journals.reduce((acc, j) => {
    j.emotions.forEach((e) => {
      acc[e] = (acc[e] || 0) + 1
    })
    return acc
  }, {})

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-600 mt-2">
            Selamat datang! Berikut ringkasan journal Anda.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <p className="text-sm text-slate-500">Total Journal</p>
            <p className="text-3xl font-bold text-indigo-600">{journals.length}</p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200">
            <p className="text-sm text-slate-500">Bulan Ini</p>
            <p className="text-3xl font-bold text-purple-600">
              {journals.filter((j) => {
                const d = new Date(j.entry_date)
                const now = new Date()
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
              }).length}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 border border-slate-200 col-span-2">
            <p className="text-sm text-slate-500 mb-3">Emosi Terbanyak</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(emotionStats)
                .sort(([, a], [, b]) => b - a)
                .slice(0, 3)
                .map(([emotion, count]) => (
                  <span key={emotion} className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                    {emotion}: {count}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Journal List */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Journal Terbaru</h2>
              <button
                onClick={() => navigate('/journal')}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                <Plus size={18} />
                <span>New Entry</span>
              </button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full mx-auto" />
              </div>
            ) : (
              <JournalList
                journals={journals}
                onDelete={handleDelete}
                onEdit={handleEdit}
                onExport={handleExport}
              />
            )}
          </div>

          {/* Info Panel */}
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Pelajari Emosi</h2>
            <EmotionInfo />
          </div>
        </div>
      </main>
    </div>
  )
}
