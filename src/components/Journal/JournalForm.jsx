import { useState, useRef, useEffect } from 'react'
import { Save, Loader2 } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../context/AuthContext'
import EmotionSelector from './EmotionSelector'
import EmotionInfo from './EmotionInfo'

export default function JournalForm() {
  const user = useAuth()
  const [selectedEmotions, setSelectedEmotions] = useState([])
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const textareaRef = useRef(null)

  const handleEmotionToggle = (emotionId) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotionId)
        ? prev.filter((e) => e !== emotionId)
        : [...prev, emotionId]
    )
    // Auto-focus textarea
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (selectedEmotions.length === 0 || content.trim().length < 10) {
      return
    }

    setLoading(true)

    try {
      const { error } = await supabase.from('journals').insert({
        user_id: user.id,
        emotions: selectedEmotions,
        content: content.trim(),
        entry_date: new Date().toLocaleDateString('en-CA'),
      })

      if (error) throw error

      // Reset form
      setSelectedEmotions([])
      setContent('')
      alert('Journal berhasil disimpan!')
    } catch (error) {
      alert('Gagal menyimpan journal')
    } finally {
      setLoading(false)
    }
  }

  const canSubmit = selectedEmotions.length > 0 && content.trim().length >= 10

  return (
    <div className="animate-fade-in">
      <div className="zen-card p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Emotion Selection - Horizontal */}
          <div className="flex justify-center py-2">
            <EmotionSelector
              selectedEmotions={selectedEmotions}
              onEmotionToggle={handleEmotionToggle}
            />
          </div>

          {/* Journal Content */}
          <div>
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Tulis perasaan Anda di sini..."
              className="w-full min-h-[250px] p-4 border border-[#E8E6E1] rounded-xl 
                         focus:ring-2 focus:ring-[#6B8E6B]/30 focus:border-[#6B8E6B]
                         resize-none text-[#3D3D3D] placeholder:text-[#A0A0A0]
                         transition-all duration-200 bg-[#FDFCFA]"
            />
            <div className="mt-2 text-sm text-[#6B6B6B] text-right">
              {content.length} karakter
            </div>
          </div>

          {/* Info Toggle */}
          {selectedEmotions.length > 0 && (
            <button
              type="button"
              onClick={() => setShowInfo(!showInfo)}
              className="text-sm text-[#6B8E6B] hover:text-[#5A7A5A] transition"
            >
              {showInfo ? 'Sembunyikan info emosi' : 'Lihat info emosi'}
            </button>
          )}

          {/* Emotion Info Panel */}
          {showInfo && selectedEmotions.length > 0 && (
            <div className="animate-fade-in bg-[#F5F7F2] rounded-xl p-4">
              <EmotionInfo selectedEmotions={selectedEmotions} />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!canSubmit || loading}
            className="w-full py-4 zen-btn-primary"
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
