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
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {EMOTIONS.map((emotion) => {
        const Icon = iconMap[emotion.icon]
        const isSelected = selectedEmotions.includes(emotion.id)

        return (
          <button
            key={emotion.id}
            onClick={() => onEmotionToggle(emotion.id)}
            className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 ${
              isSelected
                ? 'shadow-lg scale-105'
                : 'hover:bg-[#E8EDE5] bg-white border border-[#E8E6E1]'
            }`}
            style={{
              backgroundColor: isSelected ? emotion.color : undefined,
            }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center transition-all"
              style={{ 
                backgroundColor: isSelected ? 'rgba(255,255,255,0.6)' : emotion.color,
              }}
            >
              <Icon size={22} style={{ color: '#3D3D3D' }} />
            </div>
            <span className={`text-sm font-medium ${isSelected ? 'text-[#3D3D3D]' : 'text-[#6B6B6B]'}`}>
              {emotion.nameId}
            </span>
            {isSelected && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-[#6B8E6B] rounded-full flex items-center justify-center shadow-sm">
                <Check size={12} className="text-white" />
              </div>
            )}
          </button>
        )
      })}
    </div>
  )
}
