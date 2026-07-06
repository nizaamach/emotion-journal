import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Save, Loader2, ChevronDown, ChevronUp } from 'lucide-react'
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

      // Reset form
      setSelectedEmotions([])
      setContent('')
      alert('Journal berhasil disimpan!')
    } catch (error) {
      setError(error.message || 'Gagal menyimpan journal')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="animate-fade-in">
      <div className="zen-card p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
              {error}
            </div>
          )}

          {/* Emotion Selection */}
          <div className="text-center">
            <label className="block text-sm text-[#6B6B6B] mb-4">
              Apa emosi yang Anda rasakan?
            </label>
            <EmotionSelector
              selectedEmotions={selectedEmotions}
              onEmotionToggle={handleEmotionToggle}
            />
          </div>

          {/* Toggle Info */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => setShowInfo(!showInfo)}
              className="inline-flex items-center gap-2 text-sm text-[#6B8E6B] hover:text-[#5A7A5A] font-medium transition"
            >
              {showInfo ? (
                <>
                  <ChevronUp size={16} />
                  Sembunyikan informasi emosi
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  Lihat informasi emosi
                </>
              )}
            </button>
          </div>

          {/* Emotion Info Panel */}
          {showInfo && selectedEmotions.length > 0 && (
            <div className="animate-fade-in bg-[#F5F7F2] rounded-xl p-6">
              <EmotionInfo selectedEmotions={selectedEmotions} />
            </div>
          )}

          {/* Journal Content */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis pikiran, perasaan, dan pengalaman Anda di sini..."
              className="w-full min-h-[300px] p-6 border border-[#E8E6E1] rounded-xl 
                         focus:ring-2 focus:ring-[#6B8E6B]/30 focus:border-[#6B8E6B]
                         resize-none text-[#3D3D3D] placeholder:text-[#A0A0A0]
                         transition-all duration-200 bg-[#FDFCFA]"
            />
            <div className="mt-3 flex justify-between items-center text-sm text-[#6B6B6B]">
              <span>{content.length} karakter</span>
              {content.length > 0 && (
                <span className="text-[#6B8E6B]">Sedang menulis...</span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || selectedEmotions.length === 0 || content.trim().length < 10}
            className="w-full py-4 zen-btn-primary flex items-center justify-center gap-3 text-lg
                       disabled:opacity-50 disabled:cursor-not-allowed"
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
        </form>
      </div>
    </div>
  )
}
