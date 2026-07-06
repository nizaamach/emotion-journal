import { Smile, Frown, Angry, AlertTriangle, Sparkles, ThumbsDown } from 'lucide-react'
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
    <div className="flex justify-center gap-2">
      {EMOTIONS.map((emotion) => {
        const Icon = iconMap[emotion.icon]
        const isSelected = selectedEmotions.includes(emotion.id)

        return (
          <button
            key={emotion.id}
            onClick={() => onEmotionToggle(emotion.id)}
            className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-200 ${
              isSelected
                ? 'scale-125 shadow-lg ring-2 ring-[#6B8E6B] ring-offset-2'
                : 'hover:scale-110 bg-white border border-[#E8E6E1]'
            }`}
            style={{
              backgroundColor: isSelected ? emotion.color : undefined,
            }}
            title={emotion.nameId}
          >
            <Icon 
              size={22} 
              style={{ 
                color: isSelected ? '#3D3D3D' : '#6B6B6B',
                transition: 'color 0.2s'
              }} 
            />
          </button>
        )
      })}
    </div>
  )
}
