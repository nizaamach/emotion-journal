import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import EmotionSelector from './EmotionSelector'
import EmotionInfo from './EmotionInfo'

export default function JournalForm() {
  const user = useAuth()
  const navigate = useNavigate()
  const [selectedEmotions, setSelectedEmotions] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showInfo, setShowInfo] = useState(false)

  const handleEmotionToggle = (emotionId) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotionId)
        ? prev.filter((e) => e !== emotionId)
        : [...prev, emotionId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (selectedEmotions.length === 0) {
      setError('Pilih minimal satu emosi')
      return
    }

    if (content.trim().length < 10) {
      setError('Journal harus minimal 10 karakter')
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.from('journals').insert({
        user_id: user.id,
        emotions: selectedEmotions,
        content: content.trim(),
        entry_date: new Date().toISOString().split('T')[0],
      })

      if (error) throw error

      navigate('/dashboard')
    } catch (error) {
      setError(error.message || 'Gagal menyimpan journal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-purple-500">
          <h2 className="text-2xl font-bold text-white">New Journal Entry</h2>
          <p className="text-indigo-100 mt-1">
            {new Date().toLocaleDateString('id-ID', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
              {error}
            </div>
          )}

          {/* Emotion Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Apa emosi yang Anda rasakan? <span className="text-red-500">*</span>
            </label>
            <EmotionSelector
              selectedEmotions={selectedEmotions}
              onEmotionToggle={handleEmotionToggle}
            />
          </div>

          {/* Toggle Info */}
          <button
            type="button"
            onClick={() => setShowInfo(!showInfo)}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            {showInfo ? 'Sembunyikan informasi emosi' : 'Lihat informasi emosi'}
          </button>

          {/* Emotion Info Panel */}
          {showInfo && (
            <div className="animate-fade-in">
              <EmotionInfo selectedEmotions={selectedEmotions} />
            </div>
          )}

          {/* Journal Content */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Tulis Journal Anda <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis pikiran, perasaan, dan pengalaman Anda di sini... Tidak ada batasan untuk ekspresi Anda."
              className="w-full min-h-[200px] p-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-y"
            />
            <p className="mt-2 text-sm text-slate-500 text-right">
              {content.length} karakter
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="flex-1 py-3 border border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Simpan Journal
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
