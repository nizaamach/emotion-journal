import { Smile, Frown, Angry, AlertTriangle, Sparkles, ThumbsDown, Check } from 'lucide-react'
import { EMOTIONS } from '../../lib/emotions'

const iconMap = {
  Smile,
  Frown,
  Angry,
  AlertTriangle,
  Sparkles,
  ThumbsDown,
}

export default function EmotionSelector({ selectedEmotions, onEmotionToggle }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {EMOTIONS.map((emotion) => {
        const Icon = iconMap[emotion.icon]
        const isSelected = selectedEmotions.includes(emotion.id)

        return (
          <button
            key={emotion.id}
            onClick={() => onEmotionToggle(emotion.id)}
            className={`relative flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
              isSelected
                ? 'border-transparent shadow-lg scale-[1.02]'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
            style={{
              backgroundColor: isSelected ? emotion.color : undefined,
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: isSelected ? 'rgba(255,255,255,0.5)' : emotion.color }}
            >
              <Icon size={20} style={{ color: '#1E293B' }} />
            </div>
            <div className="text-left">
              <p className="font-semibold text-slate-800">{emotion.name}</p>
              <p className="text-sm text-slate-600">{emotion.nameId}</p>
            </div>
            {isSelected && (
              <div className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow">
                <Check size={14} className="text-slate-800" />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
