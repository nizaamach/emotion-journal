import { useState } from 'react'
import { ChevronDown, ChevronUp, Lightbulb, AlertCircle } from 'lucide-react'
import { EMOTIONS, getEmotionById } from '../../lib/emotions'

export default function EmotionInfo({ selectedEmotions = [] }) {
  const [expandedEmotion, setExpandedEmotion] = useState(null)

  const getInfoEmotions = () => {
    if (selectedEmotions.length > 0) {
      return selectedEmotions.map(id => getEmotionById(id)).filter(Boolean)
    }
    return EMOTIONS
  }

  const infoEmotions = getInfoEmotions()

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-indigo-500 to-purple-500">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Lightbulb size={20} />
          Informasi Emosi
        </h3>
        <p className="text-indigo-100 text-sm mt-1">
          {selectedEmotions.length > 0
            ? 'Klik untuk lihat detail emosi yang dipilih'
            : 'Klik emosi untuk lihat informasi lengkap'}
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {infoEmotions.map((emotion) => (
          <div key={emotion.id} className="p-4">
            <button
              onClick={() => setExpandedEmotion(expandedEmotion === emotion.id ? null : emotion.id)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: emotion.color }}
                >
                  <span className="text-sm font-bold text-slate-800">
                    {emotion.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-slate-800">{emotion.name}</p>
                  <p className="text-sm text-slate-500">{emotion.nameId}</p>
                </div>
              </div>
              {expandedEmotion === emotion.id ? (
                <ChevronUp size={20} className="text-slate-400" />
              ) : (
                <ChevronDown size={20} className="text-slate-400" />
              )}
            </button>

            {expandedEmotion === emotion.id && (
              <div className="mt-4 space-y-4 animate-accordion-down">
                <div>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {emotion.description}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <Lightbulb size={16} className="text-amber-500" />
                    Tips Mengelola
                  </div>
                  <ul className="space-y-1">
                    {emotion.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-indigo-500 mt-1">•</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-2">
                    <AlertCircle size={16} className="text-orange-500" />
                    Pemicu Umum
                  </div>
                  <ul className="space-y-1">
                    {emotion.triggers.map((trigger, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="text-orange-500 mt-1">•</span>
                        {trigger}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
